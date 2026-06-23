import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const DEFAULT_USER_EMAIL = "marcelo@example.com";

const createTransactionSchema = z.object({
  accountId: z.string().optional().nullable(),
  cardId: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  type: z.enum(["INCOME", "EXPENSE", "TRANSFER", "INVESTMENT", "ADJUSTMENT"]),
  description: z.string().min(1),
  amount: z.coerce.number().positive(),
  transactionDate: z.string()
});

async function getDefaultUser() {
  return prisma.user.findUniqueOrThrow({ where: { email: DEFAULT_USER_EMAIL } });
}

export async function GET() {
  const user = await getDefaultUser();
  const transactions = await prisma.transaction.findMany({
    where: { userId: user.id },
    include: { account: true, card: true, category: true },
    orderBy: { transactionDate: "desc" }
  });
  return NextResponse.json({ ok: true, data: transactions });
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = createTransactionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }
  const user = await getDefaultUser();
  const transaction = await prisma.transaction.create({
    data: {
      userId: user.id,
      accountId: parsed.data.accountId || null,
      cardId: parsed.data.cardId || null,
      categoryId: parsed.data.categoryId || null,
      type: parsed.data.type,
      description: parsed.data.description,
      amount: parsed.data.amount,
      transactionDate: new Date(parsed.data.transactionDate)
    }
  });
  return NextResponse.json({ ok: true, data: transaction }, { status: 201 });
}
