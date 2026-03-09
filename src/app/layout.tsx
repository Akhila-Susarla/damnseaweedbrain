import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono, Caveat } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import NavPanel from "@/components/nav/NavPanel";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://damnseaweedbrain.com"),
  title: "Akhila Susarla | Data Scientist",
  description:
    "Data Scientist portfolio of Akhila Susarla -- uncovering insights from data with the precision of a detective agency investigation.",
  keywords: [
    "Data Scientist",
    "Machine Learning",
    "Portfolio",
    "Akhila Susarla",
    "Python",
    "NLP",
  ],
  authors: [{ name: "Akhila Susarla" }],
  openGraph: {
    title: "Akhila Susarla | Data Scientist",
    description:
      "Data Scientist portfolio of Akhila Susarla -- uncovering insights from data with the precision of a detective agency investigation.",
    url: "/",
    siteName: "DamnSeaweedBrain",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akhila Susarla | Data Scientist",
    description:
      "Data Scientist portfolio of Akhila Susarla -- uncovering insights from data with the precision of a detective agency investigation.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <body className="bg-midnight text-parchment font-body antialiased">
        <SmoothScroll>
          <NavPanel />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
