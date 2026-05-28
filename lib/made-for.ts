/**
 * "Made For" segments — Boss is sold to an operational pain, so we segment by
 * who feels that pain, not by company size. See `.cursor/rules/rebrand-glossary.md`.
 *
 * `live` segments render the full template; `soon` segments render a lightweight
 * "talk to us" stub so the section never ships thin pages.
 */

const CONTACT_EMAIL = "oss@betterdata.co";

/** Build a tracked "talk to us" mailto for a segment. */
function talkHref(slug: string, subject: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
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
  /** Three concrete jobs Boss does for this segment (live only). */
  jobs?: MadeForJob[];
  /** Before / after Boss (live only). */
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
    label: "Operations leaders",
    audience: "For operations leaders",
    headline: "Scale operational execution without losing control of it.",
    pain: "You're told to do more with AI. You can't afford a hallucinated invoice, a rogue refund, or an action nobody can explain.",
    summary:
      "Put AI to work on real operational execution behind hard guardrails, human gates, and a full audit trail.",
    jobs: [
      {
        title: "Put AI to work behind hard guardrails",
        body: "AI proposes operational actions; deterministic guards decide whether they commit. Policy runs in the runtime — not in a prompt that can be talked past.",
      },
      {
        title: "Keep a human in the loop where it matters",
        body: "Route high-risk transitions to the right approver in Slack, Teams, or email, and let low-risk, high-confidence work flow automatically.",
      },
      {
        title: "Prove what happened, every time",
        body: "Every action is attributed to a named actor and stamped with evidence. When leadership or an auditor asks 'who approved this?', you have the answer.",
      },
    ],
    before:
      "AI is stuck in the productivity layer — it drafts and advises, but can't safely touch your systems of record.",
    after:
      "AI executes real operational work inside explicit boundaries, with a human gate on anything risky and an audit trail on everything.",
    proof: "Runs in production operational systems on the Better Data platform.",
    primaryCtaLabel: "See how it works",
    primaryCtaHref: "/docs/getting-started",
    talkLabel: "Talk to the team",
    talkHref: talkHref("operations", "Boss for operations leaders"),
  },
  {
    slug: "compliance",
    status: "live",
    label: "Compliance & risk",
    audience: "For compliance & risk",
    headline: "Every AI action, traceable. Every decision, accountable.",
    pain: "Your teams are piloting AI against regulated processes. Your job is to make sure it can be governed, evidenced, and defended.",
    summary:
      "Structural governance, tamper-evident evidence, and a queryable chain of custody on every AI-assisted decision.",
    jobs: [
      {
        title: "Governance that's structural, not promised",
        body: "Approval gates and policy guards run at the moment of transition. They can't be prompt-injected away or disabled by a clever instruction.",
      },
      {
        title: "Tamper-evident evidence on every transition",
        body: "Inputs, confidence, approvals, and citations are captured at decision time — an append-only record built for SOC 2, HIPAA, and EU AI Act review, not reconstructed from chat logs.",
      },
      {
        title: "Answer the auditor's question in one query",
        body: "Who acted, under what policy, with what evidence, and when. The full chain of custody is queryable.",
      },
    ],
    before:
      "AI decisions live in opaque chat transcripts with no attribution and no enforceable controls.",
    after:
      "Every material decision is governed by policy, attributed to an actor, and backed by durable evidence you can hand to an auditor.",
    proof:
      "Apache-2.0 with an explicit patent grant — a permissive, OSI-approved license your legal team can clear.",
    primaryCtaLabel: "Read the governance model",
    primaryCtaHref: "/docs/concepts/decision-governance",
    talkLabel: "Talk to the team",
    talkHref: talkHref("compliance", "Boss for compliance & risk"),
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
    talkHref: talkHref("customer-ops", "Boss for customer operations"),
  },
  {
    slug: "finance",
    status: "soon",
    label: "Finance operations",
    audience: "For finance operations",
    headline: "Controls strong enough to put AI on the ledger.",
    pain: "AP, AR, and reconciliation are controls-heavy and mistakes cost real money. AI can help — if it can be governed.",
    summary: "Governed AI execution for controls-heavy finance operations. Coming soon.",
    talkLabel: "Talk to us about finance ops",
    talkHref: talkHref("finance", "Boss for finance operations"),
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
    talkHref: talkHref("platform-teams", "Boss for platform & AI teams"),
  },
];

export function getMadeForSegment(slug: string): MadeForSegment | undefined {
  return MADE_FOR_SEGMENTS.find((s) => s.slug === slug);
}

/** PostHog CTA id for a segment, per the rebrand tracking scheme. */
export function madeForCta(slug: string): string {
  return `boss-nav-madeFor-${slug}-v1`;
}
