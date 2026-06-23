import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Parcelamentos" subtitle="Controle de compras parceladas e impacto futuro." />
      <SectionCard title="Em construção">
        <p className="text-sm text-slate-600">Esta página será conectada na próxima etapa.</p>
      </SectionCard>
    </div>
  );
}
