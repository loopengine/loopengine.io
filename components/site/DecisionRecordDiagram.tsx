import type { CSSProperties } from "react";
import { FidelityBadge } from "./FidelityBadge";

/**
 * Illustrative rendering of a Boss Loops Decision Record.
 *
 * NOT a screenshot. A stylized structural view of what a governed decision
 * record contains: the decision, the evidence chain, the authority, the AI
 * actor, and the outcome — arranged as they appear in the real product.
 *
 * Ships two Alpine canonical seeded scenarios:
 *   - `scenario="invoice"` (default): Finance / invoice-approval — Aegis
 *     Semantics vendor. Used on /made-for/finance.
 *   - `scenario="incident"`: Operations / incident-routing — API latency
 *     Sev-2 escalation. Used on /made-for/operations.
 *
 * When a real Alpine screenshot is available for either scenario, prefer
 * passing it to `<VisualSlot src=... />` instead of rendering this component.
 *
 * Any use of this component must be accompanied by a fidelity badge (rendered
 * inline in the top-right of the card) and the seeded-scenario disclosure line
 * near the surface.
 */

type EvidenceRow = { source: string; claim: string; value: string };

type ScenarioContent = {
  recordId: string;
  status: string;
  timestamp: string;
  decisionLine: React.ReactNode;
  evidence: EvidenceRow[];
  authorityName: string;
  authorityRole: string;
  authorityPolicy: string;
  aiRecommendation: string;
  aiConfidence: string;
  aiModel: string;
  outcome: string;
};

const SCENARIOS: Record<"invoice" | "incident", ScenarioContent> = {
  invoice: {
    recordId: "DR-2831",
    status: "Approved",
    timestamp: "12 Nov 2026 · 14:03 UTC",
    decisionLine: (
      <>
        Approve invoice <span style={{ fontFamily: "var(--font-mono)" }}>INV-4291</span> for{" "}
        <span style={{ fontFamily: "var(--font-mono)" }}>$12,847.00</span> from Aegis Semantics.
      </>
    ),
    evidence: [
      { source: "Looker", claim: "Budget variance vs. plan", value: "−3.1% MTD" },
      { source: "NetSuite", claim: "Vendor tenure", value: "4.2 years, no disputes" },
      { source: "NetSuite", claim: "PO reference", value: "PO-8814 matched, 3-way" },
      { source: "Slack", claim: "Buying team approval thread", value: "#procurement, 4 acks" },
    ],
    authorityName: "Sam Patel · Controller",
    authorityRole: "",
    authorityPolicy: "Approval Matrix v3.2 · Tier B",
    aiRecommendation: "Approve · confidence 0.94",
    aiConfidence: "",
    aiModel: "gpt-4o · prompt hash 8f22…",
    outcome: "Committed to NetSuite AP · notification sent to vendor and buying team.",
  },
  incident: {
    recordId: "DR-3047",
    status: "Escalated",
    timestamp: "14 Nov 2026 · 09:18 UTC",
    decisionLine: (
      <>
        Page on-call · <span style={{ fontFamily: "var(--font-mono)" }}>api-checkout</span> P95
        latency spike · classify Sev-2.
      </>
    ),
    evidence: [
      { source: "Grafana", claim: "P95 latency vs. baseline", value: "12s → 42s · 6 min" },
      { source: "PagerDuty", claim: "Similar incidents · 90 d", value: "3 seen · avg TTR 22 min" },
      { source: "Runbook", claim: "api-checkout-timeout match", value: "confidence 0.91" },
      { source: "Datadog", claim: "DB connection pool", value: "saturated · 87%" },
    ],
    authorityName: "Priya Nair · On-call Tier 1",
    authorityRole: "",
    authorityPolicy: "Runbook-Escalation-v2 · api-checkout",
    aiRecommendation: "Recommend Sev-2 · confidence 0.89",
    aiConfidence: "",
    aiModel: "gpt-4o · prompt hash 4c19…",
    outcome:
      "PagerDuty incident opened · Slack war-room #inc-3047 · runbook attached to record.",
  },
};

