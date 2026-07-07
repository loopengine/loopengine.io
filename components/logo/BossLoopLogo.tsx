import type { CSSProperties } from "react";

/**
 * Boss Loops — visual identity (v10: "Open Loop with Governance Gate")
 *
 * The mark depicts a governed operational cycle: a single rounded
 * perimeter — the operational cycle — opened on the right by a teal
 * governance gate. The gate is the only point of supervised transition.
 * Circulation is *implied by the closed shape*; no arrow tells you where
 * to look.
 *
 *   - Outer rounded perimeter (ink) = bounded operational cycle
 *   - Gap on the right edge          = the moment of supervision
 *   - Teal vertical bar in the gap   = the governance gate
 *
 * Why no arrows:
 *   Arrows collapse the meaning into "navigation," "back," "refresh," or
 *   "return." A governed cycle is none of those things. It is a bounded
 *   iteration that passes through a checkpoint. Motion is inferred from
 *   the geometry of containment-with-interruption, not drawn explicitly.
 *
 * Color discipline (two-color split):
 *   - Ink: governance / authority / boundary (the perimeter)
 *   - Teal: the operational element being governed (the gate the cycle
 *     must pass through). Each revolution is supervised here.
 *   Color is the diagram's legend; not decoration.
 *
 * Why this resists category collisions:
 *   - Not the refresh icon (no rotational symmetry, no arrows)
 *   - Not a sync glyph (single perimeter, single gate)
 *   - Not a connector / port (gate is internal-facing, not external)
 *   - Not infinity / orbit / spin (no loops, no cycles drawn)
 *   - Distinct from rounded-square app icons (right-edge interruption
 *     is unmistakable at every size)
 *
 * Animation narrative (when animated):
 *   - The perimeter draws counterclockwise from the top of the gap, all
 *     the way around the shape, to the bottom of the gap. The cycle
 *     establishes itself.
 *   - The teal gate fades in last as the climax — the supervised
 *     transition takes its place in the gap.
 *
 * Wordmark: BOSS LOOPS, geometric sans, uppercase, tracking 0.12em.
 *
 * Anti-pattern checklist (deliberately avoided):
 *   - Arrows, arrowheads, refresh / sync / orbit glyphs
 *   - Closed loops with no governance moment (autonomous-loop problem)
 *   - Single-color motifs (color must carry meaning, not decoration)
 *   - Connectors, ports, USB-C, cable iconography
 *   - Centered targets, concentric rings, hash marks
 *   - Gradients, neon, AI-hype aesthetics
 */

type BossLoopMarkProps = {
  size?: number;
  /** Color used for the governance perimeter. Defaults to ink. */
  color?: string;
  /** Color used for the governance gate. Defaults to `color`. */
  accentColor?: string;
  animated?: boolean;
  className?: string;
};

export type LogoSize = "sm" | "md" | "lg";
export type LogoVariant = "horizontal" | "stacked";
export type LogoTheme = "light" | "dark" | "auto";

type BossLoopLogoProps = {
  size?: LogoSize;
  variant?: LogoVariant;
  theme?: LogoTheme;
  showTagline?: boolean;
  animated?: boolean;
  className?: string;
};

// Mark sizes bumped ~15% over v7 and gaps tightened ~25% so the lockup
// reads as one unified unit, not a detached icon + wordmark.
const sizeMap: Record<LogoSize, { mark: number; fontSize: number; gap: number }> = {
  sm: { mark: 30, fontSize: 14, gap: 8 },
  md: { mark: 44, fontSize: 18, gap: 11 },
  lg: { mark: 62, fontSize: 26, gap: 14 },
};

const WORDMARK_FONT_STACK =
  '"Inter Tight", "Söhne", "Geist", "IBM Plex Sans", "Manrope", "DM Sans", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif';

function resolveInkColor(theme: LogoTheme): string {
  if (theme === "dark") {
    return "var(--color-surface, #f8fafc)";
  }
  return "var(--color-ink, #0a0f1e)";
}

function resolveAccentColor(theme: LogoTheme): string {
  // Muted governance teal — calm, enterprise, "operating inside boundaries".
  // Slightly brighter on dark backgrounds for legibility.
  if (theme === "dark") {
    return "#14b8a6";
  }
  return "#0f766e";
}

/**
 * BossLoopMark — the standalone mark (no wordmark).
 *
 * Geometry is parametric in `size`. Reference grid: 64×64.
 * All visual weights have minimum thresholds so the mark stays legible at
 * favicon / 24px nav sizes.
 */
