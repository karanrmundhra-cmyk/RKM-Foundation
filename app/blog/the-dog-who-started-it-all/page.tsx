import type { Metadata } from "next";
import { headers } from "next/headers";
import Reveal from "@/components/Reveal";
import EditorialFigure from "@/components/EditorialFigure";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "The Dog Who Started It All",
  description:
    "A pug named Tobler showed us what unconditional love truly means. That love eventually inspired the creation of RKM Foundation.",
  openGraph: { title: "The Dog Who Started It All", description: "A pug named Tobler showed us what unconditional love truly means — the story behind RKM Foundation.", type: "article" },
  alternates: { canonical: "/blog/the-dog-who-started-it-all", languages: { en: "/blog/the-dog-who-started-it-all", hi: "/hi/blog/the-dog-who-started-it-all", "x-default": "/blog/the-dog-who-started-it-all" } },
};

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="display-3 mt-16 text-[1.5rem] sm:text-[1.875rem]">{children}</h2>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink/75">{children}</p>;
}

export default function FounderStoryPage() {
  const nonce = headers().get("x-nonce") ?? undefined;
  return (
    <article>
      <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BlogPosting", headline: "The Dog Who Started It All", description: "A pug named Tobler showed us what unconditional love truly means. That love eventually inspired the creation of RKM Foundation.", image: "https://rkmfoundation.com/og.png", author: { "@type": "Organization", name: "RKM Foundation" }, publisher: { "@type": "Organization", name: "RKM Foundation", logo: { "@type": "ImageObject", url: "https://rkmfoundation.com/logo-512.png" } }, mainEntityOfPage: "https://rkmfoundation.com/blog/the-dog-who-started-it-all" }) }} />
      {/* Title */}
      <section className="bg-snow pb-14 pt-36 sm:pt-44">
        <div className="container-c max-w-3xl">
          <Reveal>
            <p className="eyebrow-index">Founder Story</p>
            <h1 className="display-1 mt-6 text-balance">The Dog Who Started It All</h1>
            <p className="mt-7 text-lg leading-relaxed text-ink/65">
              How a pug named Tobler inspired a foundation built on compassion.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 pt-16 sm:pb-32">
        <div className="container-c max-w-2xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-ink/80">
              A pug named Tobler showed us what unconditional love truly means. That love
              eventually inspired the creation of RKM Foundation — a platform dedicated to
              helping animals and people through compassion and community support, bridging
              caring hearts with those who need hope the most.
            </p>
          </Reveal>

          {/* Photo — editorial figure (placeholder until Tobler's photo is added) */}
          <Reveal delay={100}>
            <EditorialFigure
              alt="Tobler, the pug whose love inspired RKM Foundation"
              ratio="aspect-[4/3]"
              ghost="Tobler"
              className="mt-12"
              caption="Tobler — the little pug whose love inspired the journey that became RKM Foundation."
            />
          </Reveal>

          <Reveal delay={120}>
            <H2>The Dog Who Started It All</H2>
            <P>We didn’t learn unconditional love from a book.</P>
            <P>We learned it from a small pug named Tobler.</P>
            <P>
              He followed us everywhere — from the office to the car, and from the car back home
              again. Wherever we went, he quietly walked beside us.
            </P>
            <P>Tobler was never just a pet. He was family.</P>
            <P>
              A few years ago, I had to travel to China for work. During the second week of the
              trip, something unexpected happened.
            </P>
            <P>Tobler stopped eating.</P>
            <P>
              Our family tried everything. The vet tried everything. Nothing seemed to work.
              Then someone suggested a video call.
            </P>
            <P>
              When Tobler saw me on the screen, he walked closer — and began eating. When the
              call ended, he stopped again.
            </P>
            <P>
              That was the moment we realised something profound — sometimes animals don’t just
              depend on us… they love us more deeply than we understand.
            </P>
            <P>
              Watching this from thousands of kilometres away was heartbreaking. I cut my trip
              short and flew back home. The moment I returned, Tobler was completely himself
              again.
            </P>
            <P>
              That experience stayed with us. It was the first time we truly understood what
              unconditional love looks like.
            </P>

            <H2>The Three Nights That Changed Everything</H2>
            <P>A few years later, Tobler became seriously ill.</P>
            <P>
              For three days and nights, we stayed at the veterinary clinic without leaving his
              side. During those long hours, we began noticing something that quietly changed
              the way we saw the world.
            </P>
            <P>
              People kept arriving with injured street dogs and community cats they barely knew.
              Someone had found an animal on the road. Someone had rescued a dog from outside
              their building. Someone had picked up a wounded cat from a neighbourhood corner.
            </P>
            <P>They all wanted to help. But many simply didn’t have the money needed for treatment.</P>
            <P>
              One man regularly brought his own dog so the vet could use his blood to save other
              dogs. Others sat beside animals they had just rescued, hoping the vet could do
              something.
            </P>
            <P>They weren’t owners. They were simply people who could not ignore suffering.</P>
            <P>
              In that waiting room, strangers were quietly doing whatever they could for animals
              that weren’t even theirs. Whenever we could, we helped pay for treatments. But one
              thing became clear very quickly:
            </P>
            <P>
              <strong className="text-ink">
                There was far more need than any one person could handle alone.
              </strong>
            </P>
            <P>
              Those three nights planted a quiet idea — one that would later become RKM
              Foundation.
            </P>

            <H2>Compassion That Started at Home</H2>
            <P>Helping animals didn’t begin with a foundation. It began with small acts.</P>
            <P>
              We started by feeding animals in our building. Then the cats in the neighbourhood.
              Then injured animals that needed treatment.
            </P>
            <P>But compassion had already been part of our home long before this.</P>
            <P>
              My mother, Kusum Mundhra, has quietly lived this philosophy for many years. She
              regularly feeds members of the building staff — watchmen, drivers, and
              construction workers — often every day. If someone faces a medical emergency, she
              steps in to help. If a child needs school fees, she finds a way.
            </P>
            <P>Growing up around her, we learned something simple:</P>
            <P>
              <strong className="text-ink">
                Compassion isn’t something you plan. It becomes part of how you live.
              </strong>
            </P>

            <H2>The Beginning of RKM Foundation</H2>
            <P>In 2014, we formally registered RKM Foundation as a charitable trust.</P>
            <P>
              For many years, the work remained quiet. No campaigns. No fundraising drives. No
              public announcements.
            </P>
            <P>
              Animals were treated. People were helped. Emergencies were addressed when we
              could. The work was supported by our family, friends, and our own resources.
            </P>
            <P>
              But over time, the requests for help grew — far beyond what we could manage alone.
              And that is why we are now opening the doors.
            </P>

            <H2>Why Your Support Matters</H2>
            <P>
              RKM Foundation is built on a simple belief:{" "}
              <strong className="text-ink">compassion should not depend on chance.</strong>
            </P>
            <P>
              Rather than trying to do everything ourselves, we partner with trusted grassroots
              organisations already doing meaningful work. Through our Seven Pillars of Hope, we
              focus on one important cause at a time — helping strengthen efforts that are
              already creating impact.
            </P>
            <P>Your support helps make possible:</P>
            <ul className="mt-5 space-y-3 text-ink/75">
              {[
                "Medical care and treatment for injured animals",
                "Food and shelter for animals without caregivers",
                "Support for individuals and families facing urgent needs",
                "Resources for grassroots organisations working on the ground",
              ].map((li) => (
                <li key={li} className="flex gap-3 leading-relaxed">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                  {li}
                </li>
              ))}
            </ul>

            <H2>Our Personal Commitment</H2>
            <P>
              RKM Foundation began as a personal effort by our family, and that commitment
              continues today.
            </P>
            <P>
              Many of the foundation’s core operational costs — including office space,
              administrative support, and communications — are personally supported by the
              founding family. Our team also contributes their time pro bono, allowing donations
              to go directly toward supporting animals, communities, and grassroots
              organisations doing meaningful work on the ground.
            </P>
            <P>This ensures that generosity reaches those who need it most.</P>

            <H2>A Small Dog, A Larger Purpose</H2>
            <P>
              Tobler never knew he would inspire a foundation. He was simply doing what animals
              do best — loving without conditions.
            </P>
            <P>
              Everything we do today is our way of passing that love forward — to animals, to
              people, and to anyone who needs help.
            </P>
            <P>If this story resonates with you, we invite you to be part of it. You can help by:</P>
            <ul className="mt-5 space-y-3 text-ink/75">
              {[
                "Supporting our initiatives through donations",
                "Starting a fundraiser with friends and family",
                "Sharing our work with someone who cares",
              ].map((li) => (
                <li key={li} className="flex gap-3 leading-relaxed">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                  {li}
                </li>
              ))}
            </ul>
            <P>
              Sometimes the smallest act of kindness creates the biggest ripple. And together,
              those ripples can create a kinder world.
            </P>

            <H2>A Quiet Moment</H2>
            <P>
              If you’ve ever loved an animal, you understand the kind of bond Tobler gave us.
              And if you’ve ever helped someone who couldn’t ask for help, you know how powerful
              even a small act of kindness can be.
            </P>
            <P>
              That is the spirit behind RKM Foundation — the simple belief that no animal
              should suffer alone just because no one with the means happened to be watching.
            </P>
          </Reveal>

        </div>
      </section>

      <CTABanner
        title="Pass the love forward."
        lead="Every contribution — no matter the size — helps turn compassion into real action for those who need it most."
      />
    </article>
  );
}
