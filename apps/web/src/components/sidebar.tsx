import { Command, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { navigationItems } from '../lib/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onClose, onToggle }: SidebarProps) {
  return (
    <>
      <button
        aria-label="Toggle navigation"
        className="fixed left-4 top-4 z-40 rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-200 lg:hidden"
        onClick={onToggle}
      >
        <Menu size={20} />
      </button>
      {isOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-slate-950/70 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 -translate-x-full flex-col border-r border-slate-800 bg-slate-950 px-4 py-5 transition-transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : ''}`}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-sky-400/15 p-2 text-sky-300">
              <Command size={20} />
            </div>
            <div>
              <p className="font-semibold text-white">DevOps</p>
              <p className="text-xs text-slate-400">Command Center</p>
            </div>
          </div>
          <button
            aria-label="Close navigation"
            className="text-slate-400 lg:hidden"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        <nav className="space-y-1" aria-label="Primary navigation">
          {navigationItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${isActive ? 'bg-sky-400/15 text-sky-300' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'}`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto border border-slate-800 bg-slate-900/60 p-3 text-xs text-slate-400">
          Platform status
          <br />
          <span className="text-emerald-300">All systems operational</span>
        </div>
      </aside>
    </>
  );
}
