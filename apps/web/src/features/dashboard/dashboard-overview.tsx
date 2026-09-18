import { AlertSummary } from '../../components/dashboard/alert-summary';
import { DeploymentTable } from '../../components/dashboard/deployment-table';
import { InfrastructureSummary } from '../../components/dashboard/infrastructure-summary';
import { MetricCard } from '../../components/dashboard/metric-card';
import { RecentActivity } from '../../components/dashboard/recent-activity';
import { ResourceChart } from '../../components/dashboard/resource-chart';
import { SystemHealth } from '../../components/dashboard/system-health';
import { ErrorState } from '../../components/error-state';
import { LoadingState } from '../../components/loading-state';
import { useDashboardOverview } from '../../hooks/use-dashboard-overview';

export function DashboardOverview() {
  const { data: dashboard, isLoading, error } = useDashboardOverview();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;
  if (!dashboard) return <LoadingState />;

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">
            Live system health and delivery signals for your engineering platform.
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">
            Good afternoon, operator.
          </h2>
        </div>
        <p className="flex items-center gap-2 text-sm text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          All core systems operational
        </p>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {dashboard.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </section>
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(340px,0.85fr)]">
        <ResourceChart usage={dashboard.resourceUsage} />
        <SystemHealth healthChecks={dashboard.healthChecks} />
      </section>
      <DeploymentTable deployments={dashboard.deployments} />
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
        <RecentActivity activities={dashboard.activities} />
        <AlertSummary alerts={dashboard.alerts} />
      </section>
      <InfrastructureSummary infrastructure={dashboard.infrastructure} />
    </div>
  );
}

