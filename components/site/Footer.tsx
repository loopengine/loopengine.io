import Link from "next/link";
import { Fragment } from "react";
import { ExternalLink } from "lucide-react";
import type { CSSProperties } from "react";
import {
  BETTER_DATA_DOCS_FOOTER_SECONDARY_LINKS,
  BETTER_DATA_ECOSYSTEM,
  BETTER_DATA_LEGAL_FOOTER_LINKS,
  BETTER_DATA_SUPPORT_FOOTER,
} from "@betterdata/site-links";
import { BetterDataFooterSocialIcons } from "@betterdata/site-links/social-icons";
import { LoopEngineLogo } from "@/components/logo";
import {
  BETTERDATA_CCO_URL,
  BETTERDATA_OPEN_INFRA_URL,
  ECOSYSTEM_STRIP,
} from "@/lib/betterdata-ecosystem";

function ExternalFooterLink({
  href,
  label,
  style
}: {
  href: string;
  label: string;
  style: CSSProperties;
}) {
  return (
    <a
      href={href}
      rel="noopener"
      style={style}
      target="_blank"
      className="group inline-flex items-center gap-1 hover:text-[var(--color-ink)]"
    >
      <span>{label}</span>
      <ExternalLink aria-hidden size={12} style={{ opacity: 0.5 }} />
    </a>
  );
}

