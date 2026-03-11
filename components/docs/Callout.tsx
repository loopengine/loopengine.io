import type { ReactNode } from "react";

type CalloutVariant = "info" | "warning" | "tip" | "important";

type CalloutProps = {
  variant: CalloutVariant;
  title?: string;
  children: ReactNode;
};

const variantStyles: Record<CalloutVariant, { border: string; background: string; icon: string }> = {
  info: {
    border: "var(--color-primary)",
    background: "var(--color-primary-glow)",
    icon: "ⓘ"
  },
  warning: {
    border: "#F59E0B",
    background: "rgba(245, 158, 11, 0.08)",
    icon: "⚠"
  },
  tip: {
    border: "#10B981",
    background: "rgba(16, 185, 129, 0.08)",
    icon: "✦"
  },
  important: {
    border: "#EF4444",
    background: "rgba(239, 68, 68, 0.08)",
    icon: "!"
  }
};

export function Callout({ variant, title, children }: CalloutProps) {
  const style = variantStyles[variant];

  return (
    <aside
      style={{
        display: "flex",
        gap: 12,
        borderLeft: `3px solid ${style.border}`,
        borderRadius: "0 var(--radius-md) var(--radius-md) 0",
        background: style.background,
        padding: "16px 20px",
        margin: "24px 0"
      }}
    >
      <span aria-hidden>{style.icon}</span>
      <div>
        {title ? (
          <p style={{ margin: "0 0 6px", fontWeight: 600, color: "var(--color-ink)" }}>{title}</p>
        ) : null}
        <div>{children}</div>
      </div>
    </aside>
  );
}
