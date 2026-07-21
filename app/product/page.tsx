import type { Metadata } from "next";
import Link from "next/link";
import { VisualSlot } from "@/components/site/VisualSlot";
import { EnterpriseStackDiagram } from "@/components/site/EnterpriseStackDiagram";
import { DEMO_URL, SALES_CONTACT_URL } from "@/lib/contact-routes";

export const metadata: Metadata = {
  title: "Governed Decision Intelligence",
  description:
    "Decision Governance for operational AI. Boss Loops governs the commit — frozen evidence, deterministic guards, and an immutable Decision Record — while your workflow engines and analytics platforms handle execution.",
};

const eyebrowStyle = {
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: "var(--text-xs)",
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: "var(--color-primary)",
};

const bodyStyle = {
  marginTop: 12,
  maxWidth: 780,
  color: "var(--color-ink-tertiary)",
  lineHeight: 1.75,
};

function PrimaryCta({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center"
      style={{
        background: "var(--color-primary)",
        color: "#fff",
        borderRadius: "var(--radius-sm)",
        padding: "11px 24px",
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        fontSize: "var(--text-sm)",
      }}
    >
      {label}
    </a>
  );
}

function SecondaryCta({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center"
      style={{
        border: "1px solid var(--color-border)",
        color: "var(--color-ink)",
        borderRadius: "var(--radius-sm)",
        padding: "11px 24px",
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        fontSize: "var(--text-sm)",
      }}
    >
      {label}
    </a>
  );
}

/** VISUAL 1 — the lifecycle loop: Capture → Govern → Intelligence → Operate → back to Capture. */
function LifecycleDiagram() {
  const stages = ["Capture", "Govern", "Intelligence", "Operate"];
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {stages.map((stage, i) => (
          <div key={stage} className="flex items-center gap-2">
            <span
              style={{
                border: "1px solid var(--color-primary-mid)",
                borderRadius: 999,
                padding: "10px 20px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "var(--text-sm)",
                color: "var(--color-primary-dark)",
                background: "var(--color-primary-light)",
              }}
            >
              {stage}
            </span>
            {i < stages.length - 1 ? (
              <span style={{ color: "var(--color-primary-mid)", fontSize: "var(--text-lg)" }} aria-hidden>
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-xs)",
          color: "var(--color-ink-muted)",
        }}
      >
        ↺ every outcome feeds back into the next decision — continuously improving
      </p>
    </div>
  );
}

/** VISUAL 3 — the enterprise stack: sources → semantics → Boss Loops → records → surfaces. */

const GARTNER_PILLARS: { name: string; body: string; ours?: boolean }[] = [
  {
    name: "Decision Analysis",
    body: "FICO, SAS, Aera — model outcomes, simulate scenarios, optimize recommendations.",
  },
  {
    name: "Decision Engineering",
    body: "Encode business logic into decision services and orchestrate model outputs.",
  },
  {
    name: "Decision Science",
    body: "Experimentation, behavioral insight, and continuous improvement of decision quality.",
  },
  {
    name: "Decision Governance",
    body: "Govern who may commit, on what evidence, under which policy — with a durable record of every consequential transition. This is what Boss Loops owns.",
    ours: true,
  },
];

const HIGH_STAKES_LOOPS: { name: string; trap: string; position: string }[] = [
  {
    name: "Settle / Pay exception",
    trap: "Modeled as a data pipeline or a linear rule: if invoice > $X, route to Y.",
    position:
      "Invoice settlement governance. The invoice is an entity with a complex state lifecycle — disputed, under review, flagged for exception. Boss Loops governs the legal transitions and records why an override was authorized.",
  },
  {
    name: "Trace / Release quality",
    trap: "Streaming analytics flag a temperature excursion but rely on brittle manual tickets.",
    position:
      "Lot release governance. A real-time signal opens an active loop; the state cannot return to cleared-for-release without multi-party evidence and strict guards.",
  },
  {
    name: "Incident / Response remediation",
    trap: "PagerDuty fires a webhook; an engineer runs scripts manually with no decision layer.",
    position:
      "Incident lifecycle governance. Boss Loops authorizes which remediation workflows may run and produces a replayable record for the post-mortem.",
  },
];
const PILLARS: { name: string; body: string }[] = [
  {
    name: "Capture",
    body: "Evidence from systems of record and semantic layers you already trust — ERP, Snowflake, Looker, operational readings — qualified and frozen at capture, with references back to source definitions.",
  },
  {
    name: "Govern",
    body: "The differentiator. Evidence is qualified, policy is enforced, approvals are captured with the evidence presented, and the audit history is immutable. Policy checks run in the engine, not in a prompt.",
  },
  {
    name: "Intelligence",
    body: "AI that's finally useful because it's accountable — recommendations, morning briefings, confidence, emerging-risk detection, pattern analysis, and organizational learning that compounds with every decision.",
  },
  {
    name: "Operate",
    body: "The operational layer — human-in-the-loop and governed automation, escalations, SLAs, and orchestration across the systems you already run.",
  },
];

const COMPARISONS: string[] = [
  "Workflow automates tasks. Boss Loops governs decisions.",
  "BPM models processes. Boss Loops models decision-making.",
  "BI explains yesterday. Boss Loops governs tomorrow.",
  "Platforms that map your enterprise understand its data. Boss Loops operationalizes its decisions.",
  "Platforms that optimize autonomous decisions engineer the human out. Boss Loops governs human and AI decisions together.",
];

/* ——— Pillar vignettes: mini product-UI mockups (pure CSS, swap for screenshots later) ——— */

const vignetteShell: React.CSSProperties = {
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  background: "var(--color-surface-alt)",
  padding: "12px",
  fontFamily: "var(--font-sans)",
  fontSize: 11,
  lineHeight: 1.5,
};

const vignetteChip = (bg: string, color: string): React.CSSProperties => ({
  borderRadius: 999,
  padding: "1px 7px",
  fontSize: 9,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  background: bg,
  color,
  whiteSpace: "nowrap",
});

const vRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  padding: "5px 8px",
  borderRadius: 6,
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  marginTop: 5,
};

