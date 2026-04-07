export type Partner = {
  name: string;
  slug: string;
  logoPath: string;
  description: string;
  integrationType: "featured" | "integration" | "ecosystem";
  docsPath: string;
  externalUrl?: string;
  adapterPackage?: string;
  certificationStatus?: "certified" | "in-review" | "community";
  /** Shown next to the logo row (for example `NEW` while an adapter RC is open). */
  marketingBadge?: string;
  /** One-line install command shown on the partner card. */
  installCommand?: string;
};

export const featuredPartner: Partner = {
  name: "OpenClaw",
  slug: "openclaw",
  logoPath: "/logos/openclaw.svg",
  description:
    "The agentic commerce platform - Loop Engine provides the decision governance layer for OpenClaw workflows.",
  integrationType: "featured",
  docsPath: "/docs/integrations/openclaw",
  externalUrl: "https://openclaw.ai",
  adapterPackage: "@loop-engine/adapter-openclaw",
  certificationStatus: "certified",
};

export const aiProviderPartners: Partner[] = [
  {
    name: "Anthropic",
    slug: "anthropic",
    logoPath: "/logos/anthropic.svg",
    description:
      "Claude as a governed AI actor - confidence-gated, evidence-backed, audit-trailed.",
    integrationType: "integration",
    docsPath: "/docs/packages/adapter-anthropic",
    adapterPackage: "@loop-engine/adapter-anthropic",
    certificationStatus: "certified",
  },
  {
    name: "OpenAI",
    slug: "openai",
    logoPath: "/logos/openai.svg",
    description: "GPT-4o and o-series models as governed Loop Engine actors.",
    integrationType: "integration",
    docsPath: "/docs/packages/adapter-openai",
    adapterPackage: "@loop-engine/adapter-openai",
    certificationStatus: "certified",
  },
  {
    name: "Grok",
    slug: "grok",
    logoPath: "/logos/xai.svg",
    description: "Grok 3 as a governed actor via xAI's OpenAI-compatible API.",
    integrationType: "integration",
    docsPath: "/docs/packages/adapter-grok",
    adapterPackage: "@loop-engine/adapter-grok",
    certificationStatus: "certified",
  },
  {
    name: "Gemini",
    slug: "gemini",
    logoPath: "/logos/gemini.svg",
    description: "Gemini 1.5 Pro and 2.0 Flash as governed Loop Engine actors.",
    integrationType: "integration",
    docsPath: "/docs/packages/adapter-gemini",
    adapterPackage: "@loop-engine/adapter-gemini",
    certificationStatus: "certified",
  },
  {
    name: "Perplexity Sonar",
    slug: "perplexity",
    logoPath: "/logos/perplexity.svg",
    description:
      "Grounded web retrieval with cited sources. Real-time research with attribution — built for compliance workflows that need verifiable outputs.",
    integrationType: "integration",
    docsPath: "/docs/adapters/perplexity",
    adapterPackage: "@loop-engine/adapter-perplexity",
    certificationStatus: "in-review",
    marketingBadge: "NEW",
    installCommand: "pnpm add @loop-engine/adapter-perplexity",
  },
  {
    name: "PagerDuty",
    slug: "pagerduty",
    logoPath: "/logos/pagerduty.svg",
    description:
      "Incident-triggered loops — PagerDuty alerts start governed response workflows with full loop context.",
    integrationType: "integration",
    docsPath: "/docs/integrations/pagerduty",
    adapterPackage: "@loop-engine/adapter-pagerduty",
    certificationStatus: "community",
  },
];

export const ecosystemPartners: Partner[] = [
  {
    name: "Commerce Chain",
    slug: "commerce-chain",
    logoPath: "/logos/commerce-chain.svg",
    description:
      "Supply chain and demand chain modules on Loop Engine — SCM/DCM loops, participant manifests, and the CCO platform.",
    integrationType: "ecosystem",
    docsPath: "https://commercechain.io/docs",
    externalUrl: "https://commercechain.io",
    certificationStatus: "community",
  },
  {
    name: "Vercel AI SDK",
    slug: "vercel-ai-sdk",
    logoPath: "/logos/vercel.svg",
    description:
      "Use Loop Engine alongside the Vercel AI SDK - streaming AI responses governed by loop policy.",
    integrationType: "ecosystem",
    docsPath: "/docs/integrations/vercel-ai-sdk",
    certificationStatus: "community",
  },
];
