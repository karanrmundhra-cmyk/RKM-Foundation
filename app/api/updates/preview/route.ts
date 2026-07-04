import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { dbEnabled } from "@/lib/db";
import { getUpdateByMonth } from "@/lib/updates-data";
import { sendOwnerPreview } from "@/lib/update-send";

export const dynamic = "force-dynamic";

/** Sends the owner the exact donor email (EN+HI) with Send/Skip buttons. */
export async function POST(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!dbEnabled()) return NextResponse.json({ error: "not configured" }, { status: 503 });
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(body?.month ?? "")) return NextResponse.json({ error: "month must be YYYY-MM" }, { status: 400 });
  try {
    const u = await getUpdateByMonth(body.month);
    if (!u) return NextResponse.json({ error: "no draft for that month" }, { status: 404 });
    if (!["draft", "preview_sent"].includes(u.status)) return NextResponse.json({ error: `update is ${u.status}` }, { status: 409 });
    if (!u.stories.length) return NextResponse.json({ error: "add at least one story before previewing" }, { status: 400 });
    const { recipientCount } = await sendOwnerPreview(u);
    return NextResponse.json({ ok: true, recipientCount });
  } catch (e) {
    console.error("[updates/preview]", e);
    return NextResponse.json({ error: "preview failed" }, { status: 500 });
  }
}
