import Link from "next/link";
import { BETTERDATA_CCO_URL, ECOSYSTEM_STRIP } from "@/lib/betterdata-ecosystem";

export function EcosystemBanner() {
  return (
    <div className="border-b border-[var(--color-border)] bg-[var(--color-surface-alt)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 px-4 py-2 text-center sm:flex-row sm:gap-4 sm:text-left">
        <p className="max-w-3xl text-[11px] leading-snug text-[var(--color-ink-secondary)] sm:text-xs">{ECOSYSTEM_STRIP}</p>
        <Link
          href={BETTERDATA_CCO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[11px] font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline sm:text-xs"
        >
          See Commerce Chain Optimization →
        </Link>
      </div>
    </div>
  );
}
