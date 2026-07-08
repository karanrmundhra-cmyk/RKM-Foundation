import type { ReactNode } from "react";
import { Fraunces } from "next/font/google";
import "./legal-v2.css";

// V2 accent face — build-time self-hosted via next/font (SOP-12 compliant),
// same configuration as the Home/About V2 pages.
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["300", "400"],
  variable: "--font-fraunces",
  display: "swap",
});

export default function LegalLayout({ children }: { children: ReactNode }) {
  return <div className={`lv2 ${fraunces.variable}`}>{children}</div>;
}
