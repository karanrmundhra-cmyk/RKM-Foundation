import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Link from "next/link";

export const metadata: Metadata = {
  title: "80G / कर लाभ अस्वीकरण",
  description: "RKM फाउंडेशन वेबसाइट के दान अनुभाग के माध्यम से किए गए योगदान पर लागू सामान्य शर्तें, जिनमें 80G कर उपचार शामिल है।",
  alternates: { canonical: "/hi/legal/80g-tax-disclaimer", languages: { en: "/legal/80g-tax-disclaimer", hi: "/hi/legal/80g-tax-disclaimer", "x-default": "/legal/80g-tax-disclaimer" } },
};

const FONT_HI = '"Noto Sans Devanagari", Inter, system-ui, sans-serif';

export default function TaxDisclaimerHiPage() {
  return (
    <div lang="hi" style={{ fontFamily: FONT_HI }}>
      <BreadcrumbJsonLd items={[{ name: "होम", url: "https://rkmfoundation.com/hi" }, { name: "कानूनी एवं अभिशासन", url: "https://rkmfoundation.com/hi/legal" }, { name: "80G / कर लाभ अस्वीकरण", url: "https://rkmfoundation.com/hi/legal/80g-tax-disclaimer" }]} />
      <section className="bg-snow pb-16 pt-36 sm:pb-20 sm:pt-44">
        <div className="container-c max-w-3xl">
          <p className="eyebrow-index">कानूनी एवं अभिशासन</p>
          <h1 className="display-1 mt-6 text-balance">80G / कर लाभ अस्वीकरण</h1>
        </div>
      </section>

      <section className="py-14">
        <div className="container-c max-w-3xl prose-rkm">
          <p className="rounded-lg bg-snow px-4 py-3 text-sm leading-relaxed text-ink/60 ring-1 ring-ink/10">
            यह हिंदी अनुवाद केवल आपकी सुविधा के लिए है। किसी भी विसंगति या व्याख्या के मामले में, इस अस्वीकरण का{" "}
            <Link href="/legal/80g-tax-disclaimer" className="link-secondary">अंग्रेज़ी संस्करण</Link> मान्य होगा।
          </p>

          <p className="mt-4 leading-relaxed text-ink/70">
            यह पृष्ठ RKM फाउंडेशन वेबसाइट के दान अनुभाग के माध्यम से किए गए योगदान पर लागू सामान्य शर्तों को बताता है। दान करके, आप नीचे दिए गए कथनों को स्वीकार करते हैं।
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">1. स्वैच्छिक योगदान</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            दान अनुभाग के माध्यम से दी गई सभी राशियों को भारत में पंजीकृत एक चैरिटेबल ट्रस्ट, RKM फाउंडेशन को स्वैच्छिक चैरिटी योगदान के रूप में माना जाता है। दान किसी वस्तु, सेवा, या किसी वाणिज्यिक लाभ के लिए भुगतान नहीं है।
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">2. धन का उपयोग</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            दान का उपयोग RKM फाउंडेशन के चैरिटी कार्यक्रमों और संचालन के समर्थन के लिए किया जाता है। जहाँ दानदाता किसी विशिष्ट स्तंभ या उद्देश्य को चुनते हैं, हम उसी के अनुसार धन निर्देशित करने का लक्ष्य रखते हैं। हालाँकि, यदि कोई कार्यक्रम पूरी तरह वित्तपोषित हो जाता है या परिचालन प्राथमिकताएँ बदलती हैं, तो RKM फाउंडेशन जहाँ ज़रूरत सबसे अधिक हो, वहाँ अपने पंजीकृत चैरिटी उद्देश्यों के भीतर दान को पुनः आवंटित कर सकता है।
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">3. कोई वित्तीय या निवेश प्रतिफल नहीं</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            दान कोई स्वामित्व अधिकार, लाभ-हिस्सा, ब्याज, या अन्य वित्तीय प्रतिफल प्रदान नहीं करते। सभी योगदान फाउंडेशन के मिशन के समर्थन के लिए किए गए अपरिवर्तनीय चैरिटी उपहार हैं।
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">4. विशिष्ट परिणामों की कोई गारंटी नहीं</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            RKM फाउंडेशन अपने कार्यक्रमों और साझेदारियों के माध्यम से सार्थक प्रभाव को अधिकतम करने के लिए काम करता है। हालाँकि, चैरिटी गतिविधियाँ वास्तविक दुनिया की उन परिस्थितियों पर निर्भर करती हैं जो बदल सकती हैं। इस कारण, हम किसी व्यक्तिगत दान के लिए विशिष्ट परिणामों, लाभार्थियों की संख्या, या समय-सीमा की गारंटी नहीं दे सकते।
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">5. अनुपालन एवं पात्रता</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            यह सुनिश्चित करना दानदाता की ज़िम्मेदारी है कि दान करना उन पर लागू सभी कानूनों का अनुपालन करता है, जिनमें निवास, धन के स्रोत, और कराधान से संबंधित नियम शामिल हैं।
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            RKM फाउंडेशन वर्तमान में केवल भारतीय रुपये (INR) में घरेलू दान स्वीकार करता है, क्योंकि फाउंडेशन के पास विदेशी योगदान के लिए FCRA पंजीकरण नहीं है।
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">6. कर उपचार</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            RKM फाउंडेशन आयकर अधिनियम, 1961 की धारा 12A और 80G के तहत पंजीकृत है। पात्र भारतीय करदाता भारतीय कर कानून के तहत निर्धारित सीमाओं और शर्तों के अधीन, पात्र दान पर 50% कटौती का दावा कर सकते हैं।
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">कर लाभ केवल तभी लागू होते हैं जब:</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>दान की तिथि पर हमारा 80G पंजीकरण वैध हो, और</li>
            <li>दानदाता सटीक PAN और आवश्यक जानकारी प्रदान करे</li>
          </ul>
          <p className="mt-4 leading-relaxed text-ink/70">
            RKM फाउंडेशन वैधानिक समय-सीमा के अनुसार वित्तीय वर्ष की समाप्ति के बाद 80G प्रमाणपत्र (फॉर्म 10BE) जारी करता है।
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            80G प्रमाणपत्र जारी होना इस बात की गारंटी नहीं देता कि कोई कर प्राधिकरण किसी व्यक्तिगत कटौती दावे को स्वीकार करेगा। दानदाताओं को पात्रता के संबंध में अपने कर सलाहकारों से परामर्श करना चाहिए।
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">7. रिफंड</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            दान आमतौर पर गैर-वापसी योग्य हैं। सत्यापित तकनीकी त्रुटियों के मामलों में सीमित अपवादों के संबंध में विवरण के लिए, कृपया हमारी{" "}
            <Link href="/hi/legal/donation-refund-policy" className="link-secondary">रिफंड एवं रद्दीकरण नीति – दान</Link> देखें।
          </p>

          <p className="mt-8 leading-relaxed text-ink/70">
            RKM फाउंडेशन का समर्थन करने के लिए धन्यवाद। आपका योगदान हमें ज़िम्मेदार, पारदर्शी और अनुपालक प्रभाव प्रदान करने में मदद करता है।
          </p>

          <p className="mt-10">
            <Link href="/hi/legal" className="link-secondary">← कानूनी एवं अभिशासन पर वापस</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
