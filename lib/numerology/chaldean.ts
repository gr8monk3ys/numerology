/**
 * Chaldean (Babylonian) name numerology.
 *
 * Unlike Pythagorean, letters map to 1-8 only (9 is considered sacred and never
 * assigned). The raw sum is the "compound" number, whose two-digit form carries
 * its own esoteric meaning; it is then reduced to a single-digit "root".
 */

import { CHALDEAN, normalizeName } from "./letters";
import { reduceDetail } from "./reduce";

export interface ChaldeanResult {
  /** Raw sum of all letter values. */
  total: number;
  /** Single-digit root (1-9). */
  root: number;
  /**
   * The compound (two-digit) number traditionally interpreted — the last
   * two-digit value in the reduction chain, or the total itself if already 10-99.
   */
  compound: number;
  steps: number[];
}

export function chaldeanNumber(fullName: string): ChaldeanResult {
  const total = normalizeName(fullName)
    .split("")
    .reduce((s, letter) => s + (CHALDEAN[letter] ?? 0), 0);

  const detail = reduceDetail(total, /* keepMasters */ false);
  const twoDigit = detail.steps.find((s) => s >= 10 && s <= 99);

  return {
    total,
    root: detail.value,
    compound: twoDigit ?? total,
    steps: detail.steps,
  };
}
