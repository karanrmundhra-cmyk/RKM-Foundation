import { escapeHtml as esc } from "./guard";

// Founder may change this sender display name. Address must stay on the
// Resend-verified domain (rkm.support).
const FROM_NAME = "RKM Foundation";
const SITE_URL = "https://rkmfoundation.com";
function fromAddr() {
  return process.env.RECEIPTS_FROM_EMAIL || process.env.FORMS_FROM_EMAIL || "website@rkm.support";
}
function fromHeader() {
  return `${FROM_NAME} <${fromAddr()}>`;
}
async function client() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  const { Resend } = await import("resend");
  return new Resend(key);
}
function shell(inner: string) {
  return `<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a;font-size:15px;line-height:1.55;padding:8px">${inner}<hr style="border:0;border-top:1px solid #eee;margin:24px 0"><p style="font-size:12px;color:#888;margin:0">RKM Foundation · Registered Charitable Trust · Reg. E-30560 · 12A · 80G · CSR<br><a href="${SITE_URL}" style="color:#93502b">rkmfoundation.com</a> · info@rkm.support</p></div>`;
}

/** Donor acknowledgement + 80G receipt (with PDF). Fired from the webhook on payment capture. */
export async function sendDonationEmails(o: {
  to: string; donorName: string; amountPaise: number; paymentId?: string; receiptNo: string; pdf: Uint8Array;
}) {
  const resend = await client();
  if (!resend) { console.log("[donate-email] (not configured) receipt", o.receiptNo); return { skipped: true }; }
  const amount = "₹" + (o.amountPaise / 100).toLocaleString("en-IN");
  const name = esc(o.donorName || "Friend");
  const txn = esc(o.paymentId || "—");
  const rno = esc(o.receiptNo);

  const ack = await resend.emails.send({
    from: fromHeader(), to: [o.to], subject: "Thank You for Helping an Animal Today",
    html: shell(`<h2 style="color:#93502b;margin:0 0 12px">Thank you, ${name}.</h2>
<p>Your gift of <strong>${amount}</strong> goes straight to feeding, treating, and sheltering rescued animals — and we'll show you the life it changed.</p>
<table style="font-size:14px;margin:16px 0;border-collapse:collapse">
<tr><td style="color:#666;padding:3px 16px 3px 0">Amount</td><td><strong>${amount}</strong></td></tr>
<tr><td style="color:#666;padding:3px 16px 3px 0">Transaction ID</td><td>${txn}</td></tr>
<tr><td style="color:#666;padding:3px 16px 3px 0">Receipt No.</td><td>${rno}</td></tr>
</table>
<p>Your 80G donation receipt is attached, and also sent in a separate email.</p>
<p style="margin-top:18px"><a href="${SITE_URL}" style="background:#93502b;color:#fff;text-decoration:none;padding:11px 20px;border-radius:999px;font-weight:600;font-size:14px;display:inline-block">Visit RKM Foundation →</a></p>`),
  });
  if (ack.error) throw new Error("ack: " + ack.error.message);

  const rcpt = await resend.emails.send({
    from: fromHeader(), to: [o.to], subject: "Your Donation Receipt – RKM Foundation",
    html: shell(`<h2 style="margin:0 0 12px">Donation Receipt</h2>
<p>Dear ${name}, thank you for your generous contribution. Your official receipt is attached as a PDF.</p>
<table style="font-size:14px;margin:16px 0;border-collapse:collapse">
<tr><td style="color:#666;padding:3px 16px 3px 0">Receipt No.</td><td><strong>${rno}</strong></td></tr>
<tr><td style="color:#666;padding:3px 16px 3px 0">Amount</td><td>${amount}</td></tr>
<tr><td style="color:#666;padding:3px 16px 3px 0">Transaction ID</td><td>${txn}</td></tr>
</table>
<p style="font-size:13px;color:#555">Donations to RKM Foundation are eligible for deduction under Section 80G of the Income Tax Act, 1961 (80G Reg. CITE80G9792014-152016-17). This is a provisional receipt; your statutory Form 10BE certificate will be issued by 31 May following the financial year.</p>`),
    attachments: [{ filename: `RKM-Receipt-${o.receiptNo.replace(/[^A-Za-z0-9_-]+/g, "-")}.pdf`, content: Buffer.from(o.pdf) }],
  });
  if (rcpt.error) throw new Error("receipt: " + rcpt.error.message);
  return { ok: true };
}

