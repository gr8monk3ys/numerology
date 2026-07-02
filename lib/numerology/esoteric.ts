/**
 * Esoteric systems that sit alongside numerology: Tarot Birth Cards,
 * Planes of Expression, Life Cycles, Bridge numbers, and the Western +
 * Chinese zodiac lookups.
 */

import { digitSum, reduceNumber, isMaster } from "./reduce";
import { normalizeName } from "./letters";
import { lifePathNumber, type BirthDate } from "./core";

// ---------------------------------------------------------------------------
// Tarot Birth Card (Mary K. Greer method)
// ---------------------------------------------------------------------------

export interface TarotBirthCard {
  /** Major Arcana index 1-21 — the "personality" card. */
  personality: number;
  /** Reduced to 1-9 — the "soul" card. */
  soul: number;
  same: boolean;
}

export function tarotBirthCard(date: BirthDate): TarotBirthCard {
  let total = date.month + date.day + date.year;
  while (total > 21) total = digitSum(total);
  const personality = total;
  // Soul card is the personality card reduced to a single Major Arcana (1-9).
  const soul = personality > 9 ? reduceNumber(personality, false) : personality;
  return { personality, soul, same: personality === soul };
}

// ---------------------------------------------------------------------------
// Planes of Expression (Physical / Mental / Emotional / Intuitive)
// ---------------------------------------------------------------------------

export type Plane = "physical" | "mental" | "emotional" | "intuitive";

/** Decoz / Juno Jordan letter classification (mirrors planes_of_expression.json). */
const PLANE_OF_LETTER: Record<string, Plane> = {};
for (const l of "DEMW") PLANE_OF_LETTER[l] = "physical";
for (const l of "AGHJLNP") PLANE_OF_LETTER[l] = "mental";
for (const l of "BIORSTXZ") PLANE_OF_LETTER[l] = "emotional";
for (const l of "CFKQUVY") PLANE_OF_LETTER[l] = "intuitive";

export interface PlanesResult {
  physical: number;
  mental: number;
  emotional: number;
  intuitive: number;
  total: number;
  dominant: Plane;
  percentages: Record<Plane, number>;
}

export function planesOfExpression(fullName: string): PlanesResult {
  const counts: Record<Plane, number> = {
    physical: 0,
    mental: 0,
    emotional: 0,
    intuitive: 0,
  };
  for (const letter of normalizeName(fullName)) {
    const plane = PLANE_OF_LETTER[letter];
    if (plane) counts[plane] += 1;
  }
  const total = counts.physical + counts.mental + counts.emotional + counts.intuitive;
  const planes: Plane[] = ["physical", "mental", "emotional", "intuitive"];
  const dominant = planes.reduce((a, b) => (counts[b] > counts[a] ? b : a), "physical");
  const pct = (n: number) => (total ? Math.round((n / total) * 100) : 0);
  return {
    ...counts,
    total,
    dominant,
    percentages: {
      physical: pct(counts.physical),
      mental: pct(counts.mental),
      emotional: pct(counts.emotional),
      intuitive: pct(counts.intuitive),
    },
  };
}

// ---------------------------------------------------------------------------
// Life Cycles (three periods)
// ---------------------------------------------------------------------------

export interface LifeCycle {
  index: 1 | 2 | 3;
  ruler: "month" | "day" | "year";
  value: number;
  isMaster: boolean;
  startAge: number;
  endAge: number | null;
  label: string;
}

export function lifeCycles(date: BirthDate): LifeCycle[] {
  const L = reduceNumber(lifePathNumber(date).value, false);
  const firstEnd = 36 - L;
  const secondEnd = firstEnd + 27;

  const defs: Array<{ ruler: LifeCycle["ruler"]; raw: number; start: number; end: number | null }> = [
    { ruler: "month", raw: date.month, start: 0, end: firstEnd },
    { ruler: "day", raw: date.day, start: firstEnd + 1, end: secondEnd },
    { ruler: "year", raw: date.year, start: secondEnd + 1, end: null },
  ];

  return defs.map((d, i) => {
    const value = reduceNumber(d.raw, true);
    return {
      index: (i + 1) as LifeCycle["index"],
      ruler: d.ruler,
      value,
      isMaster: isMaster(value),
      startAge: d.start,
      endAge: d.end,
      label: d.end === null ? `${d.start}+` : `${d.start}–${d.end}`,
    };
  });
}

