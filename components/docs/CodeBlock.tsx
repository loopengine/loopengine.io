"use client";

import { useMemo, useState } from "react";

type CodeBlockProps = {
  code: string;
  language: string;
  filename?: string;
  highlight?: number[];
  showLineNumbers?: boolean;
};

function escapeHtml(input: string): string {
  return input.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function highlightCode(code: string): string {
  const escaped = escapeHtml(code);
  const comments = escaped.replace(/(\/\/.*)$/gm, '<span class="cmt">$1</span>');
  const strings = comments.replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g, '<span class="str">$1</span>');
  const keywords = strings.replace(
    /\b(import|export|const|let|await|return|from|type)\b/g,
    '<span class="kw">$1</span>'
  );
  return keywords.replace(/\b([A-Z][A-Za-z0-9_]*)\b/g, '<span class="type">$1</span>');
}

export function CodeBlock({
  code,
  language,
  filename,
  highlight = [],
  showLineNumbers = true
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = useMemo(() => code.trimEnd().split("\n"), [code]);

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
    <div className="docs-code-wrap" role="region" aria-label={`Code example: ${language}`}>
      {filename ? (
        <div className="docs-code-head">
          <span>{filename}</span>
          <span className="docs-code-lang">{language}</span>
        </div>
      ) : null}
      <button className="docs-code-copy" type="button" onClick={onCopy} aria-label="Copy code to clipboard">
        {copied ? "✓" : "⧉"}
      </button>
      <span
        aria-live="polite"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap"
        }}
      >
        {copied ? "Copied!" : ""}
      </span>
      <pre className="docs-code-pre">
        <code>
          {lines.map((line, index) => {
            const lineNumber = index + 1;
            const html = highlightCode(line);
            const isHighlighted = highlight.includes(lineNumber);
            return (
              <div
                key={`${lineNumber}-${line}`}
                className={`docs-code-line${isHighlighted ? " is-highlight" : ""}`}
              >
                {showLineNumbers ? <span className="docs-line-number">{lineNumber}</span> : null}
                <span
                  className="docs-line-content"
                  dangerouslySetInnerHTML={{ __html: html || "&nbsp;" }}
                />
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
