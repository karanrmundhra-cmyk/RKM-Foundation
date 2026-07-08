import type { ReactNode } from "react";
import { Fraunces } from "next/font/google";
import "../legal/legal-v2.css"; // shared V2 utility-page system (.lv2) — single source, no drift

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["300", "400"],
  variable: "--font-fraunces",
  display: "swap",
});

export default function PartnerLayout({ children }: { children: ReactNode }) {
  return <div className={`lv2 ${fraunces.variable}`}>{children}</div>;
}
