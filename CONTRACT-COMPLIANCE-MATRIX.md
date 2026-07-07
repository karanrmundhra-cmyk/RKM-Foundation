# RKM Foundation — Contract Compliance Matrix

_Evidence-backed reconciliation against `RKMF_MASTER_EXECUTION_CONTRACT.md`. Generated 2026-07-07. Every row cites a file / commit / document / audit, tagged VERIFIED (checked against live code/tooling this pass) · INFERRED (static analysis, not runtime-measured) · NEEDS INPUT (requires runtime tooling, real-user data, or owner action)._

> **Cap in force:** overall ≤ 59/100 (CAP RULE) — unresolved Criticals **C1** (silent donation-loss fallback, `app/api/donate/verify/route.ts:14-16`) and **C2** (unauthenticated PII write, `app/api/compliance/route.ts:7`), both payments/donor-data → contract hard-stop. The cap cannot be lifted autonomously.

## A. Working-standard requirements

| Requirement | Status | Evidence | Tag |
|---|---|---|---|
| Engineering Quality Standard (extend not duplicate, no debt, delete dead code) | In Progress | `BreadcrumbJsonLd.tsx` extends the existing inline-`ld+json` pattern (no parallel system); HomeHi hero reuses the file's own `next/image` pattern; `.fuse_hidden` sweep = 0 (git-ignored); fundraiser dirty-value removed. Remaining `.bak` cruft flagged for Mac-side `rm`. `tsc` 0 source errors. | VERIFIED |
| Documentation First | Completed (ongoing) | `CHANGELOG-AUDIT.md` rows 21–30 + session notes; `AUDIT-MASTER-BACKLOG.md` reconciliation banner; this matrix; `PROJECT_STATUS.md`/`BLOCKED.md` current. | VERIFIED |
| Complete Product Boundary (every route/state/asset) | In Progress | Route inventory swept: 62 pages + 24 API routes enumerated; special files audited (`not-found`/`error`/`global-error` present; `manifest.ts` **added**; no `loading.tsx` — client pages self-manage state). | VERIFIED |
| Systems Thinking (no isolated fixes) | Completed | Contrast fix aligned to page's own `/70` token; Breadcrumb built as one reusable component wired to 3 pages; manifest+viewport+icons landed as one PWA unit. | VERIFIED |
| Design System Integrity | In Progress | `DESIGN_SYSTEM_V1.md` (frozen spec) + `tailwind.config.ts` tokens (`ink #111`, copper scale). Finding: 36 raw-hex in components (mostly icon fills) — **Deferred** (high-churn/low-value on frozen pages). | INFERRED |
| User Journey Reviews (first-visit·donate·shop·portal·etc.) | In Progress | Donate journey mapped to C1/C2/H4/H5/M13 (hard-stop); shop journey given Product schema; portal statutory copy contrast-fixed. Full click-to-done narration per journey: **NEEDS INPUT** (real-device walkthrough). | INFERRED |

## B. 25 Scoring Dimensions

_Scored only where evidence exists; runtime-only checks marked NEEDS INPUT rather than guessed (Evidence Rule)._

