import type { Metadata } from "next";
import Link from "next/link";
import {
  BossLoopMark,
  Option1OpenLoopMark,
  Option2StateTransitionMark,
  Option3FeedbackSystemMark,
  Stacked3DMark,
} from "@/components/logo";

export const metadata: Metadata = {
  title: "Brand — Logo Mark Options",
  description:
    "Three candidate marks for the governed-operational-cycle direction. No arrows, no refresh icons, no infinity loops.",
  robots: { index: false, follow: false },
};

type OptionId = "open-loop" | "state-transition" | "feedback-system";

type OptionDef = {
  id: OptionId;
  number: 1 | 2 | 3;
  title: string;
  subtitle: string;
  diagramReads: string;
  description: string;
  saysWhat: string[];
  avoidsWhat: string[];
  fivePillarsAlignment: string;
  Mark: React.ComponentType<{
    size?: number;
    inkColor?: string;
    accentColor?: string;
    className?: string;
  }>;
};

const OPTIONS: OptionDef[] = [
  {
    id: "open-loop",
    number: 1,
    title: "Open Loop with Governance Gate",
    subtitle: "A bounded operational cycle with one supervised transition.",
    diagramReads: "Continuity, interrupted by a checkpoint.",
    description:
      "A single rounded perimeter — the operational cycle — opened on the right by a teal governance gate. The gate is the only point of supervised transition. Circulation is implied by the closed shape; no arrow tells you where to look.",
    saysWhat: [
      "Cycles are bounded, not autonomous",
      "Every revolution passes through governance",
      "One element controls passage",
      "Most ownable: distinct from refresh / sync glyphs",
    ],
    avoidsWhat: [
      "Arrow / navigation / refresh semantics",
      "Recursion or infinity iconography",
      "Connector / port / cable reads",
      "Hub-and-spoke supervision (this is perimeter supervision)",
    ],
    fivePillarsAlignment:
      "Maps cleanly to GOVERN. Sense / Decide / Execute / Improve happen along the perimeter; the gate is the moment of governance.",
    Mark: Option1OpenLoopMark,
  },
  {
    id: "state-transition",
    number: 2,
    title: "Operational State Transition",
    subtitle: "A state machine with a central supervising authority.",
    diagramReads: "Discrete states, supervised transitions, central authority.",
    description:
      "Three operational states form a triangle of transitions inside the governance frame. At the center, a teal square — different shape language than the round states — presides over the system. The supervisor doesn't intervene in transitions; it watches.",
    saysWhat: [
      "Operations as a finite set of supervised states",
      "Transitions are explicit and bounded",
      "Authority sits at the center, watches the system",
      "Reads as control theory / state-machine / FSM",
    ],
    avoidsWhat: [
      "Linear pipeline or workflow tooling",
      "Spinning / refreshing / cycling motion",
      "Infrastructure / wiring / circuitry",
      "Hub-and-spoke (supervisor doesn't connect to states)",
    ],
    fivePillarsAlignment:
      "Maps to actors / guards / transitions language — the state machine that already underlies Boss architecture. Most differentiated visually; closest to a finite-state-machine icon.",
    Mark: Option2StateTransitionMark,
  },
  {
    id: "feedback-system",
    number: 3,
    title: "Feedback System",
    subtitle: "Forward path + return path + governance unit.",
    diagramReads: "Two-tier circuit: execution above, evidence below, governed on the left.",
    description:
      "Two parallel teal tracks — forward execution on top, feedback / evidence on the bottom — joined by a teal turnaround on the right. On the left, an ink governance unit sits perpendicular to both tracks: the summing junction where execution is evaluated and the next iteration is approved.",
    saysWhat: [
      "Sense → Decide → Execute → Improve, drawn literally",
      "Forward and return paths are visibly distinct",
      "Governance is the summing junction, not an afterthought",
      "Closest to control-theory feedback diagrams",
    ],
    avoidsWhat: [
      "Arrows on tracks (motion is two-tier geometry, not direction)",
      "Single-loop simplification (here, two paths are explicit)",
      "Connector / pipeline / transport reads",
      "Centered authority (here, authority is at the input boundary)",
    ],
    fivePillarsAlignment:
      "Direct visual translation of the Five Pillars. The strongest strategic alignment to 'governed AI operations' — but also the most diagrammatic, requires the most cognitive effort to parse at small sizes.",
    Mark: Option3FeedbackSystemMark,
  },
];

