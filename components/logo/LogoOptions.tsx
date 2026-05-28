import type { CSSProperties, ComponentType } from "react";

/**
 * Boss Loop — three candidate marks for the "Governed Operational Cycle"
 * brand direction. None of these uses arrows, refresh icons, infinity
 * loops, or directional navigation cues. Motion is *inferred* from
 * geometry, not drawn explicitly.
 *
 * Shared design language across all three options:
 *   - Outer rounded square frame (ink)              = governance boundary
 *   - Governance teal (#0F766E)                     = operational element
 *   - Two-color discipline (ink + teal)             = legend, not decoration
 *   - 64×64 reference grid; each mark is parametric in `size`
 *
 * What differs is the *kind* of operational system being depicted:
 *   - Option 1: a continuous bounded cycle interrupted by a governance gate.
 *   - Option 2: a state-machine of supervised transitions.
 *   - Option 3: a forward-and-feedback control circuit.
 */

type MarkProps = {
  size?: number;
  inkColor?: string;
  accentColor?: string;
  className?: string;
  ariaLabel?: string;
};

const DEFAULT_INK = "var(--color-ink, #0a0f1e)";
const DEFAULT_ACCENT = "#0f766e";

const baseSvgStyle: CSSProperties = { display: "block" };

/**
 * Option 1 — Open Loop with Governance Gate
 *
 * A single rounded-square perimeter (the operational cycle) with a
 * deliberate gap on the right edge. The gap is filled by a teal
 * governance "gate" — the supervised transition point through which
 * the cycle must pass. No arrows; circulation is implied by the
 * containment shape.
 *
 *   - Frame (ink, stroke)         = bounded operational cycle
 *   - Gap on right edge           = the moment of supervision
 *   - Teal vertical bar in gap    = the governance gate
 *
 * Reads as: "a controlled circulation that passes through a checkpoint."
 * Avoids: arrow / refresh / navigation semantics.
 */
