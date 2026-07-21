import Link from "next/link";
import { Fragment } from "react";
import { ExternalLink } from "lucide-react";
import type { CSSProperties } from "react";
import {
  BETTER_DATA_ECOSYSTEM,
  BETTER_DATA_LEGAL_FOOTER_LINKS,
  BETTER_DATA_SUPPORT_FOOTER,
} from "@betterdata/site-links";
import { BetterDataFooterSocialIcons } from "@betterdata/site-links/social-icons";
import { BossLoopLogo } from "@/components/logo";
import { CONTACT_PAGE, SALES_CONTACT_URL } from "@/lib/contact-routes";
import { LEGACY } from "@/lib/site-config";

type FooterLink = { label: string; href: string; external?: boolean };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Request a demo", href: CONTACT_PAGE, external: true },
      { label: "Pricing", href: "/pricing" },
      { label: "Boss Loops Cloud", href: "/product/cloud" },
      { label: "Evidence Providers", href: "/docs/concepts/evidence-providers" },
      { label: "Partners", href: "/partners" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Use cases", href: "/use-cases" },
      { label: "Operations leaders", href: "/made-for/operations" },
      { label: "Risk & stewardship", href: "/made-for/compliance" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Examples", href: "/docs/examples" },
      { label: "Packages", href: "/docs/packages" },
      { label: "Loop catalog", href: "/catalog" },
      { label: "GitHub", href: LEGACY.github, external: true },
      { label: "npm", href: LEGACY.npmOrg, external: true },
      { label: "Contributing", href: "/docs/governance/contributing" },
      { label: "RFC process", href: "/docs/governance/rfc-process" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: LEGACY.blogTag, external: true },
      { label: BETTER_DATA_SUPPORT_FOOTER.label, href: BETTER_DATA_SUPPORT_FOOTER.href, external: true },
      { label: "Trust Center", href: BETTER_DATA_ECOSYSTEM.trustCenter, external: true },
      { label: "Changelog", href: LEGACY.githubReleases, external: true },
      { label: "Issues", href: LEGACY.githubIssues, external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: CONTACT_PAGE },
      { label: "Talk to sales", href: SALES_CONTACT_URL, external: true },
      { label: "Better Data", href: BETTER_DATA_ECOSYSTEM.marketingSite, external: true },
      { label: "Platform docs", href: BETTER_DATA_ECOSYSTEM.docsBrowse, external: true },
      { label: "Commerce Gateway", href: "https://commercegateway.io", external: true },
      { label: "Commerce Chain", href: "https://commercechain.io", external: true },
      { label: "Signal Tags", href: "https://tagd.sh", external: true },
      { label: "Security", href: "mailto:security@betterdata.co", external: true },
    ],
  },
];

const headingStyle: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: "var(--text-sm)",
  color: "var(--color-code-text)",
  marginBottom: 14,
};

const linkStyle: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "var(--text-sm)",
  color: "var(--color-ink-muted)",
  textDecoration: "none",
  display: "block",
  marginBottom: 10,
  transition: "color var(--dur-fast) var(--ease-out)",
};

function FooterLinkItem({ link }: { link: FooterLink }) {
  if (link.external) {
    return (
      <a
        href={link.href}
        rel="noopener"
        target="_blank"
        style={linkStyle}
        className="group inline-flex items-center gap-1 hover:!text-[var(--color-primary-mid)]"
      >
        <span>{link.label}</span>
        <ExternalLink aria-hidden size={11} style={{ opacity: 0.45 }} />
      </a>
    );
  }
  return (
    <Link href={link.href} style={linkStyle} className="hover:!text-[var(--color-primary-mid)]">
      {link.label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-ink)",
        color: "var(--color-ink-muted)",
        padding: "56px var(--space-8) 24px",
      }}
    >
      <div className="mx-auto grid w-full max-w-[var(--max-width-full)] gap-10 md:grid-cols-[220px_1fr]">
        <div>
          <BossLoopLogo size="sm" theme="dark" />
          <p
            style={{
              marginTop: 14,
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              lineHeight: 1.6,
              color: "var(--color-ink-muted)",
              maxWidth: 200,
            }}
          >
            The system of record for decisions.
          </p>
          <BetterDataFooterSocialIcons
            navClassName="mt-5 flex flex-wrap items-center gap-1"
            linkClassName="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--color-ink-muted)] transition-colors hover:bg-[var(--color-surface-dark-alt)] hover:text-[var(--color-primary-mid)]"
          />
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p style={headingStyle}>{col.title}</p>
              {col.links.map((link) => (
                <FooterLinkItem key={link.label} link={link} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div
        className="mx-auto mt-12 flex w-full max-w-[var(--max-width-full)] flex-col items-center gap-3 border-t pt-6 sm:flex-row sm:justify-between"
        style={{
          borderColor: "var(--color-surface-dark-alt)",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-xs)",
          color: "var(--color-ink-muted)",
        }}
      >
        <p className="text-center sm:text-left">
          Apache-2.0 · Boss Loops is a{" "}
          <a
            href={BETTER_DATA_ECOSYSTEM.marketingSite}
            rel="noopener noreferrer"
            target="_blank"
            className="hover:text-[var(--color-primary-mid)]"
            style={{ color: "var(--color-ink-muted)" }}
          >
            Better Data
          </a>{" "}
          product · © Boss Loops Contributors
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <Link
            href="/docs/governance/license"
            className="hover:text-[var(--color-primary-mid)]"
            style={{ color: "var(--color-ink-muted)", textDecoration: "none" }}
          >
            Trademark policy
          </Link>
          {BETTER_DATA_LEGAL_FOOTER_LINKS.map((item) => (
            <Fragment key={item.href}>
              <a
                className="hover:text-[var(--color-primary-mid)]"
                href={item.href}
                rel="noopener noreferrer"
                style={{ color: "var(--color-ink-muted)", textDecoration: "none" }}
                target="_blank"
              >
                {item.label}
              </a>
            </Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
}
