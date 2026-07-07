import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { DocsPageView } from "@/components/docs/DocsPageView";
import { DocsPrevNext } from "@/components/docs/DocsPrevNext";
import { DocsShell } from "@/components/docs/DocsShell";
import { mdxComponents } from "@/components/docs/MDXComponents";
import { getAllDocSlugs, getDocBySlug, getPrevNext } from "@/lib/docs";
import { SITE as SITE_CFG, LEGACY, npmPkg } from "@/lib/site-config";

type DocsSlugPageProps = {
  params: Promise<{ slug: string[] }>;
};

const SITE = SITE_CFG.baseUrl;

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
      title: `${title} · Boss Loops`,
      description,
      url: `${SITE}/docs/${joinedSlug}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: `${title} · Boss Loops`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · Boss Loops`,
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
          name: npmPkg(packageName),
          description: doc.frontmatter.description ?? "",
          url: `${SITE}/docs/packages/${packageName}`,
          codeRepository: LEGACY.ghTree(`packages/${packageName}`),
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
          "@id": `${SITE}/docs/${slugPath}#article`,
          headline: doc.frontmatter.title ?? doc.title,
          description: doc.frontmatter.description ?? "",
          url: `${SITE}/docs/${slugPath}`,
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
              url: `${SITE}/brand/logo.svg`,
            },
          },
          isPartOf: {
            "@type": "WebSite",
            "@id": `${SITE}/#website`,
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
