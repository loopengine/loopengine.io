import type { CSSProperties } from "react";
import { FidelityBadge } from "./FidelityBadge";

/**
 * Illustrative rendering of a Boss Loops Decision Record.
 *
 * NOT a screenshot. A stylized structural view of what a governed decision
 * record contains: the decision, the evidence chain, the authority, the AI
 * actor, and the outcome — arranged as they appear in the real product.
 *
 * Ships with the Alpine invoice-approval scenario by default. When a real
 * screenshot from the Alpine environment is available, prefer passing it to
 * `<VisualSlot src=... />` instead of rendering this component.
 *
 * Any use of this component must be accompanied by a fidelity badge (rendered
 * inline in the top-right of the card) and the seeded-scenario disclosure line
 * near the surface.
 */

type EvidenceRow = { source: string; claim: string; value: string };

export function DecisionRecordDiagram({ style }: { style?: CSSProperties }) {
  const evidence: EvidenceRow[] = [
    { source: "Looker", claim: "Budget variance vs. plan", value: "−3.1% MTD" },
    { source: "NetSuite", claim: "Vendor tenure", value: "4.2 years, no disputes" },
    { source: "NetSuite", claim: "PO reference", value: "PO-8814 matched, 3-way" },
    { source: "Slack", claim: "Buying team approval thread", value: "#procurement, 4 acks" },
  ];

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
            DR-2831
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "2px 8px",
              borderRadius: 999,
              background: "var(--color-primary-light, #ecfdf5)",
              color: "var(--color-primary-dark, #065f46)",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Approved
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-ink-muted)",
            }}
          >
            12 Nov 2026 · 14:03 UTC
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
          Approve invoice <span style={{ fontFamily: "var(--font-mono)" }}>INV-4291</span>{" "}
          for <span style={{ fontFamily: "var(--font-mono)" }}>$12,847.00</span> from Aegis Semantics.
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
          Evidence · 4 sources
        </p>
        <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none" }}>
          {evidence.map((row) => (
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
            Sam Patel · Controller
            <br />
            <span style={{ color: "var(--color-ink-muted)" }}>Approval Matrix v3.2 · Tier B</span>
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
            Approve · confidence 0.94
            <br />
            <span style={{ color: "var(--color-ink-muted)" }}>gpt-4o · prompt hash 8f22…</span>
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
          Committed to NetSuite AP · notification sent to vendor and buying team.
        </p>
      </div>
    </div>
  );
}
