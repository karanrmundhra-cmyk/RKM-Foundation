import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { dbConfig, dbEnabled, dbFetch } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * Publish-to-website (4E): copies the vault object into the PUBLIC bucket at a
 * stable path and records it on the document row (audited by trigger). The
 * public URL can then be linked from the site through the normal register flow
 * — cert renewals stop being a developer task.
 */
export async function POST(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!dbEnabled()) return NextResponse.json({ error: "not configured" }, { status: 503 });
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
  const id = body?.document_id ?? "";
  if (!/^[0-9a-f-]{36}$/.test(id)) return NextResponse.json({ error: "invalid id" }, { status: 400 });
  try {
    const rows = await dbFetch(`document?document_id=eq.${id}&select=storage_path,title`);
    const doc = rows?.[0];
    if (!doc) return NextResponse.json({ error: "not found" }, { status: 404 });
    const { url, key } = dbConfig();
    const ext = String(doc.storage_path).split(".").pop();
    const slug = String(doc.title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "document";
    const dest = `published/${slug}.${ext}`;
    const copy = await fetch(`${url}/storage/v1/object/copy`, {
      method: "POST",
      headers: { apikey: key!, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ bucketId: "vault", sourceKey: doc.storage_path, destinationBucket: "impact", destinationKey: dest }),
    });
    if (!copy.ok && copy.status !== 409) {
      console.error("[vault] publish copy", copy.status, await copy.text());
      return NextResponse.json({ error: "copy failed" }, { status: 502 });
    }
    await dbFetch(`document?document_id=eq.${id}`, { method: "PATCH", body: JSON.stringify({ published_path: dest }) });
    return NextResponse.json({ ok: true, public_url: `${url}/storage/v1/object/public/impact/${dest}` });
  } catch (e) {
    console.error("[vault] publish", e);
    return NextResponse.json({ error: "publish failed" }, { status: 500 });
  }
}
