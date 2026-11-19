import { describe, expect, it } from "vitest";
import { carriedReadingInput, carryReadingInput, castReading, clearCarriedReadingInput } from "./reading-input";

describe("castReading", () => {
  it("builds a reading from a name and an ISO birth date", () => {
    const r = castReading("  Thomas John Hancock ", "1990-05-15");
    expect(r.ok && r.reading.core.lifePath.value).toBe(3);
  });

  it("names the field that is wrong", () => {
    expect(castReading("A", "1990-05-15")).toMatchObject({ ok: false, field: "fullName" });
    expect(castReading("Ada Byron", "")).toMatchObject({ ok: false, field: "birthDate" });
    expect(castReading("Ada Byron", "1990-00-15")).toMatchObject({ ok: false, field: "birthDate" });
  });

  it("refuses dates that do not exist or fall outside the form's bounds", () => {
    expect(castReading("Ada Byron", "1990-02-31")).toMatchObject({ ok: false, field: "birthDate" });
    expect(castReading("Ada Byron", "0005-01-01")).toMatchObject({ ok: false, field: "birthDate" });
    expect(castReading("Ada Byron", "2100-01-01")).toMatchObject({ ok: false, field: "birthDate" });
    expect(castReading("Ada Byron", "2000-02-29").ok).toBe(true);
  });

  it("hands inputs to /reading once, then forgets them", () => {
    carryReadingInput({ fullName: "Ada Byron", birthDate: "1990-12-10" });
    expect(carriedReadingInput()).toEqual({ fullName: "Ada Byron", birthDate: "1990-12-10" });
    clearCarriedReadingInput();
    expect(carriedReadingInput()).toBeNull();
  });
});
