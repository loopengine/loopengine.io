import Link from "next/link";

type IntegrationTier = "official" | "community";
type IntegrationLifecycleStatus = "experimental" | "rc" | "stable" | "deprecated";
type IntegrationAttribute = "featured" | "built-in";

type IntegrationCardProps = {
  name: string;
  subtext: string;
  tier?: IntegrationTier;
  status?: IntegrationLifecycleStatus;
  attributes?: IntegrationAttribute[];
  logoPath?: string;
  href: string;
};

function badgeLabel({
  tier,
  status,
  attributes,
}: {
  tier?: IntegrationTier;
  status?: IntegrationLifecycleStatus;
  attributes?: IntegrationAttribute[];
}): string {
  if (attributes?.includes("featured")) return "★ Featured";
  if (attributes?.includes("built-in")) return "Built-in";
  if (tier === "community") return "Community";
  if (tier === "official" && status === "rc") return "Official · RC";
  if (tier === "official" && status === "stable") return "Official · Stable";
  if (tier === "official" && status === "experimental") return "Official · Experimental";
  if (tier === "official" && status === "deprecated") return "Deprecated";
  return "Official";
}

function badgeClassName({
  tier,
  status,
  attributes,
}: {
  tier?: IntegrationTier;
  status?: IntegrationLifecycleStatus;
  attributes?: IntegrationAttribute[];
}): string {
  const classes = ["docs-status-badge"];
  if (tier) classes.push(`tier-${tier}`);
  if (status) classes.push(`status-${status}`);
  (attributes ?? []).forEach((attr) => classes.push(`attr-${attr}`));
  return classes.join(" ");
}

export function IntegrationCard({ name, subtext, tier, status, attributes, logoPath, href }: IntegrationCardProps) {
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
        <span className={badgeClassName({ tier, status, attributes })}>{badgeLabel({ tier, status, attributes })}</span>
      </div>
      <p className="docs-integration-subtext">{subtext}</p>
    </Link>
  );
}
