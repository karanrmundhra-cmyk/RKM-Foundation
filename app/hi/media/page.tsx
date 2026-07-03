import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "मीडिया",
  description: "हर RKM फाउंडेशन बचाव के पीछे के दानदाता, स्वयंसेवक, पशु-चिकित्सक और पड़ोसी — उनके अपने शब्दों में।",
  alternates: { canonical: "/hi/media", languages: { en: "/media", hi: "/hi/media", "x-default": "/media" } },
};

const TESTIMONIALS = [
  { quote: "मासिक दान आख़िरकार मुझे यहाँ समझ आया। पशु कल्याण पर ध्यान देने का मतलब है कि मैं साफ़ देख सकता हूँ कि मेरा सहयोग कहाँ जाता है। अपडेट और छोटी-छोटी बातें आपको शामिल महसूस कराती हैं।", name: "राघव डागा", place: "कोलकाता", context: "मासिक दानदाता", img: "/images/testimonials/raghav-daga.jpeg" },
  { quote: "एक कामकाजी माँ के रूप में, मैं बिना दबाव महसूस किए कुछ लौटाना चाहती थी। मासिक योजना ने इसे आसान बनाया, और मैदान में जाकर यह व्यक्तिगत लगा।", name: "श्वेता देसाई", place: "मुंबई", context: "मासिक दानदाता", img: "/images/testimonials/shweta-desai.jpg" },
  { quote: "मैं आमतौर पर पैसे नहीं, सामान दान करता हूँ। पिकअप आसान था, और एक छोटी-सी गड़बड़ी को भी शांति से संभाला गया। जो बात अलग थी वह यह कि टीम कितनी सम्मानजनक और तत्पर थी।", name: "अंकित पालन", place: "मुंबई", context: "वस्तु-रूप दानदाता", img: "/images/testimonials/ankit-palan.jpeg" },
  { quote: "मुझे खुद शामिल होना पसंद है। मुझे खुद जानवरों को खिलाने का न्योता मिला, और जब मैं बाद में नहीं आ सका, तो मुझे एक वीडियो कॉल पर शामिल किया गया। सच में वहाँ होने जैसा लगा।", name: "आदित्य मोहत्ता", place: "ठाणे", context: "सक्रिय स्वयंसेवक", img: "/images/testimonials/aditya-mohatta.jpeg" },
  { quote: "एक पशु-चिकित्सक के रूप में, मैं गहराई से सराहता हूँ कि कैसे बृंदा खुद आवारा जानवरों की मदद के लिए समन्वय करती और मौजूद रहती हैं। उनके आसपास जानवर जो देखभाल और शांति दिखाते हैं, वह बहुत कुछ कहता है।", name: "डॉ. किरण शेलार", place: "पशु-चिकित्सक", context: "साझेदार पशु-चिकित्सक", img: "/images/testimonials/kiran-shelar.webp" },
];

const UPDATES = [
  { title: "फ़ोटो और वीडियो अपडेट", desc: "दानदाताओं को मैदान से समय-समय पर फ़ोटो और छोटे वीडियो मिलते हैं, ताकि आप उन बचाए गए जानवरों को देख सकें जिन्हें आपका सहयोग खिलाता और इलाज करता है।" },
  { title: "मैदानी यात्रा के निमंत्रण", desc: "हम समर्थकों का भोजन अभियानों और आश्रय यात्राओं में स्वागत करते हैं। जब आप खुद नहीं आ पाते, हम आपको वीडियो कॉल पर शामिल कर लेते हैं।" },
  { title: "वार्षिक पारदर्शिता रिपोर्ट", desc: "हम हर साल फ़ॉर्म 10BD दाख़िल करते और 10BE प्रमाणपत्र जारी करते हैं, और बताते हैं कि धन का उपयोग कैसे हुआ — स्पष्ट शासन, ज़िम्मेदार रिपोर्टिंग।" },
];

export default function MediaHiPage() {
  return (
    <div lang="hi" style={{ fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' }}>
      <section className="bg-snow pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">मीडिया</p>
            <h1 className="display-1 mt-6 text-balance" style={{ lineHeight: 1.2 }}>वे लोग जो जानवरों के लिए साथ खड़े होते हैं।</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink">
              हर बचाव और हर भोजन के पीछे के दानदाता, स्वयंसेवक, पशु-चिकित्सक और पड़ोसी — अपने ही शब्दों में बताते हुए कि वे बार-बार क्यों लौटकर आते हैं।
            </p>
            <div className="mt-8 flex flex-wrap gap-5 text-sm">
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="link-secondary">इंस्टाग्राम</a>
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="link-secondary">फ़ेसबुक</a>
              <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" className="link-secondary">लिंक्डइन</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">उनके अपने शब्दों में</p>
            <h2 className="display-2 mt-5 max-w-[16ch] text-balance">काम के पीछे के लोग।</h2>
          </Reveal>
          <div className="mt-16 border-t border-ink/12">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={(i % 2) * 80}>
                <figure className="grid gap-x-12 gap-y-6 border-b border-ink/12 py-12 lg:grid-cols-12 lg:py-16">
                  <span className="text-sm font-semibold tabular-nums text-copper-dark lg:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                  <blockquote className="lg:col-span-8">
                    <p className="text-2xl font-medium leading-snug tracking-tight text-ink/90 sm:text-3xl">&ldquo;{t.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="flex items-center gap-3 lg:col-span-3 lg:flex-col lg:items-start lg:gap-2">
                    <Image src={t.img} alt={`${t.name} का चित्र`} width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-sm text-ink/65">{t.place}</div>
                      <div className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-copper-dark">{t.context}</div>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-snow section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">हम आपको कैसे जोड़े रखते हैं</p>
            <h2 className="display-2 mt-5 max-w-[16ch] text-balance">हर समर्थक को क्या मिलता है।</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/65">
              सहयोग कभी किसी बंद डिब्बे जैसा नहीं लगना चाहिए। नियमित रूप से हम आपके साथ यह साझा करते हैं।
            </p>
          </Reveal>
          <div className="mt-14">
            {UPDATES.map((u, i) => (
              <Reveal key={u.title} delay={i * 70}>
                <div className={`grid items-baseline gap-x-8 gap-y-3 border-t border-ink/10 py-8 lg:grid-cols-12 ${i === UPDATES.length - 1 ? "border-b" : ""}`}>
                  <div className="text-sm font-semibold tabular-nums text-copper-dark lg:col-span-1">0{i + 1}</div>
                  <h3 className="display-3 text-[1.4rem] lg:col-span-4">{u.title}</h3>
                  <p className="leading-relaxed text-ink/65 lg:col-span-7">{u.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink section-y text-white">
        <div className="container-c max-w-4xl text-center">
          <Reveal>
            <h2 className="display-2 mx-auto max-w-[20ch] text-balance">वह बनें जो साथ खड़ा होता है।</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">कोई जानवर है जिसकी कहानी अभी लिखी नहीं गई। आप वह वजह हो सकते हैं जिससे उसका अंत सुखद हो।</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/hi/donate-now#donation" className="btn-copper">अभी दान करें</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
