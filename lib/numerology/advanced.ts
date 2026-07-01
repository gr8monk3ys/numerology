/**
 * Advanced Pythagorean numbers derived from the name:
 * Balance, Karmic Lessons, Hidden Passion, Subconscious Self, Rational Thought,
 * Cornerstone, Capstone and First Vowel.
 *
 * Verified against the worked test cases in content/data/methods_advanced.json.
 */

import { parseName } from "./core";
import { HARD_VOWELS, letterValue, normalizeName } from "./letters";
import { toInsight, type NumberInsight } from "./reduce";

/** Tally of how often each Pythagorean value 1-9 occurs across a name. */
export type ValueCounts = Record<number, number>;

export function letterValueCounts(fullName: string): ValueCounts {
  const counts: ValueCounts = {};
  for (const letter of normalizeName(fullName)) {
    const v = letterValue(letter);
    if (v >= 1 && v <= 9) counts[v] = (counts[v] ?? 0) + 1;
  }
  return counts;
}

/**
 * Balance — the initials of each name part, summed and reduced to a single
 * digit. Balance conventionally does NOT preserve master numbers.
 */
export function balanceNumber(fullName: string): NumberInsight {
  const { all } = parseName(fullName);
  const total = all.reduce((sum, token) => {
    const initial = normalizeName(token)[0];
    return sum + (initial ? letterValue(initial) : 0);
  }, 0);
  return toInsight(total, /* keepMasters */ false);
}

/** Karmic Lessons — the values 1-9 entirely absent from the name. */
export function karmicLessons(fullName: string): number[] {
  const counts = letterValueCounts(fullName);
  const lessons: number[] = [];
  for (let n = 1; n <= 9; n++) {
    if (!counts[n]) lessons.push(n);
  }
  return lessons;
}

/** Hidden Passion — the value(s) that appear most often (ties allowed). */
export function hiddenPassion(fullName: string): number[] {
  const counts = letterValueCounts(fullName);
  let max = 0;
  for (const n of Object.values(counts)) if (n > max) max = n;
  if (max === 0) return [];
  return Object.entries(counts)
    .filter(([, c]) => c === max)
    .map(([v]) => Number(v))
    .sort((a, b) => a - b);
}

/** Subconscious Self — how many distinct values 1-9 appear (9 minus lessons). */
export function subconsciousSelf(fullName: string): number {
  return 9 - karmicLessons(fullName).length;
}

/**
 * Rational Thought — the raw sum of the first name's letters plus the day of
 * birth, reduced (preserving masters).
 */
export function rationalThought(firstName: string, dayOfBirth: number): NumberInsight {
  const nameSum = normalizeName(firstName)
    .split("")
    .reduce((s, l) => s + letterValue(l), 0);
  return toInsight(nameSum + dayOfBirth);
}

export interface LetterTrait {
  letter: string;
  value: number;
}

/** Cornerstone — the first letter of the first name. */
export function cornerstone(firstName: string): LetterTrait | null {
  const letter = normalizeName(firstName)[0];
  return letter ? { letter, value: letterValue(letter) } : null;
}

/** Capstone — the last letter of the first name. */
export function capstone(firstName: string): LetterTrait | null {
  const clean = normalizeName(firstName);
  const letter = clean[clean.length - 1];
  return letter ? { letter, value: letterValue(letter) } : null;
}

/** First Vowel — the first A/E/I/O/U in the first name (falls back to Y). */
export function firstVowel(firstName: string): LetterTrait | null {
  const clean = normalizeName(firstName);
  for (const letter of clean) {
    if (HARD_VOWELS.has(letter)) return { letter, value: letterValue(letter) };
  }
  for (const letter of clean) {
    if (letter === "Y") return { letter, value: letterValue(letter) };
  }
  return null;
}
