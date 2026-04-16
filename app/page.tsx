import { LoopEngineIcon } from "@/components/logo";
import { CodeTabs } from "@/components/home/CodeTabs";
import { NpmInstallChip } from "@/components/home/NpmInstallChip";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

const packages = [
  { name: "@loop-engine/sdk", slug: "sdk", description: "High-level entry point for loop systems." },
  { name: "@loop-engine/core", slug: "core", description: "Canonical types and model contracts." },
  { name: "@loop-engine/runtime", slug: "runtime", description: "Loop engine execution lifecycle." },
  { name: "@loop-engine/dsl", slug: "dsl", description: "YAML and builder loop definition APIs." },
  { name: "@loop-engine/events", slug: "events", description: "Event contracts and event bus types." },
  { name: "@loop-engine/guards", slug: "guards", description: "Built-in and custom guard registry." },
  { name: "@loop-engine/actors", slug: "actors", description: "Actor model and attribution helpers." },
  { name: "@loop-engine/observability", slug: "observability", description: "Metrics, timelines, replay." }
];

type IntegrationCard = {
  name: string;
  badge: string;
  description: string;
  logoPath?: string;
  capabilities?: string[];
  docsHref?: string;
  npmHref?: string;
  npmLabel?: string;
  featured?: boolean;
};

type RelatedPost = {
  id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  tags?: string[];
};

