"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { LoopEngineLogo } from "@/components/logo";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { label: "Docs", href: "/docs" },
  { label: "Examples", href: "/docs/examples" },
  { label: "Packages", href: "/docs/packages" }
];

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <header
        className="sticky top-0 z-[100]"
        style={{
          height: 56,
          backdropFilter: "blur(12px) saturate(180%)",
          background: "color-mix(in srgb, var(--color-surface) 92%, transparent)",
          borderBottom: "1px solid var(--color-border)"
        }}
      >
        <div className="mx-auto flex h-full w-full max-w-[var(--max-width-full)] items-center justify-between px-4 md:px-6 lg:px-8">
          <Link href="/" aria-label="Loop Engine home">
            <LoopEngineLogo size="sm" />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  className="le-nav-link"
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-xs)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: active ? "var(--color-primary)" : "var(--color-ink-tertiary)",
                    transition: "color var(--dur-fast) var(--ease-out)"
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              className="le-nav-link"
              href="https://github.com/loopengine/loop-engine"
              rel="noreferrer"
              target="_blank"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--color-ink-tertiary)",
                transition: "color var(--dur-fast) var(--ease-out)"
              }}
            >
              GitHub
            </a>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <span
              className="hidden lg:inline-flex"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                border: "1px solid var(--color-primary-mid)",
                color: "var(--color-primary)",
                borderRadius: "999px",
                padding: "4px 10px"
              }}
            >
              @loop-engine/sdk v0.1.0
            </span>
            <Link
              href="/docs/getting-started/quick-start"
              className="le-cta-button hidden md:inline-flex"
              style={{
                background: "var(--color-primary)",
                color: "#fff",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                padding: "6px 14px",
                borderRadius: "var(--radius-sm)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                transition: "all var(--dur-fast) var(--ease-out)"
              }}
            >
              Get started
            </Link>
            <button
              ref={menuButtonRef}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-controls="mobile-menu-panel"
              className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] lg:hidden"
              onClick={() => setOpen((prev) => !prev)}
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-ink)",
                background: "transparent"
              }}
              type="button"
            >
              <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} triggerRef={menuButtonRef} />
    </>
  );
}
