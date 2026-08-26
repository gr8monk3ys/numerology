import { describe, it, expect } from "vitest";
import { buildReading } from "./report";
import { computeCompatibility, type CompatibilityData } from "./compatibility";
import compatibilityData from "../../content/data/compatibility.json";

describe("buildReading", () => {
  const reading = buildReading({
    fullName: "Thomas John Hancock",
    birth: { year: 1990, month: 5, day: 15 },
    today: { year: 2026, month: 6, day: 21 },
  });

  it("assembles core numbers from the individual calculators", () => {
    expect(reading.core.lifePath.value).toBe(3);
    expect(reading.core.birthday.value).toBe(6);
    expect(reading.core.expression.value).toBe(7);
    expect(reading.core.maturity.value).toBe(1); // 3 + 7 -> 10 -> 1
  });

  it("carries the forecast for the requested date", () => {
    expect(reading.forecast.personal.year.value).toBe(3);
    expect(reading.forecast.personal.day.value).toBe(3);
    expect(reading.forecast.pinnacles).toHaveLength(4);
    expect(reading.forecast.challenges).toHaveLength(4);
  });

  it("lists karmic debts only where a core number carries one", () => {
    const debts = buildReading({
      fullName: "Lucy",
      birth: { year: 1979, month: 7, day: 4 },
    }).advanced.karmicDebts;
    expect(debts.map((d) => `${d.source}:${d.debt}`)).toEqual([
      "Life Path:19",
      "Expression:16",
      "Personality:13",
    ]);
    expect(reading.advanced.karmicDebts).toEqual([]);
  });
});

describe("computeCompatibility", () => {
  const data = compatibilityData as CompatibilityData;

  it("scores a mutual best match as soulmates", () => {
    const mutual: CompatibilityData = {
      "1": { summary: "", bestMatches: ["5"], goodMatches: [], challengingMatches: [], advice: "" },
      "5": { summary: "", bestMatches: ["1"], goodMatches: [], challengingMatches: [], advice: "" },
    };
    const result = computeCompatibility(1, 5, mutual);
    expect(result.score).toBe(100);
    expect(result.tier).toBe("soulmates");
  });

  it("averages both directions and falls back to neutral for unknown numbers", () => {
    const oneWay: CompatibilityData = {
      "1": { summary: "", bestMatches: [], goodMatches: [], challengingMatches: ["4"], advice: "" },
    };
    const result = computeCompatibility(1, 4, oneWay);
    expect(result.score).toBe(51); // (42 + 60) / 2
    expect(result.tier).toBe("growth");
  });

  it("is symmetric over the shipped dataset", () => {
    for (const a of [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33]) {
      for (const b of [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33]) {
        expect(computeCompatibility(a, b, data).score).toBe(
          computeCompatibility(b, a, data).score,
        );
      }
    }
  });
});
