"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  matchPrefix?: string;
};

const navItems: NavItem[] = [
  { label: "Docs", href: "/docs", matchPrefix: "/docs" },
  { label: "Examples", href: "/#example-scm" },
  {
    label: "Packages",
    href: "/docs/loop-library/supply-chain",
    matchPrefix: "/docs/loop-library",
  },
  { label: "Blog", href: "/blog", matchPrefix: "/blog" },
  { label: "Partners", href: "/partners", matchPrefix: "/partners" },
  { label: "Registry", href: "/registry", matchPrefix: "/registry" },
];

function isItemActive(pathname: string, item: NavItem): boolean {
  if (item.matchPrefix) {
    return pathname.startsWith(item.matchPrefix);
  }
  return pathname === item.href;
}

function navLinkClass(active: boolean): string {
  return active
    ? "font-medium text-[var(--color-primary)] underline underline-offset-4"
    : "text-[var(--color-ink-secondary)] underline-offset-4 transition-colors hover:text-[var(--color-ink)] hover:underline";
}

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="border-[var(--color-border)] border-b bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="font-semibold text-[var(--color-ink)] text-lg">
          Loop Engine
        </Link>

        <nav className="hidden items-center gap-5 text-sm md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={navLinkClass(isItemActive(pathname, item))}>
              {item.label}
            </Link>
          ))}
          <a
            className="rounded border border-[var(--color-border)] px-3 py-1.5 font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface-alt)]"
            href="https://github.com/loopengine/loop-engine"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </nav>

        <details className="md:hidden">
          <summary className="cursor-pointer rounded border border-[var(--color-border)] px-3 py-1.5 text-[var(--color-ink-secondary)] text-sm">
            Menu
          </summary>
          <div className="absolute right-4 z-20 mt-2 w-56 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-md">
            <div className="flex flex-col gap-2 text-sm">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} className={navLinkClass(isItemActive(pathname, item))}>
                  {item.label}
                </Link>
              ))}
              <a
                className="rounded border border-[var(--color-border)] px-2 py-1.5 text-center font-medium text-[var(--color-ink)]"
                href="https://github.com/loopengine/loop-engine"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
