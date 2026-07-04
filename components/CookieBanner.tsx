"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getStoredConsent, setAnalyticsConsent } from "@/lib/analytics";

// Event the footer "Manage cookies" link dispatches to re-open this banner so a
// visitor can change their choice at any time (SOP-01 step 6).
export const OPEN_PREFS_EVENT = "rkmf:open-cookie-prefs";

const COPY = {
  en: {
    label: "Cookie preferences",
    body:
      "We use essential cookies to run the site, and optional analytics cookies to understand how the site is used. Analytics is off until you say yes.",
    detail: "Essential — always on · Analytics — off by default",
    accept: "Accept analytics",
    reject: "Reject",
    learn: "Cookie policy",
  },
  hi: {
    label: "कुकी प्राथमिकताएँ",
    body:
      "साइट चलाने के लिए हम आवश्यक कुकीज़ का उपयोग करते हैं, और साइट के उपयोग को समझने के लिए वैकल्पिक एनालिटिक्स कुकीज़ का। आपकी सहमति तक एनालिटिक्स बंद रहता है।",
    detail: "आवश्यक — हमेशा चालू · एनालिटिक्स — डिफ़ॉल्ट रूप से बंद",
    accept: "एनालिटिक्स स्वीकार करें",
    reject: "अस्वीकार करें",
    learn: "कुकी नीति",
  },
} as const;

export default function CookieBanner() {
  const hi = usePathname().startsWith("/hi");
  const t = hi ? COPY.hi : COPY.en;
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show only when the visitor has made no choice yet.
    if (getStoredConsent() === null) setShow(true);
    const reopen = () => setShow(true);
    window.addEventListener(OPEN_PREFS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_PREFS_EVENT, reopen);
  }, []);

  if (!show) return null;

  const choose = (granted: boolean) => {
    setAnalyticsConsent(granted);
    setShow(false);
  };

  return (
    <div
      className="fixed bottom-24 left-4 z-50 flex max-w-[340px] flex-col gap-3 rounded-2xl bg-ink p-4 text-white shadow-2xl sm:bottom-4"
      role="dialog"
      aria-modal="false"
      aria-label={t.label}
      style={hi ? { fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' } : undefined}
    >
      <p className="text-[0.8125rem] leading-snug">{t.body}</p>
      <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-white/55">{t.detail}</p>
      <div className="flex flex-wrap items-center gap-2">
        {/* Reject and Accept carry equal visual weight (SOP-01 step 3). */}
        <button
          type="button"
          onClick={() => choose(false)}
          className="rounded-full border border-white/35 px-4 py-1.5 text-[0.8125rem] font-semibold hover:bg-white/10"
        >
          {t.reject}
        </button>
        <button
          type="button"
          onClick={() => choose(true)}
          className="rounded-full bg-copper px-4 py-1.5 text-[0.8125rem] font-semibold text-ink hover:bg-copper-light"
        >
          {t.accept}
        </button>
        <Link
          href={hi ? "/hi/legal/website-disclaimer-cookie-policy" : "/legal/website-disclaimer-cookie-policy"}
          className="ml-auto px-1 py-1.5 text-[0.75rem] underline underline-offset-4 hover:text-copper-light"
        >
          {t.learn}
        </Link>
      </div>
    </div>
  );
}
