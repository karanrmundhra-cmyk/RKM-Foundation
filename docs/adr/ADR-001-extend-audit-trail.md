# ADR-001 — Extend `audit_trail`; no new audit table

**Date:** 5 July 2026 · **Status:** Accepted · **Phase:** 4B

## Decision
Ecosystem tables attach the existing `write_audit()` trigger, writing to the existing
`audit_trail` table. The architecture doc's proposed `audit_log` table is not built.

## Alternatives considered
1. New `audit_log` (per architecture V1 §5) — rejected: duplicate system; two audit
   stores to query, secure, and retain.
2. App-level audit writes — rejected: trigger-level capture can't be forgotten by a
   future code path.

## Consequences
One audit surface for money + content + staff actions. High-volume `email_send` is
deliberately NOT audit-triggered (delivery state is its own evidence); documented in
the table comment. `action_token` consumption is audited via the `update` row status
change it causes.
