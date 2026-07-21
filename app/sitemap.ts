import type { MetadataRoute } from "next";
import { getAllDocs } from "@/lib/docs";
import { SITE } from "@/lib/site-config";
import { MADE_FOR_SEGMENTS } from "@/lib/made-for";

const BASE = SITE.baseUrl;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = await getAllDocs();

  const docUrls = docs.map((doc) => ({
    url: doc.frontmatter.canonical ?? `${BASE}/docs/${doc.slugPath}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const madeForUrls = [
    {
      url: `${BASE}/made-for`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...MADE_FOR_SEGMENTS.map((segment) => ({
      url: `${BASE}/made-for/${segment.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE}/product`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/product/how-it-works`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE}/product/reuse-dont-rebuild`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE}/use-cases`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE}/use-cases/enterprise-it`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...madeForUrls,
    ...docUrls,
  ];
}
