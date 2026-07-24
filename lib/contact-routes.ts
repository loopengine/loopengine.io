/**
 * Central contact, demo, and sales URLs for bossloops.io.
 * Dub-style intent routing: self-serve demo vs sales form vs docs.
 */

export const DEMO_URL = "https://demo.bossloops.io";

/** Better Data Copper form — intent=loop-engine pre-fills Boss Loops Cloud focus. */
export const SALES_CONTACT_URL =
  "https://betterdata.co/company/contact?intent=loop-engine";

export const CONTACT_PAGE = "/contact";

/** Sales form with tier hint folded into intent (contact form reads ?intent=). */
export function salesContactForTier(tier: "starter" | "team" | "enterprise" | "pricing"): string {
  const subjects: Record<string, string> = {
    starter: "loop-engine",
    team: "loop-engine",
    enterprise: "enterprise",
    pricing: "loop-engine",
  };
  return `https://betterdata.co/company/contact?intent=${subjects[tier]}`;
}
