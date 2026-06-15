import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import FormShell from "@/components/FormShell";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "CSR साझेदारी",
  description:
    "RKM फाउंडेशन के साथ साझेदारी करें — एक CSR-1 पंजीकृत कार्यान्वयन साझेदार (80G | 12A) जो ऐसे पशु-कल्याण कार्यक्रम चलाता है जिन्हें आप देख और सत्यापित कर सकते हैं।",
  alternates: { canonical: "/hi/csr" },
};

const WHY = [
  { title: "पूर्णतः अनुपालक", desc: "Schedule VII के अनुरूप, उपयोग प्रमाणपत्रों के साथ।" },
  { title: "पारदर्शी", desc: "पूरे समय प्रलेखित रिपोर्टिंग और मैदान से अपडेट।" },
  { title: "अनुकूलित", desc: "आपकी CSR नीति और भूगोल के अनुरूप।" },
  { title: "सहभागी", desc: "कर्मचारी स्वयंसेवा के अवसर अंतर्निहित।" },
];

const PILLARS = [
  { n: "01", name: "मेरा स्वयं", desc: "स्वास्थ्य और कल्याण — चिकित्सा सहायता और समग्र भलाई।" },
  { n: "02", name: "मेरे लोग", desc: "समुदाय, शिक्षा, पोषण और वंचित वर्गों के लिए आवश्यक संसाधन।" },
  { n: "03", name: "मेरे जानवर", desc: "बचाव, टीकाकरण, आश्रय और दीर्घकालिक कल्याण — हमारा प्रमुख कार्य।" },
  { n: "04", name: "मेरा पर्यावरण", desc: "वृक्षारोपण, स्वच्छता अभियान, संरक्षण और स्थिरता।" },
  { n: "05", name: "मेरा धर्म (मानवता)", desc: "आपदा राहत, भोजन और चिकित्सा सहायता, करुणामय देखभाल।" },
  { n: "06", name: "मेरा देश", desc: "ग्रामीण विकास, कौशल-निर्माण और समावेशी विकास।" },
  { n: "07", name: "मेरा विश्व", desc: "अंतर्राष्ट्रीय राहत और सीमा-पार मानवीय सहायता।" },
];

const PROCESS = [
  { title: "जुड़ें", desc: "अपने CSR लक्ष्य साझा करें और हम परामर्श तय करते हैं।" },
  { title: "अनुकूलित करें", desc: "कार्यक्रम आपकी CSR नीति और बजट के अनुरूप डिज़ाइन किया जाता है।" },
  { title: "क्रियान्वयन", desc: "हम कार्यान्वयन करते हैं, रिपोर्ट देते हैं, और मापनीय परिणाम प्रलेखित करते हैं।" },
];

const DELIVERABLES = ["उपयोग प्रमाणपत्र", "प्रभाव सारांश", "ऑडिट सहायता दस्तावेज़", "स्थल यात्रा (यदि आवश्यक हो)"];

const DOWNLOADS = [
  { kind: "PDF", title: "साझेदारी अवलोकन", desc: "कार्यक्रम डिज़ाइन, अनुपालन और रिपोर्टिंग एक नज़र में।", file: "RKM_Foundation_CSR_Partnership_Overview.pdf" },
  { kind: "ZIP", title: "पंजीकरण प्रमाणपत्र", desc: "80G, 12A और CSR-1 प्रमाणपत्र एक साथ।", file: "RKM_Foundation_Registration_Certificates.zip" },
];

