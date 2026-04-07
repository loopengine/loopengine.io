import Link from "next/link";

type IntegrationStatus = "certified" | "featured" | "built-in" | "community" | "coming-soon" | "rc-draft";

type IntegrationCardProps = {
  name: string;
  subtext: string;
  status: IntegrationStatus;
  logoPath?: string;
  href: string;
};

const statusLabel: Record<IntegrationStatus, string> = {
  certified: "✓ Certified",
  featured: "★ Featured Partner",
  "built-in": "Built-in",
  community: "Community",
  "coming-soon": "Coming Soon",
  "rc-draft": "RC: Draft"
};

export function IntegrationCard({ name, subtext, status, logoPath, href }: IntegrationCardProps) {
  return (
    <Link className="docs-integration-card" href={href}>
      <div className="docs-integration-head">
        <div className="docs-integration-title-wrap">
          {logoPath ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="docs-integration-logo" src={logoPath} alt={`${name} logo`} />
          ) : null}
          <p className="docs-integration-name">{name}</p>
        </div>
        <span className={`docs-status-badge status-${status}`}>{statusLabel[status]}</span>
      </div>
      <p className="docs-integration-subtext">{subtext}</p>
    </Link>
  );
}
