"use client";

import { useState } from "react";

export function NpmInstallChip() {
  const [copied, setCopied] = useState(false);
  const command = "npm install @loop-engine/sdk";

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      aria-label="Copy npm install command"
      onClick={onCopy}
      type="button"
      style={{
        background: "var(--color-code-bg)",
        border: "1px solid var(--color-border-dark)",
        borderRadius: "var(--radius-sm)",
        padding: "10px 16px",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-xs)",
        color: "var(--color-code-text)",
        display: "inline-flex",
        alignItems: "center",
        gap: 10
      }}
    >
      <span>{command}</span>
      <span aria-live="polite" style={{ color: copied ? "var(--color-code-string)" : "var(--color-code-comment)" }}>
        {copied ? "Copied!" : "Copy"}
      </span>
    </button>
  );
}
