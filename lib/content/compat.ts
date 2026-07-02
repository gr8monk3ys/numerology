import compatibilityData from "@/content/data/compatibility.json";
import type { CompatibilityData } from "@/lib/numerology/compatibility";

export const compatibilityProfiles =
  compatibilityData as unknown as CompatibilityData;
