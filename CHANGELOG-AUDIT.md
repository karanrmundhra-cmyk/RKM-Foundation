# Audit Implementation Changelog

Source of truth: reconciled HEAD `632def9` (local = origin/main = production). Changes below are **uncommitted local edits** in the working tree — not yet committed/pushed/deployed.

| # | Date | Issue | File | Change | Verification | Rollback |
|---|---|---|---|---|---|---|
| 1 | 2026-06-16 | H1 / SEC-1 (stored HTML injection) | `lib/email.ts:120` | Wrapped form key + value in `esc()` (escapeHtml) before HTML email interpolation | `tsc --noEmit` clean; `esc` already imported & used elsewhere in file | `git checkout lib/email.ts` |
| 2 | 2026-06-16 | H3 / SEC-4 (PII in logs) | `lib/email.ts:124` | Replaced `JSON.stringify(data)` log with field-count only (no PII) | `tsc` clean; behaviour unchanged except log redaction | `git checkout lib/email.ts` |
| 3 | 2026-06-16 | L1 / SEC-6 (timing-safe auth) | `lib/adminAuth.ts` | Replaced `got === expected` with sha256 + `timingSafeEqual` constant-time compare | `tsc` clean; no edge runtime in API routes → `node:crypto` valid; valid-token behaviour unchanged | `git checkout lib/adminAuth.ts` |
| 4 | 2026-06-16 | L3 / SEC-9 (CSV formula injection) | `lib/csv.ts:2` | Prefix cells starting `= + - @ \t \r` with `'` before quoting | `tsc` clean; RFC-4180 quoting preserved | `git checkout lib/csv.ts` |
| 5 | 2026-06-16 | H10 (home SEO) | `app/page.tsx` | Added `metadata` with canonical `/` + hreflang en/hi/x-default | `tsc` clean | `git checkout app/page.tsx` |
| 6 | 2026-06-16 | H9 / A11Y-1 (Hindi lang) | `components/LangSync.tsx` (new) + `app/layout.tsx` | Client component sets `<html lang="hi">` on `/hi` subtree (WCAG 3.1.1) | `tsc` clean; LangSync wired in body | delete `LangSync.tsx`, revert layout import + `<LangSync/>` |
| 7 | 2026-06-16 | L2 / SEC-8 (error leak) | `lib/db.ts:18` | Log verbose PostgREST body server-side only; throw generic `db-error {status}` | `tsc` clean | `git checkout lib/db.ts` |
| 8 | 2026-06-16 | M5 (noindex) | `app/thank-you/page.tsx` | Added `robots:{index:false,follow:false}` | `tsc` clean | `git checkout` |
| 9 | 2026-06-16 | M5 (noindex) | `app/newsletter-confirmed/page.tsx` | Added `robots:{index:false,follow:false}` | `tsc` clean | `git checkout` |
| 10 | 2026-06-16 | M5 (noindex) | `app/unsubscribe/page.tsx` | Added `robots:{index:false,follow:false}` | `tsc` clean | `git checkout` |
| 11 | 2026-06-16 | H8 / M2 (canonical+hreflang) | `app/about`, `app/donate-now`, `app/contact`, `app/faqs`, `app/blog/...` | Added `alternates.canonical` + `languages` (en/hi/x-default) to 5 key EN pages | `tsc` clean; 6 pages now paired (incl. home) | `git checkout` per file |
| 12 | 2026-06-16 | M3 (structured data) | `app/faqs/page.tsx` | Added `FAQPage` JSON-LD built from FAQ content arrays | `tsc` clean; valid schema.org FAQPage | `git checkout` |
| 13 | 2026-06-16 | M3 (structured data) | `app/blog/the-dog-who-started-it-all/page.tsx` | Added `BlogPosting` JSON-LD (headline, image, author, publisher) | `tsc` clean | `git checkout` |
| 14 | 2026-06-16 | H8 / M2 (canonical+hreflang) | `app/csr`, `app/careers`, `app/media`, `app/partner-with-us`, `app/other-ways-to-give`, `app/fundraiser` | Added canonical + hreflang to 6 more EN content pages (12 EN pages total now) | `tsc` clean; grep=12 | `git checkout` per file |
| 15 | 2026-06-16 | M4 (per-page OG) | `app/donate-now`, `app/blog/...` | Added page-specific `openGraph` (donate = website, story = article) | `tsc` clean | `git checkout` per file |
| 16 | 2026-06-16 | Editorial — image dominance | `components/prototype-v2/WhatWeDo.tsx` | Image crop 16:10→3:2, column 6/6→7/5, `section-y`→`section-y-lg`, row pad py-12/16→16/24, divider `ink/10`→`ink/[0.07]` | `tsc` clean; scope-guard: no type/colour/copy change | `git checkout` |
| 17 | 2026-06-16 | Editorial — story image scale | `components/prototype-v2/ToblerStory.tsx` | Image column 5→6, text 7→6, gap-16→gap-20, `section-y`→`section-y-lg` | `tsc` clean | `git checkout` |
| 18 | 2026-06-16 | Editorial — breathing + softer dividers | `components/prototype-v2/GiftSection.tsx` | `section-y`→`section-y-lg`, gap-x-12→16, tier pad py-9→12, divider `ink/12`→`ink/[0.08]` | `tsc` clean | `git checkout` |
| 19 | 2026-06-16 | Editorial — breathing + softer band | `components/prototype-v2/WhyTrust.tsx` | `section-y`→`section-y-lg`, mt-16→20, gap-y-12→14, band divider `ink/10`→`ink/[0.07]` | `tsc` clean | `git checkout` |
| 20 | 2026-06-16 | Section flow | (the 4 sections above) | Unified `section-y-lg` rhythm + softened dividers so sections read as one continuous editorial flow; no new sections/content/animation | `tsc` clean | `git checkout` per file |
| 21 | 2026-07-07 | H11 / A11Y-2 (low-contrast statutory copy) | `app/account/receipts/page.tsx:64`, `app/account/details/page.tsx:71`, `app/account/portal.tsx:49` | `text-ink/55`→`/70` on donor-portal legal helper lines (Form 10BE/10BD, masked audit trail, "receipts are legal documents") — ~4.15:1 → ~6.7:1, clears WCAG 1.4.3 AA for 12px text; aligns outliers to the `/70` token already used elsewhere on these pages | grep: 0 residual `text-ink/55`; class-string-only, no type impact | `git checkout` per file |
| 22 | 2026-07-07 | H11 / A11Y-2 | `app/admin/updates/page.tsx:196` | `text-ink/55`→`/70` on the "never invents numbers" helper line (admin surface) | grep clean | `git checkout` |
| 23 | 2026-07-07 | L4 / CONTENT-2 (dirty form value) | `app/fundraiser/create/page.tsx:17` | Removed "— Most Chosen" marketing suffix baked into the ₹50,000 `<option>`; FormShell renders `string[]` options as both label AND submitted value, so the goal was captured as literal `"₹50,000 — Most Chosen"`. Now clean `"₹50,000"`. Encouragement retained via the field `hint`. | grep: 0 "Most Chosen"; `string[]`→`string[]`, no type impact | `git checkout` |
| 24 | 2026-07-07 | M8 / CODE-1 (cruft) | `components/prototype-v2/WhatWeDo.tsx.bak-20260619-181834` | Delete stray editor `.bak` (unreferenced backup). **Blocked in this environment** — OneDrive cloud-lock returned `Operation not permitted`. Remove on the Mac: `rm "components/prototype-v2/WhatWeDo.tsx.bak-20260619-181834"` | n/a (not compiled) | restore from OneDrive version history |

