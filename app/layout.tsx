import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
// Self-hosted fonts (SOP-12 / RKMF-021) — no Google Fonts CDN, no donor IP
// leaked to Google (DPDP §13), and render-blocking removed. @fontsource ships
// per-subset files with unicode-range, so the Devanagari woff2 is fetched only
// on pages that render Devanagari glyphs. Family names stay "Inter" /
// "Noto Sans Devanagari" so existing CSS + inline styles keep working.
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/noto-sans-devanagari/400.css";
import "@fontsource/noto-sans-devanagari/500.css";
import "@fontsource/noto-sans-devanagari/600.css";
import "@fontsource/noto-sans-devanagari/700.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import StickyDonateBar from "@/components/StickyDonateBar";
import LangSync from "@/components/LangSync";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://rkmfoundation.com"),
  title: { default: "RKM Foundation — Animal Rescue, Feeding & Shelter in India", template: "%s | RKM Foundation" },
  description:
    "RKM Foundation is a registered charitable trust in India focused on animal welfare — rescuing, feeding, treating, and sheltering animals in need. 80G & CSR registered.",
  openGraph: {
    title: "RKM Foundation",
    description: "They can't ask for help. You can. RKM Foundation rescues, feeds, heals, and shelters animals across India — 12A, 80G & CSR registered.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "RKM Foundation — Animal welfare in India" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = headers().get("x-nonce") ?? undefined;
  const pathname = headers().get("x-pathname") ?? "";
  const lang = pathname === "/hi" || pathname.startsWith("/hi/") ? "hi" : "en";
  return (
    <html lang={lang}>
      <head>
        {/* Fonts are self-hosted via @fontsource (see imports above) — no Google Fonts CDN. */}
        <link rel="icon" href="/logo-128.png" />
        <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": ["NGO", "Organization"], name: "RKM Foundation",
          url: "https://rkmfoundation.com", logo: "https://rkmfoundation.com/logo-512.png",
          email: "info@rkm.support", telephone: "+91-99207-80005",
          address: { "@type": "PostalAddress", streetAddress: "201, 2nd Floor, Paramos Tower, Vasant Lawns, Majiwada", addressLocality: "Thane West", addressRegion: "Maharashtra", postalCode: "400601", addressCountry: "IN" },
          // Indian registered charitable trust — NOT a US 501(c)(3). Real statutory identifiers only.
          taxID: "AACTR4271L",
          identifier: [
            { "@type": "PropertyValue", name: "Trust Registration", value: "E-30560" },
            { "@type": "PropertyValue", name: "12A", value: "47522" },
            { "@type": "PropertyValue", name: "80G", value: "CITE80G9792014-152016-17" },
            { "@type": "PropertyValue", name: "CSR-1", value: "CSR00089305" },
            { "@type": "PropertyValue", name: "NITI Aayog DARPAN", value: "MH/2024/0457296" },
          ],
          potentialAction: {
            "@type": "DonateAction",
            target: "https://rkmfoundation.com/donate-now",
            recipient: { "@type": "NGO", name: "RKM Foundation" },
          },
          description: "Registered charitable trust in India focused on animal welfare - rescue, feeding, medical care, and shelter.",
        }) }} />
      </head>
      <body>
        <LangSync />
        <Analytics />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CookieBanner />
        <StickyDonateBar />
      </body>
    </html>
  );
}
