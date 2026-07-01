import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Starfield } from "@/components/Starfield";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://numerology.example.com"),
  title: {
    default: "Numen · Esoteric Numerology Calculator",
    template: "%s · Numen Numerology",
  },
  description:
    "Reveal the hidden numbers of your name and birth date. A complete esoteric numerology suite — Life Path, Expression, Soul Urge, Karmic Debt, Pinnacles, angel numbers, tarot & astrological correspondences, and more.",
  keywords: [
    "numerology",
    "life path number",
    "expression number",
    "soul urge",
    "angel numbers",
    "chaldean numerology",
    "pythagorean numerology",
    "esoteric",
    "numerology calculator",
  ],
  openGraph: {
    title: "Numen · Esoteric Numerology Calculator",
    description:
      "Reveal the hidden numbers of your name and birth date with a complete esoteric numerology suite.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body className="grain min-h-screen">
        {/* Enable scroll-reveal only when JS is present, so no-JS visitors and
            crawlers still see all content. Runs before below-fold paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('reveal-ready')",
          }}
        />
        <Starfield />
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