const ACK_COPY: Record<string, string> = {
  contact: "We've received your message and will respond shortly.",
  csr: "We've received your CSR partnership enquiry. Our team will review it and reach out shortly.",
  partner: "We've received your partnership enquiry. We review these within 5–7 working days and will be in touch.",
  "fundraiser-create": "We've received your fundraiser request. We'll set up your page and send your unique link within 1–2 business days.",
  careers: "Thank you for your interest in working with us. We'll keep your details on file and reach out when a suitable role opens.",
  volunteer: "Thank you for offering your time to help animals in need. We've received your details and our team will reach out with ways you can get involved.",
};

/** Acknowledgement to the person who submitted a form. */
export async function sendFormAck(formType: string, data: Record<string, string>) {
  const resend = await client();
  if (!resend) return { skipped: true };
  const msg = ACK_COPY[formType];
  const to = data.email;
  if (!msg || !to) return { skipped: true };
  const name = esc(data.name || data.contact_person || "there");
  const r = await resend.emails.send({
    from: fromHeader(), to: [to], subject: "We've received your message — RKM Foundation",
    html: shell(`<h2 style="color:#93502b;margin:0 0 12px">Thank you, ${name}.</h2><p>${msg}</p>`),
  });
  if (r.error) throw new Error(r.error.message);
  return { ok: true };
}

/** Welcome email for newsletter subscribers. */
export async function sendNewsletterWelcome(to: string) {
  const resend = await client();
  if (!resend || !to) return { skipped: true };
  const r = await resend.emails.send({
    from: fromHeader(), to: [to], subject: "Welcome to the RKM Foundation community",
    html: shell(`<h2 style="color:#93502b;margin:0 0 12px">Welcome.</h2><p>You're now part of the RKM Foundation community. We'll send real photos and short stories from the field — the rescues, the recoveries, the homecomings. No spam, ever.</p>`),
  });
  if (r.error) throw new Error(r.error.message);
  return { ok: true };
}

const LABELS: Record<string, string> = {
  newsletter: "Newsletter Subscription",
  volunteer: "Other Ways to Give — Enquiry",
  csr: "CSR Partnership Enquiry",
  partner: "NGO Partnership Enquiry",
  careers: "Careers — Application",
  contact: "Contact Enquiry",
  "fundraiser-create": "New Fundraiser Request",
  unsubscribe: "Unsubscribe Request",
};

export async function sendFormEmail(formType: string, data: Record<string, string>) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.FORMS_TO_EMAIL || "info@rkm.support";
  const from = process.env.FORMS_FROM_EMAIL || "onboarding@resend.dev";
  const label = LABELS[formType] ?? formType;

  const rows = Object.entries(data)
    .filter(([k]) => k !== "formType")
    .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600;text-transform:capitalize">${k.replace(/_/g, " ")}</td><td style="padding:6px 12px">${String(v)}</td></tr>`)
    .join("");

  if (!key) {
    console.log(`[forms] (email not configured) ${label}:`, JSON.stringify(data));
    return { ok: true, skipped: true };
  }
  const { Resend } = await import("resend");
  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: `RKM Website <${from}>`,
    to: [to],
    replyTo: data.email || undefined,
    subject: `[Website] ${label}`,
    html: `<h2 style="font-family:sans-serif">${label}</h2><table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows}</table>`,
  });
  if (error) throw new Error(error.message);
  return { ok: true };
}
