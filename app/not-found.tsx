import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-snow pb-24 pt-40 text-center">
      <div className="container-c max-w-xl">
        <p className="eyebrow">404</p>
        <h1 className="h-display mt-4 text-4xl sm:text-5xl lg:text-6xl">Page Not Found</h1>
        <p className="mt-5 text-ink/70">
          The page you&apos;re looking for may have been moved, renamed, or no longer exists.
          <br />
          <span className="font-medium text-ink">But the mission continues.</span>
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-dark">Return to Home</Link>
          <Link href="/donate-now" className="btn-light">Visit Donate Page</Link>
        </div>
        <p className="mt-10 text-sm text-ink/60">
          Have questions? <a className="link-secondary" href="mailto:info@rkm.support">info@rkm.support</a> ·{" "}
          <a className="link-secondary" href="https://wa.me/919920780005" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </p>
      </div>
    </section>
  );
}
