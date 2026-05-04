import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { docsContentRoot, isPublicDocPath } from "./paths";
import { parseAndValidateMdx } from "./parse-matter";
import type { DirectoryMeta } from "./schema";
import { directoryMetaSchema } from "./schema";
import type { LoadedDoc } from "./types";
import { getTocFromSource } from "./toc";
import { sortLoadedDocsByReaderOrder } from "./reader-order";

const isProd = process.env.NODE_ENV === "production";

function includeDraftDocs(): boolean {
  return !isProd || process.env.INCLUDE_DRAFT_DOCS === "true";
}

function toTitle(segment: string): string {
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function shouldIncludeLoaded(frontmatter: { draft?: boolean }): boolean {
  if (!frontmatter.draft) return true;
  return includeDraftDocs();
}

async function readDirectoryMeta(dirAbs: string): Promise<DirectoryMeta | null> {
  const metaPath = path.join(dirAbs, "_meta.json");
  try {
    const raw = await fs.readFile(metaPath, "utf8");
    const json: unknown = JSON.parse(raw);
    return directoryMetaSchema.parse(json);
  } catch {
    return null;
  }
}

type DirChild =
  | { kind: "index" }
  | { kind: "file"; base: string }
  | { kind: "dir"; name: string };

function metaOrderKey(child: DirChild): string {
  if (child.kind === "index") return "index";
  if (child.kind === "file") return child.base;
  return child.name;
}

function sortDirChildren(children: DirChild[], meta: DirectoryMeta | null): DirChild[] {
  const order = meta?.order ?? [];
  return [...children].sort((a, b) => {
    const ka = metaOrderKey(a);
    const kb = metaOrderKey(b);
    const ia = order.indexOf(ka);
    const ib = order.indexOf(kb);
    const ra = ia === -1 ? Number.MAX_SAFE_INTEGER : ia;
    const rb = ib === -1 ? Number.MAX_SAFE_INTEGER : ib;
    if (ra !== rb) return ra - rb;
    return ka.localeCompare(kb);
  });
}

async function buildDocFromFile(slugPath: string, fileRel: string): Promise<LoadedDoc | null> {
  const absolutePath = path.join(docsContentRoot, fileRel);
  let raw: string;
  try {
    raw = await fs.readFile(absolutePath, "utf8");
  } catch {
    return null;
  }
  const label = path.join("content", "docs", fileRel);
  const { frontmatter, content } = parseAndValidateMdx(raw, label);
  if (!shouldIncludeLoaded(frontmatter)) return null;

  const slug = slugPath === "" ? [] : slugPath.split("/").filter(Boolean);
  const sectionLabel = frontmatter.section ?? toTitle(slug[0] ?? "Docs");
  const title = frontmatter.title;
  const description = frontmatter.description;

  return {
    slug,
    slugPath: slugPath === "" ? "" : slugPath,
    filePath: fileRel.replace(/\\/g, "/"),
    sectionLabel,
    title,
    description,
    frontmatter,
    source: content,
    headings: getTocFromSource(content),
  };
}

/**
 * DFS content/docs respecting _meta.json `order` in each directory.
 */
async function collectDocsInNavOrder(): Promise<LoadedDoc[]> {
  const out: LoadedDoc[] = [];

  async function visitDirectory(relDir: string): Promise<void> {
    if (relDir && !isPublicDocPath(relDir)) return;

    const dirAbs = path.join(docsContentRoot, relDir);
    let entries;
    try {
      entries = await fs.readdir(dirAbs, { withFileTypes: true });
    } catch {
      return;
    }

    const meta = await readDirectoryMeta(dirAbs);
    const children: DirChild[] = [];

    const hasIndex = entries.some((e) => e.isFile() && e.name === "index.mdx");
    if (hasIndex && (relDir === "" || isPublicDocPath(relDir))) {
      children.push({ kind: "index" });
    }

    for (const e of entries) {
      if (e.name === "_meta.json") continue;
      if (e.isFile() && e.name.endsWith(".mdx") && e.name !== "index.mdx") {
        const base = e.name.replace(/\.mdx$/, "");
        const slugPath = relDir ? `${relDir}/${base}` : base;
        if (!isPublicDocPath(slugPath)) continue;
        children.push({ kind: "file", base });
      } else if (e.isDirectory()) {
        const childRel = relDir ? `${relDir}/${e.name}` : e.name;
        if (!isPublicDocPath(childRel)) continue;
        children.push({ kind: "dir", name: e.name });
      }
    }

    const ordered = sortDirChildren(children, meta);

    for (const ch of ordered) {
      if (ch.kind === "index") {
        const slugPath = relDir;
        const fileRel = relDir ? `${relDir}/index.mdx` : "index.mdx";
        const doc = await buildDocFromFile(slugPath, fileRel);
        if (doc) out.push(doc);
      } else if (ch.kind === "file") {
        const slugPath = relDir ? `${relDir}/${ch.base}` : ch.base;
        const fileRel = `${slugPath}.mdx`;
        const doc = await buildDocFromFile(slugPath, fileRel);
        if (doc) out.push(doc);
      } else {
        await visitDirectory(relDir ? `${relDir}/${ch.name}` : ch.name);
      }
    }
  }

  await visitDirectory("");
  return out;
}

export const getAllDocs = cache(async (): Promise<LoadedDoc[]> => {
  const raw = await collectDocsInNavOrder();
  return sortLoadedDocsByReaderOrder(raw);
});

export const getAllDocSlugs = cache(async (): Promise<string[]> => {
  const docs = await getAllDocs();
  return docs.map((d) => d.slugPath).filter((s) => s.length > 0);
});

function slugCandidates(slug: string[]): { slugPath: string; fileRel: string }[] {
  if (slug.length === 0) return [];
  const slugPath = slug.join("/");
  return [
    { slugPath, fileRel: `${slugPath}.mdx` },
    { slugPath, fileRel: `${slugPath}/index.mdx` },
  ];
}

export const getDocBySlug = cache(async (slug: string[]): Promise<LoadedDoc> => {
  const slugPath = slug.join("/");
  if (!isPublicDocPath(slugPath)) notFound();

  for (const { fileRel } of slugCandidates(slug)) {
    const doc = await buildDocFromFile(slugPath, fileRel);
    if (doc) return doc;
  }

  notFound();
});

export type NavPrevNext = {
  prev: { title: string; href: string } | null;
  next: { title: string; href: string } | null;
};

export const getPrevNext = cache(async (slug: string[]): Promise<NavPrevNext> => {
  const slugPath = slug.join("/");
  const flat = await getAllDocs();
  const hrefs = flat.map((d) => ({
    slugPath: d.slugPath,
    title: d.frontmatter.sidebar_label ?? d.title,
    href: d.slugPath === "" ? "/docs" : `/docs/${d.slugPath}`,
  }));
  const idx = hrefs.findIndex((h) => h.slugPath === slugPath);
  if (idx === -1) return { prev: null, next: null };
  const prev = idx > 0 ? { title: hrefs[idx - 1].title, href: hrefs[idx - 1].href } : null;
  const next = idx < hrefs.length - 1 ? { title: hrefs[idx + 1].title, href: hrefs[idx + 1].href } : null;
  return { prev, next };
});
