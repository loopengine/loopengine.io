import { ContactIntentCard } from "@/components/site/ContactIntentCard";
import { DEMO_URL, SALES_CONTACT_URL } from "@/lib/contact-routes";
import { LEGACY } from "@/lib/site-config";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Try the Alpine demo, talk to our team about early access, or dive into the open core docs and GitHub community.",
};

const CARDS = [
  {
    title: "Try the product",
    description:
      "Walk through Alpine Manufacturing in the Decision Operations workspace — approve a supplier invoice, review the Decision Record, and reset the demo cycle. No signup required.",
    ctaLabel: "Open demo.bossloops.io",
    href: DEMO_URL,
    external: true,
  },
  {
    title: "Sales & pilots",
    description:
      "Early access for Starter, Team, and Enterprise tiers — design partner conversations, volume pricing, and hosted Cloud pilots.",
    ctaLabel: "Talk to sales",
    href: SALES_CONTACT_URL,
    external: true,
  },
  {
    title: "Developers",
    description:
      "Open core engine, quick start, packages, and runnable examples. Apache-2.0 — inspect and verify governance in the engine.",
    ctaLabel: "Self-host quick start",
    href: "/docs/getting-started/quick-start",
    external: false,
  },
  {
    title: "Questions & OSS",
    description:
      "Search the docs, open a GitHub issue, read the contributing guide, or follow the RFC process for proposed changes.",
    ctaLabel: "Browse documentation",
    href: "/docs",
    external: false,
  },
] as const;

export default function ContactPage() {
  return (
    <main>
      <section
        style={{
          background: "linear-gradient(180deg, var(--color-surface-alt) 0%, var(--color-surface) 100%)",
          borderBottom: "1px solid var(--color-border)",
          padding: "72px 0 64px",
        }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <h1 style={{ fontSize: "clamp(var(--text-3xl), 5vw, var(--text-4xl))", letterSpacing: "-0.02em" }}>
            How can we help?
          </h1>
          <p style={{ marginTop: 12, maxWidth: 640, color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
            Try the live product, talk to our team, or dive into the docs — pick the path that matches where you are.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {CARDS.map((card) => (
              <ContactIntentCard key={card.title} {...card} />
            ))}
          </div>

          <p
            style={{
              marginTop: 32,
              fontSize: "var(--text-sm)",
              color: "var(--color-ink-muted)",
              lineHeight: 1.65,
            }}
          >
            OSS community:{" "}
            <a href={LEGACY.githubIssues} style={{ color: "var(--color-primary)" }}>
              GitHub issues
            </a>
            {" · "}
            Security:{" "}
            <a href="mailto:security@betterdata.co" style={{ color: "var(--color-primary)" }}>
              security@betterdata.co
            </a>
            {" · "}
            <Link href="https://betterdata.co/trust" style={{ color: "var(--color-primary)" }}>
              Trust Center
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