function CaptureVignette() {
  return (
    <div style={vignetteShell} aria-hidden>
      <div className="flex items-center justify-between">
        <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>INV-2026-004521</span>
        <span style={vignetteChip("var(--color-primary-light)", "var(--color-primary-dark)")}>Decision Record</span>
      </div>
      <div style={vRow}>
        <span style={{ color: "var(--color-ink-secondary)" }}>Snowflake · gross_margin 42.3%</span>
        <span style={vignetteChip("rgba(16,185,129,0.12)", "#047857")}>Governed</span>
      </div>
      <div style={vRow}>
        <span style={{ color: "var(--color-ink-secondary)" }}>SAP · Invoice #12345</span>
        <span style={vignetteChip("rgba(148,163,184,0.16)", "var(--color-ink-tertiary)")}>Source</span>
      </div>
      <p style={{ marginTop: 7, color: "var(--color-ink-muted)", fontSize: 10 }}>❄ Frozen at capture · provenance recorded</p>
    </div>
  );
}

function GovernVignette() {
  return (
    <div style={vignetteShell} aria-hidden>
      <div className="flex items-center justify-between">
        <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>Guards · P-102</span>
        <span style={vignetteChip("var(--color-primary-light)", "var(--color-primary-dark)")}>Policy</span>
      </div>
      <div style={vRow}>
        <span style={{ color: "var(--color-ink-secondary)" }}>✓ Evidence qualification</span>
        <span style={vignetteChip("rgba(16,185,129,0.12)", "#047857")}>Pass</span>
      </div>
      <div style={vRow}>
        <span style={{ color: "var(--color-ink-secondary)" }}>✕ Commit → APPROVED</span>
        <span style={vignetteChip("rgba(245,158,11,0.14)", "#a16207")}>Blocked</span>
      </div>
      <p style={{ marginTop: 7, color: "var(--color-ink-muted)", fontSize: 10 }}>Approval required — denial recorded</p>
    </div>
  );
}

