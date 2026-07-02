import lifePathData from "@/content/data/meanings_lifepath.json";
import type { NumberMeaning } from "./core";

export const lifePathMeanings = lifePathData as unknown as Record<string, NumberMeaning>;
