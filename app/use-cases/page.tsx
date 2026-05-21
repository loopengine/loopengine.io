import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Use cases - Loop Engine",
  description:
    "Operational runtime patterns — ABM, RevOps, governed AI, dual-surface approvals, and regulated industries.",
};

const abmPatterns = [
  {
    title: "SDR qualification loop",
    href: "/docs/examples/sdr-qualification-loop",
    summary: "Provider scores lead → Slack Channel → human SDR → CRM Integration.",
  },
  {
    title: "Proposal approval loop",
    href: "/docs/examples/proposal-approval-loop",
    summary: "AI drafts in Google Docs → Slack approvals → Salesforce advances.",
  },
  {
    title: "Campaign approval loop",
    href: "/docs/examples/campaign-approval-loop",
    summary: "Outbound copy → compliance guards → Slack review → MAP executes.",
  },
  {
    title: "Pricing exception loop",
    href: "/docs/examples/pricing-exception-loop",
    summary: "Sheets staging → finance Slack approval → gated apply + CRM sync.",
  },
];

const platformPatterns = [
  {
    title: "Google Docs + Slack",
    href: "/docs/examples/dual-surface-docs-slack",
    summary: "Work surface + decision surface with governed apply.",
  },
  {
    title: "PagerDuty incident loop",
    href: "/docs/examples/pagerduty-incident-loop",
    summary: "Sonar research → governed classification → on-call Channel → alert Integration.",
  },
  {
    title: "Workflow + Loop",
    href: "/docs/examples/workflow-plus-loop",
    summary: "Temporal or Salesforce execution after Loop Engine governs transitions.",
  },
];

export default function UseCasesPage() {
  return (
    <main className="px-4 py-12">
      <section className="mx-auto max-w-6xl">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-primary)]">Use cases</p>
        <h1 className="mt-2 font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-4xl)]">
          Operational runtime patterns
        </h1>
        <p className="mt-3 max-w-3xl text-[var(--color-ink-secondary)] text-base leading-7">
          Loop Engine wraps operational AI in explicit states, guards, and evidence. Patterns are organized by runtime
          layer — <strong>Providers</strong> (intelligence), <strong>Channels</strong> (human coordination),{" "}
          <strong>Integrations</strong> (systems of record) — not by adapter catalog alone.
        </p>
        <p className="mt-4 max-w-3xl text-sm text-[var(--color-ink-muted)]">
          <Link href="/docs/concepts/runtime-taxonomy" className="text-[var(--color-primary)] underline-offset-4 hover:underline">
            Runtime Taxonomy →
          </Link>
        </p>
      </section>

      <section className="mx-auto mt-12 max-w-6xl">
        <h2 className="font-[var(--font-display)] text-2xl text-[var(--color-ink)]">ABM & RevOps</h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--color-ink-tertiary)]">
          GTM teams need governance between models, Slack, and CRM — not another automation sequence.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {abmPatterns.map((p) => (
            <article
              key={p.href}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm"
            >
              <h3 className="text-lg font-[var(--font-display)]">
                <Link href={p.href} className="text-[var(--color-primary)] hover:underline">
                  {p.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-[var(--color-ink-secondary)] leading-6">{p.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl">
        <h2 className="font-[var(--font-display)] text-2xl text-[var(--color-ink)]">Platform & dual-surface</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {platformPatterns.map((p) => (
            <article
              key={p.href}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-5"
            >
              <h3 className="text-lg">
                <Link href={p.href} className="text-[var(--color-primary)] hover:underline">
                  {p.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-[var(--color-ink-tertiary)]">{p.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl">
        <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-primary)]">Regulated / IT</p>
          <h2 className="mt-2 font-[var(--font-display)] text-2xl">
            <Link href="/use-cases/enterprise-it" className="hover:underline">
              Governed AI for enterprise IT
            </Link>
          </h2>
          <p className="mt-3 text-sm text-[var(--color-ink-secondary)] leading-7">
            Perplexity proposes. Loop Engine governs. PagerDuty executes. Tamper-evident audit for SOC 2, HIPAA, and EU AI
            Act programs.
          </p>
          <p className="mt-4">
            <Link href="/docs/integrations/perplexity-pagerduty" className="text-[var(--color-primary)] text-sm underline">
              Integration guide →
            </Link>
          </p>
        </article>
      </section>

      <section className="mx-auto mt-10 max-w-6xl text-sm text-[var(--color-ink-muted)]">
        Long-form essay (draft):{" "}
        <code className="text-[var(--color-ink-secondary)]">content/blog/ai-assisted-decision-loops-runtime-platform.mdx</code>
      </section>
    </main>
  );
}
