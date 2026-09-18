import type { DeploymentStatus, ServiceStatus } from '../features/dashboard/types/dashboard.types';

const styles: Record<DeploymentStatus | ServiceStatus, string> = {
  operational: 'bg-emerald-400/10 text-emerald-300 ring-emerald-400/20',
  degraded: 'bg-amber-400/10 text-amber-300 ring-amber-400/20',
  incident: 'bg-rose-400/10 text-rose-300 ring-rose-400/20',
  success: 'bg-emerald-400/10 text-emerald-300 ring-emerald-400/20',
  failed: 'bg-rose-400/10 text-rose-300 ring-rose-400/20',
  running: 'bg-sky-400/10 text-sky-300 ring-sky-400/20',
  pending: 'bg-slate-400/10 text-slate-300 ring-slate-400/20',
};

export function StatusBadge({ status }: { status: DeploymentStatus | ServiceStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
