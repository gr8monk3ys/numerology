"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, RotateCcw } from "lucide-react";
import type { Reading } from "@/lib/numerology";
import {
  castReading,
  carriedReadingInput,
  clearCarriedReadingInput,
  type ReadingField,
} from "@/lib/reading-input";

// The results pull in every meaning, tarot and zodiac dataset. They are only
// needed once a reading is cast, so they load then — and start loading as soon
// as the visitor reaches for the form (bundle-dynamic-imports, bundle-preload).
const loadResults = () => import("@/components/reading/ReadingResults");
const ReadingResults = dynamic(() => loadResults().then((m) => m.ReadingResults));

type Field = ReadingField;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ReadingForm() {
  // A reading set on the home dial arrives here already filled in and cast.
  const [fullName, setFullName] = useState(() => carriedReadingInput()?.fullName ?? "");
  const [birthDate, setBirthDate] = useState(() => carriedReadingInput()?.birthDate ?? "");
  const [yAsVowel, setYAsVowel] = useState(false);
  const [reading, setReading] = useState<Reading | null>(() => {
    const carried = carriedReadingInput();
    const result = carried && castReading(carried.fullName, carried.birthDate);
    return result && result.ok ? result.reading : null;
  });
  useEffect(clearCarriedReadingInput, []);
  const [error, setError] = useState<{ field: Field; message: string } | null>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);

  // Errors sit beside the field they are about, and focus moves to it.
  function fail(field: Field, message: string) {
    setError({ field, message });
    (field === "fullName" ? fullNameRef : birthDateRef).current?.focus();
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const result = castReading(fullName, birthDate, yAsVowel);
    if (!result.ok) {
      fail(result.field, result.message);
      return;
    }
    setReading(result.reading);

    requestAnimationFrame(() => {
      document
        .getElementById("reading-results")
        ?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    });
  }

  function reset() {
    setReading(null);
    setError(null);
  }

  const errorFor = (field: Field) => (error?.field === field ? error.message : null);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        onFocus={() => void loadResults()}
        onPointerEnter={() => void loadResults()}
        className="frame mx-auto max-w-3xl"
      >
        <div className="grid gap-6 p-6 sm:grid-cols-[1.5fr_1fr] sm:p-8">
          <div>
            <label htmlFor="fullName" className="field-label">
              Full birth name
            </label>
            <input
              ref={fullNameRef}
              id="fullName"
              name="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ada Augusta Byron…"
              className="field"
              autoComplete="off"
              aria-invalid={errorFor("fullName") ? true : undefined}
              aria-describedby={errorFor("fullName") ? "fullName-hint fullName-error" : "fullName-hint"}
            />
            <p id="fullName-hint" className="field-hint">
              Use the full name given at birth for the most accurate reading.
            </p>
            {errorFor("fullName") && (
              <p id="fullName-error" className="field-error">
                {errorFor("fullName")}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="birthDate" className="field-label">
              Date of birth
            </label>
            <input
              ref={birthDateRef}
              id="birthDate"
              name="birthDate"
              type="date"
              value={birthDate}
              min="1900-01-01"
              max="2099-12-31"
              onChange={(e) => setBirthDate(e.target.value)}
              className="field tabular"
              autoComplete="bday"
              aria-invalid={errorFor("birthDate") ? true : undefined}
              aria-describedby={errorFor("birthDate") ? "birthDate-error" : undefined}
            />
            {errorFor("birthDate") && (
              <p id="birthDate-error" className="field-error">
                {errorFor("birthDate")}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t hairline px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <label className="flex cursor-pointer items-center gap-3 text-base text-bone-200">
            <input
              type="checkbox"
              name="yAsVowel"
              checked={yAsVowel}
              onChange={(e) => setYAsVowel(e.target.checked)}
              className="checkbox"
            />
            <span>
              Treat <span className="font-figures text-bone-50">Y</span> as a vowel
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

        {/* Mounted from the first render so the message is announced when it
            is filled in; the visible copy sits beside its field. */}
        <p role="alert" className="sr-only">
          {error?.message ?? ""}
        </p>
      </form>

      <div id="reading-results" className="scroll-mt-20">
        {reading && <ReadingResults reading={reading} />}
      </div>
    </div>
  );
}
