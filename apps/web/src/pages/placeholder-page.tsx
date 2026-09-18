interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <section className="rounded-xl border border-dashed border-slate-700 bg-slate-900/30 p-8">
      <p className="text-sm uppercase tracking-[0.18em] text-sky-300">Planned module</p>
      <h2 className="mt-3 text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm text-slate-400">
        This area is reserved for a future implementation phase.
      </p>
    </section>
  );
}
