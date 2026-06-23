import { KpiCard } from "@/components/kpi-card";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { getDashboardSummary } from "@/lib/dashboard";
import { formatCurrency } from "@/lib/format";

export default async function DashboardPage() {
  const summary = await getDashboardSummary();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard Executivo"
        subtitle="Visão consolidada do caixa, patrimônio investido, contas futuras e pressão de fatura."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        <KpiCard title="Caixa disponível" value={formatCurrency(summary.caixaDisponivel)} subtitle="Contas marcadas como caixa" tone="info" />
        <KpiCard title="Patrimônio investido" value={formatCurrency(summary.patrimonioInvestido)} subtitle="Separado do caixa" tone="default" />
        <KpiCard title="Contas a pagar (30 dias)" value={formatCurrency(summary.contasAPagar30d)} subtitle="Compromissos em aberto" tone="danger" />
        <KpiCard title="Contas a receber (30 dias)" value={formatCurrency(summary.contasAReceber30d)} subtitle="Entradas previstas" tone="success" />
        <KpiCard title="Saldo previsto do mês" value={formatCurrency(summary.saldoPrevistoMes)} subtitle="Caixa + recebimentos - pagamentos - faturas" tone={summary.saldoPrevistoMes >= 0 ? "success" : "danger"} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SectionCard title="Leitura rápida">
          <div className="space-y-3 text-sm text-slate-700">
            <p>Esta primeira versão já separa <strong>caixa disponível</strong> de <strong>patrimônio investido</strong>.</p>
            <p>O saldo previsto considera contas a pagar, contas a receber e faturas abertas.</p>
          </div>
        </SectionCard>

        <SectionCard title="Próximos upgrades desta página">
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>gráfico de fluxo de caixa mensal</li>
            <li>linha do tempo de vencimentos</li>
            <li>top categorias de gasto</li>
            <li>alerta para necessidade de resgate</li>
            <li>projeção baseada em recorrências e parcelamentos</li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
