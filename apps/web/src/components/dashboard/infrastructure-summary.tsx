import { Boxes, Container, Server, ShieldCheck } from 'lucide-react';
import type { InfrastructureItem } from '../../features/dashboard/types/dashboard.types';

const icons = { Docker: Container, Kubernetes: Boxes, Servers: Server, Security: ShieldCheck };
export function InfrastructureSummary({
  infrastructure,
}: {
  infrastructure: InfrastructureItem[];
}) {
  return (
    <section className="border border-slate-800 bg-slate-900/45 p-5">
      <div>
        <h2 className="font-semibold text-white">Infrastructure summary</h2>
        <p className="mt-1 text-xs text-slate-500">Current platform inventory</p>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {infrastructure.map((item) => {
          const Icon = icons[item.name as keyof typeof icons];
          return (
            <article key={item.name} className="border border-slate-800 bg-slate-950/40 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{item.name}</span>
                <Icon
                  size={17}
                  className={item.status === 'operational' ? 'text-emerald-300' : 'text-amber-300'}
                />
              </div>
              <p className="mt-4 text-lg font-semibold text-slate-100">{item.primary}</p>
              <p className="mt-1 text-xs text-slate-500">{item.detail}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
