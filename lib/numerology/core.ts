/**
 * Core Pythagorean numbers: Life Path, Birthday, Expression (Destiny),
 * Soul Urge (Heart's Desire), Personality, and Maturity.
 *
 * All algorithms are verified against worked test cases in
 * content/data/methods_core.json and methods_advanced.json.
 */

import { classifyLetters, normalizeName, letterValue } from "./letters";
import { toInsight, reduceDetail, type NumberInsight } from "./reduce";

export interface NameParts {
  first: string;
  middle: string[];
  last: string;
  /** Every name token, in order. */
  all: string[];
}

/** Split a full name into first / middle(s) / last tokens. */
export function parseName(fullName: string): NameParts {
  const tokens = fullName
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => normalizeName(t).length > 0);
  if (tokens.length === 0) {
    return { first: "", middle: [], last: "", all: [] };
  }
  if (tokens.length === 1) {
    return { first: tokens[0], middle: [], last: "", all: tokens };
  }
  return {
    first: tokens[0],
    middle: tokens.slice(1, -1),
    last: tokens[tokens.length - 1],
    all: tokens,
  };
}

// ---------------------------------------------------------------------------
// Date-based numbers
// ---------------------------------------------------------------------------

export interface BirthDate {
  year: number;
  month: number; // 1-12
  day: number; // 1-31
}

/**
 * Life Path — reduce month, day and year each to a single digit or master,
 * then sum and reduce the total (preserving masters).
 */
export function lifePathNumber(date: BirthDate): NumberInsight {
  const month = reduceDetail(date.month).value;
  const day = reduceDetail(date.day).value;
  const year = reduceDetail(date.year).value;
  const total = month + day + year;
  return toInsight(total);
}

/** Birthday — the day of the month, reduced (preserving masters). */
export function birthdayNumber(date: BirthDate): NumberInsight {
  // Karmic debt for the birthday keys off the raw day (13th/14th/16th/19th),
  // which toInsight captures because the day is the starting total.
  return toInsight(date.day);
}

// ---------------------------------------------------------------------------
// Name-based numbers
// ---------------------------------------------------------------------------

/** Expression / Destiny — sum of every letter in the full name. */
export function expressionNumber(fullName: string): NumberInsight {
  const total = classifyLetters(fullName).reduce((s, l) => s + l.value, 0);
  return toInsight(total);
}

/** Soul Urge / Heart's Desire — sum of the vowels (Y optional). */
export function soulUrgeNumber(fullName: string, yAsVowel = false): NumberInsight {
  const total = classifyLetters(fullName, "pythagorean", yAsVowel)
    .filter((l) => l.isVowel)
    .reduce((s, l) => s + l.value, 0);
  return toInsight(total);
}

/** Personality — sum of the consonants (Y counts here unless it's a vowel). */
export function personalityNumber(fullName: string, yAsVowel = false): NumberInsight {
  const total = classifyLetters(fullName, "pythagorean", yAsVowel)
    .filter((l) => !l.isVowel)
    .reduce((s, l) => s + l.value, 0);
  return toInsight(total);
}

/**
 * Maturity — the already-reduced Life Path plus the already-reduced
 * Expression, reduced once more (preserving masters).
 */
export function maturityNumber(
  lifePathValue: number,
  expressionValue: number,
): NumberInsight {
  return toInsight(lifePathValue + expressionValue);
}

/** Convenience wrapper computing all name numbers at once. */
export function nameNumbers(fullName: string, yAsVowel = false) {
  return {
    expression: expressionNumber(fullName),
    soulUrge: soulUrgeNumber(fullName, yAsVowel),
    personality: personalityNumber(fullName, yAsVowel),
  };
}

/** Convenience wrapper computing all date numbers at once. */
export function dateNumbers(date: BirthDate) {
  return {
    lifePath: lifePathNumber(date),
    birthday: birthdayNumber(date),
  };
}

export { letterValue };