const SIZES: Array<{ size: number; label: string; useCase: string }> = [
  { size: 16, label: "16px", useCase: "Favicon / browser tab" },
  { size: 32, label: "32px", useCase: "Nav bar inline" },
  { size: 64, label: "64px", useCase: "Card / feature mark" },
  { size: 128, label: "128px", useCase: "Hero / brand panel" },
];

const WORDMARK_FONT_STACK =
  '"Inter Tight", "Söhne", "Geist", "IBM Plex Sans", "Manrope", "DM Sans", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif';

function WordmarkLockup({
  Mark,
  theme,
  scale = "md",
}: {
  Mark: OptionDef["Mark"];
  theme: "light" | "dark";
  scale?: "sm" | "md" | "lg";
}) {
  const dims = {
    sm: { mark: 30, fontSize: 14, gap: 8 },
    md: { mark: 44, fontSize: 18, gap: 11 },
    lg: { mark: 62, fontSize: 26, gap: 14 },
  }[scale];

  const inkColor = theme === "dark" ? "#f8fafc" : "#0a0f1e";
  const accentColor = theme === "dark" ? "#14b8a6" : "#0f766e";
  const tmColor = theme === "dark" ? "#94a3b8" : "#94a3b8";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: dims.gap,
        padding: "12px 16px",
        borderRadius: 10,
        background: theme === "dark" ? "#0f172a" : "#ffffff",
        border: `1px solid ${theme === "dark" ? "#1e293b" : "#e2e8f0"}`,
      }}
    >
      <Mark accentColor={accentColor} inkColor={inkColor} size={dims.mark} />
      <span
        style={{
          fontFamily: WORDMARK_FONT_STACK,
          fontWeight: 600,
          fontSize: `${dims.fontSize}px`,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: inkColor,
          lineHeight: 1,
        }}
      >
        Boss<span style={{ marginLeft: "0.20em" }}>Loop</span>
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
    </div>
  );
}

function SizeChip({
  Mark,
  size,
  label,
  useCase,
  theme,
}: {
  Mark: OptionDef["Mark"];
  size: number;
  label: string;
  useCase: string;
  theme: "light" | "dark";
}) {
  const inkColor = theme === "dark" ? "#f8fafc" : "#0a0f1e";
  const accentColor = theme === "dark" ? "#14b8a6" : "#0f766e";
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex items-center justify-center rounded-md"
        style={{
          width: 144,
          height: 144,
          background: theme === "dark" ? "#0f172a" : "#ffffff",
          border: `1px solid ${theme === "dark" ? "#1e293b" : "#e2e8f0"}`,
        }}
      >
        <Mark accentColor={accentColor} inkColor={inkColor} size={size} />
      </div>
      <div className="text-center">
        <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink)]">
          {label}
        </div>
        <div className="text-[11px] text-[var(--color-ink-tertiary)]">{useCase}</div>
      </div>
    </div>
  );
}

