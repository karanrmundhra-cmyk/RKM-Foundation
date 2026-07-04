"use client";
// /account — Overview (4D · M3 screen 2): donations list, this-FY total,
// monthly status. Reads via RLS: the session's email sees only its own rows.
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { PortalNav, SignIn, inr, usePortalSession } from "./portal";

type Donation = { donation_id: string; gross_amount_paise: number; status: string; received_date: string | null; created_at: string; financial_year: string | null; payment_mode: string | null; subscription_id: string | null };

export default function AccountPage() {
  const { session, ready } = usePortalSession();
  const [rows, setRows] = useState<Donation[] | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!session) { setRows(null); return; }
    (async () => {
      const { data, error } = await supabaseBrowser()
        .from("donation")
        .select("donation_id,gross_amount_paise,status,received_date,created_at,financial_year,payment_mode,subscription_id")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) setErr("Could not load your donations. Please try again.");
      else setRows((data as Donation[]) ?? []);
    })();
  }, [session]);

  const paid = (rows ?? []).filter((r) => r.status === "paid");
  const fyNow = (() => { const d = new Date(); const y = d.getMonth() >= 3 ? d.getFullYear() : d.getFullYear() - 1; return `${y}-${String((y + 1) % 100).padStart(2, "0")}`; })();
  const fyTotal = paid.filter((r) => r.financial_year === fyNow).reduce((s, r) => s + r.gross_amount_paise, 0);
  const hasMonthly = (rows ?? []).some((r) => r.subscription_id);

  return (
    <section className="bg-snow pb-24 pt-32 sm:pt-36">
      <div className="container-c max-w-4xl">
        <p className="eyebrow-index">Your account</p>
        <h1 className="display-3 mt-4">Every gift, accounted for.</h1>
        {!ready ? <div className="card mt-10 h-40 animate-pulse" /> : !session ? <SignIn /> : (
          <>
            <PortalNav active="overview" email={session.user.email ?? ""} />
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="card p-5"><p className="text-xs text-ink/60">This FY ({fyNow})</p><p className="h-display mt-1 text-2xl">{inr(fyTotal)}</p></div>
              <div className="card p-5"><p className="text-xs text-ink/60">Gifts made</p><p className="h-display mt-1 text-2xl">{paid.length}</p></div>
              <div className="card p-5"><p className="text-xs text-ink/60">Monthly giving</p><p className="mt-2 text-sm font-semibold">{hasMonthly ? "Active — thank you" : "Not set up"}</p>{!hasMonthly && <Link href="/donate-now" className="link-secondary text-xs">Start monthly →</Link>}</div>
            </div>
            <div className="card-static mt-6 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper-dark">Your donations</p>
              {err ? <p className="mt-3 text-sm text-red-700" role="alert">{err}</p> : rows === null ? <p className="mt-3 text-sm text-ink/60">Loading…</p> : rows.length === 0 ? (
                <p className="mt-3 text-sm leading-relaxed text-ink/70">No donations found for <strong>{session.user.email}</strong>. If you gave with a different email, sign in with that address — or make your first gift on the <Link href="/donate-now" className="link-secondary">donate page</Link>.</p>
              ) : (
                <ul className="mt-3 divide-y divide-ink/10 text-sm">
                  {rows.map((r) => (
                    <li key={r.donation_id} className="flex items-center justify-between gap-4 py-3">
                      <div><p className="font-semibold">{inr(r.gross_amount_paise)}</p><p className="text-xs text-ink/60">{(r.received_date ?? r.created_at ?? "").slice(0, 10)}{r.payment_mode ? ` · ${r.payment_mode}` : ""}{r.subscription_id ? " · monthly" : ""}</p></div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${r.status === "paid" ? "bg-copper/10 text-copper-dark" : "bg-snow text-ink/60"}`}>{r.status}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <p className="mt-6 text-sm text-ink/60">To change or cancel a monthly gift: one email — <a className="link-secondary" href="mailto:info@rkm.support?subject=Monthly%20donation%20change">info@rkm.support</a>. No questions asked. · See who you helped on <Link href="/updates" className="link-secondary">Tobler&apos;s Ledger</Link>.</p>
          </>
        )}
      </div>
    </section>
  );
}
