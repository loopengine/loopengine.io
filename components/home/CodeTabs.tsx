"use client";

import { useMemo, useState } from "react";

type TabKey = "define" | "run" | "events";

const tabs: { key: TabKey; label: string }[] = [
  { key: "define", label: "Define" },
  { key: "run", label: "Run" },
  { key: "events", label: "Events" }
];

const snippets: Record<TabKey, string> = {
  define: `import { LoopBuilder } from '@loop-engine/sdk'

const approval = LoopBuilder
  .create('expense.approval', 'finance')
  .state('SUBMITTED')
  .state('APPROVED', { isTerminal: true })
  .state('REJECTED', { isTerminal: true })
  .initialState('SUBMITTED')
  .transition({ id: 'approve', from: 'SUBMITTED', to: 'APPROVED', actors: ['human'] })
  .transition({ id: 'reject', from: 'SUBMITTED', to: 'REJECTED', actors: ['human'] })
  .outcome({ id: 'expense_approved', valueUnit: 'expense_approved', description: 'Expense approved', measurable: true })
  .build()`,
  run: `import { aggregateId, transitionId } from '@loop-engine/core'
import { createLoopSystem } from '@loop-engine/sdk'

const { engine } = createLoopSystem({ loops: [approval] })

await engine.start({
  loopId: 'expense.approval',
  aggregateId: aggregateId('EXP-001'),
  orgId: 'acme',
  actor: { type: 'system', id: 'system:intake' }
})

await engine.transition({
  aggregateId: aggregateId('EXP-001'),
  transitionId: transitionId('approve'),
  actor: { type: 'human', id: 'manager@acme.com' },
  evidence: { comment: 'Approved for Q1 budget' }
})`,
  events: `eventBus.subscribe(async (event) => {
  // loop.started
  // loop.transition.executed
  //   actor: { type: 'human', id: 'manager@acme.com' }
  //   evidence: { comment: 'Approved...', actor_type: 'human' }
  // loop.completed
  //   outcomeId: 'expense_approved'
  //   durationMs: 142
  console.log(event.type, event)
})`
};

function renderHighlighted(code: string) {
  const escaped = code.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const withComments = escaped.replace(/(\/\/.*)$/gm, '<span class="cmt">$1</span>');
  const withStrings = withComments.replace(/('(?:[^'\\]|\\.)*')/g, '<span class="str">$1</span>');
  const withKeywords = withStrings.replace(
    /\b(import|const|await|from|async)\b/g,
    '<span class="kw">$1</span>'
  );
  return withKeywords.replace(/\b(LoopBuilder|createLoopSystem)\b/g, '<span class="type">$1</span>');
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
