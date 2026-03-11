import Link from "next/link";

type PackageCardProps = {
  name: string;
  description: string;
  href: string;
};

export function PackageCard({ name, description, href }: PackageCardProps) {
  return (
    <Link className="docs-package-card" href={href}>
      <p className="docs-package-name">{name}</p>
      <p className="docs-package-desc">{description}</p>
    </Link>
  );
}
