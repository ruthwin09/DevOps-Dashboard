import { Activity, CheckCircle2, Clock3, ShieldCheck } from 'lucide-react';

const cards = [
  { label: 'Services', value: '—', detail: 'Connect integrations to begin', icon: Activity },
  { label: 'Deployments', value: '—', detail: 'No delivery data connected', icon: CheckCircle2 },
  { label: 'Active incidents', value: '—', detail: 'Incident module planned', icon: Clock3 },
  { label: 'Security posture', value: '—', detail: 'Scanning phase planned', icon: ShieldCheck },
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm text-slate-400">
          A single view of your delivery and operations lifecycle.
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Good afternoon, operator.</h2>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, detail, icon: Icon }) => (
          <article key={label} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="mb-7 flex items-center justify-between">
              <span className="text-sm text-slate-400">{label}</span>
              <Icon size={18} className="text-sky-300" />
            </div>
            <p className="text-3xl font-semibold text-white">{value}</p>
            <p className="mt-2 text-xs text-slate-500">{detail}</p>
          </article>
        ))}
      </section>
      <section className="rounded-xl border border-dashed border-slate-700 bg-slate-900/30 p-8">
        <h3 className="font-medium text-slate-100">
          Your command center is ready for integrations
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          This foundation provides the application shell and API health service. Pipeline,
          deployment, Kubernetes, monitoring, and security data are intentionally deferred to later
          phases.
        </p>
      </section>
    </div>
  );
}
