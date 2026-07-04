import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "फंडरेज़र",
  description: "अपने जन्मदिन, सालगिरह या फिटनेस चुनौती को बचाए गए जानवरों के लिए भोजन, इलाज और आश्रय में बदलें।",
  alternates: { canonical: "/hi/fundraiser", languages: { en: "/fundraiser", hi: "/hi/fundraiser", "x-default": "/fundraiser" } },
};

const STEPS = [
  { title: "बनाएँ", desc: "अपना फंडरेज़र पेज बनाएँ और अपना लक्ष्य तय करें।" },
  { title: "साझा करें", desc: "आपके फंडरेज़र पेज के साथ एक निजी लिंक आता है जिसे आप दोस्तों और परिवार के साथ साझा कर सकते हैं।" },
  { title: "ट्रैक करें और जश्न मनाएँ", desc: "हम आपको उन जानवरों की तस्वीरें और अपडेट भेजेंगे जिन्हें आपके फंडरेज़र ने खिलाया और ठीक किया।" },
];

const TIERS = [
  { amount: "₹5,000", desc: "हमारे आश्रय में 2–3 जानवरों के लिए पूरे एक महीने का खाना और देखभाल।" },
  { amount: "₹7,000", desc: "एक बचाए गए जानवर के लिए बंध्याकरण, चिकित्सा उपचार और स्वस्थ होने की देखभाल" },
  { amount: "₹10,000", desc: "एक केनेल बनाना या आपातकालीन चिकित्सा उपचार में सहयोग" },
];

const IDEAS = [
  { title: "जन्मदिन फंडरेज़र", quote: "इस साल मैं बचाए गए जानवरों की मदद करके जश्न मना रहा/रही हूँ। मेरे साथ जुड़ेंगे?" },
  { title: "सालगिरह या उपलब्धि", quote: "अपना ख़ास दिन पशु आश्रय को कुछ लौटाकर मना रहे हैं।" },
  { title: "फिटनेस चुनौती", quote: "मेरा हर किलोमीटर एक भूखे सड़क के कुत्ते को खाना खिलाता है। मुझे प्रायोजित करें?" },
];

const FEATURES = [
  { title: "आपका अपना फंडरेज़र पेज", desc: "आपके नाम, संदेश, और दोस्तों-परिवार के साथ साझा करने के आसान तरीके के साथ एक निजी पेज।" },
  { title: "आसान साझाकरण", desc: "एक अनोखा लिंक जिसे आप व्हाट्सऐप, ईमेल या सोशल मीडिया पर भेज सकते हैं।" },
  { title: "लाइव प्रगति ट्रैकिंग", desc: "दान आते ही देखें और अपने फंडरेज़र को लक्ष्य की ओर बढ़ते देखें।" },
  { title: "आश्रय से अपडेट", desc: "उन बचाए गए जानवरों की तस्वीरें और कहानियाँ पाएँ जिनकी आपके फंडरेज़र ने मदद की।" },
  { title: "दानदाताओं के लिए कर रसीदें", desc: "हर दानदाता को तुरंत रसीद और, जहाँ योग्य हो, 80G प्रमाणपत्र मिलता है।" },
];

export default function FundraiserHiPage() {
  return (
    <div lang="hi" style={{ fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' }}>
      <section className="bg-snow pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">बचाए गए जानवरों के लिए फंड जुटाएँ</p>
            <h1 className="display-1 mt-6 text-balance" style={{ lineHeight: 1.2 }}>अपने जन्मदिन को किसी जानवर के लिए जीवनरेखा बनाएँ।</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink">
              एक जन्मदिन, एक सालगिरह, कोई दौड़ जिसकी आप तैयारी कर रहे हैं — अपने प्रियजनों से कहें कि वे आपको एक और तोहफ़ा देने के बजाय किसी बचाए गए जानवर को खिलाने और ठीक करने में मदद करें।
            </p>
            <div className="mt-9">
              <Link href="/hi/fundraiser/create" className="btn-copper">अपना फंडरेज़र शुरू करें</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">यह कैसे काम करता है</p>
            <h2 className="display-2 mt-5 max-w-[14ch] text-balance">तीन सरल कदम।</h2>
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

      <section className="bg-snow section-y">
        <div className="container-c grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow-index">पैसा कहाँ जाता है</p>
            <h2 className="display-2 mt-5 text-balance">आपका फंडरेज़र किसका साथ देगा?</h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/65">
              जब आप अपना फंडरेज़र बनाते हैं, तो आप इन जैसी वास्तविक ज़रूरतों का साथ दे सकते हैं।
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

      <section className="section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">लोकप्रिय फंडरेज़र विचार</p>
            <h2 className="display-2 mt-5 max-w-[18ch] text-balance">एक वजह चुनें। बाकी हम संभाल लेंगे।</h2>
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

      <section className="bg-snow section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">आपको क्या मिलता है</p>
            <h2 className="display-2 mt-5 max-w-[18ch] text-balance">एक पेज, एक लिंक, और प्रमाण कि यह काम आया।</h2>
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
        </div>
      </section>

      <section className="bg-ink section-y text-white">
        <div className="container-c max-w-4xl text-center">
          <Reveal>
            <h2 className="display-2 mx-auto max-w-[20ch] text-balance">एक जश्न। ढेर सारे भरे पेट।</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">हर रुपया सीधे उस आश्रय में जाता है जिसे हम चलाते और देखते हैं — भोजन, पशु-चिकित्सा देखभाल, और सोने के लिए एक सुरक्षित जगह।</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/hi/fundraiser/create" className="btn-copper">अपना फंडरेज़र शुरू करें</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
