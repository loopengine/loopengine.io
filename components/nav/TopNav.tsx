"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { BossLoopLogo } from "@/components/logo";
import { CONTACT_PAGE, DEMO_URL } from "@/lib/contact-routes";
import { LEGACY } from "@/lib/site-config";
import { inferPageType } from "@/lib/analytics/posthog";
import { trackOutboundClicked, trackCtaClicked } from "@/lib/analytics/events";
import { DOCS_SEARCH_OPEN_EVENT } from "@/lib/docs-search-events";

type MenuLink = {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
  /** Small freshness chip, e.g. "New" or "Preview". */
  badge?: string;
};

type NavMenu = {
  label: string;
  /** Route prefixes that mark this trigger as active. */
  matchPrefixes: string[];
  /** Two-column panel for longer menus. */
  columns?: 1 | 2;
  links: MenuLink[];
};

const MENUS: NavMenu[] = [
  {
    label: "Product",
    matchPrefixes: ["/product"],
    columns: 2,
    links: [
      {
        label: "Overview",
        href: "/product",
        description: "The Decision Operations workspace — governed decision intelligence.",
      },
      {
        label: "Reuse, don't rebuild",
        href: "/product/reuse-dont-rebuild",
        description: "Consume the semantics you already own — no ontology project.",
        badge: "Core",
      },
      {
        label: "How it works",
        href: "/product/how-it-works",
        description: "Loops, actors, guards, signals — in plain English.",
      },
      {
        label: "The Decision Record",
        href: "/#governed-decision",
        description: "One auditable artifact behind every consequential decision.",
      },
      {
        label: "Evidence Providers",
        href: "/docs/concepts/evidence-providers",
        description: "Looker, Snowflake, and Samsara evidence — frozen at capture.",
        badge: "New",
      },
      {
        label: "Boss Loops Cloud",
        href: "/docs/cloud",
        description: "The hosted tier — managed runtime, tenancy, audit exports.",
      },
    ],
  },
  {
    label: "Solutions",
    matchPrefixes: ["/use-cases", "/made-for"],
    links: [
      {
        label: "Use cases overview",
        href: "/use-cases",
        description: "Where decision loops pay off first.",
      },
      {
        label: "For finance",
        href: "/made-for/finance",
        description: "Invoice approval, pricing, spend, vendor risk, forecast.",
      },
      {
        label: "For operations",
        href: "/made-for/operations",
        description: "Incidents, change, exceptions, dispatch, capacity.",
      },
      {
        label: "Risk & stewardship",
        href: "/made-for/compliance",
        description: "Audit-ready decisions, enforced by the engine.",
      },
      {
        label: "Who it's for",
        href: "/made-for",
        description: "All segments Boss Loops is built for.",
      },
    ],
  },
  {
    label: "Resources",
    matchPrefixes: ["/docs", "/catalog", "/partners", "/contact"],
    columns: 2,
    links: [
      {
        label: "Documentation",
        href: "/docs",
        description: "Guides, concepts, and reference.",
      },
      {
        label: "Examples",
        href: "/docs/examples",
        description: "Runnable loops you can copy.",
      },
      {
        label: "Loop catalog",
        href: "/catalog",
        description: "Browse ready-made decision loops.",
      },
      {
        label: "Partners",
        href: "/partners",
        description: "Model Providers, Evidence Providers, channels, integrations.",
      },
      {
        label: "Changelog",
        href: LEGACY.githubReleases,
        description: "Release notes on GitHub.",
        external: true,
      },
      {
        label: "Contact",
        href: CONTACT_PAGE,
        description: "Talk to the team.",
      },
    ],
  },
];

type FlatItem = { label: string; href: string; matchPrefix: string; external?: boolean };

const FLAT_ITEMS: FlatItem[] = [
  { label: "Pricing", href: "/pricing", matchPrefix: "/pricing" },
];

function navLinkClass(active: boolean): string {
  return active
    ? "font-medium text-[var(--color-primary)] underline underline-offset-4"
    : "text-[var(--color-ink-secondary)] underline-offset-4 transition-colors hover:text-[var(--color-ink)] hover:underline";
}

function isMenuActive(pathname: string, menu: NavMenu): boolean {
  return menu.matchPrefixes.some((prefix) => pathname.startsWith(prefix));
}

function MenuPanelLink({
  link,
  onNavigate,
}: {
  link: MenuLink;
  onNavigate: () => void;
}) {
  const inner = (
    <>
      <span className="flex items-center gap-1.5 font-medium text-[var(--color-ink)] text-sm">
        {link.label}
        {link.badge ? (
          <span
            style={{
              borderRadius: 999,
              padding: "1px 7px",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              background: "var(--color-primary-light)",
              color: "var(--color-primary-dark)",
            }}
          >
            {link.badge}
          </span>
        ) : null}
        {link.external ? (
          <ExternalLink aria-hidden size={11} style={{ opacity: 0.45 }} />
        ) : null}
      </span>
      {link.description ? (
        <span className="mt-0.5 block text-[var(--color-ink-tertiary)] text-xs leading-snug">
          {link.description}
        </span>
      ) : null}
    </>
  );
  const className =
    "block rounded-md px-3 py-2 transition-colors hover:bg-[var(--color-surface-alt)]";

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className} onClick={onNavigate}>
      {inner}
    </Link>
  );
}

