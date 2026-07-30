import Link from "next/link";
import {
  LOOP_ENGINE_AUDITOR_LINE,
  LOOP_ENGINE_MEMORY_LINE,
  LOOP_ENGINE_MEMORY_PROBLEM,
  LOOP_ENGINE_MEMORY_SOLUTION,
  LOOP_ENGINE_META_DESCRIPTION,
  LOOP_ENGINE_PRIMARY
} from "@/lib/betterdata-ecosystem";
import { SITE, LEGACY, npmPkgUrl } from "@/lib/site-config";
import { CONTACT_PAGE, SALES_CONTACT_URL } from "@/lib/contact-routes";
import { DecisionAnatomySection } from "@/components/home/DecisionAnatomy";
import { EnterpriseStackDiagram } from "@/components/site/EnterpriseStackDiagram";
import { VisualSlot } from "@/components/site/VisualSlot";
import { WhereToGoStrip } from "@/components/site/WhereToGoStrip";

const eyebrowStyle = {
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: "var(--text-xs)",
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: "var(--color-primary)"
};

/** Latest-update cards — the newest posts from the Better Data blog. */
const LATEST_UPDATES = [
  {
    meta: "Product · May 19, 2026",
    title: "AI-Assisted Decision Loops: How Loop Engine Turns Workflows Into Governed Operational Systems",
    description:
      "How workflows become governed AI-assisted decision systems with runtime guards, human oversight, evidence capture, and continuous learning.",
    href: "https://betterdata.co/blog/ai-assisted-decision-loops-how-loop-engine-turns-workflows-into-governed-operational-systems"
  },
  {
    meta: "Announcements · Jan 12, 2026",
    title: "From Firefighting to Flow",
    description:
      "One platform to sense demand, decide allocation, execute moves, govern access, and improve over time — so your supply chain runs like a system, not a scramble.",
    href: "https://betterdata.co/blog/from-firefighting-to-flow"
  },
  {
    meta: "Better Data blog",
    title: "Architecture notes, launch updates, and adoption guidance",
    description:
      "Follow the Better Data blog for Boss Loops release notes, evidence-provider previews, and governed-decision patterns from the field.",
    href: "https://betterdata.co/blog"
  }
] as const;

/** Horizontal decision-flow patterns — a pattern, not a vertical. */
const DECISION_FLOWS = [
  {
    domain: "Life Sciences",
    name: "Lot release review",
    flow: ["Temperature excursion", "Governed release decision", "Decision Record"],
    body:
      "A monitoring signal opens the loop. Release cannot commit without validated readings and multi-party sign-off — and the record shows exactly what the reviewers saw.",
    href: "/use-cases"
  },
  {
    domain: "Finance",
    name: "Credit reviews & capital authorizations",
    flow: ["Limit exceeded", "Governed approval", "Decision Record"],
    body:
      "A request beyond threshold opens the loop. Approval requires qualified evidence and named authority — the AI recommends, the record attributes.",
    href: "/made-for/finance"
  },
  {
    domain: "Operations",
    name: "Supplier commitments & returns triage",
    flow: ["Invoice over threshold", "Governed commitment", "Decision Record"],
    body:
      "An exception opens the loop. The commitment carries frozen evidence and the exact rationale — retrievable when someone asks why, quarters later.",
    href: "/made-for/operations"
  }
] as const;

async function getGitHubStars(): Promise<number> {
  try {
    const response = await fetch(LEGACY.ghApiRepo, {
      next: { revalidate: 3600 }
    });
    if (!response.ok) {
      return 0;
    }
    const data = (await response.json()) as { stargazers_count?: number };
    return data.stargazers_count ?? 0;
  } catch {
    return 0;
  }
}

export default function Home() {
  return <HomeContent />;
}

