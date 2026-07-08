import { LEGACY, SITE } from "@/lib/site-config";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Boss Loops is open core — the engine is free and Apache-2.0. Boss Loops Cloud ships in Starter, Team, and Enterprise tiers. Launch pricing is being finalized — talk to us for early access.",
};

type Tier = {
  name: string;
  price: string;
  tagline: string;
  bullets: string[];
  cta: { label: string; href: string; external?: boolean; primary?: boolean };
  secondaryCta?: { label: string; href: string; external?: boolean };
};

const TIERS: Tier[] = [
  {
    name: "Open Core",
    price: "Free",
    tagline: "The governed engine, yours to run. Apache-2.0, forever.",
    bullets: [
      "The Boss Loops engine, contracts, and conformance suite",
      "Governed decision loops with enforced invariants",
      "Evidence frozen at capture; approvals bound to evidence",
      "Reference Evidence Providers for local verification",
      "Self-host on your stack — community support"
    ],
    cta: { label: "View on GitHub", href: LEGACY.github, external: true },
    secondaryCta: { label: "Self-host quick start →", href: "/docs/getting-started/quick-start" }
  },
  {
    name: "Starter",
    price: "Talk to us",
    tagline: "Your first governed decision loop, in production.",
    bullets: [
      "Hosted runtime — managed auth, caching, and monitoring",
      "Decision Records with a complete audit trail",
      "Approvals and human oversight for one team",
      "Email support"
    ],
    cta: {
      label: "Talk to us",
      href: "mailto:partners@betterdata.co?subject=Boss%20Loops%20Starter%20%E2%80%94%20early%20access",
      external: true,
      primary: true
    }
  },
  {
    name: "Team",
    price: "Talk to us",
    tagline: "Scale across adjacent operational decisions.",
    bullets: [
      "Everything in Starter",
      "Multiple decision loops across teams",
      "Decision Operations workspace — Attention queue, approvals, evidence",
      "Production Evidence Providers as they ship (Looker preview today)",
      "Learning and recommendations from measured outcomes",
      "Priority support"
    ],
    cta: {
      label: "Talk to us",
      href: "mailto:partners@betterdata.co?subject=Boss%20Loops%20Team%20%E2%80%94%20early%20access",
      external: true,
      primary: true
    }
  },
  {
    name: "Enterprise",
    price: "Talk to us",
    tagline: "Defensibility at organizational scale.",
    bullets: [
      "Everything in Team",
      "SSO and granular permissions",
      "Curated policy packs for regulated workflows (early access)",
      "Audit export and retention controls",
      "Deployment options and support SLAs"
    ],
    cta: {
      label: "Talk to us",
      href: "mailto:partners@betterdata.co?subject=Boss%20Loops%20Enterprise%20%E2%80%94%20early%20access",
      external: true,
      primary: true
    }
  }
];

export default function PricingPage() {
  return (
    <main>
      <section
        style={{
          background: "linear-gradient(180deg, var(--color-surface-alt) 0%, var(--color-surface) 100%)",
          borderBottom: "1px solid var(--color-border)",
          padding: "72px 0 56px"
        }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "var(--text-xs)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-primary)"
            }}
          >
            Pricing
          </p>
          <h1 className="mt-3" style={{ fontSize: "clamp(var(--text-2xl), 4vw, var(--text-4xl))", letterSpacing: "-0.02em" }}>
            Open core. Pay for providers, policy, and experience — never for governance.
          </h1>
          <p style={{ marginTop: 14, maxWidth: 760, color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
            The {SITE.productName} engine, evidence contracts, and conformance suite are free and Apache-2.0 — the
            governance guarantees hold in the open engine, verifiable by anyone. {SITE.cloudName} adds the hosted
            experience: production Evidence Providers, curated policy, and the Decision Operations workspace.
          </p>
          <p
            style={{
              marginTop: 12,
              maxWidth: 760,
              fontSize: "var(--text-sm)",
              color: "var(--color-ink-muted)",
              lineHeight: 1.65
            }}
          >
            Launch pricing is being finalized — all commercial tiers are in early access this month. Talk to us and
            we&apos;ll scope the right starting point.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--color-surface)", padding: "56px 0 72px" }}>
        <div className="mx-auto grid w-full max-w-[1200px] gap-5 px-6 md:grid-cols-2 md:px-10 xl:grid-cols-4">
          {TIERS.map((tier) => (
            <article
              key={tier.name}
              style={{
                border: tier.name === "Team" ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                background: "var(--color-surface)",
                padding: "26px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 12
              }}
            >
              <div>
                <h2 style={{ fontSize: "var(--text-lg)" }}>{tier.name}</h2>
                <p style={{ marginTop: 6, fontSize: "var(--text-xl)", fontWeight: 600, color: "var(--color-ink)" }}>
                  {tier.price}
                </p>
                <p style={{ marginTop: 8, fontSize: "var(--text-sm)", color: "var(--color-ink-tertiary)", lineHeight: 1.6 }}>
                  {tier.tagline}
                </p>
              </div>
              <ul className="space-y-2" style={{ flex: 1 }}>
                {tier.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span style={{ color: "var(--color-primary)" }} aria-hidden>
                      ·
                    </span>
                    <span style={{ fontSize: "var(--text-sm)", color: "var(--color-ink-secondary)", lineHeight: 1.55 }}>
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2">
                <a
                  href={tier.cta.href}
                  {...(tier.cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center justify-center"
                  style={{
                    background: tier.cta.primary ? "var(--color-primary)" : "transparent",
                    color: tier.cta.primary ? "#fff" : "var(--color-ink)",
                    border: tier.cta.primary ? "none" : "1px solid var(--color-border)",
                    borderRadius: "var(--radius-sm)",
                    padding: "10px 18px",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "var(--text-sm)"
                  }}
                >
                  {tier.cta.label}
                </a>
                {tier.secondaryCta ? (
                  <Link
                    href={tier.secondaryCta.href}
                    className="text-center"
                    style={{ color: "var(--color-primary)", fontSize: "var(--text-sm)" }}
                  >
                    {tier.secondaryCta.label}
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <p
            style={{
              marginTop: 28,
              maxWidth: 860,
              fontSize: "var(--text-sm)",
              color: "var(--color-ink-muted)",
              lineHeight: 1.7
            }}
          >
            The open-core line is a commitment, not a tier boundary we move later: policy execution, evidence
            contracts, and conformance stay open; policy content, production providers, and the managed experience are
            what you pay for. Compare distributions on the{" "}
            <Link href="/docs/concepts/evidence-providers" style={{ color: "var(--color-primary)" }}>
              Evidence Providers
            </Link>{" "}
            page, or inspect the engine on{" "}
            <a href={LEGACY.github} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)" }}>
              GitHub
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
