import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { angelNumbers, CORE_NUMBER_KEYS } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/reading",
    "/compatibility",
    "/forecast",
    "/numbers",
    "/angel-numbers",
    "/about",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const numberRoutes = CORE_NUMBER_KEYS.map((n) => ({
    url: `${SITE_URL}/numbers/${n}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const angelRoutes = angelNumbers.map((entry) => ({
    url: `${SITE_URL}/angel-numbers/${entry.number}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...numberRoutes, ...angelRoutes];
}
