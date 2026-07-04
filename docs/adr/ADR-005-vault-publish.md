# ADR-005 — Vault publish = copy to public storage, not repo writes

**Date:** 6 July 2026 · **Status:** Accepted · **Phase:** 4E

## Decision
"Publish to website" copies the vault object to the public bucket at a stable
slugged path (`impact/published/<slug>.<ext>`) and records `published_path` on
the document row (audited). The public URL is surfaced to the owner; site pages
link to it through the normal register flow.

## Alternatives considered
1. Writing into the repo's `/public/downloads/` — impossible at runtime on
   Vercel (immutable deployments) and would bypass CI.
2. A redirect route (`/downloads/[slug]` → storage) — deferred; adds a moving
   part before any renewal has actually happened. Reconsider when the first
   certificate renewal lands.

## Consequences
Cert renewals become: upload new version (supersede) → Publish → same public
URL updates on re-publish (copy overwrites at the stable slug). Existing
on-domain `/downloads/*.pdf` links keep working untouched (version freeze).
