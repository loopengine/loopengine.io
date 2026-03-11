"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsSections } from "./docs-nav";

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DocsSidebar() {
  const pathname = usePathname();

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
        {docsSections.map((section, sectionIndex) => (
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
