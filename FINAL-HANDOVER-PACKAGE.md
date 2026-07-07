# RKM Foundation — Final Handover Package

_Prepared 2026-07-08. Self-contained: a new engineer can resume from this document alone. Companion docs: `CONTRACT-COMPLIANCE-MATRIX.md`, `CHANGELOG-AUDIT.md`, `AUDIT-MASTER-BACKLOG.md`, `OVERSIGHT-REGISTER.md`, `BLOCKED.md`, `PROJECT_STATUS.md`._

---

## 1. Executive Summary — current state
- **Product:** rkmfoundation.com — Next.js 14 (App Router) / React 18 / TS / Tailwind, hosted on Vercel (auto-deploys `main`). Bilingual EN + Hindi (`/hi`). Razorpay donations, Supabase backend, donor portal, admin dashboard, impact-mailer/Ledger.
- **This engagement (2026-07-07/08):** a full-contract audit + implementation pass focused on the **safe, autonomous** surface. All work is on branch **`rkmf/a11y-contrast-formfix`** (7 commits, **ahead of `main`, NOT in production**). CI passes locally (`tsc` 0 source errors).
- **Headline outcome:** accessibility, PWA, performance-hero, robots, and the **entire SEO / structured-data surface (EN + HI, every indexable page)** are complete and evidence-verified. The **donation UX** already meets the contract's Donation Philosophy §8 (verified on live prod).
- **The product is NOT launch-complete.** Overall is **capped at ≤59/100** by two unresolved Criticals + an unproven money-chain (all owner/hard-stop). None of these are within autonomous authority.

## 2. Final weighted score (evidence-based)
| | Score | Basis |
|---|---|---|
| **Overall** | **≤ 59 / 100 (CAPPED)** | CAP RULE — unresolved Criticals C1 + C2 + unproven P0 money-chain. `[VERIFIED]` |
| Uncapped trajectory | ~ low-80s | Strong on Trust/Security/SEO/Structured-data/Typography/Automation; gated by proof-of-money + real impact numbers. `[INFERRED]` |

Dimension-level scoring with evidence tags is in **`CONTRACT-COMPLIANCE-MATRIX.md` §B**. Performance/axe/Lighthouse rows are `NEEDS INPUT` pending a Vercel preview.

## 3. Commits this engagement (branch `rkmf/a11y-contrast-formfix`)
| Hash | Category | Summary |
|---|---|---|
| `15b2606` | a11y / content / docs | Portal+admin statutory copy `text-ink/55→/70` (WCAG 1.4.3); fundraiser goal dirty-value fix (L4); saved Master Execution Contract |
| `09576ff` | seo / pwa / docs | Web manifest + theme-color; Product+Breadcrumb JSON-LD (shop EN/HI, blog); hero `next/image`; backlog reconcile; compliance matrix |
| `2dcf691` | seo / correctness | Product schema `InStock→PreOrder` (shop pre-launch); per-page shop OG; `/account` robots disallow; runtime-verified fixes |
| `f380444` | docs | Enter Continuous Oversight Mode (blocker watch + trigger→cycle map) |
| `a090984` | seo | Per-page OG + BreadcrumbList across content pages (about/faqs/fundraiser/csr/legal) |
| `f0c6d3f` | seo | Hindi structured-data parity — OG + BreadcrumbList on all HI pages + HI BlogPosting |
| `adb3c72` | seo | BreadcrumbList on all 12 legal sub-pages (EN+HI) — structured-data surface complete |

**Not yet merged to `main` → not deployed.** Open a PR from this branch; CI (tsc · lint · build · Playwright+axe · Lighthouse-CI · gitleaks · npm audit) runs on the PR.

## 4. Every file modified / added
**New files (6):** `RKMF_MASTER_EXECUTION_CONTRACT.md` · `app/manifest.ts` · `components/BreadcrumbJsonLd.tsx` · `CONTRACT-COMPLIANCE-MATRIX.md` · `OVERSIGHT-REGISTER.md` · `FINAL-HANDOVER-PACKAGE.md` (this).

**Modified — app/config:**
- `app/layout.tsx` (viewport themeColor + metadata icons; removed one-off `<link rel=icon>`)
- `app/robots.ts` (added `/account` disallow)
- `app/account/receipts/page.tsx`, `app/account/details/page.tsx`, `app/account/portal.tsx`, `app/admin/updates/page.tsx` (contrast `/70`)
- `app/fundraiser/create/page.tsx` (goal dirty-value)
- `components/home/HomeHi.tsx` (`/hi` hero → `next/image`)

