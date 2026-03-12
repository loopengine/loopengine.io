"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-[var(--max-width-content)] flex-col items-start justify-center gap-4 px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">Error</p>
      <h1 className="text-3xl font-semibold text-[var(--color-ink)] md:text-4xl">
        Something went wrong
      </h1>
      <p className="max-w-2xl text-base text-[var(--color-ink-tertiary)]">
        The page failed to render. Try again, and if the issue persists, open an issue in the Loop Engine
        repository.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-md border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-ink)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
      >
        Retry
      </button>
      <p className="font-mono text-xs text-[var(--color-ink-muted)]">{error.digest ?? error.message}</p>
    </section>
  );
}
