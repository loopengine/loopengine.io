import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Enterprise IT: From AI productivity to governed actor",
  description:
    "Why enterprise AI hits a governance wall, how Loop Engine adds governed execution between models and systems, and what to measure for security and compliance leaders.",
  openGraph: {
    title: "From productivity tool to governed enterprise actor · Loop Engine",
    description:
      "Technical explainer for IT leaders: the governance wall, governed execution, PO exception review, actor attribution, and security architecture."
  }
};

const section = "text-[var(--color-ink-secondary)] text-[15px] leading-[1.75] space-y-4";
const h2 = "mt-14 font-[var(--font-display)] text-[var(--color-ink)] text-2xl tracking-tight first:mt-0";
const h3 = "mt-8 font-[var(--font-display)] text-[var(--color-ink)] text-lg";
const codeBlock =
  "overflow-x-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 font-mono text-[13px] leading-relaxed text-[var(--color-ink-secondary)]";

export default function EnterpriseItExplainerPage() {
  return (
    <main className="px-4 py-12 md:py-16">
      <article className="mx-auto max-w-[720px]">
        <p
          className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-primary)]"
          style={{ letterSpacing: "0.12em" }}
        >
          Use cases · Enterprise IT
        </p>
        <h1 className="mt-3 font-[var(--font-display)] text-[var(--color-ink)] text-3xl tracking-tight md:text-[2rem]">
          From productivity tool to enterprise actor: how Loop Engine crosses the AI governance wall
        </h1>
        <p className="mt-2 text-sm text-[var(--color-ink-tertiary)]">
          Technical peer explainer for senior developers, enterprise architects, and security-adjacent leaders.
        </p>

        <section className={section}>
          <h2 className={h2}>Where enterprise AI is today</h2>
          <p>
            Most organizations are using AI exactly the way their vendors intended: individual productivity. Drafting emails.
            Summarizing documents. Generating first cuts of code. Answering questions against uploaded PDFs.
          </p>
          <p>
            It works. Developers are faster. Analysts spend less time on boilerplate. Executives get meeting summaries they
            actually read.
          </p>
          <p>But then someone asks the obvious next question.</p>
          <blockquote className="border-l-2 border-[var(--color-primary-mid)] pl-4 text-[var(--color-ink)] italic">
            <p>&ldquo;Can we connect this to Salesforce so it can pull live pipeline data?&rdquo;</p>
            <p className="mt-2">&ldquo;Can we have the AI review open POs and flag the ones past due?&rdquo;</p>
            <p className="mt-2">&ldquo;Can it just update the ticket status once it&apos;s done?&rdquo;</p>
          </blockquote>
          <p>And that&apos;s where the wall appears.</p>
        </section>

        <section className={section}>
          <h2 className={h2}>The wall is real — and it&apos;s not going away</h2>
          <p>
            When a corporate developer tries to connect Gemini Studio directly to Salesforce data, the security team blocks it.
            When they try to give Claude API access to an internal ERP, InfoSec opens a P1 ticket. When they want GPT-4o to
            write to a database, Legal wants to know who approved that write.
          </p>
          <p>This isn&apos;t obstruction. These controls exist for good reasons:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-[var(--color-ink)]">Data residency and sovereignty</strong> — enterprise CRM data may be
              subject to GDPR, HIPAA, or contractual restrictions on where it can be processed.
            </li>
            <li>
              <strong className="text-[var(--color-ink)]">Auditability</strong> — regulated industries require a record of who
              authorized what action on what data.
            </li>
            <li>
              <strong className="text-[var(--color-ink)]">Blast radius control</strong> — an AI model that can write directly to
              your ERP is a misconfigured prompt away from a production incident.
            </li>
            <li>
              <strong className="text-[var(--color-ink)]">Access control</strong> — your AI tool&apos;s API key is not a human
              employee with RBAC, role assignments, and a termination workflow.
            </li>
          </ul>
          <p>
            The result: AI stays in the productivity layer. It advises. It drafts. It summarizes. But it cannot{" "}
            <em>act</em> on enterprise systems — because no one has built the layer that makes that safe.
          </p>
          <p className="text-[var(--color-ink)]">Loop Engine is that layer.</p>
        </section>

        <section className={section}>
          <h2 className={h2}>The pattern that unlocks enterprise AI action</h2>
          <p>
            The problem is not that AI models are untrustworthy. The problem is that there is no structural layer between{" "}
            <em>AI output</em> and <em>enterprise system action</em>. Every connection today is either:
          </p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              <strong className="text-[var(--color-ink)]">Fully open</strong> (AI has direct API access — your security
              team&apos;s nightmare)
            </li>
            <li>
              <strong className="text-[var(--color-ink)]">Fully closed</strong> (AI output is copy-pasted into a system by a human
              — what you&apos;re doing now)
            </li>
          </ol>
          <p>
            Loop Engine introduces a third option: <strong className="text-[var(--color-ink)]">governed execution</strong>.
          </p>
          <pre className={codeBlock} tabIndex={0}>
{`Signal (data change, schedule, trigger)
  ↓
AI Actor (analyzes, decides, proposes a transition)
  ↓
Loop Engine (evaluates guards, requires evidence, enforces actor policy)
  ↓
Human Gate [if required] (manager, compliance officer, CISO approves)
  ↓
Downstream System (Salesforce updated, ticket closed, PO flagged)
  ↓
Evidence Record (immutable — what happened, who authorized, when, why)`}
          </pre>
          <p>
            The AI never writes directly to Salesforce. It proposes a transition. Loop Engine evaluates whether that
            transition is allowed under the current guard policy. If a human approval gate is configured, the loop pauses at{" "}
            <code className="rounded bg-[var(--color-surface-alt)] px-1 font-mono text-[13px]">PENDING_HUMAN_APPROVAL</code>{" "}
            until a named actor approves. Only then does the downstream action execute — and the full chain of custody is
            recorded.
          </p>
          <p>This is how you cross the governance wall.</p>
        </section>

        <section className={section}>
          <h2 className={h2}>What a loop looks like in practice</h2>
          <p>
            Take a concrete example: <strong className="text-[var(--color-ink)]">AI-assisted PO exception review.</strong>
          </p>
          <p>
            Your procurement system generates hundreds of purchase orders weekly. Some need exception approval — anomalous
            spend, new vendors, over-budget line items. Today a human analyst reviews a queue and makes calls. Tomorrow you
            want an AI to do the initial triage.
          </p>
          <p>Without Loop Engine, that means giving the AI write access to your procurement system. No one will approve that.</p>
          <p>
            <strong className="text-[var(--color-ink)]">With Loop Engine:</strong>
          </p>
          <pre className={codeBlock} tabIndex={0}>
{`States:     RECEIVED → TRIAGED → PENDING_HUMAN_REVIEW → APPROVED / REJECTED / ESCALATED

Transitions:
  - ai_triage:       RECEIVED → TRIAGED         (actor: ai-agent)
  - flag_for_human:  TRIAGED → PENDING_HUMAN_REVIEW  (actor: ai-agent, guard: confidence < 0.90)
  - auto_approve:    TRIAGED → APPROVED          (actor: ai-agent, guard: confidence ≥ 0.90 AND amount < $5,000)
  - human_approve:   PENDING_HUMAN_REVIEW → APPROVED   (actor: human)
  - human_reject:    PENDING_HUMAN_REVIEW → REJECTED    (actor: human)
  - escalate:        PENDING_HUMAN_REVIEW → ESCALATED   (actor: human OR automation)

Guards:
  - confidence_threshold: 0.90 (AI transitions above this threshold may auto-approve)
  - amount_limit: $5,000 (all transitions above this amount require human review)
  - vendor_allowlist: new vendors always require human review regardless of confidence`}
          </pre>
          <p>
            The AI triages every PO. High-confidence, low-value, known-vendor POs close automatically. Everything else routes
            to a human queue — with the AI&apos;s evidence payload attached (why it flagged it, what it found, what it
            recommends).
          </p>
          <p>
            Security sees: the AI never touches Salesforce directly. It writes a loop transition with evidence. A human (or
            an approved automation) takes the downstream action.
          </p>
          <p>
            Audit sees: every transition is timestamped, attributed to a named actor, and evidence-stamped. The full decision
            chain is queryable.
          </p>
        </section>

        <section className={section}>
          <h2 className={h2}>Every actor is accounted for</h2>
          <p>
            One of the most important properties of the Loop Engine actor model is that{" "}
            <strong className="text-[var(--color-ink)]">humans, AI agents, and automations are treated identically</strong>.
          </p>
          <p>Every transition must be attributed to a typed actor:</p>
          <pre className={codeBlock} tabIndex={0}>
{`// Human actor
{ id: 'emp_456', type: 'human' }

// AI actor (provider metadata often attached in evidence / traces)
{ id: 'gemini-1.5-pro', type: 'ai-agent' }

// Automation actor
{ id: 'procurement-service-v2', type: 'automation' }`}
          </pre>
          <p>
            Prompt hashing and provider metadata in traces mean you can show, for a given transition, what instruction set the
            model was operating under at the time. If a prompt is modified and the model starts behaving differently, you will
            see it in the evidence trail.
          </p>
          <p>For a CISO: this is attribution. Every action has an author.</p>
        </section>

        <section className={section}>
          <h2 className={h2}>Watching and reporting on loops</h2>
          <p>
            Loop Engine emits structured events on every state change. These are first-class observability outputs, not logs.
          </p>
          <p>Typical transition-related events include loop identity, aggregate id, from/to states, actor, evidence, and timing.</p>
          <p>
            This feeds into your observability stack. The schema is predictable enough to query with standard BI tooling
            alongside your existing telemetry.
          </p>
          <h3 className={h3}>What you can report on</h3>
          <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-alt)]">
                  <th className="px-3 py-2 font-mono text-[11px] uppercase tracking-wide text-[var(--color-ink)]">Metric</th>
                  <th className="px-3 py-2 font-mono text-[11px] uppercase tracking-wide text-[var(--color-ink)]">Description</th>
                </tr>
              </thead>
              <tbody className="text-[var(--color-ink-secondary)]">
                {[
                  ["Loop throughput", "Volume of loop instances opened, closed, and blocked per period"],
                  ["State dwell time", "Average time spent in each state — surfaces bottlenecks"],
                  ["Guard block rate", "How often transitions are blocked by guard policies"],
                  ["Human review rate", "Share of AI-proposed transitions that required human approval"],
                  ["Actor attribution", "Breakdown of which actors closed which transitions"],
                  ["Evidence coverage", "Share of transitions with structured evidence payloads"],
                  ["Outcome rate", "Terminal success vs. rejected or escalated"]
                ].map(([metric, desc]) => (
                  <tr key={metric} className="border-b border-[var(--color-border)] last:border-0">
                    <td className="px-3 py-2 align-top font-medium text-[var(--color-ink)]">{metric}</td>
                    <td className="px-3 py-2 align-top">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>This is not a log. It is a governed process record — and it is the foundation for continuous improvement.</p>
        </section>

        <section className={section}>
          <h2 className={h2}>How AI actors improve over time</h2>
          <p>
            Closed loops emit learning signals: structured outcome records describing what happened, who acted, and what the
            result was. When modeled with measurable outcomes, they feed threshold tuning, forecasting, and model improvement.
          </p>
          <p>
            <strong className="text-[var(--color-ink)]">Month 1:</strong> Conservative confidence thresholds; a large share of
            AI-proposed transitions still route to humans; guard block rate is high.
          </p>
          <p>
            <strong className="text-[var(--color-ink)]">Month 3:</strong> You analyze the evidence trail. High-confidence
            transitions that were routed to humans were approved without change in most cases — you tighten thresholds for
            established vendors and reduce human review volume.
          </p>
          <p>
            <strong className="text-[var(--color-ink)]">Month 6:</strong> Human-rejected AI proposals become negative
            training examples; precision improves; false guard blocks fall.
          </p>
          <p>
            <strong className="text-[var(--color-ink)]">Month 12:</strong> A large fraction of standard volume runs under
            automation with a full audit trail and no direct AI writes to your ERP; humans focus on exceptions the system
            correctly escalated.
          </p>
          <p>
            Without a layer like Loop Engine, much of this data never exists in a form that can drive improvement — you have
            logs, not a governed process record.
          </p>
        </section>

        <section className={section}>
          <h2 className={h2}>The security architecture in plain terms</h2>
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <strong className="text-[var(--color-ink)]">The model does not replace your service layer.</strong> Downstream
              writes go through integrations and services that already enforce RBAC, audit logging, and rate limiting. Loop
              Engine governs what transition is allowed and what evidence is required first.
            </li>
            <li>
              <strong className="text-[var(--color-ink)]">Guard policies are structural, not prompt-based.</strong> A structural
              guard runs at transition time; it cannot be talked past the way a brittle prompt-only rule can.
            </li>
            <li>
              <strong className="text-[var(--color-ink)]">Human gates are hard.</strong> A transition that requires a human actor
              does not advance until that requirement is satisfied under policy.
            </li>
            <li>
              <strong className="text-[var(--color-ink)]">Evidence and transition history are append-only for audit purposes.</strong>{" "}
              You get a durable record of what happened in order.
            </li>
            <li>
              <strong className="text-[var(--color-ink)]">Apache-2.0 with explicit patent grant.</strong> No SSPL-style
              surprise. The governance layer you build stays on a permissive, OSI-approved license.
            </li>
          </ul>
        </section>

        <section className={section}>
          <h2 className={h2}>Where to start</h2>
          <ol className="list-decimal space-y-3 pl-5">
            <li>Pick one bounded process with clear states and actors (PO review, triage, change approval, fraud review).</li>
            <li>
              Define the loop (YAML or TypeScript) — states, transitions, guards, actor types. Treat it as a spec InfoSec can
              review.
            </li>
            <li>Run in-memory first; validate the machine against real examples from your queue.</li>
            <li>Add your model adapter; wire confidence evidence; set conservative guard thresholds.</li>
            <li>Add human approval for transitions your security review requires; connect PagerDuty, Slack, or tickets.</li>
            <li>Add persistence and stream events into your BI or observability stack.</li>
            <li>After 30 days, tune guards from evidence — start the improvement cycle.</li>
          </ol>
        </section>

        <section className={`${section} mt-14 border-t border-[var(--color-border)] pt-10`}>
          <h2 className={h2}>Resources</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <Link href="/docs/getting-started/quickstart" className="text-[var(--color-primary)] underline underline-offset-4">
                Quick Start
              </Link>
            </li>
            <li>
              <Link href="/docs/concepts/guards" className="text-[var(--color-primary)] underline underline-offset-4">
                Guards and policy
              </Link>
            </li>
            <li>
              <Link href="/docs/examples/support-escalation" className="text-[var(--color-primary)] underline underline-offset-4">
                Support escalation example (human gates)
              </Link>
            </li>
            <li>
              <Link href="/docs/concepts/actors" className="text-[var(--color-primary)] underline underline-offset-4">
                Actors
              </Link>
            </li>
            <li>
              <Link
                href="/docs/integrations/perplexity-pagerduty"
                className="text-[var(--color-primary)] underline underline-offset-4"
              >
                Perplexity + PagerDuty governed incident pattern
              </Link>
            </li>
            <li>
              <Link href="/docs/runtime/events-and-traces" className="text-[var(--color-primary)] underline underline-offset-4">
                Events and traces
              </Link>
            </li>
            <li>
              <a
                href="https://commercegateway.dev"
                className="text-[var(--color-primary)] underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Commerce Gateway
              </a>{" "}
              — for loops that execute commerce actions
            </li>
          </ul>
        </section>

        <p className="mt-12 text-sm text-[var(--color-ink-tertiary)]">
          Loop Engine is Apache-2.0 licensed open infrastructure created by{" "}
          <a href="https://betterdata.co" className="text-[var(--color-primary)] underline underline-offset-4" target="_blank" rel="noopener noreferrer">
            Better Data
          </a>
          . Hosted governed-loop options are available on the Better Data platform.
        </p>
      </article>
    </main>
  );
}
