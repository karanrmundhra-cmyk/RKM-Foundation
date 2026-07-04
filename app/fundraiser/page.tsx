import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ScrollFadeWords from "@/components/ScrollFadeWords";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Fundraiser",
  description: "Turn your birthday, anniversary, or fitness challenge into food, treatment, and shelter for rescued animals.",
  alternates: { canonical: "/fundraiser", languages: { en: "/fundraiser", hi: "/hi/fundraiser", "x-default": "/fundraiser" } },
};

const STEPS = [
  { title: "Create", desc: "Create your fundraiser page and set your goal." },
  { title: "Share", desc: "Your fundraiser page comes with a personal link you can share with friends and family." },
  { title: "Track & Celebrate", desc: "We'll send you photos and updates of the animals your fundraiser fed and healed." },
];

const TIERS = [
  { amount: "₹5,000", desc: "A full month of food and care for 2–3 animals in our shelter." },
  { amount: "₹7,000", desc: "Neutering, medical treatment, and recovery care for one rescued animal" },
  { amount: "₹10,000", desc: "Building one kennel or supporting emergency medical treatment" },
];

const IDEAS = [
  { title: "Birthday Fundraiser", quote: "This year, I'm celebrating by helping rescued animals. Join me?" },
  { title: "Anniversary or Milestone", quote: "Celebrating our special day by giving back to the animal shelter." },
  { title: "Fitness Challenge", quote: "Every kilometre I run feeds a hungry street dog. Sponsor me?" },
];

const FEATURES = [
  { title: "Your Own Fundraiser Page", desc: "A personalised page with your name, message, and an easy way to share with friends and family." },
  { title: "Simple Sharing", desc: "A unique link you can send through WhatsApp, email, or social media." },
  { title: "Live Progress Tracking", desc: "See donations as they come in and watch your fundraiser move toward its goal." },
  { title: "Updates From the Shelter", desc: "Receive photos and stories of the rescued animals your fundraiser helped." },
  { title: "Tax Receipts for Donors", desc: "Each donor receives an instant receipt and an 80G certificate where eligible." },
];

export default function FundraiserPage() {
  return (
    <>
      {/* Hero — type-led editorial */}
      <section className="bg-snow pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">Fundraise for Rescued Animals</p>
            <h1 className="display-1 mt-6 text-balance">Turn your birthday into a lifeline for an animal.</h1>
            <ScrollFadeWords
              as="p"
              className="mt-7 max-w-2xl text-lg leading-relaxed text-ink"
              text="A birthday, an anniversary, a run you’re training for — ask the people who love you to help feed and heal a rescued animal instead of buying you another gift."
            />
            <div className="mt-9">
              <Link href="/fundraiser/create" className="btn-copper">Start Your Fundraiser</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works — numbered editorial rows */}
      <section className="section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">How It Works</p>
            <h2 className="display-2 mt-5 max-w-[14ch] text-balance">Three simple steps.</h2>
          </Reveal>
          <div className="mt-14">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 70}>
                <div className={`grid items-baseline gap-x-8 gap-y-3 border-t border-ink/10 py-8 lg:grid-cols-12 ${i === STEPS.length - 1 ? "border-b" : ""}`}>
                  <div className="text-sm font-semibold tabular-nums text-copper-dark lg:col-span-1">0{i + 1}</div>
                  <h3 className="display-3 text-[1.6rem] lg:col-span-4">{s.title}</h3>
                  <p className="leading-relaxed text-ink/65 lg:col-span-7">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Where the money goes — ruled list, big numerals */}
      <section className="bg-snow section-y">
        <div className="container-c grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow-index">Where the Money Goes</p>
            <h2 className="display-2 mt-5 text-balance">What will your fundraiser support?</h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/65">
              When you create your fundraiser, you can support real needs such as these.
            </p>
          </Reveal>
          <div className="lg:col-span-7">
            {TIERS.map((t, i) => (
              <Reveal key={t.amount} delay={i * 70}>
                <div className={`grid grid-cols-1 items-center gap-x-8 gap-y-2 border-t border-ink/12 py-7 sm:grid-cols-[auto_1fr] ${i === TIERS.length - 1 ? "border-b" : ""}`}>
                  <div className="display-3 text-copper-dark sm:min-w-[5ch]">{t.amount}</div>
                  <p className="leading-relaxed text-ink/70">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ideas — ruled rows */}
      <section className="section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">Popular Fundraiser Ideas</p>
            <h2 className="display-2 mt-5 max-w-[18ch] text-balance">Pick a reason. We&apos;ll handle the rest.</h2>
          </Reveal>
          <div className="mt-14">
            {IDEAS.map((idea, i) => (
              <Reveal key={idea.title} delay={i * 70}>
                <div className={`grid items-baseline gap-x-8 gap-y-3 border-t border-ink/10 py-8 lg:grid-cols-12 ${i === IDEAS.length - 1 ? "border-b" : ""}`}>
                  <h3 className="display-3 text-[1.4rem] lg:col-span-4">{idea.title}</h3>
                  <p className="text-lg italic leading-relaxed text-ink/70 lg:col-span-8">&ldquo;{idea.quote}&rdquo;</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What you get — ruled list with check */}
      <section className="bg-snow section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">What You Get</p>
            <h2 className="display-2 mt-5 max-w-[18ch] text-balance">A page, a link, and proof it worked.</h2>
          </Reveal>
          <div className="mt-14 border-t border-ink/12">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 60}>
                <div className="grid items-baseline gap-x-8 gap-y-2 border-b border-ink/12 py-7 lg:grid-cols-12">
                  <div className="lg:col-span-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="text-copper-dark" aria-hidden><path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <h3 className="display-3 text-[1.3rem] lg:col-span-4">{f.title}</h3>
                  <p className="leading-relaxed text-ink/65 lg:col-span-7">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <p className="text-sm text-ink/60">
              Have questions?{" "}
              <a href="mailto:info@rkm.support" className="link-secondary">info@rkm.support</a>
              {" · "}
              <a href="https://wa.me/919920780005" target="_blank" rel="noopener noreferrer" className="link-secondary">WhatsApp</a>
            </p>
          </Reveal>
        </div>
      </section>

      <CTABanner title="One celebration. A whole lot of full bellies." lead="Every rupee goes straight to the shelter we run and oversee — food, vet care, and a safe place to sleep." />
    </>
  );
}