**Modified — SEO/structured-data (per-page OG + BreadcrumbList; +Product/BlogPosting where noted):**
- EN: `app/shop/page.tsx` (+Product), `app/blog/the-dog-who-started-it-all/page.tsx`, `app/about/page.tsx`, `app/faqs/page.tsx`, `app/fundraiser/page.tsx`, `app/csr/page.tsx`, `app/legal/page.tsx`
- HI: `app/hi/shop/page.tsx` (+Product), `app/hi/about`, `app/hi/faqs`, `app/hi/fundraiser`, `app/hi/csr`, `app/hi/legal`, `app/hi/blog/the-dog-who-started-it-all` (+BlogPosting)
- Legal sub-pages (12): `app/legal/{privacy-policy,terms-and-conditions,donation-refund-policy,shop-refund-policy,80g-tax-disclaimer,website-disclaimer-cookie-policy}` + the 6 `app/hi/legal/*` equivalents

**Modified — docs:** `AUDIT-MASTER-BACKLOG.md`, `CHANGELOG-AUDIT.md`, `OVERSIGHT-REGISTER.md`.

## 5. Every issue fixed
| Ref | Issue | Fix | Tag |
|---|---|---|---|
| H11 | Low-contrast statutory copy (~4.15:1) in donor portal + admin | Floored to `text-ink/70` (~6.7:1) | VERIFIED |
| L4 | Fundraiser goal `<option>` submitted marketing label as data | Cleaned value to `₹50,000` | VERIFIED |
| PWA | No web manifest / theme-color / apple-touch declared | `app/manifest.ts` + viewport themeColor + icons | VERIFIED |
| SEO | Shop had no `Product`/`Offer` schema | Product+Offer (EN/HI) from real ₹1,999 data | VERIFIED |
| SEO (self-red-team) | Product said `InStock` on a **pre-launch** shop | Corrected to `PreOrder` | VERIFIED (live) |
| SEO | Generic OG card sitewide (layout OG propagates) | Per-page `openGraph` on all content + shop pages (EN+HI) | VERIFIED (live) |
| SEO | No `BreadcrumbList` anywhere | Reusable `BreadcrumbJsonLd` on **all** indexable EN+HI pages incl. 12 legal sub-pages | VERIFIED |
| SEO | HI pages had zero structured data (EN did) | Full EN↔HI parity (OG + Breadcrumb + HI BlogPosting) | VERIFIED |
| Perf (H6 partial) | `/hi` LCP hero raw `<img>` | → `next/image fill priority` | VERIFIED (tsc) |
| SEO/priv | `/account` login crawlable | robots disallow | VERIFIED |
| Hygiene | Stale backlog / cruft | Reconciled `AUDIT-MASTER-BACKLOG.md`; `.fuse_hidden`=0 | VERIFIED |

## 6. Every issue intentionally deferred (with reason)
| Item | Why deferred | Class |
|---|---|---|
| **43 `: any`** | Untyped `dbFetch` row results + catch bindings across **admin/export/receipt/webhook**; real fix = typed data-layer refactor touching **donor-data/payment** paths (partly hard-stop) with regression risk | TECH-DEBT (tracked) |
| **Per-page OG images** | Needs real 1200×630 branded design assets; will not fabricate | OWNER/DESIGNER |
| **H6 Ledger *listing* images → next/image** | Preview-gated (must verify render on the money-adjacent donate proof layer) + `next.config` remotePatterns | NEEDS PREVIEW |
| **H6 Ledger *detail* images** | Natural-ratio `figure-frame`; `fill` would crop donor photos — documented deliberate raw-`<img>` choice, correct | KEEP AS-IS |
| **`.bak` cleanup** | `components/prototype-v2/WhatWeDo.tsx.bak-*` — sandbox `rm` blocked by OneDrive cloud-lock | MAC-SIDE `rm` |
| **`/prototype*` route removal** | Owner approval pending (gated 307 + robots-disallowed already) | OWNER |

