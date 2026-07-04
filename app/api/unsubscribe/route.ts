import { NextRequest, NextResponse } from "next/server";
import { dbEnabled } from "@/lib/db";
import { suppressEmail } from "@/lib/updates-data";
import { verifyUnsubscribe } from "@/lib/unsubscribe";
import { throttle } from "@/lib/guard";
import { escapeHtml as esc } from "@/lib/guard";

export const dynamic = "force-dynamic";

function page(title: string, body: string, form?: string) {
  return new NextResponse(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title}</title></head>
     <body style="font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;background:#F5F5F5;margin:0;padding:48px 16px;color:#111111">
     <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:16px;padding:36px;box-shadow:0 0 0 1px rgba(17,17,17,.08);text-align:center">
     <p style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#8F6A2A;margin:0">RKM Foundation</p>
     <h1 style="font-size:24px;margin:14px 0 0">${title}</h1><p style="color:#555;margin:14px 0 0">${body}</p>${form ?? ""}
     </div></body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

function params(req: NextRequest) {
  const u = (req.nextUrl.searchParams.get("u") ?? "").toLowerCase();
  const s = req.nextUrl.searchParams.get("s") ?? "";
  return { u, s, valid: !!u && verifyUnsubscribe(u, s) };
}

/** GET: confirmation page (never unsubscribes — link scanners follow GETs). */
export async function GET(req: NextRequest) {
  const { u, s, valid } = params(req);
  if (!valid) {
    return page("Link not valid", `This unsubscribe link is invalid or has expired. You can unsubscribe manually on <a href="https://rkmfoundation.com/unsubscribe" style="color:#8F6A2A">this page</a>.`);
  }
  return page(
    "Unsubscribe from monthly updates?",
    `We'll stop sending the monthly impact update to <strong>${esc(u)}</strong>. Donation receipts are legal documents and always send.`,
    `<form method="post" action="/api/unsubscribe?u=${encodeURIComponent(u)}&s=${esc(s)}" style="margin-top:22px"><button style="background:#8F6A2A;color:#fff;border:0;border-radius:9999px;padding:13px 28px;font-size:14px;font-weight:600;cursor:pointer">Yes, unsubscribe me</button></form>`,
  );
}

/** POST: performs the unsubscribe (also serves RFC 8058 one-click). */
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "?";
  if (!throttle(`unsub:${ip}`, 20)) return NextResponse.json({ error: "too many requests" }, { status: 429 });
  const { u, valid } = params(req);
  if (!valid) return page("Link not valid", `This unsubscribe link is invalid. You can unsubscribe manually on <a href="https://rkmfoundation.com/unsubscribe" style="color:#8F6A2A">this page</a>.`);
  if (dbEnabled()) await suppressEmail(u, "unsubscribed");
  return page("Unsubscribed", "You won't receive the monthly update anymore. If this was a mistake, you can subscribe again on the website anytime.");
}
