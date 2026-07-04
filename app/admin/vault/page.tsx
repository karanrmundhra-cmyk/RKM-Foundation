"use client";
// /admin/vault — Knowledge Vault (4E · M5): versioned private documents,
// search, signed downloads, publish-to-website. Append-only: never delete.
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { adminFetch, getToken, setToken } from "../adminApi";

type Doc = { document_id: string; title: string; category: string; tags: string[]; version: number; supersedes_id: string | null; published_path: string | null; notes: string | null; created_at: string; is_superseded: boolean };
const CATEGORIES = ["legal", "compliance", "vendor", "sop", "brand", "board", "other"];

export default function VaultPage() {
  const [tokenInput, setTokenInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [docs, setDocs] = useState<Doc[]>([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [busy, setBusy] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [up, setUp] = useState({ title: "", category: "legal", tags: "", notes: "", supersedes: "" });
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setErr("");
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (cat) params.set("category", cat);
      const r = await adminFetch(`/api/admin/vault?${params}`);
      if (r.status === 401) { setUnlocked(false); setErr("Invalid or missing admin token."); return; }
      const j = await r.json();
      if (!r.ok) { setErr(j?.error ?? "Could not load."); return; }
      setDocs(j.documents ?? []);
      setUnlocked(true);
    } catch { setErr("Network error."); }
  }, [q, cat]);

  useEffect(() => { if (getToken()) void load(); }, [load]);

  function unlock(e: React.FormEvent) { e.preventDefault(); setToken(tokenInput); void load(); }

  async function uploadFile(f: File | undefined) {
    if (!f) return;
    if (!up.title.trim()) { setErr("Give the document a title first."); return; }
    setBusy(true); setErr(""); setOk("");
    try {
      const params = new URLSearchParams({ title: up.title.trim(), category: up.category, tags: up.tags, notes: up.notes });
      if (up.supersedes) params.set("supersedes", up.supersedes);
      const r = await adminFetch(`/api/admin/vault?${params}`, { method: "POST", headers: { "Content-Type": f.type || "application/pdf" }, body: f });
      const j = await r.json();
      if (!r.ok) { setErr(j?.error ?? "Upload failed."); return; }
      setOk(`Saved: ${j.document.title} (v${j.document.version}).`);
      setUp({ title: "", category: up.category, tags: "", notes: "", supersedes: "" });
      await load();
    } finally { setBusy(false); if (fileRef.current) fileRef.current.value = ""; }
  }

  async function download(id: string) {
    setErr("");
    const r = await adminFetch(`/api/admin/vault/file?document_id=${id}`);
    const j = await r.json();
    if (!r.ok || !j.url) { setErr(j?.error ?? "Download failed."); return; }
    window.open(j.url, "_blank", "noopener");
  }

  async function publish(id: string) {
    setErr(""); setOk("");
    const r = await adminFetch("/api/admin/vault/publish", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ document_id: id }) });
    const j = await r.json();
    if (!r.ok) { setErr(j?.error ?? "Publish failed."); return; }
    setOk(`Published — public URL copied below (link it from the site via the register): ${j.public_url}`);
    await load();
  }

  const visible = docs.filter((d) => showOld || !d.is_superseded);

  return (
    <main className="container-c py-12">
      <p className="eyebrow">Admin · Knowledge Vault</p>
      <h1 className="h-display mt-2 text-3xl sm:text-4xl">Every document, versioned.</h1>
      <p className="mt-2 text-sm text-ink/60">Private storage, append-only history, signed downloads. <Link className="link-secondary" href="/admin">← Admin home</Link></p>
      {err ? <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{err}</p> : null}
      {ok ? <p className="mt-4 rounded-xl bg-snow px-4 py-3 text-sm text-copper-dark break-all" role="status">{ok}</p> : null}

      {!unlocked ? (
        <form onSubmit={unlock} className="card mt-8 max-w-md p-6">
          <label className="label-c" htmlFor="tok">Admin access token</label>
          <input id="tok" type="password" className="input-c" value={tokenInput} onChange={(e) => setTokenInput(e.target.value)} autoComplete="off" />
          <button className="btn-dark mt-4 w-full">Unlock</button>
        </form>
      ) : (
        <>
          <div className="card mt-8 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper-dark">Add a document</p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div><label className="label-c" htmlFor="vt">Title</label><input id="vt" className="input-c" maxLength={200} value={up.title} onChange={(e) => setUp({ ...up, title: e.target.value })} placeholder="80G Certificate 2027 renewal" /></div>
              <div><label className="label-c" htmlFor="vc">Category</label>
                <select id="vc" className="input-c" value={up.category} onChange={(e) => setUp({ ...up, category: e.target.value })}>{CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
              <div><label className="label-c" htmlFor="vg">Tags <span className="text-ink/50">(comma-separated)</span></label><input id="vg" className="input-c" value={up.tags} onChange={(e) => setUp({ ...up, tags: e.target.value })} placeholder="80g, tax, certificate" /></div>
              <div><label className="label-c" htmlFor="vs">Supersedes <span className="text-ink/50">(optional — replaces an existing doc)</span></label>
                <select id="vs" className="input-c" value={up.supersedes} onChange={(e) => setUp({ ...up, supersedes: e.target.value })}>
                  <option value="">— new document —</option>
                  {docs.filter((d) => !d.is_superseded).map((d) => <option key={d.document_id} value={d.document_id}>{d.title} (v{d.version})</option>)}
                </select></div>
            </div>
            <div className="mt-3"><label className="label-c" htmlFor="vn">Notes <span className="text-ink/50">(optional)</span></label><input id="vn" className="input-c" maxLength={500} value={up.notes} onChange={(e) => setUp({ ...up, notes: e.target.value })} /></div>
            <input ref={fileRef} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.docx,.xlsx,.txt,.md" onChange={(e) => void uploadFile(e.target.files?.[0])} />
            <button type="button" className="btn-copper mt-4" disabled={busy || !up.title.trim()} onClick={() => fileRef.current?.click()}>{busy ? "Uploading…" : "Choose file & save"}</button>
          </div>

          <div className="mt-8 flex flex-wrap items-end gap-3">
            <div className="grow max-w-xs"><label className="label-c" htmlFor="vq">Search</label><input id="vq" className="input-c" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && void load()} placeholder="title or notes…" /></div>
            <div><label className="label-c" htmlFor="vf">Category</label>
              <select id="vf" className="input-c" value={cat} onChange={(e) => setCat(e.target.value)}><option value="">all</option>{CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
            <button type="button" className="btn-dark" onClick={() => void load()}>Search</button>
            <label className="flex items-center gap-2 text-sm text-ink/60"><input type="checkbox" checked={showOld} onChange={(e) => setShowOld(e.target.checked)} className="accent-copper-dark" /> show superseded versions</label>
          </div>

          <ul className="mt-4 divide-y divide-ink/10">
            {visible.length === 0 ? <li className="py-6 text-sm text-ink/60">No documents{q || cat ? " match" : " yet — add the six public certificates first"}.</li> : visible.map((d) => (
              <li key={d.document_id} className={`flex flex-wrap items-center justify-between gap-3 py-4 ${d.is_superseded ? "opacity-50" : ""}`}>
                <div>
                  <p className="text-sm font-semibold">{d.title} <span className="font-normal text-ink/50">v{d.version}{d.is_superseded ? " · superseded" : ""}</span></p>
                  <p className="mt-0.5 text-xs text-ink/60">{d.category}{d.tags?.length ? ` · ${d.tags.join(", ")}` : ""} · {String(d.created_at).slice(0, 10)}{d.published_path ? " · published to website" : ""}</p>
                  {d.notes ? <p className="mt-0.5 text-xs text-ink/50">{d.notes}</p> : null}
                </div>
                <div className="flex gap-2">
                  <button type="button" className="btn-light !py-2 !text-sm" onClick={() => void download(d.document_id)}>Download</button>
                  {!d.is_superseded && <button type="button" className="btn-light !py-2 !text-sm" onClick={() => void publish(d.document_id)}>{d.published_path ? "Re-publish" : "Publish"}</button>}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
