import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Reveal from "@/components/Reveal";
import { getUpdateByMonth } from "@/lib/updates-data";
import { photoUrl } from "@/lib/update-email";
import { isValidMonth, monthLabel, storyAnchor } from "@/lib/update-public";

export const dynamic = "force-dynamic";

type Props = { params: { month: string } };

async function sentUpdate(month: string) {
  if (!isValidMonth(month)) return null;
  const u = await getUpdateByMonth(month).catch(() => null);
  return u && u.status === "sent" ? u : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const u = await sentUpdate(params.month);
  if (!u) return { title: "अपडेट नहीं मिला", robots: { index: false } };
  const title = u.subject_hi || `${monthLabel(u.month, "hi")} — मैदान से`;
  const img = u.stories[0]?.photos[0];
  return {
    title,
    description: u.intro_hi || u.intro_en || "इस महीने के बचाव कार्य की असली तस्वीरें और छोटी कहानियाँ।",
    alternates: { canonical: `/hi/updates/${u.month}`, languages: { en: `/updates/${u.month}`, hi: `/hi/updates/${u.month}`, "x-default": `/updates/${u.month}` } },
    openGraph: img ? { images: [{ url: photoUrl(img.storage_path), alt: img.alt || u.stories[0].animal_name }] } : undefined,
  };
}

export default async function UpdateMonthHiPage({ params }: Props) {
  const u = await sentUpdate(params.month);
  if (!u) notFound();
  const label = monthLabel(u.month, "hi");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: u.subject_hi || `${label} — मैदान से`,
    datePublished: u.sent_at,
    inLanguage: "hi",
    publisher: { "@type": "NGO", name: "RKM Foundation", url: "https://rkmfoundation.com" },
    image: u.stories.flatMap((s) => s.photos.map((p) => ({ "@type": "ImageObject", url: photoUrl(p.storage_path), caption: `${s.animal_name} — ${s.note_hi || s.note_en}` }))),
  };
  const t = u.totals || {};
  const totalsParts = [t.meals ? `${t.meals} भोजन` : null, t.vaccinations ? `${t.vaccinations} टीकाकरण` : null, t.treatments ? `${t.treatments} उपचार` : null].filter(Boolean);
  return (
    <div lang="hi" style={{ fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' }}>
      <script nonce={headers().get("x-nonce") ?? undefined} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-snow pb-14 pt-36 sm:pb-20 sm:pt-44">
        <div className="container-c">
          <Reveal className="max-w-3xl">
            <p className="eyebrow-index">टोबलर का बहीखाता · {label}</p>
            <h1 className="display-2 mt-6 text-balance" style={{ lineHeight: 1.2 }}>{u.subject_hi || "इस महीने मैदान से।"}</h1>
            {u.intro_hi || u.intro_en ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">{u.intro_hi || u.intro_en}</p> : null}
          </Reveal>
        </div>
      </section>
      <section className="section-y">
        <div className="container-c max-w-4xl">
          {u.stories.map((s, i) => (
            <Reveal key={s.story_id} className="scroll-mt-28 border-t border-ink/10 py-10 first:border-t-0 first:pt-0">
              <article id={storyAnchor(s.animal_name, i)}>
                {s.photos.map((p) => (
                  <figure key={p.photo_id} className="figure-frame mt-6 first:mt-0">
                    {/* eslint-disable-next-line @next/next/no-img-element -- Supabase-hosted field photo; framed container reserves space */}
                    <img src={photoUrl(p.storage_path)} alt={p.alt || s.animal_name} loading={i === 0 ? "eager" : "lazy"} />
                  </figure>
                ))}
                <p className="mt-5 text-lg leading-relaxed text-ink/80">
                  <strong className="text-ink">{s.animal_name}</strong> — {s.note_hi || s.note_en}
                </p>
              </article>
            </Reveal>
          ))}
          {totalsParts.length ? (
            <Reveal className="mt-12 border-t border-ink/10 pt-8">
              <p className="text-sm text-ink/70">इस महीने शेल्टर में: {totalsParts.join(" · ")}।</p>
            </Reveal>
          ) : null}
          <Reveal className="mt-12">
            <Link href="/hi/updates" className="link-secondary text-sm">← सभी अपडेट</Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
