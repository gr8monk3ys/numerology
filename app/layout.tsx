import type { Metadata } from "next";
import { Grenze_Gotisch, EB_Garamond, UnifrakturMaguntia } from "next/font/google";
import "./globals.css";
import { Starfield } from "@/components/Starfield";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Gothic display for headings
const gothic = Grenze_Gotisch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-gothic",
  display: "swap",
});

// Old-style serif for body — an illuminated-manuscript hand
const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

// Blackletter for the wordmark, drop-caps and initials
const blackletter = UnifrakturMaguntia({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-blackletter",
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
      className={`${gothic.variable} ${garamond.variable} ${blackletter.variable}`}
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
        <div className="page-frame" aria-hidden="true" />
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
