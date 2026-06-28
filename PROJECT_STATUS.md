# PROJECT_STATUS — RKM Foundation website

_Last updated: 28 June 2026. Engineering phase: **CLOSED** pending the Founder Content Pack and owner/credential actions. This document is the single handover surface; `BLOCKED.md` is the single canonical blocker list._

---

## Repository status

- **Stack:** Next.js 14.2.35 (App Router), React 18, TypeScript, Tailwind CSS. Hosting: Vercel.
- **Working tree:** clean after the quality pass. Local working assets (`/Images/`, loose `*.xlsx`, LibreOffice `.~lock` files) are gitignored, not tracked.
- **Quality gates present:** `tsc --noEmit`, `next lint` (ESLint now configured — see below), `next build`, Playwright donation E2E, Lighthouse-CI, gitleaks secret scan, `npm audit` — all wired in `.github/workflows/ci.yml` and `security.yml`.

## Current branch

`rkmf/safe-infra` (preview). Production branch is `origin/main`.

## Latest commit(s)

- **Production (deployed → rkmfoundation.com):** `origin/main` = `9cbfb9b`
- **Quality-pass sign-off commit:** `ec67da7`
- **HEAD (this handover doc):** the commit that adds this file, made immediately after the quality-pass commit (run `git log -1` for its hash).
- **Branch ahead of production (`origin/main`) by, newest first:** this handover doc (HEAD), quality pass (`ec67da7`), `bd2ba07` BLOCKED.md + Razorpay incident, `d393685` email-lifecycle skeleton, `f2ec7ad`/`298a883`/`f440910` footer cleanup. **None of these are on production** — they are preview-only, awaiting approval to merge.

> Note: a stale local `main` pointer (`324cd26`) exists locally and is **not** deployed; `origin/main` (`9cbfb9b`) is the production source of truth.

## Quality-pass evidence (28 June 2026)

All commands run on the repo at the quality-pass commit.

- **Typecheck** — `npx tsc --noEmit`: **PASS** (exit 0, no output).
- **Lint** — `npx next lint`: **PASS** — **0 errors, 8 warnings**. ESLint was previously unconfigured (no deps, no config) so the CI `lint` step was non-functional; this pass added `eslint` + `eslint-config-next@14.2.35` and `.eslintrc.json` (`next/core-web-vitals`), and fixed 5 `react/no-unescaped-entities` errors (`app/donation-failed/page.tsx`, `app/not-found.tsx`, `components/Testimonials.tsx`). The 8 remaining warnings are all `@next/next/no-img-element` (intentional raw `<img>` in motion/prototype components: `HomeHi`, `HeroMotion`, `ToblerStory`, and the `components/prototype/Chapter*` demo set) — non-blocking; `next build` does not fail on warnings.
- **Production build** — `npm run build`: **PASS** — all routes compiled; First Load JS shared by all = **87.5 kB**; Middleware = **26.7 kB**.
- **TODOs / FIXME / HACK in source:** **none** (the one stale `TODO` in `app/api/donate/verify/route.ts` was replaced with a rationale comment — persistence is correctly handled server-side by the Razorpay webhook, not the verify route).
- **`[NEEDS DATA]` placeholders:** **13 intentional call-sites**, all in `lib/email-lifecycle.ts`. `sendLifecycleEmail` refuses to send while any `[NEEDS DATA:` marker remains, so an unfilled skeleton cannot reach a donor.
- **Environment variables:** every app-config variable referenced in code is documented in `.env.example` (added `RECEIPTS_FROM_EMAIL` this pass). The only referenced-but-undocumented name is `NODE_ENV`, a framework built-in that is not user-supplied — correctly omitted.
- **Secret scan:** only `.env.example` is tracked (no real `.env`); a pattern scan over tracked files found no secrets. gitleaks is not installed locally, but `security.yml` runs `gitleaks-action@v3` on every push as the authoritative gate.
- **Dependency audit:** production deps = **1 high + 1 moderate** (both `postcss`, transitive via `next`; pre-existing, not introduced by this pass; `security.yml` already flags audit findings for triage). Dev-only adds (eslint toolchain) bring the full count to 4 high + 1 moderate — not shipped to users.

