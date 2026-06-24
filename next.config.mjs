/** @type {import('next').NextConfig} */
// Content-Security-Policy is now set PER-REQUEST in middleware.ts with a nonce
// (SOP-12 7c / RKMF-023) so we can drop script-src 'unsafe-inline'. The static
// security headers below still apply to every route (including assets); only CSP
// moved to the middleware because it needs the per-request nonce.
const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()" },
  // HSTS with preload (§13). 2-year max-age; eligible for the browser preload list.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Cross-origin isolation. "allow-popups" keeps any processor popup/redirect
  // flows working while still isolating the browsing context.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
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
