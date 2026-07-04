"use client";
// /admin/updates — the founder compose screen (IM-01 Phase A).
// Drop photos, one line per animal, optional totals -> "Send me the preview".
// Donor sends happen ONLY via the signed buttons in the preview email.
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { adminFetch, getToken, setToken } from "../adminApi";

type Photo = { storage_path: string; alt?: string };
type Story = { animal_name: string; note_en: string; note_hi: string; photos: Photo[] };
type UpdateRow = {
  update_id: string; month: string; status: string; recipient_count: number | null; sent_at: string | null;
  subject_en: string | null; intro_en: string | null;
  totals: { meals?: number; vaccinations?: number; treatments?: number } | null;
  stories: { animal_name: string; note_en: string; note_hi: string | null; photos: { storage_path: string; alt: string }[] }[];
};

function currentMonth(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

const EDITABLE = ["draft", "preview_sent"];

export default function AdminUpdatesPage() {
  const [tokenInput, setTokenInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [busy, setBusy] = useState(false);
  const [list, setList] = useState<UpdateRow[]>([]);
  const [month, setMonth] = useState(currentMonth());
  const [subjectEn, setSubjectEn] = useState("");
  const [introEn, setIntroEn] = useState("");
  const [totals, setTotals] = useState({ meals: "", vaccinations: "", treatments: "" });
  const [stories, setStories] = useState<Story[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState(0);
  const selected = list.find((u) => u.month === month);
  const locked = !!selected && !EDITABLE.includes(selected.status);

  const load = useCallback(async () => {
    setErr(""); setBusy(true);
    try {
      const r = await adminFetch("/api/updates");
      if (r.status === 401) { setUnlocked(false); setErr("Invalid or missing admin token."); return; }
      const j = await r.json();
      if (!r.ok) { setErr(j?.error ?? "Could not load updates."); return; }
      setList(j.updates ?? []);
      setUnlocked(true);
    } catch { setErr("Network error."); } finally { setBusy(false); }
  }, []);

  useEffect(() => { if (getToken()) void load(); }, [load]);

  // Hydrate the form when switching to a month that already has a draft.
  useEffect(() => {
    const u = list.find((x) => x.month === month);
    if (!u) { setSubjectEn(""); setIntroEn(""); setTotals({ meals: "", vaccinations: "", treatments: "" }); setStories([]); return; }
    setSubjectEn(u.subject_en ?? "");
    setIntroEn(u.intro_en ?? "");
    setTotals({ meals: u.totals?.meals?.toString() ?? "", vaccinations: u.totals?.vaccinations?.toString() ?? "", treatments: u.totals?.treatments?.toString() ?? "" });
    setStories(u.stories.map((s) => ({ animal_name: s.animal_name, note_en: s.note_en, note_hi: s.note_hi ?? "", photos: s.photos.map((p) => ({ storage_path: p.storage_path, alt: p.alt })) })));
  }, [month, list]);

  function unlock(e: React.FormEvent) { e.preventDefault(); setToken(tokenInput); void load(); }

  async function save(): Promise<boolean> {
    setErr(""); setOk(""); setBusy(true);
    try {
      const r = await adminFetch("/api/updates", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          month, subject_en: subjectEn || undefined, intro_en: introEn || undefined,
          totals: { meals: totals.meals, vaccinations: totals.vaccinations, treatments: totals.treatments },
          stories: stories.map((s) => ({ animal_name: s.animal_name, note_en: s.note_en, note_hi: s.note_hi || undefined, photos: s.photos })),
        }),
      });
      const j = await r.json();
      if (!r.ok) { setErr(j?.error ?? "Save failed."); return false; }
      setOk("Draft saved.");
      await load();
      return true;
    } catch { setErr("Network error."); return false; } finally { setBusy(false); }
  }

  async function preview() {
    if (!stories.length) { setErr("Add at least one story first."); return; }
    if (!(await save())) return;
    setBusy(true); setErr(""); setOk("");
    try {
      const r = await adminFetch("/api/updates/preview", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ month }) });
      const j = await r.json();
      if (!r.ok) { setErr(j?.error ?? "Preview failed."); return; }
      setOk(`Preview sent to your inbox (${j.recipientCount} recipients when approved). Tap the button in the email to send or skip.`);
      await load();
    } catch { setErr("Network error."); } finally { setBusy(false); }
  }

  // Downscale in the browser (max 1600px JPEG) so uploads stay under serverless
  // body limits and emails stay light. HEIC or undecodable files upload as-is.
  async function toWebSize(f: File): Promise<{ blob: Blob; type: string }> {
    if (!["image/jpeg", "image/png", "image/webp"].includes(f.type)) return { blob: f, type: f.type };
    try {
      const bmp = await createImageBitmap(f);
      const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
      if (scale === 1 && f.size < 1_500_000) return { blob: f, type: f.type };
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(bmp.width * scale); canvas.height = Math.round(bmp.height * scale);
      canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", 0.82));
      return blob ? { blob, type: "image/jpeg" } : { blob: f, type: f.type };
    } catch { return { blob: f, type: f.type }; }
  }

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true); setErr("");
    try {
      for (const f of Array.from(files)) {
        const { blob, type } = await toWebSize(f);
        const r = await adminFetch(`/api/updates/photo?month=${month}`, { method: "POST", headers: { "Content-Type": type }, body: blob });
        const j = await r.json();
        if (!r.ok) { setErr(j?.error ?? "Upload failed."); continue; }
        setStories((prev) => prev.map((s, i) => i === uploadTarget ? { ...s, photos: [...s.photos, { storage_path: j.storage_path, alt: s.animal_name }] } : s));
      }
    } finally { setBusy(false); if (fileRef.current) fileRef.current.value = ""; }
  }

  const input = "input-c";
  return (
    <section className="bg-snow pb-24 pt-32">
      <div className="container-c max-w-3xl">
        <p className="eyebrow-index">Admin · Monthly update</p>
        <h1 className="display-3 mt-4">Compose {month}</h1>
        <p className="mt-3 text-sm text-ink/60">
          Drop photos, one line per animal, optional totals. Donor sends happen only from the
          signed buttons in your preview email — this screen can never email donors.{" "}
          <Link className="link-secondary" href="/admin">← Admin home</Link>
        </p>

        {!unlocked ? (
          <form onSubmit={unlock} className="card mt-8 max-w-md p-6">
            <label className="label-c" htmlFor="tok">Admin token</label>
            <input id="tok" type="password" className={input} value={tokenInput} onChange={(e) => setTokenInput(e.target.value)} placeholder="x-admin-token" />
            <button className="btn-copper mt-4" disabled={busy}>Unlock</button>
            {err ? <p className="mt-3 text-sm text-red-700">{err}</p> : null}
          </form>
        ) : (
          <>
            <div className="card mt-8 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label-c" htmlFor="month">Month</label>
                  <input id="month" type="month" className={input} value={month} onChange={(e) => setMonth(e.target.value)} />
                </div>
                <div>
                  <label className="label-c">Status</label>
                  <p className="mt-2 text-sm font-semibold text-copper-dark">{selected?.status ?? "new draft"}{selected?.sent_at ? ` · sent ${new Date(selected.sent_at).toLocaleDateString("en-IN")}` : ""}</p>
                </div>
              </div>
              {locked ? <p className="mt-4 text-sm text-ink/70">This update is {selected!.status} and can no longer be edited.</p> : (
                <>
                  <div className="mt-4">
                    <label className="label-c" htmlFor="subj">Subject (English) <span className="text-ink/50">— optional; a plain default is used if empty</span></label>
                    <input id="subj" className={input} maxLength={200} value={subjectEn} onChange={(e) => setSubjectEn(e.target.value)} placeholder="This month, you helped 3 animals — here's the proof" />
                  </div>
                  <div className="mt-4">
                    <label className="label-c" htmlFor="intro">Intro line (English) <span className="text-ink/50">— optional</span></label>
                    <input id="intro" className={input} maxLength={1000} value={introEn} onChange={(e) => setIntroEn(e.target.value)} placeholder="You showed up for the animals this month. Here's what that looked like." />
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    {(["meals", "vaccinations", "treatments"] as const).map((k) => (
                      <div key={k}>
                        <label className="label-c" htmlFor={k}>{k[0].toUpperCase() + k.slice(1)} <span className="text-ink/50">(optional)</span></label>
                        <input id={k} inputMode="numeric" className={input} value={totals[k]} onChange={(e) => setTotals({ ...totals, [k]: e.target.value.replace(/[^0-9]/g, "") })} placeholder="leave blank to omit" />
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-ink/55">Anything left blank simply doesn&apos;t appear. The system never invents numbers.</p>
                </>
              )}
            </div>

            {!locked && (
              <>
                {stories.map((s, i) => (
                  <div key={i} className="card mt-6 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper-dark">Story {i + 1}</p>
                      <button type="button" className="text-xs text-ink/50 underline underline-offset-2 hover:text-red-700" onClick={() => setStories(stories.filter((_, j) => j !== i))}>remove</button>
                    </div>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="label-c" htmlFor={`an-${i}`}>Animal name</label>
                        <input id={`an-${i}`} className={input} maxLength={80} value={s.animal_name} onChange={(e) => setStories(stories.map((x, j) => j === i ? { ...x, animal_name: e.target.value } : x))} placeholder="e.g. Bruno" />
                      </div>
                      <div>
                        <label className="label-c" htmlFor={`ph-${i}`}>Photos ({s.photos.length})</label>
                        <button type="button" className="btn-light w-full !py-2.5 !text-sm" onClick={() => { setUploadTarget(i); fileRef.current?.click(); }} disabled={busy || !s.animal_name.trim()}>
                          {s.animal_name.trim() ? "Add photos…" : "Name the animal first"}
                        </button>
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="label-c" htmlFor={`ne-${i}`}>One-line note (English)</label>
                      <input id={`ne-${i}`} className={input} maxLength={300} value={s.note_en} onChange={(e) => setStories(stories.map((x, j) => j === i ? { ...x, note_en: e.target.value } : x))} placeholder="treated for a leg wound, now walking again" />
                    </div>
                    <div className="mt-3">
                      <label className="label-c" htmlFor={`nh-${i}`}>One-line note (हिंदी) <span className="text-ink/50">— optional; English is used if empty</span></label>
                      <input id={`nh-${i}`} lang="hi" className={input} maxLength={300} value={s.note_hi} onChange={(e) => setStories(stories.map((x, j) => j === i ? { ...x, note_hi: e.target.value } : x))} placeholder="पैर के घाव का इलाज हुआ, अब चल रहा है" />
                    </div>
                    {s.photos.length ? (
                      <ul className="mt-3 flex flex-wrap gap-2 text-xs text-ink/60">
                        {s.photos.map((p, pi) => (
                          <li key={pi} className="rounded-full bg-snow px-3 py-1 ring-1 ring-ink/10">
                            {p.storage_path.split("/").pop()}{" "}
                            <button type="button" className="text-red-700" aria-label="remove photo" onClick={() => setStories(stories.map((x, j) => j === i ? { ...x, photos: x.photos.filter((_, q) => q !== pi) } : x))}>×</button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/heic" multiple className="hidden" onChange={(e) => void upload(e.target.files)} />
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" className="btn-light" onClick={() => setStories([...stories, { animal_name: "", note_en: "", note_hi: "", photos: [] }])} disabled={stories.length >= 12}>+ Add a story</button>
                  <button type="button" className="btn-dark" onClick={() => void save()} disabled={busy}>Save draft</button>
                  <button type="button" className="btn-copper" onClick={() => void preview()} disabled={busy || !stories.length}>Send me the preview</button>
                </div>
              </>
            )}

            {err ? <p className="mt-4 text-sm text-red-700" role="alert">{err}</p> : null}
            {ok ? <p className="mt-4 text-sm font-medium text-copper-dark" role="status">{ok}</p> : null}

            <div className="card-static mt-10 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper-dark">Past updates</p>
              {list.length === 0 ? <p className="mt-3 text-sm text-ink/60">None yet.</p> : (
                <ul className="mt-3 divide-y divide-ink/10 text-sm">
                  {list.map((u) => (
                    <li key={u.update_id} className="flex items-center justify-between gap-4 py-2.5">
                      <button type="button" className="font-medium underline-offset-4 hover:underline" onClick={() => setMonth(u.month)}>{u.month}</button>
                      <span className="text-ink/60">{u.status}{u.recipient_count != null ? ` · ${u.recipient_count} recipients` : ""}{u.status === "sent" ? <> · <a className="link-secondary" href={`/updates/${u.month}`} target="_blank" rel="noreferrer">view</a></> : null}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
