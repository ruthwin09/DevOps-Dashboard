import { ChevronDown } from 'lucide-react';

export function EnvironmentSelector() {
  return (
    <label className="relative hidden items-center md:flex">
      <span className="sr-only">Environment</span>
      <select
        aria-label="Select environment"
        defaultValue="Production"
        className="appearance-none rounded-lg border border-slate-700 bg-slate-900 py-2 pl-3 pr-8 text-sm text-slate-200"
      >
        <option>Production</option>
        <option>Staging</option>
        <option>Development</option>
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-2 text-slate-400"
        size={15}
      />
    </label>
  );
}
