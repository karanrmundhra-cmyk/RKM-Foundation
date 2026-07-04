import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import FormShell from "@/components/FormShell";

export const metadata: Metadata = {
  title: "अपना फंडरेज़र बनाएँ",
  description: "बचाए गए जानवरों को भोजन, चिकित्सा देखभाल और सुरक्षित आश्रय दिलाने के लिए एक फंडरेज़र शुरू करें।",
  alternates: { canonical: "/hi/fundraiser/create", languages: { en: "/fundraiser/create", hi: "/hi/fundraiser/create", "x-default": "/fundraiser/create" } },
};

const FIELDS = [
  { name: "title", label: "फंडरेज़र शीर्षक", placeholder: "उदाहरण: बचाए गए जानवरों को खाना खिलाने में मदद करें" },
  { name: "name", label: "आपका नाम", required: true, half: true },
  { name: "email", label: "ईमेल पता", type: "email", required: true, half: true, hint: "हम आपका फंडरेज़र लिंक और अपडेट यहीं भेजेंगे।" },
  { name: "phone", label: "मोबाइल नंबर", type: "tel", required: true, half: true, placeholder: "+91" },
  { name: "occasion", label: "अवसर (वैकल्पिक)", half: true, options: ["जन्मदिन", "सालगिरह", "फिटनेस चुनौती", "स्मृति श्रद्धांजलि", "अन्य"] },
  { name: "message", label: "फंडरेज़र संदेश (वैकल्पिक)", textarea: true, placeholder: "लोगों को बताएँ कि यह उद्देश्य आपके लिए क्यों मायने रखता है। उदाहरण: “इस मैराथन का मेरा हर कदम उन बचाए गए जानवरों के लिए है जो देखभाल और सुरक्षा के हकदार हैं।”" },
  { name: "goal", label: "फंडरेज़र लक्ष्य", options: ["₹25,000", "₹50,000 — सबसे ज़्यादा चुना गया", "₹75,000", "कस्टम"], hint: "आप किसी भी लक्ष्य से शुरू कर सकते हैं। दोस्तों और परिवार के समर्थन से कई फंडरेज़र अपने लक्ष्य से आगे निकल जाते हैं।" },
  { name: "duration", label: "अभियान अवधि", required: true, options: ["30 दिन", "60 दिन", "90 दिन"] },
];

const NEXT = [
  "आपको दोस्तों और परिवार के साथ साझा करने के लिए एक अनोखा फंडरेज़र पेज मिलेगा।",
  "दान सीधे RKM फाउंडेशन को जाता है।",
  "दानदाताओं को तुरंत रसीदें और, जहाँ लागू हो, कर लाभ मिलते हैं।",
  "आप अपने फंडरेज़र की प्रगति ट्रैक कर सकते हैं।",
];

export default function CreateFundraiserHiPage() {
  return (
    <div lang="hi" style={{ fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' }}>
      <section className="bg-snow pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">कुछ सुंदर शुरू करें</p>
            <h1 className="display-1 mt-6 text-balance" style={{ lineHeight: 1.2 }}>अपना फंडरेज़र बनाएँ।</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/65">
              बचाए गए जानवरों को भोजन, चिकित्सा देखभाल और आश्रय दिलाने में मदद करें। जुटाया गया हर रुपया सीधे RKM फाउंडेशन को जाता है।
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-c max-w-3xl">
          <Reveal>
            <p className="eyebrow-index">आपका विवरण</p>
            <h2 className="display-2 mt-5 text-balance">एक मिनट में सेट करें।</h2>
          </Reveal>
          <p className="mt-10 border-t border-ink/10 pt-6 text-sm leading-relaxed text-ink/60">राशि हमारे आश्रय में जाती है — खाना, पशु-चिकित्सा और सोने की एक सुरक्षित जगह। दानदाताओं को तुरंत रसीद मिलती है, और जहाँ लागू हो, 80G प्रमाणपत्र।</p>
          <Reveal className="mt-10">
            <FormShell
              formType="fundraiser-create"
              fields={FIELDS}
              submitLabel="मेरा फंडरेज़र बनाएँ"
              successMessage="आपका फंडरेज़र अनुरोध मिल गया! हम 1–2 कार्यदिवसों में आपका पेज सेट करके आपका अनोखा लिंक भेज देंगे।"
              note="हर फंडरेज़र को लाइव होने से पहले समीक्षा की जाती है, और पेज RKM फाउंडेशन आश्रय की स्वीकृत तस्वीरें इस्तेमाल करते हैं।"
            />
          </Reveal>
        </div>
      </section>


      <section className="section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">आगे क्या होता है</p>
            <h2 className="display-2 mt-5 max-w-[16ch] text-balance">भेजने के बाद।</h2>
          </Reveal>
          <div className="mt-12 border-t border-ink/12">
            {NEXT.map((n, i) => (
              <Reveal key={n} delay={i * 60}>
                <div className="flex items-baseline gap-5 border-b border-ink/12 py-5">
                  <span className="text-sm font-semibold tabular-nums text-copper-dark">0{i + 1}</span>
                  <p className="leading-relaxed text-ink/70">{n}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
