import type { HealthCheck } from '../../features/dashboard/types/dashboard.types';
import { StatusBadge } from '../status-badge';

export function SystemHealth({ healthChecks }: { healthChecks: HealthCheck[] }) {
  return (
    <section className="border border-slate-800 bg-slate-900/45 p-5">
      <div>
        <h2 className="font-semibold text-white">System health</h2>
        <p className="mt-1 text-xs text-slate-500">Service probes and platform checks</p>
      </div>
      <div className="mt-5 divide-y divide-slate-800">
        {healthChecks.map((check) => (
          <div
            key={check.name}
            className="grid grid-cols-[1fr_auto] items-center gap-3 py-3 first:pt-0"
          >
            <div>
              <p className="text-sm font-medium text-slate-200">{check.name}</p>
              <p className="mt-1 text-xs text-slate-500">Last checked {check.lastChecked}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-400">{check.latency}</span>
              <StatusBadge status={check.status} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
