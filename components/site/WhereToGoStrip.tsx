import Link from "next/link";
import { CONTACT_PAGE, SALES_CONTACT_URL } from "@/lib/contact-routes";
import { LEGACY } from "@/lib/site-config";

const ROWS = [
  { label: "Request a demo", detail: "Alpine walkthrough — no signup", href: CONTACT_PAGE, external: true },
  { label: "Build OSS", detail: "Quick start + GitHub", href: "/docs/getting-started/quick-start", external: false },
  { label: "Run Cloud", detail: "Talk to us about your tenant", href: SALES_CONTACT_URL, external: true },
  { label: "Sign in", detail: "Production workspace", href: LEGACY.cloudUrl, external: true },
] as const;

export function WhereToGoStrip() {
  return (
    <div
      className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        background: "var(--color-surface-alt)",
        padding: "20px 18px",
      }}
    >
      {ROWS.map((row) => (
        <div key={row.label}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "var(--text-xs)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-ink-muted)",
            }}
          >
            {row.label}
          </p>
          {row.external ? (
            <a
              href={row.href}
              rel="noopener noreferrer"
              target="_blank"
              style={{
                display: "block",
                marginTop: 4,
                fontSize: "var(--text-sm)",
                color: "var(--color-primary)",
                textDecoration: "none",
              }}
            >
              {row.detail} →
            </a>
          ) : (
            <Link
              href={row.href}
              style={{
                display: "block",
                marginTop: 4,
                fontSize: "var(--text-sm)",
                color: "var(--color-primary)",
                textDecoration: "none",
              }}
            >
              {row.detail} →
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
