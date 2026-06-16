// Tiny CSV builder for the admin export endpoints (M3). RFC-4180-style quoting.
function cell(v: unknown): string {
  let s = v == null ? "" : String(v);
  // CSV formula-injection guard: a leading = + - @ (or tab/CR) makes Excel/Sheets
  // execute the cell as a formula. Prefix with an apostrophe to neutralize.
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function toCsv(headers: string[], rows: unknown[][]): string {
  return [headers, ...rows].map((r) => r.map(cell).join(",")).join("\r\n") + "\r\n";
}

export function csvResponse(filename: string, csv: string): Response {
  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
