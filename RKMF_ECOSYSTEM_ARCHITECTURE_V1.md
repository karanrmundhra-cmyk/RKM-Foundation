# RKM Foundation — Donor Engagement Ecosystem · Architecture V1
_4 July 2026 · POST-LAUNCH PRODUCT MODE · Design only — nothing implemented, no migrations, no production changes. Wireframes: `preview-v2/ecosystem.html`._
_Canonical in-repo copy (committed 5 July 2026, Ecosystem Phase 4A). Sequence and gates are governed by `RKMF_PRODUCT_ROADMAP_V1.md`; the OneDrive `Review/` copy is superseded by this file._

---

## 0 · What I studied first (the ground truth this design sits on)

The existing system is further along than "a website with a payment button" — the ecosystem should **extend** it, not sit beside it:

- **Database (Supabase Postgres, REST via service key):** `donor` (email-deduped, PAN/compliance_state), `donation` (status, paise, payment_ref, FY, 80G flags, `tenbd_includable`), `receipt` (**gapless numbering via `allocate_receipt_no(fy)` Postgres function, SHA-256 content hash**, printable A5 HTML), `payment_event` (idempotent by provider_event_id), `compliance_event` (PAN-masked audit trail), `fund`. This is already a small nonprofit ERP core.
- **Email (Resend):** donation thank-you + receipt, form acks, newsletter welcome; `lib/email-lifecycle.ts` skeleton with a hard guard that refuses to send while `[NEEDS DATA]` markers remain.
- **Payments (Razorpay):** order/subscription creation, signature-verified webhook → `markDonationPaid` → receipt issue; known open issue: account access + one proven end-to-end donation.
- **Admin:** token-gated (`x-admin-token`, constant-time compare, throttled, dead-by-default) API + pages: stats, donor search, donor detail, receipts, export.
- **Operations today:** owner works from OneDrive + email + WhatsApp; Mac with Cowork available as local glue; no team, no CRM, no scheduled reporting.
- **Website:** bilingual, trust-heavy, one content gap — the promised proof ("see who you helped this month") has no pipeline behind it.

**The single architectural insight:** every module below is a different *view of one content and one money pipeline* that already half-exist. The money pipeline (donation→receipt) is built; the **content pipeline (photos→stories→everywhere)** is the missing spine. Build that spine once and Modules 1+2 collapse into one build; the portal and dashboard read from tables that already exist.

---

## 1 · Product Vision

**One quiet system that lets a family-run foundation operate like a professional institution.** The donor gives once and is never asked to trust blindly again — every month they see exactly who their money helped, can retrieve any document themselves, and never need to email for a receipt. The founder spends five minutes a month on proof, zero minutes on receipts, and gets told about problems before donors notice them. Nothing in the system can say anything that isn't true: content comes only from the founder's uploads; numbers come only from the ledger and the published cost table.

**North-star metrics:** monthly-donor retention · founder-minutes per month (target < 15 across everything) · % receipts self-served · time-to-detect for payment/receipt failures.

---

## 2 · Product Architecture — one system, five views

```
                        ┌──────────────────────────────────────────────┐
                        │              SUPABASE (one DB)               │
                        │  money:   donor, donation, receipt,          │
                        │           payment_event, compliance_event    │
                        │  content: update, story, story_photo (NEW)   │
                        │  email:   email_send, suppression (NEW)      │
                        │  system:  staff, audit_log, action_token(NEW)│
                        │  storage: bucket impact/ (public-read)       │
                        │           bucket vault/  (private)   (NEW)   │
                        └──────┬───────────┬───────────┬───────────────┘
                               │           │           │
        ┌──────────────┐  ┌────┴────┐  ┌───┴────┐  ┌───┴─────────┐
        │ M1 Impact    │  │ M2 The  │  │ M3     │  │ M4 Dashboard│
        │ Mailer       │  │ Rescue  │  │ Donor  │  │ + M5 Vault  │
        │ (email view) │  │ Ledger  │  │ Portal │  │ (staff view)│
        │              │  │ (web    │  │ (donor │  │             │
        └──────────────┘  │  view)  │  │  view) │  └─────────────┘
                          └─────────┘  └────────┘
   One upload → story rows → renders as email, web timeline, archive, portal history.
   One donation → ledger rows → renders as receipt, portal history, dashboard, mailer
   personalisation. No module has private data or private uploads of its own.
```

**Shared everything:** Next.js app (same repo, no second product), Supabase DB+Storage+Auth, Resend, the existing design system (copper/ink/paper, `card`, `btn-copper`, editorial type), the existing `lib/guard` validation, one new `lib/impact.ts` that exports the published ₹-equivalence table used by the website AND the mailer (single source of truth — G-04 made this possible), one audit log, one permission model.

