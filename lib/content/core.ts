/**
 * Shared content types and helpers — no JSON imports, so client routes that
 * need only one dataset don't drag the whole library into their bundle.
 */

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
export interface LoShuArrow {
  line: number[];
  presentName: string;
  present: string;
  absentName: string;
  absent: string;
}
export interface LoShuContent {
  _intro: string;
  _method: string;
  arrows: LoShuArrow[];
  digitCounts: Record<string, Record<string, string>>;
}

/** Safe lookup helper. */
export function pick<T>(map: Record<string, T>, key: number | string): T | undefined {
  return map[String(key)];
}

export const CORE_NUMBER_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "11", "22", "33"] as const;
