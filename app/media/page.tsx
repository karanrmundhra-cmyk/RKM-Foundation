import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import CTABanner from "@/components/CTABanner";
import ScrollFadeWords from "@/components/ScrollFadeWords";
import { TESTIMONIALS, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Media",
  description: "The donors, volunteers, vets, and neighbours behind every RKM Foundation rescue — in their own words.",
  alternates: { canonical: "/media", languages: { en: "/media", hi: "/hi/media", "x-default": "/media" } },
};

const UPDATES = [
  {
    title: "Photo & video updates",
    desc: "Donors receive periodic photos and short videos from the field, so you can see the rescued animals your support feeds and treats.",
  },
  {
    title: "Field visit invitations",
    desc: "We welcome supporters to feeding drives and shelter visits. When you can't attend in person, we include you over a video call.",
  },
  {
    title: "Annual transparency reports",
    desc: "We file Form 10BD and issue 10BE certificates each year, and share how funds were used — clear governance, responsible reporting.",
  },
];

export default function MediaPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-snow pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">Media</p>
            <h1 className="display-1 mt-6 text-balance">The people who show up <em className="accent">for animals.</em></h1>
            <ScrollFadeWords
              as="p"
              className="mt-7 max-w-2xl text-lg leading-relaxed text-ink"
              text="The donors, volunteers, veterinarians, and neighbours behind every rescue and every meal — telling you, in their own words, why they keep coming back."
            />
            <div className="mt-8 flex flex-wrap gap-5 text-sm">
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="link-secondary">Instagram</a>
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="link-secondary">Facebook</a>
              <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" className="link-secondary">LinkedIn</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Donor voices — oversized editorial pull-quotes */}
      <section className="section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">In Their Own Words</p>
            <h2 className="display-2 mt-5 max-w-[16ch] text-balance">The people behind the work.</h2>
          </Reveal>
          <div className="mt-16 border-t border-ink/12">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={(i % 2) * 80}>
                <figure className="grid gap-x-12 gap-y-6 border-b border-ink/12 py-12 lg:grid-cols-12 lg:py-16">
                  <span className="text-sm font-semibold tabular-nums text-copper-dark lg:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                  <blockquote className="lg:col-span-8">
                    <p className="text-2xl font-medium leading-snug tracking-tight text-ink/90 sm:text-3xl">&ldquo;{t.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="flex items-center gap-3 lg:col-span-3 lg:flex-col lg:items-start lg:gap-2">
                    <Image src={t.img} alt={`Portrait of ${t.name}`} width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-sm text-ink/65">{t.place}</div>
                      <div className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-copper-dark">{t.context}</div>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we keep you in the loop — numbered editorial rows */}
      <section className="bg-snow section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">How We Keep You in the Loop</p>
            <h2 className="display-2 mt-5 max-w-[16ch] text-balance">What every supporter receives.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/65">
              Support should never feel like a black box. Here is what we share with you, on a regular basis.
            </p>
          </Reveal>
          <div className="mt-14">
            {UPDATES.map((u, i) => (
              <Reveal key={u.title} delay={i * 70}>
                <div className={`grid items-baseline gap-x-8 gap-y-3 border-t border-ink/10 py-8 lg:grid-cols-12 ${i === UPDATES.length - 1 ? "border-b" : ""}`}>
                  <div className="text-sm font-semibold tabular-nums text-copper-dark lg:col-span-1">0{i + 1}</div>
                  <h3 className="display-3 text-[1.4rem] lg:col-span-4">{u.title}</h3>
                  <p className="leading-relaxed text-ink/65 lg:col-span-7">{u.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        lead="There&apos;s an animal whose story isn&apos;t written yet. You could be the reason it has a happy ending."
      />
    </>
  );
}
