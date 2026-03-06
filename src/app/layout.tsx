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
  title: "DamnSeaweedBrain",
  description:
    "A BSD-themed data science portfolio -- where detective agency case files meet machine learning.",
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
