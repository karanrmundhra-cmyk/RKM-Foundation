import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import FormShell from "@/components/FormShell";

export const metadata: Metadata = {
  title: "करियर",
  description: "पशु बचाव के काम में जुड़ना चाहते हैं? अपना विवरण साझा करें और सही भूमिका खुलने पर हम आपसे संपर्क करेंगे।",
  alternates: { canonical: "/hi/careers" },
};

const REALITIES = [
  { title: "सुबह जल्दी", desc: "भोजन अभियान और बचाव दफ़्तर के घंटों का इंतज़ार नहीं करते।" },
  { title: "मिट्टी से सने जूते", desc: "यह ज़मीनी काम है — मैदान में, जानवरों के साथ।" },
  { title: "शांत खुशी", desc: "एक डरे हुए जानवर को दोबारा भरोसा करना सीखते देखना।" },
];

export default function CareersHiPage() {
  return (
    <div lang="hi" style={{ fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' }}>
      <section className="bg-snow pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">करियर</p>
            <h1 className="display-1 mt-6 text-balance" style={{ lineHeight: 1.2 }}>कुछ दिन कागज़ी काम होता है। कुछ दिन एक बचाव।</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/65">
              सुबह की जल्दी, मिट्टी से सने जूते, कभी-कभी टूटा हुआ दिल — और एक डरे हुए जानवर को दोबारा भरोसा करते देखने की शांत खुशी। अगर यही आपका काम है, तो हम आपसे ज़रूर सुनना चाहेंगे।
            </p>
            <p className="mt-5 max-w-2xl text-sm text-ink/65">
              अभी कोई खुली भर्ती नहीं है — अपना विवरण साझा करें और सही भूमिका मिलने पर हम संपर्क करेंगे।
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">यह काम</p>
            <h2 className="display-2 mt-5 max-w-[18ch] text-balance">दिन असल में कैसे दिखते हैं।</h2>
          </Reveal>
          <div className="mt-14">
            {REALITIES.map((r, i) => (
              <Reveal key={r.title} delay={i * 70}>
                <div className={`grid items-baseline gap-x-8 gap-y-2 border-t border-ink/10 py-7 lg:grid-cols-12 ${i === REALITIES.length - 1 ? "border-b" : ""}`}>
                  <div className="text-sm font-semibold tabular-nums text-copper-dark lg:col-span-1">0{i + 1}</div>
                  <h3 className="display-3 text-[1.4rem] lg:col-span-4">{r.title}</h3>
                  <p className="leading-relaxed text-ink/65 lg:col-span-7">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-snow section-y">
        <div className="container-c max-w-3xl">
          <Reveal>
            <p className="eyebrow-index">रुचि दर्ज करें</p>
            <h2 className="display-2 mt-5 text-balance">हमें अपने बारे में बताएँ।</h2>
          </Reveal>
          <Reveal className="mt-10">
            <FormShell
              formType="careers"
              fields={[
                { name: "name", label: "पूरा नाम", required: true, half: true, placeholder: "अपना पूरा नाम लिखें" },
                { name: "email", label: "ईमेल पता", type: "email", required: true, half: true, placeholder: "अपना ईमेल पता लिखें" },
                { name: "phone", label: "फ़ोन नंबर", type: "tel", half: true, placeholder: "अपना फ़ोन नंबर लिखें" },
                { name: "role", label: "रुचि की भूमिका", half: true, placeholder: "अपनी रुचियाँ बताएँ" },
                { name: "message", label: "अपने बारे में बताएँ", textarea: true, placeholder: "आपकी पृष्ठभूमि, कौशल, और इस काम की ओर आपको क्या खींचता है" },
              ]}
              submitLabel="विवरण भेजें"
              successMessage="धन्यवाद! कोई उपयुक्त अवसर होने पर हम आपसे संपर्क करेंगे।"
            />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
