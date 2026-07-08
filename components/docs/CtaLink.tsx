"use client";

import type { ComponentProps } from "react";
import { trackBossLoopsCloudCtaClicked } from "@/lib/analytics/events";

type CtaLinkProps = ComponentProps<"a"> & {
  /** Stable CTA identifier, e.g. "early_access" | "waitlist" | "sales" | "start_cloud" */
  cta: string;
  /** Optional surface label for analytics, e.g. "boss-loops/cloud" */
  location?: string;
};

/**
 * Anchor that fires `boss_loops_cloud_cta_clicked` (5B) on click. Ported from
 * docs.betterdata.co in the launch-docs consolidation (LD-2) — event name and
 * cta/location labels must stay identical to preserve the funnel. Best-effort
 * and non-blocking: tracking failures never prevent navigation.
 */
export function CtaLink({ cta, location, href, children, ...rest }: CtaLinkProps) {
  return (
    <a
      href={href}
      onClick={() => {
        try {
          trackBossLoopsCloudCtaClicked({
            cta,
            destination: typeof href === "string" ? href : "",
            location,
          });
        } catch {
          // analytics must never break the link
        }
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
