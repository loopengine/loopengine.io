import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Docs",
  description: "Everything you need to build governed, observable enterprise loops with Loop Engine.",
  alternates: {
    canonical: "https://loopengine.io/docs"
  },
  openGraph: {
    title: "Docs · Loop Engine",
    description: "Documentation for Loop Engine runtime, actors, guards, and adapters.",
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
    description: "Documentation for Loop Engine runtime, actors, guards, and adapters.",
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
        { label: "Installation", href: "/docs/getting-started/installation" },
        { label: "Your First Loop", href: "/docs/getting-started/your-first-loop" }
      ]
    },
    {
      icon: "🧠",
      title: "Core Concepts",
      description:
        "Learn the Loop Engine model - actors, guards, signals, evidence, and how decision governance works.",
      accentColor: "#4338CA",
      links: [
        { label: "What is a Loop?", href: "/docs/concepts/what-is-a-loop" },
        { label: "The Actor Model", href: "/docs/concepts/actor-model" },
        { label: "Guards and Policy", href: "/docs/concepts/guards-and-policy" },
        { label: "Decision Governance", href: "/docs/concepts/decision-governance" },
        { label: "When to Use Loop Engine", href: "/docs/concepts/when-to-use" }
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
      title: "Integrations & Packages",
      description:
        "Connect Loop Engine to any AI provider, storage backend, or platform. Full package API reference.",
      accentColor: "#D97706",
      links: [
        { label: "All Integrations", href: "/docs/integrations" },
        { label: "@loop-engine/sdk", href: "/docs/packages/sdk" },
        { label: "AI Providers", href: "/docs/integrations/anthropic" },
        { label: "Storage Adapters", href: "/docs/integrations/postgres" }
      ]
    }
  ];

  const popularColumns = [
    {
      heading: "Architecture & Concepts",
      links: [
        {
          label: "Architecture overview",
          href: "/docs/getting-started/architecture",
          description: "How runtime, actors, and policy interact in one loop system."
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
              Everything you need to build governed, observable enterprise loops. Start with the quick start,
              explore core concepts, or jump straight to the package reference.
            </p>
            <div className="inline-flex max-w-full rounded-[var(--radius-md)] border border-[var(--color-border-dark)] bg-[rgba(15,23,42,0.82)] px-4 py-3 font-mono text-[var(--text-sm)] text-[var(--color-code-text)] shadow-[var(--shadow-sm)]">
              npm install @loop-engine/sdk
            </div>
          </div>

          <div className="hidden rounded-[var(--radius-lg)] border border-[var(--color-border-dark)] bg-[rgba(255,255,255,0.03)] p-6 shadow-[var(--shadow-md)] lg:block">
            <svg viewBox="0 0 480 260" role="img" aria-label="Loop Engine architecture diagram" className="h-auto w-full">
              <rect x="8" y="8" width="464" height="244" rx="12" fill="none" stroke="rgba(148,163,184,0.45)" />
              <text x="240" y="36" textAnchor="middle" fill="white" fontSize="18" fontFamily="var(--font-display)">
                Your System
              </text>

              <rect x="176" y="92" width="130" height="44" rx="8" fill="var(--color-primary)" opacity="0.95" />
              <text x="241" y="120" textAnchor="middle" fill="white" fontSize="13" fontFamily="var(--font-body)">
                Loop Engine
              </text>

              <text x="68" y="120" fill="white" fontSize="12" fontFamily="var(--font-body)">
                AI Agent
              </text>
              <path d="M118 114 L172 114" stroke="white" strokeWidth="1.5" markerEnd="url(#arrow)" />

              <text x="350" y="120" fill="white" fontSize="12" fontFamily="var(--font-body)">
                Workflow
              </text>
              <path d="M308 114 L344 114" stroke="white" strokeWidth="1.5" markerEnd="url(#arrow)" />

              <text x="76" y="174" fill="white" fontSize="12" fontFamily="var(--font-body)">
                Human
              </text>
              <path d="M118 168 L172 140" stroke="white" strokeWidth="1.5" markerEnd="url(#arrow)" />

              <text x="350" y="174" fill="white" fontSize="12" fontFamily="var(--font-body)">
                Events
              </text>
              <path d="M306 138 L344 166" stroke="white" strokeWidth="1.5" markerEnd="url(#arrow)" />

              <text x="210" y="176" textAnchor="end" fill="white" fontSize="12" fontFamily="var(--font-body)">
                Guards
              </text>
              <path d="M220 164 L220 138" stroke="white" strokeWidth="1.5" markerEnd="url(#arrow)" />

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
