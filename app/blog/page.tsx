import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog - Loop Engine",
  description:
    "Engineering posts, release notes, and production patterns from the Loop Engine team.",
  robots: { index: false, follow: false },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <main className="px-4 py-12">
      <section className="mx-auto max-w-6xl">
        <h1 className="font-[var(--font-display)] text-[var(--color-ink)] text-[var(--text-4xl)]">
          Blog
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--color-ink-secondary)] text-base">
          Engineering, releases, and production patterns.
        </p>
      </section>

      <section className="mx-auto mt-10 max-w-6xl">
        {posts.length === 0 ? (
          <p className="rounded-lg border border-[var(--color-border)] border-dashed px-6 py-12 text-center text-[var(--color-ink-tertiary)]">
            No posts yet - check back after launch.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <BlogCard key={post._id} {...post} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
