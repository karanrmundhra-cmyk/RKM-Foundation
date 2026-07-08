"use client";
import Image from "next/image";
import { useState } from "react";

/**
 * Contact page portrait — monochrome by default, blooms into colour on
 * hover (desktop) or tap / keyboard-activate (touch + a11y). Matches the
 * site's black-and-white photographic treatment; the colour reveal is the
 * signature interaction. Respects prefers-reduced-motion via motion-reduce.
 */
export default function ContactPhoto() {
  const [colour, setColour] = useState(false);
  const toggle = () => setColour((c) => !c);

  return (
    <figure
      className="group relative m-0 cursor-pointer overflow-hidden rounded-[1.375rem] border border-ink/10 bg-ink lg:h-full lg:min-h-[560px]"
      tabIndex={0}
      role="button"
      aria-pressed={colour}
      aria-label="Photo of a rescued dog — activate to view in colour"
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <Image
        src="/images/site/contact-hello.jpg"
        alt="A rescued dog wearing a striped headscarf and cat-eye sunglasses"
        width={1125}
        height={2000}
        sizes="(max-width:960px) 92vw, 46vw"
        className={`h-auto w-full object-cover object-[center_26%] transition-[filter] duration-500 ease-out group-hover:grayscale-0 motion-reduce:transition-none lg:absolute lg:inset-0 lg:h-full ${
          colour ? "grayscale-0" : "grayscale"
        }`}
      />
    </figure>
  );
}
