import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Use cases - Loop Engine",
  description:
    "Where Loop Engine fits: governed AI, regulated industries, incident response, and operational control layers.",
};

const tags = ["healthcare", "pharma", "IT governance", "compliance"];

export default function UseCasesPage() {
  return (
    <main className="px-4 py-12">
      <section className="mx-auto max-w-6xl">
        <h1 className="font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-4xl)]">Use cases</h1>
        <p className="mt-3 max-w-3xl text-[var(--color-ink-secondary)] text-base leading-7">
          Loop Engine wraps agentic and automated steps in explicit states, guards, and evidence. These patterns are where teams
          adopt it first.
        </p>
      </section>

      <section className="mx-auto mt-10 max-w-6xl">
        <article
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm md:p-8"
          style={{ maxWidth: 720 }}
        >
          <p
            className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-primary)]"
            style={{ letterSpacing: "0.12em" }}
          >
            IT / Governed AI
          </p>
          <h2 className="mt-2 font-[var(--font-display)] text-[var(--color-ink)] text-2xl">Governed AI for regulated industries</h2>
          <p className="mt-1 text-[var(--color-ink-secondary)] text-sm">Perplexity proposes. Loop Engine governs. PagerDuty executes.</p>
          <p className="mt-4 text-[var(--color-ink-secondary)] text-sm leading-7">
            Every AI action is a Loop step. Every Loop step produces a tamper-evident audit trail entry. SOC 2, HIPAA, and EU AI Act
            compliance — built in, not bolted on.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[var(--color-border)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--color-ink-tertiary)]"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-6">
            <Link href="/docs/integrations/perplexity-pagerduty" className="text-[var(--color-primary)] text-sm underline underline-offset-4">
              See the integration →
            </Link>
          </p>
        </article>
      </section>
    </main>
  );
}
