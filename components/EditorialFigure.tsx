import Image from "next/image";
import Parallax from "./Parallax";

/**
 * EditorialFigure — one consistent image frame for the editorial layout.
 *
 * - If `src` is provided, renders the real photo in the quiet editorial frame.
 * - If `src` is omitted, renders an ART-DIRECTED placeholder: a tonal panel that
 *   sits in the SAME visual language as real figures (no clip-art icon, no
 *   "upload here" dashed border) — a large ghosted index/word and a quiet
 *   caption. It reads as an intentional editorial frame awaiting a photograph,
 *   not an unfinished CMS slot. We still never fabricate impact.
 *
 * Optional `parallax` wraps the image in the scroll-drift primitive (enhancement
 * only; content is always visible). `ratio` sets the aspect box.
 */
export default function EditorialFigure({
  src,
  alt,
  ratio = "aspect-[4/5]",
  parallax = false,
  speed = 0.08,
  caption,
  ghost,
  className = "",
  priority = false,
}: {
  src?: string;
  alt: string;
  ratio?: string;
  parallax?: boolean;
  speed?: number;
  caption?: string;
  /** Large faint mark shown in the placeholder (e.g. "01" or "Rescue"). */
  ghost?: string;
  className?: string;
  priority?: boolean;
}) {
  const inner = src ? (
    <div className={`figure-frame ${ratio}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority={priority}
        className="object-cover transition-transform duration-[1200ms] ease-out will-change-transform"
      />
    </div>
  ) : (
    <div className={`placeholder-figure ${ratio}`} role="img" aria-label={alt}>
      {ghost && (
        <span aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="select-none font-semibold leading-none tracking-tight text-ink/[0.06]" style={{ fontSize: "clamp(4rem, 14vw, 11rem)" }}>{ghost}</span>
        </span>
      )}
    </div>
  );

  return (
    <figure className={className}>
      {parallax ? <Parallax speed={speed}>{inner}</Parallax> : inner}
      {caption && (
        <figcaption className="mt-3 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ink/65">{caption}</figcaption>
      )}
    </figure>
  );
}
