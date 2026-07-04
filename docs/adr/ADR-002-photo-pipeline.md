# ADR-002 — Browser-side downscale; no server image pipeline

**Date:** 5 July 2026 · **Status:** Accepted · **Phase:** 4B

## Decision
The compose screen downscales JPEG/PNG/WebP to ≤1600px JPEG (q0.82) in the browser
before upload; the server stores that single rendition in the public `impact/` bucket
at an immutable path. Emails and web pages reference the same object.

## Alternatives considered
1. `sharp` on the server — rejected: new native dependency (contract: at most one,
   only if required) and serverless body limits still apply to the original upload.
2. Supabase image transformations — rejected: plan-dependent paid feature.
3. Two renditions (web+email) — deferred: single ≤1600px JPEG is ~150–400KB, fine for
   both; revisit if email-size telemetry says otherwise.

## Consequences
Uploads stay under the ~4.5MB serverless body limit; HEIC files that the browser
cannot decode upload as-is (6MB API cap) — acceptable for v1, listed as a follow-up.
