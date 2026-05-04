import path from "node:path";

export const docsContentRoot = path.join(process.cwd(), "content", "docs");

const PROTECTED_SEGMENTS = new Set(["internal", "_draft", "_incoming"]);

/**
 * True when the relative slug path (e.g. `getting-started/quick-start`) may be routed and indexed.
 */
export function isPublicDocPath(slugPath: string): boolean {
  if (!slugPath || slugPath.includes("..")) return false;
  const parts = slugPath.split("/").filter(Boolean);
  for (const p of parts) {
    if (PROTECTED_SEGMENTS.has(p)) return false;
  }
  return true;
}

export function assertPublicDocPath(slugPath: string, context: string): void {
  if (!isPublicDocPath(slugPath)) {
    throw new Error(`[docs] Refusing ${context}: protected or invalid path "${slugPath}"`);
  }
}
