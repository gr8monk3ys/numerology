"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, RotateCcw } from "lucide-react";
import { buildReading, type Reading } from "@/lib/numerology";
import { ReadingResults } from "@/components/reading/ReadingResults";
import { buildReadingQuery, type ReadingLinkState } from "@/lib/share";

function castReading(state: ReadingLinkState): Reading {
  const [y, m, d] = state.dob.split("-").map(Number);
  const now = new Date();
  return buildReading({
    fullName: state.name,
    birth: { year: y, month: m, day: d },
    yAsVowel: state.yAsVowel,
    today: {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
    },
  });
}

function scrollToResults(smooth: boolean) {
  requestAnimationFrame(() => {
    document
      .getElementById("reading-results")
      ?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  });
}

export function ReadingForm({ initial }: { initial: ReadingLinkState | null }) {
  const router = useRouter();
  const [fullName, setFullName] = useState(initial?.name ?? "");
  const [birthDate, setBirthDate] = useState(initial?.dob ?? "");
  const [yAsVowel, setYAsVowel] = useState(initial?.yAsVowel ?? false);
  const [reading, setReading] = useState<Reading | null>(null);
  const [error, setError] = useState<string | null>(null);
  const autoCast = useRef(initial);

  // A shared link arrives with valid params — cast it immediately so the
  // recipient lands on the reading, not an empty form. Client-only so the
  // "today"-dependent forecast never risks a server/client mismatch.
  useEffect(() => {
    if (!autoCast.current) return;
    setReading(castReading(autoCast.current));
    scrollToResults(false);
    autoCast.current = null;
  }, []);

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

    const state: ReadingLinkState = {
      name: cleanName,
      dob: birthDate,
      yAsVowel,
    };
    setReading(castReading(state));
    // Keep the URL in sync so the address bar is always a shareable link.
    router.replace(`/reading?${buildReadingQuery(state)}`, { scroll: false });
    scrollToResults(true);
  }

  function reset() {
    setReading(null);
    setError(null);
    router.replace("/reading", { scroll: false });
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
          />
          <p className="mt-1.5 text-xs text-mystic-300/50">
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
            min="1200-01-01"
            max="2099-12-31"
            onChange={(e) => setBirthDate(e.target.value)}
            className="input-field [color-scheme:dark]"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-3 text-sm text-mystic-200/80">
          <input
            type="checkbox"
            checked={yAsVowel}
            onChange={(e) => setYAsVowel(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-void-900 accent-mystic-500"
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
