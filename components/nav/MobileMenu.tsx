"use client";

import Link from "next/link";
import type { RefObject } from "react";
import { useEffect, useRef } from "react";
import { docsSections } from "./docs-nav";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

const topLinks = [
  { label: "Docs", href: "/docs" },
  { label: "Examples", href: "/docs/examples" },
  { label: "Packages", href: "/docs/packages" },
  { label: "GitHub", href: "https://github.com/loopengine/loop-engine", external: true }
];

export function MobileMenu({ open, onClose, triggerRef }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      triggerRef.current?.focus();
      return;
    }
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    if (panel) {
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      focusables[0]?.focus();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const root = panelRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (event.shiftKey && active === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, triggerRef]);

  return (
    <div
      aria-hidden={!open}
      className="fixed inset-0 z-[120] lg:hidden"
      onClick={onClose}
      style={{
        background: "rgba(10, 15, 30, 0.6)",
        backdropFilter: "blur(4px)",
        visibility: open ? "visible" : "hidden",
        opacity: open ? 1 : 0,
        transition: "opacity 300ms var(--ease-out), visibility 300ms var(--ease-out)"
      }}
    >
      <div
        id="mobile-menu-panel"
        ref={panelRef}
        tabIndex={-1}
        className="h-full w-[280px] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
        style={{
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 300ms var(--ease-out)",
          background: "var(--color-surface)",
          borderRight: "1px solid var(--color-border)"
        }}
      >
        <div className="px-6 py-6">
          <div className="mb-6 space-y-2">
            {topLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  rel="noreferrer"
                  target="_blank"
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-xs)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--color-ink-tertiary)"
                  }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-xs)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--color-ink-tertiary)"
                  }}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {docsSections.map((section) => (
            <div key={section.label} className="mb-6">
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-muted)",
                  marginBottom: 8
                }}
              >
                {section.label}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    style={{
                      display: "block",
                      fontSize: "var(--text-sm)",
                      color: "var(--color-ink-tertiary)"
                    }}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
