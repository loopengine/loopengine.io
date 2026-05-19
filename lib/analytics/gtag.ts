/** Better Data ecosystem hostnames for GA4 cross-domain session linking. */
export const GA_LINKER_DOMAINS = [
  "betterdata.co",
  "www.betterdata.co",
  "docs.betterdata.co",
  "app.betterdata.co",
  "loopengine.io",
  "www.loopengine.io",
  "commercegateway.io",
  "www.commercegateway.io",
  "commercechain.io",
  "www.commercechain.io",
  "tagd.sh",
  "www.tagd.sh",
] as const;

function sanitizeGaId(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  const match = trimmed.match(/^(G|GT|AW|DC)-[A-Z0-9]+/i);
  return match ? match[0].toUpperCase() : undefined;
}

/** GA4 measurement ID (G-…) — used for gtag('config', …) and events. */
export function getGaMeasurementId(): string | undefined {
  return sanitizeGaId(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
}

/**
 * ID for the gtag.js loader script src.
 * When G-… returns 404 from googletagmanager.com (Google Tag provisioning bug),
 * set NEXT_PUBLIC_GA_TAG_ID to the Google Tag ID (GT-…) from Admin → Google tag.
 */
export function getGaLoaderScriptId(): string | undefined {
  return sanitizeGaId(process.env.NEXT_PUBLIC_GA_TAG_ID) ?? getGaMeasurementId();
}

export function formatGaLinkerDomainsForScript(): string {
  return GA_LINKER_DOMAINS.map((domain) => `'${domain}'`).join(",\n          ");
}
