import { useEffect, useState } from 'react';
import { getDashboardOverview } from '../features/dashboard/dashboard.service';
import type { DashboardOverviewData } from '../features/dashboard/types/dashboard.types';

export function useDashboardOverview() {
  const [data, setData] = useState<DashboardOverviewData>();
  useEffect(() => {
    void getDashboardOverview().then(setData);
  }, []);
  return data;
}
