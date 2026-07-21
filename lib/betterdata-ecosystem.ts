/**
 * Boss Loops GTM copy. Rebranded from the previous "Loop Engine" Phase 0B strings.
 * NOTE: the bd-forge glossary lock still uses Loop Engine naming and needs its
 * own sync pass (tracked in the rebrand fast-follow). Track-A copy here is the
 * source of truth for this site. See `.cursor/rules/rebrand-glossary.md`.
 * Symbol names are kept stable to avoid churn at import sites.
 */
import { SITE } from "@/lib/site-config";

export const LOOP_ENGINE_HERO_HEADLINE =
  "Your ERP records what happened. Boss Loops governs what happens next.";

export const LOOP_ENGINE_AUDITOR_LINE =
  "When someone asks why it was approved — leadership, operations, or audit — you don't reconstruct the story. You retrieve it.";

export const LOOP_ENGINE_PRIMARY =
  "Boss Loops is the Decision Governance layer for operational AI — the system of record for consequential decisions that agents, automations, and humans make together.";

export const LOOP_ENGINE_SUPPORTING =
  "Workflow engines run the steps. Analytics platforms optimize the model. Boss Loops governs the commit — binding every transition to frozen evidence, deterministic guards, and an immutable Decision Record.";

export const LOOP_ENGINE_META_DESCRIPTION = SITE.metaDescription;

export const BETTERDATA_CCO_URL = "https://betterdata.co/products/cco";
export const BETTERDATA_OPEN_INFRA_URL = "https://betterdata.co/open-source";
// Track B: hosted product URL on Better Data (unchanged until renamed upstream).
export const BETTERDATA_LOOP_ENGINE_CLOUD_URL = SITE.legacy.cloudUrl;

export const ECOSYSTEM_STRIP =
  `${SITE.productName} is open core — inspect and self-host the Apache-2.0 engine, or run governed decisions on ${SITE.cloudName}.`;

export const LOOP_ENGINE_CCO_LINE =
  `Run standalone on any stack, or compose with ${SITE.cloudName} and Commerce Chain modules on Better Data.`;
