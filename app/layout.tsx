import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import { TopNav } from "@/components/nav/TopNav";
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
    default: "Loop Engine",
    template: "%s · Loop Engine"
  },
  description:
    "Open runtime for constrained, observable, and improvable enterprise operational loops. Apache-2.0 licensed.",
  keywords: [
    "loop engine",
    "enterprise runtime",
    "state machine",
    "AI actor",
    "operational loops",
    "open source",
    "TypeScript",
    "workflow engine"
  ],
  authors: [{ name: "Better Data, Inc.", url: "https://betterdata.co" }],
  creator: "Better Data, Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Loop Engine",
    title: "Loop Engine",
    description:
      "Open runtime for constrained, observable, and improvable enterprise operational loops.",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Loop Engine — Open Runtime"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Loop Engine",
    description:
      "Open runtime for constrained, observable, and improvable enterprise operational loops.",
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
  icons: {
    icon: [{ url: "/brand/favicon.svg", type: "image/svg+xml" }]
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
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <TopNav />
        <main id="main-content">{children}</main>
        <Footer />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NRGKK7RK22"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NRGKK7RK22');
          `}
        </Script>
      </body>
    </html>
  );
}
