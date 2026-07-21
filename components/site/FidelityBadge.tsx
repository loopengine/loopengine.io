import type { CSSProperties } from "react";

/**
 * Small, understated chip that labels the fidelity of a proof surface.
 *
 * Used anywhere the site shows seeded or preview product evidence — most
 * commonly on Alpine (the canonical seeded reference environment). Sits inside
 * or near the visual, not as a warning banner.
 *
 * Per rebrand policy: any Alpine or preview evidence surface must carry this
 * label visibly. See `.cursor/rules/rebrand-glossary.md`.
 */
export type FidelityKind = "seeded" | "preview";

const KIND_LABEL: Record<FidelityKind, string> = {
  seeded: "Canonical seeded scenario",
  preview: "Preview",
};

export function FidelityBadge({
  kind = "seeded",
  style,
}: {
  kind?: FidelityKind;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-label={`Fidelity: ${KIND_LABEL[kind]}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        color: "var(--color-ink-tertiary)",
        borderRadius: 999,
        padding: "3px 9px",
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      <span
        aria-hidden
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: "var(--color-primary)",
          opacity: 0.7,
        }}
      />
      {KIND_LABEL[kind]}
    </span>
  );
}
