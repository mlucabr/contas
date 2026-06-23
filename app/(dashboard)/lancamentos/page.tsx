import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";

export default function LancamentosPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Lançamentos" subtitle="Entradas, saídas, investimentos e ajustes. Investimento entra como despesa." />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <SectionCard title="Novo lançamento">
          <form className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">Data</label>
              <input type="date" className="rounded-xl border border-slate-300 px-3 py-2" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">Descrição</label>
              <input type="text" placeholder="Ex.: aluguel, salário, aporte, seguro" className="rounded-xl border border-slate-300 px-3 py-2" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Tipo</label>
                <select className="rounded-xl border border-slate-300 px-3 py-2">
                  <option>Entrada</option>
                  <option>Saída</option>
                  <option>Investimento</option>
                  <option>Ajuste</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Valor</label>
                <input type="number" className="rounded-xl border border-slate-300 px-3 py-2" />
              </div>
            </div>
            <button type="button" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">Salvar lançamento</button>
          </form>
        </SectionCard>

        <SectionCard title="Histórico recente">
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 text-left">Data</th>
                  <th className="px-4 py-3 text-left">Descrição</th>
                  <th className="px-4 py-3 text-left">Tipo</th>
                  <th className="px-4 py-3 text-left">Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-3">—</td>
                  <td className="px-4 py-3">Nenhum lançamento ainda</td>
                  <td className="px-4 py-3">—</td>
                  <td className="px-4 py-3">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
