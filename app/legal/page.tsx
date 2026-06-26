import type { Metadata } from "next";
import Link from "next/link";
import Accordion from "@/components/Accordion";

export const metadata: Metadata = {
  title: "Legal & Governance",
  description:
    "RKM Foundation's legal status, governance structure, and the policies that guide how the Foundation operates and manages charitable resources.",
  alternates: { canonical: "/legal", languages: { en: "/legal", hi: "/hi/legal", "x-default": "/legal" } },
};

const POLICIES = [
  { title: "Terms & Conditions", desc: "The terms that apply when you use our website, donate, fundraise, volunteer, or shop.", href: "/legal/terms-and-conditions" },
  { title: "Privacy Policy", desc: "How we collect, use, store, and safeguard your personal information.", href: "/legal/privacy-policy" },
  { title: "Website Disclaimer & Cookie Policy", desc: "General disclaimers for website content and how we use cookies and tracking technologies.", href: "/legal/website-disclaimer-cookie-policy" },
  { title: "Donation Refund & Cancellation Policy", desc: "How refunds and cancellations are handled for donations made through our website.", href: "/legal/donation-refund-policy" },
  { title: "Shop Refund & Cancellation Policy", desc: "Orders, cancellations, returns, and replacements for Shop for a Cause purchases.", href: "/legal/shop-refund-policy" },
  { title: "80G / Tax Benefit Disclaimer", desc: "General terms applicable to contributions, including 80G tax treatment and eligibility.", href: "/legal/80g-tax-disclaimer" },
];

