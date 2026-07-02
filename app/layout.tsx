import type { Metadata } from "next";
import { Grenze_Gotisch, EB_Garamond, UnifrakturMaguntia } from "next/font/google";
import "./globals.css";
import { Starfield } from "@/components/Starfield";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

// Gothic display for headings (only the weights actually set in CSS)
const gothic = Grenze_Gotisch({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-gothic",
  display: "swap",
});

// Old-style serif for body — an illuminated-manuscript hand
const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "numerology",
    "life path number",
    "expression number",
    "soul urge",
    "angel numbers",
    "chaldean numerology",
    "pythagorean numerology",
    "lo shu grid",
    "tarot birth card",
    "esoteric",
    "numerology calculator",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

/** Structured data: the site as a free client-side web application. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  alternateName: SITE_TITLE,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
        <a href="#content" className="skip-link">
          Pass over the ornament, to the matter itself
        </a>
        {/* Enable scroll-reveal only when JS is present, so no-JS visitors and
            crawlers still see all content. Runs before below-fold paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('reveal-ready')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Starfield />
        <div className="page-frame" aria-hidden="true" />
        <Navbar />
        <main id="content" tabIndex={-1} className="relative outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
