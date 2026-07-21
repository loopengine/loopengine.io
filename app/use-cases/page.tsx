import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_PAGE } from "@/lib/contact-routes";

export const metadata: Metadata = {
  title: "Use cases",
  description:
    "High-stakes operational loops — procurement, supply chain exceptions, incident response, and ABM patterns where consequential decisions need governance, not just automation.",
};

type CatalogLoop = {
  slug: string;
  name: string;
  category: string;
  owner: string;
  ai: string;
  description: string;
  outcomes: [string, string];
  worksWith?: string[];
  flagship?: boolean;
};

/** The six published decision systems from the Boss Loops catalog (v1.0.0). */
const catalogLoops: CatalogLoop[] = [
  {
    slug: "supplier-invoice-approval",
    name: "Supplier Invoice Approval",
    category: "Finance",
    owner: "Accounts Payable",
    ai: "Claude",
    description:
      "Reviews supplier invoices with Claude, routes high-value or exception cases for Slack approval, and publishes evidence to Google Docs.",
    outcomes: ["Faster invoice approval cycles", "Consistent exception handling"],
    worksWith: ["Slack approvals", "Google Docs evidence", "Looker evidence (preview)"],
    flagship: true,
  },
  {
    slug: "returns-triage",
    name: "Returns Triage",
    category: "Service",
    owner: "Customer Operations",
    ai: "Claude",
    description:
      "Classifies return requests, recommends disposition (refund, replace, deny), and routes edge cases for review.",
    outcomes: ["Faster return resolution", "Consistent policy application"],
  },
  {
    slug: "pricing-review",
    name: "Pricing Review",
    category: "Pricing",
    owner: "Merchandising",
    ai: "OpenAI",
    description:
      "Reviews competitive pricing and margin guardrails before promotional or list-price changes go live.",
    outcomes: ["Protect margin floors on promotions", "Align price moves with strategy"],
  },
  {
    slug: "demand-forecast-review",
    name: "Demand Forecast Review",
    category: "Forecasting",
    owner: "Planning",
    ai: "OpenAI, Claude",
    description:
      "Combines historical sales, seasonality, and external signals into a forecast with human approval.",
    outcomes: ["Improve forecast accuracy vs baseline", "Surface exceptions for planner review"],
  },
  {
    slug: "inventory-reorder",
    name: "Inventory Reorder",
    category: "Inventory",
    owner: "Supply Chain",
    ai: "Claude",
    description:
      "Evaluates stock levels and supplier lead times to recommend replenishment before stockouts.",
    outcomes: ["Prevent stockouts on high-velocity SKUs", "Reduce emergency freight spend"],
  },
  {
    slug: "supplier-risk-assessment",
    name: "Supplier Risk Assessment",
    category: "Risk",
    owner: "Procurement",
    ai: "Perplexity, Claude",
    description:
      "Monitors supplier health, compliance signals, and delivery performance to flag risk before disruption.",
    outcomes: ["Early warning on supplier distress", "Consistent risk scoring across vendors"],
  },
];

const highStakesLoops = [
  {
    title: "Settle / Pay exception",
    href: CONTACT_PAGE,
    external: true,
    summary:
      "Invoice settlement governance — Alpine supplier invoice (INV-2026-009082). Govern state transitions, exceptions, and overrides with a Decision Record, not a linear routing rule.",
  },
  {
    title: "Trace / Release quality",
    href: "/product/how-it-works#signals",
    summary:
      "Lot release governance — temperature excursion signals open an active loop; cleared-for-release requires multi-party evidence and strict guards.",
  },
  {
    title: "Incident / Response remediation",
    href: "/docs/examples/pagerduty-incident-loop",
    summary:
      "Incident lifecycle governance — Sonar research, governed classification, human gates, then PagerDuty executes only after Boss Loops authorizes the transition.",
  },
  {
    title: "Demand forecast review",
    href: "/product#category",
    summary:
      "Forecast exception governance — when model output crosses a threshold, open a loop with frozen semantic evidence before downstream replenishment workflows run.",
  },
];

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
    summary: "Outbound copy → brand guards → Slack review → MAP executes.",
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
    title: "Workflow + Boss Loops",
    href: "/docs/examples/workflow-plus-loop",
    summary: "Temporal or Salesforce execution after Boss Loops governs transitions.",
  },
];

