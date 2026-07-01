/**
 * Assembles a complete numerology reading from a name and birth date.
 */

import {
  parseName,
  lifePathNumber,
  birthdayNumber,
  expressionNumber,
  soulUrgeNumber,
  personalityNumber,
  maturityNumber,
  type BirthDate,
  type NameParts,
} from "./core";
import {
  balanceNumber,
  karmicLessons,
  hiddenPassion,
  subconsciousSelf,
  rationalThought,
  cornerstone,
  capstone,
  firstVowel,
  letterValueCounts,
  type LetterTrait,
  type ValueCounts,
} from "./advanced";
import { chaldeanNumber, type ChaldeanResult } from "./chaldean";
import {
  personalCycles,
  pinnacles,
  challenges,
  type PersonalCycles,
  type CyclePeriod,
} from "./cycles";
import type { KarmicDebtNumber, NumberInsight } from "./reduce";

export interface KarmicDebtHit {
  source: string;
  debt: KarmicDebtNumber;
}

export interface ReadingInput {
  fullName: string;
  birth: BirthDate;
  yAsVowel?: boolean;
  /** Target date for the forecasting cycles (defaults to the birth year). */
  today?: { year: number; month: number; day: number };
}

export interface CoreNumbers {
  lifePath: NumberInsight;
  birthday: NumberInsight;
  expression: NumberInsight;
  soulUrge: NumberInsight;
  personality: NumberInsight;
  maturity: NumberInsight;
  balance: NumberInsight;
}

export interface AdvancedNumbers {
  karmicDebts: KarmicDebtHit[];
  karmicLessons: number[];
  hiddenPassion: number[];
  subconsciousSelf: number;
  rationalThought: NumberInsight;
  cornerstone: LetterTrait | null;
  capstone: LetterTrait | null;
  firstVowel: LetterTrait | null;
  letterCounts: ValueCounts;
}

export interface Forecast {
  personal: PersonalCycles;
  pinnacles: CyclePeriod[];
  challenges: CyclePeriod[];
}

export interface Reading {
  name: NameParts;
  fullName: string;
  birth: BirthDate;
  yAsVowel: boolean;
  core: CoreNumbers;
  advanced: AdvancedNumbers;
  chaldean: ChaldeanResult;
  forecast: Forecast;
}

function collectKarmicDebts(core: CoreNumbers): KarmicDebtHit[] {
  const sources: Array<[string, NumberInsight]> = [
    ["Life Path", core.lifePath],
    ["Expression", core.expression],
    ["Soul Urge", core.soulUrge],
    ["Personality", core.personality],
    ["Birthday", core.birthday],
  ];
  const hits: KarmicDebtHit[] = [];
  for (const [source, insight] of sources) {
    if (insight.karmicDebt) hits.push({ source, debt: insight.karmicDebt });
  }
  return hits;
}

export function buildReading(input: ReadingInput): Reading {
  const { fullName, birth } = input;
  const yAsVowel = input.yAsVowel ?? false;
  const today = input.today ?? { year: birth.year, month: birth.month, day: birth.day };
  const name = parseName(fullName);

  const lifePath = lifePathNumber(birth);
  const expression = expressionNumber(fullName);
  const core: CoreNumbers = {
    lifePath,
    birthday: birthdayNumber(birth),
    expression,
    soulUrge: soulUrgeNumber(fullName, yAsVowel),
    personality: personalityNumber(fullName, yAsVowel),
    maturity: maturityNumber(lifePath.value, expression.value),
    balance: balanceNumber(fullName),
  };

  const advanced: AdvancedNumbers = {
    karmicDebts: collectKarmicDebts(core),
    karmicLessons: karmicLessons(fullName),
    hiddenPassion: hiddenPassion(fullName),
    subconsciousSelf: subconsciousSelf(fullName),
    rationalThought: rationalThought(name.first, birth.day),
    cornerstone: cornerstone(name.first),
    capstone: capstone(name.first),
    firstVowel: firstVowel(name.first),
    letterCounts: letterValueCounts(fullName),
  };

  const forecast: Forecast = {
    personal: personalCycles(birth, today),
    pinnacles: pinnacles(birth),
    challenges: challenges(birth),
  };

  return {
    name,
    fullName,
    birth,
    yAsVowel,
    core,
    advanced,
    chaldean: chaldeanNumber(fullName),
    forecast,
  };
}
