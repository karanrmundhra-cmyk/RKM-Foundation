// lib/updates-data.ts — data layer for the monthly impact update (content spine).
// Server-only. All access via the service-key REST client in lib/db.ts.
import { dbEnabled, dbFetch } from "./db";

export type UpdateStatus = "draft" | "preview_sent" | "approved" | "sending" | "sent" | "skipped";

export type StoryPhoto = { photo_id: string; storage_path: string; email_path: string | null; width: number | null; height: number | null; alt: string };
export type Story = { story_id: string; update_id: string; animal_name: string; note_en: string; note_hi: string | null; sort: number; photos: StoryPhoto[] };
export type Update = {
  update_id: string; month: string; status: UpdateStatus;
  subject_en: string | null; subject_hi: string | null;
  intro_en: string | null; intro_hi: string | null;
  totals: { meals?: number; vaccinations?: number; treatments?: number } | null;
  recipient_count: number | null;
  created_at: string; approved_at: string | null; sent_at: string | null;
  stories: Story[];
};

const SELECT = "select=*,story(*,story_photo(*))";

function shape(row: any): Update {
  const stories: Story[] = (row.story ?? [])
    .map((s: any) => ({ ...s, photos: (s.story_photo ?? []).sort((a: any, b: any) => a.created_at < b.created_at ? -1 : 1) }))
    .sort((a: Story, b: Story) => a.sort - b.sort);
  const { story: _s, ...rest } = row;
  return { ...rest, stories } as Update;
}

export async function getUpdateByMonth(month: string): Promise<Update | null> {
  if (!dbEnabled()) return null;
  const rows = await dbFetch(`update?month=eq.${encodeURIComponent(month)}&${SELECT}`);
  return rows?.[0] ? shape(rows[0]) : null;
}

export async function getUpdateById(id: string): Promise<Update | null> {
  const rows = await dbFetch(`update?update_id=eq.${id}&${SELECT}`);
  return rows?.[0] ? shape(rows[0]) : null;
}

/** Sent updates, newest first — the public Ledger. */
export async function listSentUpdates(limit = 60): Promise<Update[]> {
  if (!dbEnabled()) return [];
  try {
    const rows = await dbFetch(`update?status=eq.sent&order=month.desc&limit=${limit}&${SELECT}`);
    return (rows ?? []).map(shape);
  } catch (e) {
    console.error("[updates] listSent", e);
    return [];
  }
}

export async function listAllUpdates(): Promise<Update[]> {
  const rows = await dbFetch(`update?order=month.desc&limit=100&${SELECT}`);
  return (rows ?? []).map(shape);
}

export async function upsertDraft(input: {
  month: string;
  subject_en?: string; subject_hi?: string;
  intro_en?: string; intro_hi?: string;
  totals?: Record<string, number> | null;
  stories?: { animal_name: string; note_en: string; note_hi?: string; sort: number; photos: { storage_path: string; email_path?: string; width?: number; height?: number; alt?: string }[] }[];
}): Promise<Update> {
  const existing = await getUpdateByMonth(input.month);
  if (existing && !["draft", "preview_sent"].includes(existing.status)) {
    throw new Error("update-locked"); // approved/sending/sent/skipped updates are immutable via compose
  }
  let updateId = existing?.update_id;
  const patch = {
    subject_en: input.subject_en ?? null, subject_hi: input.subject_hi ?? null,
    intro_en: input.intro_en ?? null, intro_hi: input.intro_hi ?? null,
    totals: input.totals ?? null,
    status: "draft",
  };
  if (updateId) {
    await dbFetch(`update?update_id=eq.${updateId}`, { method: "PATCH", body: JSON.stringify(patch) });
  } else {
    const rows = await dbFetch("update", { method: "POST", body: JSON.stringify({ month: input.month, ...patch }) });
    updateId = rows[0].update_id;
  }
  if (input.stories) {
    // Replace-all semantics for draft stories: simplest correct model for a
    // single-editor compose screen (photos cascade).
    await dbFetch(`story?update_id=eq.${updateId}`, { method: "DELETE" });
    for (const s of input.stories) {
      const srows = await dbFetch("story", {
        method: "POST",
        body: JSON.stringify({ update_id: updateId, animal_name: s.animal_name, note_en: s.note_en, note_hi: s.note_hi ?? null, sort: s.sort }),
      });
      const storyId = srows[0].story_id;
      for (const p of s.photos) {
        await dbFetch("story_photo", {
          method: "POST",
          body: JSON.stringify({ story_id: storyId, storage_path: p.storage_path, email_path: p.email_path ?? null, width: p.width ?? null, height: p.height ?? null, alt: p.alt ?? "" }),
        });
      }
    }
  }
  return (await getUpdateById(updateId!))!;
}

