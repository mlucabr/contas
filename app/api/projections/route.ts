import { NextResponse } from "next/server";
import { getProjection } from "@/lib/projections";

export async function GET() {
  const data = await getProjection(6);
  return NextResponse.json({ ok: true, data });
}
