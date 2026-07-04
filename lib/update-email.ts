// lib/update-email.ts — renders the monthly impact update as email HTML (EN/HI)
// and the founder preview email. Inline-styled for mail clients; photos are
// hosted in the public impact/ bucket (never attached). Anti-fabrication:
// every string comes from the update row (founder-typed) or lib/impact.ts
// (published equivalences). Nothing else is ever interpolated.
import { escapeHtml as esc } from "./guard";
import { equivalenceFor, inr } from "./impact";
import type { Update } from "./updates-data";

const SITE = "https://rkmfoundation.com";
const INK = "#111111"; const COPPER_DARK = "#8F6A2A"; const SNOW = "#F5F5F5";

export function photoUrl(storagePath: string): string {
  const base = process.env.SUPABASE_URL || "https://rnwifjrdhdhemrlmgjij.supabase.co";
  return `${base}/storage/v1/object/public/impact/${storagePath}`;
}

function shell(inner: string, lang: "en" | "hi"): string {
  const trust = lang === "hi" ? "पंजीकृत ट्रस्ट · 12A · 80G · CSR" : "Registered trust · 12A · 80G · CSR";
  return `<!doctype html><html lang="${lang}"><body style="margin:0;padding:0;background:${SNOW}"><div style="max-width:640px;margin:0 auto;background:#ffffff;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:${INK};font-size:15px;line-height:1.6"><div style="padding:28px 28px 8px">${inner}</div><div style="padding:18px 28px;background:${SNOW};font-size:12px;color:#6b6b6b;text-align:center">${trust}</div></div></body></html>`;
}

function storyBlocks(u: Update, lang: "en" | "hi"): string {
  return u.stories.map((s) => {
    const note = lang === "hi" && s.note_hi ? s.note_hi : s.note_en;
    const photos = s.photos.map((p) =>
      `<img src="${photoUrl(p.email_path || p.storage_path)}" alt="${esc(p.alt || s.animal_name)}" width="584" style="width:100%;max-width:584px;height:auto;border-radius:14px;display:block;margin-top:20px">`
    ).join("");
    return `${photos}<p style="margin:10px 0 0;font-size:14px;color:#555555;font-style:italic"><strong style="color:${INK}">${esc(s.animal_name)}</strong> — ${esc(note)}</p>`;
  }).join("");
}

function totalsLine(u: Update, lang: "en" | "hi"): string {
  const t = u.totals || {};
  const parts: string[] = [];
  if (lang === "hi") {
    if (t.meals) parts.push(`${t.meals} भोजन`);
    if (t.vaccinations) parts.push(`${t.vaccinations} टीकाकरण`);
    if (t.treatments) parts.push(`${t.treatments} उपचार`);
    return parts.length ? `<p style="margin:24px 0 0;color:#555555;font-size:14px">इस महीने शेल्टर में: ${parts.join(" · ")}।</p>` : "";
  }
  if (t.meals) parts.push(`${t.meals} meals served`);
  if (t.vaccinations) parts.push(`${t.vaccinations} vaccinations`);
  if (t.treatments) parts.push(`${t.treatments} treatments`);
  return parts.length ? `<p style="margin:24px 0 0;color:#555555;font-size:14px">This month across the shelter: ${parts.join(" · ")}.</p>` : "";
}

