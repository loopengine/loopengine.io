/** Public docs API (re-exports `lib/docs/*` Phase 1 loader). */
export {
  isPublicDocPath,
  assertPublicDocPath,
  docsContentRoot,
  headingId,
  getTocFromSource,
  getDocBySlug,
  getAllDocs,
  getAllDocSlugs,
  getNavTree,
  getPrevNext,
  type NavPrevNext,
} from "./docs/index";

export type {
  LoadedDoc,
  TocHeading,
  DocFrontmatter,
  DirectoryMeta,
  DocNavItem,
  DocNavSection,
  FullDoc,
} from "./docs/index";