export default function UseCasesPage() {
  return (
    <main className="px-4 py-12">
      <section className="mx-auto max-w-6xl">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-primary)]">Use cases</p>
        <h1 className="mt-2 font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-4xl)]">
          High-stakes operational loops
        </h1>
        <p className="mt-3 max-w-3xl text-[var(--color-ink-secondary)] text-base leading-7">
          Boss Loops governs consequential transitions — procurement exceptions, quality release, incident response,
          forecast overrides, and GTM approvals. These are operational decisions with real exposure, not generic
          onboarding pipelines. Formal regulation may add attestations on top (SOX, Vault exports, GRC programs); Boss
          Loops is the governance layer that makes the decision itself defensible.
        </p>
        <p className="mt-4 max-w-3xl text-sm text-[var(--color-ink-muted)]">
          <Link href="/docs/concepts/runtime-taxonomy" className="text-[var(--color-primary)] underline-offset-4 hover:underline">
            Runtime Taxonomy →
          </Link>
          {" · "}
          <Link href="/product" className="text-[var(--color-primary)] underline-offset-4 hover:underline">
            Decision Governance positioning →
          </Link>
        </p>
      </section>

      <section className="mx-auto mt-12 max-w-6xl">
        <h2 className="font-[var(--font-display)] text-2xl text-[var(--color-ink)]">
          Install-ready decision systems, from the catalog
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-[var(--color-ink-tertiary)]">
          Six published, versioned decision systems — install, connect, test, and publish instead of modeling
          governance from a blank page. Each ships with its participants, evidence requirements, and policy shape
          already defined.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {catalogLoops.map((loop) => (
            <article
              key={loop.slug}
              id={loop.slug}
              className="flex scroll-mt-20 flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full bg-[var(--color-primary-light)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-primary-dark)]">
                  {loop.category}
                </span>
                <span className="font-mono text-[10px] text-[var(--color-ink-muted)]">
                  v1.0.0 · Published{loop.flagship ? " · Live in demo" : ""}
                </span>
              </div>
              <h3 className="mt-3 font-[var(--font-display)] text-lg text-[var(--color-ink)]">{loop.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-[var(--color-ink-secondary)]">{loop.description}</p>
              <ul className="mt-3 space-y-1">
                {loop.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-2 text-sm text-[var(--color-ink-tertiary)]">
                    <span aria-hidden className="text-[var(--color-primary)]">✓</span>
                    {outcome}
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--color-ink-muted)]">
                <span>Owner: {loop.owner}</span>
                <span>AI: {loop.ai}</span>
              </div>
              {loop.worksWith ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {loop.worksWith.map((system) => (
                    <span
                      key={system}
                      className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-2 py-0.5 text-[10px] text-[var(--color-ink-secondary)]"
                    >
                      {system}
                    </span>
                  ))}
                </div>
              ) : null}
              <a
                href={CONTACT_PAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-sm font-medium text-[var(--color-primary)] hover:underline"
              >
                Run it in the demo →
              </a>
            </article>
          ))}
        </div>
        <p className="mt-5 max-w-3xl text-xs leading-5 text-[var(--color-ink-muted)]">
          Every decision system connects to your operational data through the Boss Loops REST API today; native
          NetSuite and Shopify connectors are on the roadmap. Approvals and escalations deliver over Slack now, with
          Teams patterns documented.
        </p>
      </section>

      <section className="mx-auto mt-12 max-w-6xl">
        <h2 className="font-[var(--font-display)] text-2xl text-[var(--color-ink)]">Where to win</h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--color-ink-tertiary)]">
          Event-driven loops where a wrong commit costs money, reputation, or continuity — governed before your workflow
          engine executes.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {highStakesLoops.map((p) => (
            <article
              key={p.title}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm"
            >
              <h3 className="text-lg font-[var(--font-display)]">
                {p.external ? (
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">
                    {p.title}
                  </a>
                ) : (
                  <Link href={p.href} className="text-[var(--color-primary)] hover:underline">
                    {p.title}
                  </Link>
                )}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-ink-secondary)] leading-6">{p.summary}</p>
            </article>
          ))}
        </div>
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
        <h2 className="font-[var(--font-display)] text-2xl text-[var(--color-ink)]">Platform & composition</h2>
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
          <p className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-primary)]">Stewardship programs</p>
          <h2 className="mt-2 font-[var(--font-display)] text-2xl">
            <Link href="/use-cases/enterprise-it" className="hover:underline">
              Governed AI for enterprise IT
            </Link>
          </h2>
          <p className="mt-3 text-sm text-[var(--color-ink-secondary)] leading-7">
            Perplexity proposes. Boss Loops governs. PagerDuty executes. Composable with the attestations and retention
            programs you already run — not a replacement for Vault, GRC, or SOX workflow tooling.
          </p>
          <p className="mt-4">
            <Link href="/docs/integrations/perplexity-pagerduty" className="text-[var(--color-primary)] text-sm underline">
              Integration guide →
            </Link>
          </p>
        </article>
      </section>
    </main>
  );
}
