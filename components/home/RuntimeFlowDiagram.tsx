import { RUNTIME_LAYERS } from "@/lib/runtime-layers";

const FLOW_STEPS = RUNTIME_LAYERS.map((l) => ({
  id: l.id,
  label: l.title,
  flowHint:
    l.id === "providers"
      ? "↓ intelligence in"
      : l.id === "loops"
        ? "↓ governance"
        : l.id === "channels"
          ? "↓ human coordination"
          : l.id === "integrations"
            ? "↓ operational execution"
            : "↓ audit + learning"
}));

type RuntimeFlowDiagramProps = {
  variant?: "hero" | "section" | "annotated";
};

export function RuntimeFlowDiagram({ variant = "section" }: RuntimeFlowDiagramProps) {
  const compact = variant === "hero";
  const annotated = variant === "annotated";

  if (annotated) {
    return (
      <div
        role="img"
        aria-label="Annotated runtime flow: intelligence enters, governance decides, humans coordinate, systems execute, evidence records"
        className="grid gap-3"
      >
        {FLOW_STEPS.map((step, index) => (
          <div key={step.id}>
            <div
              className="grid gap-2 rounded-lg border p-4 md:grid-cols-[160px_1fr]"
              style={{
                borderColor: step.id === "loops" ? "var(--color-primary)" : "var(--color-border)",
                background: step.id === "loops" ? "var(--color-primary-light)" : "var(--color-surface-alt)"
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--color-ink-muted)"
                  }}
                >
                  {step.flowHint}
                </p>
                <p
                  style={{
                    marginTop: 4,
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-sm)",
                    color: step.id === "loops" ? "var(--color-primary)" : "var(--color-ink-secondary)"
                  }}
                >
                  {step.label}
                </p>
              </div>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--color-ink-tertiary)", lineHeight: 1.6 }}>
                {RUNTIME_LAYERS.find((l) => l.id === step.id)?.role}
              </p>
            </div>
            {index < FLOW_STEPS.length - 1 ? (
              <p className="py-1 text-center" style={{ color: "var(--color-primary-mid)" }} aria-hidden>
                ↓
              </p>
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label="Runtime flow: Providers, Loops and Guards, Channels, Integrations, then Evidence"
      className="flex flex-wrap items-center gap-2"
    >
      {FLOW_STEPS.map((step, index) => (
        <div key={step.id} className="flex items-center gap-2">
          <div
            style={{
              border:
                step.id === "loops"
                  ? "1px solid var(--color-primary)"
                  : "1px solid var(--color-border)",
              borderRadius: compact ? 999 : "var(--radius-sm)",
              padding: compact ? "8px 12px" : "10px 14px",
              fontFamily: "var(--font-mono)",
              fontSize: compact ? "var(--text-xs)" : "var(--text-sm)",
              letterSpacing: "0.04em",
              background:
                step.id === "loops" ? "var(--color-primary-light)" : "var(--color-surface-alt)",
              color: step.id === "loops" ? "var(--color-primary)" : "var(--color-ink-secondary)"
            }}
            title={RUNTIME_LAYERS.find((l) => l.id === step.id)?.role}
          >
            {step.label}
          </div>
          {index < FLOW_STEPS.length - 1 ? (
            <span style={{ color: "var(--color-primary-mid)" }} aria-hidden>
              ↓
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
