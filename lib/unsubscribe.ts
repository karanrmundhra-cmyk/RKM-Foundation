// lib/unsubscribe.ts — signed one-click unsubscribe (Gmail/Yahoo bulk-sender
// requirement: RFC 8058 List-Unsubscribe-Post). The HMAC key derives from the
// server-only service key; rotation invalidates old links, which safely fall
// back to the manual /unsubscribe form.
import { createHmac, timingSafeEqual } from "node:crypto";

const SITE = "https://rkmfoundation.com";

function key(): string | null {
  return process.env.SUPABASE_SERVICE_KEY || null;
}

export function signUnsubscribe(email: string): string | null {
  const k = key();
  if (!k) return null;
  return createHmac("sha256", `unsub:${k}`).update(email.toLowerCase()).digest("hex").slice(0, 32);
}

export function verifyUnsubscribe(email: string, sig: string): boolean {
  const expected = signUnsubscribe(email);
  if (!expected || !sig || sig.length !== expected.length) return false;
  try { return timingSafeEqual(Buffer.from(expected, "utf8"), Buffer.from(sig, "utf8")); } catch { return false; }
}

export function unsubscribeUrl(email: string): string {
  const s = signUnsubscribe(email);
  return s
    ? `${SITE}/api/unsubscribe?u=${encodeURIComponent(email.toLowerCase())}&s=${s}`
    : `${SITE}/unsubscribe`;
}
