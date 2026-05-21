import Link from "next/link";
import { LAYER_DISAMBIGUATION, RUNTIME_LAYERS } from "@/lib/runtime-layers";

const LAYER_ACCENT: Record<string, string> = {
  providers: "#6366F1",
  loops: "var(--color-primary)",
  channels: "#059669",
  integrations: "#D97706",
  evidence: "#64748B"
};

/** Three runtime connection layers (excludes loops/evidence — shown in flow diagram). */
const CONNECTION_LAYERS = RUNTIME_LAYERS.filter((l) =>
  ["providers", "channels", "integrations"].includes(l.id)
);

type RuntimeLayerStackProps = {
  showDisambiguation?: boolean;
  docsHref?: string;
};

export function RuntimeLayerStack({ showDisambiguation = true, docsHref = "/docs/concepts/runtime-taxonomy" }: RuntimeLayerStackProps) {
  return (
    <div>
      {showDisambiguation ? (
        <ul
          className="mb-6 grid gap-2 rounded-xl border p-4 md:grid-cols-2"
          style={{
            borderColor: "var(--color-border)",
            background: "var(--color-surface-alt)",
            listStyle: "none",
            paddingLeft: 0,
            margin: "0 0 24px 0"
          }}
        >
          {LAYER_DISAMBIGUATION.map((line) => (
            <li
              key={line}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--color-ink-secondary)",
                lineHeight: 1.5
              }}
            >
              {line}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-3">
        {CONNECTION_LAYERS.map((layer) => (
          <article
            key={layer.id}
            style={{
              border: `1px solid var(--color-border)`,
              borderTop: `3px solid ${LAYER_ACCENT[layer.id]}`,
              borderRadius: "var(--radius-lg)",
              background: "var(--color-surface)",
              padding: "22px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              minHeight: 280
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: LAYER_ACCENT[layer.id]
                }}
              >
                {layer.tagline}
              </p>
              <h3 style={{ marginTop: 6, fontSize: "var(--text-xl)" }}>{layer.title}</h3>
            </div>
            <p style={{ color: "var(--color-ink-secondary)", lineHeight: 1.65, fontSize: "var(--text-sm)" }}>
              {layer.role}
            </p>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-ink-muted)"
                }}
              >
                Typical actions
              </p>
              <p style={{ marginTop: 6, fontSize: "var(--text-sm)", color: "var(--color-ink-tertiary)" }}>
                {layer.verbs.join(" · ")}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-ink-muted)"
                }}
              >
                Examples
              </p>
              <p style={{ marginTop: 6, fontSize: "var(--text-sm)", color: "var(--color-ink-tertiary)" }}>
                {layer.examples.join(", ")}
              </p>
            </div>
            <p
              style={{
                marginTop: "auto",
                paddingTop: 8,
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--color-ink-muted)",
                lineHeight: 1.5,
                borderTop: "1px solid var(--color-border)"
              }}
            >
              {layer.notThis}
            </p>
          </article>
        ))}
      </div>

      <p style={{ marginTop: 16, fontSize: "var(--text-sm)", color: "var(--color-ink-muted)" }}>
        <Link href={docsHref} style={{ color: "var(--color-primary)" }}>
          Runtime Taxonomy →
        </Link>{" "}
        ·{" "}
        <Link href="/docs/integrations" style={{ color: "var(--color-primary)" }}>
          Connection catalog →
        </Link>
      </p>
    </div>
  );
}
