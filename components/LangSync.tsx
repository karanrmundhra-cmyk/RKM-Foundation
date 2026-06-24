"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Sets <html lang> to "hi" on the Hindi (/hi) subtree and "en" elsewhere.
// Fixes WCAG 3.1.1 (Language of Page): the single root layout hard-codes lang="en",
// so Hindi content was announced as English by screen readers.
export default function LangSync() {
  const pathname = usePathname();
  useEffect(() => {
    const isHi = pathname === "/hi" || (pathname?.startsWith("/hi/") ?? false);
    document.documentElement.lang = isHi ? "hi" : "en";
  }, [pathname]);
  return null;
}
