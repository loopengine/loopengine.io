import type { LoadedDoc } from "./types";

/**
 * Canonical sidebar / prev-next order for top-level sections (matches legacy hand nav intent).
 */
export const SECTION_LABEL_ORDER: string[] = [
  "Getting Started",
  "Core Concepts",
  "Defining Loops",
  "Running Loops",
  "Packages",
  "Loop catalog",
  "Examples",
  "Integrations",
  "Governance",
  "Project",
];

function sectionRank(label: string): number {
  const i = SECTION_LABEL_ORDER.indexOf(label);
  if (i !== -1) return i;
  return 100 + label.localeCompare("");
}

/** slugPath values under content/docs for packages/*.mdx (folder index is `packages`). */
const PACKAGES_SLUG_RANK: Record<string, number> = (() => {
  const segments = [
    "packages",
    "packages/sdk",
    "packages/core",
    "packages/runtime",
    "packages/loop-definition",
    "packages/events",
    "packages/signals",
    "packages/guards",
    "packages/actors",
    "packages/observability",
    "packages/all-packages",
    "packages/registry-client",
    "packages/ui-devtools",
    "packages/adapter-anthropic",
    "packages/adapter-openai",
    "packages/adapter-gemini",
    "packages/adapter-grok",
    "packages/adapter-perplexity",
    "packages/adapter-postgres",
    "packages/adapter-kafka",
    "packages/adapter-memory",
    "packages/adapter-http",
    "packages/adapter-openclaw",
    "packages/adapter-commerce-gateway",
  ];
  const m: Record<string, number> = {};
  segments.forEach((s, i) => {
    m[s] = i;
  });
  return m;
})();

const INTEGRATIONS_SLUG_RANK: Record<string, number> = (() => {
  const segments = [
    "integrations",
    "integrations/anthropic",
    "integrations/openai",
    "integrations/grok",
    "integrations/gemini",
    "integrations/perplexity",
    "integrations/openclaw",
    "integrations/vercel-ai-sdk",
    "integrations/vercel-ai",
    "integrations/postgres",
    "integrations/kafka",
    "integrations/http",
    "integrations/memory",
    "integrations/pagerduty",
    "integrations/perplexity-pagerduty",
    "integrations/commerce-gateway",
  ];
  const m: Record<string, number> = {};
  segments.forEach((s, i) => {
    m[s] = i;
  });
  return m;
})();

const EXAMPLES_SLUG_RANK: Record<string, number> = (() => {
  const segments = [
    "examples",
    "examples/expense-approval",
    "examples/ai-replenishment",
    "examples/ai-replenishment-claude",
    "examples/ai-replenishment-openai",
    "examples/demand-signal",
    "examples/postgres-persistence",
    "examples/event-streaming",
    "examples/infrastructure-change-approval",
    "examples/fraud-review",
    "examples/openclaw",
    "examples/commerce-gateway",
  ];
  const m: Record<string, number> = {};
  segments.forEach((s, i) => {
    m[s] = i;
  });
  return m;
})();

function rankInStaticLists(sectionLabel: string, slugPath: string): number | null {
  if (sectionLabel === "Packages" && slugPath in PACKAGES_SLUG_RANK) {
    return PACKAGES_SLUG_RANK[slugPath]!;
  }
  if (sectionLabel === "Integrations" && slugPath in INTEGRATIONS_SLUG_RANK) {
    return INTEGRATIONS_SLUG_RANK[slugPath]!;
  }
  if (sectionLabel === "Examples" && slugPath in EXAMPLES_SLUG_RANK) {
    return EXAMPLES_SLUG_RANK[slugPath]!;
  }
  return null;
}

function withinSectionSort(a: LoadedDoc, b: LoadedDoc): number {
  const oa = a.frontmatter.order;
  const ob = b.frontmatter.order;
  if (oa != null && ob != null && oa !== ob) return oa - ob;
  if (oa != null && ob == null) return -1;
  if (oa == null && ob != null) return 1;

  const ra = rankInStaticLists(a.sectionLabel, a.slugPath);
  const rb = rankInStaticLists(b.sectionLabel, b.slugPath);
  if (ra != null || rb != null) {
    const fa = ra ?? 9999;
    const fb = rb ?? 9999;
    if (fa !== fb) return fa - fb;
  }

  return a.slugPath.localeCompare(b.slugPath);
}

/**
 * Global reading order: canonical section list → `frontmatter.order` → section slug lists → path.
 */
export function sortLoadedDocsByReaderOrder(docs: LoadedDoc[]): LoadedDoc[] {
  return [...docs].sort((a, b) => {
    const s = sectionRank(a.sectionLabel) - sectionRank(b.sectionLabel);
    if (s !== 0) return s;
    return withinSectionSort(a, b);
  });
}
