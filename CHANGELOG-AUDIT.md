# Audit Implementation Changelog

Source of truth: reconciled HEAD `632def9` (local = origin/main = production). Changes below are **uncommitted local edits** in the working tree — not yet committed/pushed/deployed.

| # | Date | Issue | File | Change | Verification | Rollback |
|---|---|---|---|---|---|---|
| 1 | 2026-06-16 | H1 / SEC-1 (stored HTML injection) | `lib/email.ts:120` | Wrapped form key + value in `esc()` (escapeHtml) before HTML email interpolation | `tsc --noEmit` clean; `esc` already imported & used elsewhere in file | `git checkout lib/email.ts` |
| 2 | 2026-06-16 | H3 / SEC-4 (PII in logs) | `lib/email.ts:124` | Replaced `JSON.stringify(data)` log with field-count only (no PII) | `tsc` clean; behaviour unchanged except log redaction | `git checkout lib/email.ts` |
| 3 | 2026-06-16 | L1 / SEC-6 (timing-safe auth) | `lib/adminAuth.ts` | Replaced `got === expected` with sha256 + `timingSafeEqual` constant-time compare | `tsc` clean; no edge runtime in API routes → `node:crypto` valid; valid-token behaviour unchanged | `git checkout lib/adminAuth.ts` |
| 4 | 2026-06-16 | L3 / SEC-9 (CSV formula injection) | `lib/csv.ts:2` | Prefix cells starting `= + - @ \t \r` with `'` before quoting | `tsc` clean; RFC-4180 quoting preserved | `git checkout lib/csv.ts` |

## Verification summary
- **Typecheck:** `npx tsc --noEmit` → clean (no errors).
- **Runtime safety:** no `runtime = "edge"` in any API route, so `node:crypto` in `adminAuth.ts` is valid.
- **Scope:** all four edits are in isolated `lib/*` files not under concurrent edit; none touch payments, DB schema, legal content, or external installs.
- **Regression risk:** minimal — valid admin tokens still authenticate; donor/form emails render identically (just escaped); CSV opens identically minus the formula-execution risk.

## Not yet done (verification pending)
- Commit / push / production deploy: **blocked** — (a) GitHub push needs credentials not available here; (b) repo is under active concurrent edit; (c) `main` auto-deploys to production (approval-gated). These edits await human commit or a coordinated branch+preview.
- Live before/after screenshots of these specific fixes: N/A (backend/logic changes, not visual). Verified by typecheck + code review.
