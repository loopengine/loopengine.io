import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const BRAND_ORIGIN = "https://bossloops.io";
const APP_ORIGIN = "https://app.bossloops.io";

/** Paths that describe or deep-link the hosted product API → canonical app origin. */
function isAppDeepPath(pathname: string): boolean {
  return (
    pathname.startsWith("/docs/integrations/loop-engine-cloud-api") ||
    pathname.startsWith("/api/")
  );
}

/**
 * LOCK-2 brand consolidation: loopengine.io site folds under Boss Loops brand.
 * `@loop-engine/*` npm namespace unchanged (BL-BRAND-01).
 */
export function middleware(request: NextRequest): NextResponse {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (host !== "loopengine.io" && host !== "www.loopengine.io") {
    return NextResponse.next();
  }

  const path = request.nextUrl.pathname;
  const search = request.nextUrl.search;
  const targetBase = isAppDeepPath(path) ? APP_ORIGIN : BRAND_ORIGIN;
  const target = new URL(`${path}${search}`, targetBase);
  return NextResponse.redirect(target, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|pagefind).*)"],
};