export async function setUpdateStatus(updateId: string, status: UpdateStatus, extra: Record<string, unknown> = {}) {
  await dbFetch(`update?update_id=eq.${updateId}`, { method: "PATCH", body: JSON.stringify({ status, ...extra }) });
}

/** Recipients = paid donors with an email + newsletter subscribers − suppression. Deduped. */
export async function computeRecipients(): Promise<{ email: string; donor_id: string | null; name: string | null; paidPaiseThisMonth: number; lang: "en" | "hi" }[]> {
  const [donations, donors, subscribers, suppressed] = await Promise.all([
    dbFetch("donation?status=eq.paid&select=donor_id,gross_amount_paise,created_at&limit=100000"),
    dbFetch("donor?email=not.is.null&select=donor_id,email,full_name&limit=100000"),
    dbFetch("subscriber?select=email,lang&limit=100000"),
    dbFetch("suppression?select=email&limit=100000"),
  ]);
  const stop = new Set((suppressed ?? []).map((s: any) => String(s.email).toLowerCase()));
  const monthStart = new Date(); monthStart.setDate(1); monthStart.setHours(0, 0, 0, 0);
  const paidByDonor = new Map<string, number>();
  for (const d of donations ?? []) {
    const ts = new Date(d.created_at);
    if (ts >= monthStart) paidByDonor.set(d.donor_id, (paidByDonor.get(d.donor_id) ?? 0) + (d.gross_amount_paise ?? 0));
    else if (!paidByDonor.has(d.donor_id)) paidByDonor.set(d.donor_id, 0); // paid donor, not this month
  }
  const out = new Map<string, { email: string; donor_id: string | null; name: string | null; paidPaiseThisMonth: number; lang: "en" | "hi" }>();
  for (const d of donors ?? []) {
    const email = String(d.email).toLowerCase();
    if (!email || stop.has(email)) continue;
    if (!paidByDonor.has(d.donor_id)) continue; // only donors who have ever paid
    out.set(email, { email, donor_id: d.donor_id, name: d.full_name ?? null, paidPaiseThisMonth: paidByDonor.get(d.donor_id) ?? 0, lang: "en" });
  }
  for (const s of subscribers ?? []) {
    const email = String(s.email).toLowerCase();
    if (!email || stop.has(email) || out.has(email)) continue;
    out.set(email, { email, donor_id: null, name: null, paidPaiseThisMonth: 0, lang: (s.lang === "hi" ? "hi" : "en") });
  }
  return Array.from(out.values());
}

export async function addSubscriber(email: string, lang: "en" | "hi", source: string) {
  try {
    await dbFetch("subscriber?on_conflict=email", { method: "POST", headers: { Prefer: "resolution=merge-duplicates" }, body: JSON.stringify({ email: email.toLowerCase(), lang, source }) });
  } catch (e) { console.error("[subscriber] add", e); }
}

export async function suppressEmail(email: string, reason: "unsubscribed" | "bounced" | "complained" | "manual") {
  try {
    await dbFetch("suppression?on_conflict=email", { method: "POST", headers: { Prefer: "resolution=merge-duplicates" }, body: JSON.stringify({ email: email.toLowerCase(), reason }) });
    await dbFetch(`subscriber?email=eq.${encodeURIComponent(email.toLowerCase())}`, { method: "DELETE" });
  } catch (e) { console.error("[suppression] add", e); }
}
