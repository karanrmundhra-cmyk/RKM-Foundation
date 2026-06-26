import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import FormShell from "@/components/FormShell";

export const metadata: Metadata = {
  title: "Unsubscribe",
  description: "Unsubscribe from RKM Foundation email updates.",
  robots: { index: false, follow: false },
};

export default function UnsubscribePage() {
  return (
    <section className="bg-snow pb-24 pt-32 sm:pt-40">
      <div className="container-c max-w-xl">
        <Reveal>
          <div className="text-center">
            <h1 className="display-2 text-balance">Unsubscribe from email updates.</h1>
            <p className="mt-4 leading-relaxed text-ink/70">
              We’re sorry to see you go. If you no longer wish to receive emails from RKM
              Foundation, you may unsubscribe below.
            </p>
          </div>
          <div className="mt-8">
            <FormShell
              formType="unsubscribe"
              fields={[
                { name: "email", label: "Email Address", type: "email", required: true, placeholder: "Enter your email address" },
              ]}
              submitLabel="Unsubscribe from Emails"
              successMessage="You've been unsubscribed. We're grateful for the time you spent with us."
            />
          </div>
          <p className="mt-6 text-center text-xs leading-relaxed text-ink/60">
            Important transactional emails related to donations, receipts, or requests you have
            initiated may still be sent when necessary. If this was done by mistake, you may
            subscribe again at any time through the website.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
