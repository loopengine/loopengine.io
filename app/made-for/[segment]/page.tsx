import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MADE_FOR_SEGMENTS,
  getMadeForSegment,
  madeForCta,
  type MadeForSegment,
} from "@/lib/made-for";
import { SITE } from "@/lib/site-config";

type RouteParams = { segment: string };

// Closed set of segments — anything else is a 404, no on-demand rendering.
export const dynamicParams = false;

export function generateStaticParams(): RouteParams[] {
  return MADE_FOR_SEGMENTS.map((s) => ({ segment: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { segment: slug } = await params;
  const segment = getMadeForSegment(slug);
  if (!segment) {
    return { title: "Made for" };
  }
  return {
    title: `${SITE.productName} for ${segment.label.toLowerCase()}`,
    description: segment.summary,
    openGraph: {
      title: `${segment.headline} · ${SITE.brandName}`,
      description: segment.pain,
    },
  };
}

export default async function MadeForSegmentPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { segment: slug } = await params;
  const segment = getMadeForSegment(slug);
  if (!segment) {
    notFound();
  }
  return segment.status === "live" ? (
    <LiveSegment segment={segment} />
  ) : (
    <SoonSegment segment={segment} />
  );
}

function SegmentHero({ segment }: { segment: MadeForSegment }) {
  return (
    <section className="border-b border-[var(--color-border)] px-4 py-14 md:py-20">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/made-for"
          className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-ink-muted)] hover:text-[var(--color-primary)]"
        >
          ← Made for
        </Link>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-primary)]">
          {segment.audience}
        </p>
        <h1 className="mt-3 max-w-3xl font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-4xl)] tracking-tight">
          {segment.headline}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-ink-secondary)]">{segment.pain}</p>
      </div>
    </section>
  );
}

function LiveSegment({ segment }: { segment: MadeForSegment }) {
  const cta = madeForCta(segment.slug);
  return (
    <main>
      <SegmentHero segment={segment} />

      {/* Three jobs Boss Loops does */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-primary)]">
            What {SITE.productName} does for you
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {(segment.jobs ?? []).map((job) => (
              <article
                key={job.title}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
              >
                <h2 className="font-[var(--font-display)] text-lg text-[var(--color-ink)]">{job.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--color-ink-secondary)]">{job.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Before / after */}
      <section
        className="border-y border-[var(--color-border)] px-4 py-14"
        style={{ background: "var(--color-surface-subtle)" }}
      >
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
              Without {SITE.productName}
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-ink-secondary)]">{segment.before}</p>
          </article>
          <article className="rounded-xl border border-[var(--color-primary)] bg-[var(--color-primary-light)] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-primary-dark)]">
              With {SITE.productName}
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-ink-secondary)]">{segment.after}</p>
          </article>
        </div>
      </section>

      {/* Proof + CTA */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-4xl text-center">
          {segment.proof ? (
            <p className="mx-auto max-w-2xl text-sm leading-7 text-[var(--color-ink-tertiary)]">{segment.proof}</p>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {segment.primaryCtaHref && segment.primaryCtaLabel ? (
              <Link
                href={`${segment.primaryCtaHref}?cta=${cta}`}
                data-ph-cta={cta}
                className="inline-flex items-center rounded-lg bg-[var(--color-primary)] px-6 py-3 font-mono text-sm text-white"
              >
                {segment.primaryCtaLabel}
              </Link>
            ) : null}
            <a
              href={segment.talkHref}
              data-ph-cta={`${cta}-talk`}
              className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-6 py-3 font-mono text-sm text-[var(--color-ink-secondary)]"
            >
              {segment.talkLabel}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function SoonSegment({ segment }: { segment: MadeForSegment }) {
  const cta = madeForCta(segment.slug);
  return (
    <main>
      <SegmentHero segment={segment} />
      <section className="px-4 py-14">
        <div className="mx-auto max-w-3xl rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
          <span className="inline-block rounded-full bg-[var(--color-surface-alt)] px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-[var(--color-ink-muted)]">
            Coming soon
          </span>
          <p className="mt-5 text-base leading-7 text-[var(--color-ink-secondary)]">
            We&apos;re building out {SITE.productName} for {segment.label.toLowerCase()}. If this is your world, tell us
            what you&apos;re trying to govern — early conversations shape what ships first.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href={segment.talkHref}
              data-ph-cta={`${cta}-talk`}
              className="inline-flex items-center rounded-lg bg-[var(--color-primary)] px-6 py-3 font-mono text-sm text-white"
            >
              {segment.talkLabel}
            </a>
            <Link
              href="/made-for"
              className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-6 py-3 font-mono text-sm text-[var(--color-ink-secondary)]"
            >
              See who else {SITE.productName} is for →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
