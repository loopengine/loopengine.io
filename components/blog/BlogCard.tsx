import type { BlogPostCard } from "@/lib/blog";
import Image from "next/image";
import Link from "next/link";

type BlogCardProps = Pick<
  BlogPostCard,
  "title" | "slug" | "excerpt" | "publishedAt" | "tags" | "coverImage"
>;

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function BlogCard({
  title,
  slug,
  excerpt,
  publishedAt,
  tags,
  coverImage,
}: BlogCardProps) {
  const shownTags = tags.slice(0, 2);
  return (
    <article className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm transition-shadow hover:shadow-md">
      {coverImage?.asset?.url ? (
        <div className="relative aspect-video w-full">
          <Image src={coverImage.asset.url} alt={title} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
      ) : null}

      <div className="p-5">
        {shownTags.length > 0 ? (
          <div className="mb-3 flex flex-wrap gap-2">
            {shownTags.map((tag) => (
              <span
                key={`${slug.current}-${tag}`}
                className="rounded-full bg-[var(--color-primary-light)] px-2 py-1 font-mono text-[10px] text-[var(--color-primary-dark)] uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <h2 className="font-semibold text-[var(--text-xl)]">
          <Link href={`/blog/${slug.current}`} className="font-[var(--font-display)] text-[var(--color-ink)] hover:underline">
            {title}
          </Link>
        </h2>
        <p
          className="mt-3 overflow-hidden text-[var(--color-ink-secondary)] text-sm"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {excerpt}
        </p>
        <p className="mt-4 text-[var(--color-ink-muted)] text-xs">{formatDate(publishedAt)}</p>
      </div>
    </article>
  );
}
