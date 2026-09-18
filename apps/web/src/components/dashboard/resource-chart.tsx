import { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { DashboardOverviewData } from '../../features/dashboard/types/dashboard.types';

const ranges = ['1H', '6H', '24H', '7D'] as const;
export function ResourceChart({ usage }: { usage: DashboardOverviewData['resourceUsage'] }) {
  const [range, setRange] = useState<(typeof ranges)[number]>('1H');
  return (
    <section className="border border-slate-800 bg-slate-900/45 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold text-white">Resource usage</h2>
          <p className="mt-1 text-xs text-slate-500">Aggregate production utilization</p>
        </div>
        <div className="flex rounded-md border border-slate-800 bg-slate-950 p-0.5">
          {ranges.map((item) => (
            <button
              key={item}
              onClick={() => setRange(item)}
              className={`rounded px-2.5 py-1 text-xs font-medium ${range === item ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-200'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={usage[range]} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="cpu" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#1e293b" />
            <XAxis
              dataKey="time"
              tick={{ fill: '#64748b', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              unit="%"
            />
            <Tooltip
              contentStyle={{ background: '#111827', border: '1px solid #334155', borderRadius: 6 }}
              labelStyle={{ color: '#cbd5e1' }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area
              type="monotone"
              dataKey="cpu"
              name="CPU"
              stroke="#38bdf8"
              fill="url(#cpu)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="memory"
              name="Memory"
              stroke="#a78bfa"
              fill="transparent"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="network"
              name="Network"
              stroke="#34d399"
              fill="transparent"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
