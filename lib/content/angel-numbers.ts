import angelData from "@/content/data/angel_numbers.json";
import type { AngelEntry } from "@/lib/numerology/angel";

/**
 * The angel-number library on its own. The client lookup imports this module
 * directly instead of the `@/lib/content` barrel, which pulled every meaning,
 * tarot and zodiac dataset (~220 KB) into the /angel-numbers bundle
 * (react-best-practices: bundle-barrel-imports).
 */
export const angelNumbers = angelData as unknown as AngelEntry[];
