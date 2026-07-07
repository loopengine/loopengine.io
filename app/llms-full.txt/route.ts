import { getAllDocs } from "@/lib/docs";
import { NextResponse } from "next/server";
import { SITE, LEGACY } from "@/lib/site-config";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const docs = await getAllDocs();

  const header = [
    "# Boss Loops - Full Documentation",
    `> ${SITE.baseUrl} | Apache-2.0 Licensed | Created by Better Data (https://betterdata.co)`,
    "> Generated: " + new Date().toISOString(),
    `> Source: ${LEGACY.siteRepo}`,
    "",
    "This file contains the complete Boss Loops documentation in a single",
    "plain-text file optimized for LLM context windows.",
    `Structured summary: ${SITE.baseUrl}/llms.txt`,
    "",
    "---",
    "",
  ].join("\n");

  const body = docs
    .map((doc) => {
      const lines = [`## ${doc.title}`, `URL: ${SITE.baseUrl}/docs/${doc.slugPath}`];
      if (doc.frontmatter.description) {
        lines.push(`Summary: ${doc.frontmatter.description}`);
      }
      if (doc.frontmatter.section) {
        lines.push(`Section: ${doc.frontmatter.section}`);
      }
      lines.push("", doc.source, "", "---", "");
      return lines.join("\n");
    })
    .join("\n");

  const full = header + body;

  return new NextResponse(full, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "noindex",
    },
  });
}
