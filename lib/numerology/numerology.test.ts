import { describe, it, expect } from "vitest";
import {
  lifePathNumber,
  birthdayNumber,
  expressionNumber,
  soulUrgeNumber,
  personalityNumber,
  maturityNumber,
} from "./core";
import {
  balanceNumber,
  karmicLessons,
  hiddenPassion,
  subconsciousSelf,
  rationalThought,
  cornerstone,
  capstone,
  firstVowel,
  letterValueCounts,
} from "./advanced";
import {
  personalYear,
  personalMonth,
  personalDay,
  pinnacles,
  challenges,
} from "./cycles";
import { reduceNumber, reduceDetail } from "./reduce";
import { chaldeanNumber } from "./chaldean";
import { analyzeAngelNumber } from "./angel";

// --- Reduction -------------------------------------------------------------
describe("reduceNumber", () => {
  it("reduces to a single digit", () => {
    expect(reduceNumber(12)).toBe(3);
    expect(reduceNumber(19)).toBe(1);
    expect(reduceNumber(48)).toBe(3);
  });
  it("preserves master numbers", () => {
    expect(reduceNumber(11)).toBe(11);
    expect(reduceNumber(29)).toBe(11);
    expect(reduceNumber(38)).toBe(11);
    expect(reduceNumber(33)).toBe(33);
  });
  it("can force full reduction (no masters)", () => {
    expect(reduceNumber(29, false)).toBe(2);
    expect(reduceNumber(11, false)).toBe(2);
  });
});

// --- methods_core.json test cases -----------------------------------------
describe("Life Path (methods_core)", () => {
  it("1990-05-15 -> 3", () => {
    expect(lifePathNumber({ year: 1990, month: 5, day: 15 }).value).toBe(3);
  });
  it("1978-04-11 -> master 22", () => {
    expect(lifePathNumber({ year: 1978, month: 4, day: 11 }).value).toBe(22);
  });
  it("1940-03-12 -> master 11", () => {
    expect(lifePathNumber({ year: 1940, month: 3, day: 12 }).value).toBe(11);
  });
  it("1987-07-04 -> 9", () => {
    expect(lifePathNumber({ year: 1987, month: 7, day: 4 }).value).toBe(9);
  });
});

describe("Birthday (methods_core)", () => {
  it("15 -> 6", () => {
    expect(birthdayNumber({ year: 2000, month: 1, day: 15 }).value).toBe(6);
  });
  it("29 -> master 11", () => {
    expect(birthdayNumber({ year: 2000, month: 1, day: 29 }).value).toBe(11);
  });
});

describe("Name numbers (methods_core)", () => {
  it("John Paul Smith (Y consonant) -> E4 SU1 P3", () => {
    expect(expressionNumber("John Paul Smith").value).toBe(4);
    expect(soulUrgeNumber("John Paul Smith", false).value).toBe(1);
    expect(personalityNumber("John Paul Smith", false).value).toBe(3);
  });
  it("Mary Jane (Y consonant) -> E33 SU7 P8", () => {
    expect(expressionNumber("Mary Jane").value).toBe(33);
    expect(soulUrgeNumber("Mary Jane", false).value).toBe(7);
    expect(personalityNumber("Mary Jane", false).value).toBe(8);
  });
  it("Mary Jane (Y vowel) -> E33 SU5 P1", () => {
    expect(expressionNumber("Mary Jane").value).toBe(33);
    expect(soulUrgeNumber("Mary Jane", true).value).toBe(5);
    expect(personalityNumber("Mary Jane", true).value).toBe(1);
  });
});

// --- methods_advanced.json test cases -------------------------------------
describe("Thomas John Hancock (methods_advanced TC1)", () => {
  const name = "Thomas John Hancock";
  it("core name numbers", () => {
    expect(expressionNumber(name).total).toBe(70);
    expect(expressionNumber(name).value).toBe(7);
    expect(soulUrgeNumber(name).total).toBe(20);
    expect(soulUrgeNumber(name).value).toBe(2);
    expect(personalityNumber(name).total).toBe(50);
    expect(personalityNumber(name).value).toBe(5);
  });
  it("letter counts", () => {
    expect(letterValueCounts(name)).toEqual({ 1: 4, 2: 2, 3: 2, 4: 1, 5: 2, 6: 3, 8: 3 });
  });
  it("karmic lessons / hidden passion / subconscious", () => {
    expect(karmicLessons(name)).toEqual([7, 9]);
    expect(hiddenPassion(name)).toEqual([1]);
    expect(subconsciousSelf(name)).toBe(7);
  });
  it("balance / cornerstone / capstone / first vowel", () => {
    expect(balanceNumber(name).value).toBe(2);
    expect(cornerstone("Thomas")?.letter).toBe("T");
    expect(capstone("Thomas")?.letter).toBe("S");
    expect(firstVowel("Thomas")?.letter).toBe("O");
  });
});

describe("Katherine Mary Smith (methods_advanced TC2)", () => {
  const name = "Katherine Mary Smith";
  it("core name numbers", () => {
    expect(expressionNumber(name).total).toBe(91);
    expect(expressionNumber(name).value).toBe(1);
    expect(soulUrgeNumber(name).total).toBe(30);
    expect(soulUrgeNumber(name).value).toBe(3);
    expect(personalityNumber(name).total).toBe(61);
    expect(personalityNumber(name).value).toBe(7);
  });
  it("derived numbers", () => {
    expect(karmicLessons(name)).toEqual([3, 6]);
    expect(hiddenPassion(name)).toEqual([9]);
    expect(subconsciousSelf(name)).toBe(7);
    expect(balanceNumber(name).value).toBe(7);
    expect(cornerstone("Katherine")?.letter).toBe("K");
    expect(capstone("Katherine")?.letter).toBe("E");
    expect(firstVowel("Katherine")?.letter).toBe("A");
  });
});

