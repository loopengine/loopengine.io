import type { CSSProperties } from "react";

/**
 * Homepage "Anatomy of a Governed Decision" — the four runtime layers as a
 * dark, system-style control stack (Fireworks.ai-inspired) culminating in the
 * Decision Record. Aspirational framing of the same taxonomy as
 * components/site/RuntimeAnatomy.tsx / lib/runtime-layers.ts.
 */

const INK = "#E6EAF2";
const INK_SECONDARY = "#A7B0C0";
const INK_MUTED = "#6B7689";
const CARD_BG = "rgba(255,255,255,0.04)";
const CARD_BORDER = "rgba(255,255,255,0.10)";

type Layer = {
  num: string;
  kicker: string;
  name: string;
  technical: string;
  accent: string;
  description: string;
  examples: string[];
};

const INTELLIGENCE: Layer = {
  num: "01",
  kicker: "The spark of action",
  name: "Intelligence",
  technical: "Providers",
  accent: "#818CF8",
  description:
    "Models analyze, classify, and recommend transitions. They are the proposers in the system — they cannot commit operational state.",
  examples: ["OpenAI", "Anthropic", "Gemini"],
};

const EVIDENCE: Layer = {
  num: "02",
  kicker: "Truth, frozen in time",
  name: "Evidence",
  technical: "Context",
  accent: "#34D399",
  description:
    "Governed data snapshotted the moment it informs the decision — not a link that might change, a value with provenance inherited from your warehouse.",
  examples: ["Snowflake", "Looker", "Samsara"],
};

const GOVERNANCE: Layer = {
  num: "03",
  kicker: "Deterministic trust",
  name: "Governance",
  technical: "Guards",
  accent: "#7DD3FC",
  description:
    "The Boss Loops engine, where intelligence and evidence are fused and verified against policy. Guards are structural gates, not prompt-based instructions — they decide whether a transition may commit before any side effect occurs.",
  examples: ["human-only", "confidence-threshold", "evidence-required"],
};

const ACTION: Layer = {
  num: "04",
  kicker: "Accountable execution",
  name: "Action",
  technical: "Integrations",
  accent: "#FBBF24",
  description:
    "Your systems of record are updated only after policy passes — every write downstream of a governed, recorded decision.",
  examples: ["Salesforce", "Jira", "PagerDuty"],
};

const chip = (accent: string): CSSProperties => ({
  borderRadius: 999,
  padding: "2px 10px",
  fontFamily: "var(--font-sans)",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  border: `1px solid ${accent}55`,
  color: accent,
  whiteSpace: "nowrap",
});

function LayerCard({ layer, highlight = false }: { layer: Layer; highlight?: boolean }) {
  return (
    <div
      style={{
        border: highlight ? `1.5px solid ${layer.accent}88` : `1px solid ${CARD_BORDER}`,
        borderTop: `3px solid ${layer.accent}`,
        borderRadius: "var(--radius-md)",
        background: highlight ? "rgba(125,211,252,0.07)" : CARD_BG,
        boxShadow: highlight ? `0 0 40px ${layer.accent}22` : undefined,
        padding: "18px 20px",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: layer.accent,
        }}
      >
        {layer.num} · {layer.kicker}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "var(--text-md)",
            color: INK,
          }}
        >
          {layer.name}
        </span>
        <span style={chip(layer.accent)}>{layer.technical}</span>
      </div>
      <p style={{ marginTop: 8, fontSize: "var(--text-sm)", color: INK_SECONDARY, lineHeight: 1.65 }}>
        {layer.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {layer.examples.map((example) => (
          <span
            key={example}
            style={{
              border: `1px solid ${CARD_BORDER}`,
              borderRadius: 999,
              padding: "2px 10px",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: INK_MUTED,
            }}
          >
            {example}
          </span>
        ))}
      </div>
    </div>
  );
}

export function DecisionAnatomySection() {
  return (
    <section
      style={{
        background: "linear-gradient(180deg, #0B1220 0%, #0E1526 100%)",
        borderTop: "1px solid var(--color-border)",
        padding: "80px 0",
      }}
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "var(--text-xs)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#7DD3FC",
          }}
        >
          The control layer
        </p>
        <h2 className="mt-3" style={{ color: INK }}>
          The anatomy of a governed decision
        </h2>
        <p style={{ marginTop: 12, maxWidth: 780, color: INK_SECONDARY, lineHeight: 1.7 }}>
          Boss Loops sits between intelligence and execution as the governance runtime. Four layers, one linear
          flow — and every consequential decision culminates in an immutable Decision Record.
        </p>

        <div className="mt-12">
          <div className="grid gap-4 md:grid-cols-2">
            <LayerCard layer={INTELLIGENCE} />
            <LayerCard layer={EVIDENCE} />
          </div>

          <div className="grid grid-cols-2 py-2 text-center" aria-hidden>
            <span style={{ color: INK_MUTED, fontSize: "var(--text-lg)" }}>↘</span>
            <span style={{ color: INK_MUTED, fontSize: "var(--text-lg)" }}>↙</span>
          </div>

          <LayerCard layer={GOVERNANCE} highlight />

          <div className="flex items-center gap-3 py-3" aria-hidden>
            <span style={{ flex: 1, borderTop: "1.5px dashed rgba(125,211,252,0.35)" }} />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "var(--text-xs)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#7DD3FC",
                whiteSpace: "nowrap",
              }}
            >
              ↓ Side effects land only after every guard passes
            </span>
            <span style={{ flex: 1, borderTop: "1.5px dashed rgba(125,211,252,0.35)" }} />
          </div>

          <LayerCard layer={ACTION} />

          <div className="py-2 text-center" aria-hidden>
            <span style={{ color: INK_MUTED, fontSize: "var(--text-lg)" }}>↓</span>
          </div>

          {/* The culmination: the Decision Record */}
          <div
            style={{
              border: "1.5px solid rgba(255,255,255,0.28)",
              borderRadius: "var(--radius-md)",
              background: "rgba(255,255,255,0.06)",
              padding: "20px 22px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "var(--text-xs)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: INK,
              }}
            >
              The Decision Record
            </p>
            <p
              style={{
                marginTop: 8,
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: 640,
                fontSize: "var(--text-sm)",
                color: INK_SECONDARY,
                lineHeight: 1.65,
              }}
            >
              One immutable, auditable artifact: the situation, the frozen evidence, the policy that applied, the
              humans and AI that participated, and the outcome that followed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
