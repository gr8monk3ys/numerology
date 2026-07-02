/**
 * The casting wire format and shared date/name validation — one schema, one
 * codec, used by both the share-link encoder (FolioActions) and the decoder
 * (ReadingForm), and by every form that accepts a birth date.
 */

import type { BirthDate } from "@/lib/numerology";

export const NAME_MAX = 80;
/** Letters (any alphabet), marks, spaces, apostrophes, periods and hyphens. */
export const NAME_CHARSET = /^[\p{L}\p{M}\s'’.–-]+$/u;

export interface Casting {
  name: string;
  dob: string; // YYYY-MM-DD
  y?: boolean;
  now?: string;
}

/** True when the name is castable: charset-clean with at least two letters. */
export function isUsableName(name: string): boolean {
  const clean = name.trim();
  if (!clean || !NAME_CHARSET.test(clean)) return false;
  return clean.replace(/[^a-zA-Z]/g, "").length >= 2;
}

/**
 * Parse a YYYY-MM-DD string into a real calendar date.
 * Rejects malformed strings, out-of-range parts, and impossible dates
 * (e.g. February 30th) via a UTC round-trip.
 */
export function parseBirthDate(dateStr: string): BirthDate | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return null;
  const [year, month, day] = dateStr.split("-").map(Number);
  if (year < 1000 || year > 2999 || month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }
  const roundTrip = new Date(Date.UTC(year, month - 1, day));
  if (roundTrip.getUTCMonth() !== month - 1 || roundTrip.getUTCDate() !== day) {
    return null;
  }
  return { year, month, day };
}

/** Age in completed years on the given day. */
export function ageOn(birth: BirthDate, today: BirthDate): number {
  let age = today.year - birth.year;
  if (
    today.month < birth.month ||
    (today.month === birth.month && today.day < birth.day)
  ) {
    age -= 1;
  }
  return age;
}

/** Serialize a casting into share-link query params. */
export function encodeCastingParams(casting: Casting): string {
  const params = new URLSearchParams({ name: casting.name, dob: casting.dob });
  if (casting.y) params.set("y", "1");
  if (casting.now) params.set("now", casting.now);
  return params.toString();
}

/** Read a casting back out of a query string; null when absent or unusable. */
export function decodeCastingParams(search: string): Casting | null {
  const params = new URLSearchParams(search);
  const name = params.get("name")?.slice(0, NAME_MAX);
  const dob = params.get("dob")?.slice(0, 10);
  if (!name || !dob) return null;
  if (!isUsableName(name) || !parseBirthDate(dob)) return null;
  const now = params.get("now")?.slice(0, NAME_MAX) ?? undefined;
  return {
    name,
    dob,
    y: params.get("y") === "1" || undefined,
    now,
  };
}
