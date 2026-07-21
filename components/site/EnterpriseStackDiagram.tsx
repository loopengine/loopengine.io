/** Enterprise stack: sources → semantics → Boss Loops → records → surfaces. */
export function EnterpriseStackDiagram() {
  const layers = [
    { label: "ERP · CRM · HRIS · WMS · Finance · BI", emphasis: false },
    { label: "Your existing semantics", emphasis: false },
    { label: "Boss Loops — Governed Decision Intelligence", emphasis: true },
    { label: "Decision Records", emphasis: false },
    { label: "Morning Briefing · Attention · Learning · Automation", emphasis: false },
  ];
  return (
    <div className="flex flex-col items-center gap-2">
      {layers.map((layer, i) => (
        <div key={layer.label} className="flex flex-col items-center gap-2">
          {i > 0 ? (
            <span style={{ color: "var(--color-primary-mid)" }} aria-hidden>
              ↓
            </span>
          ) : null}
          <span
            style={{
              border: layer.emphasis ? "1.5px solid var(--color-primary)" : "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              padding: "10px 22px",
              fontFamily: "var(--font-sans)",
              fontWeight: layer.emphasis ? 600 : 400,
              fontSize: "var(--text-sm)",
              color: layer.emphasis ? "var(--color-primary-dark)" : "var(--color-ink-secondary)",
              background: layer.emphasis ? "var(--color-primary-light)" : "var(--color-surface)",
              textAlign: "center",
            }}
          >
            {layer.label}
          </span>
        </div>
      ))}
    </div>
  );
}
