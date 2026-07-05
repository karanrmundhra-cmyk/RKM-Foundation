import type { Metadata } from "next";
// Fraunces via next/font: downloaded at BUILD time and self-hosted from our
// origin — no runtime Google Fonts CDN request, consistent with SOP-12 (§14).
import { Fraunces } from "next/font/google";
import HomeV2 from "@/components/home-v2/HomeV2";
import "./home-v2.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["300", "400"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { en: "/", hi: "/hi", "x-default": "/" },
  },
};

export default function Home() {
  return (
    <div className={fraunces.variable}>
      <HomeV2 />
    </div>
  );
}
