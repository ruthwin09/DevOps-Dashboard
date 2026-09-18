import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

export function TrendIndicator({ value, direction }: { value: string; direction: 'up' | 'down' }) {
  const isDown = direction === 'down';
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-medium ${isDown ? 'text-emerald-300' : 'text-sky-300'}`}
    >
      {isDown ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
      {value}
    </span>
  );
}