async function HomeContent() {
  const stars = await getGitHubStars();
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE.baseUrl}/#website`,
        url: SITE.baseUrl,
        name: SITE.brandName,
        description: LOOP_ENGINE_META_DESCRIPTION,
        publisher: { "@id": `${SITE.baseUrl}/#org` }
      },
      {
        "@type": "Organization",
        "@id": `${SITE.baseUrl}/#org`,
        name: "Better Data",
        url: "https://betterdata.co",
        sameAs: [
          LEGACY.githubOrg,
          LEGACY.npmOrg,
          LEGACY.x
        ]
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE.baseUrl}/#software`,
        name: SITE.productName,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Governed Decision Intelligence",
        operatingSystem: "Node.js 18+",
        url: SITE.baseUrl,
        downloadUrl: npmPkgUrl("sdk"),
        softwareVersion: "0.1.0",
        description: LOOP_ENGINE_PRIMARY,
        license: "https://www.apache.org/licenses/LICENSE-2.0",
        author: { "@id": `${SITE.baseUrl}/#org` },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD"
        },
        codeRepository: LEGACY.github,
        programmingLanguage: "TypeScript",
        keywords:
          "governed decision intelligence, system of record for decisions, Decision Record, decision governance, auditable AI decisions, evidence providers, decision loops, deterministic guards, AI agent governance, operational accountability, TypeScript, open source"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      {/* Hero — define the category */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, var(--color-surface-alt) 0%, var(--color-surface) 100%)",
          borderBottom: "1px solid var(--color-border)"
        }}
      >
        <div className="relative mx-auto w-full max-w-[1200px] px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[860px] text-center">
            <p className="fade-in-up" style={{ animationDelay: "0ms" }}>
              <span style={eyebrowStyle}>Governed Decision Intelligence</span>
            </p>
            <h1
              className="fade-in-up mx-auto mt-3"
              style={{
                animationDelay: "80ms",
                fontSize: "clamp(var(--text-3xl), 6.5vw, var(--text-5xl))",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                maxWidth: 760
              }}
            >
              {LOOP_ENGINE_MEMORY_LINE}
            </h1>
            <p
              className="fade-in-up mx-auto mt-6"
              style={{
                animationDelay: "160ms",
                fontSize: "var(--text-md)",
                fontWeight: 500,
                color: "var(--color-ink)",
                maxWidth: 660,
                lineHeight: 1.6
              }}
            >
              {LOOP_ENGINE_MEMORY_PROBLEM}
            </p>
            <p
              className="fade-in-up mx-auto mt-4"
              style={{
                animationDelay: "220ms",
                fontSize: "var(--text-base)",
                color: "var(--color-ink-tertiary)",
                maxWidth: 660,
                lineHeight: 1.65
              }}
            >
              {LOOP_ENGINE_MEMORY_SOLUTION}
            </p>

            <div
              className="fade-in-up mt-9 flex flex-col items-stretch justify-center gap-3 min-[480px]:items-center min-[480px]:flex-row min-[480px]:flex-wrap"
              style={{ animationDelay: "280ms" }}
            >
              <a
                href={CONTACT_PAGE}
                rel="noreferrer"
                target="_blank"
                className="le-cta-button inline-flex items-center"
                style={{
                  background: "var(--color-primary)",
                  color: "#fff",
                  borderRadius: "var(--radius-sm)",
                  padding: "12px 28px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "var(--text-sm)"
                }}
              >
                Request a demo
              </a>
              <a
                href={SALES_CONTACT_URL}
                rel="noreferrer"
                target="_blank"
                className="inline-flex items-center"
                style={{
                  border: "1px solid var(--color-border)",
                  color: "var(--color-ink-secondary)",
                  borderRadius: "var(--radius-sm)",
                  padding: "12px 28px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "var(--text-sm)"
                }}
              >
                Talk to us
              </a>
            </div>
          </div>

          {/* The artifact, up front: a real Decision Record */}
          <div className="fade-in-up mx-auto mt-4 max-w-[980px]" style={{ animationDelay: "360ms" }}>
            <VisualSlot
              label="Screenshot — The Decision Record"
              caption="A closed Decision Record: the situation, the frozen evidence, the policy applied, the humans and AI who participated, and the outcome — one auditable artifact."
              src="/screenshots/decision-record-story.png"
              alt="A Boss Loops Decision Record for a supplier invoice — business object, attributed participants including an AI assistant, and the decision timeline."
            />
          </div>
        </div>
      </section>

      {/* Decision memory — what disappears when the why isn't kept */}
      <section
        style={{
          background: "var(--color-surface)",
          padding: "80px 0"
        }}
      >
        <div className="mx-auto w-full max-w-[900px] px-6 text-center md:px-10">
          <p style={eyebrowStyle}>Decision memory</p>
          <h2 className="mt-3" style={{ fontSize: "clamp(var(--text-2xl), 4vw, var(--text-4xl))", letterSpacing: "-0.02em" }}>
            &ldquo;The model said it was fine&rdquo; is not an answer.
          </h2>
          <p
            style={{
              marginTop: 20,
              fontSize: "var(--text-md)",
              color: "var(--color-ink-secondary)",
              lineHeight: 1.7
            }}
          >
            The transaction lands in the ERP. The steps land in the workflow engine. The metrics land in the BI
            stack. The decision itself — what was known, which policy applied, what the AI recommended, who judged
            it and why — evaporates into chat windows, screenshots, and threads nobody can find.
          </p>
          <p
            style={{
              marginTop: 16,
              fontSize: "var(--text-base)",
              color: "var(--color-ink-tertiary)",
              lineHeight: 1.7
            }}
          >
            What&apos;s lost is more than auditability. Institutional knowledge walks out with the people who made
            the calls. The same case gets decided differently on different days. An AI recommendation that can&apos;t
            be explained afterward is autonomy you can&apos;t extend. And you can&apos;t improve decisions you never
            captured.
          </p>
          <blockquote
            style={{
              margin: "36px auto 0",
              maxWidth: 720,
              fontFamily: "var(--font-display)",
              fontSize: "clamp(var(--text-lg), 2.6vw, var(--text-2xl))",
              lineHeight: 1.45,
              color: "var(--color-ink)"
            }}
          >
            &ldquo;{LOOP_ENGINE_AUDITOR_LINE}&rdquo;
          </blockquote>
          <p style={{ marginTop: 24, fontSize: "var(--text-base)", color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
            Boss Loops preserves organizational decision memory: evidence frozen at the moment of capture, approvals
            signed on the record, every decision answerable years later — by construction, not by discipline.
          </p>
          <p style={{ marginTop: 20, fontSize: "var(--text-sm)" }}>
            <Link href="/product/decision-record" style={{ color: "var(--color-primary)" }}>
              Inside the Decision Record →
            </Link>
          </p>
        </div>
      </section>

      {/* The anatomy of a governed decision — dark control stack */}
      <DecisionAnatomySection />

      {/* Zero-ontology — reuse, don't rebuild */}
      <section
        id="existing-semantics"
        style={{
          background: "var(--color-surface-subtle)",
          borderTop: "1px solid var(--color-border)",
          padding: "80px 0"
        }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p style={eyebrowStyle}>Your data context, unchanged</p>
              <h2 className="mt-3">Consume the semantics you already govern</h2>
              <p style={{ marginTop: 14, color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
                Your ERP holds the invoice. Snowflake and Looker hold the metric definitions your business already
                runs on. Boss Loops links to them — frozen at decision time — and records why you acted.
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  {
                    title: "No ontology project",
                    body: "No re-modeling your business to get there. You consume the metrics your business already runs on — no second definition to populate and maintain."
                  },
                  {
                    title: "Qualification inherited from the source",
                    body: "Evidence carries how governed it is. If your warehouse calls it a golden record, the auditor sees a golden record on the decision."
                  },
                  {
                    title: "Frozen, not linked",
                    body: "A link might change. Evidence is snapshotted the moment it informs a decision — so it's answerable years later."
                  }
                ].map((item) => (
                  <li key={item.title}>
                    <p style={{ fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--color-ink)" }}>
                      {item.title}
                    </p>
                    <p style={{ marginTop: 4, fontSize: "var(--text-sm)", color: "var(--color-ink-tertiary)", lineHeight: 1.65 }}>
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: 24, fontSize: "var(--text-sm)" }}>
                <Link href="/product/reuse-dont-rebuild" style={{ color: "var(--color-primary)" }}>
                  Reuse, don&apos;t rebuild →
                </Link>
              </p>
            </div>

            <div>
              <div
                className="rounded-xl border p-6 md:p-8"
                style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
              >
                <EnterpriseStackDiagram />
              </div>
              <ul className="mt-5 space-y-2">
                {[
                  { badge: "Preview", text: "Looker semantic evidence on the demo Decision Record" },
                  { badge: "Planned", text: "Snowflake governed semantic views" },
                  { badge: "Planned", text: "Samsara operational readings at decision time" }
                ].map((row) => (
                  <li key={row.text} className="flex items-center gap-3">
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 600,
                        fontSize: "var(--text-xs)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        border: "1px solid var(--color-border)",
                        borderRadius: 999,
                        padding: "3px 10px",
                        color: row.badge === "Preview" ? "var(--color-primary)" : "var(--color-ink-muted)",
                        background: "var(--color-surface)",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {row.badge}
                    </span>
                    <span style={{ color: "var(--color-ink-secondary)", fontSize: "var(--text-sm)" }}>{row.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Decision flows — a pattern, not a vertical */}
      <section
        style={{
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
          padding: "80px 0"
        }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <p style={eyebrowStyle}>A pattern, not a vertical</p>
          <h2 className="mt-3">Wherever a decision carries consequence</h2>
          <p style={{ marginTop: 12, maxWidth: 780, color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
            The same governed flow — a signal opens the loop, policy gates the commit, the record holds the answer —
            applied to the decisions your operation already makes.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {DECISION_FLOWS.map((pattern) => (
              <Link key={pattern.domain} href={pattern.href} style={{ textDecoration: "none", display: "block" }}>
                <article
                  className="flex h-full flex-col"
                  style={{
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    background: "var(--color-surface)",
                    padding: "26px 24px",
                    transition: "all var(--dur-base) var(--ease-out)"
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--color-ink-muted)"
                    }}
                  >
                    {pattern.domain}
                  </p>
                  <h3 style={{ marginTop: 8, fontSize: "var(--text-lg)", color: "var(--color-ink)" }}>{pattern.name}</h3>
                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    {pattern.flow.map((step, i) => (
                      <span key={step} className="flex items-center gap-1.5">
                        <span
                          style={{
                            border: "1px solid var(--color-border)",
                            borderRadius: 999,
                            padding: "3px 10px",
                            fontFamily: "var(--font-sans)",
                            fontSize: "var(--text-xs)",
                            fontWeight: i === pattern.flow.length - 1 ? 600 : 400,
                            color:
                              i === pattern.flow.length - 1 ? "var(--color-primary-dark)" : "var(--color-ink-secondary)",
                            background:
                              i === pattern.flow.length - 1 ? "var(--color-primary-light)" : "var(--color-surface-alt)",
                            whiteSpace: "nowrap"
                          }}
                        >
                          {step}
                        </span>
                        {i < pattern.flow.length - 1 ? (
                          <span aria-hidden style={{ color: "var(--color-primary-mid)", fontSize: "var(--text-sm)" }}>
                            →
                          </span>
                        ) : null}
                      </span>
                    ))}
                  </div>
                  <p
                    style={{
                      marginTop: 14,
                      fontSize: "var(--text-sm)",
                      color: "var(--color-ink-tertiary)",
                      lineHeight: 1.65,
                      flex: 1
                    }}
                  >
                    {pattern.body}
                  </p>
                  <p style={{ marginTop: 16, fontSize: "var(--text-sm)", color: "var(--color-primary)" }}>
                    See the pattern →
                  </p>
                </article>
              </Link>
            ))}
          </div>

          <WhereToGoStrip />
        </div>
      </section>

      {/* Trust — governance you can verify */}
      <section
        style={{
          background: "var(--color-surface-subtle)",
          borderTop: "1px solid var(--color-border)",
          padding: "80px 0"
        }}
      >
        <div className="mx-auto w-full max-w-[900px] px-6 text-center md:px-10">
          <p style={eyebrowStyle}>Governance you can verify</p>
          <h2 className="mt-3" style={{ fontSize: "clamp(var(--text-2xl), 4vw, var(--text-4xl))", letterSpacing: "-0.02em" }}>
            Governance sits on execution — not beside it.
          </h2>
          <p style={{ marginTop: 18, fontSize: "var(--text-base)", color: "var(--color-ink-tertiary)", lineHeight: 1.7 }}>
            The claims on this page aren&apos;t marketing you have to take on faith. The Boss Loops engine, the
            evidence contracts, and the conformance suite are Apache-2.0 — inspect the code, run the suite, and prove
            the invariants yourself before you trust a single consequential decision to it.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={LEGACY.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-ink)",
                borderRadius: "var(--radius-sm)",
                padding: "10px 22px",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "var(--text-sm)",
                background: "var(--color-surface)"
              }}
            >
              Inspect the engine on GitHub
            </a>
            <a
              href="https://betterdata.co/trust"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-ink)",
                borderRadius: "var(--radius-sm)",
                padding: "10px 22px",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "var(--text-sm)",
                background: "var(--color-surface)"
              }}
            >
              Trust Center
            </a>
            <Link
              href="/docs"
              className="inline-flex items-center"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-ink)",
                borderRadius: "var(--radius-sm)",
                padding: "10px 22px",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "var(--text-sm)",
                background: "var(--color-surface)"
              }}
            >
              Developer docs
            </Link>
          </div>
          <p style={{ marginTop: 16, fontSize: "var(--text-xs)", color: "var(--color-ink-muted)" }}>
            SDK install steps, package reference, and adapter guides live in the docs — where builders need them.
          </p>
        </div>
      </section>

      {/* Latest update — blog highlights */}
      <section
        style={{
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
          padding: "72px 0"
        }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p style={eyebrowStyle}>Latest update</p>
              <h2 className="mt-3">What&apos;s new at Boss Loops</h2>
            </div>
            <a
              href="https://betterdata.co/blog"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "var(--text-sm)", color: "var(--color-primary)" }}
            >
              See more →
            </a>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {LATEST_UPDATES.map((post) => (
              <a
                key={post.title}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "block" }}
              >
                <article
                  style={{
                    height: "100%",
                    padding: 32,
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    background: "var(--color-surface)",
                    transition: "all var(--dur-base) var(--ease-out)"
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--color-ink-muted)"
                    }}
                  >
                    {post.meta}
                  </p>
                  <h3 style={{ marginTop: 12, fontSize: "var(--text-lg)", color: "var(--color-ink)" }}>{post.title}</h3>
                  <p
                    style={{
                      marginTop: 10,
                      fontSize: "var(--text-base)",
                      color: "var(--color-ink-tertiary)",
                      lineHeight: 1.7
                    }}
                  >
                    {post.description}
                  </p>
                  <p style={{ marginTop: 16, fontSize: "var(--text-sm)", color: "var(--color-primary)" }}>
                    Read more →
                  </p>
                </article>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Decide today — closing CTA */}
      <section
        style={{
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
          padding: "72px 0"
        }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 text-center md:px-10">
          <h2 style={{ fontSize: "clamp(var(--text-2xl), 4vw, var(--text-4xl))", letterSpacing: "-0.02em" }}>
            Decision Intelligence runs on Boss Loops.
          </h2>
          <p
            style={{
              marginTop: 12,
              fontSize: "var(--text-md)",
              fontWeight: 500,
              color: "var(--color-ink-secondary)"
            }}
          >
            Decide today.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={CONTACT_PAGE}
              className="inline-flex items-center"
              style={{
                background: "var(--color-primary)",
                color: "#fff",
                borderRadius: "var(--radius-sm)",
                padding: "12px 28px",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "var(--text-sm)"
              }}
            >
              Get Started
            </Link>
            <a
              href={SALES_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-ink)",
                borderRadius: "var(--radius-sm)",
                padding: "12px 28px",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "var(--text-sm)"
              }}
            >
              Talk to an Expert
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: "24px 0", borderTop: "1px solid var(--color-border)" }}>
        <div
          className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-center gap-2 px-6 text-center md:px-10"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-ink-muted)"
          }}
        >
          <span>Boss Loops is an open infrastructure project created by</span>
          <a href="https://betterdata.co" rel="noreferrer" target="_blank" style={{ color: "var(--color-primary)" }}>
            Better Data
          </a>
          <span>· Apache-2.0 ·</span>
          <a href={LEGACY.github} rel="noreferrer" target="_blank">
            {stars >= 100 ? `★ ${stars}` : "GitHub →"}
          </a>
        </div>
      </section>
    </>
  );
}
