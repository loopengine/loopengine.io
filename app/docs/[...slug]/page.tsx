import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { DocLayout } from "@/components/docs/DocLayout";
import { mdxComponents } from "@/components/docs/MDXComponents";
import { loadDoc } from "@/lib/docs";

type DocsSlugPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: DocsSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = await loadDoc(slug);

  const title = doc.title ?? "Docs";
  const description = doc.description ?? "";
  const section = doc.sectionLabel ?? "Docs";
  const joinedSlug = doc.slug.join("/");

  const ogUrl = new URL("/og", "https://loopengine.io");
  ogUrl.searchParams.set("title", title);
  if (description) ogUrl.searchParams.set("description", description);
  ogUrl.searchParams.set("section", section);

  return {
    title,
    description,
    openGraph: {
      title: `${title} · Loop Engine`,
      description,
      url: `https://loopengine.io/docs/${joinedSlug}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: `${title} · Loop Engine`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · Loop Engine`,
      description,
      images: [ogUrl.toString()]
    },
    alternates: {
      canonical: `https://loopengine.io/docs/${joinedSlug}`
    }
  };
}

export default async function DocsSlugPage({ params }: DocsSlugPageProps) {
  const { slug } = await params;
  const doc = await loadDoc(slug);
  const slugPath = doc.slugPath;
  const packageName = slug[0] === "packages" ? slug[1] : undefined;
  const jsonLd =
    packageName != null
      ? {
          "@context": "https://schema.org",
          "@type": "SoftwareSourceCode",
          name: `@loop-engine/${packageName}`,
          description: doc.frontmatter.description ?? "",
          url: `https://loopengine.io/docs/packages/${packageName}`,
          codeRepository: `https://github.com/loopengine/loop-engine/tree/main/packages/${packageName}`,
          programmingLanguage: {
            "@type": "ComputerLanguage",
            name: "TypeScript"
          },
          license: "https://www.apache.org/licenses/LICENSE-2.0",
          author: {
            "@type": "Organization",
            name: "Better Data, Inc.",
            url: "https://betterdata.co"
          },
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD"
          }
        }
      : {
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "@id": `https://loopengine.io/docs/${slugPath}#article`,
          headline: doc.frontmatter.title ?? doc.title,
          description: doc.frontmatter.description ?? "",
          url: `https://loopengine.io/docs/${slugPath}`,
          inLanguage: "en-US",
          author: {
            "@type": "Organization",
            name: "Better Data, Inc.",
            url: "https://betterdata.co"
          },
          publisher: {
            "@type": "Organization",
            name: "Loop Engine",
            url: "https://loopengine.io",
            logo: {
              "@type": "ImageObject",
              url: "https://loopengine.io/brand/logo.svg"
            }
          },
          isPartOf: {
            "@type": "WebSite",
            "@id": "https://loopengine.io/#website"
          }
        };

  return (
    <DocLayout sectionLabel={doc.sectionLabel} title={doc.title} headings={doc.headings}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MDXRemote source={doc.source} components={mdxComponents} />
    </DocLayout>
  );
}
