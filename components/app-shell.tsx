import Link from "next/link";
import { ReactNode } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/lancamentos", label: "Lançamentos" },
  { href: "/cartoes", label: "Cartões" },
  { href: "/recorrencias", label: "Recorrências" },
  { href: "/contas-a-pagar", label: "Contas a pagar" },
  { href: "/contas-a-receber", label: "Contas a receber" },
  { href: "/parcelamentos", label: "Parcelamentos" },
  { href: "/relatorios", label: "Relatórios" }
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-slate-200 bg-slate-900 text-white">
          <div className="px-6 py-6">
            <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Painel Financeiro</div>
            <div className="mt-2 text-xl font-semibold">Gestão Pessoal</div>
            <div className="mt-2 text-sm text-slate-400">Visual executivo / estilo Power BI</div>
          </div>

          <nav className="space-y-1 px-3 pb-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-4 py-3 text-sm text-slate-200 transition hover:bg-slate-800 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
