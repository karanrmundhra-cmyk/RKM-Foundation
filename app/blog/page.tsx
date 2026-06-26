import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import EditorialFigure from "@/components/EditorialFigure";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Blog",
  description: "Stories of hope from RKM Foundation — rescues, recoveries, and the people who make them possible.",
};

export default function BlogPage() {
  return (
    <>
      <section className="bg-snow pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="container-c">
          <Reveal className="max-w-4xl">
            <p className="eyebrow-index">Blog</p>
            <h1 className="display-1 mt-6 text-balance">Stories of hope.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/65">
              Rescues, recoveries, and the quiet acts of kindness behind RKM Foundation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured story — editorial feature */}
      <section className="section-y">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow-index">Featured · Founder Story</p>
          </Reveal>
          <Link href="/blog/the-dog-who-started-it-all" className="group mt-8 grid items-center gap-x-16 gap-y-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <EditorialFigure src="/images/site/dog.jpg" alt="A rescued dog cared for by RKM Foundation" ratio="aspect-[4/3]" parallax speed={0.05} priority />
            </Reveal>
            <Reveal delay={100} className="lg:col-span-6">
              <h2 className="display-2 text-balance transition-colors group-hover:text-copper-dark">The Dog Who Started It All</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65">
                How a pug named Tobler inspired a foundation built on compassion.
              </p>
              <span className="link-secondary mt-7 inline-block">Read the story →</span>
            </Reveal>
          </Link>
          <Reveal className="mt-16 border-t border-ink/10 pt-8">
            <p className="text-sm text-ink/65">More stories from the field are on their way.</p>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
