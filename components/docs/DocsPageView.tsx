"use client";

import { useEffect } from "react";
import { trackDocsPageView } from "@/lib/analytics/events";

type DocsPageViewProps = {
  slugPath: string;
  title: string;
};

/** Fires once per client navigation to a doc route. */
export function DocsPageView({ slugPath, title }: DocsPageViewProps) {
  useEffect(() => {
    trackDocsPageView({ slug: slugPath, title });
  }, [slugPath, title]);

  return null;
}
