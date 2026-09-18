/**
 * Minimal shapes extracted from GitHub API responses.
 * We only type the fields the service actually reads — avoids coupling
 * business logic to the full Octokit response trees.
 */

export interface GitHubWorkflowRun {
  id: number;
  name: string | null;
  head_sha: string;
  head_branch: string | null;
  status: string | null;
  conclusion: string | null;
  run_started_at: string | null | undefined;
  updated_at: string;
  html_url: string;
}

export interface GitHubEvent {
  id: string;
  type: string | null;
  actor: {
    login: string;
  };
  repo: {
    name: string;
  };
  created_at: string | null;
  payload: Record<string, unknown>;
}

export interface GitHubDependabotAlert {
  number: number;
  state: string;
  security_advisory: {
    severity: string;
    summary: string;
  };
  dependency: {
    package: {
      name: string;
    };
  };
  created_at: string;
}

export interface GitHubRepoMetrics {
  open_issues_count: number;
  stargazers_count: number;
  forks_count: number;
  default_branch: string;
}
