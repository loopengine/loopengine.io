#!/usr/bin/env node
/**
 * flip-track-b.mjs — Track-B identifier codemod for the Boss rebrand.
 *
 * Track A (display/brand copy) was renamed during the GTM pass. Track B is the
 * set of technical identifiers that point at real external resources and could
 * NOT be renamed until those resources go live: the npm scope, GitHub org/repos,
 * the domain, and the social handle.
 *
 * The live app's links/SEO already read these from `lib/site-config.ts`
 * (SITE.legacy + LEGACY). This script handles everything that CANNOT read from
 * there — the literal tokens baked into:
 *   - MDX docs (install/import snippets, code fences, URLs)
 *   - TS/TSX data arrays (package-name strings like "@loop-engine/sdk")
 *   - static assets (svg, webmanifest, package.json "name", README, llms.txt)
 *   - dead/uncovered code (e.g. components/nav/MobileMenu.tsx)
 *
 * GO-LIVE USAGE (see .cursor/rules/rebrand-glossary.md → "Track-B go-live"):
 *   1. Hand-edit lib/site-config.ts `SITE.legacy` base tokens to the new values.
 *   2. Set NEXT_PUBLIC_BASE_URL to the new domain.
 *   3. Dry-run:  NEW_NPM_SCOPE=@boss NEW_GH_ORG=getboss NEW_GH_REPO=boss \
 *                NEW_GH_EXAMPLES=boss-examples NEW_GH_SITE_REPO=boss.new \
 *                NEW_TWITTER=getboss NEW_DOMAIN=boss.new \
 *                node scripts/flip-track-b.mjs
 *   4. Review the diff report, then re-run with --apply.
 *   5. pnpm verify:anchors && pnpm build
 *
 * FLAGS:
 *   --apply             Write changes (default is dry-run, no writes).
 *   --include-betterdata  Also flip Better Data-owned slugs (blog tag, changelog
 *                       module, loops.betterdata.co). OFF by default — those are
 *                       owned by bd-forge and may not rename with this product.
 *
 * NOT HANDLED (deliberately):
 *   - Internal doc slugs (loop-engine-vs-workflow-engines, loop-engine-cloud-api):
 *     kept stable to avoid breaking links/anchors. Rename separately + add redirects.
 *   - API identifiers (LoopEngine, createLoopEngine, LoopEngineOptions): these are
 *     real exported class/type names. Only rename them AFTER the npm package renames
 *     the class — and do it in lockstep with the package, not here.
 *   - lib/site-config.ts: the human-edited source of truth (step 1 above).
 *   - Docker image names: none exist in the repo today; add a rule here if/when
 *     a docker distribution ships.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";

const ROOT = process.cwd();
const APPLY = process.argv.includes("--apply");
const INCLUDE_BD = process.argv.includes("--include-betterdata");

// --- CURRENT (old) identifiers — must match lib/site-config.ts SITE.legacy ---
const OLD = {
  npmScope: "@loop-engine",
  ghOrg: "loopengine",
  ghRepo: "loop-engine",
  ghExamples: "loop-examples",
  ghSiteRepo: "loopengine.io",
  twitter: "loopengineio",
  domain: "loopengine.io",
  bdBlogTag: "loop-engine",
  bdChangelogModule: "loop-engine",
  bdCloudHost: "loops.betterdata.co",
};

// --- NEW (target) identifiers — from env. Required before --apply. ---
const NEW = {
  npmScope: process.env.NEW_NPM_SCOPE,
  ghOrg: process.env.NEW_GH_ORG,
  ghRepo: process.env.NEW_GH_REPO,
  ghExamples: process.env.NEW_GH_EXAMPLES,
  ghSiteRepo: process.env.NEW_GH_SITE_REPO,
  twitter: process.env.NEW_TWITTER,
  domain: process.env.NEW_DOMAIN,
  bdBlogTag: process.env.NEW_BD_BLOG_TAG,
  bdChangelogModule: process.env.NEW_BD_CHANGELOG_MODULE,
  bdCloudHost: process.env.NEW_BD_CLOUD_HOST,
};

const scopeSlug = (scope) => (scope ?? "").replace(/^@/, "");

// Ordered [old, new] literal pairs. ORDER MATTERS: most-specific first so that
// e.g. github.com/<org>/<siteRepo> ("loopengine.io") is consumed before the bare
// domain rule, and the bare-org rule runs last.
function buildPairs() {
  const pairs = [
    [`api.github.com/repos/${OLD.ghOrg}/${OLD.ghRepo}`, `api.github.com/repos/${NEW.ghOrg}/${NEW.ghRepo}`],
    [`github.com/${OLD.ghOrg}/${OLD.ghRepo}`, `github.com/${NEW.ghOrg}/${NEW.ghRepo}`],
    [`github.com/${OLD.ghOrg}/${OLD.ghExamples}`, `github.com/${NEW.ghOrg}/${NEW.ghExamples}`],
    [`github.com/${OLD.ghOrg}/${OLD.ghSiteRepo}`, `github.com/${NEW.ghOrg}/${NEW.ghSiteRepo}`],
    [`github.com/${OLD.ghOrg}`, `github.com/${NEW.ghOrg}`],
    [`npmjs.com/org/${scopeSlug(OLD.npmScope)}`, `npmjs.com/org/${scopeSlug(NEW.npmScope)}`],
    [OLD.npmScope, NEW.npmScope],
    [OLD.domain, NEW.domain],
    [OLD.twitter, NEW.twitter],
  ];
  if (INCLUDE_BD) {
    pairs.push(
      [`betterdata.co/blog/tags/${OLD.bdBlogTag}`, `betterdata.co/blog/tags/${NEW.bdBlogTag}`],
      [`module=${OLD.bdChangelogModule}`, `module=${NEW.bdChangelogModule}`],
      [OLD.bdCloudHost, NEW.bdCloudHost],
    );
  }
  return pairs;
}

const SCAN_EXTS = new Set([".ts", ".tsx", ".mdx", ".md", ".json", ".svg", ".webmanifest", ".txt"]);
const EXCLUDE_DIRS = new Set(["node_modules", ".next", ".git", "pagefind"]);
const EXCLUDE_FILES = new Set([
  "lib/site-config.ts", // hand-edited source of truth (go-live step 1)
  ".cursor/rules/rebrand-glossary.md", // intentionally documents old names
  "scripts/flip-track-b.mjs", // this file
  "pnpm-lock.yaml",
]);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const rel = relative(ROOT, full);
    if (EXCLUDE_DIRS.has(entry)) continue;
    const st = statSync(full);
    if (st.isDirectory()) {
      walk(full, out);
    } else if (SCAN_EXTS.has(extname(entry)) && !EXCLUDE_FILES.has(rel)) {
      out.push(full);
    }
  }
  return out;
}

function validate(pairs) {
  const missing = [];
  for (const [, to] of pairs) {
    if (to == null || to.includes("undefined")) missing.push(to);
  }
  if (missing.length) {
    console.error("\n✗ Missing NEW_* env values. Required: NEW_NPM_SCOPE, NEW_GH_ORG,");
    console.error("  NEW_GH_REPO, NEW_GH_EXAMPLES, NEW_GH_SITE_REPO, NEW_TWITTER, NEW_DOMAIN");
    if (INCLUDE_BD) console.error("  (+ NEW_BD_BLOG_TAG, NEW_BD_CHANGELOG_MODULE, NEW_BD_CLOUD_HOST for --include-betterdata)");
    process.exit(1);
  }
}

function run() {
  const pairs = buildPairs();
  validate(pairs);

  const files = walk(ROOT);
  let totalHits = 0;
  let changedFiles = 0;
  const report = [];

  for (const file of files) {
    const before = readFileSync(file, "utf8");
    let after = before;
    let fileHits = 0;
    for (const [from, to] of pairs) {
      if (!after.includes(from)) continue;
      const count = after.split(from).length - 1;
      fileHits += count;
      after = after.split(from).join(to);
    }
    if (fileHits > 0) {
      totalHits += fileHits;
      changedFiles += 1;
      report.push([relative(ROOT, file), fileHits]);
      if (APPLY) writeFileSync(file, after, "utf8");
    }
  }

  report.sort((a, b) => b[1] - a[1]);
  console.log(`\nflip-track-b — ${APPLY ? "APPLY (writing)" : "DRY RUN (no writes)"}${INCLUDE_BD ? " +betterdata" : ""}`);
  console.log("mappings:");
  for (const [from, to] of pairs) console.log(`  ${from}  →  ${to}`);
  console.log(`\n${changedFiles} files, ${totalHits} replacements:`);
  for (const [f, n] of report) console.log(`  ${String(n).padStart(4)}  ${f}`);
  if (!APPLY) console.log(`\nDry run only. Re-run with --apply to write. Then: pnpm verify:anchors && pnpm build`);
}

run();
