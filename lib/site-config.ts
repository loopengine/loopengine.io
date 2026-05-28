/**
 * Single source of truth for Boss (formerly Loop Engine) naming + URLs.
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
  productName: "Boss",
  /** Brand lockup / wordmark (matches the logo). */
  brandName: "Boss Loop",
  /** Unit of work. */
  unitName: "Boss Loop",
  unitNamePlural: "Boss Loops",
  /** Hosted offering on Better Data (display name only; URL is Track B). */
  cloudName: "Boss Cloud",

  tagline: "The control system for AI-assisted operations.",
  /** Eyebrow / short tagline. */
  shortTagline: "Governed AI Operations",

  metaDescription:
    "Boss is the control system for AI-assisted operations — operational " +
    "decision control infrastructure that lets organizations scale AI " +
    "execution with accountability, governance, traceability, and control.",

  /** Resolved at build time; flips to the new domain via env in the fast-follow. */
  baseUrl: BASE_URL,

  /**
   * TRACK B — frozen technical identifiers. Do not hand-edit call sites; edit here.
   */
  legacy: {
    npmScope: "@loop-engine",
    npmOrgUrl: "https://npmjs.com/org/loop-engine",
    githubOrg: "loopengine",
    githubRepo: "loop-engine",
    githubUrl: "https://github.com/loopengine/loop-engine",
    examplesRepoUrl: "https://github.com/loopengine/loop-examples",
    twitter: "@loopengineio",
    /** Hosted product URL on Better Data. */
    cloudUrl: "https://loops.betterdata.co",
    /** Bare host shown in OG / footers until the DNS flip. */
    domainHost: "loopengine.io",
    conductEmail: "conduct@loopengine.io",
  },
} as const;

export type SiteConfig = typeof SITE;