**Naming recommendation for Module 2: “Tobler’s Ledger.”** It is the signature concept already specified in the project workbook — “the ledger where every rescue is written down,” growing out of the founding story. It gives the update system a brand, the website its award-credible signature, and the email a natural sign-off (“added to Tobler’s Ledger”). Fallback if it feels too precious: “The Rescue Log” / hi: “टोबलर का बहीखाता”.

---

## 3 · User Journeys (the four that matter)

**J1 — Founder, monthly (target < 5 min):** 25th: nudge email "July's update has no photos yet." → drops 4 photos + `notes.txt` into `OneDrive/Impact Updates/2026-07/` (Phase B; Phase A = drag onto /admin/updates) → 1st: preview email arrives on phone, EN + HI, exactly as donors will see it, with the recipient count → taps **Send** (or Skip / "edit" link) → done. Photos auto-publish to the Ledger page at the same moment.

**J2 — Monthly donor, monthly (zero effort):** receives the update → sees Bruno's photo and "your ₹5,000 provided a full month of food and care for 2–3 animals" → taps through to the Ledger occasionally → in March, taps "My receipts" in the email footer → magic link → downloads the year's 80G bundle. Never writes an email to the foundation.

**J3 — Prospective donor, once:** lands on /donate-now → sees the newest Ledger entry beside the form (proof-near-ask, the slot V1 reserved) → donates → thank-you page shows "you'll appear in next month's update" expectation.

**J4 — Founder, daily (zero effort until something breaks):** no news = no email. If a webhook fails, a receipt isn't issued within 24h of capture, or a send bounces above threshold → one digest email: what broke, what the system already retried, the one link to act.

---

## 4 · Module Specifications

### M1 · Monthly Impact Mailer (priority 1)
- **Compose:** `update` (one per month: status `draft → preview_sent → approved → sending → sent | skipped`, subject, intro, optional totals) + `story` rows (animal_name, note_en, note_hi, photos, sort). Totals appear ONLY if the founder typed them. Personalisation line = donor's paid sum for the month → nearest tier in `lib/impact.ts` (published equivalences only); donors below ₹1,000-equivalent or with no gift that month get the non-personalised community version.
- **Approve:** preview email to owner with **Send / Skip** buttons = single-use signed tokens (`action_token` row: purpose, update_id, expiry 72h, consumed_at) — GET endpoint, works from any mail client, no login, no reply-parsing. Editing = link into /admin/updates.
- **Send:** batched (Resend batch API, 100/call), `email_send` row per recipient (status queued→sent→delivered/bounced, provider_id, opened_at, clicked_at via Resend webhook), resumable — a crash mid-send resumes from unqueued rows, never double-sends (unique update_id+recipient). Recipients = paid donors with email + newsletter subscribers − `suppression`. Every email: unsubscribe link (feeds `suppression`), "view in browser" → the archive page.
- **Archive:** each sent update is a public page `/updates/2026-07` (this IS the web archive and the "PDF version" — print-styled; a real PDF attachment adds weight for no donor value).
- **Never:** send without an explicit approval token; include any number not typed by the founder or present in the ledger; send twice for the same month.

### M2 · Tobler's Ledger (same build as M1)
- `/updates` — timeline by month, newest first; each month = the archive page; each story gets an anchor + share URL (`/updates/2026-07#bruno`), OG image = the story photo. Galleries = existing `figure-frame` + a lightbox-free horizontal scroll (consistent with Testimonials pattern — no new UI paradigm).
- Hindi: `/hi/updates` full parity. The founder writes EN notes; the preview email shows the HI rendering for the same one-click approval (translation prepared as part of compose; if the founder edits HI, edits stick).
- SEO: Article + ImageObject schema, auto-added to the sitemap, hreflang pair, "Field photos from RKM Foundation" alt-text pattern. The subscribe block's promise ("See who you helped this month") finally links to something real.
- Blog: `/blog` keeps the long-form founding story; the Ledger cross-links it. No content is ever written by the system — empty months simply don't exist on the timeline.

### M3 · Donor Portal (`/account`)
- **Auth:** Supabase Auth email magic-link (OTP). No passwords, no signup — any email can request a link; the portal shows whatever that email owns (nothing = friendly empty state). RLS policies added on `donor/donation/receipt` keyed to JWT email; the app's service-key server routes are unaffected.
- **Four screens only:** Sign-in · Overview (donations list + monthly status + this-FY total) · Receipts (per-donation receipt HTML/print + FY summary; 10BE when filed) · My details (PAN/address/contact — reuses the existing `/api/compliance` path and its masked audit trail). Plus the impact archive links (same Ledger pages, no duplicate view).
- Monthly management: v1 shows "to change or cancel your monthly gift, one click: email us" (existing promise) — Razorpay subscription-cancel API integration is a listed v2, not MVP.
- **Not building:** dashboards, badges, leaderboards, social anything.

