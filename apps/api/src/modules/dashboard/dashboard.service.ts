import type { DashboardOverviewData } from '@devops-command-center/shared';
import { getGitHubDashboardData } from '../../integrations/github/index.js';

/**
 * Dashboard domain service.
 * Orchestrates all integrations and assembles the full dashboard payload.
 * In Phase 4, additional integrations (Prometheus, k8s, etc.) will be
 * merged here without touching the API layer or the frontend.
 */
export async function assembleDashboard(): Promise<DashboardOverviewData> {
  return getGitHubDashboardData();
}
