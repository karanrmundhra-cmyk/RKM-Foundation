// LedgerProofCard — the donate-page "proof near the ask" slot (architecture J3).
// Server component: fetches the newest SENT update; renders NOTHING until the
// first real update exists (no placeholders on the live donate page — the
// page stays byte-identical until then; backwards-compatibility rule).
import Link from "next/link";
import { listSentUpdates } from "@/lib/updates-data";
import { photoUrl } from "@/lib/update-email";

export default async function LedgerProofCard({ lang = "en" }: { lang?: "en" | "hi" }) {
  let latest;
  try {
    [latest] = await listSentUpdates(1);
  } catch {
    return null;
  }
  const story = latest?.stories?.[0];
  if (!latest || !story) return null;
  const hi = lang === "hi";
  const href = `${hi ? "/hi" : ""}/updates/${latest.month}`;
  const photo = story.photos[0];
  return (
    <div className="card-static mt-6 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper-dark">
        {hi ? "टोबलर के बहीखाते से" : "From Tobler's Ledger"}
      </p>
      {photo ? (
        <div className="figure-frame mt-4 aspect-[16/10]">
          {/* eslint-disable-next-line @next/next/no-img-element -- remote Supabase-hosted proof photo; sized container prevents CLS */}
          <img src={photoUrl(photo.storage_path)} alt={photo.alt || story.animal_name} loading="lazy" />
        </div>
      ) : null}
      <p className="mt-4 text-sm leading-relaxed text-ink/80">
        <strong className="text-ink">{story.animal_name}</strong> — {hi && story.note_hi ? story.note_hi : story.note_en}
      </p>
      <Link href={href} className="link-secondary mt-3 inline-block text-sm">
        {hi ? "देखिए इस महीने आपने किसकी मदद की →" : "See who you helped this month →"}
      </Link>
    </div>
  );
}
