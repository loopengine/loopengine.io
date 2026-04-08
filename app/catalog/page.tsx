import type { Metadata } from "next";

type CanonicalLoop = {
  loopId: string;
  domain: string;
  governs: string;
  packages: string;
  githubPath: string;
};

const canonicalLoops: CanonicalLoop[] = [
  {
    loopId: "scm/procurement",
    domain: "Supply Chain",
    governs: "AI-assisted PO recommendation + human approval",
    packages: "@loop-engine/sdk",
    githubPath: "scm",
  },
  {
    loopId: "scm/fulfillment",
    domain: "Supply Chain",
    governs: "Multi-step order fulfillment",
    packages: "@loop-engine/sdk",
    githubPath: "scm",
  },
  {
    loopId: "scm/quality",
    domain: "Supply Chain",
    governs: "Inspection, deviation, CAPA",
    packages: "@loop-engine/sdk",
    githubPath: "scm",
  },
  {
    loopId: "scm/replenishment",
    domain: "Supply Chain",
    governs: "Demand signal → reorder loop",
    packages: "@loop-engine/sdk",
    githubPath: "scm",
  },
  {
    loopId: "dcm/order",
    domain: "Demand Chain",
    governs: "Channel order routing",
    packages: "@loop-engine/sdk",
    githubPath: "dcm",
  },
  {
    loopId: "dcm/returns",
    domain: "Demand Chain",
    governs: "Return authorization + processing",
    packages: "@loop-engine/sdk",
    githubPath: "dcm",
  },
];

export const metadata: Metadata = {
  title: "Loop catalog - Loop Engine",
  description:
    "The Loop Engine loop catalog — canonical and community loop definitions. Not the Commerce Gateway Registry.",
  robots: { index: false, follow: false },
};

export default function CatalogPage() {
  return (
    <main className="px-4 py-12">
      <section className="mx-auto max-w-6xl">
        <h1 className="font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-4xl)]">Loop catalog</h1>
        <p className="mt-3 max-w-3xl text-[var(--color-ink-secondary)] text-base">
          Canonical loop definitions for common enterprise patterns. Import any loop into your system with one line.
        </p>
        <p className="mt-2 max-w-3xl text-[var(--color-ink-tertiary)] text-sm leading-6">
          This catalog lists <strong className="text-[var(--color-ink-secondary)]">governed workflow definitions</strong> for Loop
          Engine. It is unrelated to the{" "}
          <a
            className="text-[var(--color-primary)] underline underline-offset-4"
            href="https://commercegateway.io/registry"
            target="_blank"
            rel="noopener noreferrer"
          >
            Commerce Gateway Registry
          </a>{" "}
          (gateway discovery and verification).
        </p>
        <span className="mt-4 inline-block rounded-full bg-amber-100 px-3 py-1 font-mono text-[11px] text-amber-800 uppercase tracking-wide">
          Catalog in development
        </span>
      </section>

      <section className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-[var(--color-surface-alt)]">
              <tr>
                <th className="px-4 py-3 font-medium text-[var(--color-ink)]">Loop ID</th>
                <th className="px-4 py-3 font-medium text-[var(--color-ink)]">Domain</th>
                <th className="px-4 py-3 font-medium text-[var(--color-ink)]">What it governs</th>
                <th className="px-4 py-3 font-medium text-[var(--color-ink)]">Packages</th>
                <th className="px-4 py-3 font-medium text-[var(--color-ink)]">Definition</th>
              </tr>
            </thead>
            <tbody>
              {canonicalLoops.map((loop) => (
                <tr key={loop.loopId} className="border-[var(--color-border)] border-t">
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-ink)]">{loop.loopId}</td>
                  <td className="px-4 py-3 text-[var(--color-ink-secondary)]">{loop.domain}</td>
                  <td className="px-4 py-3 text-[var(--color-ink-secondary)]">{loop.governs}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-ink-tertiary)]">{loop.packages}</td>
                  <td className="px-4 py-3">
                    <a
                      className="text-[var(--color-primary)] underline underline-offset-4"
                      href={`https://github.com/loopengine/loop-engine/tree/main/loops/${loop.githubPath}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View definition →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h2 className="font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-2xl)]">Coming soon</h2>
        <p className="mt-3 text-[var(--color-ink-secondary)] text-sm leading-7">
          <code>catalog.loopengine.io</code> will be a searchable index of canonical and community-contributed loop definitions.
        </p>
        <p className="mt-4 text-[var(--color-ink-secondary)] text-sm">
          Want to list your loop definition in the catalog?{" "}
          <a
            className="text-[var(--color-primary)] underline underline-offset-4"
            href="https://github.com/loopengine/loop-engine/issues/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            → Open an RFC on GitHub
          </a>
        </p>
      </section>
    </main>
  );
}
