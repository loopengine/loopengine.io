"use client";

/**
 * Homepage quick-start tabs. Snippets mirror the published `@loop-engine/sdk` + `@loop-engine/dsl` API
 * (parseLoopYaml, validateLoopDefinition, createLoopSystem) — keep aligned with docs quickstart.
 */
import { useMemo, useState } from "react";

type TabKey = "define" | "run" | "events";

const tabs: { key: TabKey; label: string }[] = [
  { key: "define", label: "Define" },
  { key: "run", label: "Run" },
  { key: "events", label: "Events" }
];

const snippets: Record<TabKey, string> = {
  define: `import { parseLoopYaml, validateLoopDefinition } from '@loop-engine/sdk'

const yaml = \`
loopId: expense.approval
version: 1.0.0
name: Expense Approval
description: Human approval for submitted expenses
initialState: SUBMITTED
states:
  - stateId: SUBMITTED
    label: Submitted
  - stateId: APPROVED
    label: Approved
    terminal: true
  - stateId: REJECTED
    label: Rejected
    terminal: true
transitions:
  - transitionId: approve
    from: SUBMITTED
    to: APPROVED
    signal: approve
    allowedActors: [human]
  - transitionId: reject
    from: SUBMITTED
    to: REJECTED
    signal: reject
    allowedActors: [human]
\`

const definition = parseLoopYaml(yaml)
const checked = validateLoopDefinition(definition)
if (!checked.valid) {
  throw new Error(checked.errors.map((e) => e.message).join('; '))
}`,
  run: `import { createMemoryLoopStorageAdapter } from '@loop-engine/adapter-memory'
import { createLoopSystem } from '@loop-engine/sdk'

// assumes \`definition\` from the Define tab
const { engine } = await createLoopSystem({
  loops: [definition],
  storage: createMemoryLoopStorageAdapter()
})

await engine.startLoop({
  loopId: 'expense.approval',
  aggregateId: 'EXP-001',
  actor: { type: 'system', id: 'intake' }
})

await engine.transition({
  aggregateId: 'EXP-001',
  transitionId: 'approve',
  actor: { type: 'human', id: 'manager@acme.com' },
  evidence: { comment: 'Approved for Q1 budget' }
})`,
  events: `// assumes \`createLoopSystem\` returned \`eventBus\` alongside \`engine\`
const { engine, eventBus } = await createLoopSystem({
  loops: [definition],
  storage: createMemoryLoopStorageAdapter()
})

eventBus.subscribe(async (event) => {
  // loop.transition.executed — actor, evidence, from/to states
  // loop.transition.blocked — guardFailures when a guard rejects
  if (event.type === 'loop.transition.executed') {
    console.log('executed', event.transitionId, event.actor)
  }
  if (event.type === 'loop.transition.blocked') {
    console.log('blocked', event.guardFailures)
  }
})`
};

function renderHighlighted(code: string) {
  const escaped = code.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const withComments = escaped.replace(/(\/\/.*)$/gm, '<span class="cmt">$1</span>');
  const withStrings = withComments.replace(/('(?:[^'\\]|\\.)*')/g, '<span class="str">$1</span>');
  const withStrings2 = withStrings.replace(/(`[^`]*`)/g, '<span class="str">$1</span>');
  const withKeywords = withStrings2.replace(
    /\b(import|const|await|from|async|if|throw|new|return)\b/g,
    '<span class="kw">$1</span>'
  );
  return withKeywords.replace(
    /\b(parseLoopYaml|validateLoopDefinition|createLoopSystem|createMemoryLoopStorageAdapter)\b/g,
    '<span class="type">$1</span>'
  );
}

export function CodeTabs() {
  const [tab, setTab] = useState<TabKey>("define");
  const [copied, setCopied] = useState(false);
  const code = snippets[tab];
  const html = useMemo(() => renderHighlighted(code), [code]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <div className="mb-3 flex items-center gap-4">
        {tabs.map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            type="button"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: tab === item.key ? "var(--color-primary-mid)" : "var(--color-ink-muted)",
              borderBottom:
                tab === item.key ? "1px solid var(--color-primary-mid)" : "1px solid transparent",
              paddingBottom: 8
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        role="region"
        aria-label={`Code example: ${tab}`}
        style={{
          position: "relative",
          background: "var(--color-code-bg)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-border-dark)",
          overflowX: "auto"
        }}
      >
        <button
          aria-label="Copy code to clipboard"
          onClick={onCopy}
          type="button"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: copied ? "var(--color-code-string)" : "var(--color-code-comment)",
            border: "1px solid var(--color-border-dark)",
            borderRadius: "var(--radius-sm)",
            padding: "4px 8px",
            background: "transparent"
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <pre style={{ margin: 0, padding: "18px 18px 20px", color: "var(--color-code-text)", fontSize: 13 }}>
          <code dangerouslySetInnerHTML={{ __html: html }} />
        </pre>
      </div>
    </div>
  );
}
