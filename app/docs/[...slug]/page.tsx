import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { DocsPageView } from "@/components/docs/DocsPageView";
import { DocsPrevNext } from "@/components/docs/DocsPrevNext";
import { DocsShell } from "@/components/docs/DocsShell";
import { mdxComponents } from "@/components/docs/MDXComponents";
import { getAllDocSlugs, getDocBySlug, getPrevNext } from "@/lib/docs";

type DocsSlugPageProps = {
  params: Promise<{ slug: string[] }>;
};

const SITE = "https://loopengine.io";

export async function generateStaticParams() {
  const slugs = await getAllDocSlugs();
  return slugs.map((s) => ({ slug: s.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: DocsSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);

  const title = doc.title ?? "Docs";
  const description = doc.description ?? "";
  const section = doc.sectionLabel ?? "Docs";
  const joinedSlug = doc.slugPath;

  const ogUrl = new URL("/og", SITE);
  ogUrl.searchParams.set("title", title);
  if (description) ogUrl.searchParams.set("description", description);
  ogUrl.searchParams.set("section", section);

  const canonical = doc.frontmatter.canonical ?? `${SITE}/docs/${joinedSlug}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} · Boss Loop`,
      description,
      url: `${SITE}/docs/${joinedSlug}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: `${title} · Boss Loop`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · Boss Loop`,
      description,
      images: [ogUrl.toString()],
    },
    alternates: {
      canonical,
    },
  };
}

export default async function DocsSlugPage({ params }: DocsSlugPageProps) {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);
  const slugPath = doc.slugPath;
  const packageName = slug[0] === "packages" ? slug[1] : undefined;
  const { prev, next } = await getPrevNext(slug);

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
            name: "TypeScript",
          },
          license: "https://www.apache.org/licenses/LICENSE-2.0",
          author: {
            "@type": "Organization",
            name: "Better Data",
            url: "https://betterdata.co",
          },
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
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
            name: "Better Data",
            url: "https://betterdata.co",
          },
          publisher: {
            "@type": "Organization",
            name: "Better Data",
            url: "https://betterdata.co",
            logo: {
              "@type": "ImageObject",
              url: "https://loopengine.io/brand/logo.svg",
            },
          },
          isPartOf: {
            "@type": "WebSite",
            "@id": "https://loopengine.io/#website",
          },
        };

  return (
    <DocsShell sectionLabel={doc.sectionLabel} title={doc.title} headings={doc.headings} filePath={doc.filePath}>
      <DocsPageView slugPath={slugPath} title={doc.title} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MDXRemote source={doc.source} components={mdxComponents} />
      <DocsPrevNext prev={prev} next={next} />
    </DocsShell>
  );
}
