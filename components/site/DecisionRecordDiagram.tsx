import type { CSSProperties } from "react";
import { FidelityBadge } from "./FidelityBadge";
import { ALPINE_ACTORS } from "@/lib/alpine";

/**
 * Rendering of a Boss Loops Decision Record.
 *
 * Two scenarios:
 *
 *   - `scenario="invoice"` (default): the real Alpine record INV-2026-004521
 *     (Acme Industrial Supply · Supplier Invoice Approval · Completed). Fields
 *     and participants match what the actual Story tab shows in the Alpine
 *     reference environment. Prefer swapping in a real screenshot via
 *     <VisualSlot src=... />; this component is the fallback rendering.
 *
 *   - `scenario="incident"`: STILL ILLUSTRATIVE. No real ops-side record has
 *     been captured yet, so this scenario ships with placeholder specifics
 *     (api-checkout, DR-3047, "confidence 0.89"). When a real Alpine ops
 *     record is available, rewrite this block against it — same rule as the
 *     invoice: no invented product content on Alpine surfaces.
 *
 * Any use of this component must be accompanied by a fidelity badge (rendered
 * inline in the top-right of the card) and the seeded-scenario disclosure line
 * near the surface.
 */

type BusinessObjectRow = { source: string; claim: string; value: string };

type Participant = { name: string; role: string; action: string };

type ScenarioContent = {
  recordId: string;
  status: string;
  timestamp: string;
  decisionLine: React.ReactNode;
  /** Section label above the row grid — "Business Object" or "Evidence". */
  detailLabel: string;
  detail: BusinessObjectRow[];
  /** Named actors on the record. When present, replaces the authority + AI grid. */
  participants?: Participant[];
  /** Fallback fields for scenarios not yet rewritten to the participants shape. */
  authorityName?: string;
  authorityPolicy?: string;
  aiRecommendation?: string;
  aiModel?: string;
  outcome: string;
};

const SCENARIOS: Record<"invoice" | "incident", ScenarioContent> = {
  invoice: {
    recordId: "INV-2026-004521",
    status: "Completed",
    timestamp: "Received Monday 8:42 AM",
    decisionLine: (
      <>
        Sarah Chen — Case file complete. Release for payment.
      </>
    ),
    detailLabel: "Business object",
    detail: [
      { source: "Supplier", claim: "Acme Industrial Supply", value: "Hydraulic Components" },
      { source: "Invoice", claim: "INV-2026-004521", value: "$12,481.70 · Net 30" },
      { source: "Purchase order", claim: "PO-11983", value: "Fort Collins Plant" },
      { source: "Received", claim: "Monday 8:42 AM", value: "Supplier Invoice Approval" },
    ],
    participants: [
      {
        name: "Sarah Chen",
        role: "VP Operations",
        action: "Case file complete. Release for payment.",
      },
      {
        name: "Claude",
        role: "Decision assistant",
        action: "Claude reviewed. Confidence High.",
      },
      {
        name: "David Okonkwo",
        role: "Controller",
        action: "Hold for Finance; freight not on PO-11983.",
      },
    ],
    outcome: "Released for payment.",
  },
  // ILLUSTRATIVE — no real Alpine ops record has been captured yet. Rewrite
  // against the real record when it's available (same rule as the invoice
  // scenario: no invented product content on Alpine surfaces).
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
    detailLabel: "Evidence",
    detail: [
      { source: "Grafana", claim: "P95 latency vs. baseline", value: "12s → 42s · 6 min" },
      { source: "PagerDuty", claim: "Similar incidents · 90 d", value: "3 seen · avg TTR 22 min" },
      { source: "Runbook", claim: "api-checkout-timeout match", value: "confidence 0.91" },
      { source: "Datadog", claim: "DB connection pool", value: "saturated · 87%" },
    ],
    authorityName: ALPINE_ACTORS.ops,
    authorityPolicy: "Runbook-Escalation-v2 · api-checkout",
    aiRecommendation: "Recommend Sev-2 · confidence 0.89",
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
  Completed: {
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

      {/* Business object / Evidence (structured captured content) */}
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
          {s.detailLabel}
        </p>
        <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none" }}>
          {s.detail.map((row) => (
            <li
              key={`${row.source}-${row.claim}`}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(112px, auto) minmax(120px, 1fr) auto",
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

      {/* Participants — named actor rows (real Alpine records) */}
      {s.participants ? (
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
            Participants · {s.participants.length}
          </p>
          <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none" }}>
            {s.participants.map((p) => (
              <li
                key={p.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(140px, auto) 1fr",
                  gap: 12,
                  alignItems: "baseline",
                  padding: "8px 0",
                  borderTop: "1px dashed var(--color-border)",
                }}
              >
                <span style={{ fontSize: "var(--text-sm)", color: "var(--color-ink)" }}>
                  <strong style={{ fontWeight: 600 }}>{p.name}</strong>
                  <span style={{ color: "var(--color-ink-muted)" }}> · {p.role}</span>
                </span>
                <span style={{ fontSize: "var(--text-sm)", color: "var(--color-ink-secondary)" }}>
                  {p.action}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // Legacy scenarios not yet rewritten with a real record.
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
            <p style={{ marginTop: 4, fontSize: "var(--text-sm)", color: "var(--color-ink)", lineHeight: 1.5 }}>
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
            <p style={{ marginTop: 4, fontSize: "var(--text-sm)", color: "var(--color-ink)", lineHeight: 1.5 }}>
              {s.aiRecommendation}
              <br />
              <span style={{ color: "var(--color-ink-muted)" }}>{s.aiModel}</span>
            </p>
          </div>
        </div>
      )}

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