describe("Karmic debt detection (methods_advanced)", () => {
  it("Life Path 1979-07-04 carries karmic debt 19", () => {
    const lp = lifePathNumber({ year: 1979, month: 7, day: 4 });
    expect(lp.value).toBe(1);
    expect(lp.karmicDebt).toBe(19);
  });
  it("Life Path 1988-01-04 carries karmic debt 13", () => {
    const lp = lifePathNumber({ year: 1988, month: 1, day: 4 });
    expect(lp.value).toBe(4);
    expect(lp.karmicDebt).toBe(13);
  });
  it("Life Path 1992-11-29 has no karmic debt (master components)", () => {
    const lp = lifePathNumber({ year: 1992, month: 11, day: 29 });
    expect(lp.value).toBe(7);
    expect(lp.karmicDebt).toBeNull();
  });
  it("Expression 'Lucy' carries karmic debt 16", () => {
    const e = expressionNumber("Lucy");
    expect(e.value).toBe(7);
    expect(e.karmicDebt).toBe(16);
  });
  it("Birthday on the 14th carries karmic debt 14", () => {
    const b = birthdayNumber({ year: 2000, month: 1, day: 14 });
    expect(b.value).toBe(5);
    expect(b.karmicDebt).toBe(14);
  });
  it("large name total that merely passes through 13 is NOT flagged", () => {
    // John Paul Smith Expression total is 58 -> 13 -> 4; not a karmic debt.
    expect(expressionNumber("John Paul Smith").karmicDebt).toBeNull();
  });
});

describe("Rational Thought & Maturity (methods_advanced)", () => {
  it("John born on the 15th -> 8", () => {
    expect(rationalThought("John", 15).value).toBe(8);
  });
  it("Mary born on the 7th -> 1", () => {
    expect(rationalThought("Mary", 7).value).toBe(1);
  });
  it("maturity 7 + 4 -> master 11", () => {
    expect(maturityNumber(7, 4).value).toBe(11);
  });
  it("maturity 11 + 22 -> master 33", () => {
    expect(maturityNumber(11, 22).value).toBe(33);
  });
  it("maturity 5 + 8 -> 4", () => {
    expect(maturityNumber(5, 8).value).toBe(4);
  });
});

// --- methods_cycles.json test cases ---------------------------------------
describe("Personal cycles (methods_cycles)", () => {
  it("Personal Year: May 15, 2026 -> 3", () => {
    expect(personalYear(5, 15, 2026).value).toBe(3);
  });
  it("Personal Month: May 15, June 2026 -> 9", () => {
    expect(personalMonth(5, 15, 2026, 6).value).toBe(9);
  });
  it("Personal Day: May 15, June 21 2026 -> 3", () => {
    expect(personalDay(5, 15, 2026, 6, 21).value).toBe(3);
  });
  it("Personal Year: Nov 29, 2026 -> 5 (no master)", () => {
    expect(personalYear(11, 29, 2026).value).toBe(5);
  });
  it("Personal Month: Nov 29, Jan 2026 -> 6", () => {
    expect(personalMonth(11, 29, 2026, 1).value).toBe(6);
  });
  it("Personal Day: Nov 29, Jan 1 2026 -> 7", () => {
    expect(personalDay(11, 29, 2026, 1, 1).value).toBe(7);
  });
});

describe("Pinnacles & Challenges (methods_cycles)", () => {
  it("Pinnacles 1990-07-04 -> 11,5,7,8", () => {
    const p = pinnacles({ year: 1990, month: 7, day: 4 }).map((x) => x.value);
    expect(p).toEqual([11, 5, 7, 8]);
  });
  it("Pinnacle timing 1990-07-04 (endAge1 = 33)", () => {
    const p = pinnacles({ year: 1990, month: 7, day: 4 });
    expect(p[0].endAge).toBe(33);
    expect(p[1].startAge).toBe(34);
    expect(p[3].endAge).toBeNull();
  });
  it("Challenges 1990-07-04 -> 3,3,0,6", () => {
    const c = challenges({ year: 1990, month: 7, day: 4 }).map((x) => x.value);
    expect(c).toEqual([3, 3, 0, 6]);
  });
  it("Pinnacles 1988-12-25 -> 1,6,7,11", () => {
    const p = pinnacles({ year: 1988, month: 12, day: 25 }).map((x) => x.value);
    expect(p).toEqual([1, 6, 7, 11]);
  });
  it("Challenges 1988-12-25 -> 4,1,3,5", () => {
    const c = challenges({ year: 1988, month: 12, day: 25 }).map((x) => x.value);
    expect(c).toEqual([4, 1, 3, 5]);
  });
});

// --- Chaldean & Angel numbers ---------------------------------------------
describe("Chaldean", () => {
  it("produces a 1-9 root and a compound", () => {
    const r = chaldeanNumber("David");
    // D4 A1 V6 I1 D4 = 16 -> 7
    expect(r.total).toBe(16);
    expect(r.root).toBe(7);
    expect(r.compound).toBe(16);
  });
});

describe("Angel numbers", () => {
  it("detects a triple", () => {
    const a = analyzeAngelNumber("111");
    expect(a.patterns).toContain("triple");
    expect(a.root).toBe(3);
  });
  it("detects a mirror", () => {
    expect(analyzeAngelNumber("1221").patterns).toContain("mirror");
  });
  it("detects ascending", () => {
    expect(analyzeAngelNumber("1234").patterns).toContain("ascending");
  });
  it("strips separators", () => {
    expect(analyzeAngelNumber("11:11").input).toBe("1111");
  });
});
