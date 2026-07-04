// Shared helpers for the public Ledger pages (EN + HI).
export function storyAnchor(name: string, index: number): string {
  const slug = name.toLowerCase().normalize("NFKD").replace(new RegExp("[^\\p{L}\\p{N}]+", "gu"), "-").replace(/^-+|-+$/g, "");
  return slug || `story-${index + 1}`;
}

export function monthLabel(month: string, lang: "en" | "hi"): string {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1, 1));
  return new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-IN", { month: "long", year: "numeric", timeZone: "UTC" }).format(d);
}

export function isValidMonth(m: string): boolean {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(m);
}
