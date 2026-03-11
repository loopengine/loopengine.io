import { MDXRemote } from "next-mdx-remote/rsc";
import { DocLayout } from "@/components/docs/DocLayout";
import { mdxComponents } from "@/components/docs/MDXComponents";
import { loadDoc } from "@/lib/docs";

type DocsSlugPageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function DocsSlugPage({ params }: DocsSlugPageProps) {
  const { slug } = await params;
  const doc = await loadDoc(slug);

  return (
    <DocLayout sectionLabel={doc.sectionLabel} title={doc.title} headings={doc.headings}>
      <MDXRemote source={doc.source} components={mdxComponents} />
    </DocLayout>
  );
}
