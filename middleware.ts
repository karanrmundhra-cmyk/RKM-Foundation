import { NextRequest, NextResponse } from "next/server";

// Per-request nonce CSP (SOP-12 7c / RKMF-023, §13).
//
// Removes `script-src 'unsafe-inline'`: every script must now carry the
// per-request nonce, or be a same-origin / explicitly-allowlisted host. This is
// the PCI-DSS v4 / §13 "strict CSP" posture (target A+ on securityheaders.com).
//
// What still works and why:
// - Next.js framework/hydration scripts: Next reads the CSP nonce from the
//   request header below and stamps its own <script> tags with it automatically.
// - Razorpay checkout + Plausible: loaded as dynamically-created <script src>
//   pointing at allowlisted hosts (checkout.razorpay.com / plausible.io), which
//   are matched by the host allowlist, not the nonce — so payments are unaffected.
//   Razorpay's actual checkout UI runs in an allowed iframe (frame-src).
// - Inline JSON-LD (<script type="application/ld+json">): stamped with the nonce
//   via headers().get("x-nonce") in the relevant server components.
// - style-src keeps 'unsafe-inline' (Framer Motion writes inline style attrs;
//   nonce only governs script-src).
//
// Tradeoff: per-request nonces make the HTML documents render dynamically
// (a static HTML file cannot carry a unique per-request nonce). Static assets
// and the next/image optimizer are excluded from the matcher and stay cached.

export function middleware(request: NextRequest): NextResponse {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://checkout.razorpay.com https://*.razorpay.com https://plausible.io`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://*.razorpay.com https://*.supabase.co https://lumberjack.razorpay.com https://plausible.io",
    "frame-src 'self' https://*.razorpay.com https://api.razorpay.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests",
  ].join("; ");

  // Forward the nonce + CSP on the REQUEST so Next can nonce its own scripts.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    // Run on documents only; skip API routes, Next internals, and static assets
    // (which never carry inline scripts and benefit from CDN caching).
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|woff2?|txt|xml)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
