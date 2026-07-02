import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { CORE_NUMBER_KEYS } from "@/lib/content/core";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/reading",
    "/compatibility",
    "/forecast",
    "/angel-numbers",
    "/numbers",
    "/about",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const numbers = CORE_NUMBER_KEYS.map((n) => ({
    url: `${SITE_URL}/numbers/${n}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...numbers];
}
