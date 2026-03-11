"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsOrder } from "./docs-nav";

export function DocsPager() {
  const pathname = usePathname();
  const currentIndex = docsOrder.findIndex((item) => item.href === pathname);
  const previous = currentIndex > 0 ? docsOrder[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < docsOrder.length - 1 ? docsOrder[currentIndex + 1] : null;

  if (!previous && !next) {
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
        {previous ? (
          <Link href={previous.href}>
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
            <span style={{ fontSize: "var(--text-sm)", color: "var(--color-ink-secondary)" }}>
              {previous.title}
            </span>
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
