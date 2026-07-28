/**
 * Shareable-reading URL state: /reading?name=Ada+Byron&dob=1815-12-10&y=1
 *
 * The same params drive the reading page's initial state, its personalized
 * metadata, and the OG-card image route, so parsing must be strict — a
 * mangled shared link falls back to the empty form rather than a crash.
 */

export interface ReadingLinkState {
  /** Full birth name as typed (whitespace-trimmed). */
  name: string;
  /** ISO date, YYYY-MM-DD, verified to be a real calendar date. */
  dob: string;
  yAsVowel: boolean;
}

export const MIN_BIRTH_YEAR = 1200;
export const MAX_BIRTH_YEAR = 2099;

type ParamValue = string | string[] | undefined;

function single(value: ParamValue): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Parse a YYYY-MM-DD string into parts, or null if not a real date. */
export function parseIsoDate(
  dob: string,
): { year: number; month: number; day: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dob);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (year < MIN_BIRTH_YEAR || year > MAX_BIRTH_YEAR) return null;
  if (month < 1 || month > 12) return null;
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  if (day < 1 || day > daysInMonth) return null;
  return { year, month, day };
}

export function parseReadingParams(
  params: Record<string, ParamValue>,
): ReadingLinkState | null {
  const name = single(params.name)?.trim() ?? "";
  const dob = single(params.dob) ?? "";

  // Match the form's rule: at least two letters once symbols are stripped.
  if (name.replace(/[^a-zA-Z]/g, "").length < 2) return null;
  if (name.length > 120) return null;
  if (!parseIsoDate(dob)) return null;

  return { name, dob, yAsVowel: single(params.y) === "1" };
}

export function buildReadingQuery(state: ReadingLinkState): string {
  const params = new URLSearchParams({ name: state.name, dob: state.dob });
  if (state.yAsVowel) params.set("y", "1");
  return params.toString();
}
