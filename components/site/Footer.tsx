import Link from "next/link";
import { LoopEngineLogo } from "@/components/logo";

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-ink)",
        color: "var(--color-ink-muted)",
        padding: "48px var(--space-8) 24px"
      }}
    >
      <div className="mx-auto grid w-full max-w-[var(--max-width-full)] gap-8 md:grid-cols-3">
        <div>
          <LoopEngineLogo size="sm" theme="dark" showTagline />
          <p className="mt-3 text-sm">Created by Better Data</p>
        </div>
        <div className="space-y-2 text-sm">
          <p>
            <Link href="/docs">Docs</Link>
          </p>
          <p>
            <a href="https://github.com/loopengine/loop-engine" rel="noreferrer" target="_blank">
              GitHub
            </a>
          </p>
          <p>
            <a href="https://www.npmjs.com/package/@loop-engine/sdk" rel="noreferrer" target="_blank">
              npm
            </a>
          </p>
          <p>
            <Link href="/docs/examples">Examples</Link>
          </p>
          <p>
            <Link href="/docs/governance/license">Governance</Link>
          </p>
        </div>
        <div className="text-sm">
          <p className="mono">MIT Licensed</p>
          <p className="mt-2">Permission is hereby granted, free of charge, to any person obtaining a copy.</p>
          <p className="mt-2">
            <a href="https://github.com/loopengine/loop-engine/blob/main/LICENSE" rel="noreferrer" target="_blank">
              View LICENSE
            </a>
          </p>
        </div>
      </div>
      <div
        className="mx-auto mt-8 flex w-full max-w-[var(--max-width-full)] flex-wrap items-center justify-between gap-2"
        style={{
          borderTop: "1px solid var(--color-border-dark)",
          paddingTop: 16,
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)"
        }}
      >
        <p>© Loop Engine Contributors</p>
        <p>Built with Next.js</p>
      </div>
    </footer>
  );
}