export function renderUpdateEmail(u: Update, o: { lang: "en" | "hi"; recipientName?: string | null; paidPaiseThisMonth?: number; unsubscribeUrl: string }): { subject: string; html: string } {
  const lang = o.lang;
  const hi = lang === "hi";
  const subject = (hi ? u.subject_hi : u.subject_en) || (hi ? "इस महीने का अपडेट — RKM Foundation" : "This month's update — RKM Foundation");
  const browserUrl = `${SITE}${hi ? "/hi" : ""}/updates/${u.month}`;
  const greetName = o.recipientName ? esc(o.recipientName.split(" ")[0]) : "";
  const greeting = hi ? `नमस्ते${greetName ? " " + greetName : ""},` : `Namaste${greetName ? " " + greetName : ""},`;
  const intro = (hi ? u.intro_hi : u.intro_en) || (hi ? "इस महीने आप जानवरों के लिए मौजूद रहे। यह रहा उसका प्रमाण।" : "You showed up for the animals this month. Here's what that looked like.");
  const eq = o.paidPaiseThisMonth ? equivalenceFor(o.paidPaiseThisMonth, lang) : null;
  const rupees = Math.floor((o.paidPaiseThisMonth ?? 0) / 100);
  const yourPart = eq
    ? `<div style="margin-top:26px;background:#fbf8f2;border:1px solid #e6d9bd;border-radius:12px;padding:14px 18px;font-size:14px"><strong>${hi ? "इसमें आपका योगदान:" : "Your part in it:"}</strong> ${hi ? `आपके ${inr(rupees)} ने इस महीने — ${esc(eq.text)}` : `your ${inr(rupees)} this month — ${esc(eq.text.charAt(0).toLowerCase() + eq.text.slice(1))}`}</div>`
    : "";
  const closing = hi ? "बस इतना ही — कोई अपील नहीं। सिर्फ़ वह प्रमाण, जिसका हमने वादा किया था।" : "That's the whole update — no ask, no appeal. Just the proof we promised.";
  const inner = `
    <p style="margin:0;font-size:11px;color:#8a8a8a;text-align:center"><a href="${browserUrl}" style="color:#8a8a8a">${hi ? "ब्राउज़र में देखें" : "View in browser"}</a></p>
    <p style="margin:22px 0 0">${greeting}</p>
    <p style="margin:14px 0 0">${esc(intro)}</p>
    ${storyBlocks(u, lang)}
    ${totalsLine(u, lang)}
    ${yourPart}
    <p style="margin:26px 0 0">${closing}</p>
    <p style="margin:20px 0 0">— The Mundhra family,<br>RKM Foundation</p>
    <p style="margin:26px 0 0;font-size:11px;color:#8a8a8a;text-align:center"><a href="${browserUrl}" style="color:${COPPER_DARK}">${hi ? "टोबलर के बहीखाते पर देखें" : "See this update on Tobler's Ledger"}</a>&nbsp;·&nbsp;<a href="${o.unsubscribeUrl}" style="color:#8a8a8a">${hi ? "अनसब्सक्राइब" : "Unsubscribe"}</a></p>`;
  return { subject, html: shell(inner, lang) };
}

export function renderPreviewEmail(u: Update, o: { recipientCount: number; approveUrl: string; skipUrl: string; editUrl: string }): { subject: string; html: string } {
  const en = renderUpdateEmail(u, { lang: "en", recipientName: "Raghav", paidPaiseThisMonth: 500000, unsubscribeUrl: `${SITE}/unsubscribe` });
  const hiV = renderUpdateEmail(u, { lang: "hi", recipientName: "राघव", paidPaiseThisMonth: 500000, unsubscribeUrl: `${SITE}/unsubscribe` });
  const btn = (href: string, label: string, primary: boolean) =>
    `<a href="${href}" style="display:inline-block;margin:6px;padding:13px 26px;border-radius:9999px;font-size:14px;font-weight:600;text-decoration:none;${primary ? `background:${COPPER_DARK};color:#ffffff` : `background:#ffffff;color:${INK};border:1px solid #d9d9d9`}">${label}</a>`;
  const inner = `
    <p style="margin:0;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:${COPPER_DARK};text-align:center">${esc(u.month)} · Impact update</p>
    <p style="margin:16px 0 0;text-align:center">Below is <strong>exactly</strong> what donors will receive (English, then Hindi).<br>Recipients: <strong>${o.recipientCount}</strong> (paid donors with email + subscribers − unsubscribes).</p>
    <div style="text-align:center;margin:22px 0 8px">${btn(o.approveUrl, "&#10003; Yes — send to donors", true)}${btn(o.skipUrl, "Skip this month", false)}${btn(o.editUrl, "Edit this update", false)}</div>
    <p style="margin:0 0 20px;font-size:11px;color:#8a8a8a;text-align:center">Buttons are single-use signed links (72h expiry). No tap = nothing sends. Every action is audited.</p>
    <div style="border:1px solid #e8e8e8;border-radius:14px;overflow:hidden;margin-top:8px">${en.html}</div>
    <div style="border:1px solid #e8e8e8;border-radius:14px;overflow:hidden;margin-top:18px">${hiV.html}</div>`;
  return { subject: `[Approve] ${u.month} update — ready for ${o.recipientCount} recipients`, html: shell(inner, "en") };
}
