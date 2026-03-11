import type { MetadataRoute } from "next";
import { getAllDocSlugs } from "@/lib/docs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllDocSlugs();
  const base = "https://loopengine.io";

  const docUrls = slugs.map((slug) => ({
    url: `${base}/docs/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0
    },
    {
      url: `${base}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9
    },
    ...docUrls
  ];
}
