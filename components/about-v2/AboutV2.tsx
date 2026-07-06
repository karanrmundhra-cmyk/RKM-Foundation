"use client";
// ABOUT v2 — new design language (benchmark: concepts/about-redesign.html).
// Scoped under .av2; global Header/Footer stay until the site-wide rollout.
// Motion: GSAP + ScrollTrigger + Lenis (page-scoped, destroyed on unmount),
// fully disabled under prefers-reduced-motion (§7).
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { TEAM } from "@/lib/content";

type Member = {
  name: string;
  role: string;
  img: string;
  summary: string;
  bio: string;
  expertise: string[];
};

const ROLES = [
  { title: "The Giver of Time", virtues: "Seva · Karuna · Daya · Maitri", desc: "Volunteer at feeding drives, shelter visits, and rescue support.", cta: "Volunteer Now", href: "/other-ways-to-give" },
  { title: "The Giver of Treasure", virtues: "Daana · Shraddha · Tyaag · Vishwaas", desc: "Fund food, treatment, and shelter — and see exactly where it goes.", cta: "Donate Now", href: "/donate-now" },
  { title: "The Provider", virtues: "Sahyog · Sahara · Paropkar", desc: "Donate materials — food, medicines, blankets, supplies. We arrange pickup.", cta: "Donate In Kind", href: "/other-ways-to-give" },
  { title: "The Mentor", virtues: "Vidya Daan · Guru Bhav · Kaushal", desc: "Share professional skills — veterinary, legal, design, operations.", cta: "Share Your Skills", href: "/other-ways-to-give" },
  { title: "Voice of the Cause", virtues: "Prerna · Chetna · Uddeshya", desc: "Amplify the mission — share stories, start conversations, spread hope.", cta: "Help Spread Hope", href: "/other-ways-to-give" },
];

const VALUES = [
  { title: "Compassion First", desc: "We started by feeding animals in our own building. The scale grew; the spirit didn't change." },
  { title: "Full Transparency", desc: "Photo and video updates from the field. Every certificate public. Every question answered." },
  { title: "Quiet Consistency", desc: "Registered in 2014, we worked for years without campaigns or announcements — just daily care." },
  { title: "Community Powered", desc: "Donors, volunteers, vets, and neighbours — change happens when caring people find each other." },
];

const STORY = [
  "Years ago, our pug Tobler fell ill, and we spent a few long nights beside him at a vet clinic. What we kept noticing wasn't the other patients — it was the people at the door. Strangers, mostly: they'd found a dog or a cat hurt on the road and carried it in, not because it was theirs, but because they couldn't walk past it.",
  "Some could afford the treatment. Many couldn't — and it's hard to forget someone who's done the kind thing and then can't do the next one. That stayed with us. By the time Tobler came home, one thing was clear: there's far more need out there than any one family can manage alone.",
  "We'd been quietly feeding and treating animals on our own street for a while. After Tobler, in 2014, we made it official and registered RKM Foundation. For years we kept it simple — no campaigns, no big drives, just animals fed, wounds treated, and emergencies answered, paid for by our family and a few friends who pitched in.",
];