### M4 · Internal Dashboard (`/admin` v2)
Extends the existing admin. Only panels that provably save time or catch failures:
- **Today:** donations today/MTD (count+₹), active monthly donors, new donors.
- **Needs attention (the whole point):** paid donations with no receipt after 24h · webhook events with invalid signature or processing errors · bounced/failed sends · PAN-pending donors approaching 10BD deadlines. Each row = one action link. Fed by a daily cron; ALSO delivered as the J4 digest email so the dashboard never needs to be checked "just in case."
- **Updates:** compose/edit the monthly update (the M1 surface), past sends with open/click counts.
- **Existing panels kept:** donor search/detail, receipts, export (10BD CSV), stats.
- **Auth upgrade:** magic-link for allowlisted `staff` emails (role: owner/team) replacing the shared header token for humans (token stays for machine calls); every admin write → `audit_log` (who, what, when, entity).

### M5 · Knowledge Vault (`/admin/vault`) — architecture now, build last
- `document` table (title, category: legal/compliance/vendor/SOP/brand/board, tags[], file_path→`vault` bucket (private, signed URLs), version, supersedes_id, uploaded_by) + Postgres full-text search on title/tags/notes. Version history = append-only supersede chain, never delete.
- Categories seeded from what already exists (the six public certificates, CSR overview, brand assets, receipt/letter templates, SOPs from the workbook).
- "Publish to website" action: copies a vaulted certificate to `/downloads/` with the audit log entry — cert renewals stop being a developer task.
- Permissions: staff-role only; ready for accountant/auditor read-only role later. **Explicitly not MVP** — it must exist in the schema so uploads/auth/audit are reused, not reinvented.

---

## 5 · Database changes (all additive — zero changes to existing tables)

```
update        (update_id, month uq, status, subject, intro_en, intro_hi,
               totals jsonb null, created_at, approved_at, sent_at)
story         (story_id, update_id fk, animal_name, note_en, note_hi,
               sort, cover_photo)
story_photo   (photo_id, story_id fk, storage_path, width, height, alt)
email_send    (send_id, update_id fk, email, donor_id null, status,
               provider_id, error, opened_at, clicked_at, uq(update_id,email))
suppression   (email pk, reason, created_at)
action_token  (token_hash pk, purpose, subject_id, expires_at, consumed_at)
staff         (email pk, role, added_by, created_at)
audit_log     (id, actor_email, action, entity, entity_id, meta jsonb, at)
document      (document_id, title, category, tags text[], storage_path,
               version, supersedes_id null, uploaded_by, created_at)   [M5]
+ RLS enable on donor/donation/receipt with email-claim policies        [M3]
+ storage buckets: impact (public read), vault (private)
```

## 6 · API surface (new routes; existing ones untouched)

```
/api/updates            POST (staff)  create/edit draft;  GET (staff) list
/api/updates/preview    POST (staff/cron) render + send owner preview
/api/updates/action     GET  ?token=  approve|skip (single-use, audited)
/api/updates/send       POST (cron/internal) batched send + resume
/api/webhooks/resend    POST  delivery/open/click/bounce → email_send
/api/cron/monthly       (Vercel cron 25th nudge + 1st preview)
/api/cron/daily         (needs-attention scan → digest email)
/account/*              (portal pages; Supabase Auth session; RLS reads)
/api/vault/*            (staff; signed-URL issue, upload, supersede)   [M5]
```

## 7 · Security & permission model

Three principals, one table each, everything else derived:
1. **Public** — website + published Ledger pages. No change.
2. **Donor** — Supabase Auth magic link; RLS = `email = jwt.email`; sees/edits only own rows via the existing compliance path; rate-limited link requests; sessions 30 days.
3. **Staff** — `staff` table allowlist (owner adds emails), same magic-link mechanism, role checked server-side; all writes audited; machine access keeps `ADMIN_ACCESS_TOKEN`.
Cross-cutting: single-use hashed action tokens for email buttons; Resend webhook signature verification (same pattern as Razorpay); vault = private bucket + short-lived signed URLs; CSP already strict (add Supabase storage host to img-src if not covered — `https:` wildcard already covers it); no PII in logs (existing PAN-masking pattern extends); DPDP note — the portal becomes the DSAR self-service answer, and `suppression` is the single consent-out record.

## 8 · Storage & email architecture

Photos: owner uploads originals → server stores web-optimized (~1600px) + email-width (~800px) renditions in `impact/` (public read, immutable paths). Email uses the 800px rendition hosted (not attached) — light emails, one source. OneDrive (Phase B): a Cowork scheduled task on the Mac pushes new `Impact Updates/<month>/` folders to `/api/updates` — OneDrive stays the founder's interface; Supabase stays the system of record (the server never depends on the Mac being on; the Mac is only an uploader).
Email: all sends via Resend from the existing from-address; transactional (receipts) and update streams share the suppression list for updates but receipts always send (legal document).

