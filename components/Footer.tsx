"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOWNLOADS, QUICK_LINKS, SITE } from "@/lib/content";
import SubscribeForm from "./SubscribeForm";
import BackToTop from "./BackToTop";
import { OPEN_PREFS_EVENT } from "./CookieBanner";

const HI_QUICK = [
  { label: "अक्सर पूछे जाने वाले प्रश्न", href: "/hi/faqs" },
  { label: "कानूनी और शासन", href: "/hi/legal" },
  { label: "हमारे साथ साझेदारी करें", href: "/hi/partner-with-us" },
  { label: "करियर", href: "/hi/careers" },
  { label: "मीडिया", href: "/hi/media" },
];

export default function Footer() {
  const pathname = usePathname();
  const hi = pathname.startsWith("/hi");
  const donate = hi ? "/hi/donate-now" : "/donate-now";
  const quickLinks = hi ? HI_QUICK : QUICK_LINKS;

  return (
    <footer className="border-t border-ink/10 bg-snow" style={hi ? { fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' } : undefined}>
      <div className="mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        {/* Editorial closing masthead — a confident statement + the two actions */}
        <div className="grid gap-10 border-b border-ink/10 pb-14 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow-index">RKM Foundation</p>
            <p className="display-2 mt-5 max-w-[15ch] text-balance">
              {hi ? "आशा से जुड़ें।" : "Subscribe to hope."}
            </p>
          </div>
          <div className="lg:col-span-5">
            <SubscribeForm />
          </div>
        </div>

        {/* Footer columns — single row on desktop:
            Identity | Contact | Quick Links | Downloads | Scan to Give */}
        <div className="mt-14 grid gap-y-12 gap-x-10 lg:gap-x-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1.1fr_0.9fr_1.2fr_auto]">
          {/* 1 — Organisation identity & social */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <Image src="/logo-128.png" alt="" width={40} height={40} className="h-10 w-10" />
              <span className="font-semibold">RKM Foundation</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/70">
              {hi ? (
                <>हम भारत में एक परिवार द्वारा संचालित धर्मार्थ ट्रस्ट हैं जो सड़कों पर रहने वाले जानवरों को बचाता, खिलाता, उनका इलाज करता और आश्रय देता है। हर दान <strong className="text-ink">CSR योगदान</strong> और <strong className="text-ink">धारा 80G</strong> के तहत कर-कटौती के योग्य है।</>
              ) : (
                <>We&apos;re a family-run charitable trust in India that rescues, feeds, heals, and shelters
                animals living on the street. Every gift is eligible for{" "}
                <strong className="text-ink">CSR contributions</strong> and tax deduction under{" "}
                <strong className="text-ink">Section 80G</strong>.</>
              )}
            </p>
            <div className="mt-5 flex items-center gap-4">
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="RKM Foundation Instagram" className="inline-flex p-1 -m-1 text-ink/60 hover:text-copper-dark">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="RKM Foundation Facebook" className="inline-flex p-1 -m-1 text-ink/60 hover:text-copper-dark">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M13.5 21v-7h2.6l.4-3h-3V9.1c0-.9.3-1.5 1.6-1.5H16.6V5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9V11H8v3h2.5v7h3Z"/></svg>
              </a>
              <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="RKM Foundation LinkedIn" className="inline-flex p-1 -m-1 text-ink/60 hover:text-copper-dark">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M6.5 8.5v12H3v-12h3.5ZM4.7 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM21 20.5h-3.5v-6.2c0-1.6-.6-2.6-2-2.6-1.1 0-1.7.7-2 1.4-.1.2-.1.6-.1.9v6.5H9.9v-12h3.5v1.5c.5-.8 1.4-1.8 3.3-1.8 2.4 0 4.3 1.6 4.3 5v7.3Z"/></svg>
              </a>
            </div>
          </div>

          {/* 2 — Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider">{hi ? "संपर्क करें" : "Contact Us"}</h4>
            <ul className="mt-4 space-y-3 text-sm text-ink/70">
              <li className="whitespace-nowrap">{hi ? "सोम–शुक्र · सुबह 10 – शाम 6" : "Mon–Fri · 10 AM – 6 PM"}</li>
              <li>
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-copper-dark">
                  <svg className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden><path d="M21 12a9 9 0 0 1-13.4 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12Z"/></svg>
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 hover:text-copper-dark">
                  <svg className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m3 6 9 7 9-7"/></svg>
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={SITE.maps} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2 hover:text-copper-dark">
                  <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>
                  <span>{SITE.address}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* 3 — Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider">{hi ? "त्वरित लिंक" : "Quick Links"}</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-ink/70">
              {quickLinks.map((l) => (
                <li key={l.href}><Link href={l.href} className="hover:text-copper-dark">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* 4 — Downloads (between Quick Links and Scan to Give) */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider">{hi ? "डाउनलोड" : "Downloads"}</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-ink/70">
              {DOWNLOADS.map((d) => (
                <li key={d.file}>
                  <a href={d.file} target="_blank" rel="noopener noreferrer" className="hover:text-copper-dark">{d.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* 5 — Scan to Give */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider">{hi ? "स्कैन करके दें" : "Scan to Give"}</h4>
            <Link href={donate} className="mt-4 block w-fit">
              <Image src="/images/site/qr.png" alt="QR code to donate to RKM Foundation" width={140} height={140} className="h-36 w-36 rounded-xl ring-1 ring-ink/10" />
            </Link>
            <Link href={donate} className="link-secondary mt-3 inline-block text-sm">{hi ? "अभी दान करें" : "Donate Now"}</Link>
          </div>
        </div>

        {/* Copyright row */}
        <div className="mt-12 flex flex-col items-center gap-2 border-t border-ink/10 pt-6 text-center text-xs text-ink/60 sm:flex-row sm:justify-center sm:gap-3">
          <span>{hi ? "कॉपीराइट © 2026 RKM Foundation | सर्वाधिकार सुरक्षित" : "Copyright © 2026 RKM Foundation | All Rights Reserved"}</span>
          <span className="hidden sm:inline" aria-hidden>·</span>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_PREFS_EVENT))}
            className="underline underline-offset-4 hover:text-copper-dark"
          >
            {hi ? "कुकी प्राथमिकताएँ प्रबंधित करें" : "Manage cookies"}
          </button>
        </div>
      </div>
      <BackToTop />
    </footer>
  );
}
