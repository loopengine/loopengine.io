import { readFile } from "node:fs/promises";
import path from "node:path";

export type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type LoadedDoc = {
  slug: string[];
  sectionLabel: string;
  title: string;
  source: string;
  headings: TocHeading[];
};

const docsRoot = path.join(process.cwd(), "content", "docs");

function toTitle(value: string): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function slugToFile(slug: string[]): string {
  return path.join(docsRoot, ...slug) + ".mdx";
}

function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractHeadings(source: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const lines = source.split("\n");
  for (const line of lines) {
    const h2 = /^##\s+(.+)$/.exec(line);
    const h3 = /^###\s+(.+)$/.exec(line);
    if (h2) {
      headings.push({ id: headingId(h2[1]), text: h2[1], level: 2 });
    }
    if (h3) {
      headings.push({ id: headingId(h3[1]), text: h3[1], level: 3 });
    }
  }
  return headings;
}

function placeholderForSlug(slug: string[]): string {
  const title = toTitle(slug[slug.length - 1] ?? "Documentation");
  return `## ${title}

This doc page is scaffolded and ready for content.

### What this page will cover

- Concept overview
- API usage
- Operational notes
`;
}

export async function loadDoc(slug: string[]): Promise<LoadedDoc> {
  const safeSlug = slug.length ? slug : ["getting-started", "quick-start"];
  const filePath = slugToFile(safeSlug);
  let source = "";
  try {
    source = await readFile(filePath, "utf8");
  } catch {
    source = placeholderForSlug(safeSlug);
  }

  const sectionLabel = toTitle(safeSlug[0] ?? "Docs");
  const title = toTitle(safeSlug[safeSlug.length - 1] ?? "Documentation");
  return {
    slug: safeSlug,
    sectionLabel,
    title,
    source,
    headings: extractHeadings(source)
  };
}