function IntelligenceVignette() {
  return (
    <div style={vignetteShell} aria-hidden>
      <div className="flex items-center justify-between">
        <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>Morning briefing</span>
        <span style={vignetteChip("var(--color-primary-light)", "var(--color-primary-dark)")}>3 need you</span>
      </div>
      <div style={vRow}>
        <span style={{ color: "var(--color-ink-secondary)" }}>Lot release review</span>
        <span style={vignetteChip("rgba(239,68,68,0.12)", "#b91c1c")}>SLA 2h</span>
      </div>
      <div style={vRow}>
        <span style={{ color: "var(--color-ink-secondary)" }}>Recurring lane excursion</span>
        <span style={vignetteChip("rgba(16,185,129,0.12)", "#047857")}>Recommendation</span>
      </div>
      <p style={{ marginTop: 7, color: "var(--color-ink-muted)", fontSize: 10 }}>Ranked by consequence, anchored to records</p>
    </div>
  );
}

function OperateVignette() {
  return (
    <div style={vignetteShell} aria-hidden>
      <div className="flex items-center justify-between">
        <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>scm.procurement</span>
        <span style={vignetteChip("var(--color-primary-light)", "var(--color-primary-dark)")}>Loop run</span>
      </div>
      <div style={vRow}>
        <span style={{ color: "var(--color-ink-secondary)" }}>Signal → loop opened</span>
        <span style={vignetteChip("rgba(148,163,184,0.16)", "var(--color-ink-tertiary)")}>09:14</span>
      </div>
      <div style={vRow}>
        <span style={{ color: "var(--color-ink-secondary)" }}>Governed commit</span>
        <span style={vignetteChip("rgba(16,185,129,0.12)", "#047857")}>Approved</span>
      </div>
      <div style={vRow}>
        <span style={{ color: "var(--color-ink-secondary)" }}>Workflow executes → ERP</span>
        <span style={vignetteChip("rgba(16,185,129,0.12)", "#047857")}>Done</span>
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <main>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(180deg, var(--color-surface-alt) 0%, var(--color-surface) 100%)",
          borderBottom: "1px solid var(--color-border)",
          padding: "76px 0 60px",
        }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <p style={eyebrowStyle}>Governed Decision Intelligence</p>
          <h1
            className="mt-3"
            style={{ fontSize: "clamp(var(--text-3xl), 5vw, var(--text-5xl))", letterSpacing: "-0.02em" }}
          >
            Govern the commit. Delegate the execution.
          </h1>
          <p
            style={{
              marginTop: 16,
              maxWidth: 780,
              color: "var(--color-ink)",
              lineHeight: 1.7,
              fontSize: "var(--text-md)",
              fontWeight: 500,
            }}
          >
            Your enterprise has spent millions on data pipelines, predictive models, and workflow automation. Boss
            Loops is the Decision Governance layer that sits above them — so every AI-driven, automated, or
            human-in-the-loop transition is bound by deterministic guards, frozen evidence, and an immutable Decision
            Record.
          </p>
          <p style={bodyStyle}>
            Intelligence without governance is risk. Governance without intelligence is bureaucracy. Boss Loops is
            both — focused on the Decision Governance pillar of the Decision Intelligence market.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryCta label="Try the demo" href={DEMO_URL} />
            <SecondaryCta label="See how it works ↓" href="#category" />
          </div>
        </div>
      </section>

      {/* Category — Gartner DIP framing */}
      <section id="category" className="scroll-mt-20" style={{ background: "var(--color-surface)", padding: "64px 0" }}>
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <h2 style={{ maxWidth: 820 }}>Decision Intelligence — and the pillar no one has owned</h2>
          <p style={bodyStyle}>
            Decision Intelligence platforms break into four capabilities: Decision Analysis, Decision Engineering,
            Decision Science, and Decision Governance. The giants — FICO, SAS, Aera — optimize and execute decisions.
            Enterprises are paralyzed by a different problem: as AI agents start making consequential operational
            decisions, legal, operational, and reputational risk compounds. The top trend in this space is{" "}
            <strong style={{ color: "var(--color-ink)" }}>reducing agentic risk through Decision Governance</strong>.
          </p>
          <p style={bodyStyle}>
            Boss Loops does not compete on model optimization. It governs the commit — who may transition, on what
            evidence, under which policy — and records the answer as an immutable Decision Record. Your workflow
            engines, ERP attestations, and GRC programs remain in place; Boss Loops is the governance layer they were
            never built to hold.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {GARTNER_PILLARS.map((pillar) => (
              <article
                key={pillar.name}
                style={{
                  border: pillar.ours ? "2px solid var(--color-primary-mid)" : "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  background: pillar.ours ? "var(--color-primary-light)" : "var(--color-surface-subtle)",
                  padding: "20px 22px",
                }}
              >
                <h3 style={{ fontSize: "var(--text-md)" }}>
                  {pillar.name}
                  {pillar.ours ? (
                    <span
                      style={{
                        marginLeft: 8,
                        fontSize: "var(--text-xs)",
                        fontWeight: 600,
                        color: "var(--color-primary-dark)",
                      }}
                    >
                      — Boss Loops
                    </span>
                  ) : null}
                </h3>
                <p style={{ marginTop: 8, fontSize: "var(--text-sm)", color: "var(--color-ink-secondary)", lineHeight: 1.7 }}>
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>
          <VisualSlot label="Visual — the decision lifecycle">
            <LifecycleDiagram />
          </VisualSlot>
        </div>
      </section>

      {/* Three-tier positioning */}
      <section
        style={{ background: "var(--color-surface-subtle)", borderTop: "1px solid var(--color-border)", padding: "64px 0" }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <h2>Three tiers, one product</h2>
          <p style={bodyStyle}>
            Enterprise buyers, process owners, and architects need different vocabulary for the same system. Boss Loops
            speaks all three without diluting the technical identity underneath.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 max-w-[720px]">
            {[
              {
                tier: "Decision Intelligence",
                audience: "Enterprise buyer — VP Ops, CIO, risk",
                line: "Reducing agentic risk through Decision Governance",
              },
              {
                tier: "Decision Loop",
                audience: "Product & process owners",
                line: "Governed state cycles, durable evidence, and C10 authority",
              },
              {
                tier: "Finite State Machine",
                audience: "Software engineers & architects",
                line: "Deterministic guardrails and state-driven execution",
              },
            ].map((row, i) => (
              <div key={row.tier} className="flex flex-col items-stretch">
                <article
                  style={{
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--color-surface)",
                    padding: "18px 22px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      fontSize: "var(--text-xs)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--color-primary)",
                    }}
                  >
                    {row.tier}
                  </p>
                  <p style={{ marginTop: 4, fontSize: "var(--text-xs)", color: "var(--color-ink-muted)" }}>
                    {row.audience}
                  </p>
                  <p style={{ marginTop: 8, fontSize: "var(--text-sm)", color: "var(--color-ink-secondary)", lineHeight: 1.6 }}>
                    {row.line}
                  </p>
                </article>
                {i < 2 ? (
                  <span
                    className="self-center"
                    style={{ color: "var(--color-primary-mid)", fontSize: "var(--text-lg)", lineHeight: 1 }}
                    aria-hidden
                  >
                    ▼
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Four pillars — numbered cards with product vignettes */}
      <section
        id="pillars"
        className="scroll-mt-20"
        style={{ background: "var(--color-surface-subtle)", borderTop: "1px solid var(--color-border)", padding: "64px 0" }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <h2 style={{ maxWidth: 760, fontSize: "clamp(var(--text-2xl), 3.5vw, var(--text-3xl))" }}>
            From signal to defensible decision — in four moves
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {PILLARS.map((pillar, i) => (
              <article
                key={pillar.name}
                className="flex flex-col"
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--color-surface)",
                  padding: "24px 22px",
                }}
              >
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--color-primary)" }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)" }}>
                  {pillar.name}
                </h3>
                <p style={{ marginTop: 8, fontSize: "var(--text-sm)", color: "var(--color-ink-secondary)", lineHeight: 1.65, flex: 1 }}>
                  {pillar.body}
                </p>
                <div className="mt-5">
                  {i === 0 ? <CaptureVignette /> : i === 1 ? <GovernVignette /> : i === 2 ? <IntelligenceVignette /> : <OperateVignette />}
                </div>
              </article>
            ))}
          </div>

          {/* Trust strip — Sigma-style "day zero, built in", truth-only */}
          <div
            className="mt-10 flex flex-col gap-4 rounded-xl border p-6 lg:flex-row lg:items-center lg:justify-between"
            style={{ borderColor: "var(--color-border)", background: "var(--color-primary-light)" }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-primary-dark)",
                }}
              >
                Day zero, built in
              </p>
              <p style={{ marginTop: 4, fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", color: "var(--color-ink)" }}>
                Governance as the substrate
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {[
                ["Apache-2.0", "Open core"],
                ["Frozen evidence", "At capture"],
                ["Immutable audit", "Every transition"],
                ["Replayable", "By construction"],
              ].map(([title, sub]) => (
                <div key={title} className="flex items-center gap-2">
                  <span aria-hidden style={{ color: "var(--color-primary-dark)" }}>✓</span>
                  <span>
                    <span style={{ fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--color-ink)" }}>{title}</span>{" "}
                    <span style={{ fontSize: "var(--text-xs)", color: "var(--color-ink-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {sub}
                    </span>
                  </span>
                </div>
              ))}
              <a
                href="https://betterdata.co/trust"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--color-primary-dark)", textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                Trust Center →
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
              style={{
                background: "var(--color-primary)",
                color: "#fff",
                borderRadius: "var(--radius-sm)",
                padding: "11px 24px",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "var(--text-sm)",
              }}
            >
              Try the demo
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
                padding: "11px 24px",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "var(--text-sm)",
              }}
            >
              Talk to sales
            </a>
          </div>
        </div>
      </section>

      {/* High-stakes operational loops */}
      <section
        style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)", padding: "64px 0" }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <h2>Where to win: high-stakes, event-driven loops</h2>
          <p style={bodyStyle}>
            Decision Intelligence buyers care about volatile, complex operations — procurement, supply chain, finance
            exceptions, and incident response. Not HR onboarding. Boss Loops governs the loops where a wrong commit
            costs real money, reputation, or operational continuity — whether or not the industry is formally
            regulated.
          </p>
          <div className="mt-8 grid gap-5">
            {HIGH_STAKES_LOOPS.map((loop) => (
              <article
                key={loop.name}
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--color-surface-subtle)",
                  padding: "22px 24px",
                }}
              >
                <h3 style={{ fontSize: "var(--text-lg)" }}>{loop.name}</h3>
                <p style={{ marginTop: 10, fontSize: "var(--text-sm)", color: "var(--color-ink-muted)", lineHeight: 1.65 }}>
                  <strong style={{ color: "var(--color-ink-secondary)" }}>The trap:</strong> {loop.trap}
                </p>
                <p style={{ marginTop: 8, fontSize: "var(--text-sm)", color: "var(--color-ink-secondary)", lineHeight: 1.7 }}>
                  <strong style={{ color: "var(--color-ink)" }}>Boss Loops:</strong> {loop.position}
                </p>
              </article>
            ))}
          </div>
          <p style={{ marginTop: 16, fontSize: "var(--text-sm)", color: "var(--color-ink-muted)" }}>
            Same pattern applies to ABM approvals, demand forecast review, and pricing exceptions —{" "}
            <Link href="/use-cases" style={{ color: "var(--color-primary)" }}>
              see operational patterns →
            </Link>
          </p>
        </div>
      </section>

      {/* The Decision Record */}
      <section
        id="decision-record"
        className="scroll-mt-20"
        style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)", padding: "64px 0" }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <h2>The Decision Record: the center of the platform</h2>
          <p style={bodyStyle}>
            Every other system holds a piece — the ERP holds the invoice, the warehouse holds the metric, the policy
            lives in a PDF, the AI&apos;s reasoning vanishes with the chat window. None of them holds the decision.
          </p>
          <p style={bodyStyle}>
            The Decision Record does: the context, the qualified evidence, the governance that applied, the AI and
            human participation, the outcome, and the learning it produced — as one immutable, auditable, replayable
            artifact. That artifact is what lets you answer leadership, operations, and stewardship when they ask why
            a consequential transition committed.
          </p>
          <p style={{ ...bodyStyle, fontSize: "var(--text-sm)", color: "var(--color-ink-muted)" }}>
            Not post-hoc explainability on a black-box model —{" "}
            <strong style={{ color: "var(--color-ink-secondary)" }}>durable evidence</strong> frozen at the moment of
            the transition, with the exact inputs the approver or agent saw.
          </p>
          <VisualSlot
            label="Screenshot — The Decision Record"
            caption="A full Decision Record: context, qualified evidence with sources, policy applied, AI recommendation, human approval, outcome — frozen at decision time."
          />
        </div>
      </section>

      {/* Where it sits */}
      <section
        style={{ background: "var(--color-surface-subtle)", borderTop: "1px solid var(--color-border)", padding: "64px 0" }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <h2>Where it sits</h2>
          <p style={bodyStyle}>
            Boss Loops doesn&apos;t replace ERP, CRM, HRIS, WMS, or BI. It sits above them, consumes the business
            semantics they already contain, and adds the one layer they were never built to hold — the governed
            Decision Record.
          </p>
          <VisualSlot label="Visual — the enterprise stack">
            <EnterpriseStackDiagram />
          </VisualSlot>
          <p style={{ marginTop: 14, fontSize: "var(--text-sm)", color: "var(--color-ink-muted)" }}>
            More on this:{" "}
            <Link href="/product/reuse-dont-rebuild" style={{ color: "var(--color-primary)" }}>
              Reuse, don&apos;t rebuild →
            </Link>
          </p>
        </div>
      </section>

      {/* See it operate */}
      <section style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)", padding: "64px 0" }}>
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <h2>See it operate</h2>
          <p style={bodyStyle}>
            Decisions arrive where the work happens — a prioritized queue of what needs a human now, a daily
            operating narrative, and every decision one click from its full record.
          </p>
          <VisualSlot
            label="Screenshot — Attention & Briefing"
            caption="The Decision Operations workspace: the morning briefing headline and the Attention queue of live decisions requiring review."
          />
        </div>
      </section>

      {/* What makes it different */}
      <section
        style={{ background: "var(--color-surface-subtle)", borderTop: "1px solid var(--color-border)", padding: "64px 0" }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <h2>What makes it different</h2>
          <ul className="mt-6 space-y-3" style={{ maxWidth: 780 }}>
            {COMPARISONS.map((line) => {
              const [theirs, ours] = line.split(". Boss Loops");
              return (
                <li key={line} style={{ color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
                  {theirs}.{" "}
                  <strong style={{ color: "var(--color-ink)" }}>Boss Loops{ours}</strong>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* The shift */}
      <section style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)", padding: "64px 0 76px" }}>
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <h2>The shift</h2>
          <p style={bodyStyle}>
            ERP turned transactions into managed assets. CRM turned relationships into managed assets. BI turned data
            into managed assets. <strong style={{ color: "var(--color-ink)" }}>Boss Loops turns decisions into managed assets.</strong>
          </p>
          <p style={bodyStyle}>
            As AI becomes embedded in every enterprise, organizations won&apos;t just want AI that recommends —
            they&apos;ll need to prove what was decided, why, on what evidence, under which policy, who approved it,
            what happened, and how they learned from it. That&apos;s not a feature. It&apos;s the next layer of
            enterprise software, and it&apos;s the category Boss Loops is built to own.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryCta label="Try the demo" href={DEMO_URL} />
            <SecondaryCta label="Talk to us" href={SALES_CONTACT_URL} />
          </div>
        </div>
      </section>
    </main>
  );
}
