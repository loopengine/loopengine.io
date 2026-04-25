/**
 * Fragment slug-equality: every internal /docs/...#fragment must match a heading slug
 * on the target page, using the same headingId() as lib/docs.ts (imported — no duplicate slugifier).
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { headingId } from "../lib/docs";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = join(repoRoot, "content", "docs");

function stripFrontmatter(source: string): string {
  if (!source.startsWith("---\n")) return source;
  const end = source.indexOf("\n---\n", 4);
  if (end === -1) return source;
  return source.slice(end + 5);
}

/** 1-based file line index of the first line after frontmatter (0 if no FM). */
function frontmatterOffsetLines(raw: string): number {
  if (!raw.startsWith("---\n")) return 0;
  const end = raw.indexOf("\n---\n", 4);
  if (end === -1) return 0;
  return raw.slice(0, end + 5).split(/\r?\n/).length;
}

function walkDocFiles(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walkDocFiles(p, acc);
    else if (name.endsWith(".mdx") || name.endsWith(".md")) acc.push(p);
  }
  return acc;
}

function forEachNonFenceLine(body: string, fn: (line: string, lineNo: number) => void): void {
  const lines = body.split(/\r?\n/);
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (!inFence) fn(line, i + 1);
  }
}

function collectSlugsForFile(absPath: string): Set<string> {
  const raw = readFileSync(absPath, "utf8");
  const body = stripFrontmatter(raw);
  const slugs = new Set<string>();
  forEachNonFenceLine(body, (line) => {
    const m = /^(#{1,4})\s+(.+)$/.exec(line);
    if (!m) return;
    const text = m[2]!.trim();
    if (text) slugs.add(headingId(text));
  });
  return slugs;
}

function resolveDocsTarget(
  hrefPath: string,
  fromFileAbs: string
): { abs: string; exists: boolean } | null {
  const [pathPart] = hrefPath.split("#");
  const clean = pathPart.replace(/\/$/, "");
  if (!clean) return null;

  if (clean.startsWith("/docs/")) {
    const rel = clean.slice("/docs/".length);
    const segments = rel.split("/").filter(Boolean);
    if (segments.length === 0) return null;
    const direct = join(docsRoot, ...segments) + ".mdx";
    const index = join(docsRoot, ...segments, "index.mdx");
    if (existsSync(direct)) return { abs: direct, exists: true };
    if (existsSync(index)) return { abs: index, exists: true };
    return { abs: direct, exists: false };
  }

  if (clean.startsWith("./") || clean.startsWith("../")) {
    const baseDir = dirname(fromFileAbs);
    const resolved = normalize(resolve(baseDir, clean));
    if (!resolved.startsWith(docsRoot)) return null;
    if (existsSync(resolved) && !statSync(resolved).isDirectory())
      return { abs: resolved, exists: true };
    const withMdx = resolved.endsWith(".mdx") ? resolved : `${resolved}.mdx`;
    if (existsSync(withMdx)) return { abs: withMdx, exists: true };
    const indexUnder = join(resolved, "index.mdx");
    if (existsSync(indexUnder)) return { abs: indexUnder, exists: true };
    return { abs: withMdx, exists: false };
  }

  return null;
}

type LinkRef = { fromFile: string; line: number; href: string; fragment: string };

function collectFragmentLinks(absPath: string, raw: string): LinkRef[] {
  const out: LinkRef[] = [];
  const body = stripFrontmatter(raw);
  const lineOffset = frontmatterOffsetLines(raw);

  const push = (bodyLineNo: number, fullHref: string) => {
    const hash = fullHref.indexOf("#");
    if (hash === -1) return;
    const fragment = fullHref.slice(hash + 1).trim();
    if (!fragment) return;
    const pathOnly = fullHref.slice(0, hash);
    if (!pathOnly) return;
    out.push({
      fromFile: absPath,
      line: lineOffset + bodyLineNo,
      href: fullHref,
      fragment
    });
  };

  const lines = body.split(/\r?\n/);
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    const lineNo = i + 1;
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    for (const m of line.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const href = m[1]!.trim();
      if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:"))
        continue;
      push(lineNo, href.replace(/\s/g, ""));
    }

    for (const m of line.matchAll(/\bhref=(["'])([^"']+)\1/g)) {
      const href = m[2]!.trim();
      if (!href.includes("#")) continue;
      if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:"))
        continue;
      push(lineNo, href.replace(/\s/g, ""));
    }
  }

  return out;
}

function main(): void {
  const files = walkDocFiles(docsRoot);
  const slugByFile = new Map<string, Set<string>>();
  for (const f of files) {
    slugByFile.set(f, collectSlugsForFile(f));
  }

  const errors: string[] = [];

  for (const absPath of files) {
    const raw = readFileSync(absPath, "utf8");
    const links = collectFragmentLinks(absPath, raw);

    for (const link of links) {
      const hashIdx = link.href.indexOf("#");
      const pathPart = link.href.slice(0, hashIdx);
      const resolved = resolveDocsTarget(pathPart, absPath);
      if (!resolved) continue;
      if (!resolved.exists) {
        errors.push(
          `${link.fromFile}:${link.line} broken target file for href=${link.href} (resolved ${resolved.abs})`
        );
        continue;
      }
      const slugs = slugByFile.get(resolved.abs);
      if (!slugs) continue;
      if (!slugs.has(link.fragment)) {
        errors.push(
          `${link.fromFile}:${link.line} unknown fragment #${link.fragment} in href=${link.href} → ${resolved.abs} (have: ${[...slugs].sort().join(", ")})`
        );
      }
    }
  }

  if (errors.length) {
    console.error("verify-doc-anchors: failed\n" + errors.join("\n"));
    process.exit(1);
  }
  console.error("verify-doc-anchors: OK (all #fragments match canonical heading slugs)");
  process.exit(0);
}

main();
