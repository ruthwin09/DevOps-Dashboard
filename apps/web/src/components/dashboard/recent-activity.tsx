import { CheckCircle2, GitBranch, RotateCcw, ShieldCheck, TriangleAlert } from 'lucide-react';
import type { ActivityItem } from '../../features/dashboard/types/dashboard.types';

const icons = {
  deployment: CheckCircle2,
  restart: RotateCcw,
  security: ShieldCheck,
  alert: TriangleAlert,
  pipeline: GitBranch,
};
const tones = {
  deployment: 'text-emerald-300 bg-emerald-400/10',
  restart: 'text-sky-300 bg-sky-400/10',
  security: 'text-violet-300 bg-violet-400/10',
  alert: 'text-rose-300 bg-rose-400/10',
  pipeline: 'text-amber-300 bg-amber-400/10',
};
export function RecentActivity({ activities }: { activities: ActivityItem[] }) {
  return (
    <section className="border border-slate-800 bg-slate-900/45 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-white">Recent activity</h2>
          <p className="mt-1 text-xs text-slate-500">Latest production events</p>
        </div>
        <button className="text-sm font-medium text-sky-300 hover:text-sky-200">
          View history
        </button>
      </div>
      <ol className="mt-5 space-y-4">
        {activities.map((activity) => {
          const Icon = icons[activity.type];
          return (
            <li key={activity.id} className="flex gap-3">
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-md ${tones[activity.type]}`}
              >
                <Icon size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-3">
                  <p className="truncate text-sm font-medium text-slate-200">{activity.title}</p>
                  <time className="shrink-0 text-xs text-slate-500">{activity.timestamp}</time>
                </div>
                <p className="mt-1 text-xs text-slate-500">{activity.service}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
