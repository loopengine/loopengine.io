import { CONTACT_PAGE, SALES_CONTACT_URL } from "@/lib/contact-routes";
import { VisualSlot } from "@/components/site/VisualSlot";
import { LoopStateMachineDiagram } from "@/components/site/LoopStateMachineDiagram";
import { DecisionRecordDiagram } from "@/components/site/DecisionRecordDiagram";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

/**
 * Inline visuals available today for specific concepts. Slots without an
 * entry here render the labeled dashed placeholder from VisualSlot.
 */
const CONCEPT_VISUALS: Record<string, ReactNode> = {
  "decision-loops": <LoopStateMachineDiagram />,
  evidence: <DecisionRecordDiagram scenario="invoice" />,
};

export const metadata: Metadata = {
  title: "How it works — the Boss Loops engine, in plain English",
  description:
    "What a decision loop is, how it differs from a workflow, and what actors, guards, signals, events, adapters, evidence, and the loop catalog each do — explained for buyers, not builders.",
};

type Concept = {
  slug: string;
  name: string;
  tagline: string;
  paragraphs: string[];
  docsHref: string;
  docsLabel: string;
  /**
   * Illustrative image for this concept.
   * - Without `src` (and without an entry in `CONCEPT_VISUALS`): renders as a
   *   labeled dashed placeholder from VisualSlot with the shot recommendation.
   * - With `src`: renders the real screenshot / diagram from
   *   public/screenshots/.
   * - Concepts with an inline React visual (see `CONCEPT_VISUALS`) render
   *   that instead — no `src` needed.
   */
  image?: {
    label: string;
    caption: string;
    src?: string;
    alt?: string;
    /** Chrome-free frame for diagrams; browser-style chrome for real screenshots. */
    variant?: "screenshot" | "diagram";
  };
};

