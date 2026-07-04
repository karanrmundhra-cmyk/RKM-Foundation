"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Reveal from "./Reveal";

// V3 (approved 4 Jul 2026): one contextual primary action per page plus a single
// text alternative, replacing the identical three-button banner that previously
// ended every page. Copy is unchanged; only the ask adapts to the page's job.
export default function CTABanner({
  title,
  lead,
}: { title?: string; lead?: string }) {
  const pathname = usePathname();
  const hi = pathname.startsWith("/hi");
  const base = hi ? "/hi" : "";
  const path = hi ? pathname.slice(3) || "/" : pathname;
  const t = title ?? (hi ? "कहीं दूर, एक जानवर इंतज़ार कर रहा है।" : "Somewhere out there, an animal is waiting.");
  const l = lead ?? (hi
    ? "वह आपका नाम नहीं जानता। उसे बस किसी के साथ खड़े होने की ज़रूरत है। आज, वह आप हो सकते हैं।"
    : "It doesn't know your name. It just needs someone to show up. Today, that can be you.");

  // Contextual ask: the page's job decides the one primary action.
  let primary = { href: `${base}/donate-now#donation`, label: hi ? "अभी दान करें" : "Donate Now" };
  let alt = { href: `${base}/fundraiser`, label: hi ? "या फंडरेज़र शुरू करें →" : "Or start a fundraiser →" };
  if (path.startsWith("/fundraiser")) {
    primary = { href: `${base}/fundraiser/create`, label: hi ? "अपना फंडरेज़र शुरू करें" : "Start Your Fundraiser" };
    alt = { href: `${base}/donate-now#donation`, label: hi ? "या अभी दान करें →" : "Or donate now →" };
  } else if (path.startsWith("/csr")) {
    primary = { href: "#consultation", label: hi ? "परामर्श का अनुरोध करें" : "Request a Consultation" };
    alt = { href: `${base}/donate-now#donation`, label: hi ? "या अभी दान करें →" : "Or donate now →" };
  }

  return (
    <section className="bg-ink section-y text-white" style={hi ? { fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' } : undefined}>
      <div className="container-c max-w-4xl text-center">
        <Reveal>
          <h2 className="display-2 mx-auto max-w-[20ch] text-balance">{t}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">{l}</p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Link href={primary.href} className="btn-copper">{primary.label}</Link>
            <Link href={alt.href} className="text-sm font-semibold text-white/75 underline decoration-copper decoration-2 underline-offset-4 transition-colors hover:text-white">{alt.label}</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
