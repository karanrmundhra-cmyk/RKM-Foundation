import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { dbEnabled, dbFetch } from "@/lib/db";
import { suppressEmail } from "@/lib/updates-data";

export const dynamic = "force-dynamic";

/**
 * Resend delivery webhook (Svix signing scheme): base64 HMAC-SHA256 of
 * "{id}.{timestamp}.{payload}" with the base64 secret after "whsec_".
 * Same trust posture as the Razorpay webhook: invalid signature -> 401.
 */
function verifySvix(secret: string, id: string, timestamp: string, payload: string, signatures: string): boolean {
  if (!id || !timestamp || !signatures) return false;
  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(Date.now() / 1000 - ts) > 300) return false; // 5-min tolerance
  const key = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  const expected = createHmac("sha256", key).update(`${id}.${timestamp}.${payload}`).digest("base64");
  for (const part of signatures.split(" ")) {
    const sig = part.includes(",") ? part.split(",")[1] : part;
    try {
      const a = Buffer.from(sig, "base64"); const b = Buffer.from(expected, "base64");
      if (a.length === b.length && timingSafeEqual(a, b)) return true;
    } catch { /* malformed part */ }
  }
  return false;
}

export async function POST(req: NextRequest) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "not configured" }, { status: 503 });
  if (!dbEnabled()) return NextResponse.json({ error: "not configured" }, { status: 503 });
  const payload = await req.text();
  const ok = verifySvix(
    secret,
    req.headers.get("svix-id") ?? "",
    req.headers.get("svix-timestamp") ?? "",
    payload,
    req.headers.get("svix-signature") ?? "",
  );
  if (!ok) return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  let event: any;
  try { event = JSON.parse(payload); } catch { return NextResponse.json({ error: "invalid payload" }, { status: 400 }); }
  const type: string = event?.type ?? "";
  const providerId: string | undefined = event?.data?.email_id;
  const to: string | undefined = Array.isArray(event?.data?.to) ? event.data.to[0] : event?.data?.to;
  try {
    const patch: Record<string, unknown> | null =
      type === "email.delivered" ? { status: "delivered" } :
      type === "email.bounced" ? { status: "bounced", error: String(event?.data?.bounce?.message ?? "bounced").slice(0, 300) } :
      type === "email.complained" ? { status: "complained" } :
      type === "email.opened" ? { opened_at: new Date().toISOString() } :
      type === "email.clicked" ? { clicked_at: new Date().toISOString() } :
      null;
    if (patch && providerId) {
      await dbFetch(`email_send?provider_id=eq.${encodeURIComponent(providerId)}`, { method: "PATCH", body: JSON.stringify(patch) });
    }
    // Hard bounces & complaints feed the suppression list (consent + reputation).
    if (to && (type === "email.bounced" || type === "email.complained")) {
      await suppressEmail(to, type === "email.bounced" ? "bounced" : "complained");
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[webhooks/resend]", e);
    return NextResponse.json({ error: "processing failed" }, { status: 500 });
  }
}
