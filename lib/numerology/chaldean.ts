/**
 * Chaldean (Babylonian) name numerology.
 *
 * Unlike Pythagorean, letters map to 1-8 only (9 is considered sacred and never
 * assigned). The raw sum is the "compound" number, whose two-digit form carries
 * its own esoteric meaning; it is then reduced to a single-digit "root",
 * except that a master number (11, 22, 33) reached on the way is kept
 * unreduced (methods_chaldean.json, reductionRule).
 */

import { CHALDEAN, normalizeName } from "./letters";
import { reduceDetail } from "./reduce";

export interface ChaldeanResult {
  /** Raw sum of all letter values. */
  total: number;
  /** Root: a single digit 1-9, or a master number 11/22/33 kept unreduced. */
  root: number;
  /** True when the root is a master number. */
  isMaster: boolean;
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

  const detail = reduceDetail(total, /* keepMasters */ true);
  const twoDigit = detail.steps.find((s) => s >= 10 && s <= 99);

  return {
    total,
    root: detail.value,
    isMaster: detail.isMaster,
    compound: twoDigit ?? total,
    steps: detail.steps,
  };
}
