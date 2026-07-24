import type { CSSProperties } from "react";
import { FidelityBadge } from "./FidelityBadge";

/**
 * Illustrative rendering of a governed decision loop as a state machine.
 * Ships the Alpine invoice-approval scenario:
 *
 *   OPENED → PENDING_APPROVAL → APPROVED
 *                            → REJECTED
 *                            → ESCALATED
 *
 * The transition PENDING_APPROVAL → APPROVED is highlighted with the active
 * guards annotated below the diagram. The APPROVED state is styled with the
 * brand-primary tone so the "governed happy path" reads at a glance.
 *
 * Use inside a <VisualSlot children=…> until a real product screenshot is
 * captured for this concept.
 */

type Node = {
  x: number;
  y: number;
  label: string;
  variant?: "default" | "approved" | "rejected" | "escalated";
};

const NODE_W = 148;
const NODE_H = 40;

const NODES: Node[] = [
  { x: 20, y: 110, label: "OPENED" },
  { x: 236, y: 110, label: "PENDING_APPROVAL" },
  { x: 500, y: 20, label: "APPROVED", variant: "approved" },
  { x: 500, y: 110, label: "REJECTED", variant: "rejected" },
  { x: 500, y: 200, label: "ESCALATED", variant: "escalated" },
];

function nodeFill(variant: Node["variant"]): string {
  if (variant === "approved") return "var(--color-primary-light, #ecfdf5)";
  if (variant === "escalated") return "var(--color-surface-alt, #fef3c7)";
  return "var(--color-surface)";
}

function nodeStroke(variant: Node["variant"]): string {
  if (variant === "approved") return "var(--color-primary)";
  return "var(--color-border)";
}

function nodeTextFill(variant: Node["variant"]): string {
  if (variant === "approved") return "var(--color-primary-dark, #065f46)";
  return "var(--color-ink)";
}

export function LoopStateMachineDiagram({ style }: { style?: CSSProperties }) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        fontFamily: "var(--font-body)",
        ...style,
      }}
    >
      <div style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}>
        <FidelityBadge kind="seeded" />
      </div>

      <svg
        viewBox="0 0 660 260"
        role="img"
        aria-label="Supplier invoice approval loop — state machine"
        style={{ width: "100%", height: "auto", display: "block", marginTop: 8 }}
      >
        <defs>
          <marker
            id="arrow-default"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-ink-tertiary)" />
          </marker>
          <marker
            id="arrow-primary"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-primary)" />
          </marker>
        </defs>

        {/* Transitions */}
        {/* OPENED → PENDING_APPROVAL */}
        <line
          x1="168"
          y1="130"
          x2="236"
          y2="130"
          stroke="var(--color-ink-tertiary)"
          strokeWidth="1.5"
          markerEnd="url(#arrow-default)"
        />
        {/* PENDING_APPROVAL → APPROVED (governed happy path) */}
        <path
          d="M 384 122 C 440 122, 452 44, 500 40"
          stroke="var(--color-primary)"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#arrow-primary)"
        />
        {/* PENDING_APPROVAL → REJECTED */}
        <line
          x1="384"
          y1="130"
          x2="500"
          y2="130"
          stroke="var(--color-ink-tertiary)"
          strokeWidth="1.5"
          markerEnd="url(#arrow-default)"
        />
        {/* PENDING_APPROVAL → ESCALATED */}
        <path
          d="M 384 138 C 440 138, 452 216, 500 220"
          stroke="var(--color-ink-tertiary)"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#arrow-default)"
        />

        {/* Nodes */}
        {NODES.map((node) => (
          <g key={node.label}>
            <rect
              x={node.x}
              y={node.y}
              width={NODE_W}
              height={NODE_H}
              rx={6}
              ry={6}
              fill={nodeFill(node.variant)}
              stroke={nodeStroke(node.variant)}
              strokeWidth="1.5"
            />
            <text
              x={node.x + NODE_W / 2}
              y={node.y + NODE_H / 2 + 4}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="12"
              fill={nodeTextFill(node.variant)}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Active guards on the governed happy-path transition */}
      <div
        style={{
          padding: "12px 14px",
          border: "1px solid var(--color-primary)",
          borderRadius: 8,
          background: "var(--color-primary-light, #ecfdf5)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--color-primary-dark, #065f46)",
            margin: 0,
          }}
        >
          Active guards · PENDING_APPROVAL → APPROVED
        </p>
        <div
          style={{
            marginTop: 8,
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          {[
            "AI confidence ≥ 0.85",
            "evidence: Looker + NetSuite + Slack",
            "authority: Tier B · Approval Matrix v3.2",
          ].map((rule) => (
            <span
              key={rule}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "4px 10px",
                borderRadius: 999,
                border: "1px solid var(--color-primary)",
                background: "var(--color-surface)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--color-ink)",
                whiteSpace: "nowrap",
              }}
            >
              {rule}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
