import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { dbConfig, dbEnabled } from "@/lib/db";

export const dynamic = "force-dynamic";

const MAX_BYTES = 6 * 1024 * 1024; // 6MB — phone photos fit; keeps emails/web sane
const TYPES: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/heic": "heic" };

/**
 * Photo upload for the monthly update. Stores the original in the public
 * impact/ bucket at an immutable month-scoped path via the Storage REST API
 * (service key; no client-side uploads). Rendition generation is a listed
 * follow-up — emails reference the same object meanwhile.
 */
export async function POST(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!dbEnabled()) return NextResponse.json({ error: "not configured" }, { status: 503 });
  const month = req.nextUrl.searchParams.get("month") ?? "";
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) return NextResponse.json({ error: "month must be YYYY-MM" }, { status: 400 });
  const type = req.headers.get("content-type") ?? "";
  const ext = TYPES[type];
  if (!ext) return NextResponse.json({ error: "unsupported image type" }, { status: 415 });
  const buf = Buffer.from(await req.arrayBuffer());
  if (!buf.length) return NextResponse.json({ error: "empty upload" }, { status: 400 });
  if (buf.length > MAX_BYTES) return NextResponse.json({ error: "image too large (max 6MB)" }, { status: 413 });

  const { url, key } = dbConfig();
  const name = `${month}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const r = await fetch(`${url}/storage/v1/object/impact/${name}`, {
    method: "POST",
    headers: { apikey: key!, Authorization: `Bearer ${key}`, "Content-Type": type, "x-upsert": "false", "Cache-Control": "public, max-age=31536000, immutable" },
    body: buf,
  });
  if (!r.ok) {
    console.error("[updates/photo]", r.status, await r.text());
    return NextResponse.json({ error: "upload failed" }, { status: 502 });
  }
  return NextResponse.json({ storage_path: name });
}
