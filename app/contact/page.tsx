import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import FormShell from "@/components/FormShell";
import ContactPhoto from "@/components/ContactPhoto";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with RKM Foundation — by phone, WhatsApp, email, or a quick message.",
  alternates: { canonical: "/contact", languages: { en: "/contact", hi: "/hi/contact", "x-default": "/contact" } },
};

export default function ContactPage() {
  return (
    <section className="section-y pt-36 sm:pt-44">
      <div className="container-c grid items-stretch gap-x-16 gap-y-12 lg:grid-cols-2">
        {/* Left — portrait (mono → colour on hover / tap) */}
        <Reveal className="lg:h-full">
          <ContactPhoto />
        </Reveal>

        {/* Right — Send a Message (top) then Reach Us (bottom) */}
        <Reveal delay={120} className="flex flex-col gap-12">
          <div>
            <p className="eyebrow-index">Send a Message</p>
            <h2 className="display-2 mt-4 text-balance">
              Tell us what&rsquo;s <em className="accent">going on.</em>
            </h2>
            <div className="mt-8">
              <FormShell
                formType="contact"
                fields={[
                  { name: "name", label: "Full Name", required: true, half: true, placeholder: "Enter your full name" },
                  { name: "email", label: "Email Address", type: "email", required: true, half: true, placeholder: "Enter your email address" },
                  { name: "message", label: "Message", textarea: true, required: true, placeholder: "How can we help?" },
                ]}
                submitLabel="Send Message"
                successMessage="Thank you for reaching out. Our team will contact you shortly."
              />
            </div>
          </div>

          <div className="border-t border-ink/10 pt-10">
            <p className="eyebrow-index">Reach Us</p>
            <dl className="mt-6 border-t border-ink/12">
              {[
                { label: "Hours", value: SITE.hours },
                { label: "Phone / WhatsApp", value: SITE.phone, href: SITE.whatsapp, external: true },
                { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
                { label: "Address", value: SITE.address, href: SITE.maps, external: true },
              ].map((row) => (
                <div key={row.label} className="grid grid-cols-3 gap-4 border-b border-ink/12 py-5">
                  <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink/65">{row.label}</dt>
                  <dd className="col-span-2 text-ink/80">
                    {row.href ? (
                      <a href={row.href} {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="leading-relaxed hover:text-copper-dark">
                        {row.value}
                      </a>
                    ) : (
                      <span className="leading-relaxed">{row.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