const GOVERNANCE_ITEMS = [
  {
    q: "Conflict of Interest – Public Commitment",
    a: "RKM Foundation is committed to maintaining the highest standards of integrity, independence, and ethical decision-making in all its activities. Trustees, advisors, and decision-makers are expected to disclose any personal, financial, or professional interests that may influence, or appear to influence, their judgment in matters concerning the Foundation. Where a potential conflict arises, the concerned individual will recuse themselves from the relevant discussion and decision-making process. All decisions relating to partner selection, vendor engagement, and allocation of funds are taken solely in the best interests of the Foundation's charitable objectives and the communities we serve. Personal gain from charitable funds or programmes is not permitted. Any potential conflicts are addressed transparently and in accordance with responsible governance practices.",
  },
  {
    q: "Donation Allocation & Fund Utilisation Policy",
    a: "RKM Foundation follows a structured and responsible approach to the allocation and utilisation of charitable funds. Contributions are deployed toward programmes aligned with the Foundation's seven pillars of impact. A majority of funds are directed toward programmatic initiatives, while a limited portion supports essential administrative, compliance, and operational functions necessary for responsible and sustainable operations. Where donors choose a specific cause or pillar, we aim to honour donor intent wherever reasonably possible. However, if a programme becomes fully funded or circumstances require adjustment, funds may be reallocated within similar charitable objectives to ensure effective and meaningful impact. All funds received are used strictly for charitable purposes consistent with the Foundation's registered objectives.",
  },
  {
    q: "Partner NGO Selection Process",
    a: "RKM Foundation collaborates with credible grassroots organisations to implement selected causes and initiatives. Before confirming a partnership, we review factors including legal registration, statutory compliance, governance standards, mission alignment, and financial transparency. Partnerships are formalised through documented agreements that define programme scope, expected use of funds, reporting timelines, and accountability standards. The Foundation maintains appropriate oversight through documentation, periodic updates, and communication with partner organisations to ensure responsible deployment of resources.",
  },
  {
    q: "Child Safeguarding Commitment Statement",
    a: "RKM Foundation is committed to ensuring the safety, dignity, and well-being of children in any programme or initiative that may involve minors. The Foundation maintains a zero-tolerance approach toward abuse, exploitation, neglect, or misconduct involving children. Where activities involve children, we work only with responsible and compliant partner organisations that demonstrate appropriate safeguarding policies and practices. Any safeguarding concerns identified will be addressed promptly and responsibly in accordance with applicable laws and ethical standards. Child protection remains a non-negotiable principle in all relevant activities of the Foundation.",
  },
  {
    q: "Financial Transparency Statement",
    a: "RKM Foundation maintains proper books of account and complies with all statutory reporting and regulatory requirements under applicable Indian laws. Financial records are maintained responsibly, and required filings are submitted to the appropriate authorities within prescribed timelines. Eligible donations are reported in accordance with Income Tax regulations, and applicable tax certificates are issued to donors as required by law. We remain committed to responsible financial governance, transparency, and lawful management of charitable funds. Where possible, donors may receive updates regarding how their contributions have been deployed toward the selected cause or programme.",
  },
  {
    q: "Impact Reporting Commitment",
    a: "RKM Foundation believes that accountability and transparency are fundamental to meaningful philanthropy. For initiatives supported through the Foundation, we aim to clearly define programme objectives, track the deployment of funds, and share updates with donors regarding utilisation and outcomes. While social initiatives may involve factors beyond our control, we remain committed to honest, responsible, and timely communication with our supporters. Our goal is to ensure that every contribution is handled with care, clarity, and purpose.",
  },
  {
    q: "Animal Welfare Commitment Statement",
    a: "RKM Foundation recognises the importance of humane and responsible care for animals and is committed to supporting lawful animal welfare initiatives in alignment with its charitable objectives. Where the Foundation undertakes or supports programmes related to animal care, rescue, rehabilitation, or shelter, such activities will be conducted in accordance with applicable Indian laws, regulatory requirements, and recognised humane standards. Animal welfare initiatives supported by the Foundation will be implemented only after necessary permissions, operational readiness, and regulatory compliance requirements have been fulfilled. This commitment reflects our broader mission to promote compassion, responsibility, and respect for all living beings.",
  },
  {
    q: "Anti-Fraud Policy",
    a: "RKM Foundation maintains a zero-tolerance approach toward fraud, corruption, misuse of funds, or any form of dishonest conduct. All trustees, employees, volunteers, partners, and associated stakeholders are expected to act with integrity and to use the Foundation's resources solely for legitimate charitable purposes. Any suspected fraud or irregularity will be reviewed promptly, and corrective action may include suspension of activities, recovery of funds, termination of association, or reporting to the appropriate authorities. The Foundation remains committed to maintaining transparent systems and responsible financial oversight to safeguard donor contributions and charitable resources.",
  },
  {
    q: "Whistleblower Policy",
    a: "RKM Foundation encourages individuals associated with the Foundation — including trustees, employees, volunteers, partners, vendors, and donors — to raise concerns regarding unethical behaviour, misuse of funds, misconduct, or violations of law or organisational policies. Concerns may be reported in good faith through the Foundation's official communication channels, including email or other designated reporting mechanisms. The Foundation is committed to reviewing such concerns responsibly and maintaining confidentiality wherever reasonably possible. No individual who raises a genuine concern in good faith will face retaliation, harassment, or unfair treatment for doing so.",
  },
];

