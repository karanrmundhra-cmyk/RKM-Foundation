// lib/attention.ts — the needs-attention scans (4C · M4). Each scan returns
// concrete rows with one action hint; the dashboard and the daily digest both
// read from here (single implementation). "No news" = every list empty.
import { dbFetch } from "./db";

export type AttentionItem = { kind: string; label: string; detail: string; action: string };

export type AttentionReport = {
  generatedAt: string;
  receiptGaps: AttentionItem[];
  webhookFailures: AttentionItem[];
  emailFailures: AttentionItem[];
  panPending: AttentionItem[];
  total: number;
};

const inr = (p: number) => "₹" + Math.round(p / 100).toLocaleString("en-IN");

/** Paid > 24h ago with no receipt — the exact failure class behind the June 80G incident. */
async function scanReceiptGaps(): Promise<AttentionItem[]> {
  const cutoff = new Date(Date.now() - 24 * 3600_000).toISOString();
  const rows = await dbFetch(
    `donation?status=eq.paid&receipt_id=is.null&created_at=lt.${encodeURIComponent(cutoff)}&select=donation_id,gross_amount_paise,payment_ref,created_at&order=created_at.desc&limit=50`,
  );
  return (rows ?? []).map((d: any) => ({
    kind: "receipt_gap",
    label: `Paid ${inr(d.gross_amount_paise ?? 0)} · no receipt after 24h`,
    detail: `payment_ref ${d.payment_ref ?? "—"} · paid ${String(d.created_at).slice(0, 10)}`,
    action: `/admin — issue receipt for donation ${d.donation_id}`,
  }));
}

/** Webhook events that failed signature verification in the last 7 days. */
async function scanWebhookFailures(): Promise<AttentionItem[]> {
  const since = new Date(Date.now() - 7 * 24 * 3600_000).toISOString();
  const rows = await dbFetch(
    `payment_event?signature_valid=eq.false&received_at=gt.${encodeURIComponent(since)}&select=event_id,event_type,received_at&order=received_at.desc&limit=50`,
  );
  return (rows ?? []).map((e: any) => ({
    kind: "webhook_failure",
    label: `Webhook rejected: ${e.event_type ?? "unknown"}`,
    detail: `received ${String(e.received_at).slice(0, 16).replace("T", " ")}`,
    action: "Check RAZORPAY_WEBHOOK_SECRET matches the dashboard webhook",
  }));
}

/** Update emails that bounced/failed in the last 35 days. */
async function scanEmailFailures(): Promise<AttentionItem[]> {
  const since = new Date(Date.now() - 35 * 24 * 3600_000).toISOString();
  const rows = await dbFetch(
    `email_send?status=in.(bounced,failed,complained)&created_at=gt.${encodeURIComponent(since)}&select=email,status,error,update_id&order=updated_at.desc&limit=100`,
  );
  return (rows ?? []).map((e: any) => ({
    kind: "email_failure",
    label: `Update email ${e.status}: ${e.email}`,
    detail: String(e.error ?? "").slice(0, 120) || "provider did not accept/deliver",
    action: e.status === "failed" ? "Retry via POST /api/updates/send (resumable)" : "Suppressed automatically; no action unless the address matters",
  }));
}

/** Donors with paid gifts still missing PAN (10BD identity). */
async function scanPanPending(): Promise<AttentionItem[]> {
  const rows = await dbFetch(
    "donor?compliance_state=in.(pending_pan,pending_address)&select=donor_id,full_name,email&limit=50",
  );
  return (rows ?? []).map((d: any) => ({
    kind: "pan_pending",
    label: `PAN/address pending: ${d.full_name ?? d.email ?? d.donor_id}`,
    detail: d.email ?? "no email on file",
    action: "/admin/donor — send the compliance link",
  }));
}

export async function buildAttentionReport(): Promise<AttentionReport> {
  const [receiptGaps, webhookFailures, emailFailures, panPending] = await Promise.all([
    scanReceiptGaps().catch((e) => { console.error("[attention] receipts", e); return []; }),
    scanWebhookFailures().catch((e) => { console.error("[attention] webhooks", e); return []; }),
    scanEmailFailures().catch((e) => { console.error("[attention] emails", e); return []; }),
    scanPanPending().catch((e) => { console.error("[attention] pan", e); return []; }),
  ]);
  return {
    generatedAt: new Date().toISOString(),
    receiptGaps, webhookFailures, emailFailures, panPending,
    total: receiptGaps.length + webhookFailures.length + emailFailures.length + panPending.length,
  };
}

export type TodayStats = {
  todayCount: number; todayPaise: number; mtdCount: number; mtdPaise: number;
  activeMonthly: number; newDonors30d: number;
};

export async function buildTodayStats(): Promise<TodayStats> {
  const now = new Date();
  const dayStart = new Date(now); dayStart.setHours(0, 0, 0, 0);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const d30 = new Date(Date.now() - 30 * 24 * 3600_000).toISOString();
  const [donations, subs, newDonors] = await Promise.all([
    dbFetch(`donation?status=eq.paid&created_at=gt.${encodeURIComponent(monthStart.toISOString())}&select=gross_amount_paise,created_at&limit=100000`),
    dbFetch("subscription?status=eq.active&select=subscription_id&limit=100000"),
    dbFetch(`donor?created_at=gt.${encodeURIComponent(d30)}&select=donor_id&limit=100000`),
  ]);
  let todayCount = 0, todayPaise = 0, mtdCount = 0, mtdPaise = 0;
  for (const d of donations ?? []) {
    mtdCount++; mtdPaise += d.gross_amount_paise ?? 0;
    if (new Date(d.created_at) >= dayStart) { todayCount++; todayPaise += d.gross_amount_paise ?? 0; }
  }
  return { todayCount, todayPaise, mtdCount, mtdPaise, activeMonthly: (subs ?? []).length, newDonors30d: (newDonors ?? []).length };
}

export type SendStats = { month: string; status: string; queued: number; sent: number; delivered: number; bounced: number; failed: number; opened: number; clicked: number }[];

export async function buildSendStats(): Promise<SendStats> {
  const updates = await dbFetch("update?order=month.desc&limit=12&select=update_id,month,status");
  const out: SendStats = [];
  for (const u of updates ?? []) {
    const rows = await dbFetch(`email_send?update_id=eq.${u.update_id}&select=status,opened_at,clicked_at&limit=100000`);
    const s = { month: u.month, status: u.status, queued: 0, sent: 0, delivered: 0, bounced: 0, failed: 0, opened: 0, clicked: 0 };
    for (const r of rows ?? []) {
      if (r.status === "queued") s.queued++;
      else if (r.status === "sent") s.sent++;
      else if (r.status === "delivered") s.delivered++;
      else if (r.status === "bounced" || r.status === "complained") s.bounced++;
      else if (r.status === "failed") s.failed++;
      if (r.opened_at) s.opened++;
      if (r.clicked_at) s.clicked++;
    }
    // delivered implies sent succeeded upstream
    s.sent += s.delivered;
    out.push(s);
  }
  return out;
}
