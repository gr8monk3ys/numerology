import type { Metadata } from "next";
import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Backdrop } from "@/components/Backdrop";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Editorial serif for headlines (italic used for the accent word)
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

// Neutral sans for body copy
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

// Monospace for labels, numerals and the terminal
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen">
        {/* Enable scroll-reveal only when JS is present, so no-JS visitors and
            crawlers still see all content. Runs before below-fold paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('reveal-ready')",
          }}
        />
        <Backdrop />
        <Navbar />
        <main className="rails relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
