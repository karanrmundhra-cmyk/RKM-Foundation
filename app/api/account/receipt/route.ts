import { NextRequest, NextResponse } from "next/server";
import { dbConfig, dbEnabled, dbFetch } from "@/lib/db";
import { throttle } from "@/lib/guard";

export const dynamic = "force-dynamic";

/**
 * Signed receipt download (4D). The donor's Supabase session token is verified
 * against Auth (GET /auth/v1/user), ownership is re-checked with the service
 * key (defence in depth over RLS), then a 5-minute signed URL is issued for
 * the private receipts bucket object.
 */
export async function GET(req: NextRequest) {
  if (!dbEnabled()) return NextResponse.json({ error: "not configured" }, { status: 503 });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "?";
  if (!throttle(`acct-receipt:${ip}`, 30)) return NextResponse.json({ error: "too many requests" }, { status: 429 });
  const auth = req.headers.get("authorization") ?? "";
  const jwt = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const receiptId = req.nextUrl.searchParams.get("receipt_id") ?? "";
  if (!jwt || !/^[0-9a-f-]{36}$/.test(receiptId)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { url, key } = dbConfig();
  // 1) Who is this token? (Supabase verifies signature + expiry server-side.)
  const who = await fetch(`${url}/auth/v1/user`, { headers: { apikey: key!, Authorization: `Bearer ${jwt}` } });
  if (!who.ok) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const user = await who.json();
  const email = String(user?.email ?? "").toLowerCase();
  if (!email) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  try {
    // 2) Ownership: receipt -> donation -> donor.email must match the session.
    const rows = await dbFetch(`receipt?receipt_id=eq.${receiptId}&select=pdf_path,receipt_no,donation(donor(email))`);
    const r = rows?.[0];
    const owner = String(r?.donation?.donor?.email ?? "").toLowerCase();
    if (!r?.pdf_path || owner !== email) return NextResponse.json({ error: "not found" }, { status: 404 });

    // 3) Sign the storage object (pdf_path = "receipts/<object>").
    const object = String(r.pdf_path).replace(/^receipts\//, "");
    const sign = await fetch(`${url}/storage/v1/object/sign/receipts/${object}`, {
      method: "POST",
      headers: { apikey: key!, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ expiresIn: 300 }),
    });
    if (!sign.ok) {
      console.error("[account/receipt] sign", sign.status, await sign.text());
      return NextResponse.json({ error: "could not prepare download" }, { status: 502 });
    }
    const j = await sign.json();
    return NextResponse.json({ url: `${url}/storage/v1${j.signedURL}`, receipt_no: r.receipt_no });
  } catch (e) {
    console.error("[account/receipt]", e);
    return NextResponse.json({ error: "download failed" }, { status: 500 });
  }
}
