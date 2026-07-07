# RKM Foundation — Continuous Oversight Register

> **Mode: Continuous Oversight** (entered 2026-07-07). Autonomous implementation has reached the contract's hard-stop boundary. Per the Master Execution Contract, the engagement does not end — it shifts to watching every owner-blocked item and resuming autonomous Audit → Implement → Verify → Re-audit the instant any blocker clears. No busywork; no repeated work.
>
> Companion docs kept current alongside this one: `CONTRACT-COMPLIANCE-MATRIX.md` · `AUDIT-MASTER-BACKLOG.md` · `CHANGELOG-AUDIT.md` · `RKMF_PRODUCT_ROADMAP_V1.md` · `BLOCKED.md`.

## Trigger → cycle map
Every one of these is a signal to start a fresh cycle immediately:

| Trigger | Fresh cycle I run |
|---|---|
| **New Vercel preview URL** | Lighthouse + axe (Claude-in-Chrome) on the changed pages → convert matrix `NEEDS INPUT` rows to `VERIFIED`; visual/responsive check of my un-deployed changes |
| **Branch merged / new production deploy** | Re-fetch prod, confirm manifest/Product/OG/robots/hero live, re-run the SEO/structured-data verification, regression sweep |
| **Content Pack supplied** (impact numbers, stories, cost math, financials, board) | Fill `[NEEDS DATA]` in `lib/impact.ts`/Ledger/equivalence table, add `aggregateRating` if real reviews arrive, trust-layer refresh |
| **Analytics baseline live** (Plausible env + 28-day data) | Funnel analysis → CRO recommendations → A/B the monthly-default & amount ladder |
| **Credential/config unblocked** (RESEND, webhook, secrets, Supabase Auth) | Verify the money-chain end-to-end, lift the ≤59 cap, re-score |
| **Owner greenlights `/hi` V2** | Port `/hi` to the V2 design system to close the bilingual split |
| **Owner says "do the deferred SEO"** | Per-page OG (about/csr/faqs/fundraiser) + BreadcrumbList on legal pages |

## Blocker watch list

| # | Blocker | Unblock = owner action | The moment it clears, I will… | Lifts cap? |
|---|---|---|---|---|
| 1 | **Money-chain unproven** (P0) | One live ₹ test donation → capture→webhook→80G receipt | Verify each hop, resolve/observe C1 behaviour, re-score | **YES** |
| 2 | C1 silent-loss fallback | Approve idempotent `/verify` persist + receipt fallback | Implement + E2E test the fallback | **YES** |
| 3 | C2 unauth PII write | Approve signed-token binding on `/compliance` | Implement token gate + origin check | **YES** |
| 4 | Preview URL | Push already done → open PR / share preview | Real Lighthouse+axe pass; verify rendered changes | no (unblocks evidence) |
| 5 | `RESEND_API_KEY` + `DEFAULT_FUND_ID` | Set in Vercel prod | Confirm receipt/email sends fire | gates sends |
| 6 | Razorpay webhook enabled + secret | Enable in Razorpay dashboard | Verify webhook delivery | gates receipts |
| 7 | Secret rotation (RKMF-030) | Rotate exposed keys, update Vercel | Confirm no stale secrets | security |
| 8 | Supabase Auth (Site URL + SMTP) | Configure in Supabase | Verify magic-link portal sign-in | gates portal |
| 9 | Analytics baseline | Plausible account + env + 28 days | CRO cycle + A/B plan | gates CRO |
| 10 | Content Pack | Supply real numbers/stories/financials | Fill placeholders, impact layer, equivalence table | gates trust/proof |
| 11 | Branch merge to `main` | Owner approval | Production regression re-verify | — |
| 12 | `/hi` V2 parity | Owner schedule/approval | Implement V2 port | — |

## Ready-on-request (autonomous, in-authority — awaiting only a "go", not a hard-stop)
- Per-page `openGraph` for `/about` (frozen — owner), `/csr`, `/faqs`, `/fundraiser` (deferred: low-share pages).
- `BreadcrumbList` on the 6 legal pages + `/about`.
- H6 — migrate the 5 remote Ledger `<img>` to `next/image` (needs `next.config` `remotePatterns` + preview).
- Mac-side: `rm components/prototype-v2/WhatWeDo.tsx.bak-*` (cloud-lock blocked sandbox rm).

## Final Completion Test — current status (all must be YES to close)
| Question | Answer | Why |
|---|---|---|
| Proud to present to Apple? | **No** | shop unfinished; `/hi` V1↔V2 split |
| Confident before a Fortune-500 CSR board? | **No** | impact numbers are placeholders |
| Would I donate through this myself? | **No** | money-chain unproven (C1/C2) |
| Nothing I'd still improve in a week? | **No** | `/hi` parity, per-page OG, analytics |
| Every score evidence-backed, every Critical resolved, red team clean? | **No** | C1/C2 open; cap at ≤59 |

**Not complete. Remaining in Continuous Oversight until every answer flips to YES.**