/* Word-split paragraph for the scroll illumination effect (React-safe split). */
function IlluminatedParagraph({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <p>
      {words.map((w, i) => (
        <span key={i}>
          <span className="w">{w}</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}

function MemberCard({ member, onOpen }: { member: Member; onOpen: (m: Member) => void }) {
  return (
    <button type="button" className="member" onClick={() => onOpen(member)}>
      <span className="ph">
        <Image src={member.img} alt={member.name} fill sizes="(max-width:680px) 90vw, (max-width:1020px) 45vw, 320px" style={{ objectFit: "cover" }} />
      </span>
      <span className="meta">
        <span className="n">{member.name}</span>
        <span className="r">{member.role}</span>
        <span className="s">{member.summary}</span>
      </span>
    </button>
  );
}

export default function AboutV2() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [selected, setSelected] = useState<Member | null>(null);

  /* ---------- modal ---------- */
  function openMember(m: Member) {
    setSelected(m);
  }
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (selected && !dlg.open) {
      dlg.showModal();
      lenisRef.current?.stop();
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.from(dlg.querySelector(".md-body"), { y: 22, opacity: 0, duration: 0.55, ease: "power3.out" });
      }
    }
  }, [selected]);
  // Native `close` event (fired on ESC too) — resume scroll, clear selection.
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const handleClose = () => {
      lenisRef.current?.start();
      setSelected(null);
    };
    dlg.addEventListener("close", handleClose);
    return () => dlg.removeEventListener("close", handleClose);
  }, []);
  function closeDialog() {
    dialogRef.current?.close();
  }

  /* ---------- motion ---------- */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // §7 — decorative video must not autoplay under reduced-motion.
    if (rm) {
      root.querySelectorAll<HTMLVideoElement>("video").forEach((v) => {
        v.autoplay = false;
        v.pause();
      });
    }

    gsap.registerPlugin(ScrollTrigger);

    let lenis: Lenis | null = null;
    let tick: ((t: number) => void) | null = null;
    if (!rm) {
      lenis = new Lenis({ lerp: 0.1 });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t: number) => lenis!.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      if (rm) return; // reduced motion: everything stays visible & static

      // scroll progress hairline
      gsap.to(".av2-progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

      // hero entrance (light split — no full-bleed media)
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from(".hero .mask > span", { yPercent: 112, duration: 1.2, stagger: 0.11 }, 0.1)
        .from(".hero .rv", { opacity: 0, y: 20, duration: 1, stagger: 0.08 }, 0.6);

      // masked headings on scroll
      gsap.utils.toArray<HTMLElement>(".sec .mask > span, .tobler .mask > span, .team .mask > span, .final .mask > span").forEach((el) => {
        gsap.from(el, { yPercent: 112, duration: 1.1, ease: "power4.out",
          scrollTrigger: { trigger: el.closest("section"), start: "top 72%" } });
      });
      // soft rises (hero .rv is handled by the entrance timeline above)
      gsap.utils.toArray<HTMLElement>("section:not(.hero) .rv").forEach((el) => {
        gsap.from(el, { opacity: 0, y: 20, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      // grouped staggers
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.from(group.children, { y: 34, opacity: 0, duration: 0.9, stagger: 0.09, ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 82%" } });
      });
      // clip-path image reveal (Tobler photo)
      gsap.utils.toArray<HTMLElement>("[data-reveal-img]").forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.4, ease: "power4.inOut",
          scrollTrigger: { trigger: el, start: "top 80%" } });
      });
      // word-by-word illumination — ONE timeline in reading order across all
      // paragraphs: para 1 completes fully before para 2 begins.
      gsap.utils.toArray<HTMLElement>("[data-illuminate]").forEach((container) => {
        gsap.to(container.querySelectorAll(".w"), { opacity: 1, stagger: 0.5, ease: "none",
          scrollTrigger: { trigger: container, start: "top 72%", end: "bottom 58%", scrub: 0.4 } });
      });
    }, root);

    return () => {
      ctx.revert();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  function scrollToStory(e: React.MouseEvent) {
    e.preventDefault();
    const target = document.getElementById("story");
    if (!target) return;
    if (lenisRef.current) lenisRef.current.scrollTo(target, { offset: -40, duration: 1.4 });
    else target.scrollIntoView({ behavior: "smooth" });
  }

  const trustees = TEAM.trustees as Member[];
  const core = TEAM.core as Member[];
  const coordinators = TEAM.coordinators as Member[];

  return (
    <div className="av2" ref={rootRef}>
      <div className="av2-progress" aria-hidden />

      {/* ============ HERO — light editorial split (keeps the untouched
          production Header legible on this route) ============ */}
      <section className="hero">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">
              <span className="mask"><span>About RKM Foundation</span></span>
            </p>
            <h1>
              <span className="mask"><span>It started at home,</span></span>
              <span className="mask"><span>with the animals <em className="accent">on our street.</em></span></span>
            </h1>
            <p className="lede mask">
              <span>RKM Foundation started at home — feeding the street animals on our lane, getting the hurt ones to a vet, and staying with them when they needed it. What we couldn&apos;t ignore slowly grew into a registered charitable trust.</span>
            </p>
            <div className="hero-cta rv">
              <Link className="btn-gold" href="/donate-now">Donate now</Link>
              <a className="ghost" href="#story" onClick={scrollToStory}>
                Read Tobler&apos;s Story <span>→</span>
              </a>
            </div>
            <p className="hero-meta rv">Est. 2014 · Thane, India · 12A · 80G · CSR</p>
          </div>
          <div className="ph rv">
            <Image src="/images/site/about.jpg" alt="A rescued dog cared for by RKM Foundation" fill priority sizes="(max-width:1020px) 90vw, 560px" style={{ objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section className="sec">
        <div className="sec-inner">
          <p className="eyebrow">How We Work</p>
          <h2 className="mask"><span>What we hold <em className="accent">ourselves to.</em></span></h2>
          <p className="sub rv">
            We hope to help with more over time — people, the environment, and beyond. For now, we&apos;re focused where we can be most useful: <strong>caring for animals.</strong>
          </p>
          <div className="value-grid" data-stagger>
            {VALUES.map((v, i) => (
              <div className="value" key={v.title}>
                <span className="idx">0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TOBLER STORY ============ */}
      <section className="tobler dark" id="story">
        <div className="tobler-inner">
          <figure className="sticky">
            <div className="ph" data-reveal-img>
              <Image src="/images/site/tobler-hero.jpg" alt="Tobler, the dog who started it all" fill sizes="(max-width:1020px) 90vw, 440px" style={{ objectFit: "cover" }} />
            </div>
            <figcaption><span>Tobler</span><span>Where it began · 2014</span></figcaption>
          </figure>
          <div>
            <p className="eyebrow">How It Started</p>
            <h2><span className="mask" style={{ display: "block" }}><span>It started with our dog, <em className="accent">Tobler.</em></span></span></h2>
            <div className="story" data-illuminate>
              {STORY.map((p) => <IlluminatedParagraph key={p.slice(0, 24)} text={p} />)}
            </div>
            <div className="today rv">
              <p className="tag">Where we are today</p>
              <p>We&apos;re honest about our size: RKM Foundation grew from a small, family-funded effort, and that&apos;s still close to who we are. What&apos;s changing is that we&apos;re starting to invite others in — to give, to volunteer, and to support trusted people already doing good work on the ground. We&apos;d rather grow slowly and keep every promise than grow fast and break one.</p>
            </div>
            <div className="rv" style={{ marginTop: 34 }}>
              <Link className="ghost" href="/blog/the-dog-who-started-it-all" style={{ borderColor: "var(--av2-gold-soft)" }}>
                Read Tobler&apos;s Story <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FIVE WAYS ============ */}
      <section className="sec">
        <div className="sec-inner">
          <p className="eyebrow">Be Part of the Mission</p>
          <h2 className="mask"><span>Five ways <em className="accent">to belong.</em></span></h2>
          <p className="sub rv">Whatever you have to give — time, treasure, materials, knowledge, or your voice — there is a place for you here.</p>
          <div className="ways-layout">
            <div className="ways-media rv" aria-hidden="true">
              <video
                src="/media/five-ways.mp4"
                poster="/media/five-ways-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                tabIndex={-1}
              />
              <span className="ways-media-grad" />
            </div>
            <div className="ways" data-stagger>
              {ROLES.map((r, i) => (
                <div className="way" key={r.title}>
                  <span className="num">0{i + 1}</span>
                  <div className="way-body">
                    <h3>{r.title}</h3>
                    <p className="virtues">{r.virtues}</p>
                    <p className="way-desc">{r.desc}</p>
                  </div>
                  <Link className="tlink act" href={r.href}>{r.cta} →</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ TEAM ============ */}
      <section className="team">
        <p className="eyebrow centered">Our Team</p>
        <h2 className="mask"><span>A community <em className="accent">that cares</em></span></h2>
        <p className="team-sub rv">Tap any profile to read their full story and expertise.</p>

        <div className="team-group">
          <h3>Trustees</h3>
          <div className="team-grid" data-stagger>
            {trustees.map((m) => <MemberCard key={m.name} member={m} onOpen={openMember} />)}
          </div>
        </div>
        <div className="team-group">
          <h3>Core Management</h3>
          <div className="team-grid" data-stagger>
            {core.map((m) => <MemberCard key={m.name} member={m} onOpen={openMember} />)}
          </div>
        </div>
        <div className="team-group">
          <h3>Lead Coordinators</h3>
          <div className="team-grid cols-2" data-stagger>
            {coordinators.map((m) => <MemberCard key={m.name} member={m} onOpen={openMember} />)}
          </div>
        </div>
      </section>

      {/* member modal */}
      <dialog
        className="av2-dialog"
        ref={dialogRef}
        onClick={(e) => { if (e.target === dialogRef.current) closeDialog(); }}
      >
        {selected && (
          <>
            <button className="md-close" type="button" aria-label="Close" onClick={closeDialog}>✕</button>
            <div className="md-body">
              <div className="md-head">
                <span className="md-avatar">
                  <Image src={selected.img} alt={selected.name} fill sizes="76px" style={{ objectFit: "cover" }} />
                </span>
                <div>
                  <div className="md-name">{selected.name}</div>
                  <div className="md-role">{selected.role}</div>
                </div>
              </div>
              <p className="md-bio">{selected.bio}</p>
              <div className="md-chips">
                {selected.expertise.map((c) => <span key={c}>{c}</span>)}
              </div>
            </div>
          </>
        )}
      </dialog>

      {/* ============ FINAL CTA ============ */}
      <section className="final dark">
        <p className="eyebrow centered">Take yours today</p>
        <h2>
          <span className="mask"><span>Join a community</span></span>
          <span className="mask"><span>that <em className="accent">cares.</em></span></span>
        </h2>
        <p className="rv">Every member of this mission started with a single step. Take yours today.</p>
        <div className="final-cta rv">
          <Link className="btn-gold" href="/donate-now">Donate now</Link>
          <Link className="ghost" href="/fundraiser" style={{ borderColor: "var(--av2-gold-soft)" }}>
            Or start a fundraiser <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
