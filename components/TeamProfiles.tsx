"use client";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { TEAM } from "@/lib/content";

type Member = {
  name: string; role: string; img: string | null;
  summary?: string; bio?: string; expertise?: string[]; linkedin?: string;
};

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("");
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden
      className={`shrink-0 text-copper-dark transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ProfileCard({ m, open, onToggle, expertiseLabel }: { m: Member; open: boolean; onToggle: () => void; expertiseLabel: string }) {
  const hi = usePathname().startsWith("/hi");
  const id = m.name.replace(/\s+/g, "-").toLowerCase();
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
        open ? "border-copper/40 shadow-md" : "border-ink/10 hover:border-copper/30 hover:shadow-sm"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className="flex w-full items-center gap-4 p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-copper/50 sm:p-5"
      >
        {m.img ? (
          <Image
            src={m.img}
            alt={m.name}
            width={64}
            height={64}
            className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-ink/10"
          />
        ) : (
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-copper/15 text-lg font-bold text-copper-dark">
            {initials(m.name)}
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block font-semibold leading-tight text-ink">{m.name}</span>
          <span className="mt-0.5 block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-copper-dark">
            {m.role}
          </span>
          {m.summary && (
            <span className={`mt-1 block text-sm text-ink/65 ${open ? "" : "truncate"}`}>{m.summary}</span>
          )}
        </span>
        <Chevron open={open} />
      </button>

      <div
        id={`${id}-panel`}
        role="region"
        aria-label={hi ? `${m.name} — प्रोफ़ाइल` : `${m.name} — profile`}
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-ink/10 px-4 pb-5 pt-4 sm:px-5">
            {m.bio && <p className="text-[0.94rem] leading-relaxed text-ink/70">{m.bio}</p>}
            {m.expertise && m.expertise.length > 0 && (
              <div className="mt-4">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-ink/65">{expertiseLabel}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {m.expertise.map((e) => (
                    <span key={e} className="rounded-full bg-copper/10 px-3 py-1 text-xs font-medium text-[#795719]">
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {m.linkedin && (
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-copper-dark hover:underline"
                aria-label={hi ? `लिंक्डइन पर ${m.name}` : `${m.name} on LinkedIn`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V9.96H5.56v8.38h2.78zM6.95 8.72a1.61 1.61 0 1 0 0-3.22 1.61 1.61 0 0 0 0 3.22zM18.44 18.34v-4.6c0-2.46-1.31-3.6-3.06-3.6-1.41 0-2.04.78-2.39 1.32v-1.13h-2.78c.04.78 0 8.38 0 8.38h2.78v-4.68c0-.25.02-.5.09-.68.2-.5.65-1.01 1.41-1.01.99 0 1.39.76 1.39 1.86v4.51h2.56z" />
                </svg>
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const GROUPS: { title: string; members: Member[]; cols: string }[] = [
  { title: "Trustees", members: TEAM.trustees, cols: "sm:grid-cols-2 lg:grid-cols-3" },
  { title: "Core Management", members: TEAM.core, cols: "sm:grid-cols-2 lg:grid-cols-3" },
  { title: "Lead Coordinators", members: TEAM.coordinators, cols: "sm:grid-cols-2" },
];

export default function TeamProfiles(
  { groups = GROUPS, expertiseLabel = "Expertise" }:
  { groups?: { title: string; members: Member[]; cols: string }[]; expertiseLabel?: string } = {}
) {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <div className="mt-12 space-y-12">
      {groups.map((g) => (
        <div key={g.title}>
          <h3 className="text-center text-sm font-bold uppercase tracking-wider text-ink/60">{g.title}</h3>
          <div className={`mx-auto mt-5 grid max-w-4xl gap-3.5 ${g.cols}`}>
            {g.members.map((m) => {
              const id = m.name.replace(/\s+/g, "-").toLowerCase();
              return (
                <ProfileCard
                  key={id}
                  m={m}
                  open={openId === id}
                  onToggle={() => setOpenId(openId === id ? null : id)}
                  expertiseLabel={expertiseLabel}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
