import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { listSentUpdates } from "@/lib/updates-data";
import { photoUrl } from "@/lib/update-email";
import { monthLabel, storyAnchor } from "@/lib/update-public";

export const dynamic = "force-dynamic"; // always reflects the newest sent update

export const metadata: Metadata = {
  title: "Tobler's Ledger — Every Rescue, Written Down",
  description: "The running record of the animals RKM Foundation rescued, treated, and sheltered — real photos and real names, published every month.",
  alternates: { canonical: "/updates", languages: { en: "/updates", hi: "/hi/updates", "x-default": "/updates" } },
};

export default async function UpdatesPage() {
  const updates = await listSentUpdates();
  return (
    <>
      <section className="bg-snow pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">Tobler&apos;s Ledger</p>
            <h1 className="display-1 mt-6 text-balance">Every rescue, written down.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/65">
              It started with one dog — Tobler. This is the running record of everyone who came
              after him: who arrived, who healed, who went home. Real photos, real names, every month.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-c">
          {updates.length === 0 ? (
            <Reveal className="max-w-2xl">
              <p className="text-lg leading-relaxed text-ink/70">
                The first monthly update is being prepared. Donors receive it by email;
                it is published here the same moment.
              </p>
              <p className="mt-4 text-sm text-ink/60">
                Want it in your inbox? <Link href="#subscribe" className="link-secondary">Subscribe below</Link> — no spam, ever.
              </p>
            </Reveal>
          ) : (
            updates.map((u) => (
              <Reveal key={u.update_id} className="border-t border-ink/10 py-10 first:border-t-0">
                <div className="grid gap-x-16 gap-y-6 lg:grid-cols-12">
                  <div className="lg:col-span-3">
                    <h2 className="text-xl font-semibold tracking-tight">{monthLabel(u.month, "en")}</h2>
                    <Link href={`/updates/${u.month}`} className="link-secondary mt-2 inline-block text-sm">
                      Read the full update →
                    </Link>
                  </div>
                  <div className="lg:col-span-9">
                    <div className="grid gap-6 sm:grid-cols-3">
                      {u.stories.slice(0, 3).map((s, i) => (
                        <Link key={s.story_id} href={`/updates/${u.month}#${storyAnchor(s.animal_name, i)}`} className="group">
                          {s.photos[0] ? (
                            <div className="img-hover aspect-[4/3]">
                              {/* eslint-disable-next-line @next/next/no-img-element -- Supabase-hosted field photo; sized wrapper prevents CLS */}
                              <img src={photoUrl(s.photos[0].storage_path)} alt={s.photos[0].alt || s.animal_name} loading="lazy" />
                            </div>
                          ) : null}
                          <p className="mt-3 text-sm leading-snug text-ink/75">
                            <strong className="text-ink transition-colors group-hover:text-copper-dark">{s.animal_name}</strong> — {s.note_en}
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
    </>
  );
}
