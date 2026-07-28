import { describe, expect, it } from "vitest";
import { buildReadingQuery, parseIsoDate, parseReadingParams } from "./share";

describe("parseIsoDate", () => {
  it("accepts real calendar dates", () => {
    expect(parseIsoDate("1994-03-27")).toEqual({ year: 1994, month: 3, day: 27 });
    expect(parseIsoDate("2000-02-29")).toEqual({ year: 2000, month: 2, day: 29 }); // leap year
  });

  it("rejects impossible dates", () => {
    expect(parseIsoDate("1999-02-29")).toBeNull(); // not a leap year
    expect(parseIsoDate("1994-13-01")).toBeNull();
    expect(parseIsoDate("1994-00-10")).toBeNull();
    expect(parseIsoDate("1994-04-31")).toBeNull();
    expect(parseIsoDate("1994-3-27")).toBeNull(); // unpadded
    expect(parseIsoDate("27/03/1994")).toBeNull();
    expect(parseIsoDate("")).toBeNull();
  });

  it("rejects out-of-range years", () => {
    expect(parseIsoDate("1199-01-01")).toBeNull();
    expect(parseIsoDate("2100-01-01")).toBeNull();
    expect(parseIsoDate("1200-01-01")).not.toBeNull();
    expect(parseIsoDate("2099-12-31")).not.toBeNull();
  });
});

describe("parseReadingParams", () => {
  it("round-trips through buildReadingQuery", () => {
    const state = { name: "Ada Augusta Byron", dob: "1815-12-10", yAsVowel: true };
    const query = buildReadingQuery(state);
    const parsed = parseReadingParams(Object.fromEntries(new URLSearchParams(query)));
    expect(parsed).toEqual(state);
  });

  it("omits y from the query when false and parses it back as false", () => {
    const state = { name: "Ada Byron", dob: "1815-12-10", yAsVowel: false };
    const query = buildReadingQuery(state);
    expect(query).not.toContain("y=");
    expect(parseReadingParams(Object.fromEntries(new URLSearchParams(query)))).toEqual(state);
  });

  it("trims whitespace around the name", () => {
    const parsed = parseReadingParams({ name: "  Ada Byron  ", dob: "1815-12-10" });
    expect(parsed?.name).toBe("Ada Byron");
  });

  it("rejects missing or junk input", () => {
    expect(parseReadingParams({})).toBeNull();
    expect(parseReadingParams({ name: "Ada Byron" })).toBeNull();
    expect(parseReadingParams({ dob: "1815-12-10" })).toBeNull();
    expect(parseReadingParams({ name: "42 !!", dob: "1815-12-10" })).toBeNull();
    expect(parseReadingParams({ name: "A", dob: "1815-12-10" })).toBeNull();
    expect(parseReadingParams({ name: "Ada Byron", dob: "yesterday" })).toBeNull();
    expect(parseReadingParams({ name: "A".repeat(200), dob: "1815-12-10" })).toBeNull();
  });

  it("takes the first value when a param is repeated", () => {
    const parsed = parseReadingParams({
      name: ["Ada Byron", "Eve"],
      dob: "1815-12-10",
    });
    expect(parsed?.name).toBe("Ada Byron");
  });

  it("treats any y other than '1' as false", () => {
    expect(
      parseReadingParams({ name: "Ada Byron", dob: "1815-12-10", y: "true" })?.yAsVowel,
    ).toBe(false);
  });
});
