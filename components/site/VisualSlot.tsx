import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Screenshot / visual slot for marketing pages.
 * - With `src`: renders the framed screenshot (drop PNGs in public/screenshots/).
 * - Without `src`: renders a labeled placeholder so pages can ship copy-complete
 *   while assets are captured. Swap = add the file + src prop, nothing else.
 */
export function VisualSlot({
  src,
  alt,
  label,
  caption,
  children,
}: {
  src?: string;
  alt?: string;
  /** Asset name shown on the placeholder, e.g. "Screenshot — The Decision Record". */
  label: string;
  /** One-line caption rendered under the visual (real or placeholder). */
  caption?: string;
  /** Optional inline-built visual (diagram JSX) instead of an image. */
  children?: ReactNode;
}) {
  return (
    <figure style={{ margin: "32px 0 0" }}>
      {children ? (
        <div
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            background: "var(--color-surface)",
            padding: "28px 22px",
            boxShadow: "0 1px 3px rgba(15, 23, 42, 0.06)",
          }}
        >
          {children}
        </div>
      ) : src ? (
        <div
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            boxShadow: "0 8px 30px rgba(15, 23, 42, 0.08)",
            background: "var(--color-surface)",
          }}
        >
          <div
            aria-hidden
            style={{
              display: "flex",
              gap: 5,
              padding: "9px 12px",
              borderBottom: "1px solid var(--color-border)",
              background: "var(--color-surface-alt)",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{ width: 9, height: 9, borderRadius: 999, background: "var(--color-border)" }}
              />
            ))}
          </div>
          <Image
            src={src}
            alt={alt ?? label}
            width={1600}
            height={900}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      ) : (
        <div
          style={{
            border: "1.5px dashed var(--color-border)",
            borderRadius: "var(--radius-lg)",
            background: "var(--color-surface-alt)",
            padding: "56px 24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "var(--text-sm)",
              color: "var(--color-ink-muted)",
            }}
          >
            {label}
          </p>
        </div>
      )}
      {caption ? (
        <figcaption
          style={{
            marginTop: 10,
            fontSize: "var(--text-xs)",
            color: "var(--color-ink-muted)",
            lineHeight: 1.6,
          }}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
