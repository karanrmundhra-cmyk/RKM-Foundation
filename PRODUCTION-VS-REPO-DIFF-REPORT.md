# Production ↔ Repository Diff Report

**Date:** 2026-06-16 · **Project:** rkm-foundation (Vercel) · **Repo:** github.com/karanrmundhra-cmyk/RKMF · **Branch:** main

## Conclusion: RECONCILED — no divergence
Local working copy, the GitHub remote, and the live production deployment are **all on the same commit**:

| Reference | Commit | State |
|---|---|---|
| Local `HEAD` | `632def9` | clean working tree |
| `origin/main` | `632def9` | `git rev-list origin/main...HEAD` = `0  0` (no ahead/behind) |
| **Vercel production (live)** | `632def9` | deployment `dpl_5i5gN5kt…` — `state: READY`, `target: production` |

Commit `632def9` = *"Hindi: localize CookieBanner, CTABanner, FormShell + chrome aria-labels; add fundraiser & shop flow pages"* (2026-06-16 14:15 IST).

### What the earlier "production is ahead" signal actually was
This folder is **OneDrive-synced**. During the audit, OneDrive was still pulling down two commits that had *already been deployed* to production (`b84ac20` → `632def9`). For a brief window the local files lagged the live site, which read as "production ahead." OneDrive has since caught the folder up (Hindi legal/shop/fundraiser pages now present locally, timestamps 08:24–08:42), and git confirms local = remote = production. The transient divergence is closed.

## Difference classification
| Category | Items | Action |
|---|---|---|
| **Production newer than repo** | None | — |
| **Repository newer than production** (committed, not deployed) | None | — |
| **Repository only** (uncommitted local) | None (the 6 modified components + 5 new Hindi route folders observed mid-audit were committed as `632def9` and deployed) | — |
| **Production only** (live, not in repo) | None (production builds from `632def9`) | — |

**Source of truth to retain:** the reconciled `632def9` (local = origin = production). No file-level reconciliation needed.

## Deployment pipeline (important for the implementation phase)
- **CI/CD:** every push to GitHub `main` auto-deploys to **production** on Vercel (confirmed: each recent deploy maps 1:1 to a `main` commit, `githubDeployment: 1`).
- **Implication:** committing/pushing to `main` = an **immediate unapproved production deploy**. To honor "no production deployment without approval," implementation must happen on a **separate branch** (preview deploy only), merged to `main` **only** on explicit approval.
- An **active development session is concurrently committing** to this repo (commits at 14:15 IST today via the OneDrive-synced working copy). Editing the same files risks collision; coordinate before starting.

## Recent production deploy history (newest first)
| Commit | Message | Deploy |
|---|---|---|
| `632def9` | Hindi: localize CookieBanner/CTABanner/FormShell + chrome aria; fundraiser & shop flow pages | **LIVE** |
| `b84ac20` | Hindi: shop, all legal pages, donor-journey + utility pages | READY (rollback candidate) |
| `1c82786` | Translate team bios on /hi/about into Hindi | READY |
| `9231d27` | Hindi site + EN/Hindi toggle, warm reskin, email fixes | READY |
| `83c7f05` | Launch readiness: team/CSR UI, image upgrades, HSTS, admin rate-limiting | READY |

## Affected-audit re-run note
Findings validated **live** at the reconciled HEAD and still valid: **H7** (render-blocking Google Fonts), **H9** (`lang="en"` on Hindi pages). Findings **retracted** as stale-local artifacts now in sync: **M11** (Hindi link 404 → 200 live), **M12** (Hindi legal pages exist live), **H10/`/hi`** (serves Hindi metadata live). Security/API and performance/code findings are unaffected by the recent Hindi-localization commits and remain valid. One re-check carried into implementation: confirm the EN home `/` has a unique `<title>` (local `app/page.tsx` still has no `metadata` export).
