import { describe, it, expect } from "vitest";
import { buildCosmicProfile } from "./cosmic";
import { buildReading } from "../numerology/report";
import { tarotMajor, bridgeMeanings, correspondences, lifeCyclesContent, pick } from ".";

describe("buildCosmicProfile", () => {
  // Same worked example as lib/numerology/reading.test.ts: Thomas John
  // Hancock, 1990-05-15 -> Life Path 3, Expression 7, Birthday 6, Hidden
  // Passion [1].
  const reading = buildReading({
    fullName: "Thomas John Hancock",
    birth: { year: 1990, month: 5, day: 15 },
  });
  const profile = buildCosmicProfile(reading);

  it("derives the Tarot Birth Card and its Major Arcana content", () => {
    // 5 + 15 + 1990 = 2010 -> 3, so personality and soul card are both III.
    expect(profile.tarot.card).toMatchObject({ personality: 3, soul: 3, same: true });
    expect(profile.tarot.personality).toBe(pick(tarotMajor, 3));
    expect(profile.tarot.soul).toBe(pick(tarotMajor, 3));
    expect(profile.tarot.personality?.name).toBeTruthy();
  });

  it("looks up the Western sun sign and Chinese zodiac from birth data", () => {
    expect(profile.sun?.sign).toBe("Taurus");
    expect(profile.chinese.animal).toBe("Horse");
  });

  it("computes Planes of Expression and pairs it with its display content", () => {
    expect(profile.planes.result).toMatchObject({
      total: 17,
      physical: 1,
      mental: 8,
      emotional: 5,
      intuitive: 3,
      dominant: "mental",
    });
    expect(profile.planes.content.mental.title).toBeTruthy();
  });

  it("builds three life cycles annotated with position title, framing and meaning", () => {
    expect(profile.cycles).toHaveLength(3);
    expect(profile.cycles.map((c) => c.ruler)).toEqual(["month", "day", "year"]);
    // Life Path 3 -> firstEnd = 36 - 3 = 33, secondEnd = 33 + 27 = 60.
    expect(profile.cycles.map((c) => c.value)).toEqual([5, 6, 1]);
    profile.cycles.forEach((cycle, i) => {
      const positions = [
        lifeCyclesContent.positions.first,
        lifeCyclesContent.positions.second,
        lifeCyclesContent.positions.third,
      ];
      expect(cycle.title).toBe(positions[i].title);
      expect(cycle.framing).toBe(positions[i].framing);
      expect(cycle.meaning).toBe(pick(lifeCyclesContent.numbers, cycle.value)?.summary);
    });
  });

  it("builds the two bridge numbers with their labels and content", () => {
    expect(profile.bridges).toHaveLength(2);
    const [lpEx, suPe] = profile.bridges;
    // Life Path 3 vs Expression 7 -> |3-7| = 4; Soul Urge 2 vs Personality 5 -> |2-5| = 3.
    expect(lpEx).toMatchObject({ key: "lp-ex", value: 4 });
    expect(suPe).toMatchObject({ key: "su-pe", value: 3 });
    expect(lpEx.meaning).toBe(pick(bridgeMeanings, 4));
    expect(suPe.meaning).toBe(pick(bridgeMeanings, 3));
  });

  it("assembles deduplicated lucky numbers and the Life Path correspondence", () => {
    // Life Path 3, Expression 7, Birthday 6, Hidden Passion 1 -- all distinct.
    expect(profile.lucky.numbers).toEqual([3, 7, 6, 1]);
    const corr = pick(correspondences, reading.core.lifePath.value);
    expect(profile.lucky.day).toBe(corr?.dayOfWeek);
    expect(profile.lucky.colors).toEqual(corr?.colors);
    expect(profile.lucky.gem).toBe(corr?.gemstones?.[0]);
  });

  it("deduplicates lucky numbers when core numbers repeat", () => {
    // Lucy, 1979-07-04: Life Path 19 -> 1, Expression 16 -> 7 (see
    // reading.test.ts's karmic-debt case for the same name/date).
    const lucyReading = buildReading({ fullName: "Lucy", birth: { year: 1979, month: 7, day: 4 } });
    const lucyProfile = buildCosmicProfile(lucyReading);
    expect(new Set(lucyProfile.lucky.numbers).size).toBe(lucyProfile.lucky.numbers.length);
  });
});
