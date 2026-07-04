"use client";
// /account/receipts (4D · M3 screen 3): every 80G receipt, self-served.
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { PortalNav, SignIn, inr, usePortalSession } from "../portal";

type Row = { receipt_id: string; receipt_no: string; financial_year: string; issued_at: string; donation_id: string; donation: { gross_amount_paise: number } | null };

export default function ReceiptsPage() {
  const { session, ready } = usePortalSession();
  const [rows, setRows] = useState<Row[] | null>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    if (!session) { setRows(null); return; }
    (async () => {
      const { data, error } = await supabaseBrowser()
        .from("receipt")
        .select("receipt_id,receipt_no,financial_year,issued_at,donation_id,donation(gross_amount_paise)")
        .order("issued_at", { ascending: false })
        .limit(200);
      if (error) setErr("Could not load receipts. Please try again.");
      else setRows((data as unknown as Row[]) ?? []);
    })();
  }, [session]);

  async function download(r: Row) {
    if (!session) return;
    setBusy(r.receipt_id); setErr("");
    try {
      const res = await fetch(`/api/account/receipt?receipt_id=${r.receipt_id}`, { headers: { Authorization: `Bearer ${session.access_token}` } });
      const j = await res.json();
      if (!res.ok || !j.url) { setErr(j?.error ?? "Download failed."); return; }
      window.open(j.url, "_blank", "noopener");
    } catch { setErr("Network error."); } finally { setBusy(null); }
  }

  return (
    <section className="bg-snow pb-24 pt-32 sm:pt-36">
      <div className="container-c max-w-4xl">
        <p className="eyebrow-index">Your account</p>
        <h1 className="display-3 mt-4">Receipts, on demand.</h1>
        {!ready ? <div className="card mt-10 h-40 animate-pulse" /> : !session ? <SignIn /> : (
          <>
            <PortalNav active="receipts" email={session.user.email ?? ""} />
            <div className="card-static mt-6 p-6">
              {err ? <p className="text-sm text-red-700" role="alert">{err}</p> : null}
              {rows === null ? <p className="text-sm text-ink/60">Loading…</p> : rows.length === 0 ? (
                <p className="text-sm leading-relaxed text-ink/70">No receipts yet for <strong>{session.user.email}</strong>. Receipts are issued automatically when a donation is captured, and always emailed too.</p>
              ) : (
                <ul className="divide-y divide-ink/10 text-sm">
                  {rows.map((r) => (
                    <li key={r.receipt_id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                      <div>
                        <p className="font-semibold">{r.receipt_no}</p>
                        <p className="text-xs text-ink/60">{inr(r.donation?.gross_amount_paise)} · FY {r.financial_year} · issued {String(r.issued_at).slice(0, 10)}</p>
                      </div>
                      <button type="button" className="btn-light !py-2 !text-sm" onClick={() => void download(r)} disabled={busy === r.receipt_id}>{busy === r.receipt_id ? "Preparing…" : "Download PDF"}</button>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-5 border-t border-ink/10 pt-4 text-xs leading-relaxed text-ink/55">Form 10BE certificates are issued after the financial year closes (we file Form 10BD annually). Provide your PAN under <a className="link-secondary" href="/account/details">My details</a> to be included.</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
