import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { dbConfig, dbEnabled, dbFetch } from "@/lib/db";

export const dynamic = "force-dynamic";

/** Signed 5-minute download URL for a vault object (staff only). */
export async function GET(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!dbEnabled()) return NextResponse.json({ error: "not configured" }, { status: 503 });
  const id = req.nextUrl.searchParams.get("document_id") ?? "";
  if (!/^[0-9a-f-]{36}$/.test(id)) return NextResponse.json({ error: "invalid id" }, { status: 400 });
  try {
    const rows = await dbFetch(`document?document_id=eq.${id}&select=storage_path`);
    const doc = rows?.[0];
    if (!doc) return NextResponse.json({ error: "not found" }, { status: 404 });
    const { url, key } = dbConfig();
    const sign = await fetch(`${url}/storage/v1/object/sign/vault/${doc.storage_path}`, {
      method: "POST",
      headers: { apikey: key!, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ expiresIn: 300 }),
    });
    if (!sign.ok) return NextResponse.json({ error: "could not sign" }, { status: 502 });
    const j = await sign.json();
    return NextResponse.json({ url: `${url}/storage/v1${j.signedURL}` });
  } catch (e) {
    console.error("[vault] file", e);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
