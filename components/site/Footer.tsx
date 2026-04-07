import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { CSSProperties } from "react";
import { LoopEngineLogo } from "@/components/logo";

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
          <ExternalFooterLink href="https://www.betterdata.co/trust" label="Trust Center" style={linkStyle} />
          <ExternalFooterLink href="https://betterdata.co" label="Created by Better Data" style={linkStyle} />
          <ExternalFooterLink href="https://betterdata.co/docs" label="Platform docs" style={linkStyle} />
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
        className="mx-auto mt-8 flex w-full max-w-[var(--max-width-full)] flex-col items-center justify-between gap-3 md:flex-row"
        style={{
          borderTop: "1px solid var(--color-border)",
          paddingTop: 16,
          marginTop: 32,
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          color: "var(--color-ink-muted)"
        }}
      >
        <p>Apache-2.0 Licensed · © Loop Engine Contributors</p>
        <div className="flex items-center gap-4">
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
      <div
        className="mx-auto flex w-full max-w-[var(--max-width-full)] flex-col items-center justify-center gap-2 px-[var(--space-8)] pb-6"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          color: "var(--color-ink-muted)"
        }}
      >
        <p className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-center">
          <a
            className="hover:text-[var(--color-primary)]"
            href="https://www.betterdata.co/trust/security"
            rel="noopener noreferrer"
            style={{ color: "var(--color-ink-muted)", textDecoration: "none" }}
            target="_blank"
          >
            Security
          </a>
          <span aria-hidden className="select-none">
            {' '}
            ·{' '}
          </span>
          <a
            className="hover:text-[var(--color-primary)]"
            href="https://www.betterdata.co/privacy"
            rel="noopener noreferrer"
            style={{ color: "var(--color-ink-muted)", textDecoration: "none" }}
            target="_blank"
          >
            Privacy Policy
          </a>
          <span aria-hidden className="select-none">
            {' '}
            ·{' '}
          </span>
          <a
            className="hover:text-[var(--color-primary)]"
            href="https://www.betterdata.co/terms"
            rel="noopener noreferrer"
            style={{ color: "var(--color-ink-muted)", textDecoration: "none" }}
            target="_blank"
          >
            Terms of Service
          </a>
          <span aria-hidden className="select-none">
            {' '}
            ·{' '}
          </span>
          <a
            className="hover:text-[var(--color-primary)]"
            href="https://www.betterdata.co/cookies"
            rel="noopener noreferrer"
            style={{ color: "var(--color-ink-muted)", textDecoration: "none" }}
            target="_blank"
          >
            Cookie Notice
          </a>
          <span aria-hidden className="select-none">
            {' '}
            ·{' '}
          </span>
          <a
            className="hover:text-[var(--color-primary)]"
            href="https://www.betterdata.co/trust/open-source"
            rel="noopener noreferrer"
            style={{ color: "var(--color-ink-muted)", textDecoration: "none" }}
            target="_blank"
          >
            Open Source disclosures
          </a>
        </p>
      </div>
    </footer>
  );
}