## Completed work

**Live on production (`origin/main`):** cookie consent (SOP-01); consent-gated analytics + funnel (SOP-02); self-hosted fonts; `next/image`; per-request nonce CSP + security headers; manual WCAG 2.2 AA pass; donation E2E + CI gates (SOP-13); homepage wireframes/flows + donate non-happy states; hero/CTA/image and wordiness copy edits; real homepage photos (Feed/Heal/Shelter/Tobler).

**On branch `rkmf/safe-infra` (preview only, not deployed):** footer cleanup ("Subscribe to hope" masthead, one-line hours, de-crammed columns); email-lifecycle skeleton (`lib/email-lifecycle.ts`); `BLOCKED.md` + `ops/RAZORPAY-INCIDENT-2026-06-28.md`; this quality pass (ESLint gate now functional, entity fixes, unused `ogl` dep removed, env doc, gitignore, historical reports archived to `Review/`).

## Remaining work (almost all content/credential-gated, not engineering capacity)

1. Fill the 13 `[NEEDS DATA]` fields in `lib/email-lifecycle.ts` → enables lifecycle emails.
2. Donation amount-ladder outcomes + impact strips + "where your money goes" block (needs cost-per-outcome math + fund-allocation %).
3. Tobler's-Ledger signature concept (needs named animals + documentary photos).
4. Visual-design pass; wire + schedule the lifecycle email triggers/cron.
5. Decide whether to remove or gate the internal `/prototype` and `/prototype-v2` demo routes before public launch (they currently build and ship; no deletion was made — pending approval).

**Estimated engineering once content lands:** ~4–6 dev-days, plus ~0.5 day for the launch runbook (test donation, secret rotation, receipt sign-off).

## Blockers

`BLOCKED.md` is the **single canonical blocker list**. Summary: **P0** Razorpay outage (live); **P1 credentials** — 80G webhook + `RAZORPAY_WEBHOOK_SECRET`, eMandate/e-NACH, Plausible account + 28-day baseline, secret rotation (RKMF-030), `RESEND_API_KEY`; **P1 Founder Content Pack** — items 7–16 (named animals/photos, rescue stories, impact numbers, cost-per-outcome math, fund-allocation %, board names, mission one-liner, CSR, wishlist, FCRA). Razorpay incident detail: `ops/RAZORPAY-INCIDENT-2026-06-28.md`. Execution history: `Review/RKMF-PROJECT-CLOSURE.md` §7. No other file maintains a competing blocker list.

## Deployment status

- **Production:** `origin/main` (`9cbfb9b`) → rkmfoundation.com. Live site reflects the copy/image/wordiness work.
- **Preview:** `rkmf/safe-infra` → Vercel branch preview. Footer + email skeleton + quality pass are **preview-only; not merged to `main`.** No production deploy was performed in this pass.
- **LIVE INCIDENT:** Razorpay donations are failing across all surfaces (website checkout and Razorpay's own hosted Payment Page) — evidence indicates a Razorpay-side terminal issue, not website/code. Support emailed; see `ops/RAZORPAY-INCIDENT-2026-06-28.md`.

## Exact next action when the Founder Content Pack arrives

1. Fill the 13 `[NEEDS DATA]` fields in `lib/email-lifecycle.ts` from the pack — **cost-per-outcome math first** (it unblocks the amount ladder, impact strips, and the emails).
2. Build the donation amount-ladder outcomes + impact strips + "where your money goes" from the real numbers.
3. Implement the Tobler's-Ledger signature using the named animals + documentary photos.
4. Set `RESEND_API_KEY`, wire the lifecycle triggers/cron, and run the donation E2E.
5. Merge `rkmf/safe-infra` → `main` after preview QA + explicit approval.

**Owner actions in parallel (not engineering):** Razorpay terminal re-enabled; 80G webhook + `RAZORPAY_WEBHOOK_SECRET` configured; previously-exposed secrets rotated; Plausible account created.

## Open questions / assumptions

- `[ASSUMPTION]` `/prototype` and `/prototype-v2` are internal demo routes; recommend gating or removing them before public launch. No deletion was made — pending approval (per the standing "do not delete anything" instruction).
