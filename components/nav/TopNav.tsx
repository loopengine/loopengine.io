"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LoopEngineLogo } from "@/components/logo";

type NavItem = {
  label: string;
  href: string;
  matchPrefix?: string;
};

const navItems: NavItem[] = [
  { label: "Docs", href: "/docs", matchPrefix: "/docs" },
  { label: "Examples", href: "/docs/examples", matchPrefix: "/docs/examples" },
  { label: "Packages", href: "/docs/packages", matchPrefix: "/docs/packages" },
  { label: "Use cases", href: "/use-cases", matchPrefix: "/use-cases" },
  { label: "Partners", href: "/partners", matchPrefix: "/partners" },
  { label: "Catalog", href: "/catalog", matchPrefix: "/catalog" },
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
        <Link href="/" aria-label="Loop Engine home">
          <LoopEngineLogo size="sm" />
        </Link>

        <nav className="hidden items-center gap-5 text-sm md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={navLinkClass(isItemActive(pathname, item))}>
              {item.label}
            </Link>
          ))}
          <a
            className="text-[var(--color-ink-secondary)] underline-offset-4 transition-colors hover:text-[var(--color-ink)] hover:underline"
            href="https://betterdata.co/blog/tags/loop-engine"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </a>
          <a
            className="text-[var(--color-ink-secondary)] underline-offset-4 transition-colors hover:text-[var(--color-ink)] hover:underline"
            href="https://github.com/loopengine/loop-engine/releases"
            target="_blank"
            rel="noopener noreferrer"
          >
            Releases
          </a>
          <a
            className="text-[var(--color-ink-secondary)] underline-offset-4 transition-colors hover:text-[var(--color-ink)] hover:underline"
            href="https://betterdata.co/changelog?module=loop-engine"
            target="_blank"
            rel="noopener noreferrer"
          >
            Changelog
          </a>
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
                className="text-[var(--color-ink-secondary)] underline-offset-4 transition-colors hover:text-[var(--color-ink)] hover:underline"
                href="https://betterdata.co/blog/tags/loop-engine"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blog
              </a>
              <a
                className="text-[var(--color-ink-secondary)] underline-offset-4 transition-colors hover:text-[var(--color-ink)] hover:underline"
                href="https://github.com/loopengine/loop-engine/releases"
                target="_blank"
                rel="noopener noreferrer"
              >
                Releases
              </a>
              <a
                className="text-[var(--color-ink-secondary)] underline-offset-4 transition-colors hover:text-[var(--color-ink)] hover:underline"
                href="https://betterdata.co/changelog?module=loop-engine"
                target="_blank"
                rel="noopener noreferrer"
              >
                Changelog
              </a>
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
