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
      { title: "Your First Loop", href: "/docs/getting-started/your-first-loop" },
      { title: "Architecture", href: "/docs/getting-started/architecture" }
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
      { title: "Learning Signals", href: "/docs/concepts/learning-signals" },
      { title: "AI as Actor", href: "/docs/ai-and-automation/ai-as-actor" },
      { title: "Confidence + Evidence", href: "/docs/ai-and-automation/confidence-evidence" },
      { title: "Human Approval Gates", href: "/docs/ai-and-automation/human-approval-gates" },
      { title: "Decision Governance", href: "/docs/concepts/decision-governance" },
      { title: "Loop Engine vs Workflow Engines", href: "/docs/concepts/loop-engine-vs-workflow-engines" },
      { title: "Agents and RAG", href: "/docs/concepts/agents-and-rag" },
      { title: "When to Use Loop Engine", href: "/docs/concepts/when-to-use" }
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
    label: "Packages",
    items: [
      { title: "@loop-engine/sdk", href: "/docs/packages/sdk" },
      { title: "@loop-engine/core", href: "/docs/packages/core" },
      { title: "@loop-engine/dsl", href: "/docs/packages/dsl" },
      { title: "@loop-engine/runtime", href: "/docs/packages/runtime" },
      { title: "@loop-engine/events", href: "/docs/packages/events" },
      { title: "@loop-engine/guards", href: "/docs/packages/guards" },
      { title: "@loop-engine/actors", href: "/docs/packages/actors" },
      { title: "@loop-engine/signals", href: "/docs/packages/signals" },
      { title: "@loop-engine/observability", href: "/docs/packages/observability" },
      { title: "@loop-engine/registry-client", href: "/docs/packages/registry-client" },
      { title: "@loop-engine/ui-devtools", href: "/docs/packages/ui-devtools" },
      { title: "@loop-engine/adapter-anthropic", href: "/docs/packages/adapter-anthropic" },
      { title: "@loop-engine/adapter-commerce-gateway", href: "/docs/packages/adapter-commerce-gateway" },
      { title: "@loop-engine/adapter-gemini", href: "/docs/packages/adapter-gemini" },
      { title: "@loop-engine/adapter-grok", href: "/docs/packages/adapter-grok" },
      { title: "@loop-engine/adapter-http", href: "/docs/packages/adapter-http" },
      { title: "@loop-engine/adapter-kafka", href: "/docs/packages/adapter-kafka" },
      { title: "@loop-engine/adapter-memory", href: "/docs/packages/adapter-memory" },
      { title: "@loop-engine/adapter-openclaw", href: "/docs/packages/adapter-openclaw" },
      { title: "@loop-engine/adapter-openai", href: "/docs/packages/adapter-openai" },
      { title: "@loop-engine/adapter-postgres", href: "/docs/packages/adapter-postgres" },
      { title: "All packages", href: "/docs/packages/all-packages" }
    ]
  },
  {
    label: "Examples",
    items: [
      { title: "Overview", href: "/docs/examples/index" },
      { title: "Expense Approval", href: "/docs/examples/expense-approval" },
      { title: "AI Replenishment", href: "/docs/examples/ai-replenishment" },
      { title: "Demand Signal", href: "/docs/examples/demand-signal" },
      { title: "Postgres Persistence", href: "/docs/examples/postgres-persistence" },
      { title: "Event Streaming", href: "/docs/examples/event-streaming" },
      { title: "Infrastructure Change Approval", href: "/docs/examples/infrastructure-change-approval" },
      { title: "Fraud Review", href: "/docs/examples/fraud-review" },
      { title: "OpenClaw Integration", href: "/docs/examples/openclaw" },
      { title: "Commerce Gateway", href: "/docs/examples/commerce-gateway" }
    ]
  },
  {
    label: "Integrations",
    items: [
      { title: "OpenClaw", href: "/docs/examples/openclaw" },
      { title: "Vercel AI SDK", href: "/docs/integrations/vercel-ai" },
      { title: "PagerDuty", href: "/docs/integrations/pagerduty" }
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
