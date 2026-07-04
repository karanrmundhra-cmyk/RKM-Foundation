import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { dbConfig, dbEnabled, dbFetch } from "@/lib/db";

export const dynamic = "force-dynamic";

const CATEGORIES = ["legal", "compliance", "vendor", "sop", "brand", "board", "other"];
const MAX_BYTES = 10 * 1024 * 1024;
const TYPES: Record<string, string> = {
  "application/pdf": "pdf", "image/jpeg": "jpg", "image/png": "png",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "text/plain": "txt", "text/markdown": "md",
};

/** GET: list / search the vault (title+tags+notes, pg_trgm-friendly ilike). */
export async function GET(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!dbEnabled()) return NextResponse.json({ error: "not configured" }, { status: 503 });
  const q = (req.nextUrl.searchParams.get("q") ?? "").slice(0, 100);
  const category = req.nextUrl.searchParams.get("category") ?? "";
  try {
    let path = "document?order=created_at.desc&limit=200&select=*";
    if (category && CATEGORIES.includes(category)) path += `&category=eq.${category}`;
    if (q) {
      const term = encodeURIComponent(`%${q.replace(/[%_]/g, "")}%`);
      path += `&or=(title.ilike.${term},notes.ilike.${term})`;
    }
    const rows = await dbFetch(path);
    // Hide superseded versions from the default view; the chain stays queryable.
    const supersededIds = new Set((rows ?? []).map((r: any) => r.supersedes_id).filter(Boolean));
    const docs = (rows ?? []).map((r: any) => ({ ...r, is_superseded: supersededIds.has(r.document_id) }));
    return NextResponse.json({ documents: docs });
  } catch (e) {
    console.error("[vault] list", e);
    return NextResponse.json({ error: "list failed" }, { status: 500 });
  }
}

/** POST: upload (binary body) + metadata via query params. Append-only versioning. */
export async function POST(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!dbEnabled()) return NextResponse.json({ error: "not configured" }, { status: 503 });
  const sp = req.nextUrl.searchParams;
  const title = (sp.get("title") ?? "").trim().slice(0, 200);
  const category = sp.get("category") ?? "";
  const tags = (sp.get("tags") ?? "").split(",").map((t) => t.trim()).filter(Boolean).slice(0, 10);
  const notes = (sp.get("notes") ?? "").trim().slice(0, 500) || null;
  const supersedes = sp.get("supersedes") ?? "";
  if (!title) return NextResponse.json({ error: "title required" }, { status: 400 });
  if (!CATEGORIES.includes(category)) return NextResponse.json({ error: `category must be one of ${CATEGORIES.join(", ")}` }, { status: 400 });
  if (supersedes && !/^[0-9a-f-]{36}$/.test(supersedes)) return NextResponse.json({ error: "invalid supersedes id" }, { status: 400 });
  const type = req.headers.get("content-type") ?? "";
  const ext = TYPES[type];
  if (!ext) return NextResponse.json({ error: "unsupported file type" }, { status: 415 });
  const buf = Buffer.from(await req.arrayBuffer());
  if (!buf.length) return NextResponse.json({ error: "empty upload" }, { status: 400 });
  if (buf.length > MAX_BYTES) return NextResponse.json({ error: "file too large (max 10MB)" }, { status: 413 });

  try {
    let version = 1;
    if (supersedes) {
      const prev = await dbFetch(`document?document_id=eq.${supersedes}&select=version`);
      if (!prev?.[0]) return NextResponse.json({ error: "superseded document not found" }, { status: 404 });
      version = (prev[0].version ?? 1) + 1;
    }
    const { url, key } = dbConfig();
    const object = `${category}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const up = await fetch(`${url}/storage/v1/object/vault/${object}`, {
      method: "POST",
      headers: { apikey: key!, Authorization: `Bearer ${key}`, "Content-Type": type, "x-upsert": "false" },
      body: buf,
    });
    if (!up.ok) {
      console.error("[vault] upload", up.status, await up.text());
      return NextResponse.json({ error: "upload failed" }, { status: 502 });
    }
    const rows = await dbFetch("document", {
      method: "POST",
      body: JSON.stringify({ title, category, tags, notes, storage_path: object, version, supersedes_id: supersedes || null, uploaded_by: "owner" }),
    });
    return NextResponse.json({ document: rows[0] });
  } catch (e) {
    console.error("[vault] create", e);
    return NextResponse.json({ error: "save failed" }, { status: 500 });
  }
}
