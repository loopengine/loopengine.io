import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import { TopNav } from "@/components/nav/TopNav";
import { DocsSearchModalHost } from "@/components/docs/DocsSearchModalHost";
import { EcosystemBanner } from "@/components/site/EcosystemBanner";
import { Footer } from "@/components/site/Footer";
import { SITE, LEGACY } from "@/lib/site-config";
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

const BASE_URL = SITE.baseUrl;
const TITLE = `${SITE.productName} — ${SITE.tagline.replace(/\.$/, "")}`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: TITLE,
    template: `%s · ${SITE.brandName}`
  },
  description: SITE.metaDescription,
  keywords: [
    "AI operations control",
    "operational decision control infrastructure",
    "governed AI execution",
    "AI governance",
    "operational accountability",
    "traceability",
    "human-in-the-loop control",
    "decision loops",
    "deterministic guards",
    "AI agent governance",
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
    siteName: SITE.brandName,
    title: TITLE,
    description: SITE.metaDescription,
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: TITLE
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE.metaDescription,
    images: ["/og"],
    creator: LEGACY.twitter,
    site: LEGACY.twitter
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