export function Option1OpenLoopMark({
  size = 64,
  inkColor = DEFAULT_INK,
  accentColor = DEFAULT_ACCENT,
  className,
  ariaLabel = "Boss Loop — open loop with governance gate",
}: MarkProps) {
  const k = size / 64;

  // Frame perimeter (rounded square at (8,8)→(56,56), rx=10), drawn
  // counterclockwise from top-of-gap → all the way around → bottom-of-gap,
  // leaving the right edge open between y=24 and y=40.
  const fx = (n: number) => n * k;
  const stroke = Math.max(1.5, 3 * k);

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

  // Governance gate — teal vertical bar centered in the right-edge gap.
  // Slightly wider than the frame stroke so it reads as a distinct
  // element bridging the gap, not a stroke artifact.
  const gateW = Math.max(2.4, 5 * k);
  const gateH = Math.max(8, 14 * k);
  const gateRx = Math.max(0.8, 1.5 * k);
  const gateX = fx(56) - gateW / 2;
  const gateY = (size - gateH) / 2;

  return (
    <svg
      aria-label={ariaLabel}
      className={className}
      height={size}
      role="img"
      style={baseSvgStyle}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={framePath}
        fill="none"
        stroke={inkColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <rect
        fill={accentColor}
        height={gateH}
        rx={gateRx}
        ry={gateRx}
        width={gateW}
        x={gateX}
        y={gateY}
      />
    </svg>
  );
}

/**
 * Option 2 — Operational State Transition
 *
 * Three discrete states arranged in a triangle, connected by transition
 * lines (no arrows). At the geometric center, a teal supervisor element
 * (rendered as a square — a different shape language than the round
 * states) presides over the system.
 *
 *   - Outer frame (ink)             = governing boundary
 *   - 3 ink circles at vertices     = operational states
 *   - 3 ink lines forming triangle  = supervised transitions
 *   - Teal square at center         = the supervisor
 *
 * Reads as: "a state machine with a central supervising authority."
 * Avoids: arrow / connector / port semantics.
 */
export function Option2StateTransitionMark({
  size = 64,
  inkColor = DEFAULT_INK,
  accentColor = DEFAULT_ACCENT,
  className,
  ariaLabel = "Boss Loop — operational state transition",
}: MarkProps) {
  const k = size / 64;
  const fx = (n: number) => n * k;
  const frameStroke = Math.max(1.5, 3 * k);
  const lineStroke = Math.max(1.2, 2.4 * k);
  const stateR = Math.max(1.8, 3 * k);

  // Triangle vertices — top center, bottom-right, bottom-left.
  const states: Array<{ cx: number; cy: number }> = [
    { cx: fx(32), cy: fx(16) },
    { cx: fx(48), cy: fx(48) },
    { cx: fx(16), cy: fx(48) },
  ];

  // Supervisor square — geometric center, distinct shape from the round
  // states. Slightly larger than a state node to read as authority.
  const supW = Math.max(5, 8 * k);
  const supH = supW;
  const supRx = Math.max(0.8, 1.5 * k);
  const supX = (size - supW) / 2;
  const supY = (size - supH) / 2;

  return (
    <svg
      aria-label={ariaLabel}
      className={className}
      height={size}
      role="img"
      style={baseSvgStyle}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* governance frame */}
      <rect
        fill="none"
        height={size - 2 * fx(8)}
        rx={fx(10)}
        ry={fx(10)}
        stroke={inkColor}
        strokeLinejoin="round"
        strokeWidth={frameStroke}
        width={size - 2 * fx(8)}
        x={fx(8)}
        y={fx(8)}
      />
      {/* triangle of supervised transitions */}
      <path
        d={
          `M ${states[0].cx} ${states[0].cy} ` +
          `L ${states[1].cx} ${states[1].cy} ` +
          `L ${states[2].cx} ${states[2].cy} Z`
        }
        fill="none"
        stroke={inkColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={lineStroke}
      />
      {/* operational states */}
      {states.map((s, i) => (
        <circle key={`state-${i}`} cx={s.cx} cy={s.cy} fill={inkColor} r={stateR} />
      ))}
      {/* supervisor — teal square at the center */}
      <rect
        fill={accentColor}
        height={supH}
        rx={supRx}
        ry={supRx}
        width={supW}
        x={supX}
        y={supY}
      />
    </svg>
  );
}

/**
 * Option 3 — Feedback System
 *
 * The classic control-circuit shape, drawn as two parallel teal tracks
 * (forward path on top, return path on bottom) joined by a teal
 * turnaround on the right. On the left, a tall ink governance unit sits
 * perpendicular to both tracks — the summing junction where execution
 * is evaluated and the next iteration is approved. No arrows; the
 * forward/return semantics are carried by the two-tier geometry alone.
 *
 *   - Outer frame (ink)                  = system boundary
 *   - Top teal track                     = forward execution path
 *   - Bottom teal track                  = feedback / evidence path
 *   - Right teal turnaround              = output → feedback transition
 *   - Left ink vertical unit             = the governing summing junction
 *
 * Reads as: "Sense → Decide → Execute → Improve, with governance on
 * the left." Avoids: arrow / pipeline / transport semantics.
 */
export function Option3FeedbackSystemMark({
  size = 64,
  inkColor = DEFAULT_INK,
  accentColor = DEFAULT_ACCENT,
  className,
  ariaLabel = "Boss Loop — feedback system",
}: MarkProps) {
  const k = size / 64;
  const fx = (n: number) => n * k;
  const frameStroke = Math.max(1.5, 3 * k);
  const trackStroke = Math.max(1.8, 4 * k);

  // Left-side governance unit — tall thin ink rect, perpendicular to
  // both tracks, positioned so the tracks visually emerge from it.
  const unitW = Math.max(3, 5 * k);
  const unitX = fx(14);
  const unitY = fx(16);
  const unitH = fx(48) - fx(16);
  const unitRx = Math.max(0.8, 1.5 * k);

  // Forward and feedback tracks — two horizontal teal lines that emerge
  // from the right edge of the unit and bend back via a right-side
  // turnaround.
  const trackXStart = unitX + unitW;
  const trackXEnd = fx(44);
  const topY = fx(22);
  const bottomY = fx(42);
  const turnRadius = (bottomY - topY) / 2;
  const turnaroundPath =
    `M ${trackXEnd} ${topY} ` +
    `A ${turnRadius} ${turnRadius} 0 0 1 ${trackXEnd} ${bottomY}`;

  return (
    <svg
      aria-label={ariaLabel}
      className={className}
      height={size}
      role="img"
      style={baseSvgStyle}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* governance frame */}
      <rect
        fill="none"
        height={size - 2 * fx(8)}
        rx={fx(10)}
        ry={fx(10)}
        stroke={inkColor}
        strokeLinejoin="round"
        strokeWidth={frameStroke}
        width={size - 2 * fx(8)}
        x={fx(8)}
        y={fx(8)}
      />
      {/* forward path — top teal track */}
      <line
        stroke={accentColor}
        strokeLinecap="round"
        strokeWidth={trackStroke}
        x1={trackXStart}
        x2={trackXEnd}
        y1={topY}
        y2={topY}
      />
      {/* feedback path — bottom teal track */}
      <line
        stroke={accentColor}
        strokeLinecap="round"
        strokeWidth={trackStroke}
        x1={trackXStart}
        x2={trackXEnd}
        y1={bottomY}
        y2={bottomY}
      />
      {/* right-side turnaround — teal arc joining the two tracks */}
      <path
        d={turnaroundPath}
        fill="none"
        stroke={accentColor}
        strokeLinecap="round"
        strokeWidth={trackStroke}
      />
      {/* governing unit — ink vertical bar on the left, perpendicular to
          both tracks, where forward and feedback paths converge. */}
      <rect
        fill={inkColor}
        height={unitH}
        rx={unitRx}
        ry={unitRx}
        width={unitW}
        x={unitX}
        y={unitY}
      />
    </svg>
  );
}

