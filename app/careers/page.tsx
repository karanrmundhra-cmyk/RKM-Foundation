import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import FormShell from "@/components/FormShell";

export const metadata: Metadata = {
  title: "Careers",
  description: "Want to work in animal rescue? Share your details and we'll reach out when the right role opens at RKM Foundation.",
  alternates: { canonical: "/careers", languages: { en: "/careers", hi: "/hi/careers", "x-default": "/careers" } },
};

const REALITIES = [
  { title: "Early mornings", desc: "Feeding drives and rescues don't wait for office hours." },
  { title: "Muddy boots", desc: "This is hands-on work — in the field, with the animals." },
  { title: "Quiet joy", desc: "Watching a frightened animal learn to trust again." },
];

export default function CareersPage() {
  return (
    <>
      <section className="bg-snow pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">Careers</p>
            <h1 className="display-1 mt-6 text-balance">Some days it&rsquo;s paperwork. Some days it&rsquo;s a rescue.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/65">
              Early mornings, muddy boots, the occasional heartbreak — and the quiet joy of watching
              a frightened animal trust again. If that&rsquo;s your kind of work, we&rsquo;d love to hear from you.
            </p>
            <p className="mt-5 max-w-2xl text-sm text-ink/65">
              No open listings right now — share your details and we&rsquo;ll reach out when a role fits.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What the work is really like — ruled rows */}
      <section className="section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">The Work</p>
            <h2 className="display-2 mt-5 max-w-[16ch] text-balance">What the days actually look like.</h2>
          </Reveal>
          <div className="mt-14">
            {REALITIES.map((r, i) => (
              <Reveal key={r.title} delay={i * 70}>
                <div className={`grid items-baseline gap-x-8 gap-y-2 border-t border-ink/10 py-7 lg:grid-cols-12 ${i === REALITIES.length - 1 ? "border-b" : ""}`}>
                  <div className="text-sm font-semibold tabular-nums text-copper-dark lg:col-span-1">0{i + 1}</div>
                  <h3 className="display-3 text-[1.4rem] lg:col-span-4">{r.title}</h3>
                  <p className="leading-relaxed text-ink/65 lg:col-span-7">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* General interest form — de-carded */}
      <section className="bg-snow section-y">
        <div className="container-c max-w-3xl">
          <Reveal>
            <p className="eyebrow-index">Express Interest</p>
            <h2 className="display-2 mt-5 text-balance">Tell us about yourself.</h2>
          </Reveal>
          <Reveal className="mt-10">
            <FormShell
              formType="careers"
              fields={[
                { name: "name", label: "Full Name", required: true, half: true, placeholder: "Enter your full name" },
                { name: "email", label: "Email Address", type: "email", required: true, half: true, placeholder: "Enter your email address" },
                { name: "phone", label: "Phone Number", type: "tel", half: true, placeholder: "Enter your phone number" },
                { name: "role", label: "Interested Role", half: true, placeholder: "Describe your interests" },
                { name: "message", label: "Tell us about yourself", textarea: true, placeholder: "Your background, skills, and what draws you to this work" },
              ]}
              submitLabel="Submit Details"
              successMessage="Thank you! We'll reach out if there's a fit."
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
