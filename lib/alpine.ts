/**
 * Canonical seeded actor identities in the Alpine reference environment.
 *
 * These are the real service/authority names used across seeded Decision
 * Records shown on the marketing site. Every actor rendered on an Alpine
 * proof surface (Decision Record, actor row, evidence chain) must use one
 * of these — never invent alternatives (e.g. "Sam Patel · Controller",
 * "Priya Nair · On-call Tier 1").
 *
 * If you need an identity that isn't in this map, ask before shipping.
 */
export const ALPINE_ACTORS = {
  ops: "alpine-ops",
  warehouse: "alpine-warehouse",
  auditor: "alpine-auditor",
  finance: "alpine-finance",
  admin: "alpine-admin",
} as const;

export type AlpineActor = (typeof ALPINE_ACTORS)[keyof typeof ALPINE_ACTORS];
