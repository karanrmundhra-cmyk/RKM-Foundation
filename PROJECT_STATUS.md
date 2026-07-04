# PROJECT_STATUS — RKM Foundation

_Last updated: 6 July 2026. Website: **FROZEN at `v1.1.0`**. Ecosystem: **BUILD COMPLETE (Phases 4A–4E live)** — operational gates in `BLOCKED.md`. `BLOCKED.md` is the single canonical blocker list; this file never duplicates it._

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
| **4A Foundation** | ✅ Complete (5 Jul) — validation report; canonical docs on `main`. |
| **4B Mailer + Ledger** | ✅ **LIVE (v1.2.0)** — compose → one-tap approve → batched resumable send → delivery tracking; `/updates` EN+HI; donate proof slot (invisible until first send); RFC 8058 one-click unsubscribe; crons. First donor send gated on P0. |
| **4C Dashboard v2** | ✅ **LIVE (v1.3.0)** — needs-attention scans (receipt-gap/webhook/bounce/PAN), daily digest (no news = no email), Today panel, send analytics. |
| **4D Donor Portal** | ✅ **LIVE (v1.4.0)** — magic-link `/account` (overview·receipts·details), RLS self-read policies, signed receipt downloads. **Owner action:** Supabase Auth Site URL + redirect allowlist + custom SMTP before donor use. |
| **4E Knowledge Vault** | ✅ **LIVE (v1.5.0)** — versioned private documents, search, signed downloads, publish-to-website copy flow. |

**Standing engineering rules (from the contract):** extend, never duplicate (specifically: extend `audit_trail`; no new audit table) · all DB changes additive · previews before any new user-facing screen · anti-fabrication (content only from founder uploads; numbers only from ledger + published equivalence table) · rollback plan per deployment · ADRs for significant decisions · every module reaches Website-v1.1.0 quality before "done".

## Known minor findings (logged, not blocking)

- Supabase advisor WARN: `pg_trgm` extension installed in `public` schema (cosmetic; move considered post-4B).
- Supabase advisor INFO: `receipt_sequence` has RLS enabled with no policies (intentional — service-key access only).
- `lib/guard.ts` throttle is per-instance best-effort — magic-link rate limiting (4D) may need a stronger limiter; decide at 4D design.
- `/prototype` + `/prototype-v2` remain in the repo (gated 307 + robots-disallowed) — removal pending owner approval.

## Website track (closed)

Engineering, UX/content, and visual-design phases are complete and frozen. Any change goes through the Master Improvement Register (`Review/RKMF-IMPROVEMENT-REGISTER.md`, OneDrive) with previews and owner approval. Owner-rejected items are never reopened.

## Exact next actions

1. **Owner (P0):** `BLOCKED.md` items 1–4 — test donation, `RESEND_API_KEY`, IM-01 template confirmation (the preview email IS the template), secret rotation.
2. **Owner (portal):** Supabase dashboard → Auth → set Site URL `https://rkmfoundation.com`, add `https://rkmfoundation.com/account` to redirect allowlist, configure custom SMTP (Resend) for magic links.
3. **First real month:** drop photos at `/admin/updates` → tap Send in the preview email → verify the Ledger page + digest.
