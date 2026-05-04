"use client";

import Link from "next/link";

export type DocsPrevNextProps = {
  prev: { title: string; href: string } | null;
  next: { title: string; href: string } | null;
};

export function DocsPrevNext({ prev, next }: DocsPrevNextProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav
      aria-label="Documentation pagination"
      className="mt-16 flex items-center justify-between gap-4"
      style={{
        borderTop: "1px solid var(--color-border)",
        paddingTop: 32
      }}
    >
      <div>
        {prev ? (
          <Link href={prev.href}>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--color-ink-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em"
              }}
            >
              Previous
            </span>
            <span style={{ fontSize: "var(--text-sm)", color: "var(--color-ink-secondary)" }}>{prev.title}</span>
          </Link>
        ) : null}
      </div>

      <div className="text-right">
        {next ? (
          <Link href={next.href}>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--color-ink-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em"
              }}
            >
              Next
            </span>
            <span style={{ fontSize: "var(--text-sm)", color: "var(--color-primary)" }}>{next.title}</span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
