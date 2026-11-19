import type { Metadata, Viewport } from "next";
import { UnifrakturCook, Texturina } from "next/font/google";
import "./globals.css";
import { AdSenseScript } from "@/components/AdSense";
import { ADSENSE_PUBLISHER_ID } from "@/lib/adsense";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Blackletter for the wordmark, the two top heading levels and every numeral.
const fraktur = UnifrakturCook({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-fraktur",
  display: "swap",
});

// A text face cut from the same pen as the blackletter, for everything read.
const texturina = Texturina({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-texturina",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://numerology-sigma-vert.vercel.app"),
  title: {
    default: "Numen · Esoteric Numerology Calculator",
    template: "%s · Numen",
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
  // Lets AdSense verify the site without waiting for its script to load.
  other: { "google-adsense-account": ADSENSE_PUBLISHER_ID },
};

// The browser chrome matches the page: the ink-950 night ground.
export const viewport: Viewport = {
  themeColor: "#0a0911",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraktur.variable} ${texturina.variable}`}
    >
      <body className="min-h-screen">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <AdSenseScript />
      </body>
    </html>
  );
}
