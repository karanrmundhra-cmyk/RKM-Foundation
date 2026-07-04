import { NextRequest, NextResponse } from "next/server";
import { dbEnabled } from "@/lib/db";
import { consumeActionToken } from "@/lib/action-token";
import { getUpdateById, setUpdateStatus } from "@/lib/updates-data";
import { runSend } from "@/lib/update-send";
import { throttle } from "@/lib/guard";

export const dynamic = "force-dynamic";
export const maxDuration = 300; // approval triggers the send inline; batches are resumable regardless

function page(title: string, body: string, ok: boolean) {
  return new NextResponse(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title}</title></head>
     <body style="font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;background:#F5F5F5;margin:0;padding:48px 16px;color:#111111">
     <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:16px;padding:36px;box-shadow:0 0 0 1px rgba(17,17,17,.08);text-align:center">
     <p style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:${ok ? "#8F6A2A" : "#8a2a2a"};margin:0">RKM Foundation</p>
     <h1 style="font-size:24px;margin:14px 0 0">${title}</h1><p style="color:#555;margin:14px 0 0">${body}</p></div></body></html>`,
    { status: ok ? 200 : 400, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

/** One-tap Send/Skip from the owner's preview email. Single-use, audited, idempotent. */
export async function GET(req: NextRequest) {
  if (!dbEnabled()) return page("Not configured", "The database is not configured.", false);
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "?";
  if (!throttle(`update-action:${ip}`, 10)) return page("Too many attempts", "Please wait a minute and try again.", false);
  const token = req.nextUrl.searchParams.get("token") ?? "";
  try {
    const consumed = await consumeActionToken(token);
    if (!consumed) return page("Link expired", "This link is invalid, expired, or was already used. Request a fresh preview from the compose screen.", false);
    const u = await getUpdateById(consumed.subjectId);
    if (!u) return page("Not found", "This update no longer exists.", false);
    if (consumed.purpose === "skip_update") {
      if (u.status === "sent") return page("Already sent", `${u.month} was already sent to donors.`, false);
      await setUpdateStatus(u.update_id, "skipped");
      return page("Skipped", `No update will be sent for ${u.month}. Nothing was emailed to donors.`, true);
    }
    // approve_update
    if (u.status === "sent") return page("Already sent", `${u.month} was already sent to donors.`, true);
    if (!["preview_sent", "approved", "sending", "draft"].includes(u.status)) return page("Cannot send", `Update is ${u.status}.`, false);
    await setUpdateStatus(u.update_id, "approved", { approved_at: new Date().toISOString() });
    const res = await runSend(u.update_id);
    return page("Sent ✓", `${u.month} sent to ${res.sent} recipients${res.failed ? ` · ${res.failed} failed (visible in admin)` : ""}. It is now live on the Ledger.`, true);
  } catch (e: any) {
    console.error("[updates/action]", e);
    if (String(e?.message).includes("email-not-configured")) return page("Email not configured", "RESEND_API_KEY is not set. The approval was recorded; run send again once configured.", false);
    return page("Something went wrong", "The action could not be completed. The system never double-sends — you can safely retry from a fresh preview.", false);
  }
}
