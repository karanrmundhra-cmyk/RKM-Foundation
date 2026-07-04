# BLOCKED — items waiting on the founder or external dependencies

_Last updated: 5 July 2026. Everything below is OUTSIDE autonomous engineering — each needs a specific input from the founder or an external provider. The exact input to unblock is listed per item. This is the single canonical blocker list._

## P0 — Prove the money chain (gates every ecosystem send)

1. **One real end-to-end test donation** (smallest amount) on rkmfoundation.com.
   - Confirm the full chain: payment captures → webhook fires → numbered 80G receipt emails → thank-you page renders.
   - Status: order creation verified working 4 Jul (live order created via `/api/donate`); the 28 Jun "Terminal not found" outage appears resolved but the **capture → webhook → receipt chain is unproven**. If the receipt doesn't arrive, check P1 #2.
2. **`RESEND_API_KEY` + `DEFAULT_FUND_ID` confirmed in Vercel (Production)** — gates receipt emails and all ecosystem sends.
3. **IM-01 mailer template sign-off** — approve or mark up the template in `Review/RKMF-IM01-IMPACT-MAILER-SPEC.md` (superseded design detail in `RKMF_ECOSYSTEM_ARCHITECTURE_V1.md` §4-M1).
4. **Secret rotation (RKMF-030)** — rotate the previously-exposed Supabase service key, Resend API key, admin token, and webhook secret; update Vercel env.

## P1 — Credentials / external config (founder/owner action only)

5. **80G receipt webhook verification** — `RAZORPAY_WEBHOOK_SECRET` was set in Vercel on 2 Jul but is unproven; on 23 Jun the webhook on the Foundation account was registered but **DISABLED**. Unblock: log in to the "R.K.M. Foundation" Razorpay account (MID `EeNU1Q0XTW5U07`, login info@rkm.support) → Settings → Webhooks → confirm `https://rkmfoundation.com/api/razorpay-webhook` is ENABLED (events: payment.captured, payment.failed, subscription.charged) with the current secret.
6. **Razorpay account cleanup** — deactivate the old double-charging "RKM-Foundation" hosted payment page and audit/refund the double charges (see `PAYMENT_INCIDENT_REPORT.md`). Note: production key `rzp_live_T1Ut…` belongs to the Foundation MID above, NOT the "RKM Industries" account.
7. **Recurring net-banking (eMandate / e-NACH)** — enable supported banks in Razorpay → Account & Settings → Payment Methods.
8. **Analytics 28-day baseline (SOP-02)** — create a Plausible account; set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` / `NEXT_PUBLIC_PLAUSIBLE_SRC`; then 28 days of real-user data.
9. **Email lifecycle — live sending** — skeleton on `rkmf/safe-infra` (`lib/email-lifecycle.ts`); needs (a) merge decision, (b) `[NEEDS DATA]` fills from the Content Pack, (c) scheduler.
10. **Owner decisions pending:** merge `rkmf/safe-infra` → `main` (footer cleanup + email skeleton + quality pass) · Next 16 / TS 6 major upgrades (dependabot PRs #6–#9) · `/prototype` route removal · G-06 eyebrow contrast.

## P1 — Founder Content Pack (unblocks the proof layer + richer Ledger) — SOP-09

Provide in this order (each maps to specific build work):

11. **Real named animals + outcomes + documentary photos** → Tobler's Ledger content (4B needs at least the first month's photos+notes).
12. **3–5 rescue stories** (named animal, before/after, outcome).
13. **Impact numbers + dates** (rescued / treated / sterilised / vaccinated / fed / rehomed).
14. **Cost-per-outcome math** (₹X = one meal / one treatment / one month) → final equivalence table (`lib/impact.ts`), amount-ladder outcomes, lifecycle emails.
15. **Fund-allocation % + audited financials** (SOP-10).
16. **Board / founder names + consent + photos.**
17. **Mission one-liner** (confirm canonical wording).
18. **CSR case studies.**
19. **Wishlist / supply list.**
20. **FCRA status** + confirmation of any **active matching campaign** (the only sanctioned urgency mechanic).

## Resolved

- ~~Supabase project paused~~ — verified **ACTIVE_HEALTHY** on 5 Jul 2026 (project `rnwifjrdhdhemrlmgjij`); money tables live with real rows.
- ~~Razorpay "Terminal not found" outage (28 Jun)~~ — order creation verified working 4 Jul; final confirmation comes with P0 #1.

## Anti-fabrication rule

No impact metric, beneficiary name, photo, testimonial, or financial figure is invented anywhere in the build. All such fields remain explicit `[NEEDS DATA]` placeholders until supplied above.
