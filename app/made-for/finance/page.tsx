import type { Metadata } from "next";
import Link from "next/link";
import { DecisionRecordDiagram } from "@/components/site/DecisionRecordDiagram";
import { VisualSlot } from "@/components/site/VisualSlot";
import { SALES_CONTACT_URL } from "@/lib/contact-routes";
import { SITE } from "@/lib/site-config";

/**
 * Made For / Finance — the first decision-led Made-For page.
 *
 * Anchored on the Alpine invoice-approval scenario per the Pass 1 direction.
 * Uses a dedicated route so the buyer narrative can be led by the decision
 * itself, not by a persona feature list. Overrides the generic
 * `/made-for/[segment]/page.tsx` template for the `finance` slug.
 */

const CTA = "boss-nav-madeFor-finance-v1";

export const metadata: Metadata = {
  title: `${SITE.productName} for finance`,
  description:
    "For finance teams responsible for decisions that must move quickly and remain defensible — invoice approval, pricing, spend, vendor risk, and forecast.",
  openGraph: {
    title: `${SITE.productName} for finance · Governed Decision Intelligence`,
    description:
      "One invoice. Every fact that made it defensible. The governed decision record every finance team will eventually be asked for.",
  },
};

export default function MadeForFinancePage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="border-b border-[var(--color-border)] px-4 py-14 md:py-20">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/made-for"
            className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-ink-muted)] hover:text-[var(--color-primary)]"
          >
            ← Made for
          </Link>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-primary)]">
            For finance
          </p>
          <h1
            className="mt-3 max-w-3xl font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-4xl)] tracking-tight"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.05 }}
          >
            For finance teams responsible for decisions that must move quickly and remain defensible.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-ink-secondary)]">
            Every approval, override, and forecast is one auditor question away from being your
            problem. Move fast. Keep the record.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={`/#governed-decision?cta=${CTA}`}
              data-ph-cta={CTA}
              className="inline-flex items-center rounded-lg bg-[var(--color-primary)] px-6 py-3 font-mono text-sm text-white"
            >
              See a governed decision
            </Link>
            <a
              href={`${SALES_CONTACT_URL}&cta=${CTA}-talk`}
              data-ph-cta={`${CTA}-talk`}
              className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-6 py-3 font-mono text-sm text-[var(--color-ink-secondary)]"
            >
              Design a pilot →
            </a>
          </div>
        </div>
      </section>

      {/* ── The invoice decision, walked through ─────────────────────── */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-primary)]">
            One decision
          </p>
          <h2
            className="mt-3 font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-3xl)]"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            Every fact that made it defensible.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-ink-secondary)]">
            An invoice enters the queue. What happens next is a record being assembled.
          </p>

          <ol className="mt-10 space-y-4">
            {[
              { title: "The invoice enters", body: "Vendor, amount, PO reference. No decision yet." },
              { title: "Semantic evidence is frozen", body: "Looker returns budget variance, category spend, and vendor tenure at the moment the record opens." },
              { title: "Provenance is attached", body: "NetSuite change history, PO match, and the buying-team Slack thread are linked as source-of-truth references." },
              { title: "Authority is explicit", body: "The Approval Matrix determines who signs — by amount, category, and vendor tier." },
              { title: "AI recommends. Human decides.", body: "The recommendation carries its confidence and the exact prompt. The approver reads the record, not a chat." },
              { title: "The Decision Record remains", body: "Committed and queryable by policy, amount, approver, or any source in its evidence chain." },
            ].map((step, idx) => (
              <li
                key={step.title}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
                style={{ display: "grid", gridTemplateColumns: "36px 1fr", gap: 16 }}
              >
                <span
                  aria-hidden
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    background: "var(--color-surface-alt)",
                    color: "var(--color-primary)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                  }}
                >
                  {idx + 1}
                </span>
                <div>
                  <h3
                    className="font-[var(--font-display)] text-[var(--color-ink)]"
                    style={{ fontSize: "var(--text-lg)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-2 text-[var(--color-ink-secondary)]"
                    style={{ fontSize: "var(--text-sm)", lineHeight: 1.65 }}
                  >
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Alpine proof surface ─────────────────────────────────────── */}
      <section
        className="border-y border-[var(--color-border)] px-4 py-16 md:py-20"
        style={{ background: "var(--color-surface-subtle)" }}
        id="record"
      >
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-primary)]">
            The record
          </p>
          <h2
            className="mt-3 font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-3xl)]"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            A finance decision, fully assembled.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-ink-secondary)]">
            The invoice above — as it lives in Boss Loops after approval. Every field
            here was captured at the moment of decision. Nothing is reconstructed later
            from logs.
          </p>

          <VisualSlot
            label="Alpine — Decision Record"
            caption="Canonical seeded scenario shown in the live Boss Loops product. Vendor, invoice number, and dollar amount are synthetic."
          >
            <DecisionRecordDiagram />
          </VisualSlot>
        </div>
      </section>

      {/* ── Beyond invoice approval ──────────────────────────────────── */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-primary)]">
            Beyond invoice approval
          </p>
          <h2
            className="mt-3 max-w-3xl font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-3xl)]"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            The same record for every finance decision that has to hold up.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-ink-secondary)]">
            Invoice approval is the cleanest starting point. The same governed record
            applies wherever a decision touches money, risk, or the ledger.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Pricing decisions",
                body: "Discount thresholds, deal desk overrides, and margin calls — each with the evidence that justified them.",
              },
              {
                title: "Spend controls",
                body: "Category caps, purchase-order gating, and out-of-policy overrides — the exception is the record, not the mystery.",
              },
              {
                title: "Vendor risk",
                body: "Renewal, tenure, and concentration decisions carry the evidence chain your risk team needs on demand.",
              },
              {
                title: "Forecast changes",
                body: "Model outputs enter the record with the inputs, the confidence, and the reviewer who accepted them.",
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
              For finance and stewardship leaders
            </p>
            <h3
              className="mt-3 font-[var(--font-display)] text-[var(--color-ink)]"
              style={{ fontSize: "var(--text-xl)" }}
            >
              Design a pilot around one of your decisions.
            </h3>
            <p
              className="mt-3 text-[var(--color-ink-secondary)]"
              style={{ fontSize: "var(--text-sm)", lineHeight: 1.65 }}
            >
              Pick the decision you least want to defend later. We wire it to your systems and show you the record it produces.
            </p>
            <a
              href={`${SALES_CONTACT_URL}&cta=${CTA}-pilot`}
              data-ph-cta={`${CTA}-pilot`}
              className="mt-6 inline-flex items-center rounded-lg bg-[var(--color-primary)] px-6 py-3 font-mono text-sm text-white"
            >
              Design a pilot →
            </a>
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
              Runtime, SDK, guards, actors — Apache-2.0. Run the record inside your infrastructure.
            </p>
            <Link
              href={`/docs/getting-started?cta=${CTA}-oss`}
              data-ph-cta={`${CTA}-oss`}
              className="mt-6 inline-flex items-center rounded-lg border border-[var(--color-border)] px-6 py-3 font-mono text-sm text-[var(--color-ink-secondary)]"
            >
              Explore Boss Loops OSS →
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