/**
 * Stacked3DMark — render a mark N-deep with progressive rotation along
 * one axis AND a per-layer translation so the loops sit in visibly
 * separated positions in 3D space, not just rotated copies overlapping
 * at the same point.
 *
 * Three axis variants are supported:
 *   - "horizontal": rotateY + translateX. Stack fans rightward like a
 *     row of dominoes leaning back into depth.
 *   - "vertical":   rotateX + translateY (downward). Stack descends like
 *     plates settling forward, each tilted further back.
 *   - "upward":     rotateZ (counter-clockwise) + translateY (upward).
 *     Stack ascends as a helix — each loop rotates counter-clockwise
 *     in-plane while rising, like a corkscrew unwinding upward.
 *
 * Geometry notes:
 *   - The spread is centered around the container's center: layer 0 is
 *     anchored on one side, the final layer on the opposite side, with
 *     layers spaced evenly in between.
 *   - Each layer is also pushed back in Z (`depthStep`) so the rotation
 *     and translation are accompanied by real perspective foreshortening.
 *   - `transformStyle: preserve-3d` on the container, plus `perspective`
 *     scaled to `size`, gives a consistent 3D illusion across scales.
 *
 * Why this is on-brand:
 *   The mark itself is a governed operational cycle. Stacking it 4-deep
 *   with separation and progressive rotation reads as "iteration over
 *   time" without resorting to motion graphics. The depth is the
 *   iteration; each layer is one revolution that has already passed
 *   through the gate.
 */
type StackedAxisVariant = "horizontal" | "vertical" | "upward";

type AxisLayout = {
  /** CSS rotation axis for each layer ("X" → rotateX, "Y" → rotateY, "Z" → rotateZ). */
  rotateAxis: "X" | "Y" | "Z";
  /**
   * Sign of the rotation per layer:
   *   - For X / Y: +1 = top tilts away, -1 = top tilts forward.
   *   - For Z:     +1 = clockwise in-plane,  -1 = counter-clockwise in-plane.
   */
  rotationSign: 1 | -1;
  /** Per-layer X translation, expressed as a fraction of `size`. */
  offsetXFraction: number;
  /** Per-layer Y translation, expressed as a fraction of `size`. Negative = upward. */
  offsetYFraction: number;
};

const AXIS_LAYOUT: Record<StackedAxisVariant, AxisLayout> = {
  horizontal: {
    rotateAxis: "Y",
    rotationSign: 1,
    offsetXFraction: 0.22,
    offsetYFraction: 0,
  },
  vertical: {
    rotateAxis: "X",
    rotationSign: 1,
    offsetXFraction: 0,
    offsetYFraction: 0.22,
  },
  // Counter-clockwise in-plane rotation (rotateZ negative) paired with an
  // upward translation produces a helical ascent — each loop spirals
  // counter-clockwise as the stack rises.
  upward: {
    rotateAxis: "Z",
    rotationSign: -1,
    offsetXFraction: 0,
    offsetYFraction: -0.22,
  },
};

