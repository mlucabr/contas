import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true, message: "Exportação Excel será conectada na próxima etapa." });
}
