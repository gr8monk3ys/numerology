import compatibilityData from "@/content/data/compatibility.json";
import type { CompatibilityData } from "@/lib/numerology/compatibility";

/**
 * The compatibility profiles on their own, for the client form that scores a
 * pair; importing the `@/lib/content` barrel there shipped every dataset
 * (bundle-barrel-imports).
 */
export const compatibilityProfiles = compatibilityData as unknown as CompatibilityData;