function NavDropdown({
  menu,
  pathname,
  open,
  onOpen,
  onClose,
  onToggle,
}: {
  menu: NavMenu;
  pathname: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}) {
  const triggerActive = isMenuActive(pathname, menu);

  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={() => {
        if (open) onClose();
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className={`inline-flex items-center gap-1 ${
          triggerActive
            ? "font-medium text-[var(--color-primary)]"
            : open
              ? "text-[var(--color-ink)]"
              : "text-[var(--color-ink-secondary)] transition-colors hover:text-[var(--color-ink)]"
        }`}
      >
        {menu.label}
        <ChevronDown
          aria-hidden
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <div className="absolute left-1/2 top-full z-30 -translate-x-1/2 pt-3">
          <div
            className={`rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-2 shadow-lg ${
              menu.columns === 2 ? "grid w-[32rem] grid-cols-2 gap-x-2" : "w-72"
            }`}
          >
            {menu.links.map((link) => (
              <MenuPanelLink key={link.label} link={link} onNavigate={onClose} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function TopNav() {
  const pathname = usePathname();
  const pageType = inferPageType(pathname);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!activeDropdown) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveDropdown(null);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [activeDropdown]);

  const closeDropdown = () => setActiveDropdown(null);

  const openDocsSearch = () => {
    window.dispatchEvent(
      new CustomEvent(DOCS_SEARCH_OPEN_EVENT, { detail: { source: "header" as const } }),
    );
  };

  return (
    <header className="border-[var(--color-border)] border-b bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" aria-label="Boss Loops home">
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

        <nav ref={navRef} className="hidden items-center gap-5 text-sm md:flex">
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
          {MENUS.map((menu) => (
            <NavDropdown
              key={menu.label}
              menu={menu}
              pathname={pathname}
              open={activeDropdown === menu.label}
              onOpen={() => setActiveDropdown(menu.label)}
              onClose={closeDropdown}
              onToggle={() =>
                setActiveDropdown(activeDropdown === menu.label ? null : menu.label)
              }
            />
          ))}
          {FLAT_ITEMS.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                data-ph-cta="try_demo"
                onClick={() =>
                  trackOutboundClicked({
                    label: "try_demo",
                    destination: item.href,
                    location: "top_nav_desktop",
                    pageType,
                  })
                }
                className={navLinkClass(false)}
              >
                {item.label}
              </a>
            ) : (
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
                className={navLinkClass(pathname.startsWith(item.matchPrefix))}
              >
                {item.label}
              </Link>
            ),
          )}
          <a
            className="text-[var(--color-ink-secondary)] transition-colors hover:text-[var(--color-ink)]"
            href={LEGACY.cloudUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-ph-cta="sign_in"
            onClick={() =>
              trackOutboundClicked({
                label: "sign_in",
                destination: LEGACY.cloudUrl,
                location: "top_nav_desktop",
                pageType,
              })
            }
          >
            Sign in
          </a>
          <a
            className="rounded bg-[var(--color-primary)] px-3 py-1.5 font-medium text-white transition-opacity hover:opacity-90"
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ph-cta="try_demo"
            onClick={() =>
              trackOutboundClicked({
                label: "try_demo",
                destination: DEMO_URL,
                location: "top_nav_desktop",
                pageType,
              })
            }
          >
            Try demo
          </a>
        </nav>

        <details className="md:hidden">
          <summary className="cursor-pointer rounded border border-[var(--color-border)] px-3 py-1.5 text-[var(--color-ink-secondary)] text-sm">
            Menu
          </summary>
          <div className="absolute right-4 z-20 mt-2 max-h-[calc(100vh-6rem)] w-64 overflow-y-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-md">
            <div className="flex flex-col gap-2 text-sm">
              {MENUS.map((menu) => (
                <div key={menu.label} className="flex flex-col gap-2">
                  <p className="mt-1 font-semibold text-[10px] text-[var(--color-ink-muted)] uppercase tracking-[0.08em]">
                    {menu.label}
                  </p>
                  {menu.links.map((link) =>
                    link.external ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[var(--color-ink-secondary)] underline-offset-4 transition-colors hover:text-[var(--color-ink)] hover:underline"
                      >
                        {link.label}
                        <ExternalLink aria-hidden size={11} style={{ opacity: 0.45 }} />
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-[var(--color-ink-secondary)] underline-offset-4 transition-colors hover:text-[var(--color-ink)] hover:underline"
                      >
                        {link.label}
                      </Link>
                    ),
                  )}
                </div>
              ))}
              <div className="mt-1 flex flex-col gap-2 border-[var(--color-border)] border-t pt-3">
                {FLAT_ITEMS.map((item) =>
                  item.external ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={navLinkClass(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
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
                      className={navLinkClass(pathname.startsWith(item.matchPrefix))}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </div>
              <a
                className="rounded border border-[var(--color-border)] px-2 py-1.5 text-center font-medium text-[var(--color-ink)]"
                href={LEGACY.cloudUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-ph-cta="sign_in"
                onClick={() =>
                  trackOutboundClicked({
                    label: "sign_in",
                    destination: LEGACY.cloudUrl,
                    location: "top_nav_mobile",
                    pageType,
                  })
                }
              >
                Sign in
              </a>
              <a
                className="rounded bg-[var(--color-primary)] px-2 py-1.5 text-center font-medium text-white"
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ph-cta="try_demo"
                onClick={() =>
                  trackOutboundClicked({
                    label: "try_demo",
                    destination: DEMO_URL,
                    location: "top_nav_mobile",
                    pageType,
                  })
                }
              >
                Try demo
              </a>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
