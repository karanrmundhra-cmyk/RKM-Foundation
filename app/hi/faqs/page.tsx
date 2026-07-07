import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import { SITE } from "@/lib/content";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "अक्सर पूछे जाने वाले प्रश्न",
  description: "RKM फाउंडेशन के बारे में अक्सर पूछे जाने वाले प्रश्न — दान, कर लाभ, फंडरेज़र, और Shop for a Cause।",
  alternates: { canonical: "/hi/faqs", languages: { en: "/faqs", hi: "/hi/faqs", "x-default": "/faqs" } },
  openGraph: {
    title: "अक्सर पूछे जाने वाले प्रश्न — RKM फाउंडेशन",
    description: "RKM फाउंडेशन के बारे में अक्सर पूछे जाने वाले प्रश्न — दान, कर लाभ, फंडरेज़र, और Shop for a Cause।",
    type: "website",
    url: "https://rkmfoundation.com/hi/faqs",
    locale: "hi_IN",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "RKM Foundation — Animal welfare in India" }],
  },
};

const FAQS_GENERAL = [
  { q: "क्या RKM फाउंडेशन एक पंजीकृत संगठन है?", a: "हाँ। RKM फाउंडेशन भारत में एक पंजीकृत धर्मार्थ ट्रस्ट है, जो आयकर अधिनियम की धारा 12A और 80G के तहत पंजीकृत है, और कॉर्पोरेट मामलों के मंत्रालय के साथ CSR (CSR-1) के लिए पंजीकृत है। सभी पंजीकरण दस्तावेज़ फ़ुटर के डाउनलोड अनुभाग में उपलब्ध हैं।" },
  { q: "RKM फाउंडेशन को कौन चलाता है?", a: "फाउंडेशन का संचालन न्यासी मंडल करता है, और एक कोर प्रबंधन टीम रोज़मर्रा के संचालन, साझेदारियों और कार्यक्रमों की देखरेख करती है।" },
  { q: "क्या दान कर लाभ के योग्य हैं?", a: "हाँ। RKM फाउंडेशन को दिए गए दान धारा 80G के तहत कर-कटौती के योग्य हैं। 80G प्रमाणपत्र पाने के लिए, कृपया दान के समय अपना PAN दें; अन्यथा एक सामान्य रसीद जारी की जाती है।" },
  { q: "न्यूनतम दान राशि क्या है?", a: "न्यूनतम दान ₹1,000 है।" },
  { q: "मुझे कैसे पता चलेगा कि मेरे दान का उपयोग कैसे हुआ?", a: "दानदाताओं को मैदान से समय-समय पर फ़ोटो और वीडियो अपडेट मिलते हैं, ताकि आप अपने सहयोग से आया बदलाव देख सकें।" },
  { q: "दान वर्तमान में किसका साथ देते हैं?", a: "दान वर्तमान में हमारे पशु-कल्याण कार्यक्रम का साथ देते हैं — बचाए गए जानवरों के लिए भोजन, चिकित्सा देखभाल और आश्रय।" },
  { q: "कर दस्तावेज़ कैसे काम करते हैं?", a: "हम हर साल फ़ॉर्म 10BD दाख़िल करते हैं और वित्तीय वर्ष की समाप्ति के बाद दानदाताओं को फ़ॉर्म 10BE प्रमाणपत्र जारी करते हैं।" },
  { q: "क्या मैं अपना मासिक दान रद्द कर सकता/सकती हूँ?", a: "हाँ, कभी भी। अपने अगले बिलिंग चक्र से पहले हमें info@rkm.support पर ईमेल करें और हम इसे रद्द कर देंगे — बिना कोई सवाल किए।" },
  { q: "क्या आप CSR योगदान स्वीकार करते हैं?", a: "हाँ। हम CSR-1 पंजीकृत हैं और कॉर्पोरेट साझेदारों को उपयोग प्रमाणपत्र और रिपोर्ट देते हैं। अधिक जानने के लिए हमारा CSR पेज देखें।" },
  { q: "क्या मैं आश्रय देखने या स्वयंसेवा करने आ सकता/सकती हूँ?", a: "हाँ — हम स्वयंसेवकों का स्वागत करते हैं और स्थल यात्राओं की व्यवस्था की जा सकती है। “देने के अन्य तरीके” पेज से संपर्क करें या info@rkm.support पर लिखें। हम आमतौर पर 1–2 कार्यदिवसों में जवाब देते हैं।" },
];

