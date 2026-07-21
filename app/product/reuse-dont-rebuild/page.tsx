import { DEMO_URL, SALES_CONTACT_URL } from "@/lib/contact-routes";
import type { Metadata } from "next";
import { VisualSlot } from "@/components/site/VisualSlot";
import { OverlayArchitectureDiagram } from "@/components/site/OverlayArchitectureDiagram";

export const metadata: Metadata = {
  title: "Reuse, don't rebuild",
  description:
    "Your enterprise has already defined its business — in ERP, CRM, Snowflake, Looker, and the systems your teams run every day. Boss Loops turns those definitions into governed decisions, without asking you to model your business twice.",
};

const bodyStyle = {
  marginTop: 12,
  maxWidth: 780,
  color: "var(--color-ink-tertiary)",
  lineHeight: 1.75,
};

function Cta({ label, href, primary }: { label: string; href: string; primary?: boolean }) {
  return (
    <a
      href={href}
      className="inline-flex items-center"
      style={{
        background: primary ? "var(--color-primary)" : "transparent",
        color: primary ? "#fff" : "var(--color-ink)",
        border: primary ? "none" : "1px solid var(--color-border)",
        borderRadius: "var(--radius-sm)",
        padding: "11px 24px",
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        fontSize: "var(--text-sm)",
      }}
    >
      {label}
    </a>
  );
}

/** VISUAL 1 — architecture contrast: "Model everything again" vs "Reuse what exists". */
function ContrastDiagram() {
  const chip = (label: string, emphasis?: boolean) => (
    <span
      style={{
        border: emphasis ? "1.5px solid var(--color-primary)" : "1px solid var(--color-border)",
        borderRadius: "var(--radius-sm)",
        padding: "7px 12px",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-xs)",
        fontWeight: emphasis ? 600 : 400,
        color: emphasis ? "var(--color-primary-dark)" : "var(--color-ink-secondary)",
        background: emphasis ? "var(--color-primary-light)" : "var(--color-surface)",
        textAlign: "center" as const,
      }}
    >
      {label}
    </span>
  );
  const arrow = (
    <span style={{ color: "var(--color-ink-muted)" }} aria-hidden>
      ↓
    </span>
  );
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="flex flex-col items-center gap-2">
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "var(--text-xs)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--color-ink-muted)",
            marginBottom: 6,
          }}
        >
          Model everything again
        </p>
        {chip("ERP · CRM · Snowflake · Looker · Samsara")}
        {arrow}
        {chip("New enterprise decision model", true)}
        {arrow}
        {chip("Decision")}
        <p style={{ marginTop: 8, fontSize: "var(--text-xs)", color: "var(--color-ink-muted)" }}>
          A second definition of your business — to populate, own, and maintain.
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "var(--text-xs)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--color-primary)",
            marginBottom: 6,
          }}
        >
          Reuse what exists
        </p>
        {chip("ERP · CRM · Snowflake · Looker · Samsara — semantics stay in place")}
        {arrow}
        {chip("Decision context — evidence from existing definitions")}
        {arrow}
        {chip("Decision Record — references back to every source", true)}
        <p style={{ marginTop: 8, fontSize: "var(--text-xs)", color: "var(--color-ink-muted)" }}>
          One approach rebuilds. One references.
        </p>
      </div>
    </div>
  );
}

