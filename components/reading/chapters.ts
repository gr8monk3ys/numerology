/**
 * The one ordered list of the reading's chapters. Numerals are derived from
 * position, so inserting or removing a chapter renumbers everything at once —
 * no hand-maintained literals split across files.
 */

const CHAPTER_ORDER = [
  "core",
  "karmic",
  "letters",
  "chaldean",
  "loShu",
  "correspondences",
  "tarot",
  "stars",
  "planes",
  "cycles",
  "bridges",
  "fortunate",
  "almanac",
] as const;

export type ChapterKey = (typeof CHAPTER_ORDER)[number];

const ROMAN = [
  "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
  "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX",
];

export function chapterNumeral(key: ChapterKey): string {
  return ROMAN[CHAPTER_ORDER.indexOf(key)];
}
