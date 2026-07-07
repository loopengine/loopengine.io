export type RuntimePartnerLayer = "provider" | "channel" | "integration" | "ecosystem";

export type Partner = {
  name: string;
  slug: string;
  logoPath?: string;
  description: string;
  runtimeLayer: RuntimePartnerLayer;
  docsPath: string;
  externalUrl?: string;
  adapterPackage?: string;
  certificationStatus?: "certified" | "in-review" | "community" | "pattern";
  marketingBadge?: string;
  installCommand?: string;
  /** When no npm adapter ships yet — Cloud connector or narrative pattern only */
  availability?: "oss-adapter" | "cloud-connector" | "pattern" | "ecosystem";
};

export const featuredChannelPartner: Partner = {
  name: "OpenClaw",
  slug: "openclaw",
  logoPath: "/logos/openclaw.svg",
  description:
    "Messenger Channel routing for PENDING_HUMAN_APPROVAL — WhatsApp, Telegram, Slack, and Discord with platform-resolved human identity.",
  runtimeLayer: "channel",
  docsPath: "/docs/integrations/openclaw",
  externalUrl: "https://openclaw.ai",
  adapterPackage: "@loop-engine/adapter-openclaw",
  certificationStatus: "certified",
  availability: "oss-adapter",
};

export const providerPartners: Partner[] = [
  {
    name: "Anthropic",
    slug: "anthropic",
    logoPath: "/logos/anthropic.svg",
    description:
      "Operational intelligence — classification, reasoning, and recommendations as governed AI actors with confidence gates and evidence.",
    runtimeLayer: "provider",
    docsPath: "/docs/packages/adapter-anthropic",
    adapterPackage: "@loop-engine/adapter-anthropic",
    certificationStatus: "certified",
    availability: "oss-adapter",
  },
  {
    name: "OpenAI",
    slug: "openai",
    logoPath: "/logos/openai.svg",
    description: "GPT-4o and o-series models as governed actors — recommend, classify, and draft inside loop policy boundaries.",
    runtimeLayer: "provider",
    docsPath: "/docs/packages/adapter-openai",
    adapterPackage: "@loop-engine/adapter-openai",
    certificationStatus: "certified",
    availability: "oss-adapter",
  },
  {
    name: "Grok",
    slug: "grok",
    logoPath: "/logos/xai.svg",
    description: "Grok 3 as a governed actor via xAI's OpenAI-compatible API.",
    runtimeLayer: "provider",
    docsPath: "/docs/packages/adapter-grok",
    adapterPackage: "@loop-engine/adapter-grok",
    certificationStatus: "certified",
    availability: "oss-adapter",
  },
  {
    name: "Gemini",
    slug: "gemini",
    logoPath: "/logos/gemini.svg",
    description: "Gemini models for governed generation and analysis — intelligence enters the loop, not CRM.",
    runtimeLayer: "provider",
    docsPath: "/docs/packages/adapter-gemini",
    adapterPackage: "@loop-engine/adapter-gemini",
    certificationStatus: "certified",
    availability: "oss-adapter",
  },
  {
    name: "Perplexity Sonar",
    slug: "perplexity",
    logoPath: "/logos/perplexity.svg",
    description:
      "Grounded retrieval with citations — research-heavy Provider steps for compliance workflows that need verifiable outputs.",
    runtimeLayer: "provider",
    docsPath: "/docs/adapters/perplexity",
    adapterPackage: "@loop-engine/adapter-perplexity",
    certificationStatus: "in-review",
    marketingBadge: "NEW",
    installCommand: "pnpm add @loop-engine/adapter-perplexity",
    availability: "oss-adapter",
  },
];

