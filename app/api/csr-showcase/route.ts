import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

/**
 * Serves the APPROVED, LOCKED CSR pillar slider (the byte-verbatim sibling file
 * `csr-showcase.html`) so the CSR page can mount it in an <iframe>.
 *
 * Why an /api route instead of a /public static file:
 *   `middleware.ts` applies a strict per-request nonce CSP (no `script-src
 *   'unsafe-inline'`) to all documents — which would block the slider's inline
 *   <script>. The middleware matcher EXCLUDES `/api/*`, so this route can carry
 *   its OWN scoped CSP that permits the inline script, WITHOUT weakening the
 *   site-wide strict CSP and WITHOUT editing the shared middleware. The slider
 *   file itself is never modified.
 *
 * The HTML is read from the sibling file via `import.meta.url` so Next's file
 * tracing bundles it with the serverless function.
 */
export const runtime = "nodejs";

const html = readFileSync(fileURLToPath(new URL("./csr-showcase.html", import.meta.url)), "utf8");

// Scoped CSP for this one trusted, input-free showcase document. `unsafe-inline`
// is required only because the locked file carries inline <style>/<script>;
// `img-src https:` allows the live pillar artwork + the inline SVG fallback.
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
