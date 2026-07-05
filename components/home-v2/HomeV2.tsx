"use client";
// HOME v2 — approved design language (benchmark: concepts/home-redesign.html).
// Scoped under .hv2. Header / Footer / StickyDonateBar / CookieBanner come from
// the root layout and are UNTOUCHED. The give widget preserves the exact
// ImpactSlider behaviour (range, steps, impact copy, a11y, /donate-now link).
// Motion: GSAP + ScrollTrigger + Lenis, page-scoped, destroyed on unmount,
// fully disabled under prefers-reduced-motion.
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/* ---- give widget constants: identical to components/ImpactSlider.tsx ---- */
const MIN = 1000;
const MAX = 25000;
const STEP = 500;
const DEFAULT = 5000;

function impactFor(amount: number): string {
  if (amount < 2500) return "Warm meals for a rescued animal this week.";
  if (amount < 5000) return "Two weeks of meals for a rescued animal getting back on its feet.";
  if (amount < 10000) return "A full month of food and care for 2–3 animals in our shelter.";
  if (amount < 25000) return "Emergency medical treatment — the surgery or care that saves a life.";
  return "A month of food, care, and treatment for animals across the shelter.";
}

const PILLARS = [
  { idx: "01 · On the street", title: "Rescue", desc: "Wherever an animal is hurt — the street, the gutter, anywhere.", img: "/images/site/street.jpg", alt: "Rescue — reaching an injured animal on the street" },
  { idx: "02 · Every single day", title: "Feed", desc: "Warm meals every day, for every animal in our care.", img: "/images/site/feed.jpg", alt: "Feed — warm meals for animals in our care" },
  { idx: "03 · With trusted vets", title: "Heal", desc: "Wounds dressed, surgeries funded — full vet care until they're whole.", img: "/images/site/heal.jpg", alt: "Heal — veterinary treatment for rescued animals" },
  { idx: "04 · A place to rest", title: "Shelter", desc: "A safe, quiet place to rest and recover.", img: "/images/site/shelter-cat.jpg", alt: "Shelter — a safe place to rest and recover" },
];

const CHIPS = [2500, 5000, 10000];

