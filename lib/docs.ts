import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

export type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type LoadedDoc = {
  slug: string[];
  slugPath: string;
  sectionLabel: string;
  title: string;
  description: string;
  frontmatter: Frontmatter;
  source: string;
  rawContent: string;
  headings: TocHeading[];
};

const docsRoot = path.join(process.cwd(), "content", "docs");

function toTitle(value: string): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function slugToFileCandidates(slug: string[]): string[] {
  const direct = path.join(docsRoot, ...slug) + ".mdx";
  const index = path.join(docsRoot, ...slug, "index.mdx");
  return [direct, index];
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

export type Frontmatter = {
  title?: string;
  description?: string;
  section?: string;
};

function parseFrontmatter(source: string): { frontmatter: Frontmatter; content: string } {
  if (!source.startsWith("---\n")) {
    return { frontmatter: {}, content: source };
  }
  const end = source.indexOf("\n---\n", 4);
  if (end === -1) {
    return { frontmatter: {}, content: source };
  }

  const raw = source.slice(4, end).trim();
  const content = source.slice(end + 5);
  const frontmatter: Frontmatter = {};

  for (const line of raw.split("\n")) {
    const match = /^([a-zA-Z][\w-]*):\s*(.+)$/.exec(line.trim());
    if (!match) continue;
    const key = match[1];
    const value = match[2].replace(/^["']|["']$/g, "").trim();
    if (key === "title") frontmatter.title = value;
    if (key === "description") frontmatter.description = value;
    if (key === "section") frontmatter.section = value;
  }

  return { frontmatter, content };
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
  let source = "";
  const candidates = slugToFileCandidates(safeSlug);
  let loaded = false;
  for (const filePath of candidates) {
    try {
      source = await readFile(filePath, "utf8");
      loaded = true;
      break;
    } catch {
      // Try next candidate path.
    }
  }
  if (!loaded) {
    source = placeholderForSlug(safeSlug);
  }

  const { frontmatter, content } = parseFrontmatter(source);
  const sectionLabel = frontmatter.section ?? toTitle(safeSlug[0] ?? "Docs");
  const title = frontmatter.title ?? toTitle(safeSlug[safeSlug.length - 1] ?? "Documentation");
  const description = frontmatter.description ?? "";
  const slugPath = safeSlug.join("/");
  return {
    slug: safeSlug,
    slugPath,
    sectionLabel,
    title,
    description,
    frontmatter,
    source: content,
    rawContent: content,
    headings: extractHeadings(content)
  };
}

export async function getAllDocSlugs(): Promise<string[]> {
  async function walk(relativeDir: string): Promise<string[]> {
    const dir = path.join(docsRoot, relativeDir);
    try {
      const entries = await readdir(dir, { withFileTypes: true });
      const slugs: string[] = [];
      for (const entry of entries) {
        const relPath = relativeDir ? `${relativeDir}/${entry.name}` : entry.name;
        if (entry.isDirectory()) {
          slugs.push(...(await walk(relPath)));
        } else if (entry.isFile() && relPath.endsWith(".mdx")) {
          slugs.push(relPath.replace(/\.mdx$/, ""));
        }
      }
      return slugs;
    } catch {
      return [];
    }
  }

  const result = await walk("");
  return result.sort();
}

export type FullDoc = {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
};

export async function getAllDocs(): Promise<FullDoc[]> {
  const slugs = await getAllDocSlugs();
  const docs = await Promise.all(
    slugs.map(async (slug) => {
      const source = await readFile(path.join(docsRoot, `${slug}.mdx`), "utf8");
      const { frontmatter, content } = parseFrontmatter(source);
      return {
        slug,
        frontmatter,
        content
      };
    })
  );
  return docs;
}
