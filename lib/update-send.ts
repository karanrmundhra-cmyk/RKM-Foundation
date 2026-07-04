// lib/update-send.ts — the mailer pipeline: owner preview and the batched,
// resumable donor send. Invariants (contract §8 / architecture §4-M1):
// • nothing sends to donors without a consumed approve token;
// • unique(update_id,email) in email_send makes double-sends impossible —
//   a crash mid-send resumes from rows still 'queued' / missing;
// • personalisation uses ONLY lib/impact.ts published equivalences;
// • suppression is honoured at queue time AND at send time.
import { dbFetch } from "./db";
import { client, fromHeader } from "./email";
import { createActionToken } from "./action-token";
import { renderPreviewEmail, renderUpdateEmail } from "./update-email";
import { computeRecipients, getUpdateById, setUpdateStatus, type Update } from "./updates-data";
import { unsubscribeUrl } from "./unsubscribe";

const SITE = "https://rkmfoundation.com";

export function ownerEmail(): string {
  return process.env.OWNER_APPROVAL_EMAIL || "karanrmundhra@gmail.com";
}

/** Render + send the founder preview with fresh single-use approve/skip tokens. */
export async function sendOwnerPreview(u: Update): Promise<{ recipientCount: number }> {
  const resend = await client();
  const recipients = await computeRecipients(u.month);
  const approve = await createActionToken("approve_update", u.update_id);
  const skip = await createActionToken("skip_update", u.update_id);
  const { subject, html } = renderPreviewEmail(u, {
    recipientCount: recipients.length,
    approveUrl: `${SITE}/api/updates/action?token=${approve}`,
    skipUrl: `${SITE}/api/updates/action?token=${skip}`,
    editUrl: `${SITE}/admin/updates`,
  });
  if (resend) {
    await resend.emails.send({ from: fromHeader(), to: [ownerEmail()], subject, html });
  } else {
    console.log("[updates] (email not configured) preview for", u.month);
  }
  await setUpdateStatus(u.update_id, "preview_sent", { recipient_count: recipients.length });
  return { recipientCount: recipients.length };
}

/** Queue rows for every recipient (idempotent: merge-duplicates on the unique key). */
async function queueRecipients(u: Update): Promise<number> {
  const recipients = await computeRecipients(u.month);
  for (const r of recipients) {
    try {
      await dbFetch("email_send?on_conflict=update_id,email", {
        method: "POST",
        headers: { Prefer: "resolution=ignore-duplicates" },
        body: JSON.stringify({ update_id: u.update_id, email: r.email, donor_id: r.donor_id, lang: r.lang, status: "queued" }),
      });
    } catch (e) { console.error("[updates] queue", r.email, e); }
  }
  return recipients.length;
}

/**
 * The donor send. Safe to call repeatedly (resume): only rows still 'queued'
 * are sent. Batches of 90 via Resend batch API.
 */
export async function runSend(updateId: string): Promise<{ sent: number; failed: number; skippedSuppressed: number }> {
  const u = await getUpdateById(updateId);
  if (!u) throw new Error("update-not-found");
  if (!["approved", "sending", "sent"].includes(u.status)) throw new Error(`not-approved (status=${u.status})`);
  const resend = await client();
  if (!resend) throw new Error("email-not-configured");

  const alreadySent = u.status === "sent";
  await setUpdateStatus(u.update_id, "sending");
  // Release-review fix: a retry of an already-SENT update only flushes rows that
  // are still queued — it never enrols recipients who appeared after the send.
  if (!alreadySent) await queueRecipients(u);

  const recipients = await computeRecipients(u.month);
  const byEmail = new Map(recipients.map((r) => [r.email, r]));
  const suppressed = new Set(((await dbFetch("suppression?select=email&limit=100000")) ?? []).map((s: any) => String(s.email).toLowerCase()));

  let sent = 0, failed = 0, skippedSuppressed = 0;
  for (;;) {
    const queued = await dbFetch(`email_send?update_id=eq.${u.update_id}&status=eq.queued&select=send_id,email,lang&limit=90`);
    if (!queued?.length) break;
    const payloads: { send_id: string; email: string; body: { from: string; to: string[]; replyTo: string; subject: string; html: string; headers: Record<string, string> } }[] = [];
    for (const q of queued) {
      const email = String(q.email).toLowerCase();
      if (suppressed.has(email)) {
        await dbFetch(`email_send?send_id=eq.${q.send_id}`, { method: "PATCH", body: JSON.stringify({ status: "failed", error: "suppressed" }) });
        skippedSuppressed++;
        continue;
      }
      const r = byEmail.get(email);
      const unsub = unsubscribeUrl(email);
      const { subject, html } = renderUpdateEmail(u, {
        lang: (q.lang === "hi" ? "hi" : "en"),
        recipientName: r?.name ?? null,
        paidPaiseThisMonth: r?.paidPaiseThisMonth ?? 0,
        unsubscribeUrl: unsub,
      });
      // RFC 8058 one-click unsubscribe headers (Gmail/Yahoo bulk-sender rules).
      payloads.push({ send_id: q.send_id, email, body: { from: fromHeader(), to: [email], replyTo: "info@rkm.support", subject, html, headers: { "List-Unsubscribe": `<${unsub}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" } } });
    }
    if (!payloads.length) continue;
    try {
      const res = await resend.batch.send(payloads.map((p) => p.body));
      if (res.error) throw new Error(res.error.message || "batch-send-error");
      const ids: (string | undefined)[] = res.data?.data?.map((d) => d?.id) ?? [];
      for (let i = 0; i < payloads.length; i++) {
        await dbFetch(`email_send?send_id=eq.${payloads[i].send_id}`, {
          method: "PATCH",
          body: JSON.stringify({ status: "sent", provider_id: ids[i] ?? null }),
        });
        sent++;
      }
    } catch (e: any) {
      // Batch failed: mark this batch failed with the error; remaining queued
      // rows stay queued for a retry call. Never loops forever on one bad batch.
      for (const p of payloads) {
        await dbFetch(`email_send?send_id=eq.${p.send_id}`, { method: "PATCH", body: JSON.stringify({ status: "failed", error: String(e?.message ?? e).slice(0, 300) }) });
        failed++;
      }
    }
  }
  await setUpdateStatus(u.update_id, "sent", { sent_at: new Date().toISOString() });
  return { sent, failed, skippedSuppressed };
}