export default function LegalPage() {
  return (
    <>
      <section className="bg-snow pb-16 pt-36 sm:pb-20 sm:pt-44">
        <div className="container-c max-w-3xl">
          <p className="eyebrow-index">Legal &amp; Governance</p>
          <h1 className="display-1 mt-6 text-balance">Legal &amp; Governance</h1>
          <p className="mt-7 text-lg leading-relaxed text-ink/65">
            RKM Foundation is a registered public charitable trust in India committed to
            integrity, transparency, and responsible charitable work. This page outlines our
            legal status, governance structure, and the policies that guide how the Foundation
            operates and manages charitable resources.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container-c max-w-3xl prose-rkm">
          <h2 className="display-3 text-[1.6rem]">Legal Status</h2>
          <p className="mt-4 leading-relaxed text-ink/70">RKM Foundation is:</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>Registered under the Bombay Public Trusts Act, 1950 (Registration No: E-30560)</li>
            <li>Registered under Section 12AB of the Income Tax Act, 1961 (Registration No: 47522)</li>
            <li>Approved under Section 80G of the Income Tax Act, 1961 (Registration No: CITE80G9792014-152016-17)</li>
            <li>Registered for CSR activities with the Ministry of Corporate Affairs — CSR-1 (Registration No: CSR00089305)</li>
            <li>Registered on the NGO DARPAN Portal (Registration No: MH/2024/0457296)</li>
          </ul>
          <p className="mt-4 leading-relaxed text-ink/70">
            The Foundation complies with all statutory reporting and regulatory obligations
            applicable to charitable trusts in India.
          </p>

          <h2 className="display-3 mt-12 text-[1.6rem]">Governance Structure</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>RKM Foundation is governed by its Board of Trustees.</li>
            <li>Major decisions relating to programme selection, partner engagement, and fund deployment are made in alignment with the Foundation&apos;s registered charitable objectives.</li>
            <li>Trustees and authorised decision-makers act in a fiduciary capacity and in the best interests of the Foundation and the communities it serves.</li>
            <li>Structured processes are maintained for partner evaluation, programme oversight, and conflict management.</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">Financial Accountability</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>RKM Foundation maintains proper books of account in accordance with applicable Indian law.</li>
            <li>Financial statements are audited annually by an independent Chartered Accountant.</li>
            <li>All required statutory filings are submitted to the relevant authorities within prescribed timelines.</li>
            <li>Eligible donors receive tax documentation in accordance with applicable Income Tax regulations.</li>
            <li>Donors may receive updates regarding the deployment of contributions, subject to programme timelines and reporting cycles.</li>
          </ul>

          <h2 className="display-3 mt-12 text-[1.6rem]">Ethical &amp; Operational Commitments</h2>
          <p className="mt-4 leading-relaxed text-ink/70">RKM Foundation is committed to:</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>Responsible and transparent use of charitable funds</li>
            <li>Ethical decision-making and governance</li>
            <li>Careful selection and monitoring of partner organisations</li>
            <li>Zero tolerance toward misuse or diversion of funds</li>
            <li>Protection of children and vulnerable groups in relevant programmes</li>
            <li>Humane and lawful treatment of animals in welfare initiatives where applicable</li>
          </ul>
        </div>
      </section>

      <section className="bg-snow py-14">
        <div className="container-c max-w-3xl">
          <h2 className="display-3 text-[1.6rem]">Policies &amp; Disclosures</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            The following policies guide the governance and operation of RKM Foundation.
            Select a policy to view the full text.
          </p>
          <div className="mt-10 border-t border-ink/12">
            {POLICIES.map((p) => (
              <Link key={p.href} href={p.href} className="group grid items-baseline gap-x-8 gap-y-2 border-b border-ink/12 py-6 transition-colors hover:text-copper-dark lg:grid-cols-12">
                <h3 className="font-semibold lg:col-span-4">{p.title}</h3>
                <p className="text-sm leading-relaxed text-ink/60 lg:col-span-7">{p.desc}</p>
                <span className="text-sm font-semibold lg:col-span-1 lg:text-right">Read →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container-c max-w-3xl">
          <h2 className="display-3 text-[1.6rem]">Governance &amp; Transparency Policies</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Click a section below to view the full policy.
          </p>
          <div className="mt-8">
            <Accordion items={GOVERNANCE_ITEMS} />
          </div>
        </div>
      </section>

      <section className="bg-snow py-14">
        <div className="container-c max-w-3xl">
          <h2 className="display-3 text-[1.6rem]">Contact &amp; Grievance Redressal</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            If you have any questions, concerns, or complaints regarding the Foundation&apos;s
            activities or governance, please contact:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/70">
            <li>
              Email:{" "}
              <a href="mailto:info@rkm.support" className="link-secondary">info@rkm.support</a>
            </li>
            <li>
              WhatsApp:{" "}
              <a href="https://wa.me/919920780005" target="_blank" rel="noopener noreferrer" className="link-secondary">+91 99207 80005</a>
            </li>
          </ul>
          <p className="mt-6 leading-relaxed text-ink/70">
            <strong className="text-ink">Registered Address</strong>
            <br />
            201, 2nd Floor, Building Number 4, Paramos Tower, Vasant Lawns,
            <br />
            Majiwada, Thane West – 400601, Maharashtra, India
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            We aim to respond to enquiries within a reasonable timeframe and address concerns in
            a fair and transparent manner. RKM Foundation remains committed to lawful, ethical,
            and accountable operations in the service of public good.
          </p>
        </div>
      </section>
    </>
  );
}
