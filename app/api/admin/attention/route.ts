import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { dbEnabled } from "@/lib/db";
import { buildAttentionReport, buildSendStats, buildTodayStats } from "@/lib/attention";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!dbEnabled()) return NextResponse.json({ error: "not configured" }, { status: 503 });
  try {
    const [attention, today, sendStats] = await Promise.all([buildAttentionReport(), buildTodayStats(), buildSendStats()]);
    return NextResponse.json({ attention, today, sendStats });
  } catch (e) {
    console.error("[admin/attention]", e);
    return NextResponse.json({ error: "scan failed" }, { status: 500 });
  }
}
