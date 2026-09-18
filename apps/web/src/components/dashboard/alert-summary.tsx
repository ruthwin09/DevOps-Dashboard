import { AlertTriangle } from 'lucide-react';
import type { AlertItem } from '../../features/dashboard/types/dashboard.types';

const severityStyles = { critical: 'bg-rose-400', high: 'bg-orange-400', medium: 'bg-amber-400' };
export function AlertSummary({ alerts }: { alerts: AlertItem[] }) {
  const counts = alerts.reduce<Record<string, number>>(
    (total, alert) => ({ ...total, [alert.severity]: (total[alert.severity] ?? 0) + 1 }),
    {},
  );
  return (
    <section className="border border-slate-800 bg-slate-900/45 p-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-semibold text-white">Alert summary</h2>
          <p className="mt-1 text-xs text-slate-500">Active alerts requiring review</p>
        </div>
        <AlertTriangle className="text-amber-300" size={18} />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {(['critical', 'high', 'medium'] as const).map((severity) => (
          <div key={severity} className="border border-slate-800 bg-slate-950/50 p-3">
            <p className="text-xl font-semibold text-white">{counts[severity] ?? 0}</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs capitalize text-slate-500">
              <span className={`h-1.5 w-1.5 rounded-full ${severityStyles[severity]}`} />
              {severity}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 divide-y divide-slate-800">
        {alerts.map((alert) => (
          <div key={alert.id} className="py-3">
            <div className="flex gap-2">
              <span
                className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${severityStyles[alert.severity]}`}
              />
              <div>
                <p className="text-sm text-slate-200">{alert.message}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {alert.service} · {alert.triggeredAt}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-3">
        <button className="flex-1 border border-slate-700 px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800">
          View all alerts
        </button>
        <button className="flex-1 bg-sky-400 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-300">
          Acknowledge
        </button>
      </div>
    </section>
  );
}
