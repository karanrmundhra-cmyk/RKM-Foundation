# RKMF — Operations, Deployment & Disaster Recovery Guide

_Created 5 July 2026 at ecosystem closeout (v1.5.0). This is the run-the-foundation manual: how deploys work, every environment variable, what happens in each failure mode, and how to back up / restore. Audience: the founder + any future engineer._

---

## 1 · Operating model (Operations Mode)

Build Mode is CLOSED. From now on changes are releases:
- Branch → PR → CI (typecheck · lint · build · donation E2E + axe · Lighthouse · gitleaks · audit) → merge to `main` → Vercel auto-deploys production → live verify → tag (`vX.Y.Z`).
- Patch = `v1.5.x` (fixes) · Minor = `v1.6.0` (features, register-approved) · Website design stays frozen (`DESIGN_SYSTEM_V1.md`).
- Improvements come from real usage (daily digest, send analytics, Plausible once created) — not hypothetical features.

## 2 · Deployment guide

- **Source of truth:** GitHub `main` (`karanrmundhra-cmyk/RKM-Foundation`). Vercel GitHub integration deploys every merge to production (rkmfoundation.com). No CLI deploys.
- **Rollback:** Vercel → Deployments → previous good deployment → "Promote to Production" (instant). DB migrations are additive-only with rollback SQL in each migration header — code rollback never breaks the schema.
- **Crons (vercel.json):** `/api/cron/monthly` daily 03:30 UTC (photo nudge on the 25th; auto-preview of last month's draft on the 1st–3rd) · `/api/cron/daily` 04:00 UTC (needs-attention digest; silent when clean). Both require `Authorization: Bearer CRON_SECRET` (Vercel adds it automatically).

## 3 · Environment variables (names only — values live ONLY in Vercel)

| Variable | Purpose | If missing |
|---|---|---|
| `SUPABASE_URL` / `SUPABASE_SERVICE_KEY` | DB + storage (server-side) | donations not persisted; admin/API 503 |
| `RAZORPAY_KEY_SECRET` / `NEXT_PUBLIC_RAZORPAY_KEY_ID` | payments | checkout fails |
| `RAZORPAY_WEBHOOK_SECRET` | webhook signature | webhooks rejected 401 → no receipts |
| `RESEND_API_KEY` | all email | emails silently skipped (logged) |
| `RESEND_WEBHOOK_SECRET` | delivery tracking | tracking endpoint 503 (sends unaffected) |
| `DEFAULT_FUND_ID` | donation → fund link | webhook persistence fails |
| `ADMIN_ACCESS_TOKEN` | admin console/API | admin surfaces dead (401) |
| `CRON_SECRET` | cron auth | crons rejected (401) |
| `OWNER_APPROVAL_EMAIL` | preview/digest recipient | defaults to founder gmail |
| `FORMS_FROM_EMAIL` / `FORMS_TO_EMAIL` / `RECEIPTS_FROM_EMAIL` | senders/recipients | fallback addresses used |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | donor portal (public by design) | hardcoded fallbacks used |
| `NEXT_PUBLIC_PLAUSIBLE_*` | analytics | defaults target rkmfoundation.com |

Supabase dashboard settings (not env vars): Auth Site URL `https://rkmfoundation.com`, redirect allowlist `https://rkmfoundation.com/account`, custom SMTP via Resend (`smtp.resend.com:465`, user `resend`) — configured 5 Jul 2026.

## 4 · Disaster recovery — failure modes & designed behaviour

| Failure | What happens | Recovery |
|---|---|---|
| **Resend down during a monthly send** | Current batch rows marked `failed` with the error; remaining rows stay `queued`; nothing double-sends (DB-unique per update+email) | When Resend is back: `POST /api/updates/send {month}` (admin token) — resumes exactly where it stopped |
| **Resend down when a receipt should email** | Receipt row + gapless number still created (email is a separate step); the donation is safe | Donor self-serves the PDF at `/account`; re-send via admin issue-receipt |
| **Razorpay webhook retries / duplicate events** | `payment_event.provider_event_id` is UNIQUE — duplicates detected and ignored; ledger never double-counts | none needed (by design) |
| **Webhook arrives while Supabase is down** | Route 5xx → Razorpay auto-retries for ~24h → self-heals | if >24h: daily digest flags "paid, no receipt"; admin re-issue |
| **Supabase restarted / briefly down** | DB-reading pages fail request-level and recover next request; donate checkout errors visibly BEFORE charging | none; check status.supabase.com |
| **Donor refreshes / double-pays checkout** | Each attempt = its own Razorpay order; a signature-verified capture records once per order | genuine doubles: refund in Razorpay (evidence in `payment_event`) |
| **Receipt generation fails after capture** | Donation stays `paid` with `receipt_id` NULL → **daily digest flags it after 24h** with the fix action | admin → issue receipt (numbering is transaction-safe) |
| **Founder loses the approve email** | Tokens single-use, 72h expiry | compose screen → "Send me the preview" again |
| **Cron missed a day** | Monthly logic is date-windowed and re-runs daily; digest runs next day | none needed |
| **Vercel down** | Site down (single hosting dependency — accepted) | status.vercel.com; DNS untouched |
| **Secrets leaked** | — | create new key in provider → swap in Vercel env → Redeploy → revoke old (that order) |

## 5 · Backups & restore

- **Code + docs + ADRs:** GitHub is the primary backup (tags v1.0.0–v1.5.0). Offline archive: `Backups/` in the OneDrive project folder (created at closeout, 5 Jul 2026).
- **Database:** Supabase automated daily backups (dashboard → Database → Backups). Structure reference: `docs/DB-SCHEMA-SNAPSHOT.md`. Restore = Supabase restore; re-point `SUPABASE_*` env if the project ref changes.
- **Storage buckets:** `receipts/` (legal PDFs — `receipt.sha256` enables integrity checks) · `impact/` (photos) · `vault/` (documents). Periodically download `receipts/` for belt-and-braces.
- **Must never be lost:** the DB (donor/donation/receipt) and the `receipts/` bucket. Everything else rebuilds from git.

## 6 · Monthly routine (the whole operation)

1. Any day: drop 3–6 photos + one-line notes at `/admin/updates` (or wait for the 25th nudge email).
2. On the 1st the preview email arrives automatically (or press "Send me the preview" anytime).
3. Tap **✓ Yes — send to donors** on your phone. The Ledger publishes the same second.
4. Read the daily digest ONLY when it arrives — it means something needs you. Silence = healthy.
