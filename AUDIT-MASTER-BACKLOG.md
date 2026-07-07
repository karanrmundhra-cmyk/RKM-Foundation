# RKM Foundation — Master Audit Backlog

> ## ⚠ RECONCILIATION — 2026-07-07 (read before actioning anything below)
> The detailed findings below are the **original 16-Jun snapshot** and are kept as historical evidence. Much has shipped since (June quality pass + V2 freeze). Verified current state against live code on 2026-07-07:
>
> **CLOSED / verified done (do not re-open):**
> - Security: H1, H3, L1, L2, L3 · SEO: H8, H9, H10, M2, M3, M4, M5, L8 · Perf: **H7** (next/font — Fraunces self-hosted, no Google `<link>`) · A11y: **H11 fully closed** (`text-ink/40|45|50|55` = 0 hits site-wide; last 4 account/admin lines floored to `/70` on 7 Jul) · **M6** downgraded (residual `text-copper` is decorative-with-label / hover-only / frozen shop) · Hygiene: **M8** (`.fuse_hidden` = 0, git-ignored), **L4** (fundraiser goal dirty value fixed 7 Jul).
>
> **PARTIAL:** **H6** (next/image) — 22 raw `<img>` → **6** remaining, all preview-gated: dynamic `/updates` Ledger photos (`app/updates/*`, `app/hi/updates/*`, `LedgerProofCard.tsx`) + `/hi` home (`HomeHi.tsx`). Frozen V2 pages: 0 raw `<img>`. Next code batch candidate (needs `next.config` remotePatterns + preview).
>
> **TRUE REMAINING = hard-stop / owner (these hold the ≤59 cap):** C1, C2, H2, H4, H5, M13 (all payments/donor-data), M1 (Upstash dep — approval), M7 (asset compression — approval). Plus all `BLOCKED.md` P0/P1 items (money-chain proof, secret rotation, Razorpay config, analytics baseline, Content Pack).
>
> **Deferred (Mac-side):** delete `components/prototype-v2/WhatWeDo.tsx.bak-*` (OneDrive cloud-lock blocked sandbox rm).
>
> Per-change evidence for all 7-Jul edits: `CHANGELOG-AUDIT.md` rows 21–24 + session note.

## Implementation status (original snapshot — 2026-06-16; see reconciliation above)
| Metric | Count |
|---|---|
| Total Issues Identified | 35 |
| Total Issues Fixed (code-complete) | 11 (23 file changes) |
| Total Issues Verified (typecheck + review) | 11 |
| Total Issues Pending (production-verify after deploy) | 11 |
| Total Issues Deferred | 4 |
| Total Issues Blocked (need approval / manual) | 11 |

➡ **Full per-change evidence (before/after code, risk, verification, rollback) is in [`IMPLEMENTATION-EVIDENCE-PACK.md`](./IMPLEMENTATION-EVIDENCE-PACK.md).** Items are marked Complete only after evidence is recorded there.

---


**Site:** rkmfoundation.com (Next.js 14 App Router, Vercel) · **Date:** 2026-06-16
**Scope:** 62 pages (EN + Hindi), 13 API routes, Razorpay donations, admin/PII area.
**Method:** Static source audit (ripgrep/Read across full repo) + rendered-HTML inspection + targeted live fetches, by 5 parallel specialist passes (Security, SEO, Accessibility/UX, Performance/Code, Content/Conversion/QA). Every finding cites file:line or asset evidence. **No padding — verified findings only.**

**Not yet performed (offered):** live headless **Lighthouse** and **axe** runtime sweeps require a connected browser/extension or local run. The equivalent checks were performed statically (contrast from tokens, render-blocking resources, image weights, semantics/labels/focus). Connect Claude-in-Chrome or say the word and I'll run real Lighthouse/axe per page.

## Severity summary
| Severity | Count |
|---|---|
| Critical | 2 |
| High | 12 |
| Medium | 14 |
| Low | 10 |
| **Total** | **38** |

