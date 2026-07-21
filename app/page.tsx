import { BossLoopMark } from "@/components/logo";
import { CodeTabs } from "@/components/home/CodeTabs";
import { NpmInstallChip } from "@/components/home/NpmInstallChip";
import { RuntimeFlowDiagram } from "@/components/home/RuntimeFlowDiagram";
import { RuntimeLayerStack } from "@/components/home/RuntimeLayerStack";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import {
  LOOP_ENGINE_AUDITOR_LINE,
  LOOP_ENGINE_HERO_HEADLINE,
  LOOP_ENGINE_META_DESCRIPTION,
  LOOP_ENGINE_PRIMARY,
  LOOP_ENGINE_SUPPORTING
} from "@/lib/betterdata-ecosystem";
import { SITE, LEGACY, npmPkgUrl } from "@/lib/site-config";
import { DEMO_URL, SALES_CONTACT_URL } from "@/lib/contact-routes";
import { EnterpriseStackDiagram } from "@/components/site/EnterpriseStackDiagram";
import { WhereToGoStrip } from "@/components/site/WhereToGoStrip";

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
      "Sonar grounds research with citations; Boss Loops runs the governed incident FSM; PagerDuty delivers human review and escalation. End-to-end audit trail on every step.",
    capabilities: [
      "Research steps use Sonar with domain filters and required citations",
      "Risk classification and human gates before any PagerDuty trigger",
      "Custom details on incidents include audit references for post-mortem review"
    ],
    docsHref: "/docs/integrations/perplexity-pagerduty",
    featured: true
  },
  {
    name: "OpenClaw",
    badge: "Featured Integration",
    description:
      "OpenClaw is the agent that acts. Boss Loops is the runtime that governs what it's allowed to do.",
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
      "Google Gemini as a governed Boss Loops actor — native Google AI SDK, Gemini 1.5 Pro and 2.0 Flash supported.",
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
      "Grounded web retrieval with cited sources for decision loop steps that need verifiable, real-time information — regulatory lookups, supplier news, compliance research.",
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
    description: "Approval gates and operational evidence layered onto n8n automations."
  },
  {
    name: "Temporal",
    badge: "Coming soon",
    description:
      "Governance and decision control layered onto Temporal execution — policy gates and evidence around long-running workflows."
  }
];

