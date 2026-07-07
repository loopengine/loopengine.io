/**
 * Single source of truth for Boss Loops (formerly Loop Engine) naming + URLs.
 *
 * See `.cursor/rules/rebrand-glossary.md`.
 *
 *  - `SITE.*`        TRACK A — display / brand copy. Safe to edit anytime.
 *  - `SITE.legacy.*` TRACK B — technical identifiers (npm / git / docker /
 *                    domain / social / hosted URLs). FROZEN until the matching
 *                    resource is renamed or published in the fast-follow.
 *                    Flip the rebrand by editing values here + env, NOT by
 *                    sweeping call sites.
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://loopengine.io";

export const SITE = {
  /** Short product / platform name. */
  productName: "Boss Loops",
  /** Brand lockup / wordmark (matches the logo). */
  brandName: "Boss Loops",
  /** Unit of work (the product's loops — lowercase in prose). */
  unitName: "decision loop",
  unitNamePlural: "decision loops",
  /** Hosted offering on Better Data (display name only; URL is Track B). */
  cloudName: "Boss Loops Cloud",

  tagline: "The system of record for decisions.",
  /** Eyebrow / short tagline. */
  shortTagline: "Governed Decision Intelligence",

  metaDescription:
    "Boss Loops is the system of record for decisions — it turns every " +
    "consequential operational decision into a governed, auditable record " +
    "that fuses the evidence, the policy, the people, and the AI behind it.",

  /** Resolved at build time; flips to the new domain via env in the fast-follow. */
  baseUrl: BASE_URL,

  /**
   * TRACK B — frozen technical identifiers, declared as base tokens.
   *
   * === FLIP THESE AT GO-LIVE ===
   * When the new npm scope / GitHub org / domain / handle go live:
   *   1. Edit the base tokens below.
   *   2. Set NEXT_PUBLIC_BASE_URL to the new domain (drives `SITE.baseUrl`).
   *   3. Run `node scripts/flip-track-b.mjs --apply` to sweep the literal
   *      package-name + URL tokens in MDX/static that can't read from here.
   * All derived URLs (`LEGACY` below) and every call site that imports them
   * flip automatically. See `.cursor/rules/rebrand-glossary.md` → "Track-B go-live".
   *
   * NOTE: `cloudUrl` is a Better Data-owned property (loops.betterdata.co) and
   * may NOT flip with this rebrand — confirm with the bd-forge owners first.
   */
  legacy: {
    npmScope: "@loop-engine",
    githubOrg: "loopengine",
    githubRepo: "loop-engine",
    examplesRepo: "loop-examples",
    /** GitHub repo for THIS marketing/docs site (Edit-on-GitHub, llms.txt source). */
    siteRepo: "loopengine.io",
    twitterHandle: "loopengineio",
    domainHost: "loopengine.io",
    cloudUrl: "https://app.bossloops.io",
    betterDataBlogTag: "loop-engine",
    betterDataChangelogModule: "loop-engine",
    conductEmail: "conduct@loopengine.io",
  },
} as const;

export type SiteConfig = typeof SITE;

const L = SITE.legacy;

/**
 * Derived Track-B URLs. Every value is computed from `SITE.legacy` base tokens,
 * so changing a token there flips all of these (and their call sites) at once.
 * Import these instead of hardcoding GitHub/npm/social/Better Data URLs.
 */
export const LEGACY = {
  npmScope: L.npmScope,
  twitter: `@${L.twitterHandle}`,
  x: `https://x.com/${L.twitterHandle}`,
  github: `https://github.com/${L.githubOrg}/${L.githubRepo}`,
  githubOrg: `https://github.com/${L.githubOrg}`,
  githubReleases: `https://github.com/${L.githubOrg}/${L.githubRepo}/releases`,
  githubIssues: `https://github.com/${L.githubOrg}/${L.githubRepo}/issues`,
  githubNewIssue: `https://github.com/${L.githubOrg}/${L.githubRepo}/issues/new`,
  githubDiscussions: `https://github.com/${L.githubOrg}/${L.githubRepo}/discussions`,
  examplesRepo: `https://github.com/${L.githubOrg}/${L.examplesRepo}`,
  siteRepo: `https://github.com/${L.githubOrg}/${L.siteRepo}`,
  ghApiRepo: `https://api.github.com/repos/${L.githubOrg}/${L.githubRepo}`,
  ghTree: (path: string) => `https://github.com/${L.githubOrg}/${L.githubRepo}/tree/main/${path}`,
  npmOrg: `https://npmjs.com/org/${L.npmScope.replace("@", "")}`,
  blogTag: `https://betterdata.co/blog/tags/${L.betterDataBlogTag}`,
  blogTagFeed: `https://betterdata.co/blog/tags/${L.betterDataBlogTag}/feed`,
  changelogModule: `https://betterdata.co/changelog?module=${L.betterDataChangelogModule}`,
  cloudUrl: L.cloudUrl,
  domainHost: L.domainHost,
  conductEmail: L.conductEmail,
} as const;

/** Build a scoped package name, e.g. npmPkg("sdk") → "@loop-engine/sdk". */
export function npmPkg(name: string): string {
  return `${L.npmScope}/${name}`;
}

/** Build an npm package page URL for a scoped package. */
export function npmPkgUrl(name: string): string {
  return `https://npmjs.com/package/${L.npmScope}/${name}`;
}
