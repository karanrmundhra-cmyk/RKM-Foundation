import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

/**
 * Hindi homepage (हिंदी). Self-contained, server-rendered version of the home
 * page — same design system (classes), same structure & imagery, content in
 * Hindi. Kept separate from the English components so the live English site is
 * never affected. Registration codes (12A/80G/PAN/DARPAN) stay unchanged.
 *
 * Translations are natural Hindi; recommend a native-speaker review before
 * wide promotion, and professional translation for legal pages.
 */

const HI_FONT = '"Noto Sans Devanagari", Inter, system-ui, sans-serif';

const WWD = [
  { word: "बचाव", n: "01", label: "सड़कों पर", desc: "जहाँ भी कोई जानवर घायल हो, हम वहाँ पहुँचते हैं — सड़क, नाली, कहीं भी।", src: "/images/site/street.jpg", alt: "RKM फाउंडेशन की देखभाल में एक बचाया गया सड़क का कुत्ता" },
  { word: "भोजन", n: "02", label: "हर एक दिन", desc: "हमारी देखभाल में मौजूद हर जानवर के लिए, हर दिन गर्म भोजन।", src: "/images/site/feed.jpg", alt: "एक खुश, भरपेट बचाया गया कुत्ता" },
  { word: "इलाज", n: "03", label: "भरोसेमंद पशु-चिकित्सकों के साथ", desc: "घावों की मरहम-पट्टी, सर्जरी का खर्च — पूरी तरह ठीक होने तक संपूर्ण पशु-चिकित्सा देखभाल।", src: "/images/site/heal.jpg", alt: "RKM आश्रय में पशु-चिकित्सा प्राप्त करता एक बचाया गया कुत्ता" },
  { word: "आश्रय", n: "04", label: "विश्राम की जगह", desc: "आराम करने और स्वस्थ होने के लिए एक सुरक्षित, शांत जगह।", src: "/images/site/rest.jpg", alt: "RKM फाउंडेशन के आश्रय में विश्राम करता एक बचाया गया कुत्ता" },
];

const TRUST = [
  { title: "आप देखते हैं पैसा कहाँ जाता है", desc: "हर अभियान के बाद मैदान से तस्वीरें और वीडियो।" },
  { title: "पंजीकृत और कर-कटौती योग्य", desc: "12A, 80G और CSR के तहत पंजीकृत ट्रस्ट। हर दान की रसीद मिलती है।" },
  { title: "खुद आकर देखिए", desc: "किसी भोजन अभियान में शामिल हों या आश्रय देखने आएँ। हमारे दरवाज़े खुले हैं।" },
];

const CERTS = [
  { label: "12A पंजीकृत", file: "RKM_Foundation_12A_Certificate.pdf" },
  { label: "80G कर लाभ", file: "RKM_Foundation_80G_Certificate.pdf" },
  { label: "CSR योग्य", file: "RKM_Foundation_CSR_Certificate.pdf" },
  { label: "DARPAN पंजीकृत", file: "RKM_Foundation_Darpan_Registration.pdf" },
];

const GIFTS = [
  { value: "₹2,500", desc: "दो हफ़्ते का गर्म खाना — एक बचाए गए जानवर के लिए जो फिर से खड़ा हो रहा है।", cta: "₹2,500 दें" },
  { value: "₹5,000", desc: "हमारे आश्रय में 2–3 जानवरों के लिए पूरे एक महीने का खाना और देखभाल।", cta: "₹5,000 दें" },
  { value: "₹10,000", desc: "आपातकालीन चिकित्सा — वह सर्जरी या देखभाल जो एक जान बचाती है।", cta: "₹10,000 दें" },
];

