import { headers } from "next/headers";

type Crumb = { name: string; url: string };

// Reusable BreadcrumbList structured data (SEO / AI nav-graph). Server
// component — reads the per-request CSP nonce itself so callers only pass the
// trail. Absolute URLs required by schema.org. Matches the inline ld+json
// convention used elsewhere (blog, faqs, layout).
export default function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const nonce = headers().get("x-nonce") ?? undefined;
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
  return (
    <script
      nonce={nonce}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
