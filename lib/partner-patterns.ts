export type OperationalPattern = {
  title: string;
  href: string;
  flow: string[];
  reinforces: string[];
};

export const operationalPatterns: OperationalPattern[] = [
  {
    title: "ABM campaign approval",
    href: "/docs/examples/campaign-approval-loop",
    flow: [
      "Provider generates outbound copy",
      "Guards: brand + compliance",
      "Channel: Slack review",
      "Integration: MAP / CRM executes",
      "Evidence + learning",
    ],
    reinforces: ["Workflow path vs loop governance", "Deterministic guards", "Evidence at commit"],
  },
  {
    title: "SDR qualification",
    href: "/docs/examples/sdr-qualification-loop",
    flow: [
      "Provider scores inbound lead",
      "Low confidence → Channel: Slack",
      "Human SDR approves / rejects",
      "Integration: CRM qualification",
      "Evidence captured",
    ],
    reinforces: ["Human escalation", "Channels ≠ CRM", "Operational accountability"],
  },
  {
    title: "Pricing exception",
    href: "/docs/examples/pricing-exception-loop",
    flow: [
      "Integration: Sheets staging detects exception",
      "Provider recommends pricing band",
      "Channel: finance approval in Slack",
      "Integration: ERP / CRM apply",
      "Evidence + audit trail",
    ],
    reinforces: ["Dual-surface (Sheets + Slack)", "Guards before apply", "Learning feedback"],
  },
  {
    title: "Incident escalation",
    href: "/docs/examples/pagerduty-incident-loop",
    flow: [
      "Provider classifies incident",
      "Loop + Guards evaluate policy",
      "Channel: human override path",
      "Integration: PagerDuty escalation",
      "Evidence explains decision",
    ],
    reinforces: ["Workflows define paths", "Loops govern transitions", "Provider ≠ execution"],
  },
];
