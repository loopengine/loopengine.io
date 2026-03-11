import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Loop Engine",
  description: "Open runtime for observable, controllable operational loops.",
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
      </body>
    </html>
  );
}
