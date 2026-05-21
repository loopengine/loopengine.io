import type { DocFrontmatter } from "./schema";

export type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type LoadedDoc = {
  slug: string[];
  slugPath: string;
  /** Relative path to MDX file under content/docs (for Edit on GitHub) */
  filePath: string;
  sectionLabel: string;
  title: string;
  description: string;
  frontmatter: DocFrontmatter;
  source: string;
  headings: TocHeading[];
};

export type DocNavItem = {
  title: string;
  href: string;
};

export type DocNavGroup = {
  label: string;
  items: DocNavItem[];
};

export type DocNavSection = {
  label: string;
  items: DocNavItem[];
  /** Taxonomy sub-groups (Providers / Channels / Integrations) within a section. */
  groups?: DocNavGroup[];
};

/** Plain slug + body (e.g. `llms-full.txt` aggregate export). */
export type FullDoc = {
  slug: string;
  frontmatter: DocFrontmatter;
  content: string;
};
