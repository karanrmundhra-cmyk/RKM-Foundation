import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { dbEnabled } from "@/lib/db";
import { getUpdateByMonth } from "@/lib/updates-data";
import { runSend } from "@/lib/update-send";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

/** Resume/retry a send for an already-approved update (admin). Never double-sends. */
export async function POST(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!dbEnabled()) return NextResponse.json({ error: "not configured" }, { status: 503 });
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(body?.month ?? "")) return NextResponse.json({ error: "month must be YYYY-MM" }, { status: 400 });
  try {
    const u = await getUpdateByMonth(body.month);
    if (!u) return NextResponse.json({ error: "not found" }, { status: 404 });
    // runSend enforces approved/sending; 'sent' retries only flush queued leftovers.
    const status = u.status === "sent" ? "sending" : u.status;
    if (!["approved", "sending"].includes(status)) return NextResponse.json({ error: `update is ${u.status}; approval happens only via the preview email buttons` }, { status: 409 });
    const res = await runSend(u.update_id);
    return NextResponse.json({ ok: true, ...res });
  } catch (e: any) {
    console.error("[updates/send]", e);
    return NextResponse.json({ error: String(e?.message ?? "send failed") }, { status: 500 });
  }
}
