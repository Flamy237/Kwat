import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { site } from "@/lib/content";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "wdth"],
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const title = "Kwat, le réseau des voisins de Bonamoussadi";
const description =
  "Entraide, alertes, marché et forum de quartier : la place numérique des habitants de Bonamoussadi, à Douala. Version de démonstration.";

// L'image de partage est app/opengraph-image.jpg : Next l'ajoute d'elle-même à ces balises.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  openGraph: { type: "website", locale: "fr_FR", siteName: site.name, url: "/", title, description },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = { themeColor: "#161D4D" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body>
        <noscript>
          <style>{`.curtain{display:none!important}`}</style>
        </noscript>
        <SmoothScroll />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
