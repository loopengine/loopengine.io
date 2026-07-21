import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

type ContactIntentCardProps = {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  external?: boolean;
  icon?: ReactNode;
};

export function ContactIntentCard({
  title,
  description,
  ctaLabel,
  href,
  external,
  icon,
}: ContactIntentCardProps) {
  const ctaStyle = {
    display: "inline-flex" as const,
    alignItems: "center" as const,
    gap: 6,
    marginTop: 16,
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    fontSize: "var(--text-sm)",
    color: "var(--color-primary)",
    textDecoration: "none" as const,
  };

  return (
    <article
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        background: "var(--color-surface)",
        padding: "28px 24px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {icon ? <div style={{ marginBottom: 12 }}>{icon}</div> : null}
      <h2 style={{ fontSize: "var(--text-lg)" }}>{title}</h2>
      <p
        style={{
          marginTop: 10,
          flex: 1,
          fontSize: "var(--text-sm)",
          color: "var(--color-ink-tertiary)",
          lineHeight: 1.65,
        }}
      >
        {description}
      </p>
      {external ? (
        <a href={href} rel="noopener noreferrer" target="_blank" style={ctaStyle}>
          {ctaLabel}
          <ExternalLink aria-hidden size={14} />
        </a>
      ) : (
        <Link href={href} style={ctaStyle}>
          {ctaLabel}
        </Link>
      )}
    </article>
  );
}