type Stacked3DMarkProps = {
  Mark: ComponentType<{
    size?: number;
    inkColor?: string;
    accentColor?: string;
    className?: string;
  }>;
  /**
   * Stacking direction.
   *   - "horizontal" → rotateY + translateX (page-flip / domino fan)
   *   - "vertical"   → rotateX + translateY down (descending coin-flip)
   *   - "upward"     → rotateZ counter-clockwise + translateY up (helical ascent)
   */
  axis: StackedAxisVariant;
  /** Pixel size of each individual mark layer. Default 128. */
  size?: number;
  /** Number of stacked layers. Default 4. */
  count?: number;
  /** Degrees of rotation between successive layers. Default 15. */
  stepDegrees?: number;
  /** Z-axis offset (px) per layer; pushes back layers further into depth. Default 14. */
  depthStep?: number;
  /** Opacity decrement per layer beyond the front. Default 0.22. */
  opacityStep?: number;
  /** Override the per-layer XY spacing (px). Defaults to 0.22 × size. */
  layerSpacingPx?: number;
  inkColor?: string;
  accentColor?: string;
  className?: string;
  /** ARIA label for the wrapping container. */
  ariaLabel?: string;
};

export function Stacked3DMark({
  Mark,
  axis,
  size = 128,
  count = 4,
  stepDegrees = 15,
  depthStep = 14,
  opacityStep = 0.22,
  layerSpacingPx,
  inkColor = DEFAULT_INK,
  accentColor = DEFAULT_ACCENT,
  className,
  ariaLabel,
}: Stacked3DMarkProps) {
  const layout = AXIS_LAYOUT[axis];

  // Resolve per-layer spacing. If the caller supplies a pixel override,
  // apply its sign according to the axis's natural direction; otherwise
  // derive from the axis-specific fraction.
  const directionX = layout.offsetXFraction === 0 ? 0 : Math.sign(layout.offsetXFraction);
  const directionY = layout.offsetYFraction === 0 ? 0 : Math.sign(layout.offsetYFraction);
  const spacingPx = layerSpacingPx ?? Math.abs(layout.offsetXFraction || layout.offsetYFraction) * size;
  const offsetX = directionX * spacingPx;
  const offsetY = directionY * spacingPx;

  // Total spread from the first layer position to the last. The container
  // is sized to accommodate the spread plus one full layer, with the
  // stack centered inside it.
  const spreadX = Math.abs(offsetX) * (count - 1);
  const spreadY = Math.abs(offsetY) * (count - 1);
  const containerW = size + spreadX;
  const containerH = size + spreadY;

  const containerStyle: CSSProperties = {
    position: "relative",
    width: containerW,
    height: containerH,
    // Perspective scaled to the mark size so the 3D effect is consistent
    // across rendering scales. `transformStyle: preserve-3d` keeps each
    // layer's transform composed in 3D space rather than flattening.
    perspective: size * 4,
    transformStyle: "preserve-3d",
  };

  // Center the spread around the container midpoint: offsetIndex ranges
  // from -(count-1)/2 to +(count-1)/2 in steps of 1.
  const halfCount = (count - 1) / 2;
  const layerLeft = (containerW - size) / 2;
  const layerTop = (containerH - size) / 2;

  return (
    <div
      aria-label={ariaLabel ?? `Stacked 3D mark (${axis})`}
      className={className}
      role="img"
      style={containerStyle}
    >
      {Array.from({ length: count }).map((_, i) => {
        const offsetIndex = i - halfCount;
        const tx = offsetIndex * offsetX;
        const ty = offsetIndex * offsetY;
        const tz = -i * depthStep;
        const angle = i * stepDegrees * layout.rotationSign;

        const layerStyle: CSSProperties = {
          position: "absolute",
          width: size,
          height: size,
          left: layerLeft,
          top: layerTop,
          transform: `translate3d(${tx}px, ${ty}px, ${tz}px) rotate${layout.rotateAxis}(${angle}deg)`,
          transformOrigin: "center center",
          opacity: Math.max(0.2, 1 - i * opacityStep),
          // Hint to the browser this element will be transformed in 3D,
          // for cleaner rasterization.
          willChange: "transform",
          // No interaction needed; back layers shouldn't catch hover/clicks.
          pointerEvents: "none",
        };
        return (
          <div aria-hidden="true" key={`stack-${i}`} style={layerStyle}>
            <Mark accentColor={accentColor} inkColor={inkColor} size={size} />
          </div>
        );
      })}
    </div>
  );
}
