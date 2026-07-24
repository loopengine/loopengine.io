import { BossLoopMark } from "@/components/logo";
import { VisualSlot } from "@/components/site/VisualSlot";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Decision Record — one auditable artifact behind every consequential decision",
  description:
    "One record holds the situation, the evidence frozen at the moment it was used, the policies that applied, the people and AI that participated, the outcome, and the learning it produced — enforced by the engine, not by discipline.",
};

function FeatureCard({ title, body, icon }: { title: string; body: string; icon: ReactNode }) {
  return (
    <article
      style={{
        padding: 32,
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        background: "var(--color-surface)",
        transition: "all var(--dur-base) var(--ease-out)"
      }}
    >
      <div>{icon}</div>
      <h3 style={{ marginTop: 16, fontSize: "var(--text-lg)" }}>{title}</h3>
      <p style={{ marginTop: 10, fontSize: "var(--text-base)", color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
        {body}
      </p>
    </article>
  );
}

export default function DecisionRecordPage() {
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
            The Decision Record
          </p>
          <h1
            className="mt-3"
            style={{ fontSize: "clamp(var(--text-3xl), 5vw, var(--text-5xl))", letterSpacing: "-0.02em" }}
          >
            Decisions deserve a system of record
          </h1>
          <p style={{ marginTop: 16, maxWidth: 860, color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
            One record holds the situation, the evidence — frozen at the moment it was used, from governed sources,
            not a link that may have changed since — the policies that applied, the people and AI that participated,
            the outcome that followed, and the learning it produced. GRC holds policy. BI holds metrics. Workflow
            holds steps. Chat holds the AI&apos;s reasoning until the window closes. None of them holds all of it,
            linked, as one auditable artifact.
          </p>
          <p style={{ marginTop: 10, maxWidth: 860, color: "var(--color-ink-secondary)", lineHeight: 1.7 }}>
            In Boss Loops this isn&apos;t a convention a well-behaved workflow follows — it&apos;s{" "}
            <strong>enforced by the engine</strong>. A consequential decision cannot commit without frozen evidence,
            recorded provenance, and a record reconstructable from its primary objects — immutable, hashable,
            replayable by construction, not by discipline. Approvals are captured on that record with the evidence
            presented, under the approver&apos;s own name.
          </p>
          <VisualSlot
            label="Screenshot — The Decision Record"
            caption="A closed Decision Record: the supplier invoice, its participants — VP Operations, an AI decision assistant, and the Controller, each attributed with their contribution — and the timeline, on one auditable artifact."
            src="/screenshots/decision-record-story.png"
            alt="A Boss Loops Decision Record for a supplier invoice — business object, attributed participants including an AI assistant, and the decision timeline."
          />
        </div>
      </section>

      {/* What the record enforces */}
      <section style={{ background: "var(--color-surface)", padding: "64px 0" }}>
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <div className="grid gap-5 md:grid-cols-3">
            <FeatureCard
              title="Evidence frozen at capture"
              icon={
                <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
                  <rect x="6" y="8" width="20" height="16" rx="2" stroke="var(--color-primary)" strokeWidth="2" fill="none" />
                  <path d="M10 14h12M10 18h8" stroke="var(--color-primary-mid)" strokeWidth="2" />
                </svg>
              }
              body="What they knew at the time — value, source definition, freshness, and provenance snapshotted the moment evidence informs a decision. Not a screenshot, not a stale export."
            />
            <FeatureCard
              title="Approvals on the record"
              icon={
                <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
                  <circle cx="8" cy="16" r="4" fill="var(--color-primary-mid)" />
                  <circle cx="16" cy="10" r="4" fill="var(--color-primary)" />
                  <circle cx="24" cy="16" r="4" fill="var(--color-primary-dark)" />
                </svg>
              }
              body="Approvers sign under their own name, and the sign-off is captured with the evidence presented. Human, automation, and AI actors share one attribution model."
            />
            <FeatureCard
              title="Answerable years later"
              icon={<BossLoopMark size={32} color="var(--color-primary)" />}
              body="Who decided, on what evidence, under which policy, and whether it worked — retrieved as a record, not reconstructed across four systems."
            />
          </div>

          <p style={{ marginTop: 32, fontSize: "var(--text-sm)", color: "var(--color-ink-muted)" }}>
            <Link href="/product/how-it-works" style={{ color: "var(--color-primary)" }}>
              See a governed decision, walked through →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
