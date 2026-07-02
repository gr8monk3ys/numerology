/**
 * Canonical site origin for metadata, sitemap and share links.
 * Set NEXT_PUBLIC_SITE_URL in production; falls back to the Vercel deployment
 * URL, then to localhost for development.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const SITE_NAME = "Numen";

/** The book's chapters, shared by the navbar and the colophon. */
export const SITE_NAV = [
  { href: "/reading", label: "The Reading" },
  { href: "/compatibility", label: "Concordance" },
  { href: "/forecast", label: "Almanac" },
  { href: "/angel-numbers", label: "Portents" },
  { href: "/numbers", label: "Lexicon" },
  { href: "/about", label: "The Method" },
] as const;
export const SITE_TITLE = "Numen · Liber Numerorum";
export const SITE_DESCRIPTION =
  "An esoteric numerology grimoire: cast a full reading from your name and birth date — Life Path, Expression, Soul Urge, the karmic record, the Lo Shu grid, cycles, and the correspondences of tarot, planet and stone. Every reckoning is worked within your own device.";