const CONCEPTS: Concept[] = [
  {
    slug: "decision-loops",
    name: "Decision loops",
    tagline: "The unit of work — a governed cycle around one decision",
    paragraphs: [
      "A decision loop carries one consequential decision from the moment something opens it to a recorded, accountable outcome. A supplier invoice lands over threshold; a refrigerated shipment records a temperature excursion; a customer asks for credit beyond their limit. Each of those opens a loop.",
      "Inside the loop, the pieces the rest of this page describes do their jobs: evidence attaches from governed sources, policy evaluates every proposed step, the right participants — human and AI — act under their own names, and the outcome is measured after the fact. When the loop closes, what remains is a Decision Record: what was known, who decided, under which rules, and what happened next.",
      "Under the hood a loop is a finite-state machine, which is what makes it enforceable — a transition either satisfies the rules or it does not commit. But the state machine is the mechanism, not the point. The point is that the decision, not the task, is the object your organization manages."
    ],
    docsHref: "/docs/concepts/what-is-a-loop",
    docsLabel: "What is a loop",
    image: {
      label: "Diagram — a decision loop's state machine (Alpine supplier invoice)",
      caption: "The Alpine supplier invoice loop. Active guards on the governed happy-path transition are annotated below the diagram — a transition that doesn't satisfy them doesn't commit."
    }
  },
  {
    slug: "loops-vs-workflows",
    name: "Workflow vs. State Machine vs. Decision Loop",
    tagline: "Execution pipelines, status models, and governance — how they stack",
    paragraphs: [
      "Workflow engines excel at sequential execution: step two follows step one, APIs fire, boxes get checked. State machines excel at status, events, and legal transitions: an entity sits in a named state until a valid event moves it. Boss Loops uses state-machine enforcement to govern decisions with durable evidence — and composes with workflow engines for everything that runs after approval.",
      "The trap is filing consequential approvals as workflows. A sequential pipeline treats approval as another API step. If someone asks why a $10M invoice was paid, step logs are not enough. In Boss Loops the invoice sits in PENDING_APPROVAL behind active guards — it cannot transition to APPROVED without the required approval on the record and evidence frozen at that moment.",
      "Generic explainers call state machines passive. Boss Loops is an active gatekeeper: invariant enforcement denies illegal transitions while the loop waits for signals. A transition that fails policy does not commit.",
      "Signal → Boss Loops governs the commit → transition approved → your workflow engine executes the downstream pipeline. Temporal, n8n, Salesforce — unchanged. Boss Loops is the brains before the muscle."
    ],
    docsHref: "/docs/concepts/what-is-a-loop",
    docsLabel: "What is a loop",
    image: {
      label: "Workflow vs. State Machine vs. Decision Loop",
      caption: "Signal enters. Boss Loops governs the commit — guards, state machine, evidence, actors. Downstream execution (Temporal, n8n, Salesforce) runs unchanged.",
      src: "/screenshots/workflow-vs-loop.png",
      alt: "Workflow vs. State Machine vs. Decision Loop — a signal enters Boss Loops for a governed decision; state-machine enforcement, guards, evidence, and actors govern the commit; downstream workflow engines execute unchanged.",
      variant: "diagram"
    }
  },
  {
    slug: "actors",
    name: "Actors",
    tagline: "Humans, automations, and AI on one attribution model",
    paragraphs: [
      "Everyone who touches a decision acts as an attributed actor: the quality manager who approves, the automation that advances routine state, the AI model that recommends. One identity model, one audit trail, one set of rules about who may do what.",
      "That symmetry is what makes AI safe to put inside consequential decisions. An AI actor's recommendation carries its model, its prompt fingerprint, and its confidence — recorded the same way a human signature is. When the answer to \"who decided?\" includes an AI, the record says so precisely, instead of leaving \"the system did it\" as the final word.",
      "It also means governance doesn't care how the work gets done. Shift a decision from human review to AI recommendation to partial automation over time — the attribution, guards, and audit trail stay identical. Autonomy becomes a dial you turn, not a rewrite."
    ],
    docsHref: "/docs/concepts/actor-model",
    docsLabel: "The actor model",
    image: {
      label: "Screenshot — actor attribution on the Alpine Decision Record (human · automation · AI)",
      caption: "Recommended: the Participants row on Alpine record INV-2026-004521 — Sarah Chen (VP Operations, 'Case file complete. Release for payment.'), Claude (Decision assistant, 'Claude reviewed. Confidence High.'), and David Okonkwo (Controller, 'Hold for Finance; freight not on PO-11983.') — three attributed actors on one row."
    }
  },
  {
    slug: "guards",
    name: "Guards",
    tagline: "Deterministic invariants for agentic systems",
    paragraphs: [
      "Guards are the enforcement mechanism: deterministic checks evaluated at every proposed transition. Hard guards block outright — a missing piece of required evidence, an approver without authority, an AI recommendation below the confidence floor. Weighted guards score and flag, so borderline cases route to a human instead of sailing through.",
      "The crucial word is deterministic. Guards are code in the runtime, not instructions in a prompt an AI might creatively reinterpret. A transition that fails policy does not commit — there is no \"the model decided to proceed anyway.\" And denials are recorded with the same fidelity as approvals, because the decisions you stopped are part of the story too.",
      "This is what \"governance is the substrate\" means in practice: the rules aren't a review meeting or a wiki page. They execute."
    ],
    docsHref: "/docs/concepts/guards-and-policy",
    docsLabel: "Guards & policy",
    image: {
      label: "Screenshot — a blocked transition with the failing guard visible",
      caption: "Recommended: an Alpine record showing a transition that failed policy (e.g. AI confidence 0.72 below the 0.90 floor). The record captures the guard name, why it fired, and who reviewed the denial — same fidelity as an approval."
    }
  },
  {
    slug: "signals",
    name: "Signals",
    tagline: "How the world opens a decision",
    paragraphs: [
      "Something changes in your operation: a sensor reads out of band, an invoice exceeds a threshold, demand spikes on one channel. Most systems turn that into an alert — a notification someone has to notice, interpret, and chase across three other tools.",
      "In Boss Loops, that change is a signal, and a signal opens the right decision loop directly: a lot-release review, an invoice approval, a replenishment decision — with the relevant evidence already attaching. The difference sounds small and isn't. An alert asks \"did anyone see this?\" A signal asks \"what did we decide about this?\" — and guarantees there will be an answer on the record."
    ],
    docsHref: "/docs/concepts/signals",
    docsLabel: "Signals",
    image: {
      label: "Screenshot — a signal opening the right loop with evidence pre-attached",
      caption: "Recommended: a signal card (e.g. temperature excursion, invoice over threshold) with the resulting decision loop opening beneath it and the relevant evidence already visible on the record — not an alert queue."
    }
  },
  {
    slug: "events",
    name: "Events",
    tagline: "Every transition, announced",
    paragraphs: [
      "Each state change in a loop emits a structured event: who acted, what evidence was attached, which guards evaluated and how. Events are how the rest of the world keeps up — they deliver approval requests into Slack or Teams, notify downstream systems that a decision committed, and feed the observability that makes any run replayable.",
      "Because events are structured contracts rather than log lines, they're dependable enough to build on: your systems can react to decisions the way they react to transactions, and anyone reviewing a decision later can replay its history without reconstructing it from chat scrollback."
    ],
    docsHref: "/docs/packages/events",
    docsLabel: "Event contracts",
    image: {
      label: "Screenshot or diagram — a loop's event stream, replay-ready",
      caption: "Recommended: the timeline of a single Alpine decision — signal received, evidence attached, transition proposed, guards evaluated, transition committed — each row a structured event with actor + timestamp."
    }
  },
  {
    slug: "adapters",
    name: "Adapters",
    tagline: "How loops reach your stack",
    paragraphs: [
      "Adapters wire the outside world into governed loops, and the taxonomy matters: Model Providers (Claude, GPT, Gemini, Grok) participate as attributed AI actors; channels (Slack, Teams, OpenClaw) carry human coordination — approvals and escalations where people already work; integrations (PagerDuty, Postgres, HTTP APIs) execute against systems of record, and only after governance passes.",
      "The layers are deliberately not interchangeable. Intelligence can't write to your CRM directly; a chat channel is never the system of record; execution never precedes policy. That separation is what lets you adopt AI aggressively at the recommendation layer while the blast radius of a wrong answer stays bounded."
    ],
    docsHref: "/docs/integrations",
    docsLabel: "Adapters & integrations",
    image: {
      label: "Diagram — the adapter taxonomy (Model Providers · Channels · Integrations)",
      caption: "Recommended: three horizontal bands — top row Model Providers (Claude, GPT, Gemini, Grok), middle row Channels (Slack, Teams, OpenClaw), bottom row Integrations (PagerDuty, Postgres, HTTP APIs) — with the governance layer running across all three."
    }
  },
  {
    slug: "evidence",
    name: "Evidence",
    tagline: "What they knew at the time — frozen",
    paragraphs: [
      "Every consequential decision rests on evidence, and evidence has a failure mode every operator knows: the dashboard that looked different last month, the screenshot in an email thread, the number nobody can trace to a definition. Decisions get defended with links to things that have since changed.",
      "Boss Loops captures evidence as a governed snapshot at the moment it informs the decision — the value, the source's own definition of what that value means, its freshness, and its provenance, frozen onto the record. Evidence Providers do this against the systems you already trust: a certified Looker metric, a governed Snowflake semantic view, a Samsara reading at decision time. Your definitions, not re-derived ones; a snapshot, not a link.",
      "Qualification travels with the evidence — how governed the definition is, how attestable the provenance — inherited from the source, never asserted by whoever built the loop. A decision can require \"a governed metric and an origin-attested reading,\" and the engine enforces it."
    ],
    docsHref: "/docs/concepts/evidence-providers",
    docsLabel: "Evidence Providers",
    image: {
      label: "The Alpine Decision Record",
      caption: "The Alpine supplier invoice Decision Record — evidence rows are frozen at the moment they inform the decision, with definitions inherited from the source. Same record shown across the site."
    }
  },
  {
    slug: "loop-catalog",
    name: "Loop catalog",
    tagline: "Decision loops as reusable definitions",
    paragraphs: [
      "The decisions that matter in your operation are not unique to you: supplier invoice approval, purchase approval, inventory exception, returns triage, credit review. The catalog holds these as published loop definitions — the participants, evidence requirements, and policy shape already modeled — so your team instantiates and adapts a proven pattern instead of rebuilding governance from a blank page.",
      "As your own decision systems mature, they join the catalog too: institutional judgment, versioned and reusable, that survives the person who designed it."
    ],
    docsHref: "/catalog",
    docsLabel: "Browse the catalog",
    image: {
      label: "Screenshot — the loop catalog grid (supplier invoice, purchase approval, returns triage, credit review)",
      caption: "Recommended: the catalog surface as a grid of loop templates — each card showing the loop name, participant taxonomy, evidence requirements, and a 'Use as template' action."
    }
  }
];