const integrations: IntegrationCard[] = [
  {
    name: "Perplexity + PagerDuty",
    badge: "Featured pattern",
    description:
      "Sonar grounds research with citations; Loop Engine runs the governed incident FSM; PagerDuty delivers human review and escalation. End-to-end audit trail on every step.",
    capabilities: [
      "Research steps use Sonar with domain filters and required citations",
      "Risk classification and human gates before any PagerDuty trigger",
      "Custom details on incidents include audit references for compliance review"
    ],
    docsHref: "/docs/integrations/perplexity-pagerduty",
    featured: true
  },
  {
    name: "OpenClaw",
    badge: "Featured Integration",
    description:
      "OpenClaw is the agent that acts. Loop Engine is the runtime that governs what it's allowed to do.",
    capabilities: [
      "Wrap OpenClaw skills with hard approval gates - structural, not prompt-based",
      "Route PENDING_HUMAN_APPROVAL events to WhatsApp, Telegram, Slack, or Discord"
    ],
    docsHref: "/docs/examples/openclaw",
    npmHref: "https://www.npmjs.com/package/@loop-engine/adapter-openclaw",
    npmLabel: "@loop-engine/adapter-openclaw"
  },
  {
    name: "Vercel AI SDK",
    badge: "Live Integration",
    description:
      "Wrap any Vercel AI SDK tool call with structural approval gates and audit trails. Drop-in compatible with useChat and streamText.",
    capabilities: [
      "requiresApproval() gate - structural, not prompt-based, cannot be injected away",
      "Full transition audit trail on every tool call, pass or approve"
    ],
    docsHref: "/docs/integrations/vercel-ai",
    npmHref: "https://www.npmjs.com/package/@loop-engine/adapter-vercel-ai",
    npmLabel: "@loop-engine/adapter-vercel-ai"
  },
  {
    name: "PagerDuty",
    badge: "Live Integration",
    description:
      "AI agent actions page your on-call engineer. No new approval UI - your team already lives in PagerDuty.",
    capabilities: [
      "PENDING_HUMAN_APPROVAL triggers a PagerDuty incident with full loop context and approval link",
      "Incident auto-resolves when the loop is approved or rejected"
    ],
    docsHref: "/docs/integrations/pagerduty",
    npmHref: "https://www.npmjs.com/package/@loop-engine/adapter-pagerduty",
    npmLabel: "@loop-engine/adapter-pagerduty"
  },
  {
    name: "Claude",
    badge: "Live Integration",
    logoPath: "/logos/anthropic.svg",
    description:
      "AI actor decisions with full governance — confidence scoring, prompt attribution, and hard guard enforcement at the runtime level.",
    capabilities: [
      "Confidence guard blocks low-certainty transitions - structural, not prompt-based",
      "Prompt hash recorded on every AIAgentActor for audit trail",
      "Human-only guard enforces approval boundary regardless of model instructions"
    ],
    docsHref: "/docs/packages/adapter-anthropic",
    npmHref: "https://www.npmjs.com/package/@loop-engine/adapter-anthropic",
    npmLabel: "@loop-engine/adapter-anthropic"
  },
  {
    name: "OpenAI",
    badge: "Live Integration",
    logoPath: "/logos/openai.svg",
    description:
      "Same governance model for GPT-4o and o-series — identical guard enforcement, same audit trail, drop-in alongside Claude in multi-model loops.",
    capabilities: [
      "Structured JSON response parsing via response_format built in",
      "provider field distinguishes Claude vs GPT-4o in the audit trail",
      "Works alongside adapter-anthropic in the same loop definition"
    ],
    docsHref: "/docs/packages/adapter-openai",
    npmHref: "https://www.npmjs.com/package/@loop-engine/adapter-openai",
    npmLabel: "@loop-engine/adapter-openai"
  },
  {
    name: "Grok",
    badge: "Live Integration",
    logoPath: "/logos/xai.svg",
    description:
      "Governed AI actors via xAI's Grok API — OpenAI-compatible format, same guard enforcement as other adapters.",
    capabilities: [
      "OpenAI-compatible API - drop-in with adapter-openai pattern",
      "Grok 3 and Grok 3 Mini supported",
      "provider: \"grok\" field distinguishes in audit trail"
    ],
    docsHref: "/docs/packages/adapter-grok",
    npmHref: "https://www.npmjs.com/package/@loop-engine/adapter-grok",
    npmLabel: "@loop-engine/adapter-grok"
  },
  {
    name: "Gemini",
    badge: "Live Integration",
    logoPath: "/logos/gemini.svg",
    description:
      "Google Gemini as a governed Loop Engine actor — native Google AI SDK, Gemini 1.5 Pro and 2.0 Flash supported.",
    capabilities: [
      "Native @google/generative-ai SDK (not OpenAI-compatible)",
      "Automatic JSON code fence stripping - handles Gemini quirks",
      "Gemini 1.5 Pro, Flash, and 2.0 Flash supported"
    ],
    docsHref: "/docs/packages/adapter-gemini",
    npmHref: "https://www.npmjs.com/package/@loop-engine/adapter-gemini",
    npmLabel: "@loop-engine/adapter-gemini"
  },
  {
    name: "Perplexity Sonar",
    badge: "New adapter",
    logoPath: "/logos/perplexity.svg",
    description:
      "Grounded web retrieval with cited sources for Loop steps that need verifiable, real-time information — regulatory lookups, supplier news, compliance research.",
    capabilities: [
      "Citations are first-class output for audit and evidence attachments",
      "Domain filters and recency filters map directly to Sonar API parameters",
      "Implements guardEvidence to mask pplx-* keys in logged payloads"
    ],
    docsHref: "/docs/packages/adapter-perplexity"
  },
  {
    name: "n8n",
    badge: "Coming soon",
    description: "Stateful approval checkpoints and auditable loop orchestration for n8n automations."
  },
  {
    name: "Temporal",
    badge: "Coming soon",
    description: "Loop Engine governance hooks for long-running Temporal workflows and human gates."
  }
];

async function getGitHubStars(): Promise<number> {
  try {
    const response = await fetch("https://api.github.com/repos/loopengine/loop-engine", {
      next: { revalidate: 3600 }
    });
    if (!response.ok) {
      return 0;
    }
    const data = (await response.json()) as { stargazers_count?: number };
    return data.stargazers_count ?? 0;
  } catch {
    return 0;
  }
}

