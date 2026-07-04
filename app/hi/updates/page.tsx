import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { listSentUpdates } from "@/lib/updates-data";
import { photoUrl } from "@/lib/update-email";
import { monthLabel, storyAnchor } from "@/lib/update-public";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "टोबलर का बहीखाता — हर बचाव, दर्ज",
  description: "RKM Foundation ने जिन जानवरों को बचाया, उनका इलाज किया और आश्रय दिया — असली तस्वीरें, असली नाम, हर महीने।",
  alternates: { canonical: "/hi/updates", languages: { en: "/updates", hi: "/hi/updates", "x-default": "/updates" } },
};

export default async function UpdatesHiPage() {
  const updates = await listSentUpdates();
  return (
    <div lang="hi" style={{ fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' }}>
      <section className="bg-snow pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">टोबलर का बहीखाता</p>
            <h1 className="display-1 mt-6 text-balance" style={{ lineHeight: 1.15 }}>हर बचाव, दर्ज।</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/65">
              शुरुआत एक कुत्ते से हुई — टोबलर। यह उन सबका चलता हुआ रिकॉर्ड है जो उसके बाद आए:
              कौन आया, कौन ठीक हुआ, कौन घर गया। असली तस्वीरें, असली नाम, हर महीने।
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section-y">
        <div className="container-c">
          {updates.length === 0 ? (
            <Reveal className="max-w-2xl">
              <p className="text-lg leading-relaxed text-ink/70">पहला मासिक अपडेट तैयार हो रहा है। दानदाताओं को यह ईमेल से मिलता है; उसी क्षण यह यहाँ प्रकाशित होता है।</p>
              <p className="mt-4 text-sm text-ink/60">इनबॉक्स में चाहिए? <Link href="#subscribe" className="link-secondary">नीचे सब्सक्राइब करें</Link> — कभी कोई स्पैम नहीं।</p>
            </Reveal>
          ) : (
            updates.map((u) => (
              <Reveal key={u.update_id} className="border-t border-ink/10 py-10 first:border-t-0">
                <div className="grid gap-x-16 gap-y-6 lg:grid-cols-12">
                  <div className="lg:col-span-3">
                    <h2 className="text-xl font-semibold tracking-tight">{monthLabel(u.month, "hi")}</h2>
                    <Link href={`/hi/updates/${u.month}`} className="link-secondary mt-2 inline-block text-sm">पूरा अपडेट पढ़ें →</Link>
                  </div>
                  <div className="lg:col-span-9">
                    <div className="grid gap-6 sm:grid-cols-3">
                      {u.stories.slice(0, 3).map((s, i) => (
                        <Link key={s.story_id} href={`/hi/updates/${u.month}#${storyAnchor(s.animal_name, i)}`} className="group">
                          {s.photos[0] ? (
                            <div className="img-hover aspect-[4/3]">
                              {/* eslint-disable-next-line @next/next/no-img-element -- Supabase-hosted field photo; sized wrapper prevents CLS */}
                              <img src={photoUrl(s.photos[0].storage_path)} alt={s.photos[0].alt || s.animal_name} loading="lazy" />
                            </div>
                          ) : null}
                          <p className="mt-3 text-sm leading-snug text-ink/75">
                            <strong className="text-ink transition-colors group-hover:text-copper-dark">{s.animal_name}</strong> — {s.note_hi || s.note_en}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
