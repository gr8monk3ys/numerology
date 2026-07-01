/**
 * Angel numbers — repeating or patterned number sequences (111, 222, 1234…)
 * read as synchronistic messages.
 */

import { digitSum, reduceNumber } from "./reduce";

export type AngelPattern =
  | "triple"
  | "quadruple"
  | "repeating-pair"
  | "mirror"
  | "ascending"
  | "descending"
  | "sequence";

export interface AngelAnalysis {
  input: string;
  digits: number[];
  /** Root vibration of the whole sequence (digits summed and reduced). */
  root: number;
  patterns: AngelPattern[];
}

/** Keep only digits from arbitrary input like "11:11" or "444". */
export function normalizeSequence(input: string): string {
  return input.replace(/[^0-9]/g, "");
}

function detectPatterns(digits: number[]): AngelPattern[] {
  const patterns: AngelPattern[] = [];
  const n = digits.length;
  if (n === 0) return patterns;

  const allSame = digits.every((d) => d === digits[0]);
  if (allSame && n === 3) patterns.push("triple");
  if (allSame && n >= 4) patterns.push("quadruple");

  if (n === 4 && digits[0] === digits[1] && digits[2] === digits[3] && digits[0] !== digits[2]) {
    patterns.push("repeating-pair");
  }
  if (n >= 2 && !allSame) {
    const isMirror = digits.every((d, i) => d === digits[n - 1 - i]);
    if (isMirror) patterns.push("mirror");
  }
  const ascending = digits.every((d, i) => i === 0 || d === digits[i - 1] + 1);
  const descending = digits.every((d, i) => i === 0 || d === digits[i - 1] - 1);
  if (ascending && n >= 3) patterns.push("ascending");
  if (descending && n >= 3) patterns.push("descending");
  if (patterns.length === 0 && n >= 3) patterns.push("sequence");

  return patterns;
}

export function analyzeAngelNumber(input: string): AngelAnalysis {
  const clean = normalizeSequence(input);
  const digits = clean.split("").map(Number);
  const sum = digits.reduce((s, d) => s + d, 0);
  return {
    input: clean,
    digits,
    root: reduceNumber(sum, false) || (digits.length ? digitSum(sum) : 0),
    patterns: detectPatterns(digits),
  };
}

export interface AngelEntry {
  number: string;
  title: string;
  meaning: string;
  love: string;
  career: string;
  spiritual: string;
}

/** Look up an exact angel-number entry from the dataset. */
export function findAngelEntry(
  input: string,
  entries: AngelEntry[],
): AngelEntry | undefined {
  const clean = normalizeSequence(input);
  return entries.find((e) => normalizeSequence(e.number) === clean);
}
