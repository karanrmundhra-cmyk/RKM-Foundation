import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import FormShell from "@/components/FormShell";

export const metadata: Metadata = {
  title: "देने के अन्य तरीके",
  description: "स्वयंसेवा करें, सामग्री दान करें, अपने कौशल साझा करें, या इस उद्देश्य को आगे बढ़ाएँ — जो तरीका आपको सही लगे, उससे RKM फाउंडेशन का साथ दें।",
  alternates: { canonical: "/hi/other-ways-to-give" },
};

const HELPERS = [
  { title: "समय देने वाले", desc: "भोजन अभियानों, आश्रय यात्राओं और बचाव में स्वयंसेवा करें।" },
  { title: "धन देने वाले", desc: "भोजन, इलाज और आश्रय का खर्च उठाएँ — और देखें यह कहाँ जाता है।" },
  { title: "प्रदाता", desc: "सामग्री दान करें — भोजन, दवाइयाँ, कंबल, सामान। हम पिकअप की व्यवस्था करते हैं।" },
  { title: "मार्गदर्शक", desc: "पेशेवर कौशल साझा करें — पशु-चिकित्सा, कानूनी, डिज़ाइन, संचालन।" },
  { title: "उद्देश्य की आवाज़", desc: "मिशन को आगे बढ़ाएँ — कहानियाँ साझा करें, बातचीत शुरू करें, उम्मीद फैलाएँ।" },
];

export default function OtherWaysHiPage() {
  return (
    <div lang="hi" style={{ fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' }}>
      <section className="bg-snow pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">देने के अन्य तरीके</p>
            <h1 className="display-1 mt-6 text-balance" style={{ lineHeight: 1.2 }}>हर कोई पैसा नहीं दे सकता। लगभग हर कोई कुछ न कुछ दे सकता है।</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/65">
              हमारा कुछ बेहतरीन साथ कभी पैसे के रूप में नहीं आया — एक भोजन अभियान, कुत्ते-बिल्ली के दाने की एक बोरी, एक पोस्टर, किसी दोस्त को एक ज़रूरतमंद कुत्ते के बारे में बताना। यह सब मदद करता है।
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">हाथ बँटाएँ</p>
            <h2 className="display-2 mt-5 max-w-[18ch] text-balance">आप किस तरह के मददगार हैं?</h2>
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

      <section className="bg-snow section-y">
        <div className="container-c max-w-3xl">
          <Reveal>
            <p className="eyebrow-index">हमसे जुड़ें</p>
            <h2 className="display-2 mt-5 text-balance">बताएँ आप कैसे मदद करना चाहेंगे।</h2>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <FormShell
              formType="volunteer"
              fields={[
                { name: "name", label: "पूरा नाम", required: true, half: true, placeholder: "अपना पूरा नाम लिखें" },
                { name: "email", label: "ईमेल पता", type: "email", required: true, half: true, placeholder: "अपना ईमेल पता लिखें" },
                {
                  name: "way",
                  label: "आप कैसे मदद करना चाहेंगे?",
                  required: true,
                  options: [
                    "समय देने वाले — स्वयंसेवक",
                    "धन देने वाले — दानदाता",
                    "प्रदाता — सामग्री दानदाता",
                    "मार्गदर्शक — कौशल और मार्गदर्शन",
                    "उद्देश्य की आवाज़ — समर्थक",
                  ],
                },
                { name: "story", label: "आपकी कहानी", textarea: true, placeholder: "अपने बारे में और आप कैसे मदद करना चाहेंगे, थोड़ा बताएँ" },
              ]}
              submitLabel="हमसे जुड़ें"
              successMessage="आपका स्वागत है! हम आमतौर पर 1–2 कार्यदिवसों में जवाब देते हैं।"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-ink section-y text-white">
        <div className="container-c max-w-4xl text-center">
          <Reveal>
            <h2 className="display-2 mx-auto max-w-[20ch] text-balance">जो आपके पास है वही दें। यही काफ़ी है।</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">समय, सामग्री, कौशल, या आपकी आवाज़ — यहाँ हर तरह के मददगार के लिए जगह है।</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/donate-now#donation" className="btn-copper">अभी दान करें</Link>
              <Link href="/fundraiser" className="btn bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/20">फंडरेज़र शुरू करें</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