## 9 · Automation map

| When | What | Replaces |
|---|---|---|
| 25th monthly | "No photos yet" nudge to owner | remembering |
| 1st monthly | Compose + owner preview (Send/Skip) | writing the update by hand |
| On approve | Batched personalised send + Ledger publish + archive page | mail-merge, website edits |
| Daily | Receipt-gap scan (paid > 24h, no receipt), webhook-failure scan, bounce scan → digest only if non-empty | the class of silent failure that caused the June 80G incident |
| On Resend webhook | Delivery/open/click/bounce → email_send | guessing whether donors read updates |
| FY-end | 10BD export reminder + PAN-pending chase list | spreadsheet archaeology |

## 10 · Risks & dependencies

| Risk | Mitigation |
|---|---|
| **Supabase paused** (current!) | Hard prerequisite; unpause + set keys before P1 |
| Razorpay account/receipt chain unproven | Independent of M1/M2 build, but P1's mailer personalisation needs real `paid` rows — run the test donation first |
| Consent basis for updates | Donor-relationship comms + prominent unsubscribe + suppression honoured everywhere; newsletter list opted in explicitly |
| Hindi translation quality | Owner sees HI in the same preview; nothing sends unseen |
| Owner is a single point of approval | By design — the system may never send alone; Skip is always safe |
| Email images blocked by clients | Alt-text per photo + "view in browser" first line |
| Scope creep | Every module capped at listed screens; anything else goes to the register as a new item |

Dependencies: `RESEND_API_KEY`, `SUPABASE_SERVICE_KEY` confirmed, Supabase Auth enabled (M3), Vercel cron (built-in), Resend webhooks (built-in). **No new paid services. One new npm dependency at most (none identified as required).**

## 11 · Rollout plan & engineering estimate

| Phase | Scope | Estimate | Gate |
|---|---|---|---|
| **P0** | Supabase unpause, keys, one real test donation, template sign-off | you, ~1 hr | — |
| **P1 = MVP** | Content spine + M1 mailer (admin upload, preview, approve, send, archive) + M2 Ledger pages (EN+HI) + donate-page proof slot | **3 dev-days** | your approval of this doc |
| **P2** | M4 dashboard v2: needs-attention scans, daily digest, send analytics, staff magic-link + audit log | 2 dev-days | after one real monthly send |
| **P3** | M3 donor portal (4 screens, RLS, receipts) | 2–3 dev-days | after P2 stable |
| **P4** | M5 vault + OneDrive auto-pickup (Phase B) + polish | 2 dev-days | when useful |

Total ≈ **9–10 dev-days**, spread so each phase ships something you use before the next begins.

## 12 · Operational benefits (what actually gets saved)

Monthly update: hours of manual mailing → **< 5 min**. Receipt requests: email back-and-forth → self-service. Failure detection: "donor complains" → **< 24 h automated digest** (this alone would have caught the June receipt gap on day one). Cert renewals, 10BD prep, donor lookups: from ad-hoc to one screen each. And the website finally keeps its central promise — proof, every month, in the donor's inbox and on the Ledger.

## 13 · What I removed while challenging my own design

A separate CMS (the update composer IS the CMS) · PDF email attachments (archive page + print CSS) · donor accounts with passwords (magic links) · a React admin SPA framework (existing admin pages pattern) · per-donor impact math beyond published tiers (would fabricate precision) · WhatsApp broadcast integration (v2 candidate, needs WABA — listed in Future) · open-rate optimization features (A/B subjects etc. — a trust product, not a growth hack) · separate analytics store (Plausible + email_send suffice) · Knowledge Vault in MVP (schema now, build later).

## 14 · Recommended MVP & the decision I need

**MVP = P1 exactly** (M1 + M2 in one build), because it closes the promise→proof loop that every review identified as the site's #1 gap, and it's the module you asked for first. IM-01 in the register is superseded by this doc (same feature, now designed as part of the whole).

**To proceed I need:** (1) your approval of this architecture (or marked-up changes), (2) P0 prerequisites, (3) the template sign-off from the IM-01 spec (unchanged). Wireframes for all five modules: **`preview-v2/ecosystem.html`** — per the standing rule, P1's screens will also get full previews before any code.

## 15 · Future roadmap (explicitly not now)

WhatsApp update channel (the donate form already collects that consent) · Razorpay subscription self-service in portal · CSR partner reporting view (utilisation certificates from vault + ledger) · volunteer shift coordination · public annual-report generator from ledger data · accountant read-only role.