export default function HomeV2() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [amount, setAmount] = useState(DEFAULT);
  const pct = ((amount - MIN) / (MAX - MIN)) * 100;
  const formatted = amount.toLocaleString("en-IN");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(ScrollTrigger);

    let lenis: Lenis | null = null;
    let tick: ((t: number) => void) | null = null;
    if (!rm) {
      lenis = new Lenis({ lerp: 0.1 });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t: number) => lenis!.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      if (rm) return; // reduced motion: everything stays visible & static

      // hero entrance
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from(".hero-media img", { scale: 1.08, duration: 2.4, ease: "power2.out" }, 0)
        .from(".hero .mask > span", { yPercent: 112, duration: 1.2, stagger: 0.1 }, 0.2)
        .from(".hero .rv", { opacity: 0, y: 20, duration: 1 }, 0.7);
      // hero gentle parallax
      gsap.to(".hero-media img", { yPercent: 10, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

      // masked headings on scroll
      gsap.utils.toArray<HTMLElement>(".sec .mask > span, .tobler .mask > span, .give .mask > span, .trust .mask > span, .final .mask > span").forEach((el) => {
        gsap.from(el, { yPercent: 112, duration: 1.1, ease: "power4.out",
          scrollTrigger: { trigger: el.closest("section"), start: "top 72%" } });
      });
      // soft rises (hero .rv handled by the entrance timeline)
      gsap.utils.toArray<HTMLElement>("section:not(.hero) .rv").forEach((el) => {
        gsap.from(el, { opacity: 0, y: 20, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      // pillar stagger
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.from(group.children, { y: 36, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 80%" } });
      });
      // tobler slow parallax
      gsap.utils.toArray<HTMLElement>("[data-parallax] img").forEach((img) => {
        gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: "none",
          scrollTrigger: { trigger: img.closest("[data-parallax]"), start: "top bottom", end: "bottom top", scrub: true } });
      });
    }, root);

    return () => {
      ctx.revert();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);

  return (
    <div className="hv2" ref={rootRef}>
      {/* ============ HERO ============ */}
      <section className="hero dark">
        <div className="hero-media">
          <Image src="/images/site/dog.jpg" alt="A street dog looking into the camera" fill priority quality={60} sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="hero-content">
          <p className="eyebrow"><span className="mask"><span>Rescue · Feed · Heal · Shelter</span></span></p>
          <h1>
            <span className="mask"><span>Every street has a life</span></span>
            <span className="mask"><span><em className="accent">worth saving.</em></span></span>
          </h1>
          <p className="lede mask"><span>We rescue, feed, heal, and shelter animals living on India&apos;s streets.</span></p>
          <div className="hero-cta rv">
            <Link className="btn-gold" href="/donate-now">Donate now</Link>
            <Link className="ghost" href="/fundraiser">Start a fundraiser <span>→</span></Link>
          </div>
        </div>
        <div className="hero-meta">Est. 2014<br />Thane · India<br />12A · 80G · CSR</div>
      </section>

      {/* ============ PILLARS ============ */}
      <section className="sec">
        <div className="sec-inner">
          <p className="eyebrow">What we do</p>
          <h2 className="mask"><span>Four ways we show up <em className="accent">for animals.</em></span></h2>
          <div className="pillar-grid" data-stagger>
            {PILLARS.map((p) => (
              <Link className="pillar" href="/about" key={p.title}>
                <span className="ph">
                  <Image src={p.img} alt={p.alt} fill sizes="(max-width:680px) 90vw, (max-width:1020px) 45vw, 320px" style={{ objectFit: "cover" }} />
                </span>
                <span className="idx">{p.idx}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TOBLER ============ */}
      <section className="tobler dark">
        <div className="tobler-inner">
          <div className="ph rv" data-parallax>
            <Image src="/images/site/care.jpg" alt="Tobler, the dog who started it all" fill sizes="(max-width:1020px) 90vw, 460px" style={{ objectFit: "cover" }} />
          </div>
          <div>
            <p className="eyebrow">How it started</p>
            <h2 className="mask"><span>It started with our dog, <em className="accent">Tobler.</em></span></h2>
            <blockquote className="rv">&ldquo;These weren&apos;t even their animals. People just couldn&apos;t walk past one that was hurt. We figured the least we could do was help with the part they couldn&apos;t.&rdquo;</blockquote>
            <cite className="rv">The Mundhra Family · Est. 2014</cite>
            <div className="rv"><Link className="ghost" href="/blog/the-dog-who-started-it-all">Read Tobler&apos;s full story <span>→</span></Link></div>
          </div>
        </div>
      </section>

      {/* ============ GIVE WIDGET (ImpactSlider behaviour preserved) ============ */}
      <section className="give">
        <div className="give-inner">
          <p className="eyebrow centered">What Your Gift Does</p>
          <h2 className="mask" style={{ fontWeight: 500, fontSize: "clamp(28px,3.2vw,46px)", letterSpacing: "-.02em", marginTop: 18 }}>
            <span>No vague <em className="accent" style={{ color: "var(--hv2-gold)" }}>promises.</em></span>
          </h2>
          <p className="sub rv">Here&apos;s exactly what your gift buys. Drag to see your impact.</p>

          <div className="widget rv">
            <div className="amount-line">
              <div className="amount"><span className="rs">₹</span>{formatted}{amount >= MAX ? "+" : ""}</div>
              <div className="freq">one-time gift · 80G eligible</div>
            </div>
            <p className="impact" aria-live="polite">{impactFor(amount)}</p>

            <input
              type="range"
              min={MIN}
              max={MAX}
              step={STEP}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              aria-label="Donation amount in rupees"
              aria-valuetext={`₹${formatted}`}
              style={{ ["--pct" as string]: `${pct}%` }}
            />
            <div className="range-marks">
              <span>₹{MIN.toLocaleString("en-IN")}</span>
              <span>₹{MAX.toLocaleString("en-IN")}+</span>
            </div>

            <div className="chips" role="group" aria-label="Quick amounts">
              {CHIPS.map((c) => (
                <button type="button" key={c} className={`chip${amount === c ? " on" : ""}`} onClick={() => setAmount(c)}>
                  ₹{c.toLocaleString("en-IN")}
                </button>
              ))}
            </div>

            <Link className="btn-gold" href="/donate-now#donation">Give ₹{formatted}</Link>
            <div className="widget-foot">
              <Link className="tlink" href="/donate-now#donation">Give any amount you choose →</Link>
              <span>256-bit secure · Razorpay · instant 80G receipt</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section className="trust">
        <div className="trust-inner">
          <div>
            <p className="eyebrow">Registered &amp; transparent</p>
            <h2>Every rupee, accounted for.</h2>
            <p className="note">Photos and videos from the field after every campaign. Every certificate public.</p>
          </div>
          <div className="badges rv">
            <Link className="badge" href="/legal">12A Registered</Link>
            <Link className="badge" href="/legal">80G Tax Benefits</Link>
            <Link className="badge" href="/csr">CSR Eligible</Link>
            <Link className="badge" href="/legal">DARPAN Registered</Link>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="final dark">
        <p className="eyebrow centered">Today, that can be you</p>
        <h2>
          <span className="mask"><span>Somewhere out there,</span></span>
          <span className="mask"><span>an animal is <em className="accent">waiting.</em></span></span>
        </h2>
        <p className="rv">It doesn&apos;t know your name. It just needs someone to show up.</p>
        <div className="final-cta rv">
          <Link className="btn-gold" href="/donate-now">Donate now</Link>
          <Link className="ghost" href="/fundraiser">Or start a fundraiser <span>→</span></Link>
        </div>
      </section>
    </div>
  );
}
