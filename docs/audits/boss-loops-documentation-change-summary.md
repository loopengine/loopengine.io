# Boss Loops documentation change summary

Date: 2026-10-24

Documentation only. No application code, schemas, workflows, or infrastructure were changed. Nothing was pushed.

## A. Executive summary

- **Pages reviewed:** 100 Boss Loops doc pages (`content/docs`, matching the live sitemap) plus related Boss Loops pages on docs.betterdata.co.
- **Discrepancies recorded:** 23 in `docs/audits/boss-loops-documentation-audit.md`.
- **Critical:** customer authentication described as a minted JWT, and no statement that a transition body cannot replace the caller or approve as a named person.
- **High:** wrong production host, unsupported hosted feature list, broken first-run command, definition field `allowedActors`, wrong `createSubmission` shape, wrong Anthropic/OpenAI factory, `LoopBuilder` examples that cannot build, `webhook` listed as an engine actor.
- **Public pages updated:** 36 in `loopengine/loopengine.io`, 4 in `docs.betterdata.co`.
- **New public pages:** 0.
- **New audit files:** this summary and `boss-loops-documentation-audit.md` (not in the published docs tree).

## B. Documentation changes

Evidence is the audit table. On 2026-10-24 the production deployment of `app.bossloops.io` (`dpl_3MKcTku9hfimtnEcZTb9FnSCPxqZ`, redeployed 2026-10-21) is git `005b7d9fc2837036047bf3286af801400f6d76a3`, the same commit as `betterdataco/bossloops` `origin/main`. `loops.betterdata.co` returns HTTP 308 to `app.bossloops.io`. Unauthenticated and invalid-key GETs return 401 `Missing tenant context` and do not write. Validation: anchors, `tsc --noEmit`, and `pnpm build` (Next.js plus Pagefind, 100 doc pages indexed). docs.betterdata.co guardrails passed.

| File | Change |
| --- | --- |
| `content/docs/cloud/api-reference.mdx` | Customer contract: `app.bossloops.io`, organization API key, `X-Actor-Type`, transition actor rules, approval failures, create/list/transition/cancel/history. Removed JWT minting, the dead OpenAPI link, and the old host. |
| `content/docs/cloud/index.mdx` | Production URL, organization wording, capability table limited to what the app enforces. |
| `content/docs/cloud/getting-started.mdx` | Local path is the published SDK. Hosted path is the API key and catalog call. Removed `boss-loops:demo` and instant organization setup. |
| `content/docs/cloud/operations.mdx` | Isolation, keys, actor class, approver assignments, history. Removed location scopes, Industry Packs, drift detection, outbox, and capability-snapshot wording. |
| `content/docs/concepts/runtime-platform-direction.mdx` | Host `app.bossloops.io`. Package is `@loop-engine/loop-definition`, not `@loop-engine/dsl`. Isolation described per customer organization. |
| `content/docs/concepts/actor-model.mdx` | Hosted vs self-hosted actor rule. Actor fields match `@loop-engine/actors`. `buildAIActorEvidence` replaces the missing helper. |
| `content/docs/getting-started/installation.mdx` | `@loop-engine/sdk@1.0.0-rc.1` called out; other cited versions unchanged where they matched npm. |
| `content/docs/getting-started/quick-start.mdx` | `.version('1.0.0')` before `.build()`. |
| `content/docs/getting-started/your-first-loop.mdx` | Four engine actor types. `actors` field. `.version()`. State `label` noted. |
| `content/docs/getting-started/architecture.mdx` | Submission evidence is the `createSubmission` evidence object. |
| `content/docs/defining-loops/yaml-format.mdx` | Schema matches `LoopDefinitionSchema`. Example parses. |
| `content/docs/defining-loops/loop-library.mdx` | Warns that `loops/` in the engine repo is still the pre-1.0 shape. |
| `content/docs/concepts/what-is-a-loop.mdx` | Example uses `name`, `label`, `actors`, and `businessMetrics`. Parses. |
| `content/docs/packages/core.mdx` | `TransitionSpec.actors`, required `name` and `label`. |
| `content/docs/packages/loop-definition.mdx` | YAML example parses. |
| `content/docs/packages/actors.mdx` | `canActorExecuteTransition` return values match the function. |
| `content/docs/packages/sdk.mdx` | Builder example includes `.version()` and `.description()`. |
| `content/docs/ai-and-automation/human-approval-gates.mdx` | `actors` field and the real approval-helper results. Hosted approver assignment called out. |
| `content/docs/ai-and-automation/ai-as-actor.mdx` | `AIAgentActor` uses `modelId` and `provider`. |
| `content/docs/concepts/integration-adapter.mdx` | Submission type is `AIAgentSubmission`. |
| `content/docs/concepts/agents-and-rag.mdx` | Same submission evidence fix. |
| `content/docs/examples/openclaw.mdx` | `actors`. Builder can `.build()`. |
| `content/docs/examples/expense-approval.mdx` | `.version('1.0.0')`. |
| `content/docs/packages/adapter-openclaw.mdx` | Builder includes version, description, and a transition. |
| `content/docs/packages/adapter-anthropic.mdx`, `adapter-openai.mdx` | Factory options and submission fields. |
| `content/docs/packages/adapter-grok.mdx`, `adapter-gemini.mdx` | Submission variable is the real return value. Positional factory kept. |
| `content/docs/integrations/anthropic.mdx`, `openai.mdx`, `grok.mdx`, `gemini.mdx` | `signal` and `evidence` passed into `engine.transition`. |
| `content/docs/examples/ai-replenishment-claude.mdx`, `ai-replenishment-openai.mdx`, `fraud-review.mdx`, `infrastructure-change-approval.mdx` | Factories and submission evidence. |
| `docs.betterdata.co` `.../api-reference/boss-loops/index.mdx` | Points at the public Cloud API. States it is not generated OpenAPI. |
| `docs.betterdata.co` `.../platform/loops.mdx` | Host URL and the capabilities the app actually enforces. |
| `docs.betterdata.co` `.../hosted-platform-apps.mdx` | Customer credential is the organization API key. App path is the Boss Loops repository. |
| `docs.betterdata.co` `.../gateway/hosted/getting-started.mdx` | Boss Loops Cloud link is `app.bossloops.io`. |
| `content/docs/concepts/runtime-taxonomy.mdx`, `integrations/index.mdx` | Canonical host is `app.bossloops.io`. |
| `content/docs/integrations/perplexity-pagerduty.mdx` | Removed the hosted session-secret names from the public environment list. Hosted calls use the API key. |
| `docs.betterdata.co` introduction and open-source index | Hosted Boss Loops link is `app.bossloops.io`. |

