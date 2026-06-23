import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";

export default function CartoesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Cartões de Crédito" subtitle="Gestão de limite, fechamento, vencimento e faturas manuais." />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SectionCard title="Resumo dos cartões">
          <div className="grid gap-4">
            <div className="rounded-2xl border border-slate-200 p-4">
              <div className="text-lg font-semibold text-slate-900">Visa Principal</div>
              <div className="mt-1 text-sm text-slate-500">Fechamento dia 10 • Vencimento dia 17</div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-slate-50 p-3"><div className="text-xs text-slate-500">Limite</div><div className="mt-1 font-semibold">R$ 12.000,00</div></div>
                <div className="rounded-xl bg-amber-50 p-3"><div className="text-xs text-slate-500">Fatura aberta</div><div className="mt-1 font-semibold">R$ 0,00</div></div>
                <div className="rounded-xl bg-emerald-50 p-3"><div className="text-xs text-slate-500">Disponível</div><div className="mt-1 font-semibold">R$ 12.000,00</div></div>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Faturas">
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold text-slate-900">Fatura Jun/26</div>
                  <div className="text-sm text-slate-500">Status: Aberta</div>
                </div>
                <button type="button" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">Marcar como paga</button>
              </div>
            </div>
            <div className="text-sm text-slate-500">Nesta versão, a fatura não é baixada automaticamente.</div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
