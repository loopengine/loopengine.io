---
description: Boss rebrand naming policy + Track A (copy, rename now) vs Track B (technical identifiers, deferred fast-follow). Apply to every edit in this repo.
alwaysApply: true
---

# Boss Rebrand Glossary

The product formerly named **Loop Engine** (`loopengine.io`) is being renamed to
**Boss**. This is a go-to-market repositioning, not just a string swap: we are
**no longer selling workflow automation**. We sell **the control system for
AI-assisted operations** — operational decision control infrastructure / governed
AI execution / the coordination layer between AI and real-world operations.

Follow this glossary on **every** edit.

## Naming policy

| Concept | Use | Was |
|---|---|---|
| Product / platform (short name) | **Boss** | "Loop Engine" |
| Brand lockup / wordmark / logo | **Boss Loop** | "Loop Engine" |
| The unit of work (the product's loops) | **a Boss Loop** / **Boss Loops** | "a loop" / "loops" |
| Hosted offering on Better Data | **Boss Cloud** | "Loop Engine Cloud" |
| Tagline | **The control system for AI-assisted operations.** | "Governed operational runtime" |
| Short tagline / eyebrow | **Governed AI Operations** | — |

- Generic, **mechanical** uses of the word "loop" stay lowercase and unchanged:
  "the loop transitions", "loop definition", "control loop", "event loop".
  Only rename "loop(s)" when it denotes *the product's* unit of work.
- **Never** produce: `Boss Loop Engine`, `Boss Engine`, `Boss Looping`, `Boss Loops Engine`.
- Positioning vocabulary to prefer: "operational decision control infrastructure",
  "governed AI execution", "accountability", "governance", "traceability", "control",
  "the coordination layer between AI and real-world operations".
- Drop / avoid: "workflow automation", "workflow engine" as our *self*-description
  (it's fine when contrasting against competitors, e.g. "Boss vs workflow engines").

## TWO TRACKS — read before any find/replace

### Track A — display / narrative copy → **rename freely, now**
Page titles, headings, body prose, marketing copy, nav labels, meta descriptions,
OG text, `keywords`, alt text, copyright lines. These are what GTM needs.

### Track B — technical identifiers → **DO NOT touch until told**
These reference real external systems. Changing them on the site before the
underlying resource is renamed/published **breaks installs and links**. They are
being handled in a separate **fast-follow** (git/npm/docker/domain).

Frozen Track-B tokens (leave exactly as-is unless a maintainer says the resource is live):
- npm scope `@loop-engine/*` and any `npm`/`pnpm`/`docker` install or `import` snippets
- GitHub `github.com/loopengine/...` (org `loopengine`, repos `loop-engine`, `loop-examples`)
- Domain `loopengine.io` (and emails at it, e.g. `conduct@loopengine.io`)
- Social handle `@loopengineio`
- Better Data hosted URLs (`loops.betterdata.co`) and `betterdata.co` blog-tag /
  changelog-module slugs (`tags/loop-engine`, `module=loop-engine`)
- Fenced code blocks in MDX (output, config, code) unless explicitly a Track-A label

When in doubt, treat a string as **Track B** and leave it.

## Single source of truth

All Track-A brand strings and the frozen Track-B identifiers live in
**`lib/site-config.ts`** (`SITE` and `SITE.legacy`). Prefer reading from `SITE`
over hardcoding. The fast-follow flips Track B by editing `SITE.legacy` + env,
not by sweeping call sites.

## Cross-repo note

`lib/betterdata-ecosystem.ts` copy was previously "kept in sync with the bd-forge
glossary lock". It has been rebranded to Boss for this site's GTM. The bd-forge
monorepo (`docs-site`, platform copy) still uses Loop Engine naming and needs its
own sync pass — that is **out of scope for this repo** and tracked in the fast-follow.
