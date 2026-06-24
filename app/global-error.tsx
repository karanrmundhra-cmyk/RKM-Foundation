"use client";
// Global error boundary (§14) — the last line of defence. Catches errors thrown
// in the root layout itself, where the normal error.tsx cannot render. It must
// provide its own <html>/<body>, so styles are inline and self-contained.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Inter, system-ui, sans-serif", background: "#F5F5F5", color: "#111111" }}>
        <main style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
          <div style={{ maxWidth: "32rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8F6A2A" }}>Something went wrong</p>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 600, margin: "0.75rem 0 0", lineHeight: 1.1 }}>A small hiccup.</h1>
            <p style={{ color: "rgba(17,17,17,0.7)", marginTop: "1.25rem", lineHeight: 1.6 }}>
              The site ran into an unexpected error. Your details are safe and nothing was charged.
            </p>
            <div style={{ marginTop: "2rem", display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button type="button" onClick={() => reset()} style={{ background: "#111111", color: "#fff", border: 0, borderRadius: "9999px", padding: "0.9rem 1.75rem", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}>Try again</button>
              <a href="/" style={{ background: "#fff", color: "#111111", border: "1px solid rgba(17,17,17,0.15)", borderRadius: "9999px", padding: "0.9rem 1.75rem", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none" }}>Return to Home</a>
            </div>
            <p style={{ marginTop: "2.5rem", fontSize: "0.875rem", color: "rgba(17,17,17,0.6)" }}>
              Still stuck? <a href="mailto:info@rkm.support" style={{ color: "#8F6A2A" }}>info@rkm.support</a>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