> **Meta-issue — RESOLVED (reconciled).** The apparent "production ahead of repo" was **OneDrive sync lag**, not a real split. Git confirms local `HEAD` = `origin/main` = **live Vercel production deployment**, all on commit **`632def9`** (see PRODUCTION-VS-REPO-DIFF-REPORT.md). No divergence remains; the reconciled HEAD is the source of truth. **New operational constraints for implementation:** (1) `main` **auto-deploys to production** on push — work must stay on a branch with preview-only deploys, merged only on approval; (2) an **active dev session is concurrently committing** to this repo — coordinate before editing shared files.

---

## CRITICAL

### C1 — Captured donations can be silently lost (no ledger row, no 80G receipt)
- **Category:** Business logic / Payments · **Effort:** M · **Approval required:** YES
- **Evidence:** `app/api/donate/verify/route.ts:14-16` only verifies the signature and returns `{verified:true}` — body is a stub: `// TODO(30-day plan): persist donation + trigger receipt`. All persistence + receipt email live **only** in `app/api/razorpay-webhook/route.ts`. Recurring compounds it: `app/api/donate/route.ts:30-33` returns after `createMonthlySubscription` with **no** `insertDonation`.
- **Impact:** If the Razorpay webhook secret/endpoint is misconfigured, a captured payment leaves the donor on the thank-you page with no DB record and no statutory 80G/10BD receipt — money taken, nothing recorded.
- **Fix:** Add idempotent fallback persistence in `/verify` (keyed on payment/order id), reconcile amount/currency against the created order, and add a production health check that fails loudly if `RAZORPAY_WEBHOOK_SECRET` is unset. *(Refs: CONV-1, CONV-3, SEC-2)*

### C2 — Unauthenticated write of statutory tax PII to any donor record
- **Category:** Security / Data / Legal · **Effort:** M · **Approval required:** YES
- **Evidence:** `app/api/compliance/route.ts:7` accepts a JSON POST with no proof-of-ownership; `lib/db.ts:52-60` writes PAN + address keyed only on the submitted `email` and flips `tenbd_includable=true`.
- **Impact:** Anyone who knows/guesses a donor email can write a PAN + address onto that person's record and alter their 10BD tax-reporting inclusion. Unauthenticated mass-assignment of statutory PII.
- **Fix:** Bind the compliance form to a signed, single-use token issued to the verified donor email (or require the donation/receipt id). Add Origin checks on public POSTs. *(Ref: SEC-7)*

---

## HIGH

### H1 — Stored HTML/script injection in staff notification emails
- **Security · S** · **Evidence:** `lib/email.ts:120` injects form values raw: `...<td>${String(v)}</td>...`. Donor-facing emails correctly use `esc()` (`email.ts:30-58`); this path omits it. Every public form (contact, careers, CSR, partner, fundraiser, volunteer) flows here.
- **Impact:** A submitter sending `<img src=x onerror=...>`/`<a href>` injects arbitrary HTML into the internal ops inbox (`info@rkm.support`) — phishing/spoofing of staff.
- **Fix:** `${esc(String(v))}` on value and key label. *(SEC-1)*

### H2 — Webhook trusts gateway-reported amount with no reconciliation
- **Security / Payments · M · Approval: YES** · **Evidence:** `app/api/razorpay-webhook/route.ts:25-29,38-46` marks paid by `order_id` and the fallback insert trusts `p.amount` / `p.notes` without comparing to the `gross_amount_paise` stored at initiation (`donate/route.ts:38`). 80G receipts are issued off this amount.
- **Fix:** Compare captured `p.amount` to the stored donation amount; flag/reject mismatch; don't derive donor identity from attacker-influenced `p.notes` unvalidated. *(SEC-3)*

### H3 — Donor PII logged in plaintext
- **Security / Privacy · S** · **Evidence:** `lib/email.ts:124` `console.log(... JSON.stringify(data))` (full form payload); `app/api/compliance/route.ts:20` logs donor email; `donate/verify/route.ts:15`. The forms log fires whenever `RESEND_API_KEY` is unset — i.e. the live-but-unconfigured state.
- **Fix:** Remove/redact payload logging to counts or keys. *(SEC-4)*

