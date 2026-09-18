import type {
  ActivityItem,
  AlertItem,
  AlertSeverity,
  DashboardOverviewData,
  Deployment,
  DeploymentStatus,
  Metric,
} from '@devops-command-center/shared';

import { env } from '../../config/env.js';
import { logger } from '../../observability/logger.js';
import { octokit } from './github.client.js';
import { dashboardMock } from './github.mock.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Format an ISO date string as a human-readable relative time label.
 * e.g. "2 min ago", "3 hr ago", "5 days ago"
 */
function relativeTime(iso: string | null | undefined): string {
  if (!iso) return '—';
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.floor(hrs / 24);
  return `${days} days ago`;
}

/**
 * Map a GitHub workflow conclusion/status to a DeploymentStatus.
 */
function toDeploymentStatus(
  status: string | null,
  conclusion: string | null,
): DeploymentStatus {
  if (status === 'in_progress' || status === 'queued' || status === 'requested') {
    return status === 'queued' || status === 'requested' ? 'pending' : 'running';
  }
  if (conclusion === 'success') return 'success';
  if (conclusion === 'failure' || conclusion === 'timed_out') return 'failed';
  if (conclusion === null && status === 'completed') return 'failed';
  return 'pending';
}

/**
 * Map a GitHub event type to an ActivityItem type.
 */
function toActivityType(
  eventType: string | null,
): ActivityItem['type'] {
  switch (eventType) {
    case 'PushEvent':
    case 'CreateEvent':
      return 'deployment';
    case 'WorkflowRunEvent':
      return 'pipeline';
    case 'SecurityAdvisoryEvent':
      return 'security';
    case 'IssuesEvent':
    case 'PullRequestEvent':
      return 'alert';
    default:
      return 'restart';
  }
}

/**
 * Map a GitHub advisory severity to AlertSeverity.
 */
function toAlertSeverity(ghSeverity: string): AlertSeverity {
  switch (ghSeverity.toLowerCase()) {
    case 'critical':
    case 'high':
      return ghSeverity.toLowerCase() as AlertSeverity;
    case 'moderate':
      return 'medium';
    default:
      return 'medium';
  }
}

// ---------------------------------------------------------------------------
// GitHub service methods
// ---------------------------------------------------------------------------

/**
 * Fetch the last 10 workflow runs and map them to Deployment rows.
 */
async function getWorkflowRuns(): Promise<Deployment[]> {
  if (!octokit) return dashboardMock.deployments;

  try {
    const { data } = await octokit.actions.listWorkflowRunsForRepo({
      owner: env.githubRepoOwner,
      repo: env.githubRepoName,
      per_page: 10,
    });

    return data.workflow_runs.map((run) => ({
      application: run.name ?? env.githubRepoName,
      version: `#${run.run_number}`,
      environment: run.head_branch ?? 'unknown',
      status: toDeploymentStatus(run.status, run.conclusion),
      duration: run.run_started_at
        ? `${Math.round((new Date(run.updated_at).getTime() - new Date(run.run_started_at).getTime()) / 1000)}s`
        : '—',
      commit: run.head_sha.slice(0, 7),
      deployedAt: relativeTime(run.updated_at),
    }));
  } catch (err) {
    logger.warn({ err }, 'GitHub: failed to fetch workflow runs, falling back to mock');
    return dashboardMock.deployments;
  }
}

/**
 * Fetch recent public events for the repo and map them to ActivityItems.
 */
async function getRecentEvents(): Promise<ActivityItem[]> {
  if (!octokit) return dashboardMock.activities;

  try {
    const { data } = await octokit.activity.listRepoEvents({
      owner: env.githubRepoOwner,
      repo: env.githubRepoName,
      per_page: 10,
    });

    return data.slice(0, 8).map((event, index) => ({
      id: event.id ?? `event-${index}`,
      type: toActivityType(event.type),
      title: formatEventTitle(event.type, event.payload as Record<string, unknown>),
      service: `${env.githubRepoName} · ${event.actor.login}`,
      timestamp: relativeTime(event.created_at),
      status: 'operational' as const,
    }));
  } catch (err) {
    logger.warn({ err }, 'GitHub: failed to fetch repo events, falling back to mock');
    return dashboardMock.activities;
  }
}

function formatEventTitle(
  type: string | null,
  payload: Record<string, unknown>,
): string {
  switch (type) {
    case 'PushEvent': {
      const commits = payload['commits'];
      const count = Array.isArray(commits) ? commits.length : 1;
      return `Pushed ${count} commit${count !== 1 ? 's' : ''}`;
    }
    case 'PullRequestEvent':
      return `Pull request ${String(payload['action'] ?? 'updated')}`;
    case 'CreateEvent':
      return `Created ${String(payload['ref_type'] ?? 'branch')} ${String(payload['ref'] ?? '')}`;
    case 'WorkflowRunEvent':
      return `Workflow run ${String(payload['action'] ?? 'triggered')}`;
    case 'IssuesEvent':
      return `Issue ${String(payload['action'] ?? 'updated')}`;
    default:
      return type ?? 'Repository event';
  }
}