export function BossLoopMark({
  size = 40,
  color = "currentColor",
  accentColor,
  animated = false,
  className,
}: BossLoopMarkProps) {
  const k = size / 64;
  const fx = (n: number) => n * k;

  // Frame perimeter — rounded square at (8,8)→(56,56), rx=10 on the
  // 64-unit reference grid, with a 16-unit gap on the right edge centered
  // at y=32 (i.e., y=24 → y=40).
  //
  // The path is drawn counterclockwise from the top of the gap, all the
  // way around the shape, ending at the bottom of the gap. The right edge
  // is intentionally absent across y=24–40; the gate sits in that void.
  const frameStroke = Math.max(1.5, 3 * k);
  const framePath =
    `M ${fx(56)} ${fx(24)} ` +
    `L ${fx(56)} ${fx(18)} ` +
    `A ${fx(10)} ${fx(10)} 0 0 0 ${fx(46)} ${fx(8)} ` +
    `L ${fx(18)} ${fx(8)} ` +
    `A ${fx(10)} ${fx(10)} 0 0 0 ${fx(8)} ${fx(18)} ` +
    `L ${fx(8)} ${fx(46)} ` +
    `A ${fx(10)} ${fx(10)} 0 0 0 ${fx(18)} ${fx(56)} ` +
    `L ${fx(46)} ${fx(56)} ` +
    `A ${fx(10)} ${fx(10)} 0 0 0 ${fx(56)} ${fx(46)} ` +
    `L ${fx(56)} ${fx(40)}`;

  // Approximate path length for the stroke-dash draw animation:
  //   3 full edges (top, left, bottom) of length (size - 2·8 - 2·10) = 28 each
  // + 4 quarter-arcs (each π·r/2)
  // + 2 partial right-edge segments of length 6 each
  const fullEdge = size - 2 * fx(8) - 2 * fx(10);
  const framePathLength =
    3 * fullEdge + 4 * ((Math.PI * fx(10)) / 2) + 2 * fx(6);

  // Governance gate — teal vertical bar centered in the right-edge gap.
  // Slightly wider than the frame stroke so it reads as a distinct
  // bridging element, not a stroke artifact.
  const gateW = Math.max(2.4, 5 * k);
  const gateH = Math.max(8, 14 * k);
  const gateRx = Math.max(0.8, 1.5 * k);
  const gateX = fx(56) - gateW / 2;
  const gateY = (size - gateH) / 2;

  const resolvedAccent = accentColor ?? color;

  return (
    <svg
      aria-label="Boss Loops mark"
      className={className}
      height={size}
      role="img"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* governance perimeter — bounded operational cycle, opened on the
          right edge for the supervised transition */}
      <path
        className={animated ? "le-logo-arrow" : undefined}
        d={framePath}
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={frameStroke}
        style={
          animated
            ? ({
                strokeDasharray: framePathLength,
                strokeDashoffset: framePathLength,
                ["--dash" as const]: `${framePathLength}`,
                animationDelay: "0ms",
                animationDuration: "640ms",
              } as CSSProperties)
            : undefined
        }
      />

      {/* governance gate — teal element bridging the gap. Climax of the
          animation; the supervised transition takes its place last. */}
      <rect
        className={animated ? "le-logo-node" : undefined}
        fill={resolvedAccent}
        height={gateH}
        rx={gateRx}
        ry={gateRx}
        style={animated ? { animationDelay: "560ms" } : undefined}
        width={gateW}
        x={gateX}
        y={gateY}
      />
    </svg>
  );
}

export function BossLoopLogo({
  size = "md",
  variant = "horizontal",
  theme = "auto",
  showTagline = false,
  animated = false,
  className,
}: BossLoopLogoProps) {
  const dimensions = sizeMap[size];
  const inkColor = resolveInkColor(theme);
  const accentColor = resolveAccentColor(theme);
  const tmColor = "var(--color-ink-muted, #94a3b8)";

  const containerStyle: CSSProperties =
    variant === "stacked"
      ? {
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: dimensions.gap * 0.6,
        }
      : {
          display: "inline-flex",
          alignItems: "center",
          gap: dimensions.gap,
        };

  const wordmarkStyle: CSSProperties = {
    fontFamily: WORDMARK_FONT_STACK,
    fontWeight: 600,
    fontSize: `${dimensions.fontSize}px`,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: inkColor,
    lineHeight: 1,
    fontFeatureSettings: '"ss01", "cv11"',
  };

  return (
    <div className={className} style={containerStyle}>
      <BossLoopMark
        accentColor={accentColor}
        animated={animated}
        color={inkColor}
        size={dimensions.mark}
      />

      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          gap: showTagline ? 4 : 0,
          alignItems: variant === "stacked" ? "center" : "flex-start",
        }}
      >
        <span style={wordmarkStyle}>
          Boss<span style={{ marginLeft: "0.20em" }}>Loops</span>
          <sup
            style={{
              fontSize: "48%",
              color: tmColor,
              verticalAlign: "0.3em",
              marginLeft: "0.05em",
              letterSpacing: "0.02em",
              fontWeight: 500,
            }}
          >
            ™
          </sup>
        </span>
        {showTagline ? (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-ink-tertiary)",
            }}
          >
            Governed Decision Intelligence
          </span>
        ) : null}
      </div>
    </div>
  );
}
