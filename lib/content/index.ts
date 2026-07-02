/**
 * Full content library. The reading suite (which genuinely needs nearly every
 * dataset client-side) and server pages import from here; lighter client
 * routes import the narrow modules (./angel, ./compat, ./cyclesContent,
 * ./lifepath) directly so their bundles stay small.
 */

import expressionData from "@/content/data/meanings_expression.json";
import soulUrgeData from "@/content/data/meanings_soulurge.json";
import personalityData from "@/content/data/meanings_personality.json";
import birthdayData from "@/content/data/meanings_birthday.json";
import masterKarmicData from "@/content/data/meanings_master_karmic.json";
import correspondenceData from "@/content/data/correspondences.json";
import tarotData from "@/content/data/tarot_major.json";
import bridgeData from "@/content/data/bridge_numbers.json";
import planesData from "@/content/data/planes_of_expression.json";
import lifeCyclesData from "@/content/data/life_cycles.json";
import chineseData from "@/content/data/chinese_zodiac.json";
import zodiacData from "@/content/data/zodiac_signs.json";
import loShuData from "@/content/data/lo_shu.json";

import type { ZodiacSign, ChineseZodiacSign } from "@/lib/numerology/esoteric";
import type {
  NumberMeaning,
  BirthdayMeaning,
  Correspondence,
  MasterMeaning,
  KarmicDebtMeaning,
  TarotCard,
  BridgeMeaning,
  PlanesContent,
  LifeCyclesContent,
  LoShuContent,
} from "./core";

// Shared helpers/types and the split datasets, re-exported for convenience.
export * from "./core";
export { lifePathMeanings } from "./lifepath";
export { personalYearMeanings, pinnacleMeanings, challengeMeanings } from "./cyclesContent";
export { angelNumbers } from "./angel";
export { compatibilityProfiles } from "./compat";

type NumberMap = Record<string, NumberMeaning>;

export const expressionMeanings = expressionData as unknown as NumberMap;
export const soulUrgeMeanings = soulUrgeData as unknown as NumberMap;
export const personalityMeanings = personalityData as unknown as NumberMap;
export const birthdayMeanings = birthdayData as unknown as Record<string, BirthdayMeaning>;
export const correspondences = correspondenceData as unknown as Record<string, Correspondence>;

export const masterMeanings = (
  masterKarmicData as { master: Record<string, MasterMeaning> }
).master;
export const karmicDebtMeanings = (
  masterKarmicData as { karmicDebt: Record<string, KarmicDebtMeaning> }
).karmicDebt;

export const tarotMajor = tarotData as unknown as Record<string, TarotCard>;
export const bridgeMeanings = bridgeData as unknown as Record<string, BridgeMeaning>;
export const planesContent = planesData as unknown as PlanesContent;
export const lifeCyclesContent = lifeCyclesData as unknown as LifeCyclesContent;
export const chineseZodiacData = chineseData as unknown as ChineseZodiacSign[];
export const zodiacSignsData = zodiacData as unknown as ZodiacSign[];
export const loShuContent = loShuData as unknown as LoShuContent;
