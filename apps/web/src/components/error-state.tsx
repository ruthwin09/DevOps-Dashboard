import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
}

export function ErrorState({ message = 'Failed to load dashboard data.' }: ErrorStateProps) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-xl bg-rose-400/10 text-rose-400">
        <AlertTriangle size={28} />
      </span>
      <div>
        <p className="text-base font-semibold text-slate-100">Something went wrong</p>
        <p className="mt-1 text-sm text-slate-400">{message}</p>
        <p className="mt-1 text-xs text-slate-500">
          Check that the API server is running and your GitHub token is valid.
        </p>
      </div>
      <button
        className="mt-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
        onClick={() => window.location.reload()}
      >
        Retry
      </button>
    </div>
  );
}