## 7. Every owner action required
1. **P0 — prove the money-chain:** one live smallest-amount donation on prod → confirm payment captures → webhook fires → numbered 80G receipt emails → thank-you renders. *(Single highest-leverage action; lifts the cap.)*
2. **C1** (approval): idempotent fallback persistence + receipt in `app/api/donate/verify/route.ts` (currently a stub).
3. **C2** (approval): bind `app/api/compliance/route.ts` PII write to a signed single-use token; add Origin checks.
4. **Vercel/Razorpay/Supabase config:** `RESEND_API_KEY` + `DEFAULT_FUND_ID` in Vercel prod; enable Razorpay webhook (events: payment.captured/failed, subscription.charged); rotate exposed secrets (RKMF-030); Supabase Auth Site URL + redirect allowlist + custom SMTP (magic-link portal).
5. **Analytics baseline:** Plausible account + `NEXT_PUBLIC_PLAUSIBLE_*` + 28 days of data → unlocks CRO/A-B cycle.
6. **Content Pack (SOP-09):** real named animals/photos, rescue stories, impact numbers + dates, cost-per-outcome math, fund-allocation % + audited financials, board names/consent, FCRA status, active-match confirmation. Everything impact-related is `[NEEDS DATA]` until supplied (anti-fabrication).
7. **Decision:** port `/hi` to the V2 design system (EN Home/About are V2; `/hi` is V1 — the one visible inconsistency).
8. **Merge decision:** review + merge `rkmf/a11y-contrast-formfix` → `main` (this session's work).

Full unblock detail per item: **`BLOCKED.md`**.

## 8. Production verification still pending (needs a running preview/prod)
- Lighthouse (lab **and** CrUX field p75), axe runtime, Playwright donation E2E — run on the PR/preview.
- Google Rich Results Test on `/shop`, `/blog/...`, legal pages (confirm Product/Breadcrumb/BlogPosting parse).
- Real-device mobile/tablet (320–1440px) + cross-browser (Chrome/Safari/Firefox/Edge).
- Verify the money-chain (§7.1) end-to-end on production.

## 9. Final roadmap
**NOW (owner, this week):** money-chain test (P0) · Vercel/Razorpay/Supabase config · merge the branch · secret rotation.
**NEXT (unblocks once above done):** analytics baseline → CRO cycle · Content Pack → impact numbers + proof layer + `aggregateRating` · resolve C1/C2 (eng, owner-approved) · H6 listing images on preview.
**LATER:** `/hi` V2 parity · typed data-layer refactor (retire `: any`) · per-page OG images · `/prototype*` removal · legal-subpage OG.

## 10. Risk register
| Risk | Sev | Likelihood | Mitigation / status |
|---|---|---|---|
| **C1** captured donation lost (no ledger row / no 80G receipt) if webhook misconfigured | Critical | Med until proven | Owner: prove money-chain + add `/verify` fallback |
| **C2** unauthenticated PII write to any donor record | Critical | Med | Owner: signed-token binding |
| Money-chain unproven end-to-end | Critical | — | Owner test donation |
| Secrets previously exposed (RKMF-030) | High | — | Owner rotation |
| Impact numbers absent (`[NEEDS DATA]`) weakens trust vs peers | Med | — | Content Pack |
| `/hi` V1↔V2 visual inconsistency | Low-Med | — | Owner design decision |
| `: any` in data layer masks type errors | Low | — | Tracked tech-debt; typed refactor later |

## 11. Launch-readiness checklist
- [ ] `rkmf/a11y-contrast-formfix` reviewed + merged to `main`
- [ ] CI green on the PR (tsc · lint · build · Playwright+axe · Lighthouse-CI · gitleaks · npm audit)
- [ ] **Live test donation** verified: capture → webhook → 80G receipt → thank-you
- [ ] C1 fallback + C2 token binding implemented & approved
- [ ] `RESEND_API_KEY`, `DEFAULT_FUND_ID`, Razorpay webhook, rotated secrets set in Vercel
- [ ] Supabase Auth (Site URL + redirect + SMTP) configured; portal magic-link tested
- [ ] Plausible live (baseline started)
- [ ] Content Pack supplied; `[NEEDS DATA]` placeholders filled
- [ ] Rich Results Test passes (Product/Breadcrumb/FAQ/BlogPosting)
- [ ] Lighthouse ≥ targets (mobile) + field p75 CWV good
- [ ] Real-device + cross-browser pass (320–1440px)
- [ ] `/hi` V2 parity decision made

## 12. Continuous Oversight Register
Live in **`OVERSIGHT-REGISTER.md`** — trigger→cycle map + 12-item blocker watch. Summary: on any of {preview URL · merge/deploy · test-donation confirmation · Content Pack · analytics live · credential unblocked · `/hi` greenlight}, the Product Council resumes autonomous Audit→Implement→Verify→Re-audit for that item immediately. Final Completion Test currently **all-No** (capped ≤59) — project is not closed.

---

**Bottom line for the next engineer:** the front-end quality/SEO/a11y/PWA surface is done and evidence-backed on this branch; merge it. The path to launch is now almost entirely **operational + content + payment-verification**, not code. Start at §7.1 (the money-chain) — it unblocks the most.
