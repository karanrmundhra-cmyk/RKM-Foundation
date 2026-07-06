import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Serves the LOCKED CSR pillar slider (byte-verbatim sibling file) with its own
// scoped CSP. /api/* is excluded from the middleware nonce-CSP, so the slider's
// inline <script> runs without weakening the site-wide CSP. Slider unmodified.
export const runtime = "nodejs";

const html = readFileSync(fileURLToPath(new URL("./csr-showcase.html", import.meta.url)), "utf8");

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' https: data:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

export function GET(): Response {
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Security-Policy": CSP,
      "X-Frame-Options": "SAMEORIGIN",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
