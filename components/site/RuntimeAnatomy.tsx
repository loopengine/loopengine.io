import type { CSSProperties } from "react";

/**
 * Visual deconstruction of the four runtime layers: Intelligence and Evidence
 * feed the Governance gate; Action executes only after guards pass. Frameless
 * so it nests inside VisualSlot or a page-level card. Copy stays aligned with
 * lib/runtime-layers.ts and docs/concepts/runtime-taxonomy.mdx.
 */

type Layer = {
  num: string;
  name: string;
  technical: string;
  accent: string;
  accentBg: string;
  description: string;
  examples: string[];
};

const INTELLIGENCE: Layer = {
  num: "01",
  name: "Intelligence",
  technical: "Providers",
  accent: "#4f46e5",
  accentBg: "rgba(99,102,241,0.10)",
  description:
    "AI analysis and recommendations. Models classify, predict, and draft — they never commit operational state.",
  examples: ["Claude", "GPT", "Gemini", "Perplexity Sonar"],
};

const EVIDENCE: Layer = {
  num: "02",
  name: "Evidence",
  technical: "Context",
  accent: "#047857",
  accentBg: "rgba(16,185,129,0.10)",
  description:
    "Governed data frozen at the moment it informs the decision — the value, its definition, and its provenance.",
  examples: ["Snowflake", "Looker", "Samsara"],
};

const GOVERNANCE: Layer = {
  num: "03",
  name: "Governance",
  technical: "Guards",
  accent: "var(--color-primary)",
  accentBg: "var(--color-primary-light)",
  description:
    "Deterministic policies that enforce rules before side effects land. Humans and AI act under the same guards, attributed on the record — a transition that fails policy does not commit.",
  examples: ["human-only", "confidence-threshold", "evidence-required"],
};

const ACTION: Layer = {
  num: "04",
  name: "Action",
  technical: "Integrations",
  accent: "#b45309",
  accentBg: "rgba(217,119,6,0.10)",
  description:
    "Final execution in your systems of record — updates, tickets, and writebacks run only after the governed commit.",
  examples: ["Salesforce", "Jira", "PagerDuty", "ERP writeback"],
};

const chipStyle = (accent: string, bg: string): CSSProperties => ({
  borderRadius: 999,
  padding: "2px 10px",
  fontFamily: "var(--font-sans)",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  background: bg,
  color: accent,
  whiteSpace: "nowrap",
});

function LayerCard({ layer, highlight = false }: { layer: Layer; highlight?: boolean }) {
  return (
    <div
      style={{
        border: highlight ? "1.5px solid var(--color-primary)" : "1px solid var(--color-border)",
        borderTop: `3px solid ${layer.accent}`,
        borderRadius: "var(--radius-md)",
        background: highlight ? "var(--color-primary-light)" : "var(--color-surface)",
        padding: "16px 18px",
      }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: layer.accent,
          }}
        >
          {layer.num}
        </span>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "var(--text-md)",
            color: "var(--color-ink)",
          }}
        >
          {layer.name}
        </span>
        <span style={chipStyle(layer.accent, layer.accentBg)}>{layer.technical}</span>
      </div>
      <p
        style={{
          marginTop: 8,
          fontSize: "var(--text-sm)",
          color: "var(--color-ink-secondary)",
          lineHeight: 1.65,
        }}
      >
        {layer.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {layer.examples.map((example) => (
          <span
            key={example}
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: 999,
              padding: "2px 10px",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-ink-tertiary)",
              background: "var(--color-surface)",
            }}
          >
            {example}
          </span>
        ))}
      </div>
    </div>
  );
}

export function RuntimeAnatomy() {
  return (
    <div>
      {/* Inputs: intelligence + evidence feed the governance gate */}
      <div className="grid gap-3 md:grid-cols-2">
        <LayerCard layer={INTELLIGENCE} />
        <LayerCard layer={EVIDENCE} />
      </div>

      <div className="grid grid-cols-2 py-2 text-center" aria-hidden>
        <span style={{ color: "var(--color-primary-mid)", fontSize: "var(--text-lg)" }}>↘</span>
        <span style={{ color: "var(--color-primary-mid)", fontSize: "var(--text-lg)" }}>↙</span>
      </div>

      <LayerCard layer={GOVERNANCE} highlight />

      {/* The gate: nothing below runs until guards pass */}
      <div className="flex items-center gap-3 py-3" aria-hidden>
        <span style={{ flex: 1, borderTop: "1.5px dashed var(--color-primary-mid)" }} />
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "var(--text-xs)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--color-primary-dark)",
            whiteSpace: "nowrap",
          }}
        >
          ↓ Side effects land only after every guard passes
        </span>
        <span style={{ flex: 1, borderTop: "1.5px dashed var(--color-primary-mid)" }} />
      </div>

      <LayerCard layer={ACTION} />
    </div>
  );
}
