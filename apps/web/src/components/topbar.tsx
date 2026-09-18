import { Bell, CircleHelp, Search } from 'lucide-react';

export function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/70 px-6 pl-16 backdrop-blur lg:pl-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-300">
          Operations overview
        </p>
        <h1 className="mt-1 text-lg font-semibold text-white">DevOps Command Center</h1>
      </div>
      <div className="flex items-center gap-2 text-slate-400">
        <button aria-label="Search" className="rounded-lg p-2 hover:bg-slate-800">
          <Search size={19} />
        </button>
        <button aria-label="Notifications" className="rounded-lg p-2 hover:bg-slate-800">
          <Bell size={19} />
        </button>
        <button aria-label="Help" className="rounded-lg p-2 hover:bg-slate-800">
          <CircleHelp size={19} />
        </button>
        <span className="ml-2 grid h-8 w-8 place-items-center rounded-full bg-sky-400/15 text-xs font-bold text-sky-300">
          DC
        </span>
      </div>
    </header>
  );
}
