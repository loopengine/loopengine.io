export type DocsNavItem = {
  title: string;
  href: string;
};

export type DocsNavSection = {
  label: string;
  items: DocsNavItem[];
};

export const docsSections: DocsNavSection[] = [
  {
    label: "Getting Started",
    items: [
      { title: "Quick Start", href: "/docs/getting-started/quick-start" },
      { title: "Installation", href: "/docs/getting-started/installation" },
      { title: "Your First Loop", href: "/docs/getting-started/your-first-loop" }
    ]
  },
  {
    label: "Core Concepts",
    items: [
      { title: "What is a Loop?", href: "/docs/concepts/what-is-a-loop" },
      { title: "The Actor Model", href: "/docs/concepts/actor-model" },
      { title: "Guards and Policy", href: "/docs/concepts/guards-and-policy" },
      { title: "Signals", href: "/docs/concepts/signals" },
      { title: "Observability", href: "/docs/concepts/observability" },
      { title: "Learning Signals", href: "/docs/concepts/learning-signals" }
    ]
  },
  {
    label: "Defining Loops",
    items: [
      { title: "YAML Format", href: "/docs/defining-loops/yaml-format" },
      { title: "TypeScript Builder", href: "/docs/defining-loops/typescript-builder" },
      { title: "Loop Library", href: "/docs/defining-loops/loop-library" },
      { title: "Guards Reference", href: "/docs/defining-loops/guards-reference" }
    ]
  },
  {
    label: "Running Loops",
    items: [
      { title: "createLoopSystem", href: "/docs/running-loops/create-loop-system" },
      { title: "Starting Loops", href: "/docs/running-loops/starting-loops" },
      { title: "Transitions", href: "/docs/running-loops/transitions" },
      { title: "Event Subscriptions", href: "/docs/running-loops/event-subscriptions" },
      { title: "Adapters", href: "/docs/running-loops/adapters" }
    ]
  },
  {
    label: "AI and Automation",
    items: [
      { title: "AI as Actor", href: "/docs/ai-and-automation/ai-as-actor" },
      { title: "Confidence + Evidence", href: "/docs/ai-and-automation/confidence-evidence" },
      { title: "Human Approval Gates", href: "/docs/ai-and-automation/human-approval-gates" }
    ]
  },
  {
    label: "Packages",
    items: [
      { title: "@loop-engine/sdk", href: "/docs/packages/sdk" },
      { title: "@loop-engine/core", href: "/docs/packages/core" },
      { title: "@loop-engine/runtime", href: "/docs/packages/runtime" },
      { title: "All packages", href: "/docs/packages/all-packages" }
    ]
  },
  {
    label: "Governance",
    items: [
      { title: "License", href: "/docs/governance/license" },
      { title: "Contributing", href: "/docs/governance/contributing" },
      { title: "RFC Process", href: "/docs/governance/rfc-process" }
    ]
  }
];

export const docsOrder = docsSections.flatMap((section) => section.items);
