import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const DEFAULT_USER_EMAIL = "marcelo@example.com";

const createAccountSchema = z.object({
  name: z.string().min(1),
  institution: z.string().optional().nullable(),
  type: z.enum(["CHECKING", "SAVINGS", "INVESTMENT", "CASH", "RESERVE"]),
  includeInCash: z.boolean(),
  openingBalance: z.coerce.number(),
  currentBalance: z.coerce.number()
});

async function getDefaultUser() {
  return prisma.user.findUniqueOrThrow({ where: { email: DEFAULT_USER_EMAIL } });
}

export async function GET() {
  const user = await getDefaultUser();
  const accounts = await prisma.account.findMany({ where: { userId: user.id }, orderBy: { createdAt: "asc" } });
  return NextResponse.json({ ok: true, data: accounts });
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = createAccountSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }
  const user = await getDefaultUser();
  const account = await prisma.account.create({ data: { userId: user.id, ...parsed.data } });
  return NextResponse.json({ ok: true, data: account }, { status: 201 });
}
