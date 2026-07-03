import { NextRequest, NextResponse } from "next/server";
import { completeCompliance, dbEnabled } from "@/lib/db";
import { throttle, validate } from "@/lib/guard";

const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "?";
    if (!throttle(`compliance:${ip}`, 6)) return NextResponse.json({ error: "Too many attempts." }, { status: 429 });
    let b: Record<string, unknown>;
    try { b = await req.json(); } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
    const v = validate(b, {
      email: { required: true, email: true }, pan: { required: true, max: 10 },
      name_as_per_pan: { required: true, max: 120 }, address_line: { max: 300 },
      city: { max: 80 }, state: { max: 80 }, pincode: { max: 10 },
    });
    if ("error" in v) return NextResponse.json({ error: v.error }, { status: 400 });
    const pan = v.clean!.pan.toUpperCase();
    if (!PAN_RE.test(pan)) return NextResponse.json({ error: "Invalid PAN format (e.g. ABCDE1234F)" }, { status: 400 });
    if (!dbEnabled()) { console.log("[compliance] (db not configured)", v.clean!.email); return NextResponse.json({ ok: true, pending: true }); }
    await completeCompliance(v.clean!.email, { ...v.clean!, pan } as any);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[compliance]", e);
    return NextResponse.json({ error: "Could not save. Please try again or email info@rkm.support." }, { status: 500 });
  }
}
