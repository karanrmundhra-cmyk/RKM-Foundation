# ADR-004 — `@supabase/supabase-js` for the donor portal

**Date:** 5 July 2026 · **Status:** Accepted · **Phase:** 4D

## Decision
Add `@supabase/supabase-js` (the project's ONE permitted new dependency) for the
donor portal: magic-link auth, session persistence/refresh, and RLS-scoped reads
with the public anon key. Server routes continue to use the raw REST client in
`lib/db.ts`; the SDK is client-side only.

## Alternatives considered
1. Hand-rolled Auth REST + manual token refresh — rejected: reimplements the
   security-critical session lifecycle the official SDK maintains.
2. Server-session portal (cookies + service key) — rejected: bigger surface,
   loses RLS as the enforcement layer.

## Consequences
Anon key ships in the bundle by design (RLS: `anon` has zero policies;
`authenticated` reads only rows matching the verified JWT email). Receipt PDFs
stay private: downloads go through /api/account/receipt (token verification +
ownership re-check + 5-minute signed URL). Owner action required in the Supabase
dashboard before launch: set Site URL/redirect allowlist to the production
domain and configure custom SMTP for magic-link volume.
