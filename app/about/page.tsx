import type { Metadata } from "next";
// Fraunces via next/font: downloaded at BUILD time and self-hosted from our
// origin — no runtime Google Fonts CDN request, consistent with SOP-12 (§14).
import { Fraunces } from "next/font/google";
import AboutV2 from "@/components/about-v2/AboutV2";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import "./about-v2.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["300", "400"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "About",
  description: "RKM Foundation is an animal-welfare charitable trust in India. A family that started helping animals at home, and kept going.",
  alternates: { canonical: "/about", languages: { en: "/about", hi: "/hi/about", "x-default": "/about" } },
  openGraph: {
    title: "About — RKM Foundation",
    description: "RKM Foundation is an animal-welfare charitable trust in India. A family that started helping animals at home, and kept going.",
    type: "website",
    url: "https://rkmfoundation.com/about",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "RKM Foundation — Animal welfare in India" }],
  },
};

export default function AboutPage() {
  return (
    <div className={fraunces.variable}>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "https://rkmfoundation.com/" }, { name: "About", url: "https://rkmfoundation.com/about" }]} />
      <AboutV2 />
    </div>
  );
}
