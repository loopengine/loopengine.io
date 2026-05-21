import { cache } from "react";
import type { DocNavSection, DocNavItem } from "./types";
import { getAllDocs } from "./loader";
import {
  TAXONOMY_GROUPED_SECTIONS,
  TAXONOMY_GROUP_ORDER,
  taxonomyGroupLabel,
  type RuntimeTaxonomy,
} from "./taxonomy";

function pushItem(map: Map<string, DocNavItem[]>, label: string, item: DocNavItem): void {
  if (!map.has(label)) map.set(label, []);
  map.get(label)!.push(item);
}

function buildTaxonomyGroups(
  itemsByTaxonomy: Map<string, DocNavItem[]>,
): DocNavSection["groups"] {
  const groups: NonNullable<DocNavSection["groups"]> = [];
  for (const key of TAXONOMY_GROUP_ORDER) {
    const label = taxonomyGroupLabel(key);
    if (!label) continue;
    const items = itemsByTaxonomy.get(label);
    if (items?.length) groups.push({ label, items });
  }
  const uncategorized = itemsByTaxonomy.get("");
  if (uncategorized?.length) {
    groups.push({ label: "Other", items: uncategorized });
  }
  return groups.length ? groups : undefined;
}

/**
 * Filesystem + frontmatter `section`, ordered by DFS (`getAllDocs` order).
 * Integrations and Packages sidebars include taxonomy sub-groups when `taxonomy` is set.
 */
export const getNavTree = cache(async (): Promise<DocNavSection[]> => {
  const docs = await getAllDocs();
  const order: string[] = [];
  const flatMap = new Map<string, DocNavItem[]>();
  const taxonomyMaps = new Map<string, Map<string, DocNavItem[]>>();

  for (const d of docs) {
    const label = d.sectionLabel;
    const item: DocNavItem = {
      title: d.frontmatter.sidebar_label ?? d.title,
      href: d.slugPath === "" ? "/docs" : `/docs/${d.slugPath}`,
    };

    if (!flatMap.has(label)) {
      order.push(label);
      flatMap.set(label, []);
    }
    flatMap.get(label)!.push(item);

    if (!TAXONOMY_GROUPED_SECTIONS.has(label)) continue;

    if (!taxonomyMaps.has(label)) taxonomyMaps.set(label, new Map());
    const tMap = taxonomyMaps.get(label)!;
    const tax = d.frontmatter.taxonomy as RuntimeTaxonomy | undefined;
    const groupLabel = taxonomyGroupLabel(tax) ?? "";
    pushItem(tMap, groupLabel, item);
  }

  return order.map((label) => {
    const items = flatMap.get(label)!;
    const tMap = taxonomyMaps.get(label);
    const groups = tMap ? buildTaxonomyGroups(tMap) : undefined;
    return { label, items, groups };
  });
});
