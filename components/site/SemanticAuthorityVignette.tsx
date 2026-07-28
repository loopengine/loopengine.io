import type { CSSProperties } from "react";

/**
 * Semantic authority vignette — an evidence row that pins the definition
 * version the decision used, next to the "six months later" story.
 *
 * Illustrative render of the provider contract (see caption where used):
 * the fields shown are contract fields, not a shipped dbt integration.
 * Use inside a <VisualSlot children=…>.
 */

const mono: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const ROW_FIELDS: Array<{ label: string; value: string; emphasis?: boolean }> = [
  { label: "Evidence", value: "Available Budget" },
  { label: "Value", value: "$410,000", emphasis: true },
  { label: "Semantic authority", value: "Finance" },
  { label: "Semantic source", value: "dbt" },
  { label: "Model", value: "finance.department_budget_position" },
  { label: "Definition version", value: "v2.3", emphasis: true },
  { label: "Source tests at capture", value: "Passed" },
  { label: "Last refreshed", value: "18 minutes ago" },
];

function chip(text: string, accent = false) {
  return (
    <span
      key={text}
      style={{
        ...mono,
        letterSpacing: "0.04em",
        padding: "1px 7px",
        borderRadius: 999,
        border: `1px solid ${accent ? "var(--color-primary)" : "var(--color-border)"}`,
        color: accent ? "var(--color-primary)" : "var(--color-ink-secondary)",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );
}

export function SemanticAuthorityVignette({ style }: { style?: CSSProperties }) {
  return (
    <div
      className="grid items-stretch gap-2 md:grid-cols-[1.2fr_auto_1fr] md:gap-3"
      style={{ fontFamily: "var(--font-body)", ...style }}
    >
      {/* The evidence row, frozen at decision time */}
      <div
        className="rounded-lg border px-4 py-4"
        style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p style={{ ...mono, color: "var(--color-ink-tertiary)", margin: 0 }}>
            Decision Record · evidence row
          </p>
          {chip("Frozen at decision time", true)}
        </div>
        <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2" style={{ margin: 0 }}>
          {ROW_FIELDS.map((field) => (
            <div key={field.label} className="flex items-baseline justify-between gap-3">
              <dt
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--color-ink-tertiary)",
                  whiteSpace: "nowrap",
                }}
              >
                {field.label}
              </dt>
              <dd
                style={{
                  margin: 0,
                  fontSize: "var(--text-xs)",
                  fontWeight: field.emphasis ? 650 : 500,
                  color: field.emphasis ? "var(--color-ink)" : "var(--color-ink-secondary)",
                  textAlign: "right",
                  overflowWrap: "anywhere",
                }}
              >
                {field.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["P: system-attested", "D: governed", "F: fresh"].map((badge) => chip(badge))}
        </div>
      </div>

      {/* Six months pass */}
      <div
        aria-hidden
        className="flex items-center justify-center py-1 md:py-0"
        style={{ color: "var(--color-primary)" }}
      >
        <div className="text-center">
          <span className="hidden md:inline" style={{ fontSize: "var(--text-lg)" }}>
            →
          </span>
          <span className="md:hidden" style={{ fontSize: "var(--text-lg)" }}>
            ↓
          </span>
          <p style={{ ...mono, letterSpacing: "0.04em", margin: "2px 0 0", color: "var(--color-ink-tertiary)" }}>
            six months later
          </p>
        </div>
      </div>

      {/* The definition moves on; the record does not */}
      <div
        className="rounded-lg border px-4 py-4"
        style={{
          borderColor: "var(--color-primary)",
          borderStyle: "dashed",
          background: "var(--color-primary-light, #ecfdf5)",
        }}
      >
        <p style={{ ...mono, color: "var(--color-primary-dark, #065f46)", margin: 0 }}>
          The definition moves on
        </p>
        <p style={{ margin: "8px 0 0", fontSize: "var(--text-sm)", color: "var(--color-ink-secondary)", lineHeight: 1.6 }}>
          Finance ships <strong>v3.0</strong> of <em>available budget</em> — committed spend is
          reclassified, and today&apos;s number answers a different question.
        </p>
        <p style={{ margin: "10px 0 0", fontSize: "var(--text-sm)", color: "var(--color-ink)", fontWeight: 600, lineHeight: 1.6 }}>
          The record still answers with v2.3 — the meaning the decision was actually made under.
        </p>
        <div className="mt-3">{chip("Decision used definition · v2.3", true)}</div>
      </div>
    </div>
  );
}
