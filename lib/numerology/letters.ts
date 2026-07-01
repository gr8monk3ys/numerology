/**
 * Letter-to-number mappings for the two dominant numerology systems and helpers
 * for classifying vowels vs consonants (with an optional "Y as vowel" toggle).
 */

export type NumerologySystem = "pythagorean" | "chaldean";

/** Pythagorean (Western/modern): A=1..I=9, then repeats. */
export const PYTHAGOREAN: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};

/** Chaldean (Babylonian): values 1-8 only; 9 is considered sacred/unassigned. */
export const CHALDEAN: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 7, P: 8, Q: 1, R: 2,
  S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7,
};

export const HARD_VOWELS = new Set(["A", "E", "I", "O", "U"]);

export interface ClassifiedLetter {
  letter: string;
  value: number;
  isVowel: boolean;
}

export function letterValue(
  letter: string,
  system: NumerologySystem = "pythagorean",
): number {
  const table = system === "chaldean" ? CHALDEAN : PYTHAGOREAN;
  return table[letter.toUpperCase()] ?? 0;
}

/** Keep only A-Z letters, uppercased. */
export function normalizeName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip accents
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
}

/**
 * Classify every letter of a name as vowel or consonant.
 *
 * Y is treated as a vowel only when `yAsVowel` is true (deterministic toggle,
 * as used by most online calculators). W is always a consonant.
 */
export function classifyLetters(
  name: string,
  system: NumerologySystem = "pythagorean",
  yAsVowel = false,
): ClassifiedLetter[] {
  return normalizeName(name)
    .split("")
    .map((letter) => {
      const isVowel =
        HARD_VOWELS.has(letter) || (letter === "Y" && yAsVowel);
      return { letter, value: letterValue(letter, system), isVowel };
    });
}
