import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Governed operational runtime documentation — taxonomy, architecture, self-host SDK, and Loop Engine Cloud.",
  alternates: {
    canonical: "https://loopengine.io/docs"
  },
  openGraph: {
    title: "Docs · Loop Engine",
    description:
      "Governed operational runtime documentation — taxonomy, architecture, self-host SDK, and Loop Engine Cloud.",
    url: "https://loopengine.io/docs",
    images: [
      {
        url: "https://loopengine.io/og?title=Docs&section=Documentation",
        width: 1200,
        height: 630,
        alt: "Docs · Loop Engine"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Docs · Loop Engine",
    description:
      "Governed operational runtime documentation — taxonomy, architecture, self-host SDK, and Loop Engine Cloud.",
    images: ["https://loopengine.io/og?title=Docs&section=Documentation"]
  }
};

export default function DocsHomePage() {
  const journeyCards = [
    {
      icon: "🚀",
      title: "Get Started",
      description: "Install Loop Engine and run your first governed loop in under 10 minutes.",
      accentColor: "var(--color-primary)",
      links: [
        { label: "Quick Start", href: "/docs/getting-started/quick-start" },
        { label: "Runtime Taxonomy", href: "/docs/concepts/runtime-taxonomy" },
        { label: "Architecture", href: "/docs/getting-started/architecture" }
      ]
    },
    {
      icon: "🧠",
      title: "Core Concepts",
      description:
        "Runtime taxonomy — Providers, Channels, Integrations — plus loops, guards, evidence, and actors.",
      accentColor: "#4338CA",
      links: [
        { label: "Runtime Taxonomy", href: "/docs/concepts/runtime-taxonomy" },
        { label: "Platform direction", href: "/docs/concepts/runtime-platform-direction" },
        { label: "What is a Loop?", href: "/docs/concepts/what-is-a-loop" },
        { label: "Guards and Policy", href: "/docs/concepts/guards-and-policy" },
        { label: "Decision Governance", href: "/docs/concepts/decision-governance" },
        { label: "vs Workflow Engines", href: "/docs/concepts/loop-engine-vs-workflow-engines" }
      ]
    },
    {
      icon: "⚡",
      title: "Examples",
      description:
        "Production-style patterns - from simple approval gates to AI-assisted procurement loops with full audit trails.",
      accentColor: "#059669",
      links: [
        { label: "Expense Approval", href: "/docs/examples/expense-approval" },
        { label: "AI Replenishment (Claude)", href: "/docs/examples/ai-replenishment-claude" },
        { label: "Infrastructure Change", href: "/docs/examples/infrastructure-change-approval" },
        { label: "All examples →", href: "/docs/examples" }
      ]
    },
    {
      icon: "🔌",
      title: "Runtime Connections",
      description:
        "Providers, Channels, and Integrations — plus npm packages for implementers.",
      accentColor: "#D97706",
      links: [
        { label: "Runtime connections index", href: "/docs/integrations" },
        { label: "Loop Engine Cloud API", href: "/docs/integrations/loop-engine-cloud-api" },
        { label: "Providers (Claude)", href: "/docs/integrations/anthropic" },
        { label: "@loop-engine/sdk", href: "/docs/packages/sdk" }
      ]
    }
  ];

  const popularColumns = [
    {
      heading: "Architecture & Concepts",
      links: [
        {
          label: "Runtime Taxonomy",
          href: "/docs/concepts/runtime-taxonomy",
          description: "Canonical terms — Providers, Channels, Integrations, loops, guards, evidence."
        },
        {
          label: "Architecture overview",
          href: "/docs/getting-started/architecture",
          description: "Governance runtime, evidence flow, OSS runtime vs Loop Engine Cloud."
        },
        {
          label: "Runtime platform direction",
          href: "/docs/concepts/runtime-platform-direction",
          description: "Self-host direction, roadmap-only services, constrained claims (no false parity)."
        },
        {
          label: "Loop Engine vs Workflow Engines",
          href: "/docs/concepts/loop-engine-vs-workflow-engines",
          description: "Where deterministic workflow ends and adaptive looping begins."
        },
        {
          label: "Agents and RAG",
          href: "/docs/concepts/agents-and-rag",
          description: "Practical guidance for retrieval-driven actor decisions."
        },
        {
          label: "AI as Actor",
          href: "/docs/ai-and-automation/ai-as-actor",
          description: "How AI decisions become governed, auditable system actions."
        }
      ]
    },
    {
      heading: "Running Loops",
      links: [
        {
          label: "createLoopSystem",
          href: "/docs/running-loops/create-loop-system",
          description: "Initialize your runtime with loops, handlers, and adapters."
        },
        {
          label: "Transitions",
          href: "/docs/running-loops/transitions",
          description: "Model valid state movement and enforce path constraints."
        },
        {
          label: "Guards Reference",
          href: "/docs/defining-loops/guards-reference",
          description: "Available guard types for policy, risk, and compliance checks."
        },
        {
          label: "Event Subscriptions",
          href: "/docs/running-loops/event-subscriptions",
          description: "React to loop lifecycle signals in real time."
        }
      ]
    },
    {
      heading: "Packages",
      links: [
        {
          label: "@loop-engine/sdk",
          href: "/docs/packages/sdk",
          description: "High-level API for building and running complete loop systems."
        },
        {
          label: "@loop-engine/runtime",
          href: "/docs/packages/runtime",
          description: "Core execution runtime for transitions, state, and evidence."
        },
        {
          label: "@loop-engine/guards",
          href: "/docs/packages/guards",
          description: "Composable policy gates for governed, explainable decisions."
        },
        {
          label: "All packages →",
          href: "/docs/packages",
          description: "Browse the full package index and integration adapters."
        }
      ]
    }
  ];

  return (
    <div className="docs-home-landing">
      <section className="bg-[var(--color-surface-dark)] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid w-full max-w-[var(--max-width-full)] gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            {/* TODO: pull from package.json at build time */}
            <div className="mb-6 inline-flex rounded-full border border-[var(--color-primary-mid)] bg-[rgba(37,99,235,0.2)] px-3 py-1 font-mono text-[11px] font-medium text-[var(--color-primary-light)]">
              v0.1.2
            </div>
            <h1
              className="mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-3xl)",
                color: "#ffffff",
                letterSpacing: "-0.02em",
                lineHeight: 1.1
              }}
            >
              Loop Engine Documentation
            </h1>
            <p className="mb-6 max-w-[520px] text-[var(--text-base)] leading-7 text-[var(--color-ink-muted)]">
              Governed operational runtime documentation. Start with{" "}
              <Link href="/docs/concepts/runtime-taxonomy" className="text-[var(--color-primary-light)] underline-offset-2 hover:underline">
                Runtime Taxonomy
              </Link>
              , run the quick start, or browse runtime connections (Providers, Channels, Integrations).
            </p>
            <div className="inline-flex max-w-full rounded-[var(--radius-md)] border border-[var(--color-border-dark)] bg-[rgba(15,23,42,0.82)] px-4 py-3 font-mono text-[var(--text-sm)] text-[var(--color-code-text)] shadow-[var(--shadow-sm)]">
              npm install @loop-engine/sdk
            </div>
          </div>

          <div className="hidden rounded-[var(--radius-lg)] border border-[var(--color-border-dark)] bg-[rgba(255,255,255,0.03)] p-6 shadow-[var(--shadow-md)] lg:block">
            <svg viewBox="0 0 480 260" role="img" aria-label="Loop Engine runtime flow: Providers, Loops and Guards, Channels, Integrations, Evidence" className="h-auto w-full">
              <rect x="8" y="8" width="464" height="244" rx="12" fill="none" stroke="rgba(148,163,184,0.45)" />
              <text x="240" y="32" textAnchor="middle" fill="white" fontSize="14" fontFamily="var(--font-display)">
                Governed runtime flow
              </text>

              <text x="240" y="58" textAnchor="middle" fill="rgba(148,163,184,0.95)" fontSize="11" fontFamily="var(--font-mono)">
                Providers
              </text>
              <path d="M240 64 L240 78" stroke="rgba(148,163,184,0.8)" strokeWidth="1.5" markerEnd="url(#arrow)" />

              <rect x="150" y="82" width="180" height="40" rx="8" fill="var(--color-primary)" opacity="0.95" />
              <text x="240" y="106" textAnchor="middle" fill="white" fontSize="12" fontFamily="var(--font-body)">
                Loops + Guards
              </text>
              <path d="M240 124 L240 138" stroke="rgba(148,163,184,0.8)" strokeWidth="1.5" markerEnd="url(#arrow)" />

              <text x="240" y="152" textAnchor="middle" fill="rgba(148,163,184,0.95)" fontSize="11" fontFamily="var(--font-mono)">
                Channels
              </text>
              <path d="M240 158 L240 172" stroke="rgba(148,163,184,0.8)" strokeWidth="1.5" markerEnd="url(#arrow)" />

              <text x="240" y="186" textAnchor="middle" fill="rgba(148,163,184,0.95)" fontSize="11" fontFamily="var(--font-mono)">
                Integrations
              </text>
              <path d="M240 192 L240 206" stroke="rgba(148,163,184,0.8)" strokeWidth="1.5" markerEnd="url(#arrow)" />

              <text x="240" y="222" textAnchor="middle" fill="rgba(148,163,184,0.95)" fontSize="11" fontFamily="var(--font-mono)">
                Evidence
              </text>

              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="white" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto w-full max-w-[var(--max-width-wide)]">
          <h2
            className="mb-8 text-center"
            style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--color-ink)" }}
          >
            Where would you like to start?
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {journeyCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-[2px] hover:shadow-[var(--shadow-md)]"
                style={{ borderLeft: `3px solid ${card.accentColor}` }}
              >
                <div className="mb-2 text-lg" aria-hidden>
                  {card.icon}
                </div>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-lg)",
                    fontWeight: 600,
                    color: "var(--color-ink)"
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="mb-4"
                  style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-ink-secondary)" }}
                >
                  {card.description}
                </p>
                <div className="space-y-1">
                  {card.links.map((linkItem) => (
                    <Link
                      key={linkItem.href}
                      href={linkItem.href}
                      className="block text-[var(--text-sm)] text-[var(--color-primary)] hover:underline"
                    >
                      {linkItem.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface-alt)] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto w-full max-w-[var(--max-width-wide)]">
          <h2
            className="mb-2"
            style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--color-ink)" }}
          >
            Popular pages
          </h2>
          <p className="mb-8 text-[var(--text-sm)] text-[var(--color-ink-tertiary)]">
            The most-visited pages in the Loop Engine docs.
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {popularColumns.map((column) => (
              <div key={column.heading}>
                <h3
                  className="mb-4"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-base)",
                    fontWeight: 600,
                    color: "var(--color-ink)"
                  }}
                >
                  {column.heading}
                </h3>
                <div className="space-y-4">
                  {column.links.map((item) => (
                    <div key={item.href}>
                      <Link href={item.href} className="text-[var(--text-sm)] text-[var(--color-primary)] hover:underline">
                        {item.label}
                      </Link>
                      <p className="mt-1 text-[var(--text-xs)] text-[var(--color-ink-muted)]">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto w-full max-w-[var(--max-width-wide)]">
          <h2
            className="mb-8"
            style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--color-ink)" }}
          >
            Need help?
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <div className="mb-2 text-base" aria-hidden>
                💬
              </div>
              <p className="mb-3 text-[var(--text-sm)] text-[var(--color-ink-secondary)]">
                Ask questions, report bugs, propose RFCs.
              </p>
              <a
                className="text-[var(--text-sm)] text-[var(--color-primary)] hover:underline"
                href="https://github.com/loopengine/loop-engine/discussions"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Discussions →
              </a>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <div className="mb-2 text-base" aria-hidden>
                {"</>"}
              </div>
              <p className="mb-3 text-[var(--text-sm)] text-[var(--color-ink-secondary)]">
                Runnable examples for every major pattern.
              </p>
              <a
                className="text-[var(--text-sm)] text-[var(--color-primary)] hover:underline"
                href="https://github.com/loopengine/loop-examples"
                target="_blank"
                rel="noopener noreferrer"
              >
                loop-examples repo →
              </a>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <div className="mb-2 text-base" aria-hidden>
                🏢
              </div>
              <p className="mb-3 text-[var(--text-sm)] text-[var(--color-ink-secondary)]">
                Loop Engine is built and maintained by Better Data.
              </p>
              <a
                className="text-[var(--text-sm)] text-[var(--color-primary)] hover:underline"
                href="https://betterdata.co"
                target="_blank"
                rel="noopener noreferrer"
              >
                betterdata.co →
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
