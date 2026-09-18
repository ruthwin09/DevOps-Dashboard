export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="grid min-h-40 place-items-center border border-dashed border-slate-700 p-6 text-center">
      <div>
        <p className="font-medium text-slate-200">{title}</p>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
}
