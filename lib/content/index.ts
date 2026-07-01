/**
 * Typed loaders for the generated numerology content in content/data/*.json.
 */

import lifePathData from "@/content/data/meanings_lifepath.json";
import expressionData from "@/content/data/meanings_expression.json";
import soulUrgeData from "@/content/data/meanings_soulurge.json";
import personalityData from "@/content/data/meanings_personality.json";
import birthdayData from "@/content/data/meanings_birthday.json";
import personalYearData from "@/content/data/meanings_personalyear.json";
import pinnacleChallengeData from "@/content/data/meanings_pinnacle_challenge.json";
import masterKarmicData from "@/content/data/meanings_master_karmic.json";
import correspondenceData from "@/content/data/correspondences.json";
import angelData from "@/content/data/angel_numbers.json";
import compatibilityData from "@/content/data/compatibility.json";
import tarotData from "@/content/data/tarot_major.json";
import bridgeData from "@/content/data/bridge_numbers.json";
import planesData from "@/content/data/planes_of_expression.json";
import lifeCyclesData from "@/content/data/life_cycles.json";
import chineseData from "@/content/data/chinese_zodiac.json";
import zodiacData from "@/content/data/zodiac_signs.json";

import type { AngelEntry } from "@/lib/numerology/angel";
import type { CompatibilityData } from "@/lib/numerology/compatibility";
import type { ZodiacSign, ChineseZodiacSign, Plane } from "@/lib/numerology/esoteric";

export interface NumberMeaning {
  title: string;
  keywords: string[];
  summary: string;
  strengths: string[];
  challenges: string[];
  detailed: string;
}

export interface BirthdayMeaning {
  title: string;
  summary: string;
  traits: string[];
}

export interface Correspondence {
  tarot: string;
  rulingPlanet: string;
  zodiac: string;
  element: string;
  colors: string[];
  gemstones: string[];
  metal: string;
  chakra: string;
  dayOfWeek: string;
  musicalNote: string;
  keywords: string[];
}

export interface PersonalYearMeaning {
  theme: string;
  summary: string;
  focus: string[];
  advice: string;
  keywords: string[];
}

export interface PinnacleMeaning {
  summary: string;
  focus: string[];
}
export interface ChallengeMeaning {
  summary: string;
  growth: string;
}

export interface MasterMeaning {
  title: string;
  summary: string;
  gifts: string[];
  challenges: string[];
  detailed: string;
}
export interface KarmicDebtMeaning {
  title: string;
  summary: string;
  lesson: string;
  detailed: string;
}

type NumberMap = Record<string, NumberMeaning>;

export const lifePathMeanings = lifePathData as unknown as NumberMap;
export const expressionMeanings = expressionData as unknown as NumberMap;
export const soulUrgeMeanings = soulUrgeData as unknown as NumberMap;
export const personalityMeanings = personalityData as unknown as NumberMap;
export const birthdayMeanings = birthdayData as unknown as Record<string, BirthdayMeaning>;
export const personalYearMeanings = personalYearData as unknown as Record<string, PersonalYearMeaning>;
export const correspondences = correspondenceData as unknown as Record<string, Correspondence>;
export const angelNumbers = angelData as unknown as AngelEntry[];
export const compatibilityProfiles = compatibilityData as unknown as CompatibilityData;

export const pinnacleMeanings = (
  pinnacleChallengeData as { pinnacles: Record<string, PinnacleMeaning> }
).pinnacles;
export const challengeMeanings = (
  pinnacleChallengeData as { challenges: Record<string, ChallengeMeaning> }
).challenges;

export const masterMeanings = (
  masterKarmicData as { master: Record<string, MasterMeaning> }
).master;
export const karmicDebtMeanings = (
  masterKarmicData as { karmicDebt: Record<string, KarmicDebtMeaning> }
).karmicDebt;

// --- Esoteric datasets -----------------------------------------------------

export interface TarotCard {
  name: string;
  keywords: string[];
  upright: string;
  reversed: string;
  numerology: string;
  birthCard: string;
}
export interface BridgeMeaning {
  title: string;
  summary: string;
  advice: string;
}
export interface PlaneContent {
  title: string;
  letters: string[];
  meaning: string;
  high: string;
  low: string;
}
export interface PlanesContent {
  _intro: string;
  physical: PlaneContent;
  mental: PlaneContent;
  emotional: PlaneContent;
  intuitive: PlaneContent;
}
export interface LifeCyclesContent {
  _intro: string;
  positions: Record<"first" | "second" | "third", { title: string; framing: string }>;
  numbers: Record<string, { summary: string }>;
}

export const tarotMajor = tarotData as unknown as Record<string, TarotCard>;
export const bridgeMeanings = bridgeData as unknown as Record<string, BridgeMeaning>;
export const planesContent = planesData as unknown as PlanesContent;
export const lifeCyclesContent = lifeCyclesData as unknown as LifeCyclesContent;
export const chineseZodiacData = chineseData as unknown as ChineseZodiacSign[];
export const zodiacSignsData = zodiacData as unknown as ZodiacSign[];

export const planeKeyList: Plane[] = ["physical", "mental", "emotional", "intuitive"];

/** Safe lookup helper. */
export function pick<T>(map: Record<string, T>, key: number | string): T | undefined {
  return map[String(key)];
}

export const CORE_NUMBER_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "11", "22", "33"] as const;
