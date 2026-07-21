import { RuntimeFlowDiagram } from "@/components/home/RuntimeFlowDiagram";
import { RuntimeLayerStack } from "@/components/home/RuntimeLayerStack";
import { operationalPatterns } from "@/lib/partner-patterns";
import {
  channelPartners,
  ecosystemExpansionPartners,
  evidencePartners,
  featuredChannelPartner,
  integrationPartners,
  providerPartners,
  type Partner,
} from "@/lib/partners";
import { LOOP_ENGINE_PRIMARY, LOOP_ENGINE_SUPPORTING } from "@/lib/betterdata-ecosystem";
import { SALES_CONTACT_URL } from "@/lib/contact-routes";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Runtime ecosystem",
  description:
    "Boss Loops runtime ecosystem — Model Providers (intelligence), Evidence Providers (governed evidence), Channels (human coordination), Integrations (systems of record), governed by decision loops with guards and evidence.",
  robots: { index: false, follow: false },
};

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-primary)]">{children}</p>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-2 font-[var(--font-display)] text-[var(--text-2xl)] text-[var(--color-ink)]">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-[var(--color-ink-secondary)]">{description}</p>
    </div>
  );
}

function Badge({
  children,
  tone = "neutral",
}: {
  children: string;
  tone?: "neutral" | "blue" | "green" | "amber" | "violet";
}) {
  const styles = {
    neutral: "bg-[var(--color-surface-alt)] text-[var(--color-ink-tertiary)]",
    blue: "bg-[var(--color-primary-light)] text-[var(--color-primary-dark)]",
    green: "bg-emerald-50 text-emerald-800",
    amber: "bg-amber-50 text-amber-900",
    violet: "bg-violet-50 text-violet-900",
  };
  return (
    <span className={`rounded-full px-2 py-1 font-mono text-[10px] uppercase tracking-wide ${styles[tone]}`}>
      {children}
    </span>
  );
}

function layerBadge(layer: Partner["runtimeLayer"]) {
  if (layer === "provider") return <Badge tone="blue">Model Provider</Badge>;
  if (layer === "evidence") return <Badge tone="violet">Evidence Provider</Badge>;
  if (layer === "channel") return <Badge tone="green">Channel</Badge>;
  if (layer === "integration") return <Badge tone="amber">Integration</Badge>;
  return <Badge>Ecosystem</Badge>;
}

function availabilityLabel(partner: Partner) {
  if (partner.availability === "cloud-connector") return "Boss Loops Cloud";
  if (partner.availability === "pattern") return "Pattern doc";
  if (partner.availability === "preview") return "Preview on demo";
  if (partner.availability === "ecosystem") return "Ecosystem";
  return null;
}

function PartnerCard({ partner, accent }: { partner: Partner; accent?: "featured" }) {
  const cert = partner.certificationStatus;
  return (
    <article
      className={`flex flex-col rounded-lg border border-[var(--color-border)] p-5 shadow-sm ${
        accent === "featured" ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]" : "bg-[var(--color-surface)]"
      }`}
    >
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {layerBadge(partner.runtimeLayer)}
          {partner.marketingBadge ? <Badge tone="blue">{partner.marketingBadge}</Badge> : null}
          {cert === "certified" ? <Badge tone="blue">Certified</Badge> : null}
          {cert === "in-review" ? <Badge>In review</Badge> : null}
          {cert === "community" ? <Badge>Community</Badge> : null}
          {cert === "pattern" ? <Badge>Pattern</Badge> : null}
        </div>
        {availabilityLabel(partner) ? (
          <span className="font-mono text-[10px] text-[var(--color-ink-muted)]">{availabilityLabel(partner)}</span>
        ) : null}
      </div>
      {partner.logoPath ? (
        <div className="relative mb-3 h-8 w-28">
          <Image src={partner.logoPath} alt={`${partner.name} logo`} fill className="object-contain object-left" />
        </div>
      ) : (
        <h3 className="font-semibold text-lg text-[var(--color-ink)]">{partner.name}</h3>
      )}
      {partner.logoPath ? <h3 className="font-semibold text-lg text-[var(--color-ink)]">{partner.name}</h3> : null}
      <p className="mt-1 flex-1 text-sm leading-6 text-[var(--color-ink-secondary)]">{partner.description}</p>
      {partner.adapterPackage ? (
        <p className="mt-3 inline-block rounded border border-[var(--color-border)] px-2 py-1 font-mono text-[11px] text-[var(--color-ink-tertiary)]">
          {partner.adapterPackage}
        </p>
      ) : null}
      {partner.installCommand ? (
        <p className="mt-2 font-mono text-[11px] text-[var(--color-ink-muted)]">{partner.installCommand}</p>
      ) : null}
      <p className="mt-4 flex flex-wrap gap-3">
        <Link href={partner.docsPath} className="text-sm text-[var(--color-primary)] underline underline-offset-4">
          {partner.docsPath.startsWith("http") ? "External docs →" : "View docs →"}
        </Link>
        {partner.externalUrl ? (
          <a
            href={partner.externalUrl}
            className="text-sm text-[var(--color-primary)] underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit site →
          </a>
        ) : null}
      </p>
    </article>
  );
}

