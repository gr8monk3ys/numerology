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

import type { AngelEntry } from "@/lib/numerology/angel";
import type { CompatibilityData } from "@/lib/numerology/compatibility";

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

/** Safe lookup helper. */
export function pick<T>(map: Record<string, T>, key: number | string): T | undefined {
  return map[String(key)];
}

export const CORE_NUMBER_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "11", "22", "33"] as const;
