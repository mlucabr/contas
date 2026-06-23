type Props = {
  title: string;
  value: string;
  subtitle?: string;
  tone?: "default" | "success" | "danger" | "info" | "warning";
};

const toneClasses: Record<NonNullable<Props["tone"]>, string> = {
  default: "bg-white",
  success: "bg-emerald-50",
  danger: "bg-rose-50",
  info: "bg-sky-50",
  warning: "bg-amber-50",
};

export function KpiCard({ title, value, subtitle, tone = "default" }: Props) {
  return (
    <div className={`rounded-2xl border border-slate-200 shadow-sm p-5 ${toneClasses[tone]}`}>
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
      {subtitle ? <div className="mt-1 text-xs text-slate-500">{subtitle}</div> : null}
    </div>
  );
}
