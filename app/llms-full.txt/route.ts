import { getAllDocs } from "@/lib/docs";
import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const docs = await getAllDocs();

  const header = [
    "# Loop Engine - Full Documentation",
    "> https://loopengine.io | Apache-2.0 Licensed | Created by Better Data (https://betterdata.co)",
    "> Generated: " + new Date().toISOString(),
    "> Source: https://github.com/loopengine/loopengine.io",
    "",
    "This file contains the complete Loop Engine documentation in a single",
    "plain-text file optimized for LLM context windows.",
    "Structured summary: https://loopengine.io/llms.txt",
    "",
    "---",
    "",
  ].join("\n");

  const body = docs
    .map((doc) => {
      const lines = [`## ${doc.title}`, `URL: https://loopengine.io/docs/${doc.slugPath}`];
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
