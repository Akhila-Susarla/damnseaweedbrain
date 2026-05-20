import type { Metadata } from "next";
import { Bodoni_Moda, Inter, Syne, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import NavPanel from "@/components/nav/NavPanel";
import CursorSpotlight from "@/components/ui/CursorSpotlight";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://damnseaweedbrain.com"),
  title: "Akhila Susarla | AI/ML Engineer",
  description:
    "AI/ML Engineer and Data Scientist portfolio of Akhila Susarla — building production-grade conversational AI, ML pipelines, and data-driven solutions.",
  keywords: [
    "AI Engineer", "ML Engineer", "Data Scientist", "Machine Learning",
    "Conversational AI", "Portfolio", "Akhila Susarla", "Python", "NLP", "LLM",
  ],
  authors: [{ name: "Akhila Susarla" }],
  openGraph: {
    title: "Akhila Susarla | AI/ML Engineer",
    description: "AI/ML Engineer and Data Scientist portfolio of Akhila Susarla — building production-grade conversational AI, ML pipelines, and data-driven solutions.",
    url: "/", siteName: "Akhila Susarla", locale: "en_US", type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akhila Susarla | AI/ML Engineer",
    description: "AI/ML Engineer and Data Scientist portfolio of Akhila Susarla — building production-grade conversational AI, ML pipelines, and data-driven solutions.",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodoniModa.variable} ${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="bg-base text-cream font-body antialiased cursor-none"
      >
        <SmoothScroll>
          <CursorSpotlight />
          <NavPanel />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