const eyebrowStyle = {
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: "var(--text-xs)",
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: "var(--color-primary)"
};

export default function HowItWorksPage() {
  return (
    <main>
      <section
        style={{
          background: "linear-gradient(180deg, var(--color-surface-alt) 0%, var(--color-surface) 100%)",
          borderBottom: "1px solid var(--color-border)",
          padding: "72px 0 48px"
        }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <p style={eyebrowStyle}>How it works</p>
          <h1 className="mt-3" style={{ fontSize: "clamp(var(--text-2xl), 4vw, var(--text-4xl))", letterSpacing: "-0.02em", maxWidth: 760 }}>
            The engine, in plain English
          </h1>
          <p style={{ marginTop: 14, maxWidth: 760, color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
            Boss Loops is built from a small number of ideas that compose: decision loops governed by guards, worked
            by attributed actors, opened by signals, explained by evidence. Each is explained below — no reference
            docs required.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {CONCEPTS.map((c) => (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: 999,
                  padding: "6px 14px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 500,
                  color: "var(--color-ink-secondary)",
                  background: "var(--color-surface)",
                  textDecoration: "none"
                }}
              >
                {c.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {CONCEPTS.map((concept, idx) => (
        <section
          key={concept.slug}
          id={concept.slug}
          className="scroll-mt-20"
          style={{
            background: idx % 2 === 0 ? "var(--color-surface)" : "var(--color-surface-subtle)",
            borderTop: idx > 0 ? "1px solid var(--color-border)" : undefined,
            padding: "56px 0"
          }}
        >
          <div className="mx-auto w-full max-w-[860px] px-6 md:px-10">
            <h2>{concept.name}</h2>
            <p style={{ marginTop: 6, fontSize: "var(--text-md)", fontWeight: 500, color: "var(--color-ink-secondary)" }}>
              {concept.tagline}
            </p>
            {concept.paragraphs.map((para) => (
              <p key={para.slice(0, 40)} style={{ marginTop: 14, color: "var(--color-ink-tertiary)", lineHeight: 1.75 }}>
                {para}
              </p>
            ))}
            {concept.image ? (
              <VisualSlot
                label={concept.image.label}
                caption={concept.image.caption}
                src={concept.image.src}
                alt={concept.image.alt}
                variant={concept.image.variant}
              >
                {CONCEPT_VISUALS[concept.slug] ?? undefined}
              </VisualSlot>
            ) : null}
            <p style={{ marginTop: 20, fontSize: "var(--text-sm)", color: "var(--color-ink-muted)" }}>
              Go deeper:{" "}
              <Link href={concept.docsHref} style={{ color: "var(--color-primary)" }}>
                {concept.docsLabel} →
              </Link>
            </p>
          </div>
        </section>
      ))}

      <section style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)", padding: "56px 0 72px" }}>
        <div className="mx-auto w-full max-w-[860px] px-6 md:px-10">
          <h2>See it as a buyer, not a builder</h2>
          <p style={{ marginTop: 10, fontSize: "var(--text-sm)", color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
            These pieces exist so the platform above them can make a simple promise: every consequential decision
            becomes a record you can defend. See how the four pillars compose on the product overview, or ask us to
            walk you through a governed decision end to end.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/product"
              className="inline-flex items-center"
              style={{
                background: "var(--color-primary)",
                color: "#fff",
                borderRadius: "var(--radius-sm)",
                padding: "10px 20px",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "var(--text-sm)"
              }}
            >
              Product overview
            </Link>
            <a
              href={CONTACT_PAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
              style={{
                background: "var(--color-primary)",
                color: "#fff",
                borderRadius: "var(--radius-sm)",
                padding: "10px 20px",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "var(--text-sm)"
              }}
            >
              Request a demo
            </a>
            <a
              href={SALES_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-ink)",
                borderRadius: "var(--radius-sm)",
                padding: "10px 20px",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "var(--text-sm)"
              }}
            >
              Talk to us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
