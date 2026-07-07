import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Link from "next/link";

export const metadata: Metadata = {
  title: "दान रिफंड एवं रद्दीकरण नीति",
  description: "RKM फाउंडेशन वेबसाइट के माध्यम से किए गए दान के लिए रिफंड और रद्दीकरण कैसे संभाले जाते हैं।",
  alternates: { canonical: "/hi/legal/donation-refund-policy", languages: { en: "/legal/donation-refund-policy", hi: "/hi/legal/donation-refund-policy", "x-default": "/legal/donation-refund-policy" } },
};

const FONT_HI = '"Noto Sans Devanagari", Inter, system-ui, sans-serif';

export default function DonationRefundHiPage() {
  return (
    <div lang="hi" style={{ fontFamily: FONT_HI }}>
      <BreadcrumbJsonLd items={[{ name: "होम", url: "https://rkmfoundation.com/hi" }, { name: "कानूनी एवं अभिशासन", url: "https://rkmfoundation.com/hi/legal" }, { name: "दान रिफंड एवं रद्दीकरण नीति", url: "https://rkmfoundation.com/hi/legal/donation-refund-policy" }]} />
      <section className="bg-snow pb-16 pt-36 sm:pb-20 sm:pt-44">
        <div className="container-c max-w-3xl">
          <p className="eyebrow-index">कानूनी एवं अभिशासन</p>
          <h1 className="display-1 mt-6 text-balance">रिफंड एवं रद्दीकरण नीति – दान</h1>
        </div>
      </section>

      <section className="py-14">
        <div className="container-c max-w-3xl prose-rkm">
          <p className="rounded-lg bg-snow px-4 py-3 text-sm leading-relaxed text-ink/60 ring-1 ring-ink/10">
            यह हिंदी अनुवाद केवल आपकी सुविधा के लिए है। किसी भी विसंगति या व्याख्या के मामले में, इस नीति का{" "}
            <Link href="/legal/donation-refund-policy" className="link-secondary">अंग्रेज़ी संस्करण</Link> मान्य होगा।
          </p>

          <p className="mt-4 leading-relaxed text-ink/70">
            यह नीति बताती है कि RKM फाउंडेशन वेबसाइट के दान अनुभाग के माध्यम से किए गए वित्तीय योगदान के लिए रिफंड और रद्दीकरण कैसे संभाले जाते हैं। दान करके, आप नीचे वर्णित शर्तों से सहमत होते हैं।
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">1. दान की प्रकृति</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            मुंबई, महाराष्ट्र, भारत स्थित एक पंजीकृत चैरिटेबल ट्रस्ट, RKM फाउंडेशन को दिए गए दान चैरिटी कार्यक्रमों और लाभार्थियों के समर्थन के लिए किए गए स्वैच्छिक योगदान हैं। दान किसी वस्तु या सेवा के लिए भुगतान नहीं है।
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">2. गैर-वापसी योग्य दान</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            RKM फाउंडेशन को किए गए सभी सफल दान आमतौर पर गैर-वापसी योग्य हैं। एक बार दान पूरा हो जाने पर, हम रिफंड जारी नहीं करते, लेन-देन उलटते नहीं, या दान को उत्पाद खरीद में परिवर्तित नहीं करते।
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            यह नीति हमें कार्यक्रमों की ज़िम्मेदारी से योजना बनाने और समुदायों व साझेदार संगठनों से की गई प्रतिबद्धताओं को निभाने में सक्षम बनाती है।
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">3. सीमित अपवाद (केवल तकनीकी त्रुटियाँ)</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            दुर्लभ स्थितियों में, स्पष्ट तकनीकी त्रुटियों के लिए सुधार पर विचार किया जा सकता है, जैसे:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>समान राशि और भुगतान संदर्भ के लिए दोहरे दान चार्ज किए गए</li>
            <li>एक सत्यापित भुगतान गेटवे त्रुटि जिसके परिणामस्वरूप कई चार्ज हुए</li>
          </ul>
          <p className="mt-4 leading-relaxed text-ink/70">
            यदि ऐसी कोई समस्या होती है, तो कृपया लेन-देन के 24 घंटे के भीतर हमें{" "}
            <a href="mailto:info@rkm.support" className="link-secondary">info@rkm.support</a> पर ईमेल करें और प्रदान करें:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>आपका पूरा नाम</li>
            <li>दान राशि और तिथि</li>
            <li>लेन-देन या भुगतान संदर्भ ID</li>
            <li>आपके बैंक या भुगतान एप्लिकेशन से चार्ज का स्क्रीनशॉट</li>
          </ul>
          <p className="mt-4 leading-relaxed text-ink/70">
            भुगतान गेटवे प्रदाता के साथ सत्यापन के बाद, हम केवल अतिरिक्त चार्ज को उलट सकते हैं। सभी निर्णय RKM फाउंडेशन के एकमात्र विवेक पर लिए जाएँगे।
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">4. 80G कर लाभ एवं रिफंड</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            RKM फाउंडेशन आयकर अधिनियम, 1961 की धारा 12A और 80G के तहत पंजीकृत है। पात्र दानदाता वैधानिक सीमाओं के अधीन, पात्र दान पर 50% कटौती का दावा कर सकते हैं।
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            हमें फॉर्म 10BD के माध्यम से आयकर विभाग को दान की रिपोर्ट करना और वित्तीय वर्ष की समाप्ति के बाद पात्र दानदाताओं को फॉर्म 10BE प्रमाणपत्र जारी करना आवश्यक है। इन नियामक आवश्यकताओं के कारण:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>यदि किसी दान को फॉर्म 10BD में रिपोर्ट किया गया है और/या 80G कर लाभ का दावा करने के लिए उपयोग किया गया है, तो इसे किसी भी परिस्थिति में वापस नहीं किया जा सकता।</li>
            <li>यदि आप किसी दान को बनाए रखने के बारे में अनिश्चित हैं, तो कृपया अपने कर रिटर्न में 80G कटौती का दावा करने से बचें।</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">5. दान राशि एवं भुगतान विधियाँ</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            न्यूनतम ऑनलाइन दान राशि हमारी वेबसाइट के दान पृष्ठ पर निर्दिष्ट है। दान भारतीय भुगतान विधियों के माध्यम से भारतीय रुपये (INR) में स्वीकार किए जाते हैं, जिनमें शामिल हैं:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>UPI</li>
            <li>नेट बैंकिंग</li>
            <li>डेबिट या क्रेडिट कार्ड</li>
            <li>भारतीय खाते से बैंक हस्तांतरण</li>
          </ul>
          <p className="mt-4 leading-relaxed text-ink/70">
            RKM फाउंडेशन वर्तमान में विदेशी योगदान स्वीकार नहीं करता, क्योंकि फाउंडेशन के पास FCRA पंजीकरण नहीं है।
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">6. दान रसीदें एवं प्रमाणपत्र</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            सफल दान के बाद एक तत्काल ईमेल रसीद जारी की जाती है। वैध PAN विवरण प्रदान करने वाले पात्र दानदाताओं को वैधानिक समय-सीमा के अनुसार, वित्तीय वर्ष की समाप्ति के बाद, आमतौर पर 31 मई तक, अपना 80G प्रमाणपत्र (फॉर्म 10BE) प्राप्त होगा।
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            यदि आपको अपनी रसीद या प्रमाणपत्र नहीं मिला है, तो कृपया अपने लेन-देन विवरण के साथ हमसे{" "}
            <a href="mailto:info@rkm.support" className="link-secondary">info@rkm.support</a> पर संपर्क करें।
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">7. चार्जबैक एवं विवाद</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            यदि कोई दान लेन-देन सीधे आपके बैंक या भुगतान प्रदाता के साथ विवादित होता है (एक चार्जबैक):
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>RKM फाउंडेशन दान की प्रकृति को सत्यापित करने के लिए रसीदें और लेन-देन लॉग जैसे सहायक दस्तावेज़ प्रदान कर सकता है।</li>
            <li>यदि बैंक द्वारा भुगतान उलट दिया जाता है, तो उस राशि के लिए कोई भी संबंधित 80G पात्रता समाप्त हो जाएगी, और दानदाता को उस उलटे दान के लिए कर कटौती का दावा नहीं करना चाहिए।</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">8. इस नीति में बदलाव</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            RKM फाउंडेशन कानूनी, परिचालन, या नियामक बदलावों को दर्शाने के लिए इस दान रिफंड एवं रद्दीकरण नीति को समय-समय पर अपडेट कर सकता है। आपके दान के समय लागू नीति का संस्करण उस लेन-देन पर लागू होगा।
          </p>

          <p className="mt-8 leading-relaxed text-ink/70">
            आपकी उदारता के लिए धन्यवाद। आपका विश्वास हमें अपने मिशन को सत्यनिष्ठा और जवाबदेही के साथ आगे बढ़ाने में सक्षम बनाता है।
          </p>

          <p className="mt-10">
            <Link href="/hi/legal" className="link-secondary">← कानूनी एवं अभिशासन पर वापस</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
