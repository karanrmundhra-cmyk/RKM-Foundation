// lib/impact.ts — THE single source of truth for published ₹-equivalences (G-04).
// Used by the donate widget AND the Impact Mailer personalisation line. Every
// string here is already published on /donate-now (EN + HI). Anti-fabrication:
// the mailer may only ever use these exact published equivalences — never a
// computed or invented figure. Final numbers await the Founder Content Pack
// cost-per-outcome math; until then this table IS the published truth.

export type ImpactTier = {
  /** Rupees (not paise) — the published preset amount. */
  v: number;
  label: string;
  /** Published outcome copy shown on the donate page. */
  ctx: string;
  ctxHi: string;
  popular?: boolean;
};

export const TIERS: ImpactTier[] = [
  { v: 2500, label: "₹2,500", ctx: "Two weeks of warm meals for a rescued animal getting back on its feet.", ctxHi: "दो हफ़्ते का गर्म खाना — एक बचाए गए जानवर के लिए जो फिर से खड़ा हो रहा है।" },
  { v: 5000, label: "₹5,000", ctx: "A full month of food and care for 2–3 animals in our shelter.", ctxHi: "हमारे आश्रय में 2–3 जानवरों के लिए पूरे एक महीने का खाना और देखभाल।", popular: true },
  { v: 10000, label: "₹10,000", ctx: "Emergency medical treatment — the surgery or care that saves a life.", ctxHi: "आपातकालीन चिकित्सा — वह सर्जरी या देखभाल जो एक जान बचाती है।" },
];

/**
 * Nearest published equivalence at or below the donor's paid total for the
 * month. Below the lowest tier (or zero) returns null — those donors receive
 * the non-personalised community version of the update. Never rounds up,
 * never interpolates: published tiers only.
 */
export function equivalenceFor(paidPaise: number, lang: "en" | "hi" = "en"): { tier: ImpactTier; text: string } | null {
  const rupees = Math.floor(paidPaise / 100);
  let match: ImpactTier | null = null;
  for (const t of TIERS) if (rupees >= t.v) match = t;
  if (!match) return null;
  return { tier: match, text: lang === "hi" ? match.ctxHi : match.ctx };
}

export function inr(rupees: number): string {
  return "₹" + rupees.toLocaleString("en-IN");
}
