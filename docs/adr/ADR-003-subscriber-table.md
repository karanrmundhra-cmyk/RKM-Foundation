# ADR-003 — Persist newsletter opt-ins in `subscriber`

**Date:** 5 July 2026 · **Status:** Accepted · **Phase:** 4B

## Decision
The newsletter form now also inserts into `public.subscriber` (email pk, lang, source);
the unsubscribe form writes `suppression` and deletes the subscriber row. Update
recipients = paid donors with email + subscribers − suppression.

## Alternatives considered
1. Resend Audiences — rejected: recipient truth would live outside the one database
   (contract: one source of truth), and the send pipeline already personalises from
   the ledger.
2. Donor-only sends — rejected: the subscribe block publicly promises "See who you
   helped this month"; subscribers were promised exactly this content.

## Consequences
DPDP-clean: explicit opt-in, one-click opt-out, single consent-out record. Historical
subscribers (pre-4B) never reached a store and cannot be recovered — the list starts
from 4B deploy; noted for the founder.
