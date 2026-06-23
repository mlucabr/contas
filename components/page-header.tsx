export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{title}</h1>
      {subtitle ? <p className="max-w-3xl text-sm text-slate-500">{subtitle}</p> : null}
    </div>
  );
}
