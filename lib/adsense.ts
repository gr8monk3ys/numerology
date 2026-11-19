// One AdSense account covers every site: same publisher as healthcalc.xyz.
export const ADSENSE_PUBLISHER_ID = "ca-pub-4505962980988232";

export const ADSENSE_SCRIPT_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`;

/**
 * Set NEXT_PUBLIC_ADSENSE_GOOGLE_CMP=1 once a consent message is published in
 * AdSense (Privacy & messaging). Google's tag then asks for ad consent itself
 * where the law requires it. Until then no ad code loads at all: serving the
 * tag with no consent tool in place is not lawful in the EEA.
 */
export const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_GOOGLE_CMP === "1";

/** Slot ids are created per site in AdSense; a unit renders nothing until its id is set. */
export const AD_SLOTS = {
  reading: process.env.NEXT_PUBLIC_ADSENSE_SLOT_READING ?? "",
  content: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT ?? "",
} as const;

const AUTOMATED_BROWSER_PATTERN = /\b(?:HeadlessChrome|PhantomJS|Playwright|puppeteer)\b/i;

/** Crawlers and test runners must not request ads: AdSense counts it as invalid traffic. */
export function isAutomatedBrowser(nav: { userAgent?: string; webdriver?: boolean }): boolean {
  return nav.webdriver === true || AUTOMATED_BROWSER_PATTERN.test(nav.userAgent ?? "");
}
