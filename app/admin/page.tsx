"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { adminFetch, downloadCsv, getToken, inr, setToken } from "./adminApi";

type Stats = {
  donations: number; paid_count: number; paid_total_paise: number;
  pending_pan_donors: number; receipts_issued: number;
};

const EXPORTS = [
  { path: "/api/admin/export/tenbd", file: "10bd-support.csv", label: "10BD support", desc: "Paid, includable, non-in-kind donations with donor PAN identity." },
  { path: "/api/admin/export/register", file: "donation-register.csv", label: "Donation register", desc: "Every donation, every status, all fields plus receipt numbers." },
  { path: "/api/admin/export/pan-pending", file: "pan-pending.csv", label: "PAN pending", desc: "Donors awaiting PAN/address, with their paid totals." },
  { path: "/api/admin/export/exceptions", file: "compliance-exceptions.csv", label: "Exceptions", desc: "Paid donations excluded from 10BD, with reasons." },
];

type Attention = {
  attention: { generatedAt: string; total: number; receiptGaps: AItem[]; webhookFailures: AItem[]; emailFailures: AItem[]; panPending: AItem[] };
  today: { todayCount: number; todayPaise: number; mtdCount: number; mtdPaise: number; activeMonthly: number; newDonors30d: number };
  sendStats: { month: string; status: string; queued: number; sent: number; delivered: number; bounced: number; failed: number; opened: number; clicked: number }[];
};
type AItem = { kind: string; label: string; detail: string; action: string };

