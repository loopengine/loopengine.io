import type { ReactNode } from "react";
import type { TocHeading } from "@/lib/docs";
import { DocsToc } from "./DocsToc";
import { EditOnGitHub } from "./EditOnGitHub";

type DocsShellProps = {
  sectionLabel: string;
  title: string;
  headings: TocHeading[];
  /** Path under `content/docs/` (e.g. `getting-started/quick-start.mdx`). */
  filePath: string;
  children: ReactNode;
};

export function DocsShell({ sectionLabel, title, headings, filePath, children }: DocsShellProps) {
  return (
    <div className="docs-shell">
      <article className="docs-content">
        <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="docs-eyebrow">{sectionLabel}</p>
            <h1>{title}</h1>
          </div>
          <EditOnGitHub filePath={filePath} />
        </div>
        {children}
      </article>
      <DocsToc headings={headings} />
    </div>
  );
}