### H4 — Donor PAN/address/WhatsApp captured at donate step, then discarded
- **Conversion / Data · M · Approval: YES** · **Evidence:** `components/DonateWidget.tsx:60` sends PAN/address/opt-in only into client-side Razorpay `notes`; `app/api/donate/route.ts:19-23` only forwards `{amount,frequency,name,email}`. The 80G cert then requires re-entering PAN+address in `ComplianceForm` on the thank-you page.
- **Impact:** Friction + drop-off on 80G capture; data entered once is wasted.
- **Fix:** Forward and persist `pan`/`address`/`whatsapp`; pre-fill or skip ComplianceForm. *(CONV-2)*

### H5 — Successful payment can be shown as "failed"
- **Conversion / UX · S · Approval: YES** · **Evidence:** `components/DonateWidget.tsx:62-71` — if `/verify` returns non-verified or throws (network blip), donor is routed to `/donation-failed` ("no amount has been deducted"), but Razorpay already captured (handler only fires on success).
- **Impact:** Confused donors, duplicate donations, refund/support load on valid payments.
- **Fix:** On verify failure show "we're confirming your payment", reconcile via webhook — not a hard failure. *(CONV-5)*

### H6 — No `next/image`; LCP hero is a raw, unoptimized `<img>`
- **Performance / SEO · M · Approval: YES** · **Evidence:** 0 `next/image` imports across repo; 22 raw `<img>` (e.g. `Header.tsx:84`, `Footer.tsx:45`, `HomeHi.tsx:47`). Homepage LCP hero `components/prototype-v2/HeroMotion.tsx:73-77` is `<img src="/images/site/dog.jpg">` with no width/height, no priority/preload, GSAP-parallaxed. `next.config.mjs:40` enables the optimizer but it's never used.
- **Fix:** Migrate to `next/image` (WebP/AVIF, responsive srcset, lazy/priority); set dimensions; `priority` on hero. *(PERF-2, PERF-3)*

### H7 — Render-blocking Google Fonts via `<link>`
- **Performance / Privacy · S** · **Evidence:** `app/layout.tsx:25-28` injects two `fonts.googleapis.com` stylesheets (Inter + Noto Sans Devanagari); 0 `next/font` usage.
- **Fix:** `next/font/google` (self-host, subset, preload) — removes third-party round-trip + font CLS. *(PERF-1)*

### H8 — No hreflang on a bilingual site
- **SEO · M** · **Evidence:** 0 `alternates.languages` anywhere; Hindi pages set only self-canonical. EN↔HI versions are never paired for Google.
- **Impact:** Duplicate/near-duplicate + wrong-locale-in-SERP risk; Hindi pages compete with EN.
- **Fix:** Add `alternates.languages` (`en`, `hi`, `x-default`) pairing each EN↔HI URL. *(SEO-1)*

### H9 — `lang="en"` on all Hindi pages
- **Accessibility (WCAG 3.1.1) / SEO · M** · **Evidence:** `app/layout.tsx:24` hard-codes `<html lang="en">`; single root layout, no `/hi` layout. All Devanagari content is announced as English by screen readers and declared English to crawlers.
- **Fix:** Set `lang="hi"` for the `/hi` subtree (route-group layout or server-side segment check). *(A11Y-1, SEO-9)*

### H10 — Homepage `/` and `/hi` have no page-level metadata `[⚠ partially resolved on prod]`
- **SEO · S** · **Evidence:** `app/page.tsx` and `app/hi/page.tsx` (local) have no `export const metadata`. **Live check:** production `/hi` already serves a localized Hindi title (`RKM फाउंडेशन — भारत में पशु बचाव…`), so prod is fine for `/hi`; this is a **local-repo staleness** artifact. Still worth confirming `/` (EN home) has a unique title vs. the layout default, and that canonical/hreflang exist.
- **Fix:** Sync repo to prod; then add canonical + hreflang. *(SEO-3)*

### H11 — Widespread low-contrast text below 4.5:1
- **Accessibility (WCAG 1.4.3) · M** · **Evidence:** `text-ink/40` (~2.6:1), `/45` (~2.9:1), `/55` (~3.5–3.9:1) on real content incl. legal/disclaimer copy — e.g. `app/csr/page.tsx:122` (`text-ink/45` disclaimer), `app/contact/page.tsx:40` (detail labels), `components/ImpactSlider.tsx:60` ("256-bit secure…" trust line), `CsrAccordion.tsx`, `TeamProfiles.tsx:78`, `HomeHi.tsx:83,110,177`.
- **Fix:** Floor muted text at `text-ink/65–/70`. *(A11Y-2)*

