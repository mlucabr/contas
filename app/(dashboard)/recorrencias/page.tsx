import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Recorrências" subtitle="Receitas e despesas recorrentes entram na projeção futura." />
      <SectionCard title="Em construção">
        <p className="text-sm text-slate-600">Esta página será conectada na próxima etapa.</p>
      </SectionCard>
    </div>
  );
}
