import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import { TopNav } from "@/components/nav/TopNav";
import { DocsSearchModalHost } from "@/components/docs/DocsSearchModalHost";
import { EcosystemBanner } from "@/components/site/EcosystemBanner";
import { Footer } from "@/components/site/Footer";
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
    default: "Loop Engine — Operational decision control",
    template: "%s · Loop Engine"
  },
  description:
    "Operational decision control for governed AI systems. Finite states, deterministic guards, typed actors, and immutable evidence on every transition. Apache-2.0 licensed.",
  keywords: [
    "operational decision control",
    "governed operational state",
    "deterministic guards",
    "operational evidence",
    "governed transitions",
    "AI operational governance",
    "typed actors",
    "state machine runtime",
    "operational loops",
    "loop engine",
    "open source",
    "TypeScript"
  ],
  authors: [{ name: "Better Data, Inc.", url: "https://betterdata.co" }],
  creator: "Better Data, Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Loop Engine",
    title: "Loop Engine — Operational decision control",
    description:
      "Operational decision control for governed AI systems. Finite states, deterministic guards, typed actors, and immutable evidence on every transition.",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Loop Engine — Operational decision control"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Loop Engine — Operational decision control",
    description:
      "Operational decision control for governed AI systems. Finite states, deterministic guards, typed actors, and immutable evidence on every transition.",
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

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-NRGKK7RK22";

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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
