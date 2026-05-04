"use client";

import { trackDocsEditClicked } from "@/lib/analytics/events";

type EditOnGitHubProps = {
  filePath: string;
};

function editUrl(filePath: string): string {
  const org = process.env.NEXT_PUBLIC_DOCS_GIT_ORG ?? "loopengine";
  const repo = process.env.NEXT_PUBLIC_DOCS_GIT_REPO ?? "loopengine.io";
  const branch = process.env.NEXT_PUBLIC_DOCS_GIT_BRANCH ?? "main";
  const root = `https://github.com/${org}/${repo}/edit/${branch}/content/docs`;
  const normalized = filePath.replace(/^\/+/, "");
  return `${root}/${normalized}`;
}

export function EditOnGitHub({ filePath }: EditOnGitHubProps) {
  const href = editUrl(filePath);

  return (
    <a
      href={href}
      rel="noreferrer"
      target="_blank"
      className="docs-edit-link shrink-0 text-sm text-[var(--color-ink-tertiary)] underline-offset-4 transition-colors hover:text-[var(--color-primary)] hover:underline"
      style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)" }}
      onClick={() =>
        trackDocsEditClicked({
          filePath: `content/docs/${filePath.replace(/^\/+/, "")}`,
          destination: href,
        })
      }
    >
      Edit this page
    </a>
  );
}
