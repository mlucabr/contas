import { PrismaClient, AccountType, TransactionType, EntryStatus, Frequency } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = "marcelo@example.com";

  await prisma.transaction.deleteMany();
  await prisma.cardBill.deleteMany();
  await prisma.installmentPlan.deleteMany();
  await prisma.payable.deleteMany();
  await prisma.receivable.deleteMany();
  await prisma.recurringEntry.deleteMany();
  await prisma.card.deleteMany();
  await prisma.account.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany({ where: { email } });

  const user = await prisma.user.create({ data: { email, name: "Marcelo" } });

  await prisma.category.createMany({
    data: [
      { userId: user.id, name: "Moradia", kind: TransactionType.EXPENSE },
      { userId: user.id, name: "Supermercado", kind: TransactionType.EXPENSE },
      { userId: user.id, name: "Transporte", kind: TransactionType.EXPENSE },
      { userId: user.id, name: "Saúde", kind: TransactionType.EXPENSE },
      { userId: user.id, name: "Lazer", kind: TransactionType.EXPENSE },
      { userId: user.id, name: "Investimentos", kind: TransactionType.INVESTMENT },
      { userId: user.id, name: "Salário", kind: TransactionType.INCOME },
      { userId: user.id, name: "Outros", kind: null }
    ]
  });

  const allCategories = await prisma.category.findMany({ where: { userId: user.id } });
  const getCategoryId = (name: string) => allCategories.find((c) => c.name === name)?.id as string;

  const contaPrincipal = await prisma.account.create({
    data: { userId: user.id, name: "Conta Corrente Principal", institution: "Banco A", type: AccountType.CHECKING, includeInCash: true, openingBalance: 8500, currentBalance: 8500 }
  });

  const contaReserva = await prisma.account.create({
    data: { userId: user.id, name: "Conta Reserva", institution: "Banco B", type: AccountType.SAVINGS, includeInCash: true, openingBalance: 12400, currentBalance: 12400 }
  });

  const contaDiaADia = await prisma.account.create({
    data: { userId: user.id, name: "Conta do Dia a Dia", institution: "Banco C", type: AccountType.CHECKING, includeInCash: true, openingBalance: 3100, currentBalance: 3100 }
  });

  await prisma.account.create({
    data: { userId: user.id, name: "Conta Investimentos", institution: "Corretora", type: AccountType.INVESTMENT, includeInCash: false, openingBalance: 28000, currentBalance: 28000 }
  });

  const card1 = await prisma.card.create({
    data: { userId: user.id, name: "Visa Principal", brand: "Visa", creditLimit: 12000, closingDay: 10, dueDay: 17, linkedAccountId: contaPrincipal.id }
  });

  await prisma.card.create({
    data: { userId: user.id, name: "Master Reserva", brand: "Mastercard", creditLimit: 8000, closingDay: 18, dueDay: 25, linkedAccountId: contaReserva.id }
  });

  const today = new Date();
  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const dueDate = new Date(today.getFullYear(), today.getMonth(), 17);

  await prisma.cardBill.create({
    data: { userId: user.id, cardId: card1.id, referenceMonth: currentMonth, dueDate, totalAmount: 2450, status: EntryStatus.OPEN }
  });

  await prisma.transaction.createMany({
    data: [
      { userId: user.id, accountId: contaPrincipal.id, categoryId: getCategoryId("Salário"), type: TransactionType.INCOME, description: "Salário", amount: 9800, transactionDate: today },
      { userId: user.id, accountId: contaPrincipal.id, categoryId: getCategoryId("Moradia"), type: TransactionType.EXPENSE, description: "Aluguel", amount: 2400, transactionDate: today },
      { userId: user.id, accountId: contaDiaADia.id, categoryId: getCategoryId("Supermercado"), type: TransactionType.EXPENSE, description: "Supermercado", amount: 890, transactionDate: today },
      { userId: user.id, accountId: contaReserva.id, categoryId: getCategoryId("Investimentos"), type: TransactionType.INVESTMENT, description: "Aporte do mês", amount: 1500, transactionDate: today }
    ]
  });

  await prisma.payable.createMany({
    data: [
      { userId: user.id, accountId: contaPrincipal.id, categoryId: getCategoryId("Moradia"), description: "Condomínio", amount: 650, dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7), status: EntryStatus.OPEN },
      { userId: user.id, accountId: contaPrincipal.id, categoryId: getCategoryId("Saúde"), description: "Plano de saúde", amount: 420, dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10), status: EntryStatus.OPEN }
    ]
  });

  await prisma.receivable.createMany({
    data: [
      { userId: user.id, accountId: contaPrincipal.id, categoryId: getCategoryId("Outros"), description: "Reembolso", amount: 300, dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5), status: EntryStatus.OPEN }
    ]
  });

  await prisma.recurringEntry.createMany({
    data: [
      { userId: user.id, accountId: contaPrincipal.id, categoryId: getCategoryId("Salário"), type: TransactionType.INCOME, description: "Salário mensal", amount: 9800, frequency: Frequency.MONTHLY, dayOfMonth: 5, startDate: currentMonth, active: true },
      { userId: user.id, accountId: contaPrincipal.id, categoryId: getCategoryId("Moradia"), type: TransactionType.EXPENSE, description: "Aluguel mensal", amount: 2400, frequency: Frequency.MONTHLY, dayOfMonth: 10, startDate: currentMonth, active: true }
    ]
  });

  await prisma.installmentPlan.create({
    data: { userId: user.id, cardId: card1.id, description: "Notebook pessoal", totalAmount: 4800, installmentCount: 12, purchaseDate: new Date(today.getFullYear(), today.getMonth() - 1, 5), firstBillMonth: new Date(today.getFullYear(), today.getMonth() - 1, 1) }
  });

  console.log("Seed concluído com sucesso.");
}

main()
  .catch((e) => {
    console.error("Erro na seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
