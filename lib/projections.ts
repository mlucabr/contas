import { addMonths, startOfMonth } from "date-fns";
import { prisma } from "@/lib/prisma";

const DEFAULT_USER_EMAIL = "marcelo@example.com";

function toMonthKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export async function getProjection(monthsAhead = 6) {
  const user = await prisma.user.findUniqueOrThrow({ where: { email: DEFAULT_USER_EMAIL } });
  const accounts = await prisma.account.findMany({ where: { userId: user.id } });
  const payables = await prisma.payable.findMany({ where: { userId: user.id, status: "OPEN" } });
  const receivables = await prisma.receivable.findMany({ where: { userId: user.id, status: "OPEN" } });
  const recurringEntries = await prisma.recurringEntry.findMany({ where: { userId: user.id, active: true } });
  const cardBills = await prisma.cardBill.findMany({ where: { userId: user.id, status: "OPEN" } });

  let rollingCash = accounts.filter((a) => a.includeInCash).reduce((sum, a) => sum + Number(a.currentBalance), 0);
  const base = startOfMonth(new Date());

  return Array.from({ length: monthsAhead }, (_, i) => {
    const monthDate = addMonths(base, i);
    const monthKey = toMonthKey(monthDate);

    const payableTotal = payables.filter((p) => toMonthKey(new Date(p.dueDate)) === monthKey).reduce((sum, p) => sum + Number(p.amount), 0);
    const receivableTotal = receivables.filter((r) => toMonthKey(new Date(r.dueDate)) === monthKey).reduce((sum, r) => sum + Number(r.amount), 0);
    const recurringIncome = recurringEntries.filter((r) => r.type === "INCOME").reduce((sum, r) => sum + Number(r.amount), 0);
    const recurringExpense = recurringEntries.filter((r) => r.type === "EXPENSE" || r.type === "INVESTMENT").reduce((sum, r) => sum + Number(r.amount), 0);
    const openCardBills = cardBills.filter((b) => toMonthKey(new Date(b.referenceMonth)) === monthKey).reduce((sum, b) => sum + Number(b.totalAmount), 0);

    const totalIn = receivableTotal + recurringIncome;
    const totalOut = payableTotal + recurringExpense + openCardBills;
    rollingCash += totalIn - totalOut;

    return { monthKey, entradas: totalIn, saidas: totalOut, saldoProjetado: rollingCash };
  });
}
