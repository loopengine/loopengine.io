"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BossLoopLogo } from "@/components/logo";
import { inferPageType } from "@/lib/analytics/posthog";
import { trackOutboundClicked, trackCtaClicked } from "@/lib/analytics/events";
import { DOCS_SEARCH_OPEN_EVENT } from "@/lib/docs-search-events";

type NavItem = {
  label: string;
  href: string;
  matchPrefix?: string;
};

const navItems: NavItem[] = [
  { label: "Docs", href: "/docs", matchPrefix: "/docs" },
  { label: "Made for", href: "/made-for", matchPrefix: "/made-for" },
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
  const pageType = inferPageType(pathname);

  const openDocsSearch = () => {
    window.dispatchEvent(
      new CustomEvent(DOCS_SEARCH_OPEN_EVENT, { detail: { source: "header" as const } }),
    );
  };

  return (
    <header className="border-[var(--color-border)] border-b bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" aria-label="Boss home">
          <BossLoopLogo size="sm" />
        </Link>

        {pathname.startsWith("/docs") ? (
          <button
            type="button"
            className="rounded border border-[var(--color-border)] px-2.5 py-1 text-xs text-[var(--color-ink-secondary)] hover:bg-[var(--color-surface-alt)] md:hidden"
            onClick={openDocsSearch}
          >
            Search
          </button>
        ) : null}

        <nav className="hidden items-center gap-5 text-sm md:flex">
          {pathname.startsWith("/docs") ? (
            <button
              type="button"
              className="rounded border border-[var(--color-border)] px-2.5 py-1 text-sm text-[var(--color-ink-secondary)] hover:bg-[var(--color-surface-alt)]"
              onClick={openDocsSearch}
            >
              Search{" "}
              <span className="font-mono text-[10px] text-[var(--color-ink-muted)]">⌘K</span>
            </button>
          ) : null}
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              data-ph-cta={item.href === "/docs" ? "view_docs" : undefined}
              onClick={
                item.href === "/docs"
                  ? () =>
                      trackCtaClicked({
                        cta: "view_docs",
                        location: "top_nav_desktop",
                        destination: item.href,
                        pageType,
                      })
                  : undefined
              }
              className={navLinkClass(isItemActive(pathname, item))}
            >
              {item.label}
            </Link>
          ))}
          <a
            className="text-[var(--color-ink-secondary)] underline-offset-4 transition-colors hover:text-[var(--color-ink)] hover:underline"
            href="https://betterdata.co/blog/tags/loop-engine"
            target="_blank"
            rel="noopener noreferrer"
            data-ph-cta="read_blog"
            onClick={() =>
              trackOutboundClicked({
                label: "blog",
                destination: "https://betterdata.co/blog/tags/loop-engine",
                location: "top_nav_desktop",
                pageType,
              })
            }
          >
            Blog
          </a>
          <a
            className="text-[var(--color-ink-secondary)] underline-offset-4 transition-colors hover:text-[var(--color-ink)] hover:underline"
            href="https://github.com/loopengine/loop-engine/releases"
            target="_blank"
            rel="noopener noreferrer"
            data-ph-cta="releases"
            onClick={() =>
              trackOutboundClicked({
                label: "releases",
                destination: "https://github.com/loopengine/loop-engine/releases",
                location: "top_nav_desktop",
                pageType,
              })
            }
          >
            Releases
          </a>
          <a
            className="text-[var(--color-ink-secondary)] underline-offset-4 transition-colors hover:text-[var(--color-ink)] hover:underline"
            href="https://betterdata.co/changelog?module=loop-engine"
            target="_blank"
            rel="noopener noreferrer"
            data-ph-cta="read_changelog"
            onClick={() =>
              trackOutboundClicked({
                label: "changelog",
                destination: "https://betterdata.co/changelog?module=loop-engine",
                location: "top_nav_desktop",
                pageType,
              })
            }
          >
            Changelog
          </a>
          <a
            className="rounded border border-[var(--color-border)] px-3 py-1.5 font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface-alt)]"
            href="https://github.com/loopengine/loop-engine"
            target="_blank"
            rel="noopener noreferrer"
            data-ph-cta="github"
            onClick={() =>
              trackOutboundClicked({
                label: "github",
                destination: "https://github.com/loopengine/loop-engine",
                location: "top_nav_desktop",
                pageType,
              })
            }
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
                <Link
                  key={item.label}
                  href={item.href}
                  data-ph-cta={item.href === "/docs" ? "view_docs" : undefined}
                  onClick={
                    item.href === "/docs"
                      ? () =>
                          trackCtaClicked({
                            cta: "view_docs",
                            location: "top_nav_mobile",
                            destination: item.href,
                            pageType,
                          })
                      : undefined
                  }
                  className={navLinkClass(isItemActive(pathname, item))}
                >
                  {item.label}
                </Link>
              ))}
              <a
                className="text-[var(--color-ink-secondary)] underline-offset-4 transition-colors hover:text-[var(--color-ink)] hover:underline"
                href="https://betterdata.co/blog/tags/loop-engine"
                target="_blank"
                rel="noopener noreferrer"
                data-ph-cta="read_blog"
                onClick={() =>
                  trackOutboundClicked({
                    label: "blog",
                    destination: "https://betterdata.co/blog/tags/loop-engine",
                    location: "top_nav_mobile",
                    pageType,
                  })
                }
              >
                Blog
              </a>
              <a
                className="text-[var(--color-ink-secondary)] underline-offset-4 transition-colors hover:text-[var(--color-ink)] hover:underline"
                href="https://github.com/loopengine/loop-engine/releases"
                target="_blank"
                rel="noopener noreferrer"
                data-ph-cta="releases"
                onClick={() =>
                  trackOutboundClicked({
                    label: "releases",
                    destination: "https://github.com/loopengine/loop-engine/releases",
                    location: "top_nav_mobile",
                    pageType,
                  })
                }
              >
                Releases
              </a>
              <a
                className="text-[var(--color-ink-secondary)] underline-offset-4 transition-colors hover:text-[var(--color-ink)] hover:underline"
                href="https://betterdata.co/changelog?module=loop-engine"
                target="_blank"
                rel="noopener noreferrer"
                data-ph-cta="read_changelog"
                onClick={() =>
                  trackOutboundClicked({
                    label: "changelog",
                    destination: "https://betterdata.co/changelog?module=loop-engine",
                    location: "top_nav_mobile",
                    pageType,
                  })
                }
              >
                Changelog
              </a>
              <a
                className="rounded border border-[var(--color-border)] px-2 py-1.5 text-center font-medium text-[var(--color-ink)]"
                href="https://github.com/loopengine/loop-engine"
                target="_blank"
                rel="noopener noreferrer"
                data-ph-cta="github"
                onClick={() =>
                  trackOutboundClicked({
                    label: "github",
                    destination: "https://github.com/loopengine/loop-engine",
                    location: "top_nav_mobile",
                    pageType,
                  })
                }
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
