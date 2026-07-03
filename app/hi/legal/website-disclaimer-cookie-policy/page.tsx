import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "वेबसाइट अस्वीकरण एवं कुकी नीति",
  description: "RKM फाउंडेशन वेबसाइट के लिए सामान्य अस्वीकरण और हम कुकीज़ व ट्रैकिंग तकनीकों का उपयोग कैसे करते हैं।",
  alternates: { canonical: "/hi/legal/website-disclaimer-cookie-policy", languages: { en: "/legal/website-disclaimer-cookie-policy", hi: "/hi/legal/website-disclaimer-cookie-policy", "x-default": "/legal/website-disclaimer-cookie-policy" } },
};

const FONT_HI = '"Noto Sans Devanagari", Inter, system-ui, sans-serif';

export default function WebsiteDisclaimerHiPage() {
  return (
    <div lang="hi" style={{ fontFamily: FONT_HI }}>
      <section className="bg-snow pb-16 pt-36 sm:pb-20 sm:pt-44">
        <div className="container-c max-w-3xl">
          <p className="eyebrow-index">कानूनी एवं अभिशासन</p>
          <h1 className="display-1 mt-6 text-balance">वेबसाइट अस्वीकरण एवं कुकी नीति</h1>
        </div>
      </section>

      <section className="py-14">
        <div className="container-c max-w-3xl prose-rkm">
          <p className="rounded-lg bg-snow px-4 py-3 text-sm leading-relaxed text-ink/60 ring-1 ring-ink/10">
            यह हिंदी अनुवाद केवल आपकी सुविधा के लिए है। किसी भी विसंगति या व्याख्या के मामले में, इस नीति का{" "}
            <Link href="/legal/website-disclaimer-cookie-policy" className="link-secondary">अंग्रेज़ी संस्करण</Link> मान्य होगा।
          </p>

          <p className="mt-4 leading-relaxed text-ink/70">
            RKM फाउंडेशन वेबसाइट पर दी गई जानकारी केवल सामान्य जानकारी और चैरिटी धन-संग्रह उद्देश्यों के लिए प्रदान की जाती है। इस वेबसाइट का उपयोग करके, आप इस अस्वीकरण की शर्तों को स्वीकार करते हैं।
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">1. कोई पेशेवर सलाह नहीं</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            इस वेबसाइट पर कुछ भी पेशेवर, कानूनी, वित्तीय, कर, या चिकित्सा सलाह बनने का इरादा नहीं रखता। इस वेबसाइट पर दी गई किसी भी जानकारी के आधार पर निर्णय लेने से पहले आपको योग्य पेशेवरों से परामर्श करना चाहिए।
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">2. सटीकता एवं अपडेट</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            हम इस वेबसाइट की जानकारी को सटीक और अद्यतन रखने के लिए उचित प्रयास करते हैं। हालाँकि, हम यह गारंटी नहीं देते कि सभी सामग्री, आँकड़े, विवरण, या कार्यक्रम विवरण पूर्ण, वर्तमान, या त्रुटि-रहित हैं।
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            हमारे कार्यक्रम, साझेदारियाँ और पहलें समय के साथ विकसित हो सकती हैं, और जानकारी बिना पूर्व सूचना के अपडेट की जा सकती है।
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">3. अपने जोखिम पर उपयोग</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            इस वेबसाइट और इसकी सामग्री का आपका उपयोग आपके अपने जोखिम पर है। RKM फाउंडेशन निम्नलिखित से उत्पन्न किसी भी हानि या क्षति के लिए ज़िम्मेदार नहीं है:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>इस वेबसाइट पर प्रकाशित जानकारी पर निर्भरता</li>
            <li>तकनीकी समस्याएँ, बाधाएँ, या त्रुटियाँ</li>
            <li>वेबसाइट या इसकी सेवाओं की अस्थायी अनुपलब्धता</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">4. अन्य वेबसाइटों के लिंक</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            हमारी वेबसाइट में भुगतान प्रसंस्करण, जानकारी साझाकरण, या सोशल मीडिया सहभागिता जैसे उद्देश्यों के लिए तृतीय-पक्ष वेबसाइटों या प्लेटफ़ॉर्म के लिंक हो सकते हैं। ये वेबसाइटें स्वतंत्र रूप से संचालित होती हैं और अपनी नीतियों व शर्तों द्वारा शासित होती हैं। RKM फाउंडेशन उनकी सामग्री, सुरक्षा प्रथाओं, या गोपनीयता नीतियों को नियंत्रित या समर्थन नहीं करता और उनके लिए ज़िम्मेदार नहीं है।
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">5. दान, उत्पाद एवं परिणाम</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            दान और &quot;एक उद्देश्य के लिए खरीदें&quot; खरीद RKM फाउंडेशन की चैरिटी गतिविधियों का समर्थन करती हैं। हालाँकि हम सार्थक प्रभाव बनाने का प्रयास करते हैं, हम किसी व्यक्तिगत दान, फंडरेज़र, या परियोजना से विशिष्ट परिणामों, समय-सीमा, या नतीजों की गारंटी नहीं देते।
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            इसी तरह, “एक उद्देश्य के लिए खरीदें” अनुभाग से उत्पाद खरीद चैरिटी पहलों का समर्थन करती है पर वाणिज्यिक उत्पाद लेन-देन बनी रहती है, चैरिटी दान नहीं।
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">6. दायित्व की सीमा</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            कानून द्वारा अनुमत अधिकतम सीमा तक, RKM फाउंडेशन और उसके न्यासी, कर्मचारी, स्वयंसेवक और साझेदार इस वेबसाइट के आपके उपयोग से उत्पन्न किसी भी अप्रत्यक्ष, आकस्मिक, परिणामी, या विशेष क्षति के लिए उत्तरदायी नहीं होंगे। इसमें शामिल है, पर इन्हीं तक सीमित नहीं:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>डेटा की हानि</li>
            <li>आय की हानि</li>
            <li>सद्भावना की हानि</li>
            <li>तकनीकी बाधाएँ</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">7. इस अस्वीकरण में बदलाव</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            हम समय-समय पर इस वेबसाइट अस्वीकरण को अपडेट कर सकते हैं। किसी भी बदलाव को इस पृष्ठ पर दर्शाया जाएगा। अपडेट पोस्ट होने के बाद वेबसाइट का निरंतर उपयोग संशोधित शर्तों की स्वीकृति माना जाएगा।
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">कुकी एवं ट्रैकिंग सूचना</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            RKM फाउंडेशन आपके ब्राउज़िंग अनुभव को बेहतर बनाने और यह समझने के लिए इस वेबसाइट पर कुकीज़ व समान तकनीकों का उपयोग करता है कि आगंतुक हमारे पृष्ठों का उपयोग कैसे करते हैं।
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">कुकीज़ क्या हैं?</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            कुकीज़ छोटी टेक्स्ट फ़ाइलें हैं जो किसी वेबसाइट पर जाने पर आपके ब्राउज़र में संग्रहित होती हैं। ये साइट को आपकी प्राथमिकताएँ याद रखने और कुछ कार्यों के सही ढंग से संचालन में मदद करती हैं।
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">हम कुकीज़ का उपयोग किसलिए करते हैं</h2>
          <p className="mt-4 leading-relaxed text-ink/70">हम कुकीज़ का उपयोग मुख्यतः इसके लिए करते हैं:</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>वेबसाइट को सुचारू रूप से चालू रखना (सेशन और सुरक्षा कुकीज़)</li>
            <li>फ़ॉर्म इनपुट या नेविगेशन विकल्पों जैसी बुनियादी प्राथमिकताएँ याद रखना</li>
            <li>एनालिटिक्स टूल के माध्यम से यह समझना कि आगंतुक वेबसाइट से कैसे संवाद करते हैं</li>
          </ul>
          <p className="mt-4 leading-relaxed text-ink/70">
            ये अंतर्दृष्टियाँ हमें वेबसाइट को बेहतर बनाने और आगंतुकों को एक बेहतर अनुभव प्रदान करने में मदद करती हैं। हम भुगतान विवरण जैसी संवेदनशील जानकारी संग्रहित करने के लिए कुकीज़ का उपयोग नहीं करते, और न ही आगंतुक डेटा बेचते या व्यापार करते हैं।
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">कुकीज़ का प्रबंधन</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            आप अपनी ब्राउज़र सेटिंग्स के माध्यम से कुकीज़ को नियंत्रित या अक्षम कर सकते हैं। कृपया ध्यान दें कि कुकीज़ अक्षम करने से वेबसाइट के कुछ हिस्सों की कार्यक्षमता प्रभावित हो सकती है।
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            हम व्यक्तिगत जानकारी कैसे एकत्र और उपयोग करते हैं, इस बारे में अधिक जानकारी के लिए, कृपया हमारी{" "}
            <Link href="/hi/legal/privacy-policy" className="link-secondary">गोपनीयता नीति</Link> देखें।
          </p>

          <p className="mt-8 leading-relaxed text-ink/70">
            हमारी वेबसाइट पर आने के लिए धन्यवाद। हम हर आगंतुक के लिए एक पारदर्शी और सुरक्षित डिजिटल अनुभव प्रदान करने का लक्ष्य रखते हैं।
          </p>

          <p className="mt-10">
            <Link href="/hi/legal" className="link-secondary">← कानूनी एवं अभिशासन पर वापस</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