function OptionCard({ option }: { option: OptionDef }) {
  const { Mark } = option;
  return (
    <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
      <header className="mb-6 flex items-baseline gap-3 border-b border-[var(--color-border)] pb-4">
        <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink-tertiary)]">
          Option {option.number}
        </span>
        <h2 className="text-[var(--text-xl)] font-semibold text-[var(--color-ink)]">
          {option.title}
        </h2>
      </header>

      <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink-tertiary)]">
        Reads as
      </p>
      <p className="mb-6 text-[var(--text-base)] leading-7 text-[var(--color-ink-secondary)]">
        {option.diagramReads}
      </p>

      <p className="mb-6 text-[var(--text-base)] leading-7 text-[var(--color-ink)]">
        {option.description}
      </p>

      <div className="mb-8">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink-tertiary)]">
          Sizes — light theme
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SIZES.map((s) => (
            <SizeChip
              Mark={Mark}
              key={`${option.id}-${s.size}-light`}
              label={s.label}
              size={s.size}
              theme="light"
              useCase={s.useCase}
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink-tertiary)]">
          Sizes — dark theme
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SIZES.map((s) => (
            <SizeChip
              Mark={Mark}
              key={`${option.id}-${s.size}-dark`}
              label={s.label}
              size={s.size}
              theme="dark"
              useCase={s.useCase}
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink-tertiary)]">
          Wordmark lockups
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <WordmarkLockup Mark={Mark} scale="sm" theme="light" />
          <WordmarkLockup Mark={Mark} scale="md" theme="light" />
          <WordmarkLockup Mark={Mark} scale="md" theme="dark" />
          <WordmarkLockup Mark={Mark} scale="lg" theme="light" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 border-t border-[var(--color-border)] pt-6 md:grid-cols-2">
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-emerald-700">
            What it says
          </p>
          <ul className="space-y-1.5 text-[var(--text-sm)] leading-6 text-[var(--color-ink)]">
            {option.saysWhat.map((s, i) => (
              <li key={`says-${i}`} className="flex gap-2">
                <span className="text-emerald-600">+</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-rose-700">
            What it avoids
          </p>
          <ul className="space-y-1.5 text-[var(--text-sm)] leading-6 text-[var(--color-ink)]">
            {option.avoidsWhat.map((s, i) => (
              <li key={`avoids-${i}`} className="flex gap-2">
                <span className="text-rose-500">−</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4">
        <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink-tertiary)]">
          Five Pillars alignment
        </p>
        <p className="text-[var(--text-sm)] leading-6 text-[var(--color-ink-secondary)]">
          {option.fivePillarsAlignment}
        </p>
      </div>
    </article>
  );
}

function ThreeDStack({
  axis,
  theme,
  caption,
}: {
  axis: "horizontal" | "vertical" | "upward";
  theme: "light" | "dark";
  caption: string;
}) {
  const inkColor = theme === "dark" ? "#f8fafc" : "#0a0f1e";
  const accentColor = theme === "dark" ? "#14b8a6" : "#0f766e";
  const surfaceColor = theme === "dark" ? "#0f172a" : "#ffffff";
  const borderColor = theme === "dark" ? "#1e293b" : "#e2e8f0";
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="flex items-center justify-center overflow-hidden rounded-lg"
        style={{
          width: 360,
          height: 320,
          background: surfaceColor,
          border: `1px solid ${borderColor}`,
        }}
      >
        <Stacked3DMark
          Mark={Option1OpenLoopMark}
          accentColor={accentColor}
          axis={axis}
          inkColor={inkColor}
          size={150}
        />
      </div>
      <p className="text-center text-[var(--text-sm)] leading-6 text-[var(--color-ink-secondary)]">
        {caption}
      </p>
    </div>
  );
}

const THREE_D_VARIANTS: Array<{
  axis: "horizontal" | "vertical" | "upward";
  heading: string;
  description: string;
  lightCaption: string;
  darkCaption: string;
}> = [
  {
    axis: "horizontal",
    heading: "Horizontal axis (rotateY) — page-flip depth",
    description:
      "Each layer translates rightward and tilts further away around the vertical Y-axis. Reads as a row of dominoes leaning back into the distance.",
    lightCaption: "Light · 4 × 15° rotateY, +X spacing",
    darkCaption: "Dark · 4 × 15° rotateY, +X spacing",
  },
  {
    axis: "vertical",
    heading: "Vertical axis (rotateX) — descending coin-flip",
    description:
      "Each layer drops downward and tilts further back around the horizontal X-axis. Reads as plates settling forward over time, the latest revolutions sinking into the past.",
    lightCaption: "Light · 4 × 15° rotateX, +Y spacing (down)",
    darkCaption: "Dark · 4 × 15° rotateX, +Y spacing (down)",
  },
  {
    axis: "upward",
    heading: "Rotating upward (rotateZ counter-clockwise) — helical ascent",
    description:
      "Each layer rises upward and rotates counter-clockwise in-plane around the Z-axis — the same motion direction shown by a classic counter-clockwise arrow. Reads as a corkscrew unwinding upward: operational cycles spiraling open as the stack ascends, the gate sweeping from 3 o'clock toward 12 o'clock with each revolution.",
    lightCaption: "Light · 4 × −15° rotateZ (CCW), −Y spacing (up)",
    darkCaption: "Dark · 4 × −15° rotateZ (CCW), −Y spacing (up)",
  },
];

function ThreeDStudies() {
  return (
    <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
      <header className="mb-6 flex items-baseline gap-3 border-b border-[var(--color-border)] pb-4">
        <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink-tertiary)]">
          Option 1 — exploration
        </span>
        <h2 className="text-[var(--text-xl)] font-semibold text-[var(--color-ink)]">
          3D depth studies — stacked rotation
        </h2>
      </header>

      <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink-tertiary)]">
        Concept
      </p>
      <p className="mb-6 max-w-3xl text-[var(--text-base)] leading-7 text-[var(--color-ink-secondary)]">
        The Option 1 mark rendered four-deep, with each successive layer rotated 15° more than the
        previous one around a single axis <em>and</em> translated along that axis so the loops
        stack with visible space between them. CSS perspective produces the foreshortening;
        opacity steps down toward the back layers to convey depth. Read as{" "}
        <em>iteration over time</em> — each layer is one revolution that has already passed
        through the gate.
      </p>

      <div className="space-y-12">
        {THREE_D_VARIANTS.map((v) => (
          <section key={v.axis}>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink-tertiary)]">
              {v.heading}
            </p>
            <p className="mb-5 max-w-3xl text-[var(--text-sm)] leading-6 text-[var(--color-ink-secondary)]">
              {v.description}
            </p>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ThreeDStack axis={v.axis} caption={v.lightCaption} theme="light" />
              <ThreeDStack axis={v.axis} caption={v.darkCaption} theme="dark" />
            </div>
          </section>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 border-t border-[var(--color-border)] pt-6 md:grid-cols-2">
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-emerald-700">
            What it adds
          </p>
          <ul className="space-y-1.5 text-[var(--text-sm)] leading-6 text-[var(--color-ink)]">
            <li className="flex gap-2">
              <span className="text-emerald-600">+</span>
              <span>Iteration semantics without resorting to motion graphics</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">+</span>
              <span>Reads as &ldquo;multiple revolutions stacked over time&rdquo;</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">+</span>
              <span>Same primitive as the canonical mark — full backward compatibility</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">+</span>
              <span>Three directional variants for different brand-panel uses</span>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-rose-700">
            Where it doesn&rsquo;t fit
          </p>
          <ul className="space-y-1.5 text-[var(--text-sm)] leading-6 text-[var(--color-ink)]">
            <li className="flex gap-2">
              <span className="text-rose-500">−</span>
              <span>Favicon / 16px contexts (back layers turn to mush)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-rose-500">−</span>
              <span>Inline nav-bar lockups (loses the canonical mark&rsquo;s clarity)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-rose-500">−</span>
              <span>Brand stamps where unambiguous identification matters</span>
            </li>
            <li className="flex gap-2">
              <span className="text-rose-500">−</span>
              <span>Print / monochrome contexts (depth depends on opacity layering)</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4">
        <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink-tertiary)]">
          API
        </p>
        <p className="font-mono text-[12px] leading-6 text-[var(--color-ink-secondary)]">
          {`<Stacked3DMark Mark={Option1OpenLoopMark} axis="upward" size={150} count={4} stepDegrees={15} />`}
        </p>
        <p className="mt-2 text-[var(--text-sm)] leading-6 text-[var(--color-ink-secondary)]">
          Parametric in <code>axis</code> (<code>&quot;horizontal&quot;</code> /{" "}
          <code>&quot;vertical&quot;</code> / <code>&quot;upward&quot;</code>), <code>count</code>,{" "}
          <code>stepDegrees</code>, <code>depthStep</code>, <code>opacityStep</code>, and{" "}
          <code>layerSpacingPx</code>. The <code>Mark</code> prop accepts any of the option marks
          so the same depth treatment is available for Options 2 / 3 — just swap the component.
        </p>
      </div>
    </article>
  );
}

