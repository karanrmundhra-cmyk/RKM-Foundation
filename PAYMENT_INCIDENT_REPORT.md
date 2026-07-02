# PAYMENT_INCIDENT_REPORT

- **Date:** 2 July 2026
- **Prepared during:** read-only investigation of a donor payment receipt (`pay_T8YKpHW7AuTSVj`)
- **Status:** INVESTIGATION ONLY — **no production changes made** (no page deactivated, no webhook changed, no code deployed for this report, no money moved).
- **Production ref at time of investigation:** `origin/main` @ `393f980`.
- **Label key:** **VERIFIED** = directly observed with evidence · **INFERRED** = reasoned from evidence, not directly proven · **CANNOT VERIFY** = not checkable with available access.

Two **separate** production issues were identified. They are tracked as two incidents because their remediation and validation are independent.

---

## Executive summary

**Incident 1 — Payment Page / QR routing (potential donor overcharge).**
The live website footer renders a "scan to donate" QR image whose decoded destination is the **"Donate to RKM Foundation"** Razorpay Payment Page. A single payment through that page produced a receipt with **two ₹1,000 line items (total ₹2,000)** for what should have been a ₹1,000 donation, corroborated by a ₹2,000 bank debit. The website's separate on-page "UPI" button links to a **different** page (animal-welfare). **VERIFIED for one transaction.**

**Incident 2 — Receipt infrastructure (custom receipt pipeline not operational).**
The website's custom, numbered 80G receipt pipeline is **not currently executing**. The Razorpay account has **only one** webhook registered — a **Zoho Invoice** endpoint — and the website's own `/api/razorpay-webhook` is **not registered**, so it receives no events. The donation database (Supabase) shows evidence of being **paused**. Donors currently receive only Razorpay's **default** receipt, not the website's custom 80G receipt. **VERIFIED (webhook list); DB state INFERRED.**

No remediation has been performed. This document is for review before any production action.

---

## Verified facts only

**Incident 1**
- **V1.** Production code renders the footer QR image: `components/Footer.tsx:124` → `<Image src="/images/site/qr.png" alt="QR code to donate to RKM Foundation" width={140} height={140} … />`. (VERIFIED)
- **V2.** The image `public/images/site/qr.png` decodes to `https://pages.razorpay.com/RKM-Foundation` — agreed by **two independent decoders** (zxing-cpp and OpenCV). (VERIFIED)
- **V3.** One payment `pay_T8YKpHW7AuTSVj` (2 Jul 2026) on the page titled **"Donate to RKM Foundation"** produced a receipt containing **two ₹1,000 line items**, **Total ₹2,000 / Amount Paid ₹2,000**; corroborated by a Razorpay email and an **Axis Bank ₹2,000 debit**. (VERIFIED)
- **V4.** The website's on-page "UPI/GPay/PhonePe" button links to a **different** page: `components/DonateWidget.tsx:137` → `href="https://pages.razorpay.com/animal-welfare"`. (VERIFIED)

