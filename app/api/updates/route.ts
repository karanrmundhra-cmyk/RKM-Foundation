import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { dbEnabled } from "@/lib/db";
import { validate, type Rule } from "@/lib/guard";
import { listAllUpdates, upsertDraft } from "@/lib/updates-data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!dbEnabled()) return NextResponse.json({ error: "not configured" }, { status: 503 });
  try {
    return NextResponse.json({ updates: await listAllUpdates() });
  } catch (e) {
    console.error("[updates] list", e);
    return NextResponse.json({ error: "list failed" }, { status: 500 });
  }
}

const DRAFT_RULES: Record<string, Rule> = {
  month: { required: true, max: 7 },
  subject_en: { max: 200 }, subject_hi: { max: 200 },
  intro_en: { max: 1000 }, intro_hi: { max: 1000 },
};

export async function POST(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!dbEnabled()) return NextResponse.json({ error: "not configured" }, { status: 503 });
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
  const check = validate(body ?? {}, DRAFT_RULES);
  if ("error" in check) return NextResponse.json({ error: check.error }, { status: 400 });
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(body.month)) return NextResponse.json({ error: "month must be YYYY-MM" }, { status: 400 });
  // Totals: founder-typed numbers only; anything non-numeric is rejected, never coerced.
  let totals: Record<string, number> | null = null;
  if (body.totals && typeof body.totals === "object") {
    totals = {};
    for (const k of ["meals", "vaccinations", "treatments"]) {
      const v = body.totals[k];
      if (v === undefined || v === null || v === "") continue;
      const n = Number(v);
      if (!Number.isInteger(n) || n < 0 || n > 1000000) return NextResponse.json({ error: `invalid total: ${k}` }, { status: 400 });
      totals[k] = n;
    }
    if (Object.keys(totals).length === 0) totals = null;
  }
  const stories = Array.isArray(body.stories) ? body.stories.slice(0, 12) : undefined;
  if (stories) {
    for (const s of stories) {
      if (!s || typeof s.animal_name !== "string" || !s.animal_name.trim() || s.animal_name.length > 80) return NextResponse.json({ error: "each story needs an animal name (≤80 chars)" }, { status: 400 });
      if (typeof s.note_en !== "string" || !s.note_en.trim() || s.note_en.length > 300) return NextResponse.json({ error: "each story needs a one-line note (≤300 chars)" }, { status: 400 });
      if (s.note_hi && (typeof s.note_hi !== "string" || s.note_hi.length > 300)) return NextResponse.json({ error: "invalid Hindi note" }, { status: 400 });
      if (!Array.isArray(s.photos) || s.photos.length > 8) return NextResponse.json({ error: "each story needs 0–8 uploaded photos" }, { status: 400 });
      for (const p of s.photos) {
        if (!p || typeof p.storage_path !== "string" || p.storage_path.includes("..") || !/^[\w\-\/\.]{1,200}$/.test(p.storage_path)) return NextResponse.json({ error: "invalid photo path" }, { status: 400 });
      }
    }
  }
  try {
    const u = await upsertDraft({
      month: body.month,
      subject_en: body.subject_en, subject_hi: body.subject_hi,
      intro_en: body.intro_en, intro_hi: body.intro_hi,
      totals,
      stories: stories?.map((s: any, i: number) => ({
        animal_name: s.animal_name.trim(), note_en: s.note_en.trim(), note_hi: s.note_hi?.trim() || undefined,
        sort: i, photos: s.photos.map((p: any) => ({ storage_path: p.storage_path, email_path: p.email_path, width: p.width, height: p.height, alt: p.alt })),
      })),
    });
    return NextResponse.json({ update: u });
  } catch (e: any) {
    if (String(e?.message).includes("update-locked")) return NextResponse.json({ error: "This update is already approved/sent and can no longer be edited." }, { status: 409 });
    console.error("[updates] upsert", e);
    return NextResponse.json({ error: "save failed" }, { status: 500 });
  }
}