export default function AdminPage() {
  const [tokenInput, setTokenInput] = useState("");
  const [att, setAtt] = useState<Attention | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [fy, setFy] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const loadStats = useCallback(async () => {
    setErr("");
    setBusy(true);
    try {
      const r = await adminFetch("/api/admin/stats");
      if (r.status === 401) { setUnlocked(false); setErr("Invalid or missing admin token."); return; }
      const j = await r.json();
      if (!r.ok) { setErr(j?.error ?? "Could not load stats."); return; }
      setStats(j);
      setUnlocked(true);
    } catch {
      setErr("Network error.");
    } finally {
      setBusy(false);
    }
  }, []);

  const loadAttention = useCallback(async () => {
    try {
      const r = await adminFetch("/api/admin/attention");
      if (r.ok) setAtt(await r.json());
    } catch { /* panel shows its own empty state */ }
  }, []);

  useEffect(() => { if (getToken()) { void loadStats(); void loadAttention(); } }, [loadStats, loadAttention]);

  function unlock(e: React.FormEvent) {
    e.preventDefault();
    setToken(tokenInput);
    void loadStats();
  }

  async function exportCsv(path: string, file: string) {
    setErr("");
    try {
      const q = fy.trim() ? `?fy=${encodeURIComponent(fy.trim())}` : "";
      await downloadCsv(path + q, file);
    } catch (e: any) {
      setErr(String(e?.message ?? e));
    }
  }

  return (
    <main className="container-c py-12">
      <p className="eyebrow">Admin</p>
      <h1 className="h-display text-3xl sm:text-4xl mt-2">Compliance console</h1>

      {err && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{err}</p>}

      {!unlocked ? (
        <form onSubmit={unlock} className="card mt-8 max-w-md p-6">
          <label className="label-c" htmlFor="token">Admin access token</label>
          <input
            id="token" type="password" className="input-c" value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)} placeholder="Paste ADMIN_ACCESS_TOKEN" autoComplete="off"
          />
          <button type="submit" className="btn-dark mt-4 w-full" disabled={busy || !tokenInput.trim()}>
            {busy ? "Checking…" : "Unlock"}
          </button>
        </form>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="card p-5"><p className="text-xs text-ink/60">Donations</p><p className="h-display mt-1 text-2xl">{stats?.donations ?? "—"}</p></div>
            <div className="card p-5"><p className="text-xs text-ink/60">Paid total</p><p className="h-display mt-1 text-2xl">{stats ? inr(stats.paid_total_paise) : "—"}</p><p className="text-xs text-ink/60">{stats?.paid_count ?? 0} paid</p></div>
            <div className="card p-5"><p className="text-xs text-ink/60">Pending PAN</p><p className="h-display mt-1 text-2xl">{stats?.pending_pan_donors ?? "—"}</p></div>
            <div className="card p-5"><p className="text-xs text-ink/60">Receipts issued</p><p className="h-display mt-1 text-2xl">{stats?.receipts_issued ?? "—"}</p></div>
          </div>

          {/* 4C · Today panel */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="card p-5"><p className="text-xs text-ink/60">Today</p><p className="h-display mt-1 text-2xl">{att ? inr(att.today.todayPaise) : "—"}</p><p className="text-xs text-ink/60">{att?.today.todayCount ?? 0} gifts</p></div>
            <div className="card p-5"><p className="text-xs text-ink/60">This month</p><p className="h-display mt-1 text-2xl">{att ? inr(att.today.mtdPaise) : "—"}</p><p className="text-xs text-ink/60">{att?.today.mtdCount ?? 0} gifts</p></div>
            <div className="card p-5"><p className="text-xs text-ink/60">Active monthly donors</p><p className="h-display mt-1 text-2xl">{att?.today.activeMonthly ?? "—"}</p></div>
            <div className="card p-5"><p className="text-xs text-ink/60">New donors (30d)</p><p className="h-display mt-1 text-2xl">{att?.today.newDonors30d ?? "—"}</p></div>
          </div>

          {/* 4C · Needs attention — the whole point of the dashboard */}
          <h2 className="h-display mt-10 text-xl">Needs attention</h2>
          {!att ? (
            <p className="mt-3 text-sm text-ink/60">Scanning…</p>
          ) : att.attention.total === 0 ? (
            <p className="mt-3 rounded-xl bg-snow px-4 py-3 text-sm text-ink/70">Nothing needs you. Receipts, webhooks, update emails and PAN chasers are all clean. ✓</p>
          ) : (
            <div className="mt-3 space-y-3">
              {[...att.attention.receiptGaps, ...att.attention.webhookFailures, ...att.attention.emailFailures, ...att.attention.panPending].map((i, n) => (
                <div key={n} className="card-static border-l-4 border-l-copper-dark p-4">
                  <p className="text-sm font-semibold">{i.label}</p>
                  <p className="mt-0.5 text-xs text-ink/60">{i.detail}</p>
                  <p className="mt-1 text-xs font-medium text-copper-dark">→ {i.action}</p>
                </div>
              ))}
            </div>
          )}

          {/* 4C · Update send analytics */}
          {att?.sendStats?.length ? (
            <>
              <h2 className="h-display mt-10 text-xl">Monthly updates</h2>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead><tr className="text-xs uppercase tracking-wide text-ink/50">
                    <th className="py-2 pr-4">Month</th><th className="py-2 pr-4">Status</th><th className="py-2 pr-4">Sent</th><th className="py-2 pr-4">Delivered</th><th className="py-2 pr-4">Bounced</th><th className="py-2 pr-4">Failed</th><th className="py-2 pr-4">Opened</th><th className="py-2">Clicked</th>
                  </tr></thead>
                  <tbody>
                    {att.sendStats.map((s) => (
                      <tr key={s.month} className="border-t border-ink/10">
                        <td className="py-2 pr-4 font-medium">{s.month}</td><td className="py-2 pr-4">{s.status}</td>
                        <td className="py-2 pr-4">{s.sent}</td><td className="py-2 pr-4">{s.delivered}</td>
                        <td className="py-2 pr-4">{s.bounced}</td><td className="py-2 pr-4">{s.failed}</td>
                        <td className="py-2 pr-4">{s.opened}</td><td className="py-2">{s.clicked}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/admin/search" className="btn-dark">Donor search</Link>
            <Link href="/admin/updates" className="btn-copper">Monthly update composer</Link>
            <Link href="/admin/vault" className="btn-light">Knowledge vault</Link>
            <button type="button" className="text-sm underline text-ink/60" onClick={() => { void loadStats(); void loadAttention(); }}>Refresh</button>
          </div>

          <h2 className="h-display mt-10 text-xl">Exports</h2>
          <div className="mt-3 max-w-xs">
            <label className="label-c" htmlFor="fy">Financial year filter (optional)</label>
            <input id="fy" className="input-c" value={fy} onChange={(e) => setFy(e.target.value)} placeholder="e.g. 2026-27" />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {EXPORTS.map((x) => (
              <div key={x.path} className="card flex items-start justify-between gap-4 p-5">
                <div>
                  <p className="font-medium text-sm">{x.label}</p>
                  <p className="mt-1 text-xs text-ink/60">{x.desc}</p>
                </div>
                <button type="button" className="btn-dark shrink-0 text-sm" onClick={() => void exportCsv(x.path, x.file)}>CSV</button>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
