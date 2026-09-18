import { Bell, Search } from 'lucide-react';
import { EnvironmentSelector } from './environment-selector';

export function PageHeader() {
  return (
    <header className="flex min-h-20 items-center justify-between gap-4 border-b border-slate-800 bg-[#0b1220]/90 px-5 pl-16 backdrop-blur lg:px-8 lg:pl-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">
          Production workspace
        </p>
        <h1 className="mt-1 text-lg font-semibold text-slate-50">Overview</h1>
      </div>
      <div className="flex items-center gap-2">
        <EnvironmentSelector />
        <label className="relative hidden lg:block">
          <span className="sr-only">Search operations</span>
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={16}
          />
          <input
            aria-label="Search operations"
            className="w-44 rounded-lg border border-slate-700 bg-slate-900 py-2 pl-9 pr-3 text-sm text-slate-200 placeholder:text-slate-500"
            placeholder="Search operations"
          />
        </label>
        <button
          aria-label="Search"
          className="rounded-lg border border-transparent p-2 text-slate-400 transition hover:border-slate-700 hover:bg-slate-900 hover:text-white"
        >
          <Search size={19} />
        </button>
        <button
          aria-label="Notifications"
          className="relative rounded-lg border border-transparent p-2 text-slate-400 transition hover:border-slate-700 hover:bg-slate-900 hover:text-white"
        >
          <Bell size={19} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-400" />
        </button>
        <button
          aria-label="Open user menu"
          className="ml-1 flex items-center gap-2 rounded-lg p-1.5 text-left transition hover:bg-slate-900"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-sky-400/15 text-xs font-bold text-sky-200">
            RW
          </span>
          <span className="hidden text-sm font-medium text-slate-300 xl:block">Ruthwin</span>
        </button>
      </div>
    </header>
  );
}
