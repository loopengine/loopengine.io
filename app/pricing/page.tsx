import { LEGACY, SITE } from "@/lib/site-config";
import { DEMO_URL, salesContactForTier } from "@/lib/contact-routes";
import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";

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
      "Evidence frozen at capture, with recorded provenance",
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
      label: "Request early access",
      href: salesContactForTier("starter"),
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
      href: salesContactForTier("team"),
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
      label: "Request a pilot",
      href: salesContactForTier("enterprise"),
      external: true,
      primary: true
    }
  }
];

type TableRow = { feature: string; values: [string, string, string, string] };

const COMPARISON_ROWS: { group: string; rows: TableRow[] }[] = [
  {
    group: "Governance — never paywalled",
    rows: [
      { feature: "Governed decision loops & Decision Records", values: ["✓", "✓", "✓", "✓"] },
      { feature: "Enforced invariants (frozen evidence, provenance)", values: ["✓", "✓", "✓", "✓"] },
      { feature: "Evidence contracts + conformance suite", values: ["✓", "✓", "✓", "✓"] },
      { feature: "Complete audit trail & replay", values: ["✓", "✓", "✓", "✓"] }
    ]
  },
  {
    group: "Runtime & workspace",
    rows: [
      { feature: "Self-hosted (your infrastructure)", values: ["✓", "—", "—", "Deployment options"] },
      { feature: "Hosted runtime — managed auth, caching, monitoring", values: ["—", "✓", "✓", "✓"] },
      { feature: "Teams & decision loops", values: ["Unlimited (self-run)", "One team", "Multiple", "Organization-wide"] },
      { feature: "Decision Operations workspace (Attention, evidence)", values: ["—", "—", "✓", "✓"] }
    ]
  },
  {
    group: "Providers & intelligence",
    rows: [
      { feature: "Reference Evidence Providers (verify locally)", values: ["✓", "—", "—", "—"] },
      { feature: "Production Evidence Providers (as they ship; Looker preview)", values: ["—", "—", "✓", "✓"] },
      { feature: "Learning & recommendations", values: ["—", "—", "✓", "✓"] }
    ]
  },
  {
    group: "Enterprise controls",
    rows: [
      { feature: "SSO & granular permissions", values: ["—", "—", "—", "✓"] },
      { feature: "Curated policy packs (early access)", values: ["—", "—", "—", "✓"] },
      { feature: "Audit export & retention controls", values: ["—", "—", "—", "✓"] },
      { feature: "Support", values: ["Community", "Email", "Priority", "SLA"] }
    ]
  }
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What's actually open source?",
    a: "The Boss Loops engine, the evidence contracts, and the conformance suite — Apache-2.0, forever. The governance invariants are enforced in the open engine, not behind a paywall. What's commercial is the hosted experience: production Evidence Providers, curated policy packs, and the Decision Operations workspace."
  },
  {
    q: "Can I verify the governance claims myself?",
    a: "Yes — that's the point of the open core. The conformance suite is an executable artifact: self-host the engine, run the suite, and prove the invariants hold. “Every evidence source in this decision conformed to the contract” is a statement an auditor can check, not a marketing claim."
  },
  {
    q: "What's the difference between Boss Loops OSS and Boss Loops Cloud?",
    a: "Same engine, same governance model. OSS you run yourself — free, with reference providers to verify against. Cloud adds the managed runtime (auth, tenancy, monitoring), production Evidence Providers as they ship, the Decision Operations workspace, and audit exports."
  },
  {
    q: "How is Boss Loops Cloud priced?",
    a: "Outcome-based metering — pricing follows loop completions, not seats. Launch packaging is being finalized; every commercial tier is in early access this month, so talk to us and we'll scope the right starting point."
  },
  {
    q: "Do you replace our ERP, CRM, or BI?",
    a: "No. Your systems stay authoritative for what they hold — the invoice stays in the ERP, the metric stays in the warehouse. Boss Loops consumes the semantics they already contain as evidence, and becomes the system of record for one thing they were never built to hold: the decision."
  },
  {
    q: "Where does our data live?",
    a: "Your source systems remain the systems of record for your business data. Boss Loops stores the Decision Records and the frozen evidence snapshots that make each decision defensible — with references back to every source."
  },
  {
    q: "Is there a free way to start?",
    a: "Two ways: the OSS engine is free forever, and you can create a Boss Loops Cloud organization in seconds with no payment to explore the hosted experience."
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

      <section style={{ background: "var(--color-surface-subtle)", borderTop: "1px solid var(--color-border)", padding: "32px 0" }}>
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <article
            className="flex flex-col gap-4 rounded-xl border p-6 md:flex-row md:items-center md:justify-between"
            style={{ borderColor: "var(--color-primary-mid)", background: "var(--color-primary-light)" }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-primary-dark)",
                }}
              >
                Try before you buy
              </p>
              <p style={{ marginTop: 8, maxWidth: 560, fontSize: "var(--text-sm)", color: "var(--color-ink-secondary)", lineHeight: 1.65 }}>
                Walk through Alpine Manufacturing on{" "}
                <strong style={{ color: "var(--color-ink)" }}>demo.bossloops.io</strong> — approve a supplier invoice,
                review the Decision Record, no signup required.
              </p>
            </div>
            <a
              href={DEMO_URL}
              rel="noopener noreferrer"
              target="_blank"
              style={{
                display: "inline-flex",
                flexShrink: 0,
                background: "var(--color-primary)",
                color: "#fff",
                borderRadius: "var(--radius-sm)",
                padding: "11px 22px",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "var(--text-sm)",
                textDecoration: "none",
              }}
            >
              Try the demo
            </a>
          </article>
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

      {/* Feature comparison */}
      <section
        style={{ background: "var(--color-surface-subtle)", borderTop: "1px solid var(--color-border)", padding: "64px 0" }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <h2>Compare tiers</h2>
          <div className="mt-8 overflow-x-auto">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--text-sm)" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--color-ink-muted)", fontWeight: 600 }} />
                  {["Open Core", "Starter", "Team", "Enterprise"].map((tier) => (
                    <th
                      key={tier}
                      style={{
                        textAlign: "center",
                        padding: "10px 12px",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 600,
                        color: tier === "Team" ? "var(--color-primary-dark)" : "var(--color-ink)",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {tier}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((group) => (
                  <Fragment key={group.group}>
                    <tr>
                      <td
                        colSpan={5}
                        style={{
                          padding: "18px 12px 8px",
                          fontFamily: "var(--font-sans)",
                          fontWeight: 600,
                          fontSize: "var(--text-xs)",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "var(--color-ink-muted)"
                        }}
                      >
                        {group.group}
                      </td>
                    </tr>
                    {group.rows.map((row) => (
                      <tr key={row.feature} style={{ borderTop: "1px solid var(--color-border)" }}>
                        <td style={{ padding: "10px 12px", color: "var(--color-ink-secondary)", minWidth: 260 }}>
                          {row.feature}
                        </td>
                        {row.values.map((value, i) => (
                          <td
                            key={`${row.feature}-${i}`}
                            style={{
                              padding: "10px 12px",
                              textAlign: "center",
                              color: value === "—" ? "var(--color-ink-muted)" : "var(--color-ink)",
                              background: i === 2 ? "color-mix(in srgb, var(--color-primary-light) 40%, transparent)" : undefined
                            }}
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)", padding: "64px 0 76px" }}>
        <div className="mx-auto w-full max-w-[860px] px-6 md:px-10">
          <h2>Questions, answered</h2>
          <div className="mt-6 space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-surface)",
                  padding: "14px 18px"
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    color: "var(--color-ink)"
                  }}
                >
                  {faq.q}
                </summary>
                <p style={{ marginTop: 10, fontSize: "var(--text-sm)", color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
          <p style={{ marginTop: 24, fontSize: "var(--text-sm)", color: "var(--color-ink-muted)" }}>
            Something we didn&apos;t answer?{" "}
            <a href={salesContactForTier("pricing")} style={{ color: "var(--color-primary)" }}>
              Ask us directly →
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
