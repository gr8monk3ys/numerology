/**
 * Canonical site URL, derived from the environment so it is correct on any
 * Vercel deployment without hardcoding a domain:
 *   1. NEXT_PUBLIC_SITE_URL — explicit override (set once a custom domain exists)
 *   2. VERCEL_PROJECT_PRODUCTION_URL — provided by Vercel at build time
 *   3. fallback for local dev
 */
const raw =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://numerology.vercel.app");

export const SITE_URL = raw.replace(/\/$/, "");

export const SITE_NAME = "Numen";

/**
 * Serialize an object for a JSON-LD <script> tag. Escaping `<` prevents a
 * `</script>` inside any string value from terminating the tag early.
 */
export function safeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
