import { NextRequest, NextResponse } from "next/server";
import { dbEnabled } from "@/lib/db";
import { client, fromHeader } from "@/lib/email";
import { buildAttentionReport } from "@/lib/attention";
import { ownerEmail } from "@/lib/update-send";
import { escapeHtml as esc } from "@/lib/guard";

export const dynamic = "force-dynamic";

/**
 * Daily needs-attention digest (4C · J4). No news = NO email — the founder's
 * inbox stays silent unless something actually needs a human.
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization") ?? "";
  const secret = process.env.CRON_SECRET;
  if (!secret || auth !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!dbEnabled()) return NextResponse.json({ ok: true, note: "db not configured" });
  try {
    const report = await buildAttentionReport();
    if (report.total === 0) return NextResponse.json({ ok: true, total: 0, emailed: false });
    const resend = await client();
    if (!resend) return NextResponse.json({ ok: true, total: report.total, emailed: false, note: "email not configured" });
    const section = (title: string, items: { label: string; detail: string; action: string }[]) =>
      items.length
        ? `<h3 style="margin:22px 0 6px;font-size:15px">${title} (${items.length})</h3>` +
          items.map((i) => `<p style="margin:6px 0;font-size:13px;line-height:1.5"><strong>${esc(i.label)}</strong><br><span style="color:#666">${esc(i.detail)}</span><br><span style="color:#8F6A2A">→ ${esc(i.action)}</span></p>`).join("")
        : "";
    const html = `<div style="font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#111;font-size:14px;padding:8px">
      <p style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#8F6A2A;margin:0">RKM Foundation · Daily digest</p>
      <h2 style="margin:12px 0 0;font-size:19px">${report.total} item${report.total === 1 ? "" : "s"} need${report.total === 1 ? "s" : ""} attention</h2>
      ${section("Receipts not issued (paid > 24h)", report.receiptGaps)}
      ${section("Webhook signature failures", report.webhookFailures)}
      ${section("Update email failures", report.emailFailures)}
      ${section("PAN / address pending", report.panPending)}
      <p style="margin:24px 0 0;font-size:12px;color:#888">Full detail: <a href="https://rkmfoundation.com/admin" style="color:#8F6A2A">rkmfoundation.com/admin</a>. This digest only arrives when something needs you.</p>
    </div>`;
    await resend.emails.send({ from: fromHeader(), to: [ownerEmail()], subject: `[RKMF] ${report.total} item${report.total === 1 ? "" : "s"} need attention`, html });
    return NextResponse.json({ ok: true, total: report.total, emailed: true });
  } catch (e) {
    console.error("[cron/daily]", e);
    return NextResponse.json({ error: "digest failed" }, { status: 500 });
  }
}
