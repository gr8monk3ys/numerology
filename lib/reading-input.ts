import { buildReading, type Reading } from "@/lib/numerology";

export type ReadingField = "fullName" | "birthDate";

/** The same bounds the date fields advertise with min/max. */
export const MIN_BIRTH_YEAR = 1900;
export const MAX_BIRTH_YEAR = 2099;
export type CastResult =
  | { ok: true; reading: Reading }
  | { ok: false; field: ReadingField; message: string };

/** Validate the two form fields (birth date as YYYY-MM-DD) and build the reading. */
export function castReading(fullName: string, birthDate: string, yAsVowel = false): CastResult {
  const cleanName = fullName.trim();
  if (cleanName.replace(/[^a-zA-Z]/g, "").length < 2) {
    return { ok: false, field: "fullName", message: "Please enter your full birth name." };
  }
  if (!birthDate) {
    return { ok: false, field: "birthDate", message: "Please enter your date of birth." };
  }
  const [year, month, day] = birthDate.split("-").map(Number);
  // Round-trip through Date so 31 February is refused, not rolled into March.
  const parsed = new Date(Date.UTC(year, month - 1, day));
  const real = parsed.getUTCFullYear() === year && parsed.getUTCMonth() === month - 1 && parsed.getUTCDate() === day;
  if (!real) {
    return {
      ok: false,
      field: "birthDate",
      message: "That date doesn’t look right. Use the date picker, or type it as YYYY-MM-DD.",
    };
  }
  if (year < MIN_BIRTH_YEAR || year > MAX_BIRTH_YEAR) {
    return {
      ok: false,
      field: "birthDate",
      message: `Please enter a birth year between ${MIN_BIRTH_YEAR} and ${MAX_BIRTH_YEAR}.`,
    };
  }
  const now = new Date();
  return {
    ok: true,
    reading: buildReading({
      fullName: cleanName,
      birth: { year, month, day },
      yAsVowel,
      today: { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() },
    }),
  };
}

// The home dial hands its inputs to /reading in memory only: a client-side
// navigation keeps the module alive, and nothing is written to the URL or to
// storage, so a name and birth date never leave the page's own JavaScript.
let carried: { fullName: string; birthDate: string } | null = null;

export function carryReadingInput(input: { fullName: string; birthDate: string }): void {
  carried = input;
}

export function carriedReadingInput(): { fullName: string; birthDate: string } | null {
  return carried;
}

/** Called once /reading has taken the hand-off, so it is used exactly once. */
export function clearCarriedReadingInput(): void {
  carried = null;
}
