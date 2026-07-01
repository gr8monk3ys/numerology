/**
 * Core reduction utilities for numerology.
 *
 * The single most important rule in numerology math: repeatedly sum a number's
 * digits until a single digit (1-9) remains — with the sole exception that the
 * "master numbers" 11, 22 and 33 are never reduced.
 */

export const MASTER_NUMBERS = [11, 22, 33] as const;
export const KARMIC_DEBT_NUMBERS = [13, 14, 16, 19] as const;

export type MasterNumber = (typeof MASTER_NUMBERS)[number];
export type KarmicDebtNumber = (typeof KARMIC_DEBT_NUMBERS)[number];

export function isMaster(n: number): n is MasterNumber {
  return n === 11 || n === 22 || n === 33;
}

export function isKarmicDebt(n: number): n is KarmicDebtNumber {
  return n === 13 || n === 14 || n === 16 || n === 19;
}

/** Sum of the base-10 digits of |n|. */
export function digitSum(n: number): number {
  let v = Math.abs(Math.trunc(n));
  let sum = 0;
  while (v > 0) {
    sum += v % 10;
    v = Math.floor(v / 10);
  }
  return sum;
}

/**
 * Reduce a number to a single digit, preserving master numbers by default.
 */
export function reduceNumber(n: number, keepMasters = true): number {
  let v = Math.abs(Math.trunc(n));
  while (v > 9 && !(keepMasters && isMaster(v))) {
    v = digitSum(v);
  }
  return v;
}

export interface ReduceDetail {
  /** Final reduced value (1-9, or a master 11/22/33). */
  value: number;
  /** The full reduction chain, from the starting total to the final value. */
  steps: number[];
  isMaster: boolean;
  /**
   * Karmic debt (13/14/16/19) is present when the two-digit total immediately
   * before the final single-digit reduction is one of the karmic debt numbers.
   */
  karmicDebt: KarmicDebtNumber | null;
}

export function reduceDetail(n: number, keepMasters = true): ReduceDetail {
  const start = Math.abs(Math.trunc(n));
  const steps: number[] = [start];
  let v = start;
  while (v > 9 && !(keepMasters && isMaster(v))) {
    v = digitSum(v);
    steps.push(v);
  }

  // Karmic debt is carried by the raw total of the calculation (e.g. a Life
  // Path total of 19, an Expression total of 16, a birth day of the 14th).
  // We check the starting total rather than the last two-digit step, because
  // 19 reduces 19 -> 10 -> 1, so its final two-digit step (10) is not the debt.
  const karmicDebt: KarmicDebtNumber | null = isKarmicDebt(start) ? start : null;

  return { value: v, steps, isMaster: isMaster(v), karmicDebt };
}

/** A fully-annotated numerology number, ready for display. */
export interface NumberInsight {
  /** Final reduced value (1-9 or a master 11/22/33). */
  value: number;
  isMaster: boolean;
  karmicDebt: KarmicDebtNumber | null;
  /** The raw total before the final reduction. */
  total: number;
  /** The reduction chain, e.g. [58, 13, 4]. */
  steps: number[];
}

export function toInsight(total: number, keepMasters = true): NumberInsight {
  const d = reduceDetail(total, keepMasters);
  return {
    value: d.value,
    isMaster: d.isMaster,
    karmicDebt: d.karmicDebt,
    total,
    steps: d.steps,
  };
}
