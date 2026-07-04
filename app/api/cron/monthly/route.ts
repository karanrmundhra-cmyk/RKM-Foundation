import { NextRequest, NextResponse } from "next/server";
import { dbEnabled } from "@/lib/db";
import { client, fromHeader } from "@/lib/email";
import { getUpdateByMonth } from "@/lib/updates-data";
import { ownerEmail, sendOwnerPreview } from "@/lib/update-send";

export const dynamic = "force-dynamic";

/**
 * Vercel cron (daily, IST morning — see vercel.json). Behaviour by date:
 * • 25th: if the CURRENT month has no draft with stories yet, nudge the owner once.
 * • 1st–3rd: if last month's update is a draft with stories and no preview was
 *   sent, send the owner preview automatically.
 * Never sends anything to donors — only owner nudges/previews.
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization") ?? "";
  const secret = process.env.CRON_SECRET;
  if (!secret || auth !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!dbEnabled()) return NextResponse.json({ ok: true, note: "db not configured" });

  const now = new Date();
  const day = now.getDate();
  const fmt = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  const thisMonth = fmt(now);
  const prev = new Date(now); prev.setDate(0); // last day of previous month
  const lastMonth = fmt(prev);
  const actions: string[] = [];
  try {
    if (day === 25) {
      const u = await getUpdateByMonth(thisMonth);
      if (!u || !u.stories.length) {
        const resend = await client();
        if (resend) {
          await resend.emails.send({
            from: fromHeader(), to: [ownerEmail()],
            subject: `${thisMonth} update has no photos yet`,
            html: `<p>Namaste — this month's impact update has no photos yet. Drop 3–6 photos + one-line notes at <a href="https://rkmfoundation.com/admin/updates">/admin/updates</a> and the preview will come to you on the 1st.</p><p>No photos = the month is simply skipped. Nothing is ever invented.</p>`,
          });
          actions.push("nudge-sent");
        }
      }
    }
    if (day >= 1 && day <= 3) {
      const u = await getUpdateByMonth(lastMonth);
      if (u && u.status === "draft" && u.stories.length) {
        await sendOwnerPreview(u);
        actions.push("preview-sent");
      }
    }
    return NextResponse.json({ ok: true, actions });
  } catch (e) {
    console.error("[cron/monthly]", e);
    return NextResponse.json({ error: "cron failed" }, { status: 500 });
  }
}