function PatternCard({ pattern }: { pattern: (typeof operationalPatterns)[number] }) {
  return (
    <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-5">
      <h3 className="font-[var(--font-display)] text-lg">
        <Link href={pattern.href} className="text-[var(--color-primary)] hover:underline">
          {pattern.title}
        </Link>
      </h3>
      <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-[var(--color-ink-secondary)]">
        {pattern.flow.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <ul className="mt-4 flex flex-wrap gap-2">
        {pattern.reinforces.map((tag) => (
          <li
            key={tag}
            className="rounded border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-ink-muted)]"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function PartnersPage() {
  const channelGrid = channelPartners.filter((p) => p.slug !== featuredChannelPartner.slug);

  return (
    <main>
      {/* Hero — design-partner first */}
      <section className="border-b border-[var(--color-border)] px-4 py-14 md:py-20">
        <div className="mx-auto max-w-4xl">
          <Eyebrow>Design partners</Eyebrow>
          <h1
            className="mt-3 max-w-3xl font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-4xl)]"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.05 }}
          >
            One decision. One pilot. One record you can defend.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-ink-secondary)]">
            We work with a small number of teams designing pilots around a single, consequential
            decision. We wire it to your semantic layer, your systems of record, and your approval
            matrix — then hand you back the governed record it produces.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`${SALES_CONTACT_URL}&cta=partners-hero-pilot`}
              data-ph-cta="partners-hero-pilot"
              className="inline-flex items-center rounded-lg bg-[var(--color-primary)] px-6 py-3 font-mono text-sm text-white"
            >
              Design a pilot →
            </a>
            <Link
              href="#ecosystem"
              className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-6 py-3 font-mono text-sm text-[var(--color-ink-secondary)]"
            >
              See the ecosystem below ↓
            </Link>
          </div>
          <p className="mt-6 max-w-2xl font-mono text-xs leading-6 text-[var(--color-ink-muted)]">
            Building an adapter, not deploying? The runtime taxonomy and partner program are further
            down.
          </p>
        </div>
      </section>

      {/* Runtime ecosystem explanation */}
      <section
        id="ecosystem"
        className="border-b border-[var(--color-border)] px-4 py-14"
        style={{ background: "var(--color-surface-subtle)" }}
      >
        <div className="mx-auto mb-8 max-w-6xl">
          <p className="max-w-3xl text-sm leading-7 text-[var(--color-ink-tertiary)]">
            {LOOP_ENGINE_SUPPORTING} {LOOP_ENGINE_PRIMARY} Boss Loops governs{" "}
            <strong>transitions</strong> between intelligence, human coordination, and operational
            systems — with deterministic guards, structured evidence, and human oversight on every
            material state change.
          </p>
          <p className="mt-4 max-w-3xl font-mono text-xs leading-6 text-[var(--color-ink-muted)]">
            This is a runtime ecosystem — not an integration marketplace. Workflows define paths;
            loops govern whether transitions commit.
          </p>
        </div>
      </section>

      {/* Runtime ecosystem visual */}
      <section
        className="border-b border-[var(--color-border)] px-4 py-14"
        style={{ background: "var(--color-surface-subtle)" }}
      >
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            eyebrow="How the runtime composes"
            title="Boss Loops sits between every layer"
            description={
              <>
                <strong>Model Providers</strong> generate intelligence. <strong>Evidence Providers</strong> attach
                governed evidence. <strong>Boss Loops</strong> governs operational transitions.{" "}
                <strong>Channels</strong> coordinate human decisions. <strong>Integrations</strong> execute against
                systems of record. <strong>Evidence + learning</strong> explain and improve operations — not
                reconstructed chat logs.
              </>
            }
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <RuntimeFlowDiagram variant="annotated" />
            <div>
              <RuntimeLayerStack showDisambiguation docsHref="/docs/concepts/runtime-taxonomy" />
            </div>
          </div>
        </div>
      </section>

      {/* Model Providers */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            eyebrow="Model Providers"
            title="Intelligence systems"
            description={
              <>
                Providers analyze, recommend, classify, predict, and draft — they <strong>do not</strong> approve in
                Slack, write to CRM, or bypass guards. Operational intelligence enters the loop; governance decides
                whether it may advance.
              </>
            }
          />
          <p className="mt-4 font-mono text-xs text-[var(--color-ink-muted)]">
            Typical actions: classify · reason · recommend · generate
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {providerPartners.map((partner) => (
              <PartnerCard key={partner.slug} partner={partner} />
            ))}
          </div>
        </div>
      </section>

      {/* Evidence Providers */}
      <section className="border-t border-[var(--color-border)] px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            eyebrow="Evidence Providers"
            title="Governed evidence, frozen at capture"
            description={
              <>
                Looker, Snowflake, and Samsara don&apos;t become another dashboard inside Boss Loops. They attach
                governed evidence to the Decision Record — <strong>frozen at capture</strong>, with qualification the
                loop <strong>inherits, never asserts</strong>. Semantic evidence carries your warehouse and BI
                definitions; operational evidence carries what was true on the ground at decision time.
              </>
            }
          />
          <p className="mt-4 font-mono text-xs text-[var(--color-ink-muted)]">
            Typical actions: attach · freeze · qualify · trace
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {evidencePartners.map((partner) => (
              <PartnerCard key={partner.slug} partner={partner} />
            ))}
          </div>
          <p className="mt-6 text-sm text-[var(--color-ink-muted)]">
            Preview means a fixture illustrates the architecture on the demo golden record — not a live vendor
            connection. The provider contract and conformance suite are open in Boss Loops OSS.{" "}
            <Link href="/docs/concepts/evidence-providers" className="text-[var(--color-primary)] underline underline-offset-4">
              How Evidence Providers work →
            </Link>
          </p>
        </div>
      </section>

      {/* Channels */}
      <section
        className="border-y border-[var(--color-border)] px-4 py-14"
        style={{ background: "var(--color-surface-subtle)" }}
      >
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            eyebrow="Channels"
            title="Human coordination surfaces"
            description={
              <>
                Channels request approvals, surface decisions, and escalate operators. Slack, Teams, and Docs comments
                are <strong>not</strong> integrations — humans decide here; systems execute elsewhere after governance
                passes.
              </>
            }
          />
          <p className="mt-4 font-mono text-xs text-[var(--color-ink-muted)]">
            Typical actions: notify · approve · reject · escalate · comment
          </p>
          <div className="mt-8">
            <PartnerCard partner={featuredChannelPartner} accent="featured" />
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <a
                href="https://clawhub.ai/betterdataco/loop-engine-governance"
                className="text-[var(--color-primary-dark)] underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                OpenClaw skill on ClawHub →
              </a>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {channelGrid.map((partner) => (
              <PartnerCard key={partner.slug} partner={partner} />
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            eyebrow="Integrations"
            title="Systems of record"
            description={
              <>
                Integrations persist business state, trigger workflows, and apply operational side effects —{" "}
                <strong>after</strong> guards pass. They are not governance and not human chat UIs.
              </>
            }
          />
          <p className="mt-4 font-mono text-xs text-[var(--color-ink-muted)]">
            Typical actions: persist · trigger · update · apply · sync
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {integrationPartners.map((partner) => (
              <PartnerCard key={partner.slug} partner={partner} />
            ))}
          </div>
        </div>
      </section>

      {/* Operational patterns */}
      <section
        className="border-t border-[var(--color-border)] px-4 py-14"
        style={{ background: "var(--color-surface-subtle)" }}
      >
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            eyebrow="Operational patterns"
            title="How layers compose in production"
            description={
              <>
                ABM, RevOps, and incident workflows share one spine: Model Provider → Loop + Guards → Channel →
                Integration → Evidence. Each pattern reinforces dual-surface operations, deterministic guard boundaries,
                and evidence at commit time.
              </>
            }
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {operationalPatterns.map((pattern) => (
              <PatternCard key={pattern.href} pattern={pattern} />
            ))}
          </div>
          <p className="mt-6 text-sm text-[var(--color-ink-muted)]">
            More patterns:{" "}
            <Link href="/docs/examples" className="text-[var(--color-primary)] underline underline-offset-4">
              Examples catalog →
            </Link>
          </p>
        </div>
      </section>

      {/* Governance reinforcement */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            eyebrow="Runtime governance"
            title="Operational AI requires runtime governance"
            description={
              <>
                AI can now act across enterprise systems — APIs and MCP expose operational surfaces where a wrong
                transition has real business impact. Governance is mandatory: Boss Loops evaluates guards, captures
                evidence, and routes human escalation before Integrations commit state.
              </>
            }
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <ul className="space-y-3 text-sm leading-7 text-[var(--color-ink-secondary)]">
              <li>
                <strong>Deterministic guard boundaries</strong> — policy runs in the runtime, not in prompts
              </li>
              <li>
                <strong>Evidence capture</strong> — structured fields on every material transition
              </li>
              <li>
                <strong>Human escalation</strong> — Channels surface PENDING_* states to operators
              </li>
              <li>
                <strong>Operational accountability</strong> — replay and audit without reconstructing chat logs
              </li>
            </ul>
            <aside className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6">
              <h3 className="font-[var(--font-display)] text-lg text-[var(--color-ink)]">Boss Loops certification</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-ink-secondary)]">
                Certified adapters are tested against <code>@loop-engine/guards</code> and{" "}
                <code>@loop-engine/actors</code> — correct actor shapes, evidence attachment, and no guard bypass.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--color-ink-secondary)]">
                <li>✓ AIAgentActor shape and evidence</li>
                <li>✓ ActorDecisionError codes</li>
                <li>✓ Async Web Crypto promptHash</li>
                <li>✓ No unauthorized transitions</li>
              </ul>
              <a
                className="mt-4 inline-block text-sm text-[var(--color-primary)] underline underline-offset-4"
                href="mailto:oss@betterdata.co"
              >
                Apply for certification →
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* Ecosystem expansion + CTA */}
      <section
        className="border-t border-[var(--color-border)] px-4 py-14"
        style={{ background: "var(--color-surface-subtle)" }}
      >
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            eyebrow="Ecosystem expansion"
            title="Partner roadmap"
            description="Platforms and modules that extend the governed runtime — co-marketing, early roadmap access, and production deployments alongside Boss Loops."
          />
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {ecosystemExpansionPartners.map((partner) => (
              <PartnerCard key={partner.slug} partner={partner} />
            ))}
          </div>
          {/* Split by audience: design partners (buyer) vs technical partners (builder) */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="rounded-xl border border-[var(--color-primary)] bg-[var(--color-primary-light)] p-6">
              <Eyebrow>For design partners</Eyebrow>
              <h3
                className="mt-2 font-[var(--font-display)] text-[var(--color-ink)]"
                style={{ fontSize: "var(--text-xl)" }}
              >
                Design a pilot around a named decision.
              </h3>
              <p
                className="mt-3 text-[var(--color-ink-secondary)]"
                style={{ fontSize: "var(--text-sm)", lineHeight: 1.65 }}
              >
                We work with a small number of teams designing pilots around a single, consequential
                decision — invoice approval, incident routing, exception overrides, and beyond.
              </p>
              <a
                className="mt-6 inline-flex items-center rounded-lg bg-[var(--color-primary)] px-6 py-3 font-mono text-sm text-white"
                href={`${SALES_CONTACT_URL}&cta=partners-footer-pilot`}
                data-ph-cta="partners-footer-pilot"
              >
                Design a pilot →
              </a>
            </article>

            <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <Eyebrow>For technical partners</Eyebrow>
              <h3
                className="mt-2 font-[var(--font-display)] text-[var(--color-ink)]"
                style={{ fontSize: "var(--text-xl)" }}
              >
                Ship a Model Provider, Evidence Provider, Channel, or Integration.
              </h3>
              <p
                className="mt-3 text-[var(--color-ink-secondary)]"
                style={{ fontSize: "var(--text-sm)", lineHeight: 1.65 }}
              >
                For companies whose products participate in Boss Loops decisions in production —
                not generic marketplace listings.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-6 py-3 font-mono text-sm text-[var(--color-ink-secondary)]"
                  href="mailto:partners@betterdata.co"
                >
                  Become a partner
                </a>
                <Link
                  href="/docs/governance/rfc-process"
                  className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-6 py-3 font-mono text-sm text-[var(--color-ink-secondary)]"
                >
                  RFC process →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
