import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import FormShell from "@/components/FormShell";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "हमारे साथ साझेदारी करें",
  description: "RKM फाउंडेशन उन ज़मीनी संगठनों का साथ देता है जो पहले से मैदान में काम कर रहे हैं। अपनी पहल के बारे में हमें बताएँ।",
  alternates: { canonical: "/hi/partner-with-us", languages: { en: "/partner-with-us", hi: "/hi/partner-with-us", "x-default": "/partner-with-us" } },
};

const NEXT_STEPS = [
  "आपके द्वारा साझा की गई जानकारी की हम समीक्षा करेंगे।",
  "यदि आपकी पहल हमारे काम से मेल खाती है, तो हम और विवरण के लिए संपर्क कर सकते हैं।",
  "स्वीकृत होने पर, तय परियोजना के लिए धनराशि सीधे साझेदार संगठन को दी जाती है।",
];

const FORM_SECTIONS = [
  { title: "आपके संगठन के बारे में", desc: "आप कौन हैं, कहाँ पंजीकृत हैं, और हम आप तक कैसे पहुँचें।" },
  { title: "परियोजना या पहल के बारे में", desc: "आप जिस उद्देश्य पर काम कर रहे हैं, ज़रूरी सहयोग, और लाभार्थी कौन होंगे।" },
];

export default function PartnerHiPage() {
  return (
    <div lang="hi" style={{ fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' }}>
      <section className="bg-snow pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">हमारे साथ साझेदारी करें</p>
            <h1 className="display-1 mt-6 text-balance" style={{ lineHeight: 1.2 }}>काम आप करते हैं। सहयोग जुटाने में हम मदद करते हैं।</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/65">
              हम उन ज़मीनी संगठनों का साथ देते हैं जो पहले से मैदान में हैं — जागरूकता फैलाते, सहयोग जुटाते, और दानदाताओं को ऐसे भरोसेमंद काम से जोड़ते जो पहले से बदलाव ला रहा है।
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-c grid gap-x-16 gap-y-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow-index">हम कैसे काम करते हैं</p>
            <h2 className="display-2 mt-5 text-balance">हम उस काम का साथ देते हैं जो पहले से हो रहा है।</h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-7 lg:pt-2">
            <p className="max-w-xl text-lg leading-relaxed text-ink/65">
              हम उन संगठनों के साथ साझेदारी करते हैं जो अपने समुदायों में पहले से कठिन काम कर रहे हैं। इन सहयोगों के ज़रिए हम आपकी पहल को सामने लाते हैं, विशिष्ट परियोजनाओं का खर्च उठाते हैं, और भरोसेमंद ज़मीनी काम को उन लोगों तक पहुँचाते हैं जो उसका साथ देना चाहते हैं।
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-snow section-y">
        <div className="container-c max-w-3xl">
          <Reveal>
            <p className="eyebrow-index">साझेदारी पूछताछ</p>
            <h2 className="display-2 mt-5 text-balance">अपने काम के बारे में बताएँ।</h2>
            <div className="mt-10 border-t border-ink/12">
              {FORM_SECTIONS.map((s, i) => (
                <div key={s.title} className="grid items-baseline gap-x-8 gap-y-1 border-b border-ink/12 py-5 lg:grid-cols-12">
                  <div className="text-sm font-semibold tabular-nums text-copper-dark lg:col-span-1">0{i + 1}</div>
                  <h3 className="font-semibold lg:col-span-4">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-ink/60 lg:col-span-7">{s.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <FormShell
              formType="partner"
              fields={[
                { name: "org_name", label: "संगठन का नाम", required: true, half: true, placeholder: "अपने संगठन का नाम लिखें" },
                { name: "reg_number", label: "पंजीकरण संख्या", half: true, placeholder: "ट्रस्ट / सोसायटी / धारा 8 पंजीकरण संख्या" },
                { name: "org_address", label: "संगठन का पता", placeholder: "अपने संगठन का पता लिखें" },
                { name: "contact_person", label: "संपर्क व्यक्ति", required: true, half: true, placeholder: "पूरा नाम" },
                { name: "email", label: "ईमेल पता", type: "email", required: true, half: true, placeholder: "अपना ईमेल पता लिखें" },
                { name: "phone", label: "फ़ोन नंबर", type: "tel", half: true, placeholder: "अपना फ़ोन नंबर लिखें" },
                { name: "cause_description", label: "उद्देश्य का संक्षिप्त विवरण", textarea: true, required: true, hint: "आप किस समस्या पर काम कर रहे हैं? किसे लाभ होगा?" },
                { name: "funding_required", label: "आवश्यक धनराशि", half: true, hint: "₹", placeholder: "अनुमानित राशि" },
                { name: "beneficiaries", label: "अनुमानित लाभार्थी", half: true, placeholder: "जैसे 120 जानवर, 50 परिवार" },
              ]}
              submitLabel="साझेदारी अनुरोध भेजें"
              successMessage="धन्यवाद — हम साझेदारी पूछताछ की समीक्षा 5–7 कार्यदिवसों में करते हैं।"
            />
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-c max-w-3xl">
          <Reveal>
            <p className="eyebrow-index">आगे क्या होता है</p>
            <h2 className="display-2 mt-5 text-balance">यह फ़ॉर्म भेजने के बाद।</h2>
          </Reveal>
          <div className="mt-12">
            {NEXT_STEPS.map((s, i) => (
              <Reveal key={s} delay={i * 70}>
                <div className={`flex gap-5 border-t border-ink/12 py-6 ${i === NEXT_STEPS.length - 1 ? "border-b" : ""}`}>
                  <span className="text-sm font-semibold tabular-nums text-copper-dark">0{i + 1}</span>
                  <p className="leading-relaxed text-ink/70">{s}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <p className="max-w-xl text-lg leading-relaxed text-ink/70">
              आपके जैसे संगठन जो रोज़ाना यह काम करते हैं, उनके प्रति हमारे मन में गहरा सम्मान है।
            </p>
            <p className="mt-6 text-sm text-ink/60">
              कोई सवाल है? ईमेल करें{" "}
              <a href={`mailto:${SITE.email}`} className="link-secondary">{SITE.email}</a>{" "}
              या{" "}
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="link-secondary">व्हाट्सऐप</a> पर संदेश भेजें।
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink section-y text-white">
        <div className="container-c max-w-4xl text-center">
          <Reveal>
            <h2 className="display-2 mx-auto max-w-[20ch] text-balance">अच्छे काम को देखा जाना चाहिए।</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">यदि आपका संगठन ज़मीन पर बदलाव ला रहा है, तो सहयोग जुटाने में हमें मदद करके खुशी होगी।</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/hi/donate-now#donation" className="btn-copper">अभी दान करें</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
