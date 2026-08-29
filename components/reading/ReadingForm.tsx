"use client";

import { useState, type FormEvent } from "react";
import clsx from "clsx";
import { Sparkles, RotateCcw } from "lucide-react";
import { buildReading, type Reading } from "@/lib/numerology";
import { ReadingResults } from "@/components/reading/ReadingResults";

export function ReadingForm() {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [yAsVowel, setYAsVowel] = useState(false);
  const [reading, setReading] = useState<Reading | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const cleanName = fullName.trim();
    if (cleanName.replace(/[^a-zA-Z]/g, "").length < 2) {
      setError("Please enter your full birth name.");
      return;
    }
    if (!birthDate) {
      setError("Please enter your date of birth.");
      return;
    }
    const [y, m, d] = birthDate.split("-").map(Number);
    if (!y || !m || !d) {
      setError("That date doesn't look right.");
      return;
    }

    const now = new Date();
    const result = buildReading({
      fullName: cleanName,
      birth: { year: y, month: m, day: d },
      yAsVowel,
      today: {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
      },
    });
    setReading(result);

    // Reveal results
    requestAnimationFrame(() => {
      document
        .getElementById("reading-results")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function reset() {
    setReading(null);
    setError(null);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="glass-strong mx-auto max-w-2xl space-y-5 p-6 sm:p-8"
      >
        <div>
          <label htmlFor="fullName" className="label-text">
            Full birth name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Ada Augusta Byron"
            className="input-field"
            autoComplete="off"
            aria-describedby="fullName-hint"
          />
          <p id="fullName-hint" className="mt-1.5 text-xs text-mystic-300/85">
            Use the full name given at birth for the most accurate reading.
          </p>
        </div>

        <div>
          <label htmlFor="birthDate" className="label-text">
            Date of birth
          </label>
          <input
            id="birthDate"
            type="date"
            value={birthDate}
            min="1900-01-01"
            max="2099-12-31"
            onChange={(e) => setBirthDate(e.target.value)}
            className={clsx("input-field date-field", !birthDate && "is-empty")}
            autoComplete="bday"
            aria-describedby="birthDate-hint"
          />
          <p id="birthDate-hint" className="mt-1.5 text-xs text-mystic-300/85">
            Day, month and year of birth — type it, or open the almanac.
          </p>
        </div>

        <label className="flex cursor-pointer items-center gap-3 text-sm text-mystic-200/85">
          <input
            type="checkbox"
            checked={yAsVowel}
            onChange={(e) => setYAsVowel(e.target.checked)}
            className="checkbox-field"
          />
          Treat “Y” as a vowel (affects Soul Urge &amp; Personality)
        </label>

        {error && (
          <p className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-4 py-2.5 text-sm text-rose-200">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <button type="submit" className="btn-primary">
            <Sparkles className="h-4 w-4" />
            {reading ? "Recalculate" : "Cast my reading"}
          </button>
          {reading && (
            <button type="button" onClick={reset} className="btn-ghost">
              <RotateCcw className="h-4 w-4" />
              Clear
            </button>
          )}
        </div>
      </form>

      <div id="reading-results">
        {reading && <ReadingResults reading={reading} />}
      </div>
    </div>
  );
}
