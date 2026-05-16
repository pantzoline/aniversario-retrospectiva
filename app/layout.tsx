import type { Metadata, Viewport } from "next";
import { Playfair_Display, Outfit } from "next/font/google";

import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "A Jornada dos 21 Anos da Manu",
  description:
    "Um tabuleiro magico feito especialmente para a Manu. Cada estrela guarda uma surpresa.",
};

export const viewport: Viewport = {
  themeColor: "#050011",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfairDisplay.variable} ${outfit.variable} bg-background`}
    >
      <body className="font-sans antialiased min-h-dvh overflow-x-hidden">
        {children}

      </body>
    </html>
  );
}
