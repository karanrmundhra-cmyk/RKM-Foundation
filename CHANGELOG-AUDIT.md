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
