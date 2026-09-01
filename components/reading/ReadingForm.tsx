"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
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
      setError("That date doesn’t look right.");
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
      <form onSubmit={handleSubmit} className="frame ticks mx-auto max-w-3xl">
        <div className="grid gap-6 p-6 sm:grid-cols-[1.5fr_1fr] sm:p-8">
          <div>
            <label htmlFor="fullName" className="field-label">
              Full birth name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ada Augusta Byron"
              className="field"
              autoComplete="off"
            />
            <p className="field-hint">
              Use the full name given at birth for the most accurate reading.
            </p>
          </div>

          <div>
            <label htmlFor="birthDate" className="field-label">
              Date of birth
            </label>
            <input
              id="birthDate"
              type="date"
              value={birthDate}
              min="1900-01-01"
              max="2099-12-31"
              onChange={(e) => setBirthDate(e.target.value)}
              className="field field-mono"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t hairline px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-bone-200">
            <input
              type="checkbox"
              checked={yAsVowel}
              onChange={(e) => setYAsVowel(e.target.checked)}
              className="checkbox"
            />
            <span>
              Treat <span className="font-mono text-bone-50">Y</span> as a vowel
              <span className="hidden text-bone-500 sm:inline"> · affects Soul Urge &amp; Personality</span>
            </span>
          </label>

          <div className="flex gap-2">
            {reading && (
              <button type="button" onClick={reset} className="btn btn-ghost">
                <RotateCcw className="h-3.5 w-3.5" />
                Clear
              </button>
            )}
            <button type="submit" className="btn btn-primary">
              {reading ? "Recalculate" : "Cast reading"}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {error && (
          <p className="border-t border-rubric-400/40 bg-rubric-400/[0.08] px-6 py-3 font-mono text-xs tracking-wider text-rubric-300 sm:px-8">
            ! {error}
          </p>
        )}
      </form>

      <div id="reading-results" className="scroll-mt-20">
        {reading && <ReadingResults reading={reading} />}
      </div>
    </div>
  );
}
