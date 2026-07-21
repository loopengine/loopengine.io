---
description: Boss Loops rebrand naming policy + Track A (copy, rename now) vs Track B (technical identifiers, deferred fast-follow). Apply to every edit in this repo.
alwaysApply: true
---

# Boss Loops Rebrand Glossary (v2 — supersedes the "Boss" v1 glossary)

The product formerly named **Loop Engine** (`loopengine.io`) is named
**Boss Loops** (`bossloops.io`). An earlier iteration of this glossary targeted
the short name "Boss" with lockup "Boss Loop" — that naming is **superseded**.
The product name, brand, and lockup are all **Boss Loops** (plural, two words).

This is a go-to-market repositioning, not just a string swap. Positioning is
locked by the GTM v1 doc ("Boss Loops — Positioning & Go-to-Market"):

- **Category position:** Governed Decision Intelligence
- **The object we sell:** the system of record for decisions
- **Product:** Boss Loops
- **Operating surface (inside the product):** Decision Operations — never a
  competing category claim

Follow this glossary on **every** edit.

## Naming policy

| Concept | Use | Was |
|---|---|---|
| Product / platform / brand / lockup | **Boss Loops** | "Loop Engine", then "Boss" / "Boss Loop" (v1) |
| Open-core tier | **Boss Loops OSS** | "Loop Engine (OSS)" |
| Hosted/enterprise tier | **Boss Loops Cloud** (confirmed 2026-07; "the hosted tier" remains fine in running prose, but nav/titles use Boss Loops Cloud) | "Loop Engine Cloud", then "Boss Cloud" (v1) |
| The core durable object | **Decision Record** | — |
| Unit of work (the product's loops) | **a decision loop** / **decision loops** (lowercase) | "a loop", then "a Boss Loop" (v1) |
| Operating surface | **Decision Operations** | — |
| Tagline | **The system of record for decisions.** | "The control system for AI-assisted operations." (v1) |
| Eyebrow / short tagline | **Governed Decision Intelligence** | "Governed AI Operations" (v1) |
| Corporate entity (invoices, legal, trust) | **Better Data, Inc.** (`betterdata.co`) | — |

- Generic, **mechanical** uses of the word "loop" stay lowercase and unchanged:
  "the loop transitions", "loop definition", "control loop", "event loop".
- **Never** produce: `Boss` (alone, as the product name), `Boss Loop` (singular,
  as product/brand/unit), `Boss Loop Engine`, `Boss Engine`, `Boss Loops Engine`,
  `BossLoops` (one word, outside identifiers/domains).
- Positioning vocabulary to prefer (from GTM v1): "governed decision
  intelligence", "the system of record for decisions", "Decision Record",
  "governed, auditable", "defensible decisions", "evidence, policy, people, and
  AI", "accountability", "traceability", "consume existing semantics".
- Drop / avoid as *self*-description: "workflow automation", "workflow engine",
  "control system for AI-assisted operations" (v1 positioning). Fine when
  contrasting against competitors ("Boss Loops vs workflow engines").

## Provider naming (semantic-overload rule)

"Provider" is reserved. Exactly three terms, never interchanged:

| Term | Means | Never call it |
|---|---|---|
| **Evidence Provider** | attaches governed evidence to a Decision Record (Snowflake semantic view, Looker model, Samsara reading) | "data provider", "source provider" |
| **Model Provider** | supplies AI models/LLMs (Anthropic, OpenAI, …) | "AI provider", "intelligence provider", bare "provider" |
| **Connector** | ERP/CRM/warehouse/system integration plumbing | "adapter-provider", bare "provider" |

Auth remains "SSO / identity provider" only in technical auth contexts (industry
term of art); never shorten to "provider" in product copy.

### Evidence Provider status badges (marketing ↔ product alignment)

| Badge | Claimable when |
|---|---|
| **Preview** | Fixture/seed illustrates the architecture on the demo golden record; NOT a live vendor connection |
| **Contract-validated** | Shape passes the OSS contract exemplars + conformance checks |
| **Conformant Provider** | Future — passes the public OSS conformance suite |
| **Boss Loops Cloud** | Future hosted connector path, once documented on the Cloud API page |

Copy discipline until production adapters ship: never "Connect your Looker
account today", "integration available", or live-dashboard framing. The demo
Looker metric is **certified** (its definition), not "governed" — do not
upgrade the adjective. Vendor UIs are optional live surfaces; the Decision
Record is the frozen one.

## TWO TRACKS — read before any find/replace

### Track A — display / narrative copy → **rename freely, now**
Page titles, headings, body prose, marketing copy, nav labels, meta descriptions,
OG text, `keywords`, alt text, copyright lines. These are what GTM needs.

### Track B — technical identifiers → **DO NOT touch until told**
These reference real external systems. Changing them on the site before the
underlying resource is renamed/published **breaks installs and links**.

Frozen Track-B tokens (leave exactly as-is unless a maintainer says otherwise):
- npm scope `@loop-engine/*` and any `npm`/`pnpm`/`docker` install or `import`
  snippets. **STATUS CHANGE (2026-07-09): the loop-engine mark is in phased,
  trademark-driven wind-down.** The `@bossloops` npm scope and `bossloops`
  GitHub org are claimed; a full flip `@loop-engine/*` → `@bossloops/*` is
  PLANNED (timeline set by counsel) and ships as one coordinated migration
  with the GitHub org rename — never piecemeal, never ad-hoc. Until then:
  existing `@loop-engine/*` references stay frozen exactly as-is, and **no NEW
  loop-engine-branded surfaces may be created** (packages, repos, domains,
  handles, slugs).
- GitHub `github.com/loopengine/...` (org `loopengine`, repos `loop-engine`,
  `loop-examples`) — same wind-down: org renames to `bossloops` in the Phase-1
  migration (with the vacated `loopengine` name re-registered as a placeholder);
  frozen until that migration executes.
- Domain `loopengine.io` legacy tokens and emails at it (e.g.
  `conduct@loopengine.io`). **`bossloops.io` is live and serves this site** —
  the domain flip is real but runs through the Track-B go-live steps below
  (config + env + codemod), never an ad-hoc sweep. Do not change legacy-domain
  emails until the replacement mailbox exists.
- Social handle `@loopengineio`
- Better Data hosted URLs and `betterdata.co` blog-tag / changelog-module slugs
  (`tags/loop-engine`, `module=loop-engine`)
- Fenced code blocks in MDX (output, config, code) unless explicitly a Track-A label
- **API identifiers** (`LoopEngine`, `createLoopEngine`, `LoopEngineOptions`):
  real exported names — rename only in lockstep with the npm package itself.

When in doubt, treat a string as **Track B** and leave it.

## Single source of truth

All Track-A brand strings and the frozen Track-B identifiers live in
**`lib/site-config.ts`** (`SITE` and `SITE.legacy`). Prefer reading from `SITE`
over hardcoding. Track-B flips happen by editing `SITE.legacy` + env, not by
sweeping call sites.

## Cross-repo note

The bd-forge monorepo (`docs-site`, platform copy) and
`betterdata-sites/docs.betterdata.co` still contain Loop Engine naming and need
their own Track-A sync pass against **this v2 glossary** (not v1 — v1's "Boss"
target would introduce a second wrong name). Same for
`commercegateway.io` (footer + `llms.txt`).

## Track-B go-live (the fast-follow)

Scope has narrowed since v1: npm scope and (for now) GitHub org **stay**. The
only live Track-B item is the **domain** (`loopengine.io` → `bossloops.io`,
already serving traffic).

1. **Edit `lib/site-config.ts` → `SITE.legacy.domainHost`** to `bossloops.io`
   once the legacy-domain email situation is resolved (conduct@ etc.).
2. **Set `NEXT_PUBLIC_BASE_URL`** to `https://www.bossloops.io` in the deploy
   env (drives `SITE.baseUrl`, canonicals, sitemap, OG URLs).
3. **Dry-run the codemod** `scripts/flip-track-b.mjs` for literal domain tokens
   in MDX/static; review, then `--apply`. Do NOT pass npm/GitHub replacement
   env — those tokens are retained.
4. **Verify:** `pnpm verify:anchors && pnpm lint && pnpm build`.
5. Add `next.config.ts` redirects for any renamed internal doc slugs
   (`loop-engine-vs-workflow-engines`, `loop-engine-cloud-api`) in the same
   change, or keep the slugs stable.