const FAQS_FUNDRAISER = [
  { q: "मैं फंडरेज़र कैसे शुरू करूँ?", a: "“अपना फंडरेज़र बनाएँ” फ़ॉर्म भरें — इसमें पाँच मिनट से भी कम लगते हैं। आपको दोस्तों और परिवार के साथ साझा करने के लिए एक अनोखा फंडरेज़र पेज लिंक मिलेगा।" },
  { q: "दान कहाँ जाते हैं?", a: "आपके फंडरेज़र से जुटाए गए सभी दान सीधे RKM फाउंडेशन को जाते हैं और बचाए गए जानवरों का साथ देते हैं — भोजन, चिकित्सा देखभाल और सुरक्षित आश्रय।" },
  { q: "क्या मेरे समर्थकों को कर रसीदें मिलती हैं?", a: "हाँ। दानदाताओं को तुरंत रसीदें मिलती हैं, और जहाँ लागू हो वहाँ 80G प्रमाणपत्र (PAN आवश्यक)।" },
  { q: "क्या मैं अपने फंडरेज़र की प्रगति ट्रैक कर सकता/सकती हूँ?", a: "हाँ। आपका फंडरेज़र पेज लक्ष्य की ओर लाइव प्रगति दिखाता है, और आपको तस्वीरों और कहानियों के साथ प्रभाव अपडेट मिलते हैं।" },
  { q: "मेरा फंडरेज़र समाप्त होने पर क्या होता है?", a: "जब आपका फंडरेज़र अपने लक्ष्य तक पहुँचता है या अपनी अवधि पूरी करता है, तो हम आपके समुदाय द्वारा बनाए गए प्रभाव का सारांश साझा करेंगे।" },
  { q: "कौन-से भुगतान तरीके स्वीकार किए जाते हैं?", a: "दान भारतीय रुपये (INR) में भारत-आधारित भुगतान तरीकों से स्वीकार किए जाते हैं, जिनमें UPI, कार्ड और नेट बैंकिंग शामिल हैं।" },
];

const FAQS_SHOP = [
  { q: "“Shop for a Cause” क्या है?", a: "एक सोच-समझकर बनाया गया बाज़ार जहाँ हर खरीद सीधे बचाए गए जानवरों का साथ देती है। हमारा पहला उत्पाद “Hope” कैंडल है — हस्तनिर्मित, पालतू-अनुकूल, और भारत में निर्मित।" },
  { q: "क्या शॉप खरीद 80G कर लाभ के योग्य है?", a: "नहीं। शॉप खरीद RKM फाउंडेशन के काम का साथ देती है पर इसे उत्पाद खरीद माना जाता है और यह 80G कर लाभ के योग्य नहीं है।" },
  { q: "शिपिंग में कितना समय लगता है?", a: "हम पूरे भारत में शिप करते हैं और ऑर्डर आमतौर पर 5–7 दिनों में पहुँच जाते हैं।" },
  { q: "रिफंड नीति क्या है?", a: "पूरी जानकारी के लिए कृपया “कानूनी और शासन” पेज पर हमारी शॉप रिफंड और रद्दीकरण नीति देखें।" },
];

const SECTIONS = [
  { eyebrow: "सामान्य", title: "फाउंडेशन और दान के बारे में", items: FAQS_GENERAL },
  { eyebrow: "फंडरेज़र", title: "फंडरेज़र शुरू करना और चलाना", items: FAQS_FUNDRAISER },
  { eyebrow: "Shop for a Cause", title: "ऑर्डर, शिपिंग और रिफंड", items: FAQS_SHOP },
];

export default function FAQsHiPage() {
  return (
    <div lang="hi" style={{ fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' }}>
      <BreadcrumbJsonLd items={[{ name: "होम", url: "https://rkmfoundation.com/hi" }, { name: "अक्सर पूछे जाने वाले प्रश्न", url: "https://rkmfoundation.com/hi/faqs" }]} />
      <section className="bg-snow pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">अक्सर पूछे जाने वाले प्रश्न</p>
            <h1 className="display-1 mt-6 text-balance" style={{ lineHeight: 1.2 }}>अक्सर पूछे जाने वाले प्रश्न।</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/65">
              जो सवाल हम सबसे ज़्यादा सुनते हैं — हम कौन हैं, दान और 80G कर लाभ कैसे काम करते हैं, फंडरेज़र चलाना, और Shop for a Cause के बारे में।
            </p>
          </Reveal>
        </div>
      </section>

      {SECTIONS.map((s, i) => (
        <section key={s.eyebrow} className={`${i % 2 === 1 ? "bg-snow" : ""} section-y`}>
          <div className="container-c grid gap-x-16 gap-y-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow-index">{s.eyebrow}</p>
                <h2 className="display-3 mt-5 text-balance">{s.title}</h2>
              </div>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-8">
              <Accordion items={s.items} />
            </Reveal>
          </div>
        </section>
      ))}

      <section className="section-y">
        <div className="container-c">
          <Reveal className="max-w-3xl">
            <p className="eyebrow-index">अभी भी कोई सवाल है?</p>
            <h2 className="display-2 mt-5 text-balance">संपर्क करें — हमें मदद करके खुशी होगी।</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${SITE.email}`} className="btn-dark">{SITE.email} पर ईमेल करें</a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-light">व्हाट्सऐप करें</a>
            </div>
            <p className="mt-5 text-sm text-ink/65">सोमवार से शुक्रवार | सुबह 10:00 – शाम 6:00</p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
