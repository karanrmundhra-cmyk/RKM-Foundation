/** @type {import('next').NextConfig} */
// Content-Security-Policy. Allows the third parties the site actually uses:
// Razorpay checkout, Google Fonts, and Supabase.
//
// 'unsafe-eval' removed (24 Jun 2026): production Next.js, GSAP, Framer Motion
// and Lenis do not require eval at runtime (only Next dev/HMR does). VERIFY on a
// Vercel preview deploy before merging — see RKMF-P1-BATCH1-IMPLEMENTATION.md.
//
// 'unsafe-inline' on script-src is still required by the inline JSON-LD + Next's
// hydration bootstrap. Removing it needs per-request nonces via middleware.ts
// (Batch 2 — requires a deploy smoke test against the Razorpay checkout flow).
// 'unsafe-inline' on style-src is retained: Framer Motion writes inline style
// attributes; a strict style-src is impractical with that animation layer.
const csp = [
  "default-src 'self'",
  // plausible.io = cookieless analytics provider (SOP-02). If you self-host or
  // proxy Plausible, replace https://plausible.io here and in NEXT_PUBLIC_PLAUSIBLE_SRC.
  "script-src 'self' 'unsafe-inline' https://checkout.razorpay.com https://*.razorpay.com https://plausible.io",
  // Fonts self-hosted via @fontsource (SOP-12) — Google Fonts domains removed.
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

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  images: { unoptimized: false },
  async redirects() {
    return [
      { source: '/:path*', has: [{ type: 'host', value: 'www.rkmfoundation.com' }], destination: 'https://rkmfoundation.com/:path*', permanent: true },
      { source: '/shop-for-a-cause', destination: '/shop', permanent: true },
      { source: '/shop-coming-soon', destination: '/shop', permanent: true },
      { source: '/donate', destination: '/donate-now', permanent: true },
      { source: '/blogs', destination: '/blog', permanent: true },
    ];
  },
};
export default nextConfig;
