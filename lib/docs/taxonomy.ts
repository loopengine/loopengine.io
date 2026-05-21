/** Public runtime taxonomy (Phase 0B) — used for sidebar grouping without URL changes. */
export const RUNTIME_TAXONOMY = ["provider", "channel", "integration", "runtime-core", "platform"] as const;

export type RuntimeTaxonomy = (typeof RUNTIME_TAXONOMY)[number];

export const TAXONOMY_GROUP_LABEL: Record<RuntimeTaxonomy, string> = {
  provider: "Providers",
  channel: "Channels",
  integration: "Integrations",
  "runtime-core": "Runtime core",
  platform: "Platform & tooling",
};

export const TAXONOMY_GROUP_ORDER: RuntimeTaxonomy[] = [
  "runtime-core",
  "provider",
  "channel",
  "integration",
  "platform",
];

/** Sections whose sidebar uses taxonomy sub-groups (top-level section label unchanged). */
export const TAXONOMY_GROUPED_SECTIONS = new Set(["Integrations", "Runtime Connections", "Packages"]);

export function taxonomyGroupLabel(taxonomy: RuntimeTaxonomy | undefined): string | null {
  if (!taxonomy) return null;
  return TAXONOMY_GROUP_LABEL[taxonomy] ?? null;
}
