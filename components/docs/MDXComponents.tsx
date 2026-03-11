import type { ComponentProps, ReactElement, ReactNode } from "react";
import { Callout } from "./Callout";
import { CodeBlock } from "./CodeBlock";
import { LoopDiagram } from "./LoopDiagram";
import { PackageCard } from "./PackageCard";

function toHeadingId(children: ReactNode): string {
  const text = String(children ?? "");
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export const mdxComponents = {
  h2: ({ children }: ComponentProps<"h2">) => <h2 id={toHeadingId(children)}>{children}</h2>,
  h3: ({ children }: ComponentProps<"h3">) => <h3 id={toHeadingId(children)}>{children}</h3>,
  pre: (props: ComponentProps<"pre">) => {
    const child = props.children as ReactElement<{ className?: string; children?: string }>;
    const code = child?.props?.children ?? "";
    const className = child?.props?.className ?? "";
    const language = className.replace("language-", "") || "text";
    return <CodeBlock code={String(code)} language={language} />;
  },
  table: ({ children }: ComponentProps<"table">) => (
    <div className="docs-table-wrap">
      <table>{children}</table>
    </div>
  ),
  Callout,
  CodeBlock,
  PackageCard,
  LoopDiagram
};
