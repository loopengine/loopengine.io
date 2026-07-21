import type { CSSProperties, ReactNode } from "react";

/**
 * The Decision Intelligence Overlay architecture: Boss Loops reads governed
 * evidence from the warehouse/BI stack, writes exactly one object (the
 * Decision Record), delegates execution post-commit, and feeds records back
 * into the warehouse as data. Staked out per the overlay-vs-vertical-integration
 * positioning (vs platforms that build UIs/models on top of the warehouse).
 */

const label: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: "var(--text-xs)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const cardBase: CSSProperties = {
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  background: "var(--color-surface)",
  padding: "14px 16px",
};

function IoChip({ kind }: { kind: "read" | "write" }) {
  const read = kind === "read";
  return (
    <span
      style={{
        borderRadius: 999,
        padding: "2px 10px",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        background: read ? "rgba(16,185,129,0.12)" : "rgba(139,92,246,0.12)",
        color: read ? "#047857" : "#6d28d9",
        whiteSpace: "nowrap",
      }}
    >
      {read ? "Read" : "Write · post-commit"}
    </span>
  );
}

function LayerCard({
  title,
  chip,
  items,
}: {
  title: string;
  chip: ReactNode;
  items: string[];
}) {
  return (
    <div style={cardBase} className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p style={{ ...label, color: "var(--color-ink)" }}>{title}</p>
        {chip}
      </div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} style={{ fontSize: "var(--text-xs)", color: "var(--color-ink-tertiary)", lineHeight: 1.55 }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function OverlayArchitectureDiagram() {
  return (
    <div
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        background: "var(--color-surface-alt)",
        padding: "24px 20px",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          ...cardBase,
          border: "1.5px solid var(--color-primary)",
          background: "var(--color-primary-light)",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p style={{ ...label, color: "var(--color-primary-dark)" }}>
            Boss Loops — Governed Decision Intelligence overlay
          </p>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-primary-dark)", fontWeight: 500 }}>
            Govern the commit. Delegate the execution.
          </span>
        </div>
        <p style={{ marginTop: 6, fontSize: "var(--text-xs)", color: "var(--color-ink-secondary)", lineHeight: 1.6 }}>
          Reads evidence from every layer below — frozen at capture, qualification inherited from the source. Writes
          exactly one new object: <strong>the Decision Record</strong>. Nothing else of yours is rewritten.
        </p>
      </div>

      {/* Arrows */}
      <div className="grid grid-cols-3 py-2 text-center" aria-hidden>
        {["↓", "↓", "↓"].map((arrow, i) => (
          <span key={i} style={{ color: "var(--color-primary-mid)", fontSize: "var(--text-lg)" }}>
            {arrow}
          </span>
        ))}
      </div>

      {/* Three layers */}
      <div className="grid gap-3 md:grid-cols-3">
        <LayerCard
          title="Google Looker"
          chip={<IoChip kind="read" />}
          items={[
            "LookML semantic layer — your governed definitions",
            "Immutable financial KPIs as qualified evidence",
            "Stays your read-only system of definitions; “Open in Looker” remains the live surface",
          ]}
        />
        <LayerCard
          title="Snowflake Native Apps"
          chip={<IoChip kind="read" />}
          items={[
            "Secure ERP ingestion (NetSuite, SAP)",
            "Heavy Python / Snowpark compute",
            "Derived facts become evidence — with lineage",
          ]}
        />
        <LayerCard
          title="Execution rails"
          chip={<IoChip kind="write" />}
          items={[
            "ERP writeback, payment runs, CRM updates",
            "Temporal / n8n pipelines; Slack & Teams delivery",
            "Run only after the loop commits — on rails you already own",
          ]}
        />
      </div>

      {/* Base platform */}
      <div className="py-2 text-center" aria-hidden>
        <span style={{ color: "var(--color-ink-muted)" }}>↓ &nbsp; ↓ &nbsp; ↓</span>
      </div>
      <div style={{ ...cardBase, textAlign: "center", background: "var(--color-surface)" }}>
        <p style={{ ...label, color: "var(--color-ink-secondary)" }}>
          Consolidated Snowflake Cloud Data Platform
        </p>
      </div>

      {/* Flywheel */}
      <div
        className="mt-3 flex items-start gap-2 rounded-md px-3 py-2"
        style={{ background: "var(--color-surface)", border: "1px dashed var(--color-primary-mid)" }}
      >
        <span aria-hidden style={{ color: "var(--color-primary)", fontWeight: 700 }}>
          ↺
        </span>
        <p style={{ fontSize: "var(--text-xs)", color: "var(--color-ink-secondary)", lineHeight: 1.6 }}>
          <strong>The flywheel:</strong> Decision Records land back in the warehouse as first-class data — Looker
          dashboards your decisions (cycle time, automation rate, override outcomes). Our output becomes their input.
        </p>
      </div>
    </div>
  );
}