**Incident 2**
- **V5.** The Razorpay account has **exactly one** registered webhook: `https://invoice.zoho.in/n/razorpay/358471c4478d097c3cdb349bccad521d` (Zoho Invoice), **Status: Enabled**, **30 events**, Last Updated 11 Apr 2025. The website endpoint `rkmfoundation.com/api/razorpay-webhook` is **not** in the list ("Showing 1 – 1"). (VERIFIED)
- **V6.** The website's custom receipt is issued only by that unregistered webhook. Path: `app/api/razorpay-webhook/route.ts` → `verifyWebhookSignature()` (uses `RAZORPAY_WEBHOOK_SECRET`) → `dbEnabled()` (needs `SUPABASE_SERVICE_KEY`) → `sendDonationReceipt()` → `issueReceipt` + `receiptPdfBytes` (80G PDF) + `sendDonationEmails` (needs `RESEND_API_KEY`). (VERIFIED by code)
- **V7.** The receipt the donor actually received was sent by `no-reply@razorpay.com` (Razorpay's **default** Payment-Page receipt), not the website's custom receipt. (VERIFIED via email)

---

## Evidence collected

**E1 — Decoded QR destination (two decoders):**
```
input: public/images/site/qr.png
zxing-cpp  → FORMAT: QR Code | TEXT: 'https://pages.razorpay.com/RKM-Foundation'
OpenCV     → TEXT: 'https://pages.razorpay.com/RKM-Foundation'
```

**E2 — Receipt with two ₹1,000 line items (text extracted from the donor's PDF, `pay_T8YKpHW7AuTSVj`):**
```
DESCRIPTION                                             UNIT PRICE   QTY   AMOUNT
Enter Donation Amount / A minimum donation of ₹1,000…   ₹1,000.00     1    ₹1,000.00
Donate INR 1000                                         ₹1,000.00     1    ₹1,000.00
Total                                                                      ₹2,000.00
Amount Paid                                                                ₹2,000.00
Transaction Reference: pay_T8YKpHW7AuTSVj
Terms link on receipt: https://rkmfoundation.framer.website/legal/terms-conditions
```
Corroborating email evidence (Gmail):
- Razorpay → "Donation receipt for your successful transaction on **Donate to RKM Foundation**", **₹2000.00**, method **PhonePe**, `pay_T8YKpHW7AuTSVj`, from `no-reply@razorpay.com`.
- Axis Bank → "**INR 2000.00** was debited from your A/c no. XX1458" on 02-07-26 13:02:54.

**E3 — Production code reference to the QR image:**
```
components/Footer.tsx:124:
  <Image src="/images/site/qr.png" alt="QR code to donate to RKM Foundation"
         width={140} height={140} className="h-36 w-36 rounded-xl ring-1 ring-ink/10" />
```

**E4 — Production code reference to the UPI button:**
```
components/DonateWidget.tsx:137:
  <a href="https://pages.razorpay.com/animal-welfare" target="_blank" rel="noopener noreferrer" …>
```
(Repo-wide search found only `animal-welfare` as a text URL — in `DonateWidget.tsx` and one incident note; the `RKM-Foundation` page URL appears in **no** tracked file or git history — it exists only inside the QR image.)

**E5 — Webhook configuration (Razorpay dashboard → Account & Settings → Webhooks):**
```
URL: https://invoice.zoho.in/n/razorpay/358471c4478d097c3cdb349bccad521d
Status: Enabled | Events: 30 | Last Updated: 11 Apr 2025, 09:46:00 pm
Showing 1 - 1   (website /api/razorpay-webhook NOT present)
```
(Screenshot captured during the session.)

**E6 — Receipt-generation architecture (code):**
```
lib/razorpay.ts:48  verifyWebhookSignature(rawBody, signature)
lib/razorpay.ts:49    const secret = process.env.RAZORPAY_WEBHOOK_SECRET
lib/db.ts:4         const KEY = process.env.SUPABASE_SERVICE_KEY
lib/db.ts           export function dbEnabled() { return !!KEY }
app/api/razorpay-webhook/route.ts  → on payment.captured: markDonationPaid / insertDonation → sendDonationReceipt
lib/notify.ts       sendDonationReceipt → issueReceipt (gapless no.) + receiptPdfBytes (80G PDF) + sendDonationEmails
```
Supabase state signal (Gmail, 24 Jun 2026, `ant.wilson@supabase.com`): "Your Supabase Project **rkm-foundation is going to be paused**" (inactivity > 7 days).

---

## Remaining unknowns (not verified / cannot verify)

- **U1.** Whether the "Donate to RKM Foundation" page still exists and its full current line-item configuration. The double-charge is **VERIFIED for one transaction (E2)**; that it is **reproducible/structural** is **INFERRED** (an earlier dashboard list showed this page with multiple products: "Enter Donation Amount / Donate INR 1000 / +3 more"). On the last retry the Payment Pages list failed to load (showed an empty state — treated as a **transient dashboard glitch**, not a deletion). Direct re-confirmation of the page's builder config was **not obtained**.
- **U2.** Whether the animal-welfare page charges exactly once — **OBSERVED** (single amount field) but **not transaction-proven**.
- **U3.** Whether `RAZORPAY_WEBHOOK_SECRET`, `SUPABASE_SERVICE_KEY`, `RESEND_API_KEY`, `DEFAULT_FUND_ID` are set in the Vercel production environment — **CANNOT VERIFY** (no env access; secret values would not be read regardless).
- **U4.** Current Supabase project state (paused vs. active) — **CANNOT VERIFY** (Supabase connector not authorized). The 24-Jun email indicates it was scheduled to pause.
- **U5.** Every external distribution of the `RKM-Foundation` page URL (WhatsApp templates, printed material, social posts, externally-shared QR codes, exhaustive email history) — **NOT searchable / not exhaustively searched**. Searched: repo + git history, the decoded footer QR, the live Framer site, and the top Gmail threads.
- **U6.** Whether donors **other than the tester** were double-charged — **NOT AUDITED** (would require a Razorpay Transactions review).

---

## Risk assessment

**Incident 1 — QR → double-charging page**
- **Likelihood a donor is affected:** any donor who uses the footer "scan to donate" QR is routed to the double-charging page. (Live now.)
- **Impact:** direct financial harm (≈2× overcharge), refund liability, donor-trust/reputational damage, potential regulatory/consumer exposure. **Severity: High.**

**Incident 2 — Receipt/processing infrastructure**
- **Likelihood:** applies to **all** donations while the website webhook is unregistered and the DB is paused.
- **Impact:** donations may not be recorded in the org's own ledger; donors do not receive the compliant numbered 80G receipt (only Razorpay's generic receipt), affecting their tax claim and the org's record-keeping/compliance. **Severity: High.**

**Prioritization note:** These are both High. Incident 1 is the more **acute donor-harm** issue (money overcharged now); Incident 2 is the broader **operational/compliance** issue (affects every donation's recording and receipt). Recommend treating and fixing them **independently**.

---

## Recommended remediation plan (ordered by priority) — NOT executed

**Incident 1 — Payment Page / QR routing**
1. **Re-verify (read-only):** current Payment Page inventory and the RKM-Foundation page's line-item config, to confirm U1 reproducibility before acting.
2. **Repoint the footer QR** to the single-charge page: regenerate `public/images/site/qr.png` to encode `https://pages.razorpay.com/animal-welfare` (or the confirmed correct page), replace the asset, deploy. **Do this BEFORE deactivating anything.**
3. **Deactivate** the "Donate to RKM Foundation" page **only after** the QR no longer references it (and any external references from U5 are addressed).
4. **Audit** Razorpay Transactions for other double-charges and **refund** affected donors.

**Incident 2 — Receipt infrastructure**
5. **Confirm/unpause** the Supabase project.
6. **Register** the website webhook (`https://rkmfoundation.com/api/razorpay-webhook`) in Razorpay for `payment.captured`, `payment.failed` (+ `subscription.charged`); set the **matching** `RAZORPAY_WEBHOOK_SECRET` in Vercel.
7. **Confirm** `SUPABASE_SERVICE_KEY`, `RESEND_API_KEY`, `DEFAULT_FUND_ID` are set in Vercel production.
8. **Reconcile** the website receipt with the existing **Zoho Invoice** webhook so donors don't get duplicate/conflicting receipts (decide which system is the source of truth for 80G).
9. **End-to-end test** (see validation).

---

## Rollback considerations

- **QR repoint (Incident 1, step 2):** static-asset swap. Keep the current `qr.png` as a backup; revert by restoring the old file and redeploying. Low risk, fully reversible.
- **Deactivating the RKM-Foundation page (step 3):** reversible (reactivate in the dashboard). Sequence it **after** the QR repoint so no live surface points to a deactivated page (which would otherwise 404 for donors).
- **Webhook registration (step 6):** additive and reversible (can be disabled/removed). Verify it does not duplicate the Zoho receipt flow before relying on it.
- **Env var changes (steps 6–7):** reversible; record prior values out-of-band (do not expose secrets).
- **No destructive or irreversible actions** are recommended. No deletions. No refunds/transfers to be performed by the assistant — refunds (step 4) to be executed by the account owner.

---

## Validation steps after remediation

**Incident 1**
- Decode the **new** `public/images/site/qr.png` → must resolve to the intended single-charge page (not RKM-Foundation).
- One **real** test donation via the footer QR → receipt shows a **single** line item at the **correct** amount; bank debit equals the intended amount.

**Incident 2**
- Trigger one **real** donation and confirm, in order:
  1. Razorpay delivers `payment.captured` to `/api/razorpay-webhook` and receives a `2xx` (Razorpay webhook delivery log).
  2. A donation row is created in Supabase.
  3. The website's **custom numbered 80G receipt** email is received by the donor.
  4. No duplicate/conflicting receipt from the Zoho path (or a deliberate decision on which issues the 80G).

---

## Actions taken during this investigation

- Read-only inspection only: repo/code reads, QR decode, PDF text extraction, Gmail read, Razorpay dashboard views, live-page views.
- **No** production changes: no page deactivated, no webhook added/edited, no env var changed, no code deployed for this report, no refund/transfer initiated.
