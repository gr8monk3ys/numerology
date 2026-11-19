import { describe, expect, it } from "vitest";
import { ADSENSE_PUBLISHER_ID, ADSENSE_SCRIPT_SRC, isAutomatedBrowser } from "./adsense";
import { readFileSync } from "node:fs";

describe("adsense", () => {
  it("flags webdriver and headless browsers, not ordinary ones", () => {
    expect(isAutomatedBrowser({ webdriver: true, userAgent: "Chrome" })).toBe(true);
    expect(isAutomatedBrowser({ userAgent: "Mozilla/5.0 HeadlessChrome/145.0" })).toBe(true);
    expect(isAutomatedBrowser({ webdriver: false, userAgent: "Mozilla/5.0 Chrome/145.0 Safari/537.36" })).toBe(false);
  });

  it("ads.txt authorises the same publisher the script loads", () => {
    const pub = ADSENSE_PUBLISHER_ID.replace("ca-", "");
    expect(readFileSync("public/ads.txt", "utf8")).toContain(`google.com, ${pub}, DIRECT`);
    expect(ADSENSE_SCRIPT_SRC).toContain(`client=${ADSENSE_PUBLISHER_ID}`);
  });
});
