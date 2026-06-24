import type { Metadata } from "next";
import { headers } from "next/headers";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import { FAQS_GENERAL, FAQS_FUNDRAISER, FAQS_SHOP, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about RKM Foundation — donations, tax benefits, fundraisers, and Shop for a Cause.",
  alternates: { canonical: "/faqs", languages: { en: "/faqs", hi: "/hi/faqs", "x-default": "/faqs" } },
};

const SECTIONS = [
  { eyebrow: "General", title: "About the Foundation & donations", items: FAQS_GENERAL },
  { eyebrow: "Fundraiser", title: "Starting & running a fundraiser", items: FAQS_FUNDRAISER },
  { eyebrow: "Shop for a Cause", title: "Orders, shipping & refunds", items: FAQS_SHOP },
];

export default function FAQsPage() {
  const nonce = headers().get("x-nonce") ?? undefined;
  return (
    <>
      <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [...FAQS_GENERAL, ...FAQS_FUNDRAISER, ...FAQS_SHOP].map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />
      <section className="bg-snow pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">FAQs</p>
            <h1 className="display-1 mt-6 text-balance">Frequently asked questions.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/65">
              The questions we hear most — about who we are, how donations and 80G tax benefits
              work, running a fundraiser, and the Shop for a Cause.
            </p>
          </Reveal>
        </div>
      </section>

      {SECTIONS.map((s, i) => (
        <section key={s.eyebrow} className={`${i % 2 === 1 ? "bg-snow" : ""} section-y`}>
          <div className="container-c grid gap-x-16 gap-y-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow-index">{s.eyebrow}</p>
                <h2 className="display-3 mt-5 text-balance">{s.title}</h2>
              </div>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-8">
              <Accordion items={s.items} />
            </Reveal>
          </div>
        </section>
      ))}

      <section className="section-y">
        <div className="container-c">
          <Reveal className="max-w-3xl">
            <p className="eyebrow-index">Still Have a Question?</p>
            <h2 className="display-2 mt-5 text-balance">Reach out — we&rsquo;re happy to help.</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${SITE.email}`} className="btn-dark">Email {SITE.email}</a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-light">WhatsApp Us</a>
            </div>
            <p className="mt-5 text-sm text-ink/55">{SITE.hours}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