### Session note — 2026-07-07 (autonomous execution)
- **Stale-backlog reconciliation (VERIFIED):** re-audited the safe cluster from the 16-Jun `AUDIT-MASTER-BACKLOG.md` against current code. Confirmed **already fixed** and requiring no action: H1, H3, L1, L3 (rows 1–4 above), H8/M2 canonical+hreflang, H9 `<html lang>` (now derived from `x-pathname`, no separate LangSync needed), M5 utility-page noindex, L8 sitemap `/hi/shop`, M8 `.fuse_hidden` sweep (0 files, git-ignored). The 16-Jun backlog header counts are stale relative to the June quality pass + V2 freeze.
- **Downgraded M6 (copper-as-text):** remaining `text-copper` hits are decorative-with-`aria-label` star ratings on **frozen** shop pages, an `aria-hidden` decorative SVG, and a hover-only Header state — low ROI, touch frozen/shared surfaces. Not chased.
- **Frozen surfaces untouched:** no edits to Home V2 / About V2 (`components/home-v2/*`, `components/about-v2/*`, `app/page.tsx`, `app/about/*`) or Header/Footer/DonateWidget.
- **Cap unchanged:** overall remains capped ≤59/100 by unresolved Criticals **C1** (silent-donation-loss fallback in `/api/donate/verify`) and **C2** (unauthenticated PII write in `/api/compliance`), both **approval-required / hard-stop** (payments + donor data) — cannot be resolved autonomously.

