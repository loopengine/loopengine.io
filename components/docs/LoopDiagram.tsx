type DiagramState = {
  id: string;
  isTerminal?: boolean;
  isError?: boolean;
};

type DiagramTransition = {
  from: string;
  to: string;
  label: string;
};

type LoopDiagramProps = {
  states: DiagramState[];
  transitions: DiagramTransition[];
  currentState?: string;
  width?: number;
};

type Point = { x: number; y: number };

function buildLayout(states: DiagramState[], width: number): Record<string, Point> {
  const pad = 70;
  const linear = states.length <= 4;
  const points: Record<string, Point> = {};
  if (linear) {
    const step = Math.max(120, (width - pad * 2) / Math.max(1, states.length - 1));
    states.forEach((state, index) => {
      points[state.id] = { x: pad + step * index, y: 140 };
    });
    return points;
  }

  const center = { x: width / 2, y: 160 };
  const radius = Math.max(90, Math.min(140, width / 3.2));
  states.forEach((state, index) => {
    const angle = (index / states.length) * Math.PI * 2 - Math.PI / 2;
    points[state.id] = {
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle)
    };
  });
  return points;
}

export function LoopDiagram({ states, transitions, currentState, width = 600 }: LoopDiagramProps) {
  const points = buildLayout(states, width);
  const height = states.length <= 4 ? 260 : 340;

  return (
    <div style={{ maxWidth: "100%", overflowX: "auto", margin: "24px 0" }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        style={{ maxWidth: "100%", height: "auto", display: "block" }}
        role="img"
        aria-label="Loop state diagram"
      >
        <defs>
          <marker id="docs-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L0,8 L8,4 z" fill="var(--color-primary)" />
          </marker>
          <filter id="state-glow">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="var(--color-primary)" floodOpacity="0.45" />
          </filter>
        </defs>

        {transitions.map((transition) => {
          const from = points[transition.from];
          const to = points[transition.to];
          if (!from || !to) return null;
          const mx = (from.x + to.x) / 2;
          const my = (from.y + to.y) / 2 - 10;
          return (
            <g key={`${transition.from}-${transition.to}-${transition.label}`}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="var(--color-primary)"
                strokeWidth="1.5"
                markerEnd="url(#docs-arrow)"
                opacity="0.85"
              />
              <text x={mx} y={my} textAnchor="middle" fontSize="11" fill="var(--color-ink-tertiary)" fontFamily="var(--font-mono)">
                {transition.label}
              </text>
            </g>
          );
        })}

        {states.map((state) => {
          const point = points[state.id];
          if (!point) return null;
          const isCurrent = state.id === currentState;
          const fill = state.isError ? "rgba(239,68,68,0.2)" : "var(--color-surface)";
          const stroke = isCurrent ? "var(--color-primary)" : "var(--color-border)";
          return (
            <g key={state.id} transform={`translate(${point.x},${point.y})`} filter={isCurrent ? "url(#state-glow)" : undefined}>
              <circle r="24" fill={fill} stroke={stroke} strokeWidth={isCurrent ? 2.5 : 2} />
              {state.isTerminal ? (
                <circle r="28" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.8" />
              ) : null}
              <text
                y="4"
                textAnchor="middle"
                fontSize="10"
                fontFamily="var(--font-mono)"
                fill="var(--color-ink-secondary)"
              >
                {state.id}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
