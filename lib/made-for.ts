/**
 * "Made For" segments — Boss Loops is sold to an operational pain, so we segment by
 * who feels that pain, not by company size. See `.cursor/rules/rebrand-glossary.md`.
 *
 * `live` segments render the full template; `soon` segments render a lightweight
 * "talk to us" stub so the section never ships thin pages.
 */

import { SALES_CONTACT_URL } from "@/lib/contact-routes";

/** Build sales contact link for a segment stub. */
function talkHref(_slug: string, _subject: string): string {
  return SALES_CONTACT_URL;
}

export type MadeForJob = { title: string; body: string };

export type MadeForSegment = {
  slug: string;
  status: "live" | "soon";
  /** Card + nav label. */
  label: string;
  /** Who this page is for (eyebrow). */
  audience: string;
  /** Hero headline. */
  headline: string;
  /** One-sentence pain in their language. */
  pain: string;
  /** Short meta/card description. */
  summary: string;
  /** Three concrete jobs Boss Loops does for this segment (live only). */
  jobs?: MadeForJob[];
  /** Before / after Boss Loops (live only). */
  before?: string;
  after?: string;
  /** Proof slot — quote, logo, or early-access line (live only). */
  proof?: string;
  /** Primary CTA (live only). */
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  /** Secondary / stub CTA. */
  talkLabel: string;
  talkHref: string;
};

