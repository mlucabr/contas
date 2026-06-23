import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Contas a Receber" subtitle="Recebimentos previstos e pendentes." />
      <SectionCard title="Em construção">
        <p className="text-sm text-slate-600">Esta página será conectada na próxima etapa.</p>
      </SectionCard>
    </div>
  );
}
