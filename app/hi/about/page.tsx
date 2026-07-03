import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import EditorialFigure from "@/components/EditorialFigure";
import TeamProfiles from "@/components/TeamProfiles";

export const metadata: Metadata = {
  title: "हमारे बारे में",
  description: "RKM फाउंडेशन भारत में एक पशु-कल्याण धर्मार्थ ट्रस्ट है। एक परिवार जिसने घर पर जानवरों की मदद करनी शुरू की, और करता रहा।",
  alternates: { canonical: "/hi/about", languages: { en: "/about", hi: "/hi/about", "x-default": "/about" } },
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

const HI_TEAM = [
  {
    title: "न्यासी",
    cols: "sm:grid-cols-2 lg:grid-cols-3",
    members: [
      { name: "रमेश मुंधड़ा", role: "न्यासी", img: "/images/team/ramesh-mundhra.jpg", summary: "दशकों का उद्यमशीलता और व्यावसायिक अनुभव", bio: "रमेश RKM फाउंडेशन में दशकों का उद्यमशीलता और व्यावसायिक अनुभव लाते हैं। आजीवन न्यासी के रूप में, वे प्रमुख परिचालन निर्णयों पर रणनीतिक मार्गदर्शन देते हैं और उन कल्याण पहलों का समर्थन करते हैं जो फाउंडेशन के करुणामय, टिकाऊ बदलाव के मिशन के केंद्र में हैं।", expertise: ["व्यावसायिक रणनीति", "शासन", "कल्याण पहल"] },
      { name: "कुसुम मुंधड़ा", role: "न्यासी", img: "/images/team/kusum-mundhra.jpg", summary: "सामुदायिक कल्याण और ज़मीनी सहभागिता", bio: "कुसुम एक समर्पित न्यासी हैं, जिनके पास सामुदायिक कल्याण, प्रबंधन और ज़मीनी सहभागिता का गहरा अनुभव है। स्वास्थ्य, शिक्षा और कमज़ोर वर्गों के समर्थन के प्रति उनकी प्रतिबद्धता RKM फाउंडेशन के काम को उन लोगों के लिए सम्मानजनक, प्रभावशाली समाधान बनाने में आधार देती है जिन्हें इसकी सबसे ज़्यादा ज़रूरत है।", expertise: ["सामुदायिक कल्याण", "स्वास्थ्य और शिक्षा", "ज़मीनी स्तर"] },
      { name: "करण मुंधड़ा", role: "संस्थापक न्यासी और अध्यक्ष", img: "/images/team/karan-mundhra.jpg", summary: "RKM की दृष्टि और विकास का मार्गदर्शन करते संस्थापक न्यासी", bio: "करण RKM फाउंडेशन के संस्थापक न्यासी और अध्यक्ष हैं, जो संगठन की दृष्टि और विकास का मार्गदर्शन करने के लिए व्यावसायिक रणनीति और सामाजिक नेतृत्व का व्यापक अनुभव लाते हैं। वे रणनीतिक दिशा की देखरेख करते हैं, न्यासी बैठकों की अध्यक्षता करते हैं, और सुनिश्चित करते हैं कि हर निर्णय समुदायों में स्थायी, समग्र प्रभाव बनाने के RKM के मिशन के अनुरूप हो।", expertise: ["रणनीतिक दिशा", "सामाजिक नेतृत्व", "शासन"] },
    ],
  },
  {
    title: "कोर प्रबंधन",
    cols: "sm:grid-cols-2 lg:grid-cols-3",
    members: [
      { name: "अरविंद सारडा", role: "कोर प्रबंधन", img: "/images/team/arvind-sarda.jpeg", summary: "वित्तीय सेवाएँ, शासन और व्यवसाय विकास", bio: "अरविंद भारत के वित्तीय सेवा क्षेत्र का व्यापक अनुभव लाते हैं, जिन्होंने प्रमुख वेल्थ मैनेजमेंट और कमोडिटी एक्सचेंज प्लेटफ़ॉर्म के साथ काम किया है। शासन और व्यवसाय विकास में उनकी रणनीतिक समझ समुदायों में टिकाऊ प्रभाव बनाने के RKM फाउंडेशन के मिशन का समर्थन करती है।", expertise: ["वित्त", "शासन", "व्यवसाय विकास"] },
      { name: "रश्मि सारडा", role: "कोर प्रबंधन", img: "/images/team/rashmi-sarda.jpeg", summary: "ब्रांड सॉल्यूशंस प्रमुख, टाइम्स इंटरनेट", bio: "रश्मि टाइम्स इंटरनेट में ब्रांड सॉल्यूशंस की प्रमुख हैं, जो भारत के मीडिया, FMCG और आतिथ्य क्षेत्रों में व्यवसाय विकास, साझेदारियों और ब्रांड रणनीति में 15 वर्षों से अधिक का नेतृत्व लाती हैं। अंतर्दृष्टि-आधारित क्लाइंट समाधान और संस्थागत साझेदारियाँ बनाने में उनकी विशेषज्ञता RKM फाउंडेशन के आउटरीच और सहभागिता प्रयासों को मज़बूत करती है।", expertise: ["ब्रांड रणनीति", "साझेदारियाँ", "मीडिया"] },
      { name: "नताशा शाह", role: "कोर प्रबंधन", img: "/images/team/natassha-shah.jpeg", summary: "एक लक्ज़री प्राकृतिक सौंदर्य ब्रांड की संस्थापक", bio: "नताशा एक लक्ज़री प्राकृतिक सौंदर्य ब्रांड की संस्थापक हैं जिसे उन्होंने 2009 से बनाया, और रिटेल ब्रांड निर्माण, उत्पाद विकास, रणनीतिक योजना और संचालन में 15 वर्षों से अधिक की विशेषज्ञता लाती हैं। प्राकृतिक कल्याण के प्रति उनका जुनून और उपभोक्ता उद्यमों को बढ़ाने का सिद्ध रिकॉर्ड RKM फाउंडेशन की सामुदायिक प्रभाव पहलों में मूल्यवान अंतर्दृष्टि जोड़ता है।", expertise: ["ब्रांड निर्माण", "उत्पाद विकास", "संचालन"] },
      { name: "अंकित पालन", role: "कोर प्रबंधन", img: "/images/team/ankit-palan.jpg", summary: "दानदाता से टीम-सदस्य बने; रणनीति और संचालन", bio: "अंकित ने RKM फाउंडेशन के साथ अपनी यात्रा एक दानदाता के रूप में शुरू की, जो संगठन के समग्र, टिकाऊ प्रभाव के मिशन की ओर आकर्षित हुए। टीम की दृष्टि और पारदर्शी दृष्टिकोण से प्रेरित होकर, वे कोर प्रबंधन टीम में आ गए, जहाँ अब वे रणनीतिक अंतर्दृष्टि, परिचालन सहयोग, और एक दानदाता का नज़रिया लाते हैं ताकि हर पहल करुणा और जवाबदेही के साथ गूँजे।", expertise: ["रणनीति", "संचालन", "दानदाता का नज़रिया"] },
      { name: "व्योमा वोरा", role: "कोर प्रबंधन", img: "/images/team/vyoma-vora.jpg", summary: "सीमा-पार संचालन और रणनीतिक सोर्सिंग", bio: "व्योमा मुंबई में स्थित एक पेशेवर हैं, जिनके पास आयात-निर्यात, खरीद, अंतर्राष्ट्रीय व्यापार और परियोजना नेतृत्व का अनुभव है। सीमा-पार संचालन और रणनीतिक सोर्सिंग के प्रबंधन में अपनी विशेषज्ञता के साथ, वे RKM फाउंडेशन की वेंडर साझेदारियों, संसाधन खरीद और आपूर्ति-शृंखला समन्वय का समर्थन करने के लिए परिचालन दक्षता और वैश्विक बाज़ार अंतर्दृष्टि लाती हैं।", expertise: ["खरीद", "अंतर्राष्ट्रीय व्यापार", "आपूर्ति शृंखला"] },
      { name: "बृंदा पालन", role: "कोर प्रबंधन", img: "/images/team/brinda-palan.jpeg", summary: "प्रिंसिपल डिज़ाइनर, बृंदा पालन डिज़ाइन", bio: "बृंदा बृंदा पालन डिज़ाइन में प्रिंसिपल डिज़ाइनर हैं, जो आवासीय और वाणिज्यिक परियोजनाओं में लक्ज़री इंटीरियर डिज़ाइन, ब्रांड निर्माण और स्थान-रूपांतरण का 15 वर्षों से अधिक का अनुभव लाती हैं। MBA और डिज़ाइन नवाचार में मज़बूत आधार के साथ, उनकी रचनात्मक विशेषज्ञता और रणनीतिक सोच RKM फाउंडेशन के दृश्य संचार और ब्रांड उपस्थिति को बढ़ाती है।", expertise: ["डिज़ाइन", "ब्रांड निर्माण", "दृश्य संचार"] },
    ],
  },
  {
    title: "मुख्य समन्वयक",
    cols: "sm:grid-cols-2",
    members: [
      { name: "आर्यन सारडा", role: "मुख्य समन्वयक", img: "/images/team/aryan-sarda.jpg", summary: "कोर टीम को मैदान से जोड़ते हैं", bio: "आर्यन RKM फाउंडेशन की ज़मीनी गतिविधियों का समन्वय करते हैं, कोर टीम और मैदान के बीच कड़ी के रूप में काम करते हैं। वे भोजन अभियानों और आश्रय की दिनचर्या आयोजित करने में मदद करते हैं, स्वयंसेवकों का कार्यक्रम तय और समर्थन करते हैं, और बचाव मामलों का अनुसरण करते हैं — जानवरों की रोज़मर्रा की देखभाल को निरंतर और समय पर रखते हुए।", expertise: ["क्षेत्र समन्वय", "स्वयंसेवक सहयोग", "बचाव लॉजिस्टिक्स"] },
      { name: "अहाना सारडा", role: "मुख्य समन्वयक", img: "/images/team/ahanaa-sarda.png", summary: "कार्यक्रम समन्वय और सामुदायिक आउटरीच", bio: "अहाना RKM फाउंडेशन के कार्यक्रम समन्वय और सामुदायिक आउटरीच का समर्थन करती हैं। वे मैदानी गतिविधियों की योजना बनाने और उन्हें ट्रैक करने में मदद करती हैं, स्वयंसेवकों को सूचित और संलग्न रखती हैं, और उन परिचालन विवरणों — लॉजिस्टिक्स, फ़ॉलो-अप और रिकॉर्ड-कीपिंग — का प्रबंधन करती हैं जो बचाव, भोजन और आश्रय कार्य को सुचारू रूप से चलाते हैं।", expertise: ["कार्यक्रम समन्वय", "सामुदायिक आउटरीच", "संचालन"] },
    ],
  },
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
              <Link href="/hi/blog/the-dog-who-started-it-all" className="btn-light">टोबलर की कहानी पढ़ें</Link>
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
                    <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-copper-dark">{r.virtues}</p>
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
            <p className="mx-auto mt-4 max-w-xl text-center text-ink/65">पूरी कहानी और विशेषज्ञता पढ़ने के लिए किसी भी प्रोफ़ाइल पर टैप करें।</p>
            <TeamProfiles groups={HI_TEAM} expertiseLabel="विशेषज्ञता" />
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
