"use client";

import { useRef, useState, type FormEvent } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import {
  personalCycles,
  pinnacles,
  challenges,
  type BirthDate,
} from "@/lib/numerology";
import type { ForecastState } from "@/components/forecast/ForecastResults";

// Results (and the meaning datasets they need) load on demand, starting as
// soon as the visitor reaches for the form (bundle-dynamic-imports,
// bundle-preload).
const loadResults = () => import("@/components/forecast/ForecastResults");
const ForecastResults = dynamic(() => loadResults().then((m) => m.ForecastResults));

function computeAge(birth: BirthDate, today: BirthDate): number {
  let age = today.year - birth.year;
  if (
    today.month < birth.month ||
    (today.month === birth.month && today.day < birth.day)
  ) {
    age -= 1;
  }
  return age;
}

export function ForecastForm() {
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<ForecastState | null>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  // The error names the field and focus moves to it.
  function fail(message: string) {
    setError(message);
    dateRef.current?.focus();
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!birthDate) {
      fail("Please enter your date of birth.");
      return;
    }
    const [y, m, d] = birthDate.split("-").map(Number);
    if (!y || !m || !d) {
      fail("That date doesn’t look right. Use the date picker, or type it as YYYY-MM-DD.");
      return;
    }
    const birth: BirthDate = { year: y, month: m, day: d };
    const now = new Date();
    const today: BirthDate = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
    };
    setState({
      birth,
      personal: personalCycles(birth, today),
      pinnacles: pinnacles(birth),
      challenges: challenges(birth),
      age: computeAge(birth, today),
    });
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        onFocus={() => void loadResults()}
        onPointerEnter={() => void loadResults()}
        className="frame ticks mx-auto max-w-3xl"
      >
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:p-8">
          <div className="flex-1">
            <label htmlFor="fc-date" className="field-label">Your date of birth</label>
            <input
              ref={dateRef}
              id="fc-date"
              name="birthDate"
              type="date"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "fc-date-error" : undefined}
              value={birthDate}
              min="1900-01-01"
              max="2099-12-31"
              onChange={(e) => setBirthDate(e.target.value)}
              className="field field-mono"
              autoComplete="bday"
            />
          </div>
          <button type="submit" className="btn btn-primary shrink-0">
            Reveal cycles
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        {/* Mounted empty so the message is announced when it appears. */}
        <div role="alert">
          {error && (
            <p
              id="fc-date-error"
              className="border-t border-rubric-400/40 bg-rubric-400/[0.08] px-6 py-3 font-mono text-xs tracking-wider text-rubric-300 sm:px-8"
            >
              ! {error}
            </p>
          )}
        </div>
      </form>

      {state && <ForecastResults state={state} />}
    </div>
  );
}
