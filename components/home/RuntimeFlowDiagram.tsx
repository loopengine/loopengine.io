const STEPS = [
  { id: "providers", label: "Providers", hint: "Intelligence enters the runtime" },
  { id: "loops", label: "Loops + Guards", hint: "Policy before any transition" },
  { id: "channels", label: "Channels", hint: "Humans approve where they work" },
  { id: "integrations", label: "Integrations", hint: "Systems act after governance" },
  { id: "evidence", label: "Evidence", hint: "Audit trail + learning signals" }
] as const;

type RuntimeFlowDiagramProps = {
  variant?: "hero" | "section";
};

export function RuntimeFlowDiagram({ variant = "section" }: RuntimeFlowDiagramProps) {
  const compact = variant === "hero";

  return (
    <div
      role="img"
      aria-label="Runtime flow: Providers, Loops and Guards, Channels, Integrations, then Evidence"
      className="flex flex-wrap items-center gap-2"
    >
      {STEPS.map((step, index) => (
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
            title={step.hint}
          >
            {step.label}
          </div>
          {index < STEPS.length - 1 ? (
            <span style={{ color: "var(--color-primary-mid)" }} aria-hidden>
              ↓
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
