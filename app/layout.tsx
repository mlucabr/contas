import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel Financeiro Pessoal",
  description: "Controle financeiro pessoal com fluxo de caixa, cartões, recorrências e projeções."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