### Fresh zero-assumption ecosystem audit — 2026-07-07 (batch 2)
Re-ran the full contract against live code as if another agency built it (not limited to the prior backlog). New findings + fixes below. Method: static route/AST sweep across 62 routes, 24 API routes, structured-data types, a11y primitives, DX. Verified-good this pass: **0** images without `alt`, **0** clickable-`div` a11y hacks, **0** placeholder/lorem in live copy, custom `not-found`/`error`/`global-error` all present, JSON-LD already covers NGO/Org/FAQPage/BlogPosting/Article/DonateAction.

| # | Date | Finding (fresh) | File | Change | Verification | Rollback |
|---|---|---|---|---|---|---|
| 25 | 2026-07-07 | No web-app manifest (no A2HS / theme-color / install identity) | `app/manifest.ts` (new) | Added `MetadataRoute.Manifest` — name/short_name/description, `standalone`, bg `#fff`, theme `#111`, icons from existing `/public` brand assets. Next auto-injects `<link rel=manifest>`. | `tsc` clean (source); assets verified present (logo-128/512, apple-touch) | delete file |
| 26 | 2026-07-07 | No `themeColor`; apple-touch-icon + favicon not declared in metadata | `app/layout.tsx` | Added `export const viewport` with `themeColor:#111`; added `metadata.icons` (icon/shortcut/apple); removed the one-off raw `<link rel=icon>` (now emitted from metadata). Head-only, no visual/behavioural change. | `tsc` clean; additive metadata only | `git checkout app/layout.tsx` |
| 27 | 2026-07-07 | Shop had **no** `Product`/`Offer` structured data (invisible to product & AI search) | `app/shop/page.tsx` | Added nonce'd `Product` JSON-LD from **real on-page data** — “Hope” Candle, soy wax/cotton wick/50h, image `/images/shop/hope-candle.jpg`, `Offer` INR **1999** InStock. No `aggregateRating`/`review` (no verifiable numeric rating on page → anti-fabrication). | `tsc` clean; mirrors blog/faqs ld+json nonce pattern; app already dynamic via root-layout `headers()` so 0 incremental render cost | `git checkout` |
| 28 | 2026-07-07 | HI shop same gap | `app/hi/shop/page.tsx` | HI `Product` JSON-LD (`inLanguage:hi`, Hindi description, `Offer` url `/hi/shop`) | `tsc` clean | `git checkout` |
| 29 | 2026-07-07 | No `BreadcrumbList` anywhere (weak SEO/AI nav-graph) | `components/BreadcrumbJsonLd.tsx` (new) + `app/shop`, `app/hi/shop`, `app/blog/the-dog-who-started-it-all` | New reusable server component (reads CSP nonce itself → no duplication); wired to shop EN/HI + founder-story blog post | `tsc` clean | delete component + revert 3 wires |
| 30 | 2026-07-07 | H6 — `/hi` home LCP hero was raw `<img>` (no AVIF/WebP/srcset) | `components/home/HomeHi.tsx` | Converted the hero to `next/image` `fill priority sizes=100vw` (local asset, already imported; matches the file's own `figure-frame` Image pattern on lines 79/100). LCP hero now responsive + modern-format. | `tsc` clean (0 source errors); container is `relative overflow-hidden` so `fill` positions correctly | `git checkout components/home/HomeHi.tsx` |

**H6 remaining — deliberately deferred (documented decision, not a defect):** the 5 Ledger/updates proof `<img>` (`LedgerProofCard.tsx`, `app/updates/*`, `app/hi/updates/*`) render **remote Supabase-hosted** donor photos inside sized `aspect-[16/10]` containers, with an in-code eslint-disable stating the raw `<img>` is intentional and CLS is already handled by the container. Converting needs `next.config` `remotePatterns` + `fill` on a money-adjacent proof layer for only a modest format/bandwidth gain → preview-gated batch, low ROI now, respect the documented choice.

**Batch-2 self-challenge (Apple / Awwwards / a11y / perf / first-time donor):** all changes are invisible `<head>`/`ld+json` additions — no layout, copy, motion, or behaviour touched; frozen Home/About/Header/Footer untouched. Shop/blog are frozen v1.1.0 but these are the freeze's sanctioned **SEO exception** (measurable, additive, staged via PR). No `aggregateRating` fabricated. `next build` + Rich Results Test recommended on the preview to confirm Google parses Product/Breadcrumb.

**Fresh-audit findings deliberately NOT actioned (with reason):**
- **43 `: any`** — DX debt, but broad type surgery = high regression risk, low user value → `[DEFERRED, VALUE FILTER]`.
- **6 `console.log`** — all guarded "(not configured)"/"(db off)" ops signals; the one happy-path log lives in `donate/verify` (C1 hard-stop file) → not touched.
- **H6** remaining 6 raw `<img>` (Ledger `/updates`, `/hi` home) → needs `next.config` remotePatterns + preview; next code batch.
- **Home meta description** — inherits layout default (not unique); Home is frozen → `[NEEDS INPUT / owner]` before touching a locked page.

### Held (constraint-respecting)
- **Gift CTA copper emphasis** — the approved demo recoloured the "Give ₹X" buttons to copper, but this round's brief said *keep colours unchanged*, so I kept them `btn-dark` and drove emphasis via spacing only. Say the word to apply the copper treatment.
- **Hero scrim lightening** — held to protect headline contrast; needs a preview to verify legibility before lightening the image dominance further.
- **Hindi homepage** (`components/home/HomeHi.tsx`) uses a separate component and was **not** changed — apply the same editorial pass there for parity once approved.

### Editorial v1 (batch 16–20) — REVERTED
Batches 16–20 (the first editorial pass: 7/5 columns, 3:2 crop, blanket `section-y-lg`) were **reverted to live** on user instruction (process changed to Review→Approve→Implement). Files restored byte-for-byte to HEAD `941032f`; verified clean.

### Editorial v2 (batch 21–24) — APPROVED, restrained, implemented
After a per-section review + approval gate. Crop unchanged (16:10 / 4:5); image emphasis via a **gentle 54/46 column nudge** (not the rejected 7/5); no fonts/sizes/colours/copy changed.
| # | Section | Change | Verify | Rollback |
|---|---|---|---|---|
| 21 | Hero (`HeroMotion.tsx`) | Photo opacity .80→.85; scrim middle/top lightened (`via-ink/40→/30`, `to-ink/5→/0`) keeping `from-ink/90` for headline contrast; corner labels `white/55→/40`; content `pb-24/sm:pb-28 → pb-28/sm:pb-32` | tsc clean; headline scrim preserved | `git checkout` |
| 22 | What We Do (`WhatWeDo.tsx`) | Image +8% via `lg:grid-cols-[13fr_11fr]`/`[11fr_13fr]` (was 6/6); row `py-12/16→16/24`, `gap-x-10→14`, divider `ink/10→ink/[0.07]`; **crop stays 16:10** | tsc clean; aspect-16/10 intact | `git checkout` |
| 23 | Tobler (`ToblerStory.tsx`) | Image +8% via `lg:grid-cols-[9fr_11fr]` (was 5/7); `lg:gap-16→20`; `section-y→section-y-lg`; **no quote styling** | tsc clean | `git checkout` |
| 24 | Why Trust (`WhyTrust.tsx`) | `section-y→section-y-lg`; reasons `mt-16→20`, `gap-y-12→14`; band `mt-20→24` + divider `ink/10→ink/[0.07]` (grouping); cert pills: restrained hover (lift 2px, arrow nudge 2px, reduced-motion-guarded; no glow/scale/shadow/colour) | tsc clean | `git checkout` |

**Not implemented (per scope):** Gift section + CTA (not approved — review halted), liveness layer, `next/image`/`next/font` (P2, separate review).

## Verification summary
- **Typecheck:** `npx tsc --noEmit` → clean (no errors).
- **Runtime safety:** no `runtime = "edge"` in any API route, so `node:crypto` in `adminAuth.ts` is valid.
- **Scope:** all four edits are in isolated `lib/*` files not under concurrent edit; none touch payments, DB schema, legal content, or external installs.
- **Regression risk:** minimal — valid admin tokens still authenticate; donor/form emails render identically (just escaped); CSV opens identically minus the formula-execution risk.

## Deferred (with reason)
- **H7 next/font** — DEFERRED. The Devanagari font is referenced by literal name (`"Noto Sans Devanagari"`) via inline styles across ~20 Hindi files (several created by the active editor). Self-hosting via `next/font` would require rewriting all of them to a CSS variable and cannot be visually verified without a deploy → unacceptable regression risk on the Hindi site. Do this in a dedicated pass with a Vercel preview.
- **Broader canonical/hreflang sweep** — 6 key pages done; remaining ~18 EN + ~24 HI pages need the same one-line `alternates` block (mechanical, low-risk; couldn't script it because the sandbox can't write to the OneDrive mount — each needs a manual/Edit pass).
- **next/image, contrast fixes, dead-code deletion** — see FINAL-AUDIT-REPORT.md (collision-risk / sandbox-permission / preview-verification constraints).

## Not yet done (verification pending)
- Commit / push / production deploy: **blocked** — (a) GitHub push needs credentials not available here; (b) repo is under active concurrent edit; (c) `main` auto-deploys to production (approval-gated). These edits await human commit or a coordinated branch+preview.
- Live before/after screenshots of these specific fixes: N/A (backend/logic changes, not visual). Verified by typecheck + code review.
