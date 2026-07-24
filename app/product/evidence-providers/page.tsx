import type { Metadata } from "next";
import Link from "next/link";
import { VisualSlot } from "@/components/site/VisualSlot";
import { SALES_CONTACT_URL } from "@/lib/contact-routes";
import { SITE } from "@/lib/site-config";

/**
 * /product/evidence-providers — marketing page for the Evidence Providers
 * concept. Not to be confused with the technical reference at
 * /docs/concepts/evidence-providers.
 *
 * Two visual slots ship as labeled placeholders (VisualSlot without `src`).
 * When screenshots become available, add them to public/screenshots/ and
 * pass `src` + `alt` — no other change needed.
 */

const CTA = "product-evidence-providers";

export const metadata: Metadata = {
  title: `Evidence Providers · ${SITE.brandName}`,
  description:
    "How Looker, Snowflake, and Samsara attach governed evidence to the Decision Record — frozen at capture, with qualification inherited from the source.",
  openGraph: {
    title: `Evidence Providers · ${SITE.brandName}`,
    description:
      "The number, the definition, the source — frozen at the moment the decision was made.",
  },
};

export default function EvidenceProvidersPage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="border-b border-[var(--color-border)] px-4 py-14 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-primary)]">
            Evidence Providers
          </p>
          <h1
            className="mt-3 max-w-3xl font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-4xl)] tracking-tight"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.05 }}
          >
            The number, the definition, the source — frozen at the moment the decision was made.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-ink-secondary)]">
            Your semantic layer, your fleet telemetry, your governed sources — attached to the
            Decision Record and preserved exactly as they were used. Not a link that may have
            changed since.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={`/product/decision-record?cta=${CTA}`}
              data-ph-cta={CTA}
              className="inline-flex items-center rounded-lg bg-[var(--color-primary)] px-6 py-3 font-mono text-sm text-white"
            >
              See a governed decision
            </Link>
          </div>
        </div>
      </section>

      {/* ── What an Evidence Provider is ─────────────────────────────── */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-primary)]">
            What it is
          </p>
          <h2
            className="mt-3 font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-3xl)]"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            Not intelligence. Not execution. Evidence.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-ink-secondary)]">
            An Evidence Provider supplies one thing: what was true, from a governed source, at
            the moment it informed the decision — frozen into a snapshot the Decision Record
            carries forever. Semantic evidence (Snowflake, Looker) and operational evidence
            (Samsara) are the two archetypes.
          </p>

          <VisualSlot
            label="Screenshot — Alpine Decision Record with Looker evidence attached"
            caption="Recommended shot: the Alpine invoice Decision Record with the Looker semantic evidence row expanded — value, source definition, freshness, and provenance visible."
          />
        </div>
      </section>

      {/* ── Three properties ─────────────────────────────────────────── */}
      <section
        className="border-y border-[var(--color-border)] px-4 py-16 md:py-20"
        style={{ background: "var(--color-surface-subtle)" }}
      >
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-primary)]">
            Three properties
          </p>
          <h2
            className="mt-3 max-w-3xl font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-3xl)]"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            What makes this different from linking to a dashboard.
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Frozen at capture",
                body: "The record holds the value, definition, source, and timestamp as they were when the decision was made. The vendor UI stays live. The record does not.",
              },
              {
                title: "Qualification inherited",
                body: "How governed the definition is, how attestable its provenance, how fresh the reading — from the source's own mapping. Never asserted by the loop.",
              },
              {
                title: "Conformance verifiable",
                body: "The provider contract and conformance suite are open. An auditor can check that every evidence source in a decision conformed to the contract.",
              },
            ].map((card) => (
              <article
                key={card.title}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
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
        </div>
      </section>

      {/* ── Today ────────────────────────────────────────────────────── */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-primary)]">
            Today
          </p>
          <h2
            className="mt-3 font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-3xl)]"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            Three providers, one contract.
          </h2>
          <ul className="mt-8 space-y-4">
            {[
              {
                badge: "Preview",
                name: "Looker",
                body: "Certified metric definitions travel with the decision. The Alpine invoice record carries vendor spend vs. a 12-month band as a preview snapshot — definition, value, and qualification frozen on the record.",
              },
              {
                badge: "Planned",
                name: "Snowflake",
                body: "Governed semantic views — the definition layer many finance and ops teams already run — attached at capture with qualification inherited.",
              },
              {
                badge: "Planned",
                name: "Samsara",
                body: "Operational readings from fleet and field at decision time. The reading that opened the loop is the reading on the record.",
              },
            ].map((row) => (
              <li
                key={row.name}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      border: "1px solid var(--color-border)",
                      borderRadius: 999,
                      padding: "3px 10px",
                      color:
                        row.badge === "Preview"
                          ? "var(--color-primary)"
                          : "var(--color-ink-muted)",
                    }}
                  >
                    {row.badge}
                  </span>
                  <h3
                    className="font-[var(--font-display)] text-[var(--color-ink)]"
                    style={{ fontSize: "var(--text-lg)" }}
                  >
                    {row.name}
                  </h3>
                </div>
                <p
                  className="mt-3 text-[var(--color-ink-secondary)]"
                  style={{ fontSize: "var(--text-sm)", lineHeight: 1.65 }}
                >
                  {row.body}
                </p>
              </li>
            ))}
          </ul>

          <VisualSlot
            label="Diagram or screenshot — evidence flow: governed source → freeze → Decision Record"
            caption="Recommended: a small SVG diagram (or Alpine screenshot) showing Looker/Snowflake/Samsara on the left, the freeze moment in the middle, and the Decision Record on the right with the evidence row rendered."
          />
        </div>
      </section>

      {/* ── Buyer CTA ────────────────────────────────────────────────── */}
      <section
        className="border-t border-[var(--color-border)] px-4 py-16"
        style={{ background: "var(--color-surface-alt)" }}
      >
        <div className="mx-auto max-w-2xl">
          <article className="rounded-xl border border-[var(--color-primary)] bg-[var(--color-primary-light)] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-primary-dark)]">
              For finance and ops leaders
            </p>
            <h3
              className="mt-3 font-[var(--font-display)] text-[var(--color-ink)]"
              style={{ fontSize: "var(--text-xl)" }}
            >
              Attach your semantic layer to your first decision.
            </h3>
            <p
              className="mt-3 text-[var(--color-ink-secondary)]"
              style={{ fontSize: "var(--text-sm)", lineHeight: 1.65 }}
            >
              Pick a decision where the answer to &quot;which number, as of when?&quot; matters.
              We wire the provider and show you the record.
            </p>
            <a
              href={`${SALES_CONTACT_URL}&cta=${CTA}-pilot`}
              data-ph-cta={`${CTA}-pilot`}
              className="mt-6 inline-flex items-center rounded-lg bg-[var(--color-primary)] px-6 py-3 font-mono text-sm text-white"
            >
              Design a pilot →
            </a>
          </article>
        </div>
      </section>
    </main>
  );
}