export default function CSRHiPage() {
  return (
    <div lang="hi" style={{ fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' }}>
      <section className="bg-snow pb-14 pt-28 sm:pb-20 sm:pt-32">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">CSR साझेदारी · CSR-1 · 80G · 12A</p>
            <h1 className="display-2 mt-5 text-balance">ऐसा CSR फंड जो वहीं पहुँचे जहाँ आप देख सकें।</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/65">
              एक CSR-1 पंजीकृत कार्यान्वयन साझेदार (80G | 12A)। हम ऐसे पशु-कल्याण कार्यक्रम चलाते हैं जिन्हें आपकी टीम विश्वास के साथ देख, ऑडिट और रिपोर्ट कर सकती है।
            </p>
            <div className="mt-8">
              <Link href="#consultation" className="btn-copper">साझेदारी परामर्श का अनुरोध करें</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">कॉर्पोरेट RKM को क्यों चुनते हैं</p>
            <h2 className="display-2 mt-5 max-w-[18ch] text-balance">कागज़ पर अनुपालक। ज़मीन पर दृश्यमान।</h2>
          </Reveal>
          <div className="mt-16 grid gap-x-16 gap-y-12 sm:grid-cols-2">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 70}>
                <div className="flex gap-5">
                  <span className="mt-1 text-sm font-semibold tabular-nums text-copper-dark">0{i + 1}</span>
                  <div>
                    <h3 className="display-3 text-[1.35rem] sm:text-[1.5rem]">{w.title}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-ink/65">{w.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-snow section-y">
        <div className="container-c">
          <Reveal className="max-w-3xl">
            <p className="eyebrow-index">सतत अवसर</p>
            <h2 className="display-2 mt-5 text-balance">पशु कल्याण (Schedule VII)।</h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink">
              30 बचाए गए कुत्तों और बिल्लियों के लिए एक स्थायी आश्रय — एक वास्तविक जगह जहाँ आपकी टीम चल-फिर सकती है। साझेदार पूर्ण या आंशिक योगदान दे सकते हैं; विस्तृत योजना परामर्श के दौरान साझा की जाती है।
            </p>
            <div className="mt-9">
              <Link href="#consultation" className="btn-dark">इस अवसर पर चर्चा करें</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">किसी भी स्तंभ पर कार्यक्रम डिज़ाइन करें</p>
            <h2 className="display-2 mt-5 max-w-[14ch] text-balance">उम्मीद के सात स्तंभ।</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/65">
              हर स्तंभ कंपनी अधिनियम, 2013 की Schedule VII से मेल खाता है — ताकि आपका CSR योगदान पूर्णतः अनुपालक रहे और आपका पैसा वहाँ लगे जो आपके लिए मायने रखता है।
            </p>
          </Reveal>
          <div className="mt-12 border-t border-ink/12">
            {PILLARS.map((p, i) => (
              <Reveal key={p.name} delay={i * 50}>
                <div className="grid items-baseline gap-x-8 gap-y-2 border-b border-ink/12 py-6 lg:grid-cols-12">
                  <span className="text-sm font-semibold tabular-nums text-copper-dark lg:col-span-1">{p.n}</span>
                  <h3 className="display-3 text-[1.3rem] lg:col-span-4">{p.name}</h3>
                  <p className="leading-relaxed text-ink/65 lg:col-span-7">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6">
            <p className="max-w-3xl text-xs leading-relaxed text-ink/45">
              स्तंभ-मानचित्रण यह दर्शाते हैं कि प्रत्येक कार्यक्रम किस Schedule VII श्रेणी के इर्द-गिर्द डिज़ाइन किया गया है। CSR-योग्य गतिविधियाँ कंपनी (CSR नीति) नियम, 2014 के अनुसार भारत में की जाती हैं; अंतिम खंड वर्गीकरण आपकी टीम के साथ कार्यक्रम डिज़ाइन के दौरान पुष्ट किया जाता है।
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-snow section-y">
        <div className="container-c grid gap-x-16 gap-y-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow-index">सरल साझेदारी प्रक्रिया</p>
            <h2 className="display-2 mt-5 text-balance">पहली बातचीत से लेकर एक ऐसी परियोजना तक जिसे आप देख सकें।</h2>
            <div className="mt-10">
              {PROCESS.map((p, i) => (
                <div key={p.title} className={`flex gap-5 border-t border-ink/12 py-6 ${i === PROCESS.length - 1 ? "border-b" : ""}`}>
                  <span className="text-sm font-semibold tabular-nums text-copper-dark">0{i + 1}</span>
                  <div>
                    <h3 className="display-3 text-[1.3rem]">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink/65">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow-index">समयरेखा और परिणाम</p>
            <h2 className="display-2 mt-5 text-balance">ऐसे दस्तावेज़ जिनके लिए आपकी वित्त टीम आपको धन्यवाद देगी।</h2>
            <p className="mt-8 text-sm font-medium uppercase tracking-[0.16em] text-ink/55">सामान्य परियोजना योजना समयरेखा</p>
            <p className="display-2 mt-2 text-copper-dark">2–6 सप्ताह</p>
            <p className="mt-8 text-sm font-medium uppercase tracking-[0.16em] text-ink/55">परिणामों में शामिल हो सकते हैं</p>
            <ul className="mt-3 border-t border-ink/12">
              {DELIVERABLES.map((d) => (
                <li key={d} className="flex items-center gap-3 border-b border-ink/12 py-3.5 text-ink/70">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="shrink-0 text-copper-dark" aria-hidden><path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">डाउनलोड</p>
            <h2 className="display-2 mt-5 text-balance">साझेदारी जानकारी।</h2>
          </Reveal>
          <div className="mt-12 border-t border-ink/12">
            {DOWNLOADS.map((d, i) => (
              <Reveal key={d.file} delay={i * 70}>
                <a href={`/downloads/${d.file}`} className="group grid items-center gap-x-8 gap-y-2 border-b border-ink/12 py-7 transition-colors hover:text-copper-dark lg:grid-cols-12">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-copper-dark/80 lg:col-span-1">{d.kind}</span>
                  <h3 className="display-3 text-[1.4rem] lg:col-span-4">{d.title}</h3>
                  <p className="leading-relaxed text-ink/65 lg:col-span-6">{d.desc}</p>
                  <span className="text-sm font-semibold lg:col-span-1 lg:text-right">डाउनलोड →</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="consultation" className="bg-snow section-y scroll-mt-24">
        <div className="container-c max-w-3xl">
          <Reveal>
            <p className="eyebrow-index">परामर्श का अनुरोध करें</p>
            <h2 className="display-2 mt-5 text-balance">अपने CSR लक्ष्य बताएँ। हम कार्यक्रम बनाएँगे।</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65">
              कृपया नीचे अपना विवरण साझा करें, और हमारी टीम चर्चा आगे बढ़ाने के लिए आपसे संपर्क करेगी।
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <FormShell
              formType="csr"
              fields={[
                { name: "name", label: "पूरा नाम", required: true, half: true, placeholder: "अपना पूरा नाम लिखें" },
                { name: "phone", label: "संपर्क नंबर", type: "tel", required: true, half: true, placeholder: "अपना मोबाइल नंबर लिखें" },
                { name: "email", label: "ईमेल आईडी", type: "email", required: true, half: true, placeholder: "अपना ईमेल पता लिखें" },
                { name: "company", label: "कंपनी का नाम", required: true, half: true, placeholder: "अपनी कंपनी का नाम लिखें" },
                { name: "pillar", label: "रुचि का स्तंभ", options: ["मेरा स्वयं", "मेरे लोग", "मेरे जानवर", "मेरा पर्यावरण", "मेरा धर्म (मानवता)", "मेरा देश", "मेरा विश्व", "बहु-स्तंभ"] },
                { name: "budget", label: "सांकेतिक CSR बजट", options: ["₹5 लाख से कम", "₹5–25 लाख", "₹25 लाख–1 करोड़", "₹1 करोड़ से अधिक", "चर्चा करना चाहेंगे"] },
                { name: "message", label: "संदेश", textarea: true, placeholder: "अपने CSR लक्ष्यों के बारे में बताएँ" },
              ]}
              submitLabel="पूछताछ भेजें"
              successMessage="हमसे जुड़ने के लिए धन्यवाद। हमारी टीम आपके अनुरोध की समीक्षा कर जल्द ही आपसे संपर्क करेगी।"
              note="आपकी जानकारी गोपनीय है। हमारी गोपनीयता नीति देखें।"
            />
          </Reveal>
          <Reveal delay={160} className="mt-8">
            <p className="text-sm text-ink/60">
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
            <h2 className="display-2 mx-auto max-w-[20ch] text-balance">अपना CSR वहाँ लगाएँ जहाँ आप देख सकें।</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">पशु कल्याण, पूर्णतः अनुपालक, और देखने योग्य। आइए आपकी नीति के इर्द-गिर्द एक कार्यक्रम बनाएँ।</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="#consultation" className="btn-copper">परामर्श का अनुरोध करें</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
