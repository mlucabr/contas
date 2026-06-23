import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const DEFAULT_USER_EMAIL = "marcelo@example.com";

const createCardSchema = z.object({
  name: z.string().min(1),
  brand: z.string().optional().nullable(),
  creditLimit: z.coerce.number(),
  closingDay: z.coerce.number().min(1).max(31),
  dueDay: z.coerce.number().min(1).max(31),
  linkedAccountId: z.string().optional().nullable()
});

async function getDefaultUser() {
  return prisma.user.findUniqueOrThrow({ where: { email: DEFAULT_USER_EMAIL } });
}

export async function GET() {
  const user = await getDefaultUser();
  const cards = await prisma.card.findMany({ where: { userId: user.id }, include: { linkedAccount: true }, orderBy: { createdAt: "asc" } });
  return NextResponse.json({ ok: true, data: cards });
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = createCardSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }
  const user = await getDefaultUser();
  const card = await prisma.card.create({ data: { userId: user.id, ...parsed.data } });
  return NextResponse.json({ ok: true, data: card }, { status: 201 });
}
