/** Canonical runtime layer copy — keep aligned with docs/concepts/runtime-taxonomy.mdx */

export type RuntimeLayerId = "providers" | "loops" | "channels" | "integrations" | "evidence";

export type RuntimeLayerDefinition = {
  id: RuntimeLayerId;
  title: string;
  tagline: string;
  role: string;
  enters: string;
  exits: string;
  verbs: string[];
  examples: string[];
  notThis: string;
};

export const RUNTIME_LAYERS: RuntimeLayerDefinition[] = [
  {
    id: "providers",
    title: "Providers",
    tagline: "Intelligence systems",
    role: "Generate analysis and recommendations — they do not commit operational state.",
    enters: "Context, signals, and policy-bound prompts from the loop",
    exits: "Structured actor decisions and evidence fields for guard evaluation",
    verbs: ["Analyze", "Recommend", "Classify", "Predict", "Draft"],
    examples: ["OpenAI", "Anthropic", "Gemini", "Perplexity Sonar"],
    notThis: "Providers are not workflow engines, channels, or systems of record."
  },
  {
    id: "loops",
    title: "Loops + Guards",
    tagline: "Governance runtime",
    role: "Authorize transitions — who may move state, under which policy, with what evidence.",
    enters: "Actor submissions from Providers, humans, and automation",
    exits: "Allowed or blocked transitions; events for audit and learning",
    verbs: ["Evaluate", "Enforce", "Escalate", "Attribute", "Record"],
    examples: ["human-only", "confidence-threshold", "evidence-required"],
    notThis: "Governance is not intelligence and not operational execution."
  },
  {
    id: "channels",
    title: "Channels",
    tagline: "Human coordination surfaces",
    role: "Coordinate people — request approvals, surface decisions, escalate operators.",
    enters: "PENDING_HUMAN_APPROVAL and escalation signals from the loop",
    exits: "Human actor transitions with platform-resolved identity",
    verbs: ["Notify", "Approve", "Reject", "Escalate", "Comment"],
    examples: ["Slack", "Microsoft Teams", "Email", "Docs comments", "OpenClaw routing"],
    notThis: "Channels are not integrations — humans decide here; systems execute elsewhere."
  },
  {
    id: "integrations",
    title: "Integrations",
    tagline: "Systems of record",
    role: "Execute operational actions and persist business state after governance passes.",
    enters: "Approved transitions and explicit integration steps",
    exits: "CRM updates, tickets, staged sheet applies, API side effects",
    verbs: ["Persist", "Trigger", "Update", "Apply", "Sync"],
    examples: ["Salesforce", "PagerDuty", "Jira", "Google Workspace", "HTTP APIs", "Postgres"],
    notThis: "Integrations are not governance and not human coordination."
  },
  {
    id: "evidence",
    title: "Evidence + Learning",
    tagline: "Audit and improvement",
    role: "Explain why each transition occurred; feed operational learning loops.",
    enters: "Every material transition at commit time",
    exits: "Audit trails, learning signals, replay and dispute resolution",
    verbs: ["Capture", "Compare", "Replay", "Improve"],
    examples: ["transition evidence", "learning signals", "observability timelines"],
    notThis: "Evidence is not reconstructed from chat logs after the fact."
  }
];

export const LAYER_DISAMBIGUATION = [
  "Channels are not integrations.",
  "Providers are not workflow systems.",
  "Integrations are not governance.",
  "Boss Loops sits between all three and governs transitions."
] as const;
