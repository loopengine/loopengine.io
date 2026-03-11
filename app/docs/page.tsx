import { Callout } from "@/components/docs/Callout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocLayout } from "@/components/docs/DocLayout";
import { LoopDiagram } from "@/components/docs/LoopDiagram";
import { PackageCard } from "@/components/docs/PackageCard";

export default function DocsHomePage() {
  return (
    <DocLayout
      sectionLabel="Documentation"
      title="Docs Home"
      headings={[
        { id: "start-here", text: "Start here", level: 2 },
        { id: "component-preview", text: "Component preview", level: 2 }
      ]}
    >
      <h2 id="start-here">Start here</h2>
      <p>Use the left navigation to move through getting started, concepts, and packages.</p>

      <Callout variant="tip" title="Tip">
        Docs pages are MDX-backed and can use custom components like callouts, diagrams, and package cards.
      </Callout>

      <h2 id="component-preview">Component preview</h2>
      <LoopDiagram
        states={[
          { id: "OPEN" },
          { id: "APPROVED", isTerminal: true },
          { id: "REJECTED", isError: true }
        ]}
        transitions={[
          { from: "OPEN", to: "APPROVED", label: "approve" },
          { from: "OPEN", to: "REJECTED", label: "reject" }
        ]}
        currentState="OPEN"
      />

      <CodeBlock
        language="ts"
        filename="quick-start.ts"
        code={`import { createLoopSystem } from '@loop-engine/sdk'

const { engine } = createLoopSystem({ loops: [] })`}
        showLineNumbers
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <PackageCard
          name="@loop-engine/sdk"
          description="High-level system factory and exports."
          href="/docs/packages/sdk"
        />
        <PackageCard
          name="@loop-engine/runtime"
          description="Loop execution engine primitives."
          href="/docs/packages/runtime"
        />
      </div>
    </DocLayout>
  );
}
