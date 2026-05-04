import { z } from "zod";

/** Single source of truth for public MDX frontmatter (validated at load time). */
export const docFrontmatterSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  section: z.string().optional(),
  sidebar_label: z.string().optional(),
  sidebar_group: z.string().optional(),
  order: z.number().optional(),
  draft: z.boolean().optional(),
  canonical: z.string().optional(),
});

export type DocFrontmatter = z.infer<typeof docFrontmatterSchema>;

/** Optional per-directory nav metadata (content/docs/.../_meta.json) */
export const directoryMetaSchema = z.object({
  title: z.string().optional(),
  order: z.array(z.string()).optional(),
  defaultOpen: z.boolean().optional(),
});

export type DirectoryMeta = z.infer<typeof directoryMetaSchema>;
