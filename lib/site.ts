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
export const SITE_TITLE = "Numen · Liber Numerorum";
export const SITE_DESCRIPTION =
  "An esoteric numerology grimoire: cast a full reading from your name and birth date — Life Path, Expression, Soul Urge, the karmic record, the Lo Shu grid, cycles, and the correspondences of tarot, planet and stone. Every reckoning is worked within your own device.";