async function getRelatedLoopEnginePosts(): Promise<RelatedPost[]> {
  try {
    const response = await fetch("https://betterdata.co/blog/tags/loop-engine/feed", {
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as { posts?: Array<{ id?: string; title?: string; slug?: string; publishedAt?: string; tags?: string[] }> };
    if (!data.posts?.length) {
      return [];
    }

    return data.posts
      .filter((post) => post.id && post.title && post.slug)
      .slice(0, 4)
      .map((post) => ({
        id: post.id as string,
        title: post.title as string,
        slug: post.slug as string,
        publishedAt: post.publishedAt,
        tags: post.tags ?? [],
      }));
  } catch {
    return [];
  }
}

export default function Home() {
  const architecture = ["SIGNAL", "LOOP ENGINE", "ACTOR", "TRANSITION", "EVIDENCE", "LEARNING"];

  return (
    <HomeContent architecture={architecture} />
  );
}

async function HomeContent({ architecture }: { architecture: string[] }) {
  const stars = await getGitHubStars();
  const relatedPosts = await getRelatedLoopEnginePosts();
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://loopengine.io/#website",
        url: "https://loopengine.io",
        name: "Loop Engine",
        description:
          "Open runtime for constrained, observable, and improvable enterprise operational loops.",
        publisher: { "@id": "https://loopengine.io/#org" }
      },
      {
        "@type": "Organization",
        "@id": "https://loopengine.io/#org",
        name: "Better Data, Inc.",
        url: "https://betterdata.co",
        sameAs: [
          "https://github.com/loopengine",
          "https://npmjs.com/org/loop-engine",
          "https://x.com/loopengineio"
        ]
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://loopengine.io/#software",
        name: "Loop Engine",
        applicationCategory: "DeveloperApplication",
        applicationSubCategory: "Runtime Library",
        operatingSystem: "Node.js 18+",
        url: "https://loopengine.io",
        downloadUrl: "https://npmjs.com/package/@loop-engine/sdk",
        softwareVersion: "0.1.0",
        description:
          "Open runtime for constrained, observable, and improvable enterprise operational loops.",
        license: "https://www.apache.org/licenses/LICENSE-2.0",
        author: { "@id": "https://loopengine.io/#org" },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD"
        },
        codeRepository: "https://github.com/loopengine/loop-engine",
        programmingLanguage: "TypeScript",
        keywords: "runtime, state machine, workflow, AI actor, enterprise, TypeScript, open source"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--color-surface-alt)",
          minHeight: "max(80vh, calc(100vh - 56px))",
          borderBottom: "1px solid var(--color-border)"
        }}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, color-mix(in srgb, var(--color-border) 100%, transparent) 0px, color-mix(in srgb, var(--color-border) 100%, transparent) 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, color-mix(in srgb, var(--color-border) 100%, transparent) 0px, color-mix(in srgb, var(--color-border) 100%, transparent) 1px, transparent 1px, transparent 32px)"
          }}
        />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-[800px]">
            <p className="fade-in-up" style={{ animationDelay: "0ms" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-primary)"
                }}
              >
                Open Infrastructure · Apache-2.0
              </span>
            </p>
            <p className="fade-in-up mt-2" style={{ animationDelay: "40ms" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-tertiary)"
                }}
              >
                Without governance, AI agents improvise — no approval gates, no audit trail, no accountability.
              </span>
            </p>
            <h1
              className="fade-in-up mt-3"
              style={{
                animationDelay: "80ms",
                fontSize: "clamp(var(--text-3xl), 6vw, var(--text-5xl))",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                maxWidth: 720
              }}
            >
              The control layer for AI-operated enterprises
            </h1>
            <p
              className="fade-in-up mt-5"
              style={{
                animationDelay: "160ms",
                fontSize: "var(--text-md)",
                color: "var(--color-ink-tertiary)",
                maxWidth: 540,
                lineHeight: 1.65
              }}
            >
              Loop Engine gives AI finite states, deterministic guards, and structured feedback.
              Not improvisation - control.
            </p>
            <p
              className="fade-in-up mt-4"
              style={{
                animationDelay: "200ms",
                fontSize: "var(--text-sm)",
                color: "var(--color-ink-muted)",
                maxWidth: 620,
                lineHeight: 1.65
              }}
            >
              A Loop is a named finite state machine — with typed actors, guard policies, and an immutable evidence
              trail on every transition.
            </p>
            <p
              className="fade-in-up mt-3"
              style={{
                animationDelay: "240ms",
                fontSize: "var(--text-sm)",
                color: "var(--color-ink-secondary)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.02em",
              }}
            >
              Install only what you govern.
            </p>

            <div
              className="fade-in-up mt-9 flex flex-col items-stretch gap-3 min-[480px]:items-center min-[480px]:flex-row min-[480px]:flex-wrap"
              style={{ animationDelay: "280ms" }}
            >
              <Link
                href="/docs/getting-started"
                className="le-cta-button inline-flex items-center"
                style={{
                  background: "var(--color-primary)",
                  color: "#fff",
                  borderRadius: "var(--radius-sm)",
                  padding: "12px 28px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-sm)"
                }}
              >
                Get started
              </Link>
              <a
                href="https://github.com/loopengine/loop-engine"
                rel="noreferrer"
                target="_blank"
                className="inline-flex items-center"
                style={{
                  border: "1px solid var(--color-border)",
                  color: "var(--color-ink-secondary)",
                  borderRadius: "var(--radius-sm)",
                  padding: "12px 28px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-sm)"
                }}
              >
                View on GitHub
              </a>
              <div className="max-w-full overflow-x-auto">
                <NpmInstallChip />
              </div>
            </div>

            <div className="fade-in-up mt-14 flex flex-wrap items-center gap-2 md:gap-3" style={{ animationDelay: "440ms" }}>
              {architecture.map((node, index) => (
                <div key={node} className="flex items-center gap-2">
                  <span
                    style={{
                      border: "1px solid var(--color-border)",
                      borderRadius: 999,
                      padding: "8px 12px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      letterSpacing: "0.04em"
                    }}
                  >
                    {node}
                  </span>
                  {index < architecture.length - 1 ? (
                    <span style={{ color: "var(--color-primary-mid)" }} aria-hidden>
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          padding: "72px 0"
        }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-primary)"
            }}
          >
            System context
          </p>
          <h2 className="mt-3">How Loop Engine fits into real systems</h2>
          <p style={{ marginTop: 12, maxWidth: 860, color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
            Most enterprise AI projects hit the same wall: a capable model, a data source it&apos;s not allowed to touch
            directly, and no structure for what happens between a signal and a recorded outcome. Loop Engine is the layer
            that sits in that gap.
          </p>
          <p style={{ marginTop: 10, maxWidth: 860, color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
            Loop Engine is the execution and control layer inside a larger operational stack. It does
            not replace your data warehouse, ERP, or application UI. It sits where decisions become
            actions, enforces bounded transitions, and records evidence on every state change.
          </p>
          <p style={{ marginTop: 10, maxWidth: 860, color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
            In practice: signals detect change, decision logic selects next action, Loop Engine
            executes inside explicit guardrails, evidence is captured for each transition, and the
            resulting feedback improves future decisions. This pattern is used in production systems,
            including the Better Data platform.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <article
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                background: "var(--color-surface-alt)",
                padding: "20px 18px"
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-muted)"
                }}
              >
                Loop Engine model
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {["Signal", "Loop Engine", "Actor", "Transition", "Evidence", "Learning"].map((item, idx, arr) => (
                  <div key={item} className="flex items-center gap-2">
                    <span
                      style={{
                        border: "1px solid var(--color-border)",
                        borderRadius: 999,
                        padding: "6px 10px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-xs)",
                        background: item === "Loop Engine" ? "var(--color-primary-light)" : "var(--color-surface)"
                      }}
                    >
                      {item}
                    </span>
                    {idx < arr.length - 1 ? (
                      <span style={{ color: "var(--color-primary-mid)" }} aria-hidden>
                        →
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </article>

            <article
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                background: "var(--color-surface-alt)",
                padding: "20px 18px"
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-muted)"
                }}
              >
                Better Data system model
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {["Sense", "Decide", "Execute", "Govern", "Improve"].map((item, idx, arr) => (
                  <div key={item} className="flex items-center gap-2">
                    <span
                      style={{
                        border: "1px solid var(--color-border)",
                        borderRadius: 999,
                        padding: "6px 10px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-xs)",
                        background: item === "Execute" ? "var(--color-primary-light)" : "var(--color-surface)"
                      }}
                    >
                      {item}
                    </span>
                    {idx < arr.length - 1 ? (
                      <span style={{ color: "var(--color-primary-mid)" }} aria-hidden>
                        →
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 10, color: "var(--color-ink-muted)", fontSize: "var(--text-sm)" }}>
                Loop Engine anchors the execution boundary while preserving full transition evidence.
              </p>
            </article>
          </div>

          <div className="mt-8 flex flex-col items-start gap-3 min-[520px]:flex-row min-[520px]:items-center">
            <Link
              href="/docs/getting-started/architecture"
              className="inline-flex items-center"
              style={{
                background: "var(--color-primary)",
                color: "#fff",
                borderRadius: "var(--radius-sm)",
                padding: "11px 22px",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-sm)"
              }}
            >
              See architecture guide
            </Link>
            <a
              href="https://betterdata.co/product"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-ink-secondary)",
                borderRadius: "var(--radius-sm)",
                padding: "11px 22px",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-sm)"
              }}
            >
              See system context in Better Data
            </a>
          </div>
        </div>
      </section>

      <section
        style={{
          background: "var(--color-surface-alt)",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          padding: "72px 0",
        }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-primary)",
            }}
          >
            Used with Commerce Gateway
          </p>
          <h2 className="mt-3">Governance sits on execution — not beside it</h2>
          <p style={{ marginTop: 12, maxWidth: 860, color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
            Loop Engine governs actions that are executed through Commerce Gateway. It is a control layer for policy, guards,
            and audit — not a standalone automation tool that replaces your gateway or operators.
          </p>
          <div
            className="mt-8 rounded-xl border p-6"
            style={{
              borderColor: "var(--color-border)",
              background: "var(--color-surface)",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-sm)",
              color: "var(--color-ink-secondary)",
              lineHeight: 1.8,
            }}
          >
            <p className="mb-3" style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--color-ink-muted)" }}>
              Commerce Agent pattern (illustrative — a composition, not a separate product):
            </p>
            <p>
              Agent → Registry (discover) → Gateway (execute) → Loop Engine (govern) → Recorded outcome
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://commercegateway.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
              style={{
                background: "var(--color-primary)",
                color: "#fff",
                borderRadius: "var(--radius-sm)",
                padding: "11px 22px",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-sm)",
              }}
            >
              Commerce Gateway
            </a>
            <a
              href="https://app.betterdata.co/sign-up?utm_source=loopengine.io&utm_medium=site&utm_campaign=oss_handoff"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-ink-secondary)",
                borderRadius: "var(--radius-sm)",
                padding: "11px 22px",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-sm)",
              }}
            >
              Open in Better Data
            </a>
          </div>
        </div>
      </section>

      <section
        style={{
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          padding: "72px 0",
        }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-primary)",
            }}
          >
            Related from Better Data
          </p>
          <h2 className="mt-3">Architecture notes and rollout updates</h2>
          <p style={{ marginTop: 12, maxWidth: 820, color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
            Loop Engine stays standalone and OSS-first. Cross-module architecture updates, hosted path guidance, and launch context are published on the Better Data blog.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {(relatedPosts.length > 0
              ? relatedPosts
              : [
                  {
                    id: "fallback-1",
                    title: "From Firefighting to Flow",
                    slug: "from-firefighting-to-flow",
                    publishedAt: "2026-01-12T22:28:00.000Z",
                    tags: ["loop-engine", "architecture"],
                  },
                ]
            ).map((post) => (
              <a
                key={post.id}
                href={`https://betterdata.co/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--color-surface-alt)",
                  padding: "18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <p style={{ fontSize: "var(--text-lg)", color: "var(--color-ink-primary)" }}>{post.title}</p>
                <p style={{ color: "var(--color-ink-muted)", fontSize: "var(--text-sm)" }}>
                  {post.publishedAt
                    ? new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }).format(new Date(post.publishedAt))
                    : "Recent post"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(post.tags ?? []).slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        border: "1px solid var(--color-border)",
                        borderRadius: 999,
                        padding: "3px 8px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-xs)",
                        color: "var(--color-ink-secondary)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="https://betterdata.co/blog/tags/loop-engine"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-primary)", fontFamily: "var(--font-mono)" }}
            >
              View Loop Engine tag →
            </a>
            <a
              href="https://betterdata.co/blog/tags/architecture"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-primary)", fontFamily: "var(--font-mono)" }}
            >
              View architecture posts →
            </a>
          </div>
        </div>
      </section>

      <section
        style={{
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          padding: "80px 0"
        }}
      >
        <div className="mx-auto grid w-full max-w-[1200px] gap-5 px-6 md:grid-cols-3 md:px-10">
          <FeatureCard
            title="Structure, not improvisation"
            icon={<LoopEngineIcon size={32} color="var(--color-primary)" />}
            body="AI works best when decisions are bounded, outcomes are measurable, and every action leaves evidence. Loop Engine provides that structure."
          />
          <FeatureCard
            title="Every actor accounted for"
            icon={
              <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
                <circle cx="8" cy="16" r="4" fill="var(--color-primary-mid)" />
                <circle cx="16" cy="10" r="4" fill="var(--color-primary)" />
                <circle cx="24" cy="16" r="4" fill="var(--color-primary-dark)" />
              </svg>
            }
            body="Human, automation, AI agent - the actor model treats all three identically. No action is anonymous. Every transition has attributed evidence."
          />
          <FeatureCard
            title="Loops learn"
            icon={
              <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
                <path d="M6 19c2-6 7-8 11-8 3 0 6 1 9 4" stroke="var(--color-primary)" strokeWidth="2" fill="none" />
                <path d="M22 6l4 1-2 4" stroke="var(--color-primary)" strokeWidth="2" fill="none" />
                <path d="M7 24h18" stroke="var(--color-border-dark)" strokeWidth="2" />
              </svg>
            }
            body="Each closed loop emits structured training signals. Forecasts improve. Lead times sharpen. The system gets better automatically."
          />
        </div>
      </section>

      <section
        style={{
          background: "var(--color-surface-subtle)",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          padding: "80px 0"
        }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-primary)"
            }}
          >
            Integrations
          </p>
          <h2 className="mt-3">Integrations across the agentic ecosystem</h2>
          <p style={{ marginTop: 12, maxWidth: 760, color: "var(--color-ink-tertiary)" }}>
            Adapters plug into the control layer — Loop Engine is not a generic “do anything” automation runner. Pair with
            Commerce Gateway when commerce execution needs the same guardrails.
          </p>
          <p
            style={{
              marginTop: 14,
              maxWidth: 760,
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              lineHeight: 1.65,
              color: "var(--color-ink-muted)"
            }}
          >
            Apache-2.0 with explicit patent grant — the only governed execution layer in this space with a fully
            permissive, OSI-approved, patent-safe license. Temporal and Inngest ship under SSPL.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {integrations.map((integration) => (
              <article
                key={integration.name}
                style={{
                  background: integration.featured ? "var(--color-surface)" : "var(--color-surface-alt)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: integration.featured ? "28px 28px 24px" : "22px 20px",
                  minHeight: integration.featured ? 260 : 190,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <IntegrationLogo name={integration.name} logoPath={integration.logoPath} />
                    <h3 style={{ fontSize: integration.featured ? "var(--text-xl)" : "var(--text-lg)" }}>
                      {integration.name}
                    </h3>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      color: integration.featured ? "var(--color-primary)" : "var(--color-ink-muted)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 999,
                      padding: "4px 10px",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {integration.badge}
                  </span>
                </div>
                <p style={{ color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>{integration.description}</p>
                {integration.capabilities?.length ? (
                  <ul className="mt-1 space-y-2">
                    {integration.capabilities.map((capability) => (
                      <li key={capability} className="flex gap-2">
                        <span style={{ color: "var(--color-primary)" }}>·</span>
                        <span style={{ color: "var(--color-ink-secondary)", lineHeight: 1.6 }}>{capability}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {integration.docsHref || integration.npmHref ? (
                  <div className="mt-auto flex flex-col gap-2 pt-2">
                    {integration.docsHref ? (
                      <Link
                        href={integration.docsHref}
                        style={{ color: "var(--color-primary)", fontFamily: "var(--font-mono)" }}
                      >
                        View integration docs →
                      </Link>
                    ) : null}
                    {integration.npmHref ? (
                      <a
                        href={integration.npmHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--color-primary)", fontFamily: "var(--font-mono)" }}
                      >
                        {(integration.npmLabel ?? "@loop-engine/adapter-openclaw") + " on npm →"}
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--color-surface-dark)", padding: "80px 0" }}>
        <div className="mx-auto grid w-full max-w-[1200px] gap-8 px-6 md:grid-cols-2 md:px-10">
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-primary-mid)"
              }}
            >
              Quick start
            </p>
            <h2 className="mt-3" style={{ color: "var(--color-code-text)" }}>
              Running in 60 seconds
            </h2>
            <ol className="mt-4 space-y-2" style={{ color: "var(--color-code-text)" }}>
              <li>
                <span className="mono">1.</span> Install the SDK
              </li>
              <li>
                <span className="mono">2.</span> Define your loop
              </li>
              <li>
                <span className="mono">3.</span> Start and transition
              </li>
              <li>
                <span className="mono">4.</span> Subscribe to events
              </li>
            </ol>
          </div>
          <CodeTabs />
        </div>
      </section>

      <section style={{ background: "var(--color-surface-alt)", padding: "80px 0" }}>
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <h2>Everything you need to build on</h2>
          <div className="mt-6 grid gap-4 min-[480px]:grid-cols-2 md:grid-cols-4">
            {packages.map((pkg) => (
              <Link
                key={pkg.name}
                href={`/docs/packages/${pkg.slug}`}
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  padding: "20px 24px",
                  transition: "all var(--dur-fast) var(--ease-out)"
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-xs)",
                    color: "var(--color-primary)"
                  }}
                >
                  {pkg.name}
                </p>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--color-ink-tertiary)", marginTop: 8 }}>
                  {pkg.description}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/docs/packages" style={{ color: "var(--color-primary)", fontFamily: "var(--font-mono)" }}>
              View all packages →
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: "24px 0", borderTop: "1px solid var(--color-border)" }}>
        <div
          className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-center gap-2 px-6 text-center md:px-10"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-ink-muted)"
          }}
        >
          <span>Loop Engine is an open infrastructure project created by</span>
          <a href="https://betterdata.co" rel="noreferrer" target="_blank" style={{ color: "var(--color-primary)" }}>
            Better Data
          </a>
          <span>· Apache-2.0 ·</span>
          <a href="https://github.com/loopengine/loop-engine" rel="noreferrer" target="_blank">
            ★ {stars}
          </a>
        </div>
      </section>
    </>
  );
}

function FeatureCard({ title, body, icon }: { title: string; body: string; icon: ReactNode }) {
  return (
    <article
      style={{
        padding: 32,
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        background: "var(--color-surface)",
        transition: "all var(--dur-base) var(--ease-out)"
      }}
    >
      <div>{icon}</div>
      <h3 style={{ marginTop: 16, fontSize: "var(--text-lg)" }}>{title}</h3>
      <p style={{ marginTop: 10, fontSize: "var(--text-base)", color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
        {body}
      </p>
    </article>
  );
}

function OpenClawPlaceholderIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden>
      <rect x="2" y="2" width="22" height="22" rx="6" fill="none" stroke="var(--color-primary-mid)" strokeWidth="1.5" />
      <path d="M8 13h10M13 8v10" stroke="var(--color-primary)" strokeWidth="1.5" />
    </svg>
  );
}

function IntegrationLogo({ name, logoPath }: { name: string; logoPath?: string }) {
  if (logoPath) {
    return (
      <Image
        src={logoPath}
        alt={name}
        width={80}
        height={24}
        style={{ height: 24, width: "auto", objectFit: "contain" }}
      />
    );
  }
  return <OpenClawPlaceholderIcon />;
}
