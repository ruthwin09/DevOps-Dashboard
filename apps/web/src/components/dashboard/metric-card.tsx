import { Activity } from 'lucide-react';
import type { Metric } from '../../features/dashboard/types/dashboard.types';
import { StatusBadge } from '../status-badge';
import { TrendIndicator } from '../trend-indicator';

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <article className="border border-slate-800 bg-slate-900/45 p-5 transition hover:border-slate-700 hover:bg-slate-900/70">
      <div className="flex items-start justify-between">
        <span className="text-sm text-slate-400">{metric.label}</span>
        <Activity size={17} className="text-slate-500" />
      </div>
      <div className="mt-5 flex items-end justify-between gap-2">
        <p className="text-3xl font-semibold tracking-tight text-white">{metric.value}</p>
        <TrendIndicator value={metric.trend} direction={metric.trendDirection} />
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3">
        <p className="text-xs text-slate-500">{metric.description}</p>
        <StatusBadge status={metric.status} />
      </div>
    </article>
  );
}
