import type { DashboardOverviewData } from '@devops-command-center/shared';
import { getDashboardOverview as fetchDashboardOverview } from '../../services/api';

export async function getDashboardOverview(): Promise<DashboardOverviewData> {
  return fetchDashboardOverview();
}

