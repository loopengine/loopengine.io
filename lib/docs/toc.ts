import type { TocHeading } from "./types";

/** Canonical heading slug — shared by docs TOC and `scripts/verify-doc-anchors.ts`. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function getTocFromSource(source: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const lines = source.split("\n");
  for (const line of lines) {
    const h2 = /^##\s+(.+)$/.exec(line);
    const h3 = /^###\s+(.+)$/.exec(line);
    if (h2) {
      headings.push({ id: headingId(h2[1]), text: h2[1], level: 2 });
    }
    if (h3) {
      headings.push({ id: headingId(h3[1]), text: h3[1], level: 3 });
    }
  }
  return headings;
}
