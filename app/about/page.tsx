import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import EditorialFigure from "@/components/EditorialFigure";
import CTABanner from "@/components/CTABanner";
import TeamProfiles from "@/components/TeamProfiles";

export const metadata: Metadata = {
  title: "About",
  description: "RKM Foundation is an animal-welfare charitable trust in India. A family that started helping animals at home, and kept going.",
  alternates: { canonical: "/about", languages: { en: "/about", hi: "/hi/about", "x-default": "/about" } },
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

export default function AboutPage() {
  return (
    <>
      <section className="bg-snow pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="container-c grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow-index">About RKM Foundation</p>
            <h1 className="display-3 mt-5 max-w-[20ch] text-balance">We&apos;re a family that started helping animals, and kept at it.</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65">
              RKM Foundation started at home — feeding the street animals on our lane, getting the
              hurt ones to a vet, and staying with them when they needed it. What we couldn&apos;t
              ignore slowly grew into a registered charitable trust.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/65">
              We hope to help with more over time — people, the environment, and beyond. For now,
              we&apos;re focused where we can be most useful:{" "}
              <strong className="text-ink">caring for animals.</strong>
            </p>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <EditorialFigure src="/images/site/about.jpg" alt="A rescued dog cared for by RKM Foundation" ratio="aspect-[4/5]" parallax speed={0.06} priority />
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="section-y">
        <div className="container-c max-w-3xl">
          <Reveal>
            <p className="eyebrow-index justify-center">How It Started</p>
            <h2 className="display-2 mt-5 text-center text-balance">It started with our dog, Tobler.</h2>
            <div className="mt-8 space-y-5 leading-relaxed text-ink/75">
              <p>
                Years ago, our pug Tobler fell ill, and we spent a few long nights beside him at a
                vet clinic. What we kept noticing wasn&apos;t the other patients — it was the people
                at the door. Strangers, mostly: they&apos;d found a dog or a cat hurt on the road and
                carried it in, not because it was theirs, but because they couldn&apos;t walk past it.
              </p>
              <p>
                Some could afford the treatment. Many couldn&apos;t — and it&apos;s hard to forget
                someone who&apos;s done the kind thing and then can&apos;t do the next one. That stayed
                with us. By the time Tobler came home, one thing was clear: there&apos;s far more need
                out there than any one family can manage alone.
              </p>
              <p>
                We&apos;d been quietly feeding and treating animals on our own street for a while. After
                Tobler, in 2014, we made it official and registered RKM Foundation. For years we kept
                it simple — no campaigns, no big drives, just animals fed, wounds treated, and
                emergencies answered, paid for by our family and a few friends who pitched in.
              </p>
            </div>

            <div className="mt-10 border-l-2 border-copper/50 pl-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper-dark">Where we are today</p>
              <p className="mt-3 leading-relaxed text-ink/75">
                We&apos;re honest about our size: RKM Foundation grew from a small, family-funded effort,
                and that&apos;s still close to who we are. What&apos;s changing is that we&apos;re starting to
                invite others in — to give, to volunteer, and to support trusted people already doing
                good work on the ground. We&apos;d rather grow slowly and keep every promise than grow
                fast and break one.
              </p>
            </div>

            <div className="mt-8">
              <Link href="/blog/the-dog-who-started-it-all" className="btn-light">Read Tobler&apos;s Story</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-snow section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">How We Work</p>
            <h2 className="display-2 mt-5 max-w-[16ch] text-balance">What we hold ourselves to.</h2>
          </Reveal>
          <div className="mt-16 grid gap-x-16 gap-y-12 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="flex gap-5">
                  <span className="mt-1 text-sm font-semibold tabular-nums text-copper-dark">0{i + 1}</span>
                  <div>
                    <h3 className="display-3 text-[1.35rem] sm:text-[1.5rem]">{v.title}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-ink/65">{v.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to be part */}
      <section className="section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">Be Part of the Mission</p>
            <h2 className="display-2 mt-5 max-w-[14ch] text-balance">Five ways to belong.</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65">
              Whatever you have to give — time, treasure, materials, knowledge, or your voice — there is a place for you here.
            </p>
          </Reveal>
          <div className="mt-16">
            {ROLES.map((r, i) => (
              <Reveal key={r.title} delay={i * 60}>
                <div className={`grid items-baseline gap-x-8 gap-y-3 border-t border-ink/10 py-8 lg:grid-cols-12 ${i === ROLES.length - 1 ? "border-b" : ""}`}>
                  <div className="text-sm font-semibold tabular-nums text-copper-dark lg:col-span-1">0{i + 1}</div>
                  <div className="lg:col-span-4">
                    <h3 className="display-3 text-[1.4rem]">{r.title}</h3>
                    <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-copper-dark">{r.virtues}</p>
                  </div>
                  <p className="leading-relaxed text-ink/65 lg:col-span-5">{r.desc}</p>
                  <div className="lg:col-span-2 lg:text-right">
                    <Link href={r.href} className="link-secondary whitespace-nowrap text-sm">{r.cta} →</Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-snow section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index justify-center">Our Team</p>
            <h2 className="display-2 mt-5 text-center text-balance">A community that cares</h2>
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-4 max-w-xl text-center text-ink/65">Tap any profile to read their full story and expertise.</p>
            <TeamProfiles />
          </Reveal>
        </div>
      </section>

      <CTABanner title="Join a community that cares" lead="Every member of this mission started with a single step. Take yours today." />
    </>
  );
}
