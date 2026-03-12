export default function Loading() {
  return (
    <section className="mx-auto flex min-h-[40vh] w-full max-w-[var(--max-width-content)] flex-col items-start justify-center gap-3 px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">Loading</p>
      <div className="h-3 w-56 animate-pulse rounded bg-[var(--color-surface-subtle)]" />
      <div className="h-3 w-80 animate-pulse rounded bg-[var(--color-surface-subtle)]" />
      <div className="h-3 w-64 animate-pulse rounded bg-[var(--color-surface-subtle)]" />
    </section>
  );
}