## C. Unresolved engineering and release issues

These are not fixed by documentation.

1. **Engine repository YAML is repaired on a separate branch, not in this docs change.** `docs/yaml-examples-parse` in `loopengine/loop-engine` uses `actors`, `name`, and state `label`, and a parser test covers `loops/**/*.yaml`. The public loop-library page still warns that those files do not parse. That warning stays true until the engine branch merges. `crm.lead-qualification` `schedule_meeting` used `webhook`, which is not an engine actor; the example now uses `automation`. `spawnableLoops` is still present and is dropped by `LoopDefinitionSchema`.
2. **`X-Actor-Type: system` cannot transition.** Hosted `system` projects to engine `system`. The HTTP body value `system` projects to engine `automation`, and `ai-agent` is rejected with 422 before projection. No accepted body type matches. Documented as unsupported. Making it work is a product change.
3. **HTTP route rejects wire type `ai-agent`.** `authorizeTransitionPrincipal` accepts it as an alias of `ai`. The route returns 422 first. Docs tell callers to send `ai`.
4. **Create leaves status `OPEN`, so start returns 409.** Documented. Whether create should also enter the engine store is an implementation question and was not re-tested live.
5. **No in-product screen issues API keys.** Management is an administrator session API. Docs say keys are provisioned and that an API key cannot manage keys.
6. **Missing `X-Actor-Type` is still accepted as `user` unless an operator enables strict mode.** Public docs tell callers to send the header and not to rely on omission. They do not document the operator switch.
7. **`apps/bossloops/docs/api.md` is corrected on `docs/hosted-api-contract`, branched from production `main` (`005b7d9`).** The customer-minting example is removed. The first-party session claim table remains, labeled as internal. This docs site does not publish that file.
8. **Adapter pages outside this change set** were searched for the broken tokens above and not fully re-derived option by option.

Implementation defects (1–3, and possibly 4) are separate from the documentation defects that this change set corrected.

## D. Release readiness

**PASS WITH EXCEPTIONS.**

The updated public pages match the hosted behavior on `origin/main` (`005b7d9`) and the published `@loop-engine/*` packages for the contracts that were changed. Exceptions are the unresolved items above. Do not describe this as a full line-by-line certification of every example page.

## E. Git status

### `loopengine/loopengine.io` (`betterdata-sites/bossloops.io`)

- Branch: `docs/boss-loops-api-contract`, created from `origin/main` (`82cc5e1`). It does not contain pricing commit `3c144d8`, which remains only on local `main`.
- Includes the public MDX corrections, this summary, and the audit. Not pushed.

### `docs.betterdata.co`

- Branch: `docs/boss-loops-api-contract`, from local `main` (`d10f40a`).
- Six content pages. Not pushed.

### Validation

| Command | Result |
| --- | --- |
| `pnpm verify:anchors` (bossloops.io) | Pass |
| `pnpm exec tsc --noEmit` (bossloops.io) | Pass |
| `pnpm build` (Next.js and Pagefind) | Pass. 127 routes. Pagefind indexed 100 doc pages. Built HTML and the search index do not contain `loops.betterdata.co` or `LOOP_ENGINE_JWT_SECRET`. |
| `scripts/docs-guardrails.sh` (docs.betterdata.co) | Pass, including public OpenAPI validation |
| Hosted auth tests on `005b7d9` | 136 passed, including the new `requireTenant` collapse test |
| `@loop-engine/loop-definition` example parse test and typecheck | Pass. 6 repository YAML files parse |

No Vercel preview was created. These branches were not pushed. No production request changed state.

### Suggested commit message (docs site)

```
docs: align Boss Loops Cloud and OSS references with the shipped API

Public Cloud pages described a retired host and a customer-minted JWT.
Schema and adapter examples still used pre-1.0 fields and return values.
```

### Suggested commit message (docs.betterdata.co)

```
docs: point Boss Loops references at the Cloud API and app.bossloops.io

Remove the hosted-loops OpenAPI placeholder and the claim that external
callers authenticate with signed JWTs.
```
