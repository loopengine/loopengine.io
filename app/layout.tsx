import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import { TopNav } from "@/components/nav/TopNav";
import { DocsSearchModalHost } from "@/components/docs/DocsSearchModalHost";
import { EcosystemBanner } from "@/components/site/EcosystemBanner";
import { Footer } from "@/components/site/Footer";
import { LOOP_ENGINE_META_DESCRIPTION } from "@/lib/betterdata-ecosystem";
import "./globals.css";
import "../styles/tokens.css";
import "../styles/globals.css";
import "../styles/docs.css";

const displayFont = DM_Serif_Display({
  variable: "--font-display-next",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const bodyFont = DM_Sans({
  variable: "--font-body-next",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono-next",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const BASE_URL = "https://loopengine.io";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Loop Engine — Governed operational runtime",
    template: "%s · Loop Engine"
  },
  description: LOOP_ENGINE_META_DESCRIPTION,
  keywords: [
    "governed operational runtime",
    "operational decision runtime",
    "decision loops",
    "deterministic guards",
    "operational evidence",
    "governed transitions",
    "AI operational governance",
    "typed actors",
    "loop engine",
    "open source",
    "TypeScript"
  ],
  authors: [{ name: "Better Data", url: "https://betterdata.co" }],
  creator: "Better Data",
  publisher: "Better Data",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Loop Engine",
    title: "Loop Engine — Governed operational runtime",
    description: LOOP_ENGINE_META_DESCRIPTION,
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Loop Engine — Governed operational runtime"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Loop Engine — Governed operational runtime",
    description: LOOP_ENGINE_META_DESCRIPTION,
    images: ["/og"],
    creator: "@loopengineio",
    site: "@loopengineio"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: BASE_URL
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} scroll-smooth`}
    >
      <body className="antialiased">
        <GoogleAnalytics />
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <PostHogProvider>
          <EcosystemBanner />
          <TopNav />
          <DocsSearchModalHost />
          <main id="main-content">{children}</main>
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  );
}
