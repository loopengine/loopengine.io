---
description: Better Data canonical OSS docs framework (MDX, nav, Pagefind, DocsShell)—implement first in loopengine.io only.
globs:
  - lib/docs/**/*
  - components/docs/**/*
  - content/docs/**/*.mdx
  - app/docs/**/*
alwaysApply: false
---

# Better Data Docs Framework Decision

## Core decision

OSS docs sites will use a **standardized Next.js MDX docs framework**. Do **not** introduce alternate MDX pipelines (`compileMDX`-only loaders, second nav source) in repos that adopt this plan.

## Canonical OSS docs sites

| Site | Path |
|------|------|
| Loop Engine | `/Users/toddp/Projects/betterdata-sites/loopengine.io` |
| Commerce Gateway | `/Users/toddp/Projects/betterdata-sites/commercegateway.io` |
| Commerce Chain | `/Users/toddp/Projects/betterdata-sites/commercechain.io/commerce-chain-site` |
| Signal Tags (tagd) | `/Users/toddp/Projects/betterdata-sites/tagd.sh/tagd-site` |

## Hosted product docs (current)

- Mintlify: `/Users/toddp/Projects/betterdata-platform/bd-forge-main/docs-site`

## Internal docs (not public)

- `/Users/toddp/Projects/betterdata-platform/bd-forge-main/docs/internal`

---

## Locked technical decisions

### MDX

- **`next-mdx-remote` + `<MDXRemote />` in the route** (RSC). Single pattern globally.

### Frontmatter (Zod)

**Required:** `title`, `description`

**Optional:** `section`, `sidebar_label`, `sidebar_group`, `order`, `draft`, `canonical`

- Build must fail if required fields are missing.

### Navigation

- **Filesystem-derived** nav (no hand-maintained `docs-nav.ts` as source of truth).
- Optional escape hatch: **`nav.config.ts`** for rare overrides only.

### Navigation ordering (priority)

1. **`_meta.json`** `order` in each directory (primary).
2. Frontmatter **`order`** (secondary).
3. **Filename / `sidebar_label` / title** (fallback).

Example `_meta.json`:

```json
{
  "title": "Getting Started",
  "order": ["quick-start", "installation", "architecture"],
  "defaultOpen": true
}
```

### Content paths

- `content/docs/**/*.mdx`
- Support **`slug.mdx`** and **`slug/index.mdx`**.

### Search

- **Pagefind** (static); **Cmd+K**; index **`content/docs`** scope only.

### Layout

Shared **DocsShell**:

- Sidebar  
- Breadcrumbs  
- Article  
- Table of contents (heading extraction aligned with existing anchor strategy)  
- Previous / next  

### MDX components

One **shared component contract** (`mdx-components` map): CodeBlock, Callout variants, table wrapper, optional Tabs, future API blocks.

### Edit on GitHub

Env:

- `NEXT_PUBLIC_DOCS_GIT_ORG`
- `NEXT_PUBLIC_DOCS_GIT_REPO`
- `NEXT_PUBLIC_DOCS_GIT_BRANCH` (e.g. `main`)

URL pattern:

`https://github.com/{org}/{repo}/edit/{branch}/content/docs/{path}.mdx`

### Analytics (PostHog)

- `docs_page_view`
- `docs_search`
- `edit_clicked`

### Protected paths (never routed, sitemapped, or indexed)

- `content/docs/internal/**`
- `content/docs/_draft/**`
- `content/docs/_incoming/**`

---

## Amendments

### No shared npm package in the first pass

Do **not** create `@repo/docs-framework` or `@betterdata/docs-framework` until the pattern is proven.

**First implementation home (this repo):**

- `lib/docs/`
- `components/docs/`

After validation, either **copy** the pattern to other OSS sites or **publish** `@betterdata/docs-framework`.

### Migration order

1. Implement and validate in **loopengine.io**.  
2. Roll to **commercegateway.io**.  
3. Roll to **commerce-chain-site**.  
4. Roll to **tagd-site**.  
5. Only then plan **docs.betterdata.co** migration from Mintlify to Next.js.

### Mintlify rule

Do **not** migrate or delete the Mintlify `docs-site` until:

- OSS framework is stable  
- Search works  
- Nav generation works  
- Protected paths are verified safe  
- A `docs.betterdata.co` replacement is validated  

---

## When editing docs infra in this repo

- Prefer changes that move toward this spec; avoid expanding alternate loaders or duplicate nav models.
- Keep internal-only content out of `content/docs` public trees.
