"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { docsSections } from "./docs-nav";

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DocsSidebar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const visibleSections = useMemo(() => {
    if (!normalizedQuery) return docsSections;
    return docsSections
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.title.toLowerCase().includes(normalizedQuery) ||
            item.href.toLowerCase().includes(normalizedQuery)
        )
      }))
      .filter((section) => section.items.length > 0);
  }, [normalizedQuery]);

  return (
    <aside
      className="hidden lg:block"
      style={{
        width: "var(--sidebar-width)",
        position: "sticky",
        top: 56,
        height: "calc(100vh - 56px)",
        overflowY: "auto",
        background: "var(--color-surface)",
        borderRight: "1px solid var(--color-border)",
        padding: "24px 0",
        scrollbarWidth: "none"
      }}
    >
      <nav aria-label="Documentation sidebar">
        <div style={{ padding: "4px 24px 12px" }}>
          <label
            htmlFor="docs-search"
            style={{
              display: "block",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-ink-muted)",
              marginBottom: 8
            }}
          >
            Search docs
          </label>
          <input
            id="docs-search"
            type="search"
            placeholder="Filter pages..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            style={{
              width: "100%",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              padding: "8px 10px",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              color: "var(--color-ink)",
              background: "var(--color-surface)"
            }}
          />
        </div>
        {visibleSections.length === 0 && (
          <p
            style={{
              padding: "0 24px 8px",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              color: "var(--color-ink-muted)"
            }}
          >
            No matching docs pages.
          </p>
        )}
        {visibleSections.map((section, sectionIndex) => (
          <div key={section.label}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-ink-muted)",
                padding: sectionIndex === 0 ? "8px 24px 8px" : "16px 24px 8px"
              }}
            >
              {section.label}
            </p>
            <div>
              {section.items.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    className="le-doc-item"
                    href={item.href}
                    style={{
                      display: "block",
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      color: active ? "var(--color-primary)" : "var(--color-ink-tertiary)",
                      padding: "6px 24px",
                      borderLeft: active
                        ? "2px solid var(--color-primary)"
                        : "2px solid transparent",
                      background: active ? "var(--color-primary-glow)" : "transparent",
                      transition: "all var(--dur-fast) var(--ease-out)"
                    }}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