function CurrentReference() {
  return (
    <article className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-6">
      <header className="mb-4 flex items-baseline gap-3 border-b border-emerald-200 pb-3">
        <span className="font-mono text-[11px] uppercase tracking-widest text-emerald-700">
          Selected — now in production
        </span>
        <h2 className="text-[var(--text-lg)] font-semibold text-[var(--color-ink)]">
          v10 — Option 1: Open Loop with Governance Gate
        </h2>
      </header>
      <p className="mb-4 text-[var(--text-sm)] leading-6 text-[var(--color-ink-secondary)]">
        The canonical <code className="font-mono text-[12px]">BossLoopMark</code> rendered through
        the production logo component. This is what now ships in the top nav, footer, homepage, and
        all four <code className="font-mono text-[12px]">/brand/*.svg</code> assets. Confirm
        legibility at every scale below.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        {[16, 32, 64, 128].map((s) => (
          <div
            className="flex items-center justify-center rounded-md border border-[var(--color-border)] bg-white"
            key={`current-${s}`}
            style={{ width: 144, height: 144 }}
          >
            <BossLoopMark accentColor="#0f766e" color="#0a0f1e" size={s} />
          </div>
        ))}
      </div>
    </article>
  );
}

export default function BrandOptionsPage() {
  return (
    <main className="px-4 py-12">
      <section className="mx-auto max-w-6xl">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-primary)]">
          Brand exploration
        </p>
        <h1 className="mt-2 text-[var(--text-4xl)] font-semibold text-[var(--color-ink)]">
          Logo mark options
        </h1>
        <p className="mt-3 max-w-3xl text-[var(--text-base)] leading-7 text-[var(--color-ink-secondary)]">
          Three candidate directions for the Boss Loop mark, all built around{" "}
          <em>governed operational cycles</em>. None uses arrows, refresh icons, infinity loops,
          or directional navigation cues — motion is inferred from geometry, not drawn explicitly.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-5 md:grid-cols-2">
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-emerald-700">
              Shared design discipline
            </p>
            <ul className="space-y-1 text-[var(--text-sm)] leading-6 text-[var(--color-ink)]">
              <li>+ Ink (#0A0F1E) = governance / authority / boundary</li>
              <li>+ Governance teal (#0F766E) = operational element being governed</li>
              <li>+ Two-color discipline; color carries meaning, not decoration</li>
              <li>+ Rounded-square containment as the shared brand chassis</li>
              <li>+ Implied circulation; no explicit motion graphics</li>
            </ul>
          </div>
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-rose-700">
              Anti-pattern checklist
            </p>
            <ul className="space-y-1 text-[var(--text-sm)] leading-6 text-[var(--color-ink)]">
              <li>− Arrows, arrowheads, or directional cues</li>
              <li>− Refresh / sync / recycle / orbit glyphs</li>
              <li>− Connectors, ports, USB-C, cable iconography</li>
              <li>− Centered targets, concentric rings, hash marks</li>
              <li>− Gradients, neon, AI-hype aesthetics</li>
            </ul>
          </div>
        </div>

        <p className="mt-6 text-[var(--text-sm)] leading-6 text-[var(--color-ink-tertiary)]">
          Compare each option at every scale at which the mark will live —{" "}
          <strong>16px favicon</strong>, <strong>32px nav</strong>, <strong>64px card</strong>,{" "}
          <strong>128px hero</strong> — in light and dark themes, then in the wordmark lockup.
          Direct link:{" "}
          <Link href="/" className="text-[var(--color-primary)] underline">
            return to homepage
          </Link>
          .
        </p>

        <div className="mt-12 space-y-12">
          {OPTIONS.map((opt) => (
            <OptionCard key={opt.id} option={opt} />
          ))}
        </div>

        <div className="mt-16">
          <ThreeDStudies />
        </div>

        <div className="mt-16">
          <CurrentReference />
        </div>

        <footer className="mt-16 border-t border-[var(--color-border)] pt-6 text-[var(--text-sm)] text-[var(--color-ink-tertiary)]">
          <p>
            Strategic frame: <em>operational cycles, not motion graphics</em>. The strongest mark
            is the one that still reads correctly when the wordmark is removed and the user has
            never seen the brand before.
          </p>
        </footer>
      </section>
    </main>
  );
}
