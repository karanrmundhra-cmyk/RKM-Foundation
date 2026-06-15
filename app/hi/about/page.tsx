import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import EditorialFigure from "@/components/EditorialFigure";
import TeamProfiles from "@/components/TeamProfiles";

export const metadata: Metadata = {
  title: "हमारे बारे में",
  description: "RKM फाउंडेशन भारत में एक पशु-कल्याण धर्मार्थ ट्रस्ट है। एक परिवार जिसने घर पर जानवरों की मदद करनी शुरू की, और करता रहा।",
  alternates: { canonical: "/hi/about" },
};

const VALUES = [
  { title: "करुणा सर्वप्रथम", desc: "हमने अपनी ही इमारत में जानवरों को खिलाकर शुरुआत की। पैमाना बढ़ा; भावना नहीं बदली।" },
  { title: "पूरी पारदर्शिता", desc: "मैदान से फ़ोटो और वीडियो अपडेट। हर प्रमाणपत्र सार्वजनिक। हर सवाल का जवाब।" },
  { title: "शांत निरंतरता", desc: "2014 में पंजीकृत, हमने सालों तक बिना अभियानों या घोषणाओं के काम किया — बस रोज़ाना देखभाल।" },
  { title: "समुदाय से संचालित", desc: "दानदाता, स्वयंसेवक, पशु-चिकित्सक और पड़ोसी — बदलाव तब होता है जब परवाह करने वाले लोग एक-दूसरे को पाते हैं।" },
];

const ROLES = [
  { title: "समय देने वाले", virtues: "Seva · Karuna · Daya · Maitri", desc: "भोजन अभियानों, आश्रय यात्राओं और बचाव में स्वयंसेवा करें।", cta: "अभी स्वयंसेवा करें", href: "/hi/other-ways-to-give" },
  { title: "धन देने वाले", virtues: "Daana · Shraddha · Tyaag · Vishwaas", desc: "भोजन, इलाज और आश्रय का खर्च उठाएँ — और देखें यह कहाँ जाता है।", cta: "अभी दान करें", href: "/hi/donate-now" },
  { title: "प्रदाता", virtues: "Sahyog · Sahara · Paropkar", desc: "सामग्री दान करें — भोजन, दवाइयाँ, कंबल, सामान। हम पिकअप की व्यवस्था करते हैं।", cta: "वस्तु-रूप में दें", href: "/hi/other-ways-to-give" },
  { title: "मार्गदर्शक", virtues: "Vidya Daan · Guru Bhav · Kaushal", desc: "पेशेवर कौशल साझा करें — पशु-चिकित्सा, कानूनी, डिज़ाइन, संचालन।", cta: "अपने कौशल साझा करें", href: "/hi/other-ways-to-give" },
  { title: "उद्देश्य की आवाज़", virtues: "Prerna · Chetna · Uddeshya", desc: "मिशन को आगे बढ़ाएँ — कहानियाँ साझा करें, बातचीत शुरू करें, उम्मीद फैलाएँ।", cta: "उम्मीद फैलाने में मदद करें", href: "/hi/other-ways-to-give" },
];

