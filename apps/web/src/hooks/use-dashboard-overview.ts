import { useEffect, useState } from 'react';
import type { DashboardOverviewData } from '@devops-command-center/shared';
import { getDashboardOverview } from '../features/dashboard/dashboard.service';

interface UseDashboardOverviewResult {
  data: DashboardOverviewData | undefined;
  isLoading: boolean;
  error: Error | null;
}

export function useDashboardOverview(): UseDashboardOverviewResult {
  const [data, setData] = useState<DashboardOverviewData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setError(null);

    getDashboardOverview()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, isLoading, error };
}