export const MADE_FOR_SEGMENTS: MadeForSegment[] = [
  {
    slug: "operations",
    status: "live",
    label: "Operations",
    audience: "For operations",
    headline:
      "For operations teams responsible for the decisions that keep the day moving.",
    pain:
      "Every incident, every exception, every override is a decision. Move fast. Keep the record.",
    summary:
      "One incident, every fact that shaped the escalation. The governed record every operations team will eventually be asked for — plus change approvals, exceptions, dispatch, and capacity.",
    // The dedicated app/made-for/operations/page.tsx renders the actual page.
    // These live-mode fields exist so the hub card renders as live (no "Coming
    // soon" badge) and the shared segment metadata stays consistent.
    jobs: [
      {
        title: "Assemble the record, don't reconstruct it",
        body: "Signal evidence, similar-incident context, blast radius, and escalation are captured at the moment of decision — not stitched together from logs later.",
      },
      {
        title: "Move fast where the record is clean",
        body: "High-confidence, in-policy work flows; only exceptions ask for a human. The record explains both.",
      },
      {
        title: "Answer for it in one query",
        body: "Every decision is queryable by policy, service, responder, or any source in its evidence chain — for as long as the record needs to live.",
      },
    ],
    before:
      "Incidents live in Slack, PagerDuty history, and dashboards. When someone asks how the call was made, you go find it.",
    after:
      "Every operations decision — incident, change, exception, dispatch, capacity — is a governed record with the evidence, authority, and outcome attached.",
    proof:
      "Anchored on the Alpine incident-routing scenario shown in the live Boss Loops product.",
    primaryCtaLabel: "See a governed decision",
    primaryCtaHref: "/#governed-decision",
    talkLabel: "Design a pilot",
    talkHref: talkHref("operations", "Boss Loops for operations"),
  },
  {
    slug: "compliance",
    status: "live",
    label: "Risk & stewardship",
    audience: "For risk & stewardship",
    headline: "Every AI action, traceable. Every decision, accountable.",
    pain: "Your teams are deploying AI on consequential operations. Your job is stewardship — making sure every transition can be governed, evidenced, and defended when scrutiny arrives.",
    summary:
      "Structural governance, durable evidence, and a queryable chain of custody on every AI-assisted decision — composable with the compliance programs you already run.",
    jobs: [
      {
        title: "Governance that's structural, not promised",
        body: "Approval gates and policy guards run at the moment of transition. They can't be prompt-injected away or disabled by a clever instruction.",
      },
      {
        title: "Durable evidence on every transition",
        body: "Inputs, confidence, approvals, and citations are frozen at decision time — an append-only record your GRC stack can consume, not reconstructed from chat logs.",
      },
      {
        title: "Answer the hard question in one query",
        body: "Who acted, under what policy, with what evidence, and when. The full chain of custody is queryable — whether the ask comes from audit, legal, or the board.",
      },
    ],
    before:
      "AI decisions live in opaque chat transcripts with no attribution and no enforceable controls.",
    after:
      "Every material decision is governed by policy, attributed to an actor, and backed by durable evidence your stewardship programs can rely on.",
    proof:
      "Apache-2.0 with an explicit patent grant — a permissive, OSI-approved license your legal team can clear.",
    primaryCtaLabel: "Read the governance model",
    primaryCtaHref: "/docs/concepts/decision-governance",
    talkLabel: "Talk to the team",
    talkHref: talkHref("compliance", "Boss Loops for compliance & risk"),
  },
  {
    slug: "customer-ops",
    status: "soon",
    label: "Customer operations",
    audience: "For customer operations",
    headline: "AI does the work. Your team owns the outcome.",
    pain: "Support, claims, and fulfillment are your highest-volume AI use case — and the one most exposed when AI gets it wrong.",
    summary: "Governed AI execution for high-volume customer operations. Coming soon.",
    talkLabel: "Talk to us about customer ops",
    talkHref: talkHref("customer-ops", "Boss Loops for customer operations"),
  },
  {
    slug: "finance",
    status: "live",
    label: "Finance",
    audience: "For finance",
    headline:
      "For finance teams responsible for decisions that must move quickly and remain defensible.",
    pain:
      "Every approval, override, and forecast is one auditor question away from being your problem. Move fast. Keep the record.",
    summary:
      "One invoice, every fact that made it defensible. The governed record every finance team will eventually be asked for — plus pricing, spend, vendor risk, and forecast.",
    // The dedicated app/made-for/finance/page.tsx renders the actual page.
    // These live-mode fields exist so the hub card renders as live (no "Coming
    // soon" badge) and the shared segment metadata stays consistent.
    jobs: [
      {
        title: "Assemble the record, don't reconstruct it",
        body: "Semantic evidence, provenance, budget context, and approval are captured at the moment of decision — not stitched together later from logs.",
      },
      {
        title: "Move fast where the record is clean",
        body: "High-confidence, in-policy work flows; only exceptions ask for a human. The record explains both.",
      },
      {
        title: "Answer for it in one query",
        body: "Every decision is queryable by policy, amount, approver, or any source in its evidence chain — for as long as the record needs to live.",
      },
    ],
    before:
      "Invoice approvals live across email, Slack, and spreadsheets. When someone asks how a decision was made, you go find it.",
    after:
      "Every finance decision — invoice, pricing, spend, vendor, forecast — is a governed record with the evidence, authority, and outcome attached.",
    proof: "Anchored on the Alpine invoice-approval scenario shown in the live Boss Loops product.",
    primaryCtaLabel: "See a governed decision",
    primaryCtaHref: "/#governed-decision",
    talkLabel: "Design a pilot",
    talkHref: talkHref("finance", "Boss Loops for finance"),
  },
  {
    slug: "platform-teams",
    status: "soon",
    label: "Platform & AI teams",
    audience: "For platform & AI teams",
    headline: "Stop hand-rolling guardrails. Run agents on governed infrastructure.",
    pain: "You're deploying agents internally and rebuilding approval gates, attribution, and audit trails for every one.",
    summary: "A governance layer for the agents your teams deploy. Coming soon.",
    talkLabel: "Talk to us about platform needs",
    talkHref: talkHref("platform-teams", "Boss Loops for platform & AI teams"),
  },
];

export function getMadeForSegment(slug: string): MadeForSegment | undefined {
  return MADE_FOR_SEGMENTS.find((s) => s.slug === slug);
}

/** PostHog CTA id for a segment, per the rebrand tracking scheme. */
export function madeForCta(slug: string): string {
  return `boss-nav-madeFor-${slug}-v1`;
}
