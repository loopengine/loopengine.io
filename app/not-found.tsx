import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-[var(--max-width-content)] flex-col items-start justify-center gap-4 px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">404</p>
      <h1 className="text-3xl font-semibold text-[var(--color-ink)] md:text-4xl">Page not found</h1>
      <p className="max-w-2xl text-base text-[var(--color-ink-tertiary)]">
        The page you requested does not exist or has moved. Use the docs index to continue browsing.
      </p>
      <div className="flex items-center gap-4">
        <Link className="text-sm text-[var(--color-primary)] hover:text-[var(--color-ink)]" href="/docs">
          Open docs
        </Link>
        <Link className="text-sm text-[var(--color-primary)] hover:text-[var(--color-ink)]" href="/">
          Back to home
        </Link>
      </div>
    </section>
  );
}
