import type { CSSProperties } from "react";
import { FidelityBadge } from "./FidelityBadge";

/**
 * Illustrative rendering of a loop's event stream — the seeded Alpine supplier
 * invoice (INV-2026-004521) as six structured events, each with sequence
 * number, timestamp, event type, and attributed actor. The footer makes the
 * replay claim: the stream IS the record.
 *
 * Use inside a <VisualSlot children=…>. Scenario details stay aligned with
 * the seeded canon (Acme Industrial Supply, PO-11983, Sarah Chen approval).
 */

type ActorKind = "system" | "ai" | "human" | "engine";

type StreamEvent = {
  seq: string;
  at: string;
  type: string;
  actor: string;
  actorKind: ActorKind;
  detail: string;
  commit?: boolean;
};

const EVENTS: StreamEvent[] = [
  {
    seq: "01",
    at: "Mon 08:42:07",
    type: "SignalReceived",
    actor: "NetSuite",
    actorKind: "system",
    detail: "Invoice INV-2026-004521 · Acme Industrial Supply · $12,481.70",
  },
  {
    seq: "02",
    at: "Mon 08:42:09",
    type: "EvidenceAttached",
    actor: "Evidence provider",
    actorKind: "system",
    detail: "PO-11983 matched · terms Net 30 · frozen at capture",
  },
  {
    seq: "03",
    at: "Mon 09:18:24",
    type: "TransitionProposed",
    actor: "Claude",
    actorKind: "ai",
    detail: "RECEIVED → APPROVED · confidence high",
  },
  {
    seq: "04",
    at: "Mon 09:18:24",
    type: "GuardEvaluated",
    actor: "Engine",
    actorKind: "engine",
    detail: "approval-authority · human approval required → routed",
  },
  {
    seq: "05",
    at: "Tue 10:12:03",
    type: "ApprovalRecorded",
    actor: "Sarah Chen",
    actorKind: "human",
    detail: "\u201CCase file complete. Release for payment.\u201D",
  },
  {
    seq: "06",
    at: "Tue 10:12:05",
    type: "TransitionCommitted",
    actor: "Engine",
    actorKind: "engine",
    detail: "PENDING_APPROVAL → APPROVED · record sealed",
    commit: true,
  },
];

const ACTOR_LABEL: Record<ActorKind, string> = {
  system: "system",
  ai: "AI actor",
  human: "human",
  engine: "runtime",
};

function actorChipStyle(kind: ActorKind): CSSProperties {
  const accent =
    kind === "human"
      ? "var(--color-primary)"
      : kind === "ai"
        ? "#7c3aed"
        : "var(--color-ink-tertiary)";
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    padding: "1px 8px",
    borderRadius: 999,
    border: `1px solid ${accent}`,
    color: accent,
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    whiteSpace: "nowrap",
  };
}

export function EventStreamDiagram({ style }: { style?: CSSProperties }) {
  return (
    <div
      style={{
        position: "relative",
        fontFamily: "var(--font-body)",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--color-ink-tertiary)",
          }}
        >
          Event stream · supplier-invoice-approval · INV-2026-004521
        </p>
        <FidelityBadge kind="seeded" />
      </div>

      <ol style={{ listStyle: "none", margin: "14px 0 0", padding: 0 }}>
        {EVENTS.map((event, i) => (
          <li
            key={event.seq}
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              gap: "6px 10px",
              padding: "9px 12px",
              borderLeft: event.commit
                ? "2px solid var(--color-primary)"
                : "2px solid var(--color-border)",
              borderBottom:
                i < EVENTS.length - 1 ? "1px solid var(--color-border)" : "none",
              background: event.commit
                ? "var(--color-primary-light, #ecfdf5)"
                : "transparent",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--color-ink-muted)",
              }}
            >
              #{event.seq}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--color-ink-tertiary)",
                minWidth: 92,
              }}
            >
              {event.at}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 600,
                color: event.commit
                  ? "var(--color-primary-dark, #065f46)"
                  : "var(--color-ink)",
                minWidth: 168,
              }}
            >
              {event.type}
            </span>
            <span style={actorChipStyle(event.actorKind)}>
              {event.actor} · {ACTOR_LABEL[event.actorKind]}
            </span>
            <span
              style={{
                flex: "1 1 220px",
                fontSize: "var(--text-xs)",
                color: "var(--color-ink-secondary)",
              }}
            >
              {event.detail}
            </span>
          </li>
        ))}
      </ol>

      <div
        style={{
          marginTop: 14,
          padding: "10px 14px",
          border: "1px dashed var(--color-primary)",
          borderRadius: 8,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--color-primary-dark, #065f46)",
        }}
      >
        replay(events #01–#06) → the loop&apos;s exact state at any moment. The
        stream is the record — nothing reconstructed from chat scrollback.
      </div>
    </div>
  );
}
