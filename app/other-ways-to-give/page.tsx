import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import FormShell from "@/components/FormShell";
import Link from "next/link";
import Accordion from "@/components/Accordion";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Other Ways to Give",
  description:
    "Volunteer, donate materials, share your skills, or amplify the cause — support RKM Foundation in the way that feels right to you.",
  alternates: { canonical: "/other-ways-to-give", languages: { en: "/other-ways-to-give", hi: "/hi/other-ways-to-give", "x-default": "/other-ways-to-give" } },
};

const HELPERS = [
  { title: "The Giver of Time", desc: "Volunteer at feeding drives, shelter visits, and rescue support." },
  { title: "The Giver of Treasure", desc: "Fund food, treatment, and shelter — and see exactly where it goes." },
  { title: "The Provider", desc: "Donate materials — food, medicines, blankets, supplies. We arrange pickup." },
  { title: "The Mentor", desc: "Share professional skills — veterinary, legal, design, operations." },
  { title: "Voice of the Cause", desc: "Amplify the mission — share stories, start conversations, spread hope." },
];

const OW_FAQS = [
  { q: "Can I visit the shelter or volunteer?", a: "Yes — we welcome volunteers and site visits can be arranged. Reach out via the Other Ways to Give page or write to info@rkm.support. We typically respond within 1–2 business days." },
  { q: "Do you accept material donations?", a: "Yes — food, medicines, blankets, and supplies. We arrange pickup. Fill in the form above or write to info@rkm.support." },
  { q: "How will I know how my contribution is used?", a: "Donors receive periodic photo and video updates from the field, so you can see the difference your support makes." },
];

export default function OtherWaysToGivePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-snow pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">Other Ways to Give</p>
            <h1 className="display-1 mt-6 text-balance">Not everyone can give money. Almost everyone can give something.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/65">
              Some of our best support never came as money — a feeding drive, a sack of kibble, a
              poster, a friend told about a dog who needed a home. All of it helps.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Helper types — editorial ruled list (mirrors About) */}
      <section className="section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">Lend a Hand</p>
            <h2 className="display-2 mt-5 max-w-[16ch] text-balance">Which kind of helper are you?</h2>
          </Reveal>
          <div className="mt-14">
            {HELPERS.map((h, i) => (
              <Reveal key={h.title} delay={i * 60}>
                <div className={`grid items-baseline gap-x-8 gap-y-2 border-t border-ink/10 py-7 lg:grid-cols-12 ${i === HELPERS.length - 1 ? "border-b" : ""}`}>
                  <div className="text-sm font-semibold tabular-nums text-copper-dark lg:col-span-1">0{i + 1}</div>
                  <h3 className="display-3 text-[1.4rem] lg:col-span-4">{h.title}</h3>
                  <p className="leading-relaxed text-ink/65 lg:col-span-7">{h.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-snow section-y">
        <div className="container-c max-w-3xl">
          <Reveal>
            <p className="eyebrow-index">Join Us</p>
            <h2 className="display-2 mt-5 text-balance">Tell us how you&apos;d like to help.</h2>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <FormShell
              formType="volunteer"
              fields={[
                { name: "name", label: "Full Name", required: true, half: true, placeholder: "Enter your full name" },
                { name: "email", label: "Email Address", type: "email", required: true, half: true, placeholder: "Enter your email address" },
                {
                  name: "way",
                  label: "How would you like to help?",
                  required: true,
                  options: [
                    "Giver of Time — Volunteer",
                    "Giver of Treasure — Donor",
                    "The Provider — Material Donor",
                    "The Mentor — Skills & Guidance",
                    "Voice of the Cause — Advocate",
                  ],
                },
                { name: "story", label: "Your Story", textarea: true, placeholder: "Tell us a little about yourself and how you'd like to help" },
              ]}
              submitLabel="Join Us"
              successMessage="Welcome aboard! We typically respond within 1–2 business days."
            />
          </Reveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-y">
        <div className="container-c max-w-3xl">
          <Reveal>
            <p className="eyebrow-index">Have Questions?</p>
            <h2 className="display-2 mt-5 text-balance">Frequently asked questions.</h2>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <Accordion items={OW_FAQS} />
            <p className="mt-6 text-sm text-ink/60">Questions about donations, 80G, or fundraisers? <Link href="/faqs" className="link-secondary">See all FAQs →</Link></p>
          </Reveal>
        </div>
      </section>

      <CTABanner title="Give what you have. It's enough." lead="Time, materials, skills, or your voice — there's a place for every kind of helper here." />
    </>
  );
}