export const channelPartners: Partner[] = [
  featuredChannelPartner,
  {
    name: "Slack",
    slug: "slack",
    description:
      "Human coordination surface — approvals, escalations, and operational review. Dual-surface patterns pair Slack decisions with Docs or Sheets work surfaces.",
    runtimeLayer: "channel",
    docsPath: "/docs/examples/dual-surface-docs-slack",
    certificationStatus: "pattern",
    availability: "cloud-connector",
  },
  {
    name: "Microsoft Teams",
    slug: "teams",
    description:
      "Enterprise Channel for approval loops and operator escalation — not a system of record.",
    runtimeLayer: "channel",
    docsPath: "/docs/integrations/loop-engine-cloud-api",
    certificationStatus: "pattern",
    availability: "cloud-connector",
  },
  {
    name: "Google Docs & comments",
    slug: "google-docs",
    description:
      "Work surface for AI-drafted proposals and inline review — governance stays in loops; Docs holds context, not policy.",
    runtimeLayer: "channel",
    docsPath: "/docs/examples/dual-surface-docs-slack",
    certificationStatus: "pattern",
    availability: "cloud-connector",
  },
];

export const integrationPartners: Partner[] = [
  {
    name: "PagerDuty",
    slug: "pagerduty",
    logoPath: "/logos/pagerduty.svg",
    description:
      "Operational execution — incident triggers, on-call routing, and escalation after governed classification passes.",
    runtimeLayer: "integration",
    docsPath: "/docs/integrations/pagerduty",
    adapterPackage: "@loop-engine/adapter-pagerduty",
    certificationStatus: "community",
    availability: "oss-adapter",
  },
  {
    name: "PostgreSQL",
    slug: "postgres",
    description:
      "LoopStore persistence — operational state and evidence timelines for production runtimes.",
    runtimeLayer: "integration",
    docsPath: "/docs/integrations/postgres",
    adapterPackage: "@loop-engine/adapter-postgres",
    certificationStatus: "certified",
    availability: "oss-adapter",
  },
  {
    name: "Salesforce & CRM",
    slug: "salesforce",
    description:
      "System-of-record updates after approval — opportunity stages, lead qualification, and governed CRM writes (via your connectors or Cloud).",
    runtimeLayer: "integration",
    docsPath: "/docs/examples/sdr-qualification-loop",
    certificationStatus: "pattern",
    availability: "pattern",
  },
  {
    name: "Google Workspace",
    slug: "google-workspace",
    description:
      "Sheets staging, Docs apply paths, and operational artifacts — Integration executes after Channel approval.",
    runtimeLayer: "integration",
    docsPath: "/docs/examples/dual-surface-sheets-slack",
    certificationStatus: "pattern",
    availability: "cloud-connector",
  },
  {
    name: "HTTP & enterprise APIs",
    slug: "http-apis",
    description:
      "Generic Integration surface for ERP, MAP, and internal APIs — side effects only after guards pass.",
    runtimeLayer: "integration",
    docsPath: "/docs/packages/adapter-http",
    certificationStatus: "pattern",
    availability: "oss-adapter",
  },
];

export const ecosystemExpansionPartners: Partner[] = [
  {
    name: "Commerce Chain",
    slug: "commerce-chain",
    logoPath: "/logos/commerce-chain.svg",
    description:
      "Supply chain and demand chain modules on Boss Loops — SCM/DCM loops, participant manifests, and the CCO platform.",
    runtimeLayer: "ecosystem",
    docsPath: "https://commercechain.io/docs",
    externalUrl: "https://commercechain.io",
    certificationStatus: "community",
    availability: "ecosystem",
  },
  {
    name: "Vercel AI SDK",
    slug: "vercel-ai-sdk",
    logoPath: "/logos/vercel.svg",
    description:
      "Compose streaming AI responses with Boss Loops governance — Providers stay inside loop boundaries.",
    runtimeLayer: "ecosystem",
    docsPath: "/docs/integrations/vercel-ai-sdk",
    certificationStatus: "community",
    availability: "ecosystem",
  },
];

/** @deprecated Use providerPartners — kept for changelog references */
export const aiProviderPartners = providerPartners;

/** @deprecated Use ecosystemExpansionPartners */
export const ecosystemPartners = ecosystemExpansionPartners;

/** @deprecated Use featuredChannelPartner */
export const featuredPartner = featuredChannelPartner;
