import { aiProviderPartners, ecosystemPartners, featuredPartner, type Partner } from "@/lib/partners";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Partners - Loop Engine",
  description: "Loop Engine integration partners, certified adapters, and the Loop Engine partner program.",
  robots: { index: false, follow: false },
};

function Badge({ children, tone = "neutral" }: { children: string; tone?: "neutral" | "blue" }) {
  const className =
    tone === "blue"
      ? "bg-[var(--color-primary-light)] text-[var(--color-primary-dark)]"
      : "bg-[var(--color-surface-alt)] text-[var(--color-ink-tertiary)]";
  return <span className={`rounded-full px-2 py-1 font-mono text-[10px] uppercase tracking-wide ${className}`}>{children}</span>;
}

function PartnerCard({ partner, showCertified = true }: { partner: Partner; showCertified?: boolean }) {
  const showCertBadge = showCertified && partner.certificationStatus === "certified";
  const showInReviewBadge = showCertified && partner.certificationStatus === "in-review";
  const showCommunityBadge = showCertified && partner.certificationStatus === "community";
  return (
    <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="relative h-8 w-28">
          <Image src={partner.logoPath} alt={`${partner.name} logo`} fill className="object-contain object-left" />
        </div>
        <div className="flex flex-shrink-0 flex-wrap items-center justify-end gap-1.5">
          {partner.marketingBadge ? <Badge tone="blue">{partner.marketingBadge}</Badge> : null}
          {showCertBadge ? <Badge tone="blue">Certified</Badge> : null}
          {showInReviewBadge ? <Badge>In review</Badge> : null}
          {showCommunityBadge ? <Badge>Community</Badge> : null}
        </div>
      </div>
      <h3 className="font-semibold text-[var(--color-ink)] text-lg">{partner.name}</h3>
      <p className="mt-2 text-[var(--color-ink-secondary)] text-sm leading-6">{partner.description}</p>
      {partner.adapterPackage ? (
        <p className="mt-3 inline-block rounded border border-[var(--color-border)] px-2 py-1 font-mono text-[11px] text-[var(--color-ink-tertiary)]">
          {partner.adapterPackage}
        </p>
      ) : null}
      {partner.installCommand ? (
        <p className="mt-2 font-mono text-[11px] text-[var(--color-ink-muted)]">{partner.installCommand}</p>
      ) : null}
      <p className="mt-4">
        <Link href={partner.docsPath} className="text-[var(--color-primary)] text-sm underline underline-offset-4">
          View docs →
        </Link>
      </p>
    </article>
  );
}

export default function PartnersPage() {
  return (
    <main className="px-4 py-12">
      <section className="mx-auto max-w-6xl">
        <h1 className="font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-4xl)]">Partners</h1>
        <p className="mt-3 max-w-3xl text-[var(--color-ink-secondary)] text-base">
          Certified integrations, ecosystem partners, and the Loop Engine partner program.
        </p>
      </section>

      <section className="mx-auto mt-10 max-w-6xl rounded-xl border border-[var(--color-primary)] bg-[var(--color-primary-light)] p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <Badge tone="blue">Featured Partner</Badge>
            <div className="relative mt-3 h-10 w-36">
              <Image src={featuredPartner.logoPath} alt={`${featuredPartner.name} logo`} fill className="object-contain object-left" />
            </div>
            <p className="mt-3 max-w-3xl text-[var(--color-ink-secondary)]">{featuredPartner.description}</p>
          </div>
          <Badge tone="blue">✓ Loop Engine Certified</Badge>
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link href={featuredPartner.docsPath} className="text-[var(--color-primary-dark)] underline underline-offset-4">
            View integration docs →
          </Link>
          <a
            href={featuredPartner.externalUrl}
            className="text-[var(--color-primary-dark)] underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit openclaw.ai →
          </a>
          <a
            href="https://clawhub.ai/betterdataco/loop-engine-governance"
            className="text-[var(--color-primary-dark)] underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenClaw skill on ClawHub →
          </a>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl">
        <h2 className="font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-2xl)]">Adapters</h2>
        <p className="mt-3 max-w-3xl text-[var(--color-ink-secondary)] text-sm leading-6">
          Governed LLM actors, grounded retrieval with citations, and incident routing. Provider adapters share the same governance
          model; Sonar covers research-heavy steps; PagerDuty carries approvals and escalations into your on-call surface.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {aiProviderPartners.map((partner) => (
            <PartnerCard key={partner.slug} partner={partner} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl">
        <h2 className="font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-2xl)]">Ecosystem</h2>
        <p className="mt-3 max-w-3xl text-[var(--color-ink-secondary)] text-sm leading-6">
          Tools and platforms that work alongside Loop Engine.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {ecosystemPartners.map((partner) => (
            <PartnerCard key={partner.slug} partner={partner} showCertified={false} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 grid max-w-6xl gap-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:grid-cols-2">
        <div>
          <h2 className="font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-2xl)]">Loop Engine Certification</h2>
          <p className="mt-3 text-[var(--color-ink-secondary)] text-sm leading-7">
            A certified adapter has been tested against the full <code>@loop-engine/guards</code> and <code>@loop-engine/actors</code>{" "}
            test suite. Certified adapters guarantee:
          </p>
          <ul className="mt-4 space-y-2 text-[var(--color-ink-secondary)] text-sm">
            <li>✓ Correct AIAgentActor shape</li>
            <li>✓ Correct evidence attachment</li>
            <li>✓ Correct ActorDecisionError codes</li>
            <li>✓ Async Web Crypto promptHash</li>
            <li>✓ No guard bypass</li>
          </ul>
        </div>
        <aside className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-5">
          <h3 className="font-semibold text-[var(--color-ink)]">Building an integration?</h3>
          <p className="mt-2 text-[var(--color-ink-secondary)] text-sm">Submit your adapter for certification.</p>
          <a className="mt-4 inline-block text-[var(--color-primary)] underline underline-offset-4" href="mailto:oss@betterdata.co">
            Apply for certification →
          </a>
        </aside>
      </section>

      <section className="mx-auto mt-12 max-w-6xl rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h2 className="font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-2xl)]">Partner Program</h2>
        <p className="mt-3 max-w-3xl text-[var(--color-ink-secondary)] text-sm leading-7">
          The Loop Engine partner program is for companies building on or alongside Loop Engine in production. Partners get early
          access to the roadmap, co-marketing opportunities, and direct access to the core team.
        </p>
        <a className="mt-4 inline-block text-[var(--color-primary)] underline underline-offset-4" href="mailto:partners@betterdata.co">
          Become a partner →
        </a>
      </section>
    </main>
  );
}
