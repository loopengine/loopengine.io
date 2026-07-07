/**
 * Boss Loops GTM copy. Rebranded from the previous "Loop Engine" Phase 0B strings.
 * NOTE: the bd-forge glossary lock still uses Loop Engine naming and needs its
 * own sync pass (tracked in the rebrand fast-follow). Track-A copy here is the
 * source of truth for this site. See `.cursor/rules/rebrand-glossary.md`.
 * Symbol names are kept stable to avoid churn at import sites.
 */
import { SITE } from "@/lib/site-config";

export const LOOP_ENGINE_HERO_HEADLINE =
  "The system of record for decisions.";

export const LOOP_ENGINE_PRIMARY =
  "Boss Loops is operational decision control infrastructure — the coordination layer between AI and real-world operations.";

export const LOOP_ENGINE_SUPPORTING =
  "Boss Loops governs how AI executes against your systems, so you can scale operational execution while keeping accountability, governance, traceability, and control.";

export const LOOP_ENGINE_META_DESCRIPTION = SITE.metaDescription;

export const BETTERDATA_CCO_URL = "https://betterdata.co/products/cco";
export const BETTERDATA_OPEN_INFRA_URL = "https://betterdata.co/open-source";
// Track B: hosted product URL on Better Data (unchanged until renamed upstream).
export const BETTERDATA_LOOP_ENGINE_CLOUD_URL = SITE.legacy.cloudUrl;

export const ECOSYSTEM_STRIP =
  `Apache-2.0 governed runtime — self-host with ${SITE.legacy.npmScope}/sdk or adopt ${SITE.cloudName} on Better Data.`;

export const LOOP_ENGINE_CCO_LINE =
  `Run standalone on any stack, or compose with ${SITE.cloudName} and Commerce Chain modules on Better Data.`;
