import type { DashboardOverviewData } from '@devops-command-center/shared';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';

export async function checkApiHealth(): Promise<{ status: string; service: string }> {
  const response = await fetch(`${apiBaseUrl}/api/health`);
  if (!response.ok) throw new Error('API health check failed');
  return response.json() as Promise<{ status: string; service: string }>;
}

export async function getDashboardOverview(): Promise<DashboardOverviewData> {
  const response = await fetch(`${apiBaseUrl}/api/dashboard/overview`);
  if (!response.ok) {
    throw new Error(`Dashboard fetch failed: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<DashboardOverviewData>;
}

