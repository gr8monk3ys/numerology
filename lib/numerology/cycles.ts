/**
 * Forecasting cycles: Personal Year / Month / Day, Pinnacles and Challenges.
 *
 * Conventions (verified in content/data/methods_cycles.json):
 *   - Personal Year/Month/Day are ALWAYS reduced to 1-9 (no master preservation).
 *   - Pinnacles DO preserve master numbers.
 *   - Challenges reduce to plain single digits (no masters) and may equal 0.
 */

import { reduceNumber, toInsight, type NumberInsight } from "./reduce";
import { lifePathNumber, type BirthDate } from "./core";

const plain = (n: number) => reduceNumber(n, false);
const master = (n: number) => reduceNumber(n, true);

// ---------------------------------------------------------------------------
// Personal Year / Month / Day
// ---------------------------------------------------------------------------

export function personalYear(
  birthMonth: number,
  birthDay: number,
  year: number,
): NumberInsight {
  const total = plain(birthMonth) + plain(birthDay) + plain(year);
  return toInsight(total, false);
}

export function personalMonth(
  birthMonth: number,
  birthDay: number,
  year: number,
  calendarMonth: number,
): NumberInsight {
  const py = personalYear(birthMonth, birthDay, year).value;
  return toInsight(py + plain(calendarMonth), false);
}

export function personalDay(
  birthMonth: number,
  birthDay: number,
  year: number,
  calendarMonth: number,
  calendarDay: number,
): NumberInsight {
  const pm = personalMonth(birthMonth, birthDay, year, calendarMonth).value;
  return toInsight(pm + plain(calendarDay), false);
}

export interface PersonalCycles {
  year: NumberInsight;
  month: NumberInsight;
  day: NumberInsight;
}

/** All three personal cycles for a given target calendar date. */
export function personalCycles(
  birth: BirthDate,
  target: { year: number; month: number; day: number },
): PersonalCycles {
  return {
    year: personalYear(birth.month, birth.day, target.year),
    month: personalMonth(birth.month, birth.day, target.year, target.month),
    day: personalDay(
      birth.month,
      birth.day,
      target.year,
      target.month,
      target.day,
    ),
  };
}

// ---------------------------------------------------------------------------
// Universal cycles — the vibration of the calendar itself, no birth date needed
// ---------------------------------------------------------------------------

/** Universal Year — the calendar year's digits, reduced to 1-9. */
export function universalYear(year: number): number {
  return plain(year);
}

/** Universal Month — reduce(universal year + calendar month), 1-9. */
export function universalMonth(year: number, month: number): number {
  return plain(universalYear(year) + plain(month));
}

/** Universal Day — reduce(universal month + calendar day), 1-9. */
export function universalDay(year: number, month: number, day: number): number {
  return plain(universalMonth(year, month) + plain(day));
}

// ---------------------------------------------------------------------------
// Pinnacles & Challenges
// ---------------------------------------------------------------------------

export interface CyclePeriod {
  index: 1 | 2 | 3 | 4;
  value: number;
  isMaster: boolean;
  startAge: number;
  /** null on the final, open-ended period. */
  endAge: number | null;
  label: string;
}

function pinnacleTiming(lifePathValue: number): Array<{ start: number; end: number | null }> {
  const L = plain(lifePathValue); // reduce masters: 11->2, 22->4, 33->6
  const endAge1 = 36 - L;
  return [
    { start: 0, end: endAge1 },
    { start: endAge1 + 1, end: endAge1 + 9 },
    { start: endAge1 + 10, end: endAge1 + 18 },
    { start: endAge1 + 19, end: null },
  ];
}

const rangeLabel = (start: number, end: number | null) =>
  end === null ? `${start}+` : `${start}–${end}`;

/** The four Pinnacle cycles (master numbers preserved) with age ranges. */
export function pinnacles(date: BirthDate): CyclePeriod[] {
  const m = master(date.month);
  const d = master(date.day);
  const y = master(date.year);

  const p1 = master(m + d);
  const p2 = master(d + y);
  const p3 = master(p1 + p2);
  const p4 = master(m + y);
  const values = [p1, p2, p3, p4];

  const lifePath = lifePathNumber(date).value;
  const timing = pinnacleTiming(lifePath);

  return values.map((value, i) => ({
    index: (i + 1) as CyclePeriod["index"],
    value,
    isMaster: value === 11 || value === 22 || value === 33,
    startAge: timing[i].start,
    endAge: timing[i].end,
    label: rangeLabel(timing[i].start, timing[i].end),
  }));
}

/** The four Challenge cycles (plain single digits, 0 allowed) with age ranges. */
export function challenges(date: BirthDate): CyclePeriod[] {
  const m = plain(date.month);
  const d = plain(date.day);
  const y = plain(date.year);

  const c1 = Math.abs(m - d);
  const c2 = Math.abs(d - y);
  const c3 = Math.abs(c1 - c2);
  const c4 = Math.abs(m - y);
  const values = [c1, c2, c3, c4];

  const lifePath = lifePathNumber(date).value;
  const timing = pinnacleTiming(lifePath);

  return values.map((value, i) => ({
    index: (i + 1) as CyclePeriod["index"],
    value,
    isMaster: false,
    startAge: timing[i].start,
    endAge: timing[i].end,
    label: rangeLabel(timing[i].start, timing[i].end),
  }));
}
