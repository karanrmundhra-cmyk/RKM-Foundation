import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import StickyDonateBar from "@/components/StickyDonateBar";

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
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/logo-128.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "NGO", name: "RKM Foundation",
          url: "https://rkmfoundation.com", logo: "https://rkmfoundation.com/logo-512.png",
          email: "info@rkm.support", telephone: "+91-99207-80005",
          address: { "@type": "PostalAddress", streetAddress: "201, 2nd Floor, Paramos Tower, Vasant Lawns, Majiwada", addressLocality: "Thane West", addressRegion: "Maharashtra", postalCode: "400601", addressCountry: "IN" },
          nonprofitStatus: "https://schema.org/Nonprofit501c3", taxID: "AACTR4271L",
          description: "Registered charitable trust in India focused on animal welfare - rescue, feeding, medical care, and shelter.",
        }) }} />
      </head>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CookieBanner />
        <StickyDonateBar />
      </body>
    </html>
  );
}
