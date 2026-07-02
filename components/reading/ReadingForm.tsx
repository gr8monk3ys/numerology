"use client";

import { useEffect, useState, type FormEvent } from "react";
import { buildReading, type Reading } from "@/lib/numerology";
import { ReadingResults } from "@/components/reading/ReadingResults";

function castReading(
  fullName: string,
  birthDate: string,
  yAsVowel: boolean,
): Reading | null {
  const cleanName = fullName.trim();
  if (cleanName.replace(/[^a-zA-Z]/g, "").length < 2) return null;
  const [y, m, d] = birthDate.split("-").map(Number);
  if (!y || !m || !d) return null;
  const now = new Date();
  return buildReading({
    fullName: cleanName,
    birth: { year: y, month: m, day: d },
    yAsVowel,
    today: {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
    },
  });
}

export function ReadingForm() {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [yAsVowel, setYAsVowel] = useState(false);
  const [reading, setReading] = useState<Reading | null>(null);
  const [error, setError] = useState<string | null>(null);

  // A shared link carries the reading in its query string; cast it on arrival.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const dob = params.get("dob");
    if (!name || !dob) return;
    const y = params.get("y") === "1";
    const result = castReading(name, dob, y);
    if (result) {
      setFullName(name);
      setBirthDate(dob);
      setYAsVowel(y);
      setReading(result);
    }
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (fullName.trim().replace(/[^a-zA-Z]/g, "").length < 2) {
      setError("Enter the full name as it was given at birth.");
      return;
    }
    if (!birthDate) {
      setError("Enter the date of birth.");
      return;
    }
    const result = castReading(fullName, birthDate, yAsVowel);
    if (!result) {
      setError("That date could not be read.");
      return;
    }
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
    if (window.location.search) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="glass-strong no-print mx-auto max-w-2xl space-y-5 px-6 py-8 sm:px-10"
      >
        <div>
          <label htmlFor="fullName" className="label-text">
            The name given at birth
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="as it was first written, e.g. Ada Augusta Byron"
            className="input-field"
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="birthDate" className="label-text">
            The date of birth
          </label>
          <input
            id="birthDate"
            type="date"
            value={birthDate}
            min="1900-01-01"
            max="2099-12-31"
            onChange={(e) => setBirthDate(e.target.value)}
            className="input-field"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-3 text-sm text-mystic-200/80">
          <input
            type="checkbox"
            checked={yAsVowel}
            onChange={(e) => setYAsVowel(e.target.checked)}
            className="h-4 w-4 accent-gold-500"
          />
          Count &ldquo;Y&rdquo; among the vowels (alters the Soul Urge and
          Personality)
        </label>

        {error && (
          <p className="border-l-2 border-blood-500 bg-blood-600/10 px-4 py-2.5 text-sm text-rose-200">
            {error}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-5">
          <button type="submit" className="btn-primary">
            {reading ? "Cast it anew" : "Cast the Reading"}
          </button>
          {reading && (
            <button type="button" onClick={reset} className="action-quiet">
              clear the page
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