async function getGitHubStars(): Promise<number> {
  try {
    const response = await fetch(LEGACY.ghApiRepo, {
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
    const response = await fetch(LEGACY.blogTagFeed, {
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
  return <HomeContent />;
}

async function HomeContent() {
  const stars = await getGitHubStars();
  const relatedPosts = await getRelatedLoopEnginePosts();
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE.baseUrl}/#website`,
        url: SITE.baseUrl,
        name: SITE.brandName,
        description: LOOP_ENGINE_META_DESCRIPTION,
        publisher: { "@id": `${SITE.baseUrl}/#org` }
      },
      {
        "@type": "Organization",
        "@id": `${SITE.baseUrl}/#org`,
        name: "Better Data",
        url: "https://betterdata.co",
        sameAs: [
          LEGACY.githubOrg,
          LEGACY.npmOrg,
          LEGACY.x
        ]
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE.baseUrl}/#software`,
        name: SITE.productName,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Governed Decision Intelligence",
        operatingSystem: "Node.js 18+",
        url: SITE.baseUrl,
        downloadUrl: npmPkgUrl("sdk"),
        softwareVersion: "0.1.0",
        description: LOOP_ENGINE_PRIMARY,
        license: "https://www.apache.org/licenses/LICENSE-2.0",
        author: { "@id": `${SITE.baseUrl}/#org` },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD"
        },
        codeRepository: LEGACY.github,
        programmingLanguage: "TypeScript",
        keywords:
          "governed decision intelligence, system of record for decisions, Decision Record, decision governance, auditable AI decisions, evidence providers, decision loops, deterministic guards, AI agent governance, operational accountability, TypeScript, open source"
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
          background: "linear-gradient(180deg, var(--color-surface-alt) 0%, var(--color-surface) 100%)",
          borderBottom: "1px solid var(--color-border)"
        }}
      >
        <div className="relative mx-auto w-full max-w-[1200px] px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[800px]">
            <p className="fade-in-up" style={{ animationDelay: "0ms" }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-primary)"
                }}
              >
                Governed Decision Intelligence
              </span>
            </p>
            <p className="fade-in-up mt-2" style={{ animationDelay: "40ms" }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-sm)",
                  color: "var(--color-ink-tertiary)"
                }}
              >
                AI and agents now participate in operational decisions. &ldquo;The model said it was fine&rdquo; is not an answer operations or risk teams can defend.
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
              {LOOP_ENGINE_HERO_HEADLINE}
            </h1>
            <p
              className="fade-in-up mt-5"
              style={{
                animationDelay: "160ms",
                fontSize: "var(--text-md)",
                color: "var(--color-ink-tertiary)",
                maxWidth: 640,
                lineHeight: 1.65
              }}
            >
              {LOOP_ENGINE_SUPPORTING}
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
              Supplier invoice approvals. Purchase approvals. Inventory exceptions. Returns triage. Credit reviews.
              The decisions your operation makes every day — with the approvals, the exceptions, and the
              &ldquo;prove why we approved it&rdquo; that comes months later.
            </p>
            <p
              className="fade-in-up mt-3"
              style={{
                animationDelay: "240ms",
                fontSize: "var(--text-sm)",
                color: "var(--color-ink-secondary)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.02em",
                maxWidth: 620,
                lineHeight: 1.7,
              }}
            >
              {LOOP_ENGINE_AUDITOR_LINE}
            </p>

            <div
              className="fade-in-up mt-9 flex flex-col items-stretch gap-3 min-[480px]:items-center min-[480px]:flex-row min-[480px]:flex-wrap"
              style={{ animationDelay: "280ms" }}
            >
              <a
                href={DEMO_URL}
                rel="noreferrer"
                target="_blank"
                className="le-cta-button inline-flex items-center"
                style={{
                  background: "var(--color-primary)",
                  color: "#fff",
                  borderRadius: "var(--radius-sm)",
                  padding: "12px 28px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "var(--text-sm)"
                }}
              >
                Try the demo
              </a>
              <Link
                href="/docs/getting-started/quick-start"
                className="inline-flex items-center"
                style={{
                  border: "1px solid var(--color-border)",
                  color: "var(--color-ink)",
                  borderRadius: "var(--radius-sm)",
                  padding: "12px 28px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "var(--text-sm)"
                }}
              >
                Self-host with OSS
              </Link>
              <a
                href={SALES_CONTACT_URL}
                rel="noreferrer"
                target="_blank"
                className="inline-flex items-center"
                style={{
                  border: "1px solid var(--color-border)",
                  color: "var(--color-ink-secondary)",
                  borderRadius: "var(--radius-sm)",
                  padding: "12px 28px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "var(--text-sm)"
                }}
              >
                Talk to us
              </a>
            </div>

            <p
              className="fade-in-up mt-8"
              style={{
                animationDelay: "320ms",
                fontSize: "var(--text-xs)",
                color: "var(--color-ink-muted)",
                fontFamily: "var(--font-sans)"
              }}
            >
              Apache-2.0 open core · Governance verifiable in the open engine ·{" "}
              <a
                href="https://betterdata.co/trust"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-ink-tertiary)", textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                Trust Center →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* The Decision Record — the object we sell */}
      <section
        id="decisions-deserve-a-system-of-record"
        style={{
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
          padding: "72px 0"
        }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "var(--text-xs)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-primary)"
            }}
          >
            The Decision Record
          </p>
          <h2 className="mt-3">Decisions deserve a system of record</h2>
          <p style={{ marginTop: 12, maxWidth: 860, color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
            One record holds the situation, the evidence — frozen at the moment it was used, from governed sources,
            not a link that may have changed since — the policies that applied, the people and AI that participated,
            the outcome that followed, and the learning it produced. GRC holds policy. BI holds metrics. Workflow
            holds steps. Chat holds the AI&apos;s reasoning until the window closes. None of them holds all of it,
            linked, as one auditable artifact.
          </p>
          <p style={{ marginTop: 10, maxWidth: 860, color: "var(--color-ink-secondary)", lineHeight: 1.7 }}>
            In Boss Loops this isn&apos;t a convention a well-behaved workflow follows — it&apos;s{" "}
            <strong>enforced by the engine</strong>. A consequential decision cannot commit without frozen evidence,
            recorded provenance, and a record reconstructable from its primary objects — immutable, hashable,
            replayable by construction, not by discipline. Approvals are captured on that record with the evidence
            presented, under the approver&apos;s own name.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <FeatureCard
              title="Evidence frozen at capture"
              icon={
                <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
                  <rect x="6" y="8" width="20" height="16" rx="2" stroke="var(--color-primary)" strokeWidth="2" fill="none" />
                  <path d="M10 14h12M10 18h8" stroke="var(--color-primary-mid)" strokeWidth="2" />
                </svg>
              }
              body="What they knew at the time — value, source definition, freshness, and provenance snapshotted the moment evidence informs a decision. Not a screenshot, not a stale export."
            />
            <FeatureCard
              title="Approvals on the record"
              icon={
                <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
                  <circle cx="8" cy="16" r="4" fill="var(--color-primary-mid)" />
                  <circle cx="16" cy="10" r="4" fill="var(--color-primary)" />
                  <circle cx="24" cy="16" r="4" fill="var(--color-primary-dark)" />
                </svg>
              }
              body="Approvers sign under their own name, and the sign-off is captured with the evidence presented. Human, automation, and AI actors share one attribution model."
            />
            <FeatureCard
              title="Answerable years later"
              icon={<BossLoopMark size={32} color="var(--color-primary)" />}
              body="Who decided, on what evidence, under which policy, and whether it worked — retrieved as a record, not reconstructed across four systems."
            />
          </div>

          <article
            className="mt-10 rounded-xl border p-6 md:p-8"
            style={{ borderColor: "var(--color-border)", background: "var(--color-surface-alt)" }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "var(--text-xs)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-ink-muted)"
              }}
            >
              What it looks like in practice
            </p>
            <p style={{ marginTop: 12, maxWidth: 900, color: "var(--color-ink-secondary)", lineHeight: 1.75 }}>
              A refrigerated shipment records a temperature excursion in transit. Instead of an alert someone has to
              chase, it opens a decision: <em>lot release review</em>. Boss Loops attaches governed evidence
              automatically — the peak excursion from the validated monitoring system, the batch&apos;s stability data,
              the release criteria from the current SOP — each frozen with its source and timestamp. Policy checks the
              reading against the criteria. Quality reviews; the approver signs off under their own name, and the
              record captures the sign-off with the evidence presented. A year later, when someone asks why the lot
              was released, the answer isn&apos;t a
              scramble across four systems. It&apos;s a record.
            </p>
            <p style={{ marginTop: 12, maxWidth: 900, color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--color-ink-primary)" }}>This is a pattern, not a vertical.</strong> The
              same record that defends a lot release defends a capital authorization, a credit approval, a sole-source
              supplier commitment, or a claims adjudication.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Supplier invoice approval",
                "Purchase approval",
                "Inventory exceptions",
                "Returns triage",
                "Customer credit review"
              ].map((useCase) => (
                <Link
                  key={useCase}
                  href="/use-cases"
                  className="transition-colors hover:border-[var(--color-primary-mid)] hover:text-[var(--color-primary-dark)]"
                  style={{
                    border: "1px solid var(--color-border)",
                    borderRadius: 999,
                    padding: "5px 12px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 500,
                    color: "var(--color-ink-secondary)",
                    background: "var(--color-surface)",
                    textDecoration: "none"
                  }}
                >
                  {useCase} →
                </Link>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* Existing semantics — no ontology project */}
      <section
        id="existing-semantics"
        style={{
          background: "var(--color-surface-subtle)",
          borderTop: "1px solid var(--color-border)",
          padding: "72px 0"
        }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "var(--text-xs)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-primary)"
            }}
          >
            Your data context, unchanged
          </p>
          <h2 className="mt-3">Consume the semantics you already govern</h2>
          <p style={{ marginTop: 12, maxWidth: 860, color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
            Your ERP holds the invoice. Snowflake and Looker hold the metric definitions your business already runs on.
            Boss Loops links to them — frozen at decision time — and records why you acted. No ontology project. No
            second definition of your business to populate and maintain.
          </p>
          <div
            className="mt-10 rounded-xl border p-6 md:p-8"
            style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
          >
            <EnterpriseStackDiagram />
          </div>
          <p style={{ marginTop: 16, fontSize: "var(--text-sm)", color: "var(--color-ink-muted)" }}>
            <Link href="/product/reuse-dont-rebuild" style={{ color: "var(--color-primary)" }}>
              Reuse, don&apos;t rebuild →
            </Link>
          </p>
          <WhereToGoStrip />
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
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "var(--text-xs)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-primary)"
            }}
          >
            Architecture
          </p>
          <h2 className="mt-3">Governed decision runtime</h2>
          <p style={{ marginTop: 12, maxWidth: 860, color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
            Boss Loops is the operational substrate where AI-assisted work becomes accountable. Intelligence proposes;
            loops and guards decide whether a transition may commit; channels carry human oversight; integrations execute
            only after policy passes. Evidence is recorded at the moment of the decision — not rebuilt from logs later.
          </p>

          <div
            className="mt-8 rounded-xl border p-6 md:p-8"
            style={{
              borderColor: "var(--color-border)",
              background: "var(--color-surface-alt)"
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
              Canonical runtime flow
            </p>
            <div className="mt-4">
              <RuntimeFlowDiagram />
            </div>
            <p style={{ marginTop: 14, fontSize: "var(--text-sm)", color: "var(--color-ink-muted)", lineHeight: 1.65 }}>
              Providers never bypass governance. Integrations do not call models directly without a governed loop
              transition. Durable workflow engines may execute approved work — loops govern whether that work is allowed.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <PlatformPillar
              title="Runtime layers"
              items={[
                {
                  label: "Model Providers",
                  body: "Intelligence systems — analyze, recommend, classify. They do not write to CRM or approve in Slack."
                },
                {
                  label: "Evidence Providers",
                  body: "Governed evidence — Snowflake semantic views, Looker metrics, Samsara readings — frozen onto the Decision Record with qualification inherited from the source."
                },
                {
                  label: "Channels",
                  body: "Human coordination — Slack, Teams, email, doc comments. Not systems of record."
                },
                {
                  label: "Integrations",
                  body: "Operational execution — Salesforce, Jira, Sheets apply, APIs. Not governance."
                }
              ]}
            />
            <PlatformPillar
              title="Governance"
              items={[
                {
                  label: "Guards",
                  body: "Deterministic policy at runtime — enforce rules, constrain execution, require evidence."
                },
                {
                  label: "Evidence",
                  body: "Structured context on every transition for audit and operational learning."
                },
                {
                  label: "Human oversight",
                  body: "Human actors use the same attribution and guard model as automation and AI agents."
                }
              ]}
            />
          </div>

          <article
            className="mt-8"
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
              Workflows vs Boss Loops
            </p>
            <p style={{ marginTop: 10, color: "var(--color-ink-secondary)", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--color-ink-primary)" }}>Workflows define the path.</strong>{" "}
              Temporal, n8n, and application orchestration coordinate durable steps.
            </p>
            <p style={{ marginTop: 8, color: "var(--color-ink-secondary)", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--color-ink-primary)" }}>Boss Loops governs the transitions.</strong>{" "}
              Boss Loops decides who may move state, under which guards, with what evidence — before side effects land in
              your systems.
            </p>
            <Link
              href="/docs/concepts/loop-engine-vs-workflow-engines"
              className="mt-4 inline-block"
              style={{ color: "var(--color-primary)", fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)" }}
            >
              Boss Loops vs workflow engines →
            </Link>
          </article>

          <article
            className="mt-8 rounded-xl border p-6 md:p-8"
            style={{ borderColor: "var(--color-border)", background: "var(--color-surface-alt)" }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "var(--text-xs)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-ink-muted)"
              }}
            >
              Evidence Providers
            </p>
            <h3 style={{ marginTop: 10, fontSize: "var(--text-xl)" }}>Consume the semantics you already govern</h3>
            <p style={{ marginTop: 10, maxWidth: 860, color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
              Your warehouse and BI investments already define what the numbers mean. Boss Loops attaches that
              definition to the Decision Record — frozen at capture, with qualification inherited from the source,
              never asserted by the loop. No re-modeling your business to get there.
            </p>
            <ul className="mt-4 space-y-2">
              {[
                { badge: "Preview", text: "Looker semantic evidence on the Alpine golden record" },
                { badge: "Planned", text: "Snowflake governed semantic views" },
                { badge: "Planned", text: "Samsara operational readings at decision time" }
              ].map((row) => (
                <li key={row.text} className="flex items-center gap-3">
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      fontSize: "var(--text-xs)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      border: "1px solid var(--color-border)",
                      borderRadius: 999,
                      padding: "3px 10px",
                      color: row.badge === "Preview" ? "var(--color-primary)" : "var(--color-ink-muted)",
                      background: "var(--color-surface)",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {row.badge}
                  </span>
                  <span style={{ color: "var(--color-ink-secondary)", fontSize: "var(--text-sm)" }}>{row.text}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/docs/concepts/evidence-providers"
              className="mt-5 inline-block"
              style={{ color: "var(--color-primary)", fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)" }}
            >
              How Evidence Providers work →
            </Link>
          </article>

          <div className="mt-8 flex flex-col items-start gap-3 min-[520px]:flex-row min-[520px]:items-center">
            <Link
              href="/docs/getting-started/quick-start"
              className="inline-flex items-center"
              style={{
                background: "var(--color-primary)",
                color: "#fff",
                borderRadius: "var(--radius-sm)",
                padding: "11px 22px",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "var(--text-sm)"
              }}
            >
              Self-host with the SDK
            </Link>
            <Link
              href="/docs/concepts/runtime-platform-direction"
              className="inline-flex items-center"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-ink-secondary)",
                borderRadius: "var(--radius-sm)",
                padding: "11px 22px",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "var(--text-sm)"
              }}
            >
              Self-host direction →
            </Link>
            <Link
              href="/docs/cloud"
              className="inline-flex items-center"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-ink-secondary)",
                borderRadius: "var(--radius-sm)",
                padding: "11px 22px",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "var(--text-sm)"
              }}
            >
              Boss Loops Cloud (hosted) →
            </Link>
          </div>
        </div>
      </section>

      {/* Open core — the trust layer */}
      <section
        style={{
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
          padding: "72px 0"
        }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "var(--text-xs)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-primary)"
            }}
          >
            Open core · Apache-2.0
          </p>
          <h2 className="mt-3">Governance you can verify, not take on faith</h2>
          <p style={{ marginTop: 12, maxWidth: 860, color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
            Anyone can say &ldquo;governed.&rdquo; The Boss Loops engine, the evidence contracts, and the conformance
            suite are open — inspect them, self-host them, and prove the invariants yourself. The invariants hold in
            the open engine, not behind a paywall: a consequential decision cannot commit without frozen evidence,
            recorded provenance, and a record reconstructable from its primary objects.
          </p>
          <p style={{ marginTop: 10, maxWidth: 860, color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
            Because the conformance suite is an executable artifact, &ldquo;every evidence source in this decision
            conformed to the contract&rdquo; is a statement your team can verify — not a marketing claim. What the
            hosted tier adds isn&apos;t the governance. It&apos;s production Evidence Providers, curated policy packs,
            and the Decision Operations workspace.
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
            Apache-2.0 with explicit patent grant — fully permissive, OSI-approved, patent-safe.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 min-[520px]:flex-row min-[520px]:items-center">
            <a
              href={LEGACY.github}
              rel="noreferrer"
              target="_blank"
              className="inline-flex items-center"
              style={{
                background: "var(--color-primary)",
                color: "#fff",
                borderRadius: "var(--radius-sm)",
                padding: "11px 22px",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "var(--text-sm)"
              }}
            >
              Inspect the engine on GitHub
            </a>
            <Link
              href="/docs/getting-started/quick-start"
              className="inline-flex items-center"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-ink-secondary)",
                borderRadius: "var(--radius-sm)",
                padding: "11px 22px",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "var(--text-sm)"
              }}
            >
              Self-host quick start →
            </Link>
            <Link
              href="/docs/concepts/decision-governance"
              className="inline-flex items-center"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-ink-secondary)",
                borderRadius: "var(--radius-sm)",
                padding: "11px 22px",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "var(--text-sm)"
              }}
            >
              Why decision governance →
            </Link>
            <div className="max-w-full overflow-x-auto">
              <NpmInstallChip />
            </div>
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
            Boss Loops governs actions that are executed through Commerce Gateway. It is a control layer for policy, guards,
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
              Agent → Registry (discover) → Gateway (execute) → Boss Loops (govern) → Recorded outcome
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
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "var(--text-sm)",
              }}
            >
              Commerce Gateway
            </a>
            <a
              href={`https://app.betterdata.co/sign-up?utm_source=${LEGACY.domainHost}&utm_medium=site&utm_campaign=oss_handoff`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-ink-secondary)",
                borderRadius: "var(--radius-sm)",
                padding: "11px 22px",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
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
            Boss Loops is Apache-2.0 open operational infrastructure with a first-class path on Better Data. Cross-module
            architecture updates, hosted path guidance, and launch context are published on the Better Data blog.
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
              href={LEGACY.blogTag}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-primary)", fontFamily: "var(--font-mono)" }}
            >
              View related posts →
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
            Runtime connections
          </p>
          <h2 className="mt-3">Three layers, one governance runtime</h2>
          <p style={{ marginTop: 12, maxWidth: 760, color: "var(--color-ink-tertiary)" }}>
            <strong>Model Providers</strong> generate intelligence. <strong>Evidence Providers</strong> attach governed
            evidence. <strong>Channels</strong> coordinate humans. <strong>Integrations</strong> execute against systems
            of record. They are not interchangeable — Boss Loops governs transitions between them with guards and
            evidence.
          </p>
          <div className="mt-10">
            <RuntimeLayerStack />
          </div>
          <p
            style={{
              marginTop: 32,
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-primary)"
            }}
          >
            Featured adapters & patterns
          </p>
          <p style={{ marginTop: 8, maxWidth: 760, color: "var(--color-ink-muted)", fontSize: "var(--text-sm)" }}>
            npm adapters wire each layer into <code>createLoopSystem</code>. Boss Loops is not a generic integration
            platform or Slack bot.
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
          <span>Boss Loops is an open infrastructure project created by</span>
          <a href="https://betterdata.co" rel="noreferrer" target="_blank" style={{ color: "var(--color-primary)" }}>
            Better Data
          </a>
          <span>· Apache-2.0 ·</span>
          <a href={LEGACY.github} rel="noreferrer" target="_blank">
            {stars >= 100 ? `★ ${stars}` : "GitHub →"}
          </a>
        </div>
      </section>
    </>
  );
}

function PlatformPillar({
  title,
  items
}: {
  title: string;
  items: Array<{ label: string; body: string }>;
}) {
  return (
    <article
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        background: "var(--color-surface-alt)",
        padding: "22px 20px"
      }}
    >
      <h3 style={{ fontSize: "var(--text-lg)" }}>{title}</h3>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.label}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--color-primary)"
              }}
            >
              {item.label}
            </p>
            <p style={{ marginTop: 6, color: "var(--color-ink-tertiary)", lineHeight: 1.65, fontSize: "var(--text-sm)" }}>
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </article>
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
