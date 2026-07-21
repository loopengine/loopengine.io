import type { Metadata } from "next";
import Link from "next/link";
import { DecisionRecordDiagram } from "@/components/site/DecisionRecordDiagram";
import { VisualSlot } from "@/components/site/VisualSlot";
import { SALES_CONTACT_URL } from "@/lib/contact-routes";
import { SITE } from "@/lib/site-config";

/**
 * Made For / Operations — the second decision-led Made-For page.
 *
 * Anchored on the Alpine incident-routing scenario per Pass 1's expansion
 * from Finance. Overrides the generic `/made-for/[segment]/page.tsx`
 * template for the `operations` slug.
 */

const CTA = "boss-nav-madeFor-operations-v1";

export const metadata: Metadata = {
  title: `${SITE.productName} for operations`,
  description:
    "For operations teams responsible for the decisions that keep the day moving — incident routing, change approvals, exception overrides, dispatch, and capacity.",
  openGraph: {
    title: `${SITE.productName} for operations · Governed Decision Intelligence`,
    description:
      "One incident. Every fact that shaped the escalation. The record every operations team will eventually be asked for.",
  },
};

export default function MadeForOperationsPage() {
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
            For operations
          </p>
          <h1
            className="mt-3 max-w-3xl font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-4xl)] tracking-tight"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.05 }}
          >
            For operations teams responsible for the decisions that keep the day moving.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-ink-secondary)]">
            Every incident, every exception, every override is a decision. Move fast.
            Keep the record.
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

      {/* ── The incident decision, walked through ────────────────────── */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-primary)]">
            One decision
          </p>
          <h2
            className="mt-3 font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-3xl)]"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            Every fact that shaped the escalation.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-ink-secondary)]">
            An alert fires. What happens next is not a runbook step — it&apos;s a record
            being assembled. Signal evidence from your observability layer. History from
            past incidents. The blast radius. The escalation policy. The AI recommendation.
            The responder who signed.
          </p>

          <ol className="mt-10 space-y-4">
            {[
              {
                title: "The alert arrives",
                body: "A production signal enters the queue. Nothing recorded yet — the decision hasn't been made.",
              },
              {
                title: "Signal evidence is frozen",
                body: "Latency, error rate, saturation, and traces at the moment of alert are captured onto the record. That snapshot is what the responder reviewed — not a live query that could drift by the time anyone asks.",
              },
              {
                title: "Similar-incident context is attached",
                body: "Prior occurrences, mean time to resolve, and matching runbooks are attached with confidence scores. The record shows what the responder saw.",
              },
              {
                title: "Blast radius is estimated",
                body: "Customer impact, revenue path, and dependent services are computed and stamped. The severity call is defensible in the record.",
              },
              {
                title: "Escalation is explicit",
                body: "The on-call rotation and escalation policy determine the responder — not a manual page. The policy version is captured with the decision.",
              },
              {
                title: "AI recommends. Human confirms. Record remains.",
                body: "The AI's severity recommendation carries its confidence and the exact prompt. The responder acknowledges the record, not a chat. It's queryable the day of the incident and every day after.",
              },
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

      {/* ── Alpine proof surface (incident scenario) ─────────────────── */}
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
            An operations decision, fully assembled.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-ink-secondary)]">
            The incident above — as it lives in Boss Loops after escalation. Every
            field was captured at the moment of the decision. Nothing is reconstructed
            later from logs.
          </p>

          <VisualSlot
            label="Alpine — Decision Record · Incident routing"
            caption="Canonical seeded scenario shown in the live Boss Loops product. Service name, incident number, and responder identity are synthetic."
          >
            <DecisionRecordDiagram scenario="incident" />
          </VisualSlot>
        </div>
      </section>

      {/* ── Beyond incident routing ──────────────────────────────────── */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-primary)]">
            Beyond incident routing
          </p>
          <h2
            className="mt-3 max-w-3xl font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-3xl)]"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            The same record for every operations decision that has to hold up.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-ink-secondary)]">
            Incident routing is the cleanest starting point. The same governed record
            applies wherever a decision changes the state of production.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Change approvals",
                body: "Deploy gates, config changes, and infra edits — each with the risk signals and the approver who signed.",
              },
              {
                title: "Exception overrides",
                body: "SLA breaches, credit thresholds, and out-of-policy calls — the exception is the record, not the mystery.",
              },
              {
                title: "Dispatch decisions",
                body: "Work orders, technician routing, and priority calls carry the evidence chain your ops leads need on demand.",
              },
              {
                title: "Capacity and scaling",
                body: "Autoscale overrides, maintenance windows, and surge decisions enter the record with inputs, confidence, and reviewer.",
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
              For operations and platform leaders
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
              Pick the decision that woke someone up last quarter. We&apos;ll wire it to
              your observability, your runbooks, and your escalation policy — and show
              you the record it produces.
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
              The runtime, the SDK, the guards, the actors — all open source. Bring your
              own systems; run the record inside your infrastructure.
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
