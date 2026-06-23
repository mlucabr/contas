import { prisma } from "./prisma";

const DEFAULT_USER_EMAIL = "marcelo@example.com";

export async function getOrCreateDefaultUser() {
  const existing = await prisma.user.findUnique({ where: { email: DEFAULT_USER_EMAIL } });
  if (existing) return existing;

  return prisma.user.create({
    data: {
      email: DEFAULT_USER_EMAIL,
      name: "Marcelo"
    },
  });
}

export async function getDashboardSummary() {
  const user = await getOrCreateDefaultUser();

  const accounts = await prisma.account.findMany({ where: { userId: user.id } });
  const payables = await prisma.payable.findMany({
    where: {
      userId: user.id,
      status: "OPEN",
      dueDate: { lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    },
  });
  const receivables = await prisma.receivable.findMany({
    where: {
      userId: user.id,
      status: "OPEN",
      dueDate: { lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    },
  });
  const openBills = await prisma.cardBill.findMany({ where: { userId: user.id, status: "OPEN" } });

  const caixaDisponivel = accounts.filter((a) => a.includeInCash).reduce((sum, a) => sum + Number(a.currentBalance), 0);
  const patrimonioInvestido = accounts.filter((a) => !a.includeInCash || a.type === "INVESTMENT").reduce((sum, a) => sum + Number(a.currentBalance), 0);
  const contasAPagar30d = payables.reduce((sum, p) => sum + Number(p.amount), 0);
  const contasAReceber30d = receivables.reduce((sum, r) => sum + Number(r.amount), 0);
  const faturaAberta = openBills.reduce((sum, b) => sum + Number(b.totalAmount), 0);
  const saldoPrevistoMes = caixaDisponivel + contasAReceber30d - contasAPagar30d - faturaAberta;

  return { caixaDisponivel, patrimonioInvestido, contasAPagar30d, contasAReceber30d, faturaAberta, saldoPrevistoMes };
}