### H12 — No analytics / conversion tracking of any kind
- **Analytics · S–M · Approval: YES (data/consent)** · **Evidence:** No GA4/GTM/Vercel Analytics/Plausible in code or live HTML.
- **Impact:** Traffic, donation funnel, and drop-off are completely unmeasurable.
- **Fix:** Add privacy-light analytics (Vercel Analytics or GA4) + donation funnel events; cookie/consent note as applicable. *(I1)*

---

## MEDIUM

### M1 — Rate-limiting + dedupe are per-instance and IP-spoofable
- **Security · M · Approval: YES (adds Upstash dep)** · **Evidence:** `lib/guard.ts:1-12` in-memory `Map` ("serverless best-effort"); keyed on client-controllable `x-forwarded-for` (`adminAuth.ts:12`, `donate/route.ts:7`, `forms/route.ts:16`). Per-instance on Vercel; resets on cold start; bypassable by rotating XFF. *(SEC-5, I3, CONV-7)*
- **Fix:** Use trusted platform IP; move limits + form dedupe to Upstash/Redis.

### M2 — EN pages missing canonical (Hindi have them)
- **SEO · S** · **Evidence:** canonical count = 0 on all EN pages; all `app/hi/**` set `alternates.canonical`. Asymmetric. **Fix:** add `alternates:{canonical}` to every EN page. *(SEO-2)*

### M3 — Structured data limited to Organization
- **SEO · M** · **Evidence:** only `app/layout.tsx:31-38` NGO JSON-LD. Missing `BlogPosting` (`/blog/the-dog-who-started-it-all`), `FAQPage` (`/faqs`), `BreadcrumbList`. **Fix:** add the three (+ Hindi). *(SEO-4)*

### M4 — One shared OG/Twitter card for entire site
- **SEO · M** · **Evidence:** only `layout.tsx` defines OG/Twitter; blog, donate, all `/hi` share one English card + `/og.png`. **Fix:** per-page/locale OG overrides for blog, donate, `/hi`. *(SEO-5)*

### M5 — `noindex` inconsistent on transactional/utility pages
- **SEO · S** · **Evidence:** fundraiser/shop confirmation + donation-failed are noindexed, but `app/thank-you`, `app/newsletter-confirmed`, `app/unsubscribe` (+ Hindi) are indexable → index bloat. **Fix:** `robots:{index:false}` on all post-action/utility pages, both locales. *(SEO-7)*

### M6 — `copper` (#B89245) used as text (~2.8:1)
- **Accessibility · S** · **Evidence:** `ImpactSlider.tsx:41`, `CsrAccordion.tsx` accents; `copper-dark #8F6A2A` (~4.7:1) is the passing token already used for CTAs. **Fix:** use `copper-dark` for any text; reserve `copper` for fills. *(A11Y-3)*

### M7 — Oversized / wrong-format static assets
- **Performance · M · Approval: YES (content assets)** · **Evidence:** `public/logo.svg` **872 KB**, `images/site/pollution.jpg` 414 KB, `images/team/ahanaa-sarda.png` **314 KB (photo as PNG)**, `images/shop/gouri.jpg` 263 KB, `feed.jpg` 245 KB, `girl.jpg` 229 KB. **Fix:** compress/convert to WebP/AVIF, optimize SVG, serve via next/image. *(PERF-4)*

### M8 — 357 orphaned `.fuse_hidden*` files committed
- **Code hygiene · S** · **Evidence:** `find -name .fuse_hidden*` = 357 across `app/**`, `components/**` (OneDrive sync artifacts; some contain stale `<img>` code). **Fix:** delete + `.gitignore`. *(CODE-1, UX-3)*

