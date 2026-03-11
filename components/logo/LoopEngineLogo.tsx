import type { CSSProperties } from "react";

type LoopEngineIconProps = {
  size?: number;
  color?: string;
  animated?: boolean;
  className?: string;
};

export type LogoSize = "sm" | "md" | "lg";
export type LogoVariant = "horizontal" | "stacked";
export type LogoTheme = "light" | "dark" | "auto";

type LoopEngineLogoProps = {
  size?: LogoSize;
  variant?: LogoVariant;
  theme?: LogoTheme;
  showTagline?: boolean;
  animated?: boolean;
  className?: string;
};

const sizeMap: Record<LogoSize, { icon: number; fontSize: number; gap: number }> = {
  sm: { icon: 24, fontSize: 16, gap: 10 },
  md: { icon: 36, fontSize: 22, gap: 14 },
  lg: { icon: 52, fontSize: 30, gap: 18 },
};

function resolveThemeColor(theme: LogoTheme): string {
  if (theme === "dark") {
    return "var(--color-surface)";
  }
  return "var(--color-ink)";
}

export function LoopEngineIcon({
  size = 40,
  color = "currentColor",
  animated = false,
  className,
}: LoopEngineIconProps) {
  const pad = size * 0.2;
  const r = size * 0.085;
  const strokeWidth = size * 0.04;
  const min = pad + r;
  const max = size - pad - r;
  const arrowLength = max - min;

  const nodes = [
    { cx: pad, cy: pad, delay: 0 },
    { cx: size - pad, cy: pad, delay: 100 },
    { cx: size - pad, cy: size - pad, delay: 200 },
    { cx: pad, cy: size - pad, delay: 300 },
  ];

  const arrows = [
    { x1: min, y1: pad, x2: max, y2: pad, delay: 120 },
    { x1: size - pad, y1: min, x2: size - pad, y2: max, delay: 220 },
    { x1: max, y1: size - pad, x2: min, y2: size - pad, delay: 320 },
    { x1: pad, y1: max, x2: pad, y2: min, delay: 420 },
  ];

  return (
    <svg
      aria-label="Loop Engine icon"
      className={className}
      height={size}
      role="img"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id={`le-arrow-${size}`}
          markerHeight={strokeWidth * 2}
          markerUnits="strokeWidth"
          markerWidth={strokeWidth * 2}
          orient="auto"
          refX={strokeWidth * 1.4}
          refY={strokeWidth}
        >
          <path d={`M0,0 L0,${strokeWidth * 2} L${strokeWidth * 1.8},${strokeWidth} z`} fill={color} />
        </marker>
      </defs>

      {arrows.map((arrow, index) => {
        const style: CSSProperties | undefined = animated
          ? ({
              strokeDasharray: arrowLength,
              strokeDashoffset: arrowLength,
              ["--dash" as const]: `${arrowLength}`,
              animationDelay: `${arrow.delay}ms`,
            } as CSSProperties)
          : undefined;
        return (
          <line
            key={`arrow-${index}`}
            className={animated ? "le-logo-arrow" : undefined}
            markerEnd={`url(#le-arrow-${size})`}
            stroke={color}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            style={style}
            x1={arrow.x1}
            x2={arrow.x2}
            y1={arrow.y1}
            y2={arrow.y2}
          />
        );
      })}

      {nodes.map((node, index) => (
        <circle
          key={`node-${index}`}
          className={animated ? "le-logo-node" : undefined}
          cx={node.cx}
          cy={node.cy}
          fill={color}
          r={r}
          style={animated ? { animationDelay: `${node.delay}ms` } : undefined}
        />
      ))}
    </svg>
  );
}

export function LoopEngineLogo({
  size = "md",
  variant = "horizontal",
  theme = "auto",
  showTagline = false,
  animated = false,
  className,
}: LoopEngineLogoProps) {
  const dimensions = sizeMap[size];
  const wordmarkColor = resolveThemeColor(theme);
  const iconColor = theme === "dark" ? "var(--color-primary-mid)" : "var(--color-primary)";
  const tmColor = "var(--color-ink-muted)";

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
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: `${dimensions.fontSize}px`,
    letterSpacing: "-0.02em",
    color: wordmarkColor,
    lineHeight: 1,
  };

  return (
    <div className={className} style={containerStyle}>
      <LoopEngineIcon animated={animated} color={iconColor} size={dimensions.icon} />

      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          gap: showTagline ? 4 : 0,
          alignItems: variant === "stacked" ? "center" : "flex-start",
        }}
      >
        <span style={wordmarkStyle}>
          Loop Engine
          <sup
            style={{
              fontSize: "55%",
              color: tmColor,
              verticalAlign: "super",
              marginLeft: 2,
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
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-ink-tertiary)",
            }}
          >
            Open Runtime · MIT Licensed
          </span>
        ) : null}
      </div>
    </div>
  );
}