export function HomeHi() {
  return (
    <div lang="hi" style={{ fontFamily: HI_FONT }}>
      {/* HERO */}
      <section className="relative flex min-h-[90svh] items-end overflow-hidden bg-ink text-white">
        <Image src="/images/site/dog.jpg" alt="RKM फाउंडेशन की देखभाल में एक बचाया गया कुत्ता" fill priority sizes="100vw" className="hero-zoom object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/5" />
        <div className="container-c relative pb-24 pt-40 sm:pb-28">
          <p className="eyebrow-index !text-copper-light before:!bg-copper-light/70">पशु कल्याण · भारत</p>
          <h1 className="display-1 mt-6 max-w-[18ch] text-balance" style={{ lineHeight: 1.18 }}>
            वे मदद नहीं माँग सकते। <span className="text-copper-light">आप दे सकते हैं।</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
            हर दिन हम भारत की सड़कों पर रहने वाले जानवरों को बचाते, खिलाते, उनका इलाज करते और उन्हें आश्रय देते हैं — और हम आपको दिखाएँगे कि आपकी दयालुता ने किसकी ज़िंदगी बदली।
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/hi/donate-now#donation" className="btn-copper">अभी दान करें</Link>
            <Link href="/hi/fundraiser" className="btn bg-white/10 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/20">फंडरेज़र शुरू करें</Link>
          </div>
          <p className="mt-7 text-xs uppercase tracking-[0.18em] text-white/55">12A · 80G · CSR — दान कर-कटौती के योग्य हैं</p>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="bg-snow section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">हम क्या करते हैं</p>
            <h2 className="display-2 mt-5 max-w-[20ch] text-balance">जानवरों के लिए हम चार तरह से साथ खड़े रहते हैं।</h2>
          </Reveal>
          <div className="mt-10 sm:mt-14">
            {WWD.map((r, i) => {
              const imageLeft = i % 2 === 1;
              return (
                <div key={r.word} className={`grid items-center gap-y-8 gap-x-10 border-t border-ink/10 py-12 sm:py-16 lg:grid-cols-12 ${i === WWD.length - 1 ? "border-b" : ""}`}>
                  <Reveal delay={80} className={`lg:col-span-6 ${imageLeft ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="figure-frame aspect-[16/10]"><Image src={r.src} alt={r.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
                  </Reveal>
                  <Reveal className={`lg:col-span-6 ${imageLeft ? "lg:order-2 lg:pl-6" : "lg:order-1 lg:pr-6"}`}>
                    <div className="flex items-baseline gap-4">
                      <span className="text-sm font-semibold tabular-nums text-copper-dark">{r.n}</span>
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink/65">{r.label}</span>
                    </div>
                    <h3 className="editorial-word mt-3 text-ink">{r.word}</h3>
                    <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/65">{r.desc}</p>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="section-y">
        <div className="container-c grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="order-2 lg:order-1 lg:col-span-5">
            <div className="figure-frame aspect-[4/5]"><Image src="/images/site/care.jpg" alt="टोबलर, वह कुत्ता जिसने RKM फाउंडेशन को प्रेरित किया" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" /></div>
          </Reveal>
          <Reveal delay={100} className="order-1 lg:order-2 lg:col-span-7 lg:pl-4">
            <p className="eyebrow-index">इसकी शुरुआत कैसे हुई</p>
            <h2 className="display-2 mt-5 text-balance">इसकी शुरुआत हमारे कुत्ते टोबलर से हुई।</h2>
            <p className="mt-7 max-w-xl text-xl leading-relaxed text-ink sm:text-2xl">
              जब टोबलर बीमार पड़ा, हमने पशु-चिकित्सालय में लंबी रातें बिताईं। जो बात मन में रह गई वह थे वे अजनबी जो लगातार आते रहे — किसी घायल कुत्ते या बिल्ली को उठाकर लाते, और फिर पता चलता कि इलाज का खर्च उनकी क्षमता से ज़्यादा है।
            </p>
            <blockquote className="mt-8 max-w-lg text-2xl font-medium leading-snug tracking-tight text-ink/90 sm:text-3xl">
              &ldquo;ये जानवर उनके अपने भी नहीं थे। लोग बस किसी घायल को यूँ ही छोड़कर नहीं जा पाते थे। हमने सोचा, कम से कम हम वह हिस्सा तो संभाल ही सकते हैं जो वे नहीं कर पाते।&rdquo;
            </blockquote>
            <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink/65">— मुंधड़ा परिवार</p>
            <Link href="/hi/blog/the-dog-who-started-it-all" className="link-secondary mt-7 inline-block text-sm">टोबलर की पूरी कहानी पढ़ें →</Link>
          </Reveal>
        </div>
      </section>

      {/* WHY TRUST */}
      <section className="bg-snow section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">RKM फाउंडेशन पर भरोसा क्यों करें</p>
            <h2 className="display-2 mt-5 max-w-[22ch] text-balance">विश्वास के साथ दें। आप जो बदलाव लाते हैं उसे देखें।</h2>
          </Reveal>
          <div className="mt-16 grid gap-x-16 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {TRUST.map((t, i) => (
              <Reveal key={t.title} delay={i * 70}>
                <div className="flex gap-5">
                  <span className="mt-1 text-sm font-semibold tabular-nums text-copper-dark">0{i + 1}</span>
                  <div>
                    <h3 className="display-3 text-[1.35rem] sm:text-[1.5rem]">{t.title}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-ink/65">{t.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-20 border-t border-ink/10 pt-14">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="eyebrow-index">पंजीकृत और पारदर्शी</p>
                <h3 className="display-3 mt-4">हर रुपये का हिसाब है।</h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/65">पंजीकरण E-30560 — हर प्रमाणपत्र डाउनलोड किया जा सकता है।</p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 lg:justify-end">
                {CERTS.map((c) => (
                  <a key={c.label} href={`/downloads/${c.file}`} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink/75 ring-1 ring-ink/10 transition-colors hover:text-copper-dark hover:ring-copper/50">
                    {c.label}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="M12 4v12m0 0 4-4m-4 4-4-4M5 20h14" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GIFT */}
      <section className="section-y">
        <div className="container-c">
          <Reveal className="max-w-2xl">
            <p className="eyebrow-index">आपका दान क्या करता है</p>
            <h2 className="display-2 mt-5 text-balance">कोई अस्पष्ट वादे नहीं।</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/65">यहाँ है कि आपका पैसा वास्तव में क्या ख़रीदता है — और हम आपको वह ज़िंदगी दिखाएँगे जो इसने बदली।</p>
          </Reveal>
          <div className="mt-12">
            {GIFTS.map((g, i) => (
              <Reveal key={g.value} delay={i * 70}>
                <div className={`grid grid-cols-1 items-center gap-x-8 gap-y-4 border-t border-ink/12 py-9 sm:grid-cols-[auto_1fr_auto] ${i === GIFTS.length - 1 ? "border-b" : ""}`}>
                  <div className="display-3 text-copper-dark sm:min-w-[5ch]">{g.value}</div>
                  <p className="text-base leading-relaxed text-ink/70">{g.desc}</p>
                  <Link href="/hi/donate-now#donation" className="btn-dark whitespace-nowrap">{g.cta}</Link>
                </div>
              </Reveal>
            ))}
          </div>
          <Link href="/hi/donate-now#donation" className="link-secondary mt-6 inline-block">अपनी पसंद की कोई भी राशि दें →</Link>
          <p className="mt-4 text-xs uppercase tracking-[0.14em] text-ink/65">256-बिट सुरक्षित · Razorpay · तुरंत 80G रसीद</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink section-y text-white">
        <div className="container-c max-w-4xl text-center">
          <Reveal>
            <h2 className="display-2 mx-auto max-w-[22ch] text-balance">कहीं न कहीं, कोई जानवर इंतज़ार कर रहा है।</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">वह आपका नाम नहीं जानता। उसे बस किसी के साथ खड़े होने की ज़रूरत है। आज, वह आप हो सकते हैं।</p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <Link href="/hi/donate-now#donation" className="btn-copper">अभी दान करें</Link>
              <Link href="/hi/fundraiser" className="text-sm font-semibold text-white/75 underline decoration-copper decoration-2 underline-offset-4 transition-colors hover:text-white">या फंडरेज़र शुरू करें →</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
