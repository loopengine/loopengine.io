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
};

export const featuredPartner: Partner = {
  name: "OpenClaw",
  slug: "openclaw",
  logoPath: "/logos/openclaw.svg",
  description:
    "The agentic commerce platform - Loop Engine provides the decision governance layer for OpenClaw workflows.",
  integrationType: "featured",
  docsPath: "/docs/integrations/openclaw",
  externalUrl: "https://openclaw.com",
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
];

export const ecosystemPartners: Partner[] = [
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
  {
    name: "PagerDuty",
    slug: "pagerduty",
    logoPath: "/logos/pagerduty.svg",
    description:
      "Incident-triggered loops - PagerDuty alerts start governed response workflows.",
    integrationType: "ecosystem",
    docsPath: "/docs/packages/adapter-pagerduty",
    adapterPackage: "@loop-engine/adapter-pagerduty",
    certificationStatus: "community",
  },
];
