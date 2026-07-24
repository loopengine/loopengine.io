import type { CSSProperties } from "react";

/**
 * Evidence flow: governed source → freeze → Decision Record.
 *
 * Left: the three provider archetypes (statuses match the provider list on
 * /product/evidence-providers). Middle: what freezing captures. Right: a
 * miniature evidence row as the Decision Record renders it — mirroring the
 * product's Evidence Snapshots panel (source, frozen-at line, P/D/F
 * qualification badges). Use inside a <VisualSlot children=…>.
 */

type SourceStatus = "Preview" | "Planned";

const SOURCES: Array<{ name: string; kind: string; status: SourceStatus }> = [
  { name: "Looker", kind: "Certified BI metric", status: "Preview" },
  { name: "Snowflake", kind: "Governed semantic view", status: "Planned" },
  { name: "Samsara", kind: "Operational reading", status: "Planned" },
];

const FROZEN_FIELDS = [
  "the value",
  "the source's own definition",
  "provenance",
  "freshness",
];

const mono: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

function statusChipStyle(status: SourceStatus): CSSProperties {
  const accent = status === "Preview" ? "var(--color-primary)" : "var(--color-ink-tertiary)";
  return {
    ...mono,
    letterSpacing: "0.04em",
    padding: "1px 7px",
    borderRadius: 999,
    border: `1px solid ${accent}`,
    color: accent,
    whiteSpace: "nowrap",
  };
}

function Arrow() {
  return (
    <div
      aria-hidden
      className="flex items-center justify-center py-1 md:py-0"
      style={{ color: "var(--color-primary-mid, var(--color-primary))", fontSize: "var(--text-lg)" }}
    >
      <span className="hidden md:inline">→</span>
      <span className="md:hidden">↓</span>
    </div>
  );
}

export function EvidenceFlowDiagram({ style }: { style?: CSSProperties }) {
  return (
    <div
      className="grid items-center gap-2 md:grid-cols-[1fr_auto_1fr_auto_1.25fr] md:gap-3"
      style={{ fontFamily: "var(--font-body)", ...style }}
    >
      {/* Governed sources */}
      <div className="space-y-2">
        <p style={{ ...mono, color: "var(--color-ink-tertiary)", margin: 0 }}>Governed sources</p>
        {SOURCES.map((source) => (
          <div
            key={source.name}
            className="flex items-center justify-between gap-2 rounded-lg border px-3 py-2"
            style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
          >
            <div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: "var(--text-sm)" }}>{source.name}</p>
              <p style={{ margin: 0, fontSize: "var(--text-xs)", color: "var(--color-ink-tertiary)" }}>
                {source.kind}
              </p>
            </div>
            <span style={statusChipStyle(source.status)}>{source.status}</span>
          </div>
        ))}
      </div>

      <Arrow />

      {/* The freeze */}
      <div
        className="rounded-lg border px-4 py-4"
        style={{
          borderColor: "var(--color-primary)",
          borderStyle: "dashed",
          background: "var(--color-primary-light, #ecfdf5)",
        }}
      >
        <p style={{ ...mono, color: "var(--color-primary-dark, #065f46)", margin: 0 }}>
          Frozen at capture
        </p>
        <ul className="mt-2 space-y-1" style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {FROZEN_FIELDS.map((field) => (
            <li key={field} style={{ fontSize: "var(--text-xs)", color: "var(--color-ink-secondary)" }}>
              · {field}
            </li>
          ))}
        </ul>
        <p
          style={{
            ...mono,
            letterSpacing: "0.04em",
            marginTop: 10,
            marginBottom: 0,
            color: "var(--color-primary-dark, #065f46)",
          }}
        >
          content-hashed · immutable
        </p>
      </div>

      <Arrow />

      {/* The Decision Record with the evidence row rendered */}
      <div
        className="rounded-lg border px-4 py-3"
        style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
      >
        <p style={{ ...mono, color: "var(--color-ink-tertiary)", margin: 0 }}>Decision Record</p>
        <div
          className="mt-2 rounded-md border px-3 py-2"
          style={{ borderColor: "var(--color-border)", background: "var(--color-surface-alt)" }}
        >
          <p style={{ margin: 0, fontSize: "var(--text-xs)", color: "var(--color-ink-tertiary)" }}>
            Looker · frozen at decision time
          </p>
          <p style={{ margin: "4px 0 0", fontWeight: 600, fontSize: "var(--text-sm)" }}>
            Vendor spend within 12-month band
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["P: system-attested", "D: certified", "F: fresh"].map((badge) => (
              <span
                key={badge}
                style={{
                  ...mono,
                  letterSpacing: "0.04em",
                  padding: "1px 7px",
                  borderRadius: 999,
                  border: "1px solid var(--color-border)",
                  color: "var(--color-ink-secondary)",
                  whiteSpace: "nowrap",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
        <p style={{ margin: "8px 0 0", fontSize: "var(--text-xs)", color: "var(--color-ink-muted)" }}>
          The vendor UI stays live. The record does not change.
        </p>
      </div>
    </div>
  );
}
