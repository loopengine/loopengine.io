import type { Metadata } from "next";
import Link from "next/link";
import { MADE_FOR_SEGMENTS, madeForCta } from "@/lib/made-for";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Made for",
  description: `Who ${SITE.productName} is built for — operations, compliance, customer ops, finance, and platform teams running AI-assisted operations under governance and control.`,
};

export default function MadeForHubPage() {
  return (
    <main className="px-4 py-12 md:py-16">
      <section className="mx-auto max-w-6xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-primary)]">Made for</p>
        <h1 className="mt-3 max-w-3xl font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-4xl)] tracking-tight">
          Who {SITE.productName} is built for
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-ink-secondary)]">
          {SITE.productName} is {SITE.tagline.charAt(0).toLowerCase() + SITE.tagline.slice(1)} Wherever AI is doing
          operational work, {SITE.productName} is the layer that keeps it accountable, governed, and traceable.
        </p>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-2">
        {MADE_FOR_SEGMENTS.map((segment) => (
          <Link
            key={segment.slug}
            href={`/made-for/${segment.slug}?cta=${madeForCta(segment.slug)}`}
            data-ph-cta={madeForCta(segment.slug)}
            className="group flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-primary)]"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-primary)]">
                {segment.audience}
              </p>
              {segment.status === "soon" ? (
                <span className="rounded-full bg-[var(--color-surface-alt)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-[var(--color-ink-muted)]">
                  Coming soon
                </span>
              ) : null}
            </div>
            <h2 className="mt-3 font-[var(--font-display)] text-xl text-[var(--color-ink)]">{segment.headline}</h2>
            <p className="mt-3 flex-1 text-sm leading-6 text-[var(--color-ink-secondary)]">{segment.summary}</p>
            <span className="mt-4 font-mono text-sm text-[var(--color-primary)] group-hover:underline">
              {segment.label} →
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