### M9 — Dead code: prototype directories + unused assets
- **Code hygiene · S** · **Evidence:** `components/prototype/` (13 files) has 0 external refs (`app/prototype` only `redirect("/")`); `components/prototype-v2/Experience.tsx` + `PrototypePill.tsx` unreferenced; `public/prototype/` = **1.4 MB** of images used nowhere. **Fix:** delete; rename `prototype-v2/`→`home/` (it's actually live). *(CODE-2, CODE-3)*

### M10 — Hindi nav/footer link to English destinations; toggle drops users home
- **UX / i18n · S** · **Evidence:** `Footer.tsx:10` Hindi "कानूनी और शासन" → `/legal` (English) though `/hi/legal` exists; `Header.tsx:16` Hindi "शॉप" → `/shop`; `Header.tsx:31-34` `HI_PAGES` omits many translated routes so the EN→HI toggle sends users to `/hi` home instead of the equivalent page. **Fix:** point to `/hi/*`; expand `HI_PAGES`. *(QA-2, QA-3)*

### M11 — Broken Hindi internal link (404) `[✗ FALSE POSITIVE — resolved on prod]`
- **QA · S** · **Evidence:** code audit flagged `/hi/legal/website-disclaimer-cookie-policy` as missing. **Live check: returns HTTP 200.** The page exists on production; the local repo is simply behind. **No action** beyond syncing the repo. *(QA-1 — retracted)*

### M12 — EN↔HI parity gaps `[⚠ mostly resolved on prod]`
- **Content / SEO · M** · **Evidence:** code audit (stale repo) flagged missing Hindi legal pages. **Live check:** `/hi/legal/80g-tax-disclaimer` and `/hi/legal/website-disclaimer-cookie-policy` both return **200** on production — the Hindi legal section is complete live. Remaining real gap to verify post-sync: Hindi fundraiser/shop *confirmation* pages. **Fix:** sync repo, then confirm only the confirmation-page gaps. *(SEO parity — largely retracted)*

### M13 — No client-side email validation before payment
- **Conversion · S · Approval: YES (flow)** · **Evidence:** `DonateWidget.tsx:29-44` validates only amount; malformed email proceeds to order, receipt silently fails. **Fix:** validate email shape, inline error. *(CONV-4)*

### M14 — Silent donation outage in demo mode
- **Conversion / Ops · S** · **Evidence:** `donate/route.ts:17` returns `{demo:true}` when keys absent; a deploy with missing Razorpay env vars silently disables all donations with no alert. **Fix:** log/alert when `keys()` is null in production. *(CONV-6)*

---

## LOW

- **L1 — Admin token compared non-constant-time** (`lib/adminAuth.ts:16` `got === expected`). Use `crypto.timingSafeEqual` (used correctly on Razorpay paths). *(SEC-6)* · S
- **L2 — Verbose DB errors in thrown messages** (`lib/db.ts:18` interpolates `r.text()`). Keep generic-message pattern everywhere. *(SEC-8)* · S
- **L3 — Loose `EMAIL_RE` + CSV formula injection** (`guard.ts:18` permits `,()*`; `lib/csv.ts` doesn't prefix cells starting `= + - @`). Defense-in-depth. *(SEC-9)* · S
- **L4 — Fundraiser goal `<option>` value carries "— Most Chosen"** (`app/fundraiser/create/page.tsx:17`) → dirty data. Separate label from value. *(CONTENT-2)* · S
- **L5 — Orphaned fundraiser pages** `ready/success/thank-you` unlinked. Remove or wire in. *(CONTENT-3)* · S
- **L6 — Duplicated inline CTA classes** bypass existing `.btn-*` utilities (`globals.css:15-18`); e.g. `thank-you/page.tsx:46`, `WhyTrust.tsx:63`. Consolidate. *(UX-1)* · S–M
- **L7 — Lang toggle lacks `aria-current`; required/error not field-associated** in `FormShell`/`ComplianceForm` (DonateWidget does it right). *(A11Y-4, A11Y-5)* · S
- **L8 — Sitemap omits `/hi/shop`** (`app/sitemap.ts`). Add it; decide on utility pages. *(SEO-6)* · S
- **L9 — Client-component overuse** — static legal/FAQ pages ship motion JS (`HomeExperience.tsx` etc.). Push `"use client"` to leaf wrappers. *(PERF-6)* · M
- **L10 — Repo root clutter** — ~18 report `.md`, 9 `RKMF-*.html` previews, `.xlsx`, `_genreceipt.cjs` stub, unused `logo-copper.png`/`logo-black.png`. Move to `/docs` or delete. *(CODE-4, CODE-5)* · S

---

## Verified-good (no action needed)
- Razorpay payment **and** webhook signatures verified (HMAC-SHA256 + `crypto.timingSafeEqual`, raw-body read, unequal-length guard); webhook **idempotent** (unique `provider_event_id`, 500-on-error so Razorpay retries).
- `requireAdmin` is the first line of **all 8 admin routes**; dead-by-default when token unset. No secrets in `NEXT_PUBLIC_*` (only publishable Razorpay key).
- PostgREST values consistently `encodeURIComponent`-wrapped; donor-facing receipts/emails escape via `esc()`; PAN masked in receipts/compliance events. Donation bounds enforced server-side; currency hard-coded INR.
- Strong security headers (CSP, HSTS, X-CTO, Referrer-Policy, Permissions-Policy) and correct redirects (www→apex). `robots.ts` correct. Clean `tsc --noEmit`.
- Accessibility is structurally strong: global skip-link, landmarks, exemplary mobile menu (focus trap, `aria-modal`, ESC, focus restore), `prefers-reduced-motion` honored across gsap/lenis/framer, all meaningful images have alt, real `<button>`/`<a>` semantics, focus-visible everywhere, labeled forms with honeypot + min-fill bot protection.
- Hindi content is genuine, high-quality Devanagari (not machine copy-paste). CTAs consistent ("Donate Now"/"अभी दान करें"). Trust signals strong (12A/80G/CSR/DARPAN + downloadable certs — all 6 PDFs present). No lorem/TBD/fake-stats in production copy. No unused npm dependencies.

---

## Audit F — Live Site Validation (runtime, production)
Cross-checked the code findings against the running site via a real browser (console, network, DOM, timing) + live HTTP status checks.

**Validated clean at runtime** (homepage, `/donate-now`, `/hi`):
- **Zero console errors/exceptions**; **zero failed network requests** — all 24 homepage requests 200/304, no 4xx/5xx, no missing assets, no broken images (`naturalWidth` check).
- Exactly **one H1** per page; fast delivery (TTFB ~16–89 ms, load ~88–210 ms warm); **no horizontal overflow** at desktop width.
- Donation page renders correctly with amount tiers, name/email/PAN/address fields, T&C + WhatsApp opt-in, and "secured by Razorpay" handoff intact.

**Confirmed live (real issues, not stale):**
- **H7** — two render-blocking requests to `fonts.googleapis.com` / `fonts.gstatic.com` fire on every page. ✓
- **H9** — `/hi` serves a Hindi title + Devanagari H1 but `document.documentElement.lang === "en"`. ✓ (WCAG 3.1.1 fail confirmed in the browser.)

**Retracted/downgraded by live check (code audit ran against a stale local repo):**
- **M11** broken Hindi link → **200 on prod** (retracted).
- **M12** Hindi legal parity → Hindi legal pages **exist on prod** (largely retracted).
- **H10** `/hi` metadata → prod serves **localized Hindi** title (partially resolved).

**Could not complete (honest gaps — need different tooling):**
- **True mobile/tablet viewport testing:** the controlled browser window would not shrink below ~1710 px on this display and no device-emulation mode is exposed, so I will not claim a mobile render pass. Needs DevTools device mode, a real device, or BrowserStack. (Desktop responsive layout shows no overflow; Tailwind responsive classes are present in code.)
- **Lighthouse scores:** the PageSpeed Insights API returned empty through the available fetch tool, and the site's CSP blocks in-page PSI calls; warm-cache in-browser CWV (LCP read as 0) isn't reliable enough to quote. Needs a PSI API key or a local `npx lighthouse` run — I can do either if you enable it.

## Recommended execution workflow
1. **Resolve source-of-truth** (local repo vs live Vercel) — blocker.
2. **Autonomous (no approval):** all **Low** + the safe **Medium** code/hygiene items (M8, M9, M2, M5, M6, M10, M11, L1–L10). Pure code, reversible, no business-logic/content/payment impact.
3. **Approval batches (High/Critical):** payments + data + content + live-rendering items — C1, C2, H1–H12, M1, M7, M12, M13. Grouped into batches of ~10 with rollback + before/after evidence.
4. **No production deploy without explicit approval.** Maintain `CHANGELOG` + before/after evidence per change.
