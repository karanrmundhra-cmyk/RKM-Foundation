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


---

# PHASE 1 VERIFICATION LOG — CRITICAL CORRECTION (2 July 2026, continued)

## C-1. The dashboard was on the WRONG Razorpay account during recent checks — VERIFIED
Re-verification revealed (via the account switcher and Account & Settings) that the active dashboard account is:
- **"RKM INDUSTRIES" — Merchant ID `OVHHxmCeRSVYiQ` — login `karanrmundhra@gmail.com` — razorpay.me/@rkmindustries.**

This is a **different account** from the one that owns the donation flow:
- **"R.K.M. Foundation" — Merchant ID `EeNU1Q0XTW5U07` — login `info@rkm.support`** (observed earlier this session; owns the Payment Pages, PAN AACTR4271L, where UPI was "Rejected").

## C-2. Findings now INVALIDATED (they were read on RKM Industries, not the Foundation)
- ~~"Only one webhook registered — Zoho Invoice; website `/api/razorpay-webhook` not registered."~~ The Zoho webhook (`invoice.zoho.in/…`, Enabled) belongs to **RKM Industries**. The **Foundation's** webhook configuration is **UNVERIFIED on the correct account** in this round.
- ~~"There are no payment pages."~~ That empty list is **RKM Industries** (which legitimately has none). The **Foundation's** pages exist (seen earlier this session; both page URLs also serve a live form when opened directly).

## C-3. Corrected picture of the Foundation webhook (from earlier evidence)
A webhook screenshot shared earlier in this engagement (Foundation account) showed the website webhook **`https://rkmfoundation.com/api/razorpay-webhook`** as **registered but DISABLED** (22 events, updated 23 Jun 2026). So the accurate statement is **"registered-but-disabled (as of 23 Jun); current status unconfirmed on the correct account,"** NOT "not registered." The Zoho webhook is unrelated to the Foundation's donation flow and must be removed from the Foundation analysis.

## C-4. Findings that REMAIN VALID (account-independent)
- Footer QR image (`public/images/site/qr.png`) decodes to `https://pages.razorpay.com/RKM-Foundation` — two independent decoders. **VERIFIED.**
- The ₹2,000 double-charge receipt (`pay_T8YKpHW7AuTSVj`, two ₹1,000 line items) + Axis Bank ₹2,000 debit. **VERIFIED.**
- Production code references: `components/Footer.tsx:124` (QR image) and `components/DonateWidget.tsx:137` (animal-welfare button). **VERIFIED.**
These do not depend on which dashboard account was viewed.

## C-5. CANNOT VERIFY in the current environment
The current Chrome session is authenticated to **RKM Industries** (`karanrmundhra@gmail.com`), which shows no access to the Foundation account. I cannot log in (prohibited). Therefore I **cannot verify the Foundation account's Payment Pages configuration or webhook status** until the Chrome session is on the **R.K.M. Foundation** account (`info@rkm.support` / MID `EeNU1Q0XTW5U07`).

## C-6. Action required before Phase 1 can complete
Switch the Chrome session to the **R.K.M. Foundation** Razorpay account (`info@rkm.support` / MID `EeNU1Q0XTW5U07`). Once active, the following will be re-run on the correct account: Payment Pages inventory + line-item config, and the full webhook list.

**No production changes were made. Verification is paused pending the correct-account session.**


---

# PHASE 1 — DISCREPANCY INVESTIGATION (evidence from the currently logged-in account)

Per instruction, the "wrong account" hypothesis was discarded and Phase 1 was restarted on the **currently logged-in account**, investigating the empty-list-vs-live-pages discrepancy with evidence rather than assumption.

## C-7. Identity of the current account — VERIFIED (Account & Settings)
- Business: **RKM Industries** · Merchant ID **`OVHHxmCeRSVYiQ`** · login **`karanrmundhra@gmail.com`** · razorpay.me/@rkmindustries.

## C-8. The discrepancy is NOT a filter/archive/UI bug — VERIFIED from Razorpay's own Transactions
On this account, Razorpay's dashboard shows:
- **Overview → Collected Amount: ₹0.00 from 0 captured payments** (range 25 Jun – 2 Jul 2026).
- **Transactions → Payments: "Showing 1-0 Items"** (zero payments), Refunds ₹0, Disputes ₹0, Failed 0.
- **Search for `pay_T8YKpHW7AuTSVj`** (the ₹2,000 charge from the receipt) → **"The id provided does not exist."**
- **Payment Pages: empty** on the All / Active / Inactive tabs (Status: All).

Interpretation: this account genuinely has **no payment activity and no payment pages**. The empty list matches reality for this account; it is not hidden data.

## C-9. Where the donation flow actually lives — VERIFIED by cross-account evidence
The ₹2,000 charge, the receipt ("R.K.M. Foundation", PAN **AACTR4271L**), and the two Payment Pages belong to a **different** Razorpay merchant account:
- **R.K.M. Foundation** · Merchant ID **`EeNU1Q0XTW5U07`** — observed earlier this session with **~₹4.55K weekly earnings**, the **two Payment Pages** (animal-welfare, RKM-Foundation), UPI "Rejected", login **`info@rkm.support`**.

This is **evidence-based, not assumed**: two distinct Merchant IDs read from Razorpay's own Account & Settings — one (`OVHHxmCeRSVYiQ`) with zero activity, one (`EeNU1Q0XTW5U07`) with all the donation activity and the pages. The `pay_T8YKpHW7AuTSVj` "does not exist" result on the current account is direct proof the transaction was processed elsewhere.

## C-10. Consequence for the report
- Any conclusion that assumed the current account owns the donation flow is **not supported** — this account has no donations.
- The **webhook** and **Payment Pages** verification for the donation flow must be performed on **`EeNU1Q0XTW5U07`** to be valid. Current status on that account: **CANNOT VERIFY** from this session (it is not the logged-in account and I do not log in).

## C-11. Account-independent facts that REMAIN VERIFIED
- Footer QR (`public/images/site/qr.png`) → decodes to `https://pages.razorpay.com/RKM-Foundation` (two decoders).
- ₹2,000 double-charge receipt (`pay_T8YKpHW7AuTSVj`, two ₹1,000 line items) + Axis Bank ₹2,000 debit + Razorpay "Payment successful" ₹2000 email.
- Code refs: `components/Footer.tsx:124` (QR image), `components/DonateWidget.tsx:137` (animal-welfare button).

## C-12. To complete Phase 1 (needs your input, no assumption)
Confirm how to reach the account that owns the donations (`EeNU1Q0XTW5U07`): either switch to it (if `karanrmundhra@gmail.com` has access to it), or log the browser into `info@rkm.support`. If you believe the flow *should* be on `OVHHxmCeRSVYiQ`, that is contradicted by Razorpay's own data above (₹0, 0 payments, id-not-found) — please advise and I will re-verify against whatever you point me to.

**No production changes were made during this investigation.**
