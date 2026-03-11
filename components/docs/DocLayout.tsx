import type { ReactNode } from "react";
import type { TocHeading } from "@/lib/docs";
import { DocToc } from "./DocToc";

type DocLayoutProps = {
  sectionLabel: string;
  title: string;
  headings: TocHeading[];
  children: ReactNode;
};

export function DocLayout({ sectionLabel, title, headings, children }: DocLayoutProps) {
  return (
    <div className="docs-shell">
      <article className="docs-content">
        <p className="docs-eyebrow">{sectionLabel}</p>
        <h1>{title}</h1>
        {children}
      </article>
      <DocToc headings={headings} />
    </div>
  );
}