/**
 * Fetch Dependabot alerts and map to AlertItems.
 * Falls back gracefully if the API is unavailable (e.g. Dependabot not enabled,
 * or the token lacks the security_events scope).
 */
async function getDependabotAlerts(): Promise<AlertItem[]> {
  if (!octokit) return dashboardMock.alerts;

  try {
    const { data } = await octokit.dependabot.listAlertsForRepo({
      owner: env.githubRepoOwner,
      repo: env.githubRepoName,
      state: 'open',
      per_page: 20,
    });

    return data.map((alert) => ({
      id: `dependabot-${alert.number}`,
      severity: toAlertSeverity(alert.security_advisory.severity),
      message: alert.security_advisory.summary,
      service: `${alert.dependency?.package?.name ?? 'unknown'} · ${env.githubRepoName}`,
      triggeredAt: relativeTime(alert.created_at),
    }));
  } catch (err) {
    logger.warn({ err }, 'GitHub: failed to fetch Dependabot alerts, falling back to mock');
    return dashboardMock.alerts;
  }
}

/**
 * Fetch repo-level metadata and derive metric cards.
 */
async function getRepoMetrics(): Promise<Metric[]> {
  if (!octokit) return dashboardMock.metrics;

  try {
    const { data: repo } = await octokit.repos.get({
      owner: env.githubRepoOwner,
      repo: env.githubRepoName,
    });

    const { data: runsData } = await octokit.actions.listWorkflowRunsForRepo({
      owner: env.githubRepoOwner,
      repo: env.githubRepoName,
      per_page: 20,
    });

    const recentRuns = runsData.workflow_runs;
    const failures = recentRuns.filter((r) => r.conclusion === 'failure').length;
    const successRate =
      recentRuns.length > 0
        ? Math.round(((recentRuns.length - failures) / recentRuns.length) * 100)
        : 100;

    return [
      {
        id: 'open-issues',
        label: 'Open Issues / PRs',
        value: String(repo.open_issues_count),
        trend: '—',
        trendDirection: 'up',
        description: `${repo.default_branch} branch`,
        status: repo.open_issues_count === 0 ? 'operational' : 'degraded',
      },
      {
        id: 'workflow-success',
        label: 'CI Success Rate',
        value: `${successRate}%`,
        trend: failures > 0 ? `-${failures} failed` : 'All passing',
        trendDirection: failures > 0 ? 'down' : 'up',
        description: `Last ${recentRuns.length} workflow runs`,
        status: successRate >= 90 ? 'operational' : successRate >= 70 ? 'degraded' : 'incident',
      },
      {
        id: 'stars',
        label: 'Stars',
        value: String(repo.stargazers_count),
        trend: '—',
        trendDirection: 'up',
        description: `${repo.forks_count} forks`,
        status: 'operational',
      },
      {
        id: 'alerts',
        label: 'Active Alerts',
        value: '—',
        trend: '—',
        trendDirection: 'up',
        description: 'Loaded separately',
        status: 'operational',
      },
    ];
  } catch (err) {
    logger.warn({ err }, 'GitHub: failed to fetch repo metrics, falling back to mock');
    return dashboardMock.metrics;
  }
}

// ---------------------------------------------------------------------------
// Public API of the GitHub service
// ---------------------------------------------------------------------------

export async function getGitHubDashboardData(): Promise<DashboardOverviewData> {
  if (env.githubMockMode) {
    logger.info('GitHub service: mock mode active, returning mock dashboard data');
    return dashboardMock;
  }

  const [deployments, activities, alerts, metrics] = await Promise.allSettled([
    getWorkflowRuns(),
    getRecentEvents(),
    getDependabotAlerts(),
    getRepoMetrics(),
  ]);

  // After allSettled, update the alerts metric with the real count
  const resolvedAlerts =
    alerts.status === 'fulfilled' ? alerts.value : dashboardMock.alerts;
  const resolvedMetrics =
    metrics.status === 'fulfilled' ? metrics.value : dashboardMock.metrics;

  const alertsMetricIndex = resolvedMetrics.findIndex((m: Metric) => m.id === 'alerts');
  if (alertsMetricIndex !== -1) {
    resolvedMetrics[alertsMetricIndex] = {
      ...resolvedMetrics[alertsMetricIndex],
      value: String(resolvedAlerts.length),
      description: resolvedAlerts.length === 0 ? 'No active alerts' : 'Requires review',
      status: resolvedAlerts.length === 0 ? 'operational' : 'degraded',
    };
  }

  return {
    metrics: resolvedMetrics,
    // Resource usage charts are infra metrics — not available from GitHub.
    // Keep mock data until a real metrics source (Prometheus, etc.) is wired.
    resourceUsage: dashboardMock.resourceUsage,
    deployments:
      deployments.status === 'fulfilled' ? deployments.value : dashboardMock.deployments,
    // Health checks are infra probes, not GitHub data — keep mock until Phase 4.
    healthChecks: dashboardMock.healthChecks,
    activities:
      activities.status === 'fulfilled' ? activities.value : dashboardMock.activities,
    alerts: resolvedAlerts,
    // Infrastructure summary is not GitHub data — keep mock until Phase 4.
    infrastructure: dashboardMock.infrastructure,
  };
}
