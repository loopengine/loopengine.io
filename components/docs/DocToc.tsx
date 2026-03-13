"use client";

import { useEffect, useMemo, useState } from "react";
import type { TocHeading } from "@/lib/docs";

type DocTocProps = {
  headings: TocHeading[];
};

export function DocToc({ headings }: DocTocProps) {
  const [active, setActive] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-72px 0px -70% 0px", threshold: [0, 1] }
    );

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((value): value is HTMLElement => Boolean(value));
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [headings]);

  const items = useMemo(() => headings.filter((heading) => heading.level === 2 || heading.level === 3), [headings]);
  if (!items.length) return null;

  return (
    <aside
      className="hidden lg:block"
      style={{
        width: 200,
        position: "sticky",
        top: 72,
        alignSelf: "start"
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--color-ink-muted)",
          marginBottom: 8
        }}
      >
        On this page
      </p>
      <nav>
        {items.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            style={{
              display: "block",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: active === heading.id ? "var(--color-primary)" : "var(--color-ink-tertiary)",
              opacity: heading.level === 3 ? 0.7 : 1,
              marginLeft: heading.level === 3 ? 12 : 0,
              marginBottom: 6
            }}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