export default function AboutHiPage() {
  return (
    <div lang="hi" style={{ fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' }}>
      <section className="bg-snow pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="container-c grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow-index">RKM फाउंडेशन के बारे में</p>
            <h1 className="display-3 mt-5 max-w-[24ch] text-balance">हम एक परिवार हैं जिसने जानवरों की मदद करनी शुरू की, और करता रहा।</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65">
              RKM फाउंडेशन की शुरुआत घर से हुई — अपनी गली के सड़क के जानवरों को खिलाना, घायलों को पशु-चिकित्सक तक पहुँचाना, और ज़रूरत के समय उनके साथ रहना। जिसे हम अनदेखा नहीं कर सके, वह धीरे-धीरे एक पंजीकृत धर्मार्थ ट्रस्ट बन गया।
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/65">
              समय के साथ हम और भी मदद करना चाहते हैं — लोग, पर्यावरण, और उससे आगे। फिलहाल, हम वहीं केंद्रित हैं जहाँ हम सबसे उपयोगी हो सकते हैं:{" "}
              <strong className="text-ink">जानवरों की देखभाल।</strong>
            </p>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <EditorialFigure src="/images/site/about.jpg" alt="RKM फाउंडेशन की देखभाल में एक बचाया गया कुत्ता" ratio="aspect-[4/5]" parallax speed={0.06} priority />
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-c max-w-3xl">
          <Reveal>
            <p className="eyebrow-index justify-center">इसकी शुरुआत कैसे हुई</p>
            <h2 className="display-2 mt-5 text-center text-balance">इसकी शुरुआत हमारे कुत्ते टोबलर से हुई।</h2>
            <div className="mt-8 space-y-5 leading-relaxed text-ink/75">
              <p>
                कई साल पहले, हमारा पग टोबलर बीमार पड़ा, और हमने एक पशु-चिकित्सालय में उसके पास कुछ लंबी रातें बिताईं। जो बात हमें बार-बार दिखती रही वह दूसरे मरीज़ नहीं थे — वे दरवाज़े पर खड़े लोग थे। ज़्यादातर अजनबी: उन्हें सड़क पर कोई घायल कुत्ता या बिल्ली मिली थी और वे उसे उठाकर ले आए थे, इसलिए नहीं कि वह उनका था, बल्कि इसलिए कि वे उसे यूँ ही छोड़कर नहीं जा सके।
              </p>
              <p>
                कुछ लोग इलाज का खर्च उठा सकते थे। कई नहीं — और जिसने भलाई की हो और फिर अगला कदम न उठा सके, उसे भूलना कठिन है। यह बात हमारे मन में रह गई। जब तक टोबलर घर लौटा, एक बात साफ़ थी: वहाँ ज़रूरत कहीं ज़्यादा है, जितनी कोई एक परिवार अकेले संभाल सके।
              </p>
              <p>
                हम कुछ समय से चुपचाप अपनी ही गली में जानवरों को खिला और इलाज कर रहे थे। टोबलर के बाद, 2014 में, हमने इसे औपचारिक रूप दिया और RKM फाउंडेशन को पंजीकृत किया। सालों तक हमने इसे सरल रखा — कोई अभियान नहीं, कोई बड़े आयोजन नहीं, बस जानवरों को खिलाना, घावों का इलाज, और आपात स्थितियों का जवाब, जिसका खर्च हमारे परिवार और कुछ दोस्तों ने उठाया।
              </p>
            </div>
            <div className="mt-10 border-l-2 border-copper/50 pl-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper-dark">आज हम कहाँ हैं</p>
              <p className="mt-3 leading-relaxed text-ink/75">
                हम अपने आकार के बारे में ईमानदार हैं: RKM फाउंडेशन एक छोटे, परिवार-वित्तपोषित प्रयास से बढ़ा, और आज भी काफ़ी हद तक वैसा ही है। जो बदल रहा है वह यह कि हम अब दूसरों को साथ आने का न्योता दे रहे हैं — देने, स्वयंसेवा करने, और उन भरोसेमंद लोगों का साथ देने के लिए जो पहले से अच्छा काम कर रहे हैं। हम तेज़ी से बढ़कर कोई वादा तोड़ने के बजाय धीरे बढ़कर हर वादा निभाना पसंद करेंगे।
              </p>
            </div>
            <div className="mt-8">
              <Link href="/blog/the-dog-who-started-it-all" className="btn-light">टोबलर की कहानी पढ़ें</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-snow section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">हम कैसे काम करते हैं</p>
            <h2 className="display-2 mt-5 max-w-[18ch] text-balance">हम किन बातों पर खुद को परखते हैं।</h2>
          </Reveal>
          <div className="mt-16 grid gap-x-16 gap-y-12 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="flex gap-5">
                  <span className="mt-1 text-sm font-semibold tabular-nums text-copper-dark">0{i + 1}</span>
                  <div>
                    <h3 className="display-3 text-[1.35rem] sm:text-[1.5rem]">{v.title}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-ink/65">{v.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">मिशन का हिस्सा बनें</p>
            <h2 className="display-2 mt-5 max-w-[16ch] text-balance">जुड़ने के पाँच तरीके।</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65">
              आपके पास जो भी देने को है — समय, धन, सामग्री, ज्ञान, या आपकी आवाज़ — यहाँ आपके लिए जगह है।
            </p>
          </Reveal>
          <div className="mt-16">
            {ROLES.map((r, i) => (
              <Reveal key={r.title} delay={i * 60}>
                <div className={`grid items-baseline gap-x-8 gap-y-3 border-t border-ink/10 py-8 lg:grid-cols-12 ${i === ROLES.length - 1 ? "border-b" : ""}`}>
                  <div className="text-sm font-semibold tabular-nums text-copper-dark lg:col-span-1">0{i + 1}</div>
                  <div className="lg:col-span-4">
                    <h3 className="display-3 text-[1.4rem]">{r.title}</h3>
                    <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-copper-dark/80">{r.virtues}</p>
                  </div>
                  <p className="leading-relaxed text-ink/65 lg:col-span-5">{r.desc}</p>
                  <div className="lg:col-span-2 lg:text-right">
                    <Link href={r.href} className="link-secondary whitespace-nowrap text-sm">{r.cta} →</Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-snow section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index justify-center">हमारी टीम</p>
            <h2 className="display-2 mt-5 text-center text-balance">एक समुदाय जो परवाह करता है</h2>
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-4 max-w-xl text-center text-ink/55">पूरी कहानी और विशेषज्ञता पढ़ने के लिए किसी भी प्रोफ़ाइल पर टैप करें।</p>
            <TeamProfiles />
          </Reveal>
        </div>
      </section>

      <section className="bg-ink section-y text-white">
        <div className="container-c max-w-4xl text-center">
          <Reveal>
            <h2 className="display-2 mx-auto max-w-[20ch] text-balance">एक परवाह करने वाले समुदाय से जुड़ें</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">इस मिशन का हर सदस्य एक कदम से शुरू हुआ। आज अपना कदम उठाएँ।</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/hi/donate-now#donation" className="btn-copper">अभी दान करें</Link>
              <Link href="/hi/other-ways-to-give" className="btn bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/20">स्वयंसेवक बनें</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