export function Footer() {
  const headingStyle: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "var(--text-xs)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--color-ink-muted)",
    marginBottom: 16
  };

  const linkStyle: CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-sm)",
    color: "var(--color-ink-tertiary)",
    textDecoration: "none",
    display: "block",
    marginBottom: 10,
    transition: "color var(--dur-fast) var(--ease-out)"
  };

  const plainTextStyle: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "var(--text-xs)",
    color: "var(--color-ink-muted)"
  };

  return (
    <footer
      style={{
        background: "var(--color-ink)",
        color: "var(--color-ink-muted)",
        padding: "48px var(--space-8) 24px"
      }}
    >
      <div className="mx-auto w-full max-w-[var(--max-width-full)]">
        <div className="mb-6">
          <LoopEngineLogo size="sm" theme="dark" />
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-[var(--max-width-full)] gap-6 md:grid-cols-3">
        <div>
          <p style={headingStyle}>Project</p>
          <ExternalFooterLink href="https://github.com/loopengine/loop-engine" label="GitHub" style={linkStyle} />
          <ExternalFooterLink href="https://npmjs.com/org/loop-engine" label="npm" style={linkStyle} />
          <ExternalFooterLink href="https://github.com/loopengine/loop-examples" label="Examples" style={linkStyle} />
          <ExternalFooterLink
            href="https://github.com/loopengine/loop-engine/releases"
            label="Changelog"
            style={linkStyle}
          />
        </div>
        <div>
          <p style={headingStyle}>Community</p>
          <Link className="block hover:text-[var(--color-ink)]" href="/docs/governance/contributing" style={linkStyle}>
            Contributing
          </Link>
          <Link className="block hover:text-[var(--color-ink)]" href="/docs/governance/rfc-process" style={linkStyle}>
            RFC Process
          </Link>
          <ExternalFooterLink href="https://github.com/loopengine/loop-engine/issues" label="Issues" style={linkStyle} />
          <p style={{ ...plainTextStyle, marginTop: 14 }}>oss@betterdata.co</p>
        </div>
        <div>
          <p style={headingStyle}>Better Data</p>
          <ExternalFooterLink href={BETTERDATA_CCO_URL} label="Commerce Chain Optimization (hosted)" style={linkStyle} />
          <ExternalFooterLink href={BETTERDATA_OPEN_INFRA_URL} label="Open operational infrastructure hub" style={linkStyle} />
          <ExternalFooterLink href={BETTER_DATA_ECOSYSTEM.trustCenter} label="Trust Center" style={linkStyle} />
          <ExternalFooterLink href={BETTER_DATA_ECOSYSTEM.marketingSite} label="Created by Better Data" style={linkStyle} />
          <ExternalFooterLink href={BETTER_DATA_ECOSYSTEM.docsBrowse} label="Platform docs" style={linkStyle} />
          <ExternalFooterLink href="https://commercegateway.io" label="Commerce Gateway" style={linkStyle} />
          <ExternalFooterLink href="https://commercechain.io" label="Commerce Chain" style={linkStyle} />
          <ExternalFooterLink href="https://tagd.sh" label="Signal Tags" style={linkStyle} />
          <a
            href="mailto:security@betterdata.co"
            className="block hover:text-[var(--color-ink)]"
            style={{ ...linkStyle, marginTop: 14 }}
          >
            security@betterdata.co
          </a>
        </div>
      </div>
      <div
        className="mx-auto grid w-full max-w-[var(--max-width-full)] gap-4 border-t px-0 py-6 md:grid-cols-2"
        style={{ borderColor: "var(--color-border)" }}
      >
        <a
          href={BETTER_DATA_SUPPORT_FOOTER.href}
          rel="noopener noreferrer"
          target="_blank"
          className="hover:text-[var(--color-primary)]"
          style={{ ...linkStyle, marginBottom: 0 }}
        >
          {BETTER_DATA_SUPPORT_FOOTER.label}
        </a>
        <BetterDataFooterSocialIcons
          navClassName="flex flex-wrap items-center gap-2 md:justify-end"
          linkClassName="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[var(--color-ink-muted)] transition-colors hover:bg-[var(--color-surface-dark-alt)] hover:text-[var(--color-primary)]"
        />
        <div className="flex flex-wrap gap-x-4 gap-y-2 md:col-span-2">
          {BETTER_DATA_DOCS_FOOTER_SECONDARY_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              rel="noopener noreferrer"
              target="_blank"
              className="hover:text-[var(--color-primary)]"
              style={{ ...linkStyle, marginBottom: 0 }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
      <div
        className="mx-auto mt-8 w-full max-w-[var(--max-width-full)]"
        style={{
          borderTop: "1px solid var(--color-border)",
          paddingTop: 16,
          marginTop: 32,
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          color: "var(--color-ink-muted)"
        }}
      >
        <p className="mx-auto max-w-3xl text-center leading-relaxed md:text-left" style={{ marginBottom: 16 }}>
          {ECOSYSTEM_STRIP}
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center sm:text-left">Apache-2.0 Licensed · © Loop Engine Contributors</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
            <Link
              className="hover:text-[var(--color-primary)]"
              href="/docs/governance/license"
              style={{ color: "var(--color-ink-muted)", textDecoration: "none" }}
            >
              Trademark policy
            </Link>
            <a
              className="hover:text-[var(--color-primary)]"
              href="mailto:conduct@loopengine.io"
              style={{ color: "var(--color-ink-muted)", textDecoration: "none" }}
            >
              conduct@loopengine.io
            </a>
          </div>
        </div>
      </div>
      <div
        className="mx-auto flex w-full max-w-[var(--max-width-full)] flex-col items-center justify-center gap-2 px-[var(--space-8)] pb-6"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          color: "var(--color-ink-muted)"
        }}
      >
        <p className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-center">
          {BETTER_DATA_LEGAL_FOOTER_LINKS.map((item, i) => (
            <Fragment key={item.href}>
              {i > 0 ? (
                <span aria-hidden className="select-none">
                  {' '}
                  ·{' '}
                </span>
              ) : null}
              <a
                className="hover:text-[var(--color-primary)]"
                href={item.href}
                rel="noopener noreferrer"
                style={{ color: "var(--color-ink-muted)", textDecoration: "none" }}
                target="_blank"
              >
                {item.label}
              </a>
            </Fragment>
          ))}
        </p>
      </div>
    </footer>
  );
}
