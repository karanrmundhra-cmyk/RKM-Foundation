# PROJECT_STATUS — RKM Foundation

_Last updated: 5 July 2026. Website: **FROZEN at `v1.1.0`**. Active stream: **Digital Ecosystem — Phase 4A (Foundation) complete**. `BLOCKED.md` is the single canonical blocker list; this file never duplicates it._

---

## Repository status

- **Stack:** Next.js 14.2.35 (App Router), React 18, TypeScript, Tailwind CSS. Hosting: Vercel (GitHub integration — deploys on merge to `main`).
- **Production:** `origin/main` → rkmfoundation.com. Tags: `v1.0.0` (website close), `v1.1.0` (DC-01-C Large Desktop Comfort).
- **Quality gates (CI on every PR):** `tsc --noEmit` · `next lint` · `next build` · Playwright donation E2E incl. WCAG 2.2 AA axe · Lighthouse-CI · gitleaks · `npm audit` (`.github/workflows/ci.yml`, `security.yml`).
- **Preview branch `rkmf/safe-infra`:** ahead of `main` with footer cleanup, `lib/email-lifecycle.ts` skeleton, and the June quality pass — **merge pending owner approval** (owner decision; tracked in BLOCKED.md).

## Governing documents

1. **Ecosystem Master Execution Contract** (owner-held prompt) — how the work runs.
2. `RKMF_PRODUCT_ROADMAP_V1.md` — sequence, gates, milestones (Phases 4A–4E).
3. `RKMF_ECOSYSTEM_ARCHITECTURE_V1.md` — module architecture (canonical in-repo copy).
4. `DESIGN_SYSTEM_V1.md` — frozen design spec; all new surfaces comply.
5. `BLOCKED.md` — canonical blockers + exact unblock inputs.

## Ecosystem status

| Phase | Status |
|---|---|
| **4A Foundation** | ✅ **Complete (5 Jul 2026).** Architecture validated against the codebase; DB validated live (Supabase ACTIVE_HEALTHY; tables `fund/donor/donation/subscription/payment_event/receipt_sequence/receipt/foreign_flag/compliance_event/audit_trail`, all RLS-enabled; functions `allocate_receipt_no`, `indian_fy`, `donation_guard`, `forbid_mutation`, `write_audit`; migrations ×3; security advisors: 2 minor findings, logged). APIs validated (webhook signature + idempotency, admin constant-time auth + throttle, nonce CSP). Email pipeline validated (single Resend module, graceful no-key skip). Duplication scan clean. Canonical docs committed to `main`. |
| **4B Mailer + Ledger** | 🔧 **Built (5 Jul)** — full pipeline + Ledger EN/HI + proof slot + crons + E2E, staged as a Preview Release (FINAL REVIEW MODE: one founder review before production). First live send gated on P0. ADRs 001–003 in `docs/adr/`. |
| **4C Dashboard v2** | After 4B live. |
| **4D Donor Portal** | After one month of 4B in real use. |
| **4E Knowledge Vault** | When useful to owner. |

**Standing engineering rules (from the contract):** extend, never duplicate (specifically: extend `audit_trail`; no new audit table) · all DB changes additive · previews before any new user-facing screen · anti-fabrication (content only from founder uploads; numbers only from ledger + published equivalence table) · rollback plan per deployment · ADRs for significant decisions · every module reaches Website-v1.1.0 quality before "done".

## Known minor findings (logged, not blocking)

- Supabase advisor WARN: `pg_trgm` extension installed in `public` schema (cosmetic; move considered post-4B).
- Supabase advisor INFO: `receipt_sequence` has RLS enabled with no policies (intentional — service-key access only).
- `lib/guard.ts` throttle is per-instance best-effort — magic-link rate limiting (4D) may need a stronger limiter; decide at 4D design.
- `/prototype` + `/prototype-v2` remain in the repo (gated 307 + robots-disallowed) — removal pending owner approval.

## Website track (closed)

Engineering, UX/content, and visual-design phases are complete and frozen. Any change goes through the Master Improvement Register (`Review/RKMF-IMPROVEMENT-REGISTER.md`, OneDrive) with previews and owner approval. Owner-rejected items are never reopened.

## Exact next actions

1. **Owner (P0, ~1 hr):** see `BLOCKED.md` — test donation, `RESEND_API_KEY`, secret rotation, IM-01 template sign-off.
2. **Engineering (4B):** screen previews for the Mailer admin/compose/preview-email and `/updates` Ledger pages (EN+HI) → owner approval → build on a feature branch → CI → staged.