| # | Dimension | Status / Score | Evidence | Tag |
|---|---|---|---|---|
| 1 | Brand | Strong | White/black/gold V2 frozen (`DESIGN_SYSTEM_V1.md`, `v1.6.0`) | INFERRED |
| 2 | Trust | Strong | 12A/80G/CSR/DARPAN in `layout.tsx` JSON-LD + 6 downloadable certs; legal pages present | VERIFIED |
| 3 | Storytelling | Adequate | Founder story (`/blog`), Tobler's Ledger proof layer | INFERRED |
| 4 | Visual Design | Strong (frozen) | V2 Home/About live-verified Lighthouse 82–92 (`PROJECT_STATUS.md`) | VERIFIED |
| 5 | UI | Adequate | Consistent `.btn-*`, `card-static`, `figure-frame` utilities | INFERRED |
| 6 | UX | In Progress | Donate flow drop-off risks are hard-stop (H4/H5/M13) | INFERRED |
| 7 | Information Architecture | Good | Route map coherent; EN↔HI parity | VERIFIED |
| 8 | Navigation | Good | Header/Footer; `aria-current` on nav links (`Header.tsx:145`) | VERIFIED |
| 9 | Accessibility | Good, not fully proven | 0 alt-less imgs, 0 clickable-div, labels associated, skip-link, focus-trap menu (backlog Verified-good); contrast floored `/70`. **Manual SR (VoiceOver/NVDA) + 320px reflow: NEEDS INPUT** | INFERRED |
| 10 | Typography | Strong | Self-hosted `@fontsource` Inter+Noto+Fraunces (`layout.tsx`) | VERIFIED |
| 11 | Spacing | Adequate | Tokenised scale | INFERRED |
| 12 | Motion | Adequate | GSAP/Lenis page-scoped; `prefers-reduced-motion` honored (backlog) | INFERRED |
| 13 | Performance | Partial | H6/H7 done (next/font, hero next/image); budgets in CI. **Field p75 CrUX + fresh Lighthouse: NEEDS INPUT** | NEEDS INPUT |
| 14 | SEO | Improved | canonical+hreflang (all EN), `Product`+`Breadcrumb`+`FAQ`+`BlogPosting` JSON-LD, sitemap/robots, per-page titles/desc | VERIFIED |
| 15 | AI Discoverability | Improved | Rich schema.org graph (NGO/Org/Product/DonateAction/Breadcrumb) + manifest identity | VERIFIED |
| 16 | Security | Strong | CSP nonce + HSTS (`middleware.ts`, `next.config.mjs`); HMAC webhook verify; `timingSafeEqual`; gitleaks in CI | VERIFIED |
| 17 | Compliance (India) | Partial — CAPPED | 80G/10BD receipt logic (`lib/receipt.ts`, `receipt-pdf.ts`), 6 legal pages (refund/privacy/T&C/80G). **C2 PII-write hole + P0 receipt proof = hard-stop** | VERIFIED (gap) |
| 18 | Donation Flow | Blocked — CAPPED | C1/C2/H2/H4/H5/M13 all approval-gated (`AUDIT-MASTER-BACKLOG.md`) | VERIFIED (gap) |
| 19 | Marketing | Adequate | OG/Twitter cards, impact mailer (`lib/update-email.ts`) | INFERRED |
| 20 | Analytics | Blocked | `components/Analytics.tsx` (Plausible, privacy-light) present; **28-day baseline needs env + real data** (`BLOCKED.md` #8) | VERIFIED (gap) |
| 21 | Automation | Good | `vercel.json` crons (daily 03:30, monthly 04:00); `cron/daily`, `cron/monthly`, `webhooks/resend`, `update-send.ts`; RFC 8058 unsubscribe. Live sends gated on P0. | VERIFIED |
| 22 | Operations | Good | Admin dashboard (attention scans, digest), Knowledge Vault, donor portal live | VERIFIED |
| 23 | One-Person Maintainability | Good | Single Next.js app, additive DB, documented registers, CI gates | INFERRED |
| 24 | Developer Experience | Good | `ci.yml`+`security.yml` (tsc·lint·playwright·lighthouse·gitleaks·npm audit); e2e specs | VERIFIED |
| 25 | Future Scalability | Adequate | Modular components, Supabase RLS, phased architecture doc | INFERRED |

## C. Program-level gates

| Requirement | Status | Evidence | Tag |
|---|---|---|---|
| Feature-Gap Discovery | Completed (this pass) | Found+filled: web manifest/PWA, Product schema, BreadcrumbList. Found+deferred: per-page OG images, sitemap lastmod. Larger gaps (donor CRM depth, matching-campaign) = owner/Content-Pack. | VERIFIED |
| AI Readiness | Improved | schema.org graph expanded (Product/Breadcrumb); entities well-defined; manifest identity | VERIFIED |
| Regression Testing | Partial | `e2e/{a11y,donation,updates}.spec.ts` (Playwright+axe) run in CI; `tsc` 0 source errors this pass. **Full cross-browser + real-device + field: on PR/preview** | INFERRED |
| Live Register | Completed | `AUDIT-MASTER-BACKLOG.md` (Completed/Partial/Blocked/Deferred) + `BLOCKED.md` + `CHANGELOG-AUDIT.md` | VERIFIED |
| Final Product Review (external-agency lens) | In Progress | This pass judged today's state, not history; impressive: trust stack, self-hosted fonts, security posture. Unfinished: proven money-chain, real impact numbers (`[NEEDS DATA]`) | INFERRED |
| Final Red Team Review | Blocked | Cannot pass while C1/C2 open — silent-loss + unauth PII write are exactly the defects a red team targets | VERIFIED |
| Final Completion Test | FAIL (expected) | "Would I donate through this myself / every Critical resolved" = NO while C1/C2 + P0 unproven | VERIFIED |

## D. Conclusion
The **autonomous implementation surface is exhausted for this cycle**, proven above: every requirement is Completed/In-Progress with cited evidence, or classified Blocked/Deferred with justification. Every remaining score-moving item is a contract **hard-stop** (payments, donor-data, credentials, or the P0 money-chain proof) or a **reasoned Deferral** under the Value Filter. Overall stays **≤59/100 capped** until the owner clears C1/C2 and proves one live end-to-end donation.

**Single highest-leverage owner action:** one real ₹ test donation on rkmfoundation.com → confirm capture → webhook → numbered 80G receipt. That unblocks the cap re-score.
