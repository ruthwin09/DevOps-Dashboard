import { dashboardMock } from './data/dashboard.mock';
import type { DashboardOverviewData } from './types/dashboard.types';

export async function getDashboardOverview(): Promise<DashboardOverviewData> {
  return dashboardMock;
}
