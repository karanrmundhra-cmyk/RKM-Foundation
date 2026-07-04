"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { DRAWER_LINKS, SITE } from "@/lib/content";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const FONT_HI = { fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' };
const HI_DRAWER = [
  { n: "01", label: "होम", href: "/hi" },
  { n: "02", label: "हमारे बारे में", href: "/hi/about" },
  { n: "03", label: "दान करें", href: "/hi/donate-now" },
  { n: "04", label: "फंडरेज़र शुरू करें", href: "/hi/fundraiser" },
  { n: "05", label: "एक उद्देश्य के लिए शॉप", href: "/hi/shop" },
  { n: "06", label: "CSR और कॉर्पोरेट साझेदारी", href: "/hi/csr" },
  { n: "07", label: "मीडिया", href: "/hi/media" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const onDark = (pathname === "/" || pathname === "/hi") && !scrolled; // dark hero surface
  const isHi = pathname.startsWith("/hi");
  // Pages that have a Hindi (/hi/...) version. Extend as more pages are translated.
  const HI_PAGES = new Set(["/", "/about", "/csr", "/contact", "/donate-now", "/careers", "/other-ways-to-give", "/partner-with-us", "/fundraiser", "/fundraiser/create", "/faqs", "/media", "/blog", "/blog/the-dog-who-started-it-all", "/shop", "/legal", "/legal/terms-and-conditions", "/legal/privacy-policy", "/legal/website-disclaimer-cookie-policy", "/legal/donation-refund-policy", "/legal/shop-refund-policy", "/legal/80g-tax-disclaimer", "/newsletter-confirmed", "/unsubscribe", "/fundraiser/ready", "/fundraiser/success", "/fundraiser/thank-you", "/shop/thank-you", "/shop/order-failed"]);
  const basePath = isHi ? pathname.replace(/^\/hi/, "") || "/" : pathname;
  const enHref = basePath;
  const hiHref = HI_PAGES.has(basePath) ? (basePath === "/" ? "/hi" : `/hi${basePath}`) : "/hi";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  // focus trap + ESC + body lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) { triggerRef.current?.focus(); return; }
    const drawer = drawerRef.current;
    if (!drawer) return;
    const focusables = () => Array.from(drawer.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key !== "Tab") return;
      const els = focusables();
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  const tone = onDark ? "text-white" : "text-ink";
  const ring = onDark ? "ring-white/30 hover:ring-white" : "ring-ink/10 hover:ring-copper";

  const listVariants: Variants = {
    hidden: {},
    show: { transition: reduce ? {} : { delayChildren: 0.05, staggerChildren: 0.04 } },
  };
  const itemVariants: Variants = reduce
    ? { hidden: { opacity: 1, x: 0 }, show: { opacity: 1, x: 0 } }
    : { hidden: { opacity: 0, x: 16 }, show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE } } };

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:text-white">
        {isHi ? "मुख्य सामग्री पर जाएँ" : "Skip to content"}
      </a>
      <header style={isHi ? FONT_HI : undefined} className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]" : "bg-transparent"}`}>
        <div className="container-c flex h-16 items-center justify-between sm:h-[72px]">
          <Link href={isHi ? "/hi" : "/"} className={`flex items-center gap-2.5 ${tone}`} aria-label={isHi ? "RKM Foundation — होम" : "RKM Foundation — Home"}>
            <Image src="/logo-128.png" alt="" width={36} height={36} className={`h-9 w-9 ${onDark ? "rounded-full bg-white/90 p-0.5" : ""}`} />
            <span className="text-[0.9375rem] font-semibold tracking-tight sm:text-base">RKM Foundation</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-5">
            <div className={`hidden overflow-hidden rounded-full text-[0.8125rem] font-semibold ring-1 sm:inline-flex ${onDark ? "ring-white/30" : "ring-ink/15"}`} aria-label={isHi ? "भाषा" : "Language"}>
              <Link href={enHref} aria-label="English" className={`px-2.5 py-1.5 transition-colors ${!isHi ? "bg-copper-dark text-white" : tone}`}>EN</Link>
              <Link href={hiHref} aria-label="हिंदी" className={`px-2.5 py-1.5 transition-colors ${isHi ? "bg-copper-dark text-white" : tone}`}>हिंदी</Link>
            </div>
            <Link href={isHi ? "/hi/about" : "/about"} className={`hidden text-[0.9375rem] font-medium transition-colors sm:block ${tone} ${onDark ? "hover:text-copper-light" : "hover:text-copper-dark"} ${basePath === "/about" ? "text-copper-dark underline decoration-copper decoration-2 underline-offset-8" : ""}`}>
              {isHi ? "हमारे बारे में" : "About"}
            </Link>
            <Link href={isHi ? "/hi/donate-now" : "/donate-now"} className="btn-copper !px-5 !py-2.5 !text-[0.9375rem]">{isHi ? "अभी दान करें" : "Donate Now"}</Link>
            <button ref={triggerRef} onClick={() => setOpen(true)} aria-label={isHi ? "मेन्यू खोलें" : "Open menu"} aria-expanded={open} aria-controls="nav-drawer"
              className={`flex h-10 items-center gap-1.5 rounded-full px-3.5 ring-1 transition-colors ${tone} ${ring}`}>
              <span className="hidden text-[0.8125rem] font-semibold uppercase tracking-wider sm:block">{isHi ? "मेन्यू" : "Menu"}</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[60]">
            <motion.div
              className="absolute inset-0 bg-ink/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.25, ease: "easeOut" }}
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              ref={drawerRef} id="nav-drawer" role="dialog" aria-modal="true" aria-label={isHi ? "साइट नेविगेशन" : "Site navigation"}
              className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col bg-snow"
              style={isHi ? FONT_HI : undefined}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 32 }}
            >
              <div className="flex h-16 items-center justify-between px-6 sm:h-[72px] sm:px-10">
                <span className="eyebrow">{isHi ? "मेन्यू" : "Menu"}</span>
                <button onClick={() => setOpen(false)} aria-label={isHi ? "मेन्यू बंद करें" : "Close menu"}
                  className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-ink/10 hover:ring-copper">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-6 py-6 sm:px-10">
                <motion.ul className="space-y-1" variants={listVariants} initial="hidden" animate="show">
                  {(isHi ? HI_DRAWER : DRAWER_LINKS).map((l) => (
                    <motion.li key={l.href} variants={itemVariants}>
                      <Link href={l.href}
                        className={`group flex items-baseline gap-4 rounded-xl px-3 py-3 text-2xl font-semibold tracking-tight transition-colors hover:text-copper-dark sm:text-3xl ${pathname === l.href ? "text-copper-dark" : ""}`}
                        aria-current={pathname === l.href ? "page" : undefined}>
                        <span className="text-xs font-medium text-ink/60 group-hover:text-copper">{l.n}</span>
                        <span className="menu-link">{l.label}</span>
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
                <div className="mt-10 hidden justify-center sm:flex">
                  <Image src="/logo-512.png" alt="" width={112} height={112} className="h-28 w-28 opacity-90" />
                </div>
              </nav>
              <div className="flex items-center justify-between border-t border-ink/10 px-6 py-5 sm:px-10">
                <div className="flex items-center gap-4">
                  <a href={`mailto:${SITE.email}`} aria-label={isHi ? "RKM Foundation को ईमेल करें" : "Email RKM Foundation"} className="text-ink/70 hover:text-copper-dark">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m3 6 9 7 9-7"/></svg>
                  </a>
                  <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp RKM Foundation" className="text-ink/70 hover:text-copper-dark">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden><path d="M21 12a9 9 0 0 1-13.4 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12Z"/><path d="M8.5 9.5c.5 2.5 3 5 5.5 5.5l1.5-1.5 2 1c-.5 1.5-2 2-3.5 1.5-3-1-6-4-7-7C6.5 7.5 7 6 8.5 5.5l1 2-1 2Z" fill="currentColor" stroke="none"/></svg>
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="RKM Foundation Facebook" className="text-ink/70 hover:text-copper-dark">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M13.5 21v-7h2.6l.4-3h-3V9.1c0-.9.3-1.5 1.6-1.5H16.6V5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9V11H8v3h2.5v7h3Z"/></svg>
                  </a>
                  <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="RKM Foundation Instagram" className="text-ink/70 hover:text-copper-dark">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>
                  </a>
                  <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="RKM Foundation LinkedIn" className="text-ink/70 hover:text-copper-dark">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M6.5 8.5v12H3v-12h3.5ZM4.7 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM21 20.5h-3.5v-6.2c0-1.6-.6-2.6-2-2.6-1.1 0-1.7.7-2 1.4-.1.2-.1.6-.1.9v6.5H9.9v-12h3.5v1.5c.5-.8 1.4-1.8 3.3-1.8 2.4 0 4.3 1.6 4.3 5v7.3Z"/></svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