const STATUS_TONE: Record<string, { bg: string; fg: string }> = {
  Approved: {
    bg: "var(--color-primary-light, #ecfdf5)",
    fg: "var(--color-primary-dark, #065f46)",
  },
  Escalated: {
    bg: "var(--color-surface-alt, #fef3c7)",
    fg: "var(--color-ink, #78350f)",
  },
};

export function DecisionRecordDiagram({
  scenario = "invoice",
  style,
}: {
  scenario?: "invoice" | "incident";
  style?: CSSProperties;
}) {
  const s = SCENARIOS[scenario];
  const tone = STATUS_TONE[s.status] ?? STATUS_TONE.Approved;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        fontFamily: "var(--font-body)",
        color: "var(--color-ink)",
        ...style,
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "10px 0 14px",
          borderBottom: "1px solid var(--color-border)",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-ink-tertiary)",
              letterSpacing: "0.06em",
            }}
          >
            {s.recordId}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "2px 8px",
              borderRadius: 999,
              background: tone.bg,
              color: tone.fg,
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {s.status}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-ink-muted)",
            }}
          >
            {s.timestamp}
          </span>
        </div>
        <FidelityBadge kind="seeded" />
      </div>

      {/* Decision */}
      <div style={{ padding: "16px 0 14px", borderBottom: "1px solid var(--color-border)" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--color-ink-muted)",
          }}
        >
          Decision
        </p>
        <p
          style={{
            marginTop: 4,
            fontSize: "var(--text-lg)",
            fontFamily: "var(--font-display)",
            color: "var(--color-ink)",
            lineHeight: 1.35,
          }}
        >
          {s.decisionLine}
        </p>
      </div>

      {/* Evidence */}
      <div style={{ padding: "16px 0 14px", borderBottom: "1px solid var(--color-border)" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--color-ink-muted)",
          }}
        >
          Evidence · {s.evidence.length} sources
        </p>
        <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none" }}>
          {s.evidence.map((row) => (
            <li
              key={`${row.source}-${row.claim}`}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(84px, auto) minmax(120px, 1fr) auto",
                gap: 12,
                alignItems: "baseline",
                padding: "6px 0",
                borderTop: "1px dashed var(--color-border)",
                fontSize: "var(--text-sm)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--color-primary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {row.source}
              </span>
              <span style={{ color: "var(--color-ink-secondary)" }}>{row.claim}</span>
              <span style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink)" }}>
                {row.value}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Authority + AI actor */}
      <div
        style={{
          padding: "16px 0 14px",
          borderBottom: "1px solid var(--color-border)",
          display: "grid",
          gap: 14,
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-ink-muted)",
            }}
          >
            Authority
          </p>
          <p
            style={{
              marginTop: 4,
              fontSize: "var(--text-sm)",
              color: "var(--color-ink)",
              lineHeight: 1.5,
            }}
          >
            {s.authorityName}
            <br />
            <span style={{ color: "var(--color-ink-muted)" }}>{s.authorityPolicy}</span>
          </p>
        </div>
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-ink-muted)",
            }}
          >
            AI recommendation
          </p>
          <p
            style={{
              marginTop: 4,
              fontSize: "var(--text-sm)",
              color: "var(--color-ink)",
              lineHeight: 1.5,
            }}
          >
            {s.aiRecommendation}
            <br />
            <span style={{ color: "var(--color-ink-muted)" }}>{s.aiModel}</span>
          </p>
        </div>
      </div>

      {/* Outcome */}
      <div style={{ padding: "16px 0 6px" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--color-ink-muted)",
          }}
        >
          Outcome
        </p>
        <p
          style={{
            marginTop: 4,
            fontSize: "var(--text-sm)",
            color: "var(--color-ink)",
            lineHeight: 1.5,
          }}
        >
          {s.outcome}
        </p>
      </div>
    </div>
  );
}