export default function ReuseDontRebuildPage() {
  return (
    <main>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(180deg, var(--color-surface-alt) 0%, var(--color-surface) 100%)",
          borderBottom: "1px solid var(--color-border)",
          padding: "76px 0 60px",
        }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <h1 style={{ fontSize: "clamp(var(--text-3xl), 5vw, var(--text-5xl))", letterSpacing: "-0.02em" }}>
            Reuse, don&apos;t rebuild.
          </h1>
          <p style={{ ...bodyStyle, marginTop: 16, fontSize: "var(--text-md)" }}>
            Your enterprise has already defined its business — in ERP, CRM, Snowflake, Looker, and the systems your
            teams run every day. Boss Loops turns those definitions into governed decisions, without asking you to
            model your business twice.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Cta primary label="Get started" href="https://registry.betterdata.co/boss-loops/cloud/start" />
            <Cta label="See how it works ↓" href="#no-new-model" />
          </div>
          <VisualSlot label="Visual — two architectures">
            <ContrastDiagram />
          </VisualSlot>
        </div>
      </section>

      {/* No new model */}
      <section id="no-new-model" className="scroll-mt-20" style={{ background: "var(--color-surface)", padding: "64px 0" }}>
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <h2 style={{ maxWidth: 820 }}>Most decision platforms make you build a new model. Boss Loops doesn&apos;t.</h2>
          <p style={bodyStyle}>
            The common approach centralizes your operational data into a new, enterprise-wide decision model — another
            semantic layer to populate, own, and maintain. It&apos;s a real answer to data fragmentation, but the cost
            is a modeling project measured in quarters, and a definition of your business that now lives in two
            places.
          </p>
          <p style={bodyStyle}>
            Boss Loops starts from the opposite premise: the definitions already exist. Your ERP knows suppliers and
            GL accounts. Your CRM knows customers. Snowflake and Looker already hold the certified metrics your
            business runs on. Boss Loops consumes those semantics as evidence — it doesn&apos;t recreate them.
          </p>
          <p style={{ ...bodyStyle, color: "var(--color-ink)", fontWeight: 500 }}>
            The only thing Boss Loops models is the one thing no other system captures: the decision itself.
          </p>
        </div>
      </section>

      {/* Governed evidence */}
      <section
        style={{ background: "var(--color-surface-subtle)", borderTop: "1px solid var(--color-border)", padding: "64px 0" }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <h2>Governed evidence, from the systems you already trust</h2>
          <p style={bodyStyle}>
            Every piece of evidence in a Boss Loops decision comes straight from its source system — the metric&apos;s
            governed definition, its value, and its freshness, captured at the moment the decision was made. Not a
            screenshot. Not a copy. The definition your data team already certified.
          </p>
          <VisualSlot
            label="Screenshot — Snowflake governed evidence"
            caption="The Snowflake semantic-view evidence panel: finance.gross_margin at 42.3%, its governed definition, freshness, and provenance — frozen at decision time."
          />
          <VisualSlot
            label="Screenshot — Multiple systems, one decision"
            caption="A Looker on-time-delivery metric and a Samsara device-attested reading feeding the same decision — a governed BI metric and a real-world operational fact in one record, each from its own system."
          />
        </div>
      </section>

      {/* Reference, don't duplicate */}
      <section style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)", padding: "64px 0" }}>
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <h2>We don&apos;t duplicate your systems. We reference them.</h2>
          <p style={bodyStyle}>
            A Decision Record doesn&apos;t copy your ERP or your warehouse — it points to them. The invoice stays in
            SAP. The metric stays in Snowflake. Boss Loops links to each source and adds the one layer they were never
            built to hold: why the decision was made.
          </p>
          <VisualSlot
            label="Screenshot — The Decision Record"
            caption="A supplier-invoice approval: the invoice from SAP with its cost center, business unit, and GL account; the governed metric from Snowflake; policy P-102; the AI recommendation; the manager's approval captured with the evidence presented; outcome — paid."
          />
          <p style={{ ...bodyStyle, color: "var(--color-ink)", fontWeight: 500 }}>
            The ERP remains the system of record for the invoice. Boss Loops becomes the system of record for the
            decision to pay it — who decided, on what evidence, under which policy, and whether it worked.
          </p>
        </div>
      </section>

      {/* The overlay architecture */}
      <section
        id="overlay-architecture"
        className="scroll-mt-20"
        style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)", padding: "64px 0" }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <h2>The overlay architecture</h2>
          <p style={bodyStyle}>
            Most decision platforms integrate vertically — building their own analytics pane or their own enterprise
            data model on top of your warehouse, and displacing something you already run to do it. Boss Loops takes
            the seat none of them occupy. Looker keeps semantic authority. Snowflake keeps compute, storage, and
            secure ERP ingestion. Your applications keep execution. The overlay adds the one object none of them
            persist — the decision commit and its record — and reads from all of them while displacing none of them.
          </p>
          <p style={bodyStyle}>
            The write surface is deliberately tiny: <strong>read everything, write one new kind of object.</strong>{" "}
            Execution — the ERP writeback, the payment run, the Slack confirmation — happens on rails you already own,
            after the loop commits.
          </p>
          <div className="mt-8">
            <OverlayArchitectureDiagram />
          </div>
          <p style={{ ...bodyStyle, marginTop: 20 }}>
            End to end: a Native App ingests the NetSuite invoice and a threshold opens the loop → the Looker KPI and
            Snowflake semantic view attach as frozen, qualified evidence → guards evaluate policy and the approval is
            captured on the record → execution is delegated to your existing rails → the outcome is measured from the
            same warehouse — and the Decision Record itself lands back in Snowflake as data your BI can analyze.
            That last arrow is the one vertically-integrated platforms can&apos;t draw: our output becomes their input.
          </p>
        </div>
      </section>

      {/* A different question */}
      <section
        style={{ background: "var(--color-surface-subtle)", borderTop: "1px solid var(--color-border)", padding: "64px 0" }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <h2>A different question</h2>
          <div style={{ marginTop: 16, maxWidth: 720 }}>
            <p style={{ color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
              Data platforms ask <em>&ldquo;is the data trustworthy?&rdquo;</em>
            </p>
            <p style={{ marginTop: 6, color: "var(--color-ink)", fontWeight: 500, lineHeight: 1.7 }}>
              Boss Loops asks &ldquo;was the decision trustworthy?&rdquo;
            </p>
            <p style={{ marginTop: 12, color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
              Those aren&apos;t the same question — and only one of them survives an audit a year later.
            </p>
          </div>
        </div>
      </section>

      {/* Start where you are */}
      <section style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)", padding: "64px 0" }}>
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <h2>Start where you are</h2>
          <p style={bodyStyle}>
            Because Boss Loops reuses the semantics already in your systems, it fits the maturity you actually have:
          </p>
          <ul className="mt-5 space-y-3" style={{ maxWidth: 780 }}>
            <li style={{ color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--color-ink)" }}>Enterprise</strong> — reuse years of semantic investment
              (LookML, dbt, Snowflake views, SAP objects, Fabric models) instead of rebuilding it. Protect the work,
              skip the migration.
            </li>
            <li style={{ color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--color-ink)" }}>Mid-market</strong> — governed, defensible decisions
              without a six-month data-modeling project.
            </li>
            <li style={{ color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--color-ink)" }}>And it scales down</strong> — even without a semantic
              layer, Boss Loops starts from the metadata already in the operational tools you run.
            </li>
          </ul>
          <p style={bodyStyle}>
            One platform. No ontology project. Roll out one decision at a time — and every decision you record makes
            the next one better.
          </p>
          <VisualSlot
            label="Screenshot — Boss Loops in operation"
            caption="The Decision Operations workspace: the Attention queue with live decisions requiring review."
          />
        </div>
      </section>

      {/* Close */}
      <section
        style={{ background: "var(--color-surface-subtle)", borderTop: "1px solid var(--color-border)", padding: "64px 0 76px" }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <h2>Amplify what you&apos;ve already built.</h2>
          <p style={bodyStyle}>
            Most platforms ask you to recreate your business to govern it. Boss Loops compounds the investment
            you&apos;ve already made — and turns it into decisions you can defend.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Cta primary label="Get started" href="https://registry.betterdata.co/boss-loops/cloud/start" />
            <Cta label="Try the demo" href={DEMO_URL} primary />
            <Cta label="Talk to us" href={SALES_CONTACT_URL} />
          </div>
        </div>
      </section>
    </main>
  );
}
