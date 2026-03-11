import type { ReactNode } from "react";
import { DocsPager } from "@/components/nav/DocsPager";
import { DocsSidebar } from "@/components/nav/DocsSidebar";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-56px)] lg:grid lg:grid-cols-[var(--sidebar-width)_1fr]">
      <DocsSidebar />
      <div className="mx-auto w-full max-w-[680px] px-4 py-6 md:px-6 md:py-8 lg:max-w-[var(--max-width-content)] lg:px-16 lg:py-12">
        {children}
        <DocsPager />
      </div>
    </div>
  );
}
