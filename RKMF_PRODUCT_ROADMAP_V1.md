# RKMF Product Roadmap V1 — The Digital Ecosystem
_Created 4 July 2026, at the close of the Website project (tag `v1.0.0`). This is the **master reference** for the ecosystem build. Architecture detail lives in `Review/RKMF-ECOSYSTEM-ARCHITECTURE-V1.md`; wireframes in `Review/preview-v2/ecosystem.html`; this document governs sequence, gates, and completion._

---

## 1 · Current State (the foundation everything builds on)

- **Website V1.0 (frozen at `v1.0.0`):** production-grade, bilingual, CI-gated (typecheck, lint, donation E2E incl. WCAG 2.2 AA axe, Lighthouse, gitleaks, audit), design system frozen (`DESIGN_SYSTEM_V1.md`), Master Improvement Register governs any change.
- **Money pipeline (built, partially unproven):** Razorpay order/subscription → signature-verified webhook → Supabase ledger (`donor/donation/payment_event`) → gapless 80G receipt (`allocate_receipt_no` + SHA-256). **Unproven link:** one real donation → webhook → numbered receipt email.
- **Email:** Resend integration + transactional sends; lifecycle skeleton guarded by `[NEEDS DATA]`.
- **Admin:** token-gated stats/donor/receipt/export modules.
- **Operations:** founder + OneDrive + email/WhatsApp; no team.
- **Site changes after v1.0.0:** only for new content, changed business requirements, or analytics evidence — through the register.

## 2 · Product Vision

One quiet system that lets a family-run foundation operate like an institution: donors see proof monthly and serve themselves for everything document-related; the founder spends < 15 minutes a month operating it; failures announce themselves within 24 hours; and nothing anywhere can state a fact the founder didn't supply or the ledger didn't record.

## 3 · Modules

| # | Module | One-liner |
|---|---|---|
| M1 | **Impact Mailer** | Photos + notes in, approved-by-one-tap monthly proof email out, personalised from the ledger |
| M2 | **Tobler's Ledger** (`/updates`) | The same upload as a public, shareable, bilingual rescue timeline + email archive |
| M3 | **Donor Portal** (`/account`) | Magic-link, four screens: donations, receipts, details, archive |
| M4 | **Internal Dashboard** (`/admin` v2) | Today panel + needs-attention scans + daily failure digest + audit log |
| M5 | **Knowledge Vault** (`/admin/vault`) | Versioned private documents, search, publish-to-website |

## 4 · Dependencies

```
P0 (owner, ~1 hr)                     → everything
  Supabase unpaused · RESEND_API_KEY · one real test donation
  · mailer template sign-off
Content spine (update/story tables)   → M1, M2, homepage proof slot, thank-you upgrade
Resend webhooks                        → M4 send-analytics, M1 retry/bounce
Supabase Auth + RLS                    → M3, M4 staff login
Founder Content Pack                   → richer Ledger backfill, lifecycle emails,
                                         final equivalence numbers (not a blocker for M1/M2)
Razorpay Foundation-account access     → double-charge cleanup, subscription self-service (M3 v2)
```

## 5 · Build Order & Milestones

| Phase | Scope | Est. | Gate to start | Milestone = done when |
|---|---|---|---|---|
| **4A** | Content spine + **M1 Impact Mailer** + **M2 Tobler's Ledger** (+ donate-page proof slot) | **3 dev-days** | P0 complete + screen previews approved | First real monthly update sent to real donors from a one-tap approval, live on /updates same moment |
| **4B** | **M3 Donor Portal** | 2–3 dev-days | One month of 4A in real use | A donor self-serves a receipt with zero founder involvement |
| **4C** | **M4 Dashboard v2** | 2 dev-days | 4A live (send analytics need real sends) | A seeded failure (unissued receipt) is auto-flagged in the daily digest within 24h |
| **4D** | **M5 Knowledge Vault** + OneDrive auto-pickup | 2 dev-days | When useful to owner | A certificate renewal published to the site with no developer involvement |

Note 4B/4C order is swappable — 4C first if operational visibility matters more to you than donor self-service; decide at the 4A milestone.

## 6 · Estimated Effort

~9–10 dev-days total, deliberately spread so each phase is **used in production** before the next begins. Founder time: P0 ≈ 1 hr; thereafter ~5 min/month (mailer) + answering the daily digest only when non-empty.

## 7 · Risks

| Risk | Standing mitigation |
|---|---|
| Supabase paused / keys missing (current) | P0 hard gate; nothing builds on assumptions |
| Receipt chain unproven | P0 test donation before first mailer send |
| Razorpay account confusion unresolved | Independent of 4A; tracked in BLOCKED.md; blocks only M3-v2 subscription management |
| Consent/DPDP for update emails | Donor-relationship basis + unsubscribe + suppression honoured everywhere; portal doubles as DSAR self-service |
| Single-approver design | Feature, not bug: system can never send alone; Skip always safe |
| Scope creep | Modules capped at specced screens; new wants → register → preview → approval |
| Anti-fabrication | Content only from founder uploads; numbers only from ledger + published equivalence table (frozen in DESIGN_SYSTEM_V1 §10) |

## 8 · Acceptance Criteria (every phase, non-negotiable)

Screen previews approved before code (standing rule) · all existing CI gates green + new E2E for each new flow (mailer approve/send path mocked; portal auth path; digest scan) · WCAG 2.2 AA on new surfaces · EN + HI shipped together · design system spec compliance (cite `DESIGN_SYSTEM_V1.md` in the PR) · no new paid services or dependencies without register approval · live verification measured, not asserted · audit log entries for every staff/system write.

## 9 · Launch Criteria (ecosystem v1 "done")

1. Three consecutive monthly updates sent via one-tap approval, ≥ 95% delivery, archive pages live.
2. Tobler's Ledger public with ≥ 3 months of real entries, indexed (Search Console verified).
3. Donor portal: real donor has downloaded a receipt; PAN update flow used in production.
4. Dashboard digest has caught (or correctly stayed silent about) failures for 30 days.
5. Zero invented facts anywhere — spot audit of every claim against uploads + ledger.
6. Founder operating time ≤ 15 min/month, self-reported.

## 10 · Future Ideas (after ecosystem v1)

WhatsApp update channel (consent already collected on the donate form) · Razorpay subscription self-service in portal · CSR partner reporting view (vault + ledger → utilisation summaries) · annual-report generator from ledger data · accountant read-only role · volunteer coordination.

## 11 · Deferred / Rejected (do not re-open without owner instruction)

Website visual/UX tweaks (frozen; register-gated) · the seven owner-rejected register items (H-02, G-02, C-01, S-02, M-02, A-01, G-03) · PDF email attachments · donor passwords/social features/gamification · separate CMS/admin SPA/analytics store · Next 16 / TS 6 majors (owner decision, tracked in BLOCKED.md) · G-06 eyebrow contrast (open palette question inside the design freeze).

---

**Process for the build stream:** each phase = preview screens → owner approves → build on a feature branch → CI → deploy → live verification → register + this roadmap updated (milestone ticked). The website repo remains the single codebase; the ecosystem is modules within it, per the architecture.
