import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import FormShell from "@/components/FormShell";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "संपर्क करें",
  description: "RKM फाउंडेशन से संपर्क करें — फ़ोन, व्हाट्सऐप, ईमेल, या एक छोटे संदेश के ज़रिए।",
  alternates: { canonical: "/hi/contact" },
};

export default function ContactHiPage() {
  const rows = [
    { label: "समय", value: "सोमवार से शुक्रवार | सुबह 10:00 – शाम 6:00" },
    { label: "फ़ोन / व्हाट्सऐप", value: SITE.phone, href: SITE.whatsapp, external: true },
    { label: "ईमेल", value: SITE.email, href: `mailto:${SITE.email}` },
    { label: "पता", value: SITE.address, href: SITE.maps, external: true },
  ];
  return (
    <div lang="hi" style={{ fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' }}>
      <section className="bg-snow pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">संपर्क</p>
            <h1 className="display-1 mt-6 text-balance" style={{ lineHeight: 1.18 }}>कोई जानवर मुसीबत में मिला? यहाँ से शुरू करें।</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/65">
              कोई घायल सड़क का कुत्ता, दान से जुड़ा सवाल, साझेदारी का विचार, या बस नमस्ते — जो तरीका आपके लिए सबसे आसान हो, उसी से हमसे जुड़ें।
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-c grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow-index">हम तक पहुँचें</p>
            <dl className="mt-8 border-t border-ink/12">
              {rows.map((row) => (
                <div key={row.label} className="grid grid-cols-3 gap-4 border-b border-ink/12 py-5">
                  <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink/45">{row.label}</dt>
                  <dd className="col-span-2 text-ink/80">
                    {row.href ? (
                      <a href={row.href} {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="leading-relaxed hover:text-copper-dark">{row.value}</a>
                    ) : (
                      <span className="leading-relaxed">{row.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <p className="eyebrow-index">संदेश भेजें</p>
            <div className="mt-8">
              <FormShell
                formType="contact"
                fields={[
                  { name: "name", label: "पूरा नाम", required: true, half: true, placeholder: "अपना पूरा नाम लिखें" },
                  { name: "email", label: "ईमेल पता", type: "email", required: true, half: true, placeholder: "अपना ईमेल पता लिखें" },
                  { name: "message", label: "संदेश", textarea: true, required: true, placeholder: "हम कैसे मदद कर सकते हैं?" },
                ]}
                submitLabel="संदेश भेजें"
                successMessage="हमसे जुड़ने के लिए धन्यवाद। हमारी टीम जल्द ही आपसे संपर्क करेगी।"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