// ---------------------------------------------------------------------------
// Bridge numbers (ease the gap between two core numbers)
// ---------------------------------------------------------------------------

export interface BridgeSet {
  lifePathExpression: number;
  soulUrgePersonality: number;
}

const single = (n: number) => reduceNumber(n, false);

export function bridgeNumbers(core: {
  lifePath: number;
  expression: number;
  soulUrge: number;
  personality: number;
}): BridgeSet {
  return {
    lifePathExpression: Math.abs(single(core.lifePath) - single(core.expression)),
    soulUrgePersonality: Math.abs(single(core.soulUrge) - single(core.personality)),
  };
}

// ---------------------------------------------------------------------------
// Lo Shu grid & the Arrows of Pythagoras
// ---------------------------------------------------------------------------

/** The eight lines of the Lo Shu square, keyed by their digits. */
export const LO_SHU_LINES: ReadonlyArray<readonly [number, number, number]> = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

/** The traditional Lo Shu arrangement, row by row (top to bottom). */
export const LO_SHU_SQUARE: ReadonlyArray<readonly [number, number, number]> = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

export interface LoShuResult {
  /** How many times each digit 1-9 appears in the birth date (0s ignored). */
  counts: Record<number, number>;
  /** Lines whose three digits are all present — arrows of strength. */
  strengths: Array<[number, number, number]>;
  /** Lines whose three digits are all absent — arrows of weakness. */
  weaknesses: Array<[number, number, number]>;
  /** Digits absent from the birth date. */
  missing: number[];
}

/**
 * Places the digits of the full birth date (day, month, year; zeros are not
 * placed) into the Lo Shu square and reads the completed and empty lines.
 */
export function loShuGrid(date: BirthDate): LoShuResult {
  const counts: Record<number, number> = {};
  const digitsOf = (n: number) => String(Math.abs(Math.trunc(n))).split("").map(Number);
  for (const d of [...digitsOf(date.day), ...digitsOf(date.month), ...digitsOf(date.year)]) {
    if (d >= 1 && d <= 9) counts[d] = (counts[d] ?? 0) + 1;
  }

  const has = (d: number) => (counts[d] ?? 0) > 0;
  const strengths: Array<[number, number, number]> = [];
  const weaknesses: Array<[number, number, number]> = [];
  for (const line of LO_SHU_LINES) {
    const present = line.filter(has).length;
    if (present === 3) strengths.push([...line]);
    else if (present === 0) weaknesses.push([...line]);
  }

  const missing: number[] = [];
  for (let d = 1; d <= 9; d++) if (!has(d)) missing.push(d);

  return { counts, strengths, weaknesses, missing };
}

// ---------------------------------------------------------------------------
// Zodiac lookups (data-driven so the engine stays free of content imports)
// ---------------------------------------------------------------------------

export interface ZodiacSign {
  sign: string;
  symbol: string;
  start: { month: number; day: number };
  end: { month: number; day: number };
  element: string;
  modality: string;
  rulingPlanet: string;
  traits: string[];
  numerologyNote: string;
}

export function sunSign(
  month: number,
  day: number,
  signs: ZodiacSign[],
): ZodiacSign | undefined {
  const val = month * 100 + day;
  return signs.find((s) => {
    const start = s.start.month * 100 + s.start.day;
    const end = s.end.month * 100 + s.end.day;
    return start <= end ? val >= start && val <= end : val >= start || val <= end;
  });
}

export interface ChineseZodiacSign {
  animal: string;
  emoji: string;
  traits: string[];
  summary: string;
  luckyNumbers: string[];
  element: string;
}

export function chineseZodiac<T = ChineseZodiacSign>(year: number, animals: T[]): T {
  const index = (((year - 4) % 12) + 12) % 12;
  return animals[index];
}
