import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ ok: true, message: "Importação Excel será conectada na próxima etapa." });
}
