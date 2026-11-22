import { describe, expect, it } from "vitest";
import { buildReading } from "./report";
import { coreWorkings } from "./working";

/** Add up every digit group on the left of the last "=". */
const leftSum = (working: string) =>
  (working.split(" = ")[0] ?? "").split("; ").pop()!.split(/[+\s]+/).filter(Boolean).reduce((s, d) => s + Number(d), 0);

// A small seeded generator: the same few hundred names and dates on every run.
function* cases(count: number) {
  let seed = 20261119;
  const next = (n: number) => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed % n;
  };
  const letters = "AEIOUYBCDFGHJKLMNPQRSTVWXZ";
  const word = () => Array.from({ length: 1 + next(9) }, () => letters[next(letters.length)]).join("");
  for (let i = 0; i < count; i++) {
    yield {
      fullName: Array.from({ length: 1 + next(4) }, word).join(" "),
      birth: { year: 1900 + next(200), month: 1 + next(12), day: 1 + next(28) },
      yAsVowel: next(2) === 1,
    };
  }
}

describe("coreWorkings", () => {
  it("writes addends that sum to the engine's total, for any name and date", () => {
    for (const input of [...cases(300), { fullName: "Rhythm Wxyz", birth: { year: 2000, month: 11, day: 29 }, yAsVowel: false }]) {
      const reading = buildReading(input);
      const w = coreWorkings(reading);
      const { core } = reading;
      for (const [working, insight] of [
        [w.lifePath, core.lifePath],
        [w.expression, core.expression],
        [w.maturity, core.maturity],
      ] as const) {
        expect(leftSum(working), `${input.fullName}: ${working}`).toBe(insight.total);
        expect(working.endsWith(insight.steps.join(" → "))).toBe(true);
      }
      // A name with no vowels (or no consonants) has nothing to add up.
      for (const [working, insight] of [
        [w.soulUrge, core.soulUrge],
        [w.personality, core.personality],
      ] as const) {
        if (working.includes(" = ")) expect(leftSum(working), `${input.fullName}: ${working}`).toBe(insight.total);
        expect(working.endsWith(insight.steps.join(" → "))).toBe(true);
      }
    }
  });

  it("matches the published worked example", () => {
    const w = coreWorkings(buildReading({ fullName: "Thomas John Hancock", birth: { year: 1990, month: 5, day: 15 } }));
    expect(w.expression.endsWith("= 70 → 7")).toBe(true);
    expect(w.soulUrge.endsWith("= 20 → 2")).toBe(true);
    expect(w.lifePath).toBe("15 → 6, 1990 → 19 → 10 → 1; 5 + 6 + 1 = 12 → 3");
  });
});
