import type { Metadata } from "next";
import Link from "next/link";
import { VisualSlot } from "@/components/site/VisualSlot";
import { CLOUD_START_URL, DEMO_URL, SALES_CONTACT_URL } from "@/lib/contact-routes";
import { SITE } from "@/lib/site-config";

/**
 * /product/cloud — marketing page for Boss Loops Cloud. Not to be confused
 * with the technical reference at /docs/cloud.
 *
 * Two visual slots ship as labeled placeholders (VisualSlot without `src`).
 * When Cloud screenshots become available, add them to public/screenshots/
 * and pass `src` + `alt`.
 */

const CTA = "product-cloud";

export const metadata: Metadata = {
  title: `${SITE.cloudName} · ${SITE.brandName}`,
  description:
    "The managed tier of Boss Loops — governed decision loops, multi-tenant isolation, outcome-based metering, and audit exports, operated by Better Data.",
  openGraph: {
    title: `${SITE.cloudName} · ${SITE.brandName}`,
    description:
      "Same engine as Boss Loops OSS. Better Data runs scale, isolation, upgrades, and metering.",
  },
};

export default function CloudPage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="border-b border-[var(--color-border)] px-4 py-14 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-primary)]">
            {SITE.cloudName}
          </p>
          <h1
            className="mt-3 max-w-3xl font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-4xl)] tracking-tight"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.05 }}
          >
            The managed tier. Same engine. Operated by Better Data.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-ink-secondary)]">
            Governed decision loops, multi-tenant isolation, outcome-based metering, and
            audit exports — without operating the runtime yourself.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`${DEMO_URL}?cta=${CTA}-demo`}
              target="_blank"
              rel="noopener noreferrer"
              data-ph-cta={`${CTA}-demo`}
              className="inline-flex items-center rounded-lg bg-[var(--color-primary)] px-6 py-3 font-mono text-sm text-white"
            >
              Try the demo
            </a>
            <a
              href={`${CLOUD_START_URL}?cta=${CTA}-start`}
              target="_blank"
              rel="noopener noreferrer"
              data-ph-cta={`${CTA}-start`}
              className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-6 py-3 font-mono text-sm text-[var(--color-ink-secondary)]"
            >
              Start Cloud →
            </a>
          </div>
        </div>
      </section>

      {/* ── What Cloud is ────────────────────────────────────────────── */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-primary)]">
            What Cloud is
          </p>
          <h2
            className="mt-3 font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-3xl)]"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            The managed distribution of Boss Loops OSS.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-ink-secondary)]">
            Same engine underneath. Same governance model. Same Decision Record. Better Data
            runs the multi-tenant service, the managed connectors, the audit exports, and the
            metering — so your team stays on the decision, not the runtime.
          </p>

          <VisualSlot
            label="Screenshot — Boss Loops Cloud org dashboard"
            caption="Recommended shot: the Alpine seeded organization in the live Boss Loops Cloud — decision volume, active loops, and recent Decision Records at a glance."
          />
        </div>
      </section>

      {/* ── What you get ─────────────────────────────────────────────── */}
      <section
        className="border-y border-[var(--color-border)] px-4 py-16 md:py-20"
        style={{ background: "var(--color-surface-subtle)" }}
      >
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-primary)]">
            What you get
          </p>
          <h2
            className="mt-3 max-w-3xl font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-3xl)]"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            Six things you don&apos;t operate yourself.
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Org isolation",
                body: "Multi-tenant by design. Your decisions, records, and evidence stay yours.",
              },
              {
                title: "Outcome-based metering",
                body: "Priced on governed decisions, not seats or servers. Consumption you can defend.",
              },
              {
                title: "Tamper-evident audit trail",
                body: "Append-only, hashable records. Exportable in the shape your auditors ask for.",
              },
              {
                title: "Managed connectors",
                body: "Slack, Google Docs, and the growing connector library — auth included.",
              },
              {
                title: "Capability enforcement",
                body: "What a loop, an actor, or an integration can do is enforced at runtime.",
              },
              {
                title: "Drift detection",
                body: "The Decision Record changes only through recorded events. Drift is a first-class alert.",
              },
            ].map((card) => (
              <article
                key={card.title}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
              >
                <h3
                  className="font-[var(--font-display)] text-[var(--color-ink)]"
                  style={{ fontSize: "var(--text-lg)" }}
                >
                  {card.title}
                </h3>
                <p
                  className="mt-3 text-[var(--color-ink-secondary)]"
                  style={{ fontSize: "var(--text-sm)", lineHeight: 1.65 }}
                >
                  {card.body}
                </p>
              </article>
            ))}
          </div>

          <VisualSlot
            label="Screenshot — Alpine Decision Record inside Boss Loops Cloud"
            caption="Recommended shot: the same Alpine invoice Decision Record shown elsewhere on the site, rendered inside the Cloud tenant UI — showing how reviewers see it."
          />
        </div>
      </section>

      {/* ── OSS vs Cloud ─────────────────────────────────────────────── */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-primary)]">
            OSS or Cloud
          </p>
          <h2
            className="mt-3 font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-3xl)]"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            Same engine. Two ways to run it.
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
                Self-host
              </p>
              <h3
                className="mt-2 font-[var(--font-display)] text-[var(--color-ink)]"
                style={{ fontSize: "var(--text-xl)" }}
              >
                Boss Loops OSS
              </h3>
              <p
                className="mt-3 text-[var(--color-ink-secondary)]"
                style={{ fontSize: "var(--text-sm)", lineHeight: 1.65 }}
              >
                The runtime, the guards, the actors, the evidence contract. Apache-2.0. Run it
                on your infrastructure.
              </p>
              <Link
                href="/docs/getting-started/quick-start"
                className="mt-6 inline-flex items-center font-mono text-sm text-[var(--color-primary)]"
              >
                Quick start →
              </Link>
            </article>

            <article className="rounded-xl border border-[var(--color-primary)] bg-[var(--color-primary-light)] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-primary-dark)]">
                Managed
              </p>
              <h3
                className="mt-2 font-[var(--font-display)] text-[var(--color-ink)]"
                style={{ fontSize: "var(--text-xl)" }}
              >
                {SITE.cloudName}
              </h3>
              <p
                className="mt-3 text-[var(--color-ink-secondary)]"
                style={{ fontSize: "var(--text-sm)", lineHeight: 1.65 }}
              >
                Everything above, plus managed connectors, tenancy, audit exports, and
                outcome metering. We run it. You use it.
              </p>
              <Link
                href="/pricing"
                className="mt-6 inline-flex items-center font-mono text-sm text-[var(--color-primary)]"
              >
                Pricing →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ── Buyer / builder CTA split ────────────────────────────────── */}
      <section
        className="border-t border-[var(--color-border)] px-4 py-16"
        style={{ background: "var(--color-surface-alt)" }}
      >
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-[var(--color-primary)] bg-[var(--color-primary-light)] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-primary-dark)]">
              For buyers
            </p>
            <h3
              className="mt-3 font-[var(--font-display)] text-[var(--color-ink)]"
              style={{ fontSize: "var(--text-xl)" }}
            >
              Try the demo. Or talk pricing.
            </h3>
            <p
              className="mt-3 text-[var(--color-ink-secondary)]"
              style={{ fontSize: "var(--text-sm)", lineHeight: 1.65 }}
            >
              Run the Alpine seeded scenario in the live Cloud, or design a pilot with us
              around your first governed decision.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`${DEMO_URL}?cta=${CTA}-buy-demo`}
                target="_blank"
                rel="noopener noreferrer"
                data-ph-cta={`${CTA}-buy-demo`}
                className="inline-flex items-center rounded-lg bg-[var(--color-primary)] px-6 py-3 font-mono text-sm text-white"
              >
                Try the demo
              </a>
              <a
                href={`${SALES_CONTACT_URL}&cta=${CTA}-buy-sales`}
                data-ph-cta={`${CTA}-buy-sales`}
                className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-6 py-3 font-mono text-sm text-[var(--color-ink-secondary)]"
              >
                Talk to us →
              </a>
            </div>
          </article>

          <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
              For builders
            </p>
            <h3
              className="mt-3 font-[var(--font-display)] text-[var(--color-ink)]"
              style={{ fontSize: "var(--text-xl)" }}
            >
              Explore Boss Loops OSS.
            </h3>
            <p
              className="mt-3 text-[var(--color-ink-secondary)]"
              style={{ fontSize: "var(--text-sm)", lineHeight: 1.65 }}
            >
              Same engine underneath. Prove the loop on your machine before you graduate to
              Cloud, or run OSS in production forever.
            </p>
            <Link
              href={`/docs/getting-started/quick-start?cta=${CTA}-oss`}
              data-ph-cta={`${CTA}-oss`}
              className="mt-6 inline-flex items-center rounded-lg border border-[var(--color-border)] px-6 py-3 font-mono text-sm text-[var(--color-ink-secondary)]"
            >
              OSS quick start →
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
