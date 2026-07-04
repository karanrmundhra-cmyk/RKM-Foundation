// lib/action-token.ts — single-use signed tokens behind the Send/Skip email
// buttons. The raw token travels only in the email link; the DB stores its
// SHA-256. Consumption is atomic (conditional PATCH on consumed_at is null),
// so a token can never authorise two actions even under concurrent requests.
import { createHash, randomBytes } from "node:crypto";
import { dbFetch } from "./db";

export type TokenPurpose = "approve_update" | "skip_update";

const TTL_HOURS = 72;

function hash(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

/** Create a token for an update action; returns the raw token for the email link. */
export async function createActionToken(purpose: TokenPurpose, subjectId: string): Promise<string> {
  const raw = randomBytes(32).toString("base64url");
  await dbFetch("action_token", {
    method: "POST",
    body: JSON.stringify({
      token_hash: hash(raw),
      purpose,
      subject_id: subjectId,
      expires_at: new Date(Date.now() + TTL_HOURS * 3600_000).toISOString(),
    }),
  });
  return raw;
}

/**
 * Atomically consume a token. Returns its purpose + subject on first valid
 * use; null for unknown, expired, or already-consumed tokens (indistinguishable
 * to the caller — no oracle).
 */
export async function consumeActionToken(raw: string): Promise<{ purpose: TokenPurpose; subjectId: string } | null> {
  if (!raw || raw.length < 20 || raw.length > 128) return null;
  const h = hash(raw);
  const now = new Date().toISOString();
  const rows = await dbFetch(
    `action_token?token_hash=eq.${h}&consumed_at=is.null&expires_at=gt.${encodeURIComponent(now)}`,
    { method: "PATCH", body: JSON.stringify({ consumed_at: now }) },
  );
  const row = rows?.[0];
  if (!row) return null;
  return { purpose: row.purpose as TokenPurpose, subjectId: row.subject_id as string };
}
