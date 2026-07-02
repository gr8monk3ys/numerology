"use client";

import { useState, type FormEvent } from "react";
import {
  personalCycles,
  pinnacles,
  challenges,
  type BirthDate,
  type PersonalCycles,
  type CyclePeriod,
} from "@/lib/numerology";
import { parseBirthDate, ageOn } from "@/lib/casting";
import { ChapterHead } from "@/components/reading/Chapter";
import {
  PersonalCyclesRow,
  PersonalYearCard,
  PeriodList,
} from "@/components/cycles/AlmanacPanels";
import { personalYearMeanings } from "@/lib/content/cyclesContent";
import { pick } from "@/lib/content/core";

interface ForecastState {
  birth: BirthDate;
  personal: PersonalCycles;
  pinnacles: CyclePeriod[];
  challenges: CyclePeriod[];
  age: number;
}

export function ForecastForm() {
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<ForecastState | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!birthDate) {
      setError("Enter the date of birth.");
      return;
    }
    const birth = parseBirthDate(birthDate);
    if (!birth) {
      setError("That date could not be read.");
      return;
    }
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
      age: ageOn(birth, today),
    });
  }

  const py = state
    ? pick(personalYearMeanings, state.personal.year.value)
    : undefined;

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="glass-strong mx-auto flex max-w-xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-end sm:px-10"
      >
        <div className="flex-1">
          <label htmlFor="fc-date" className="label-text">
            The date of birth
          </label>
          <input
            id="fc-date"
            type="date"
            value={birthDate}
            min="1900-01-01"
            max="2099-12-31"
            onChange={(e) => setBirthDate(e.target.value)}
            className="input-field"
          />
        </div>
        <button type="submit" className="btn-primary shrink-0">
          Consult the Almanac
        </button>
      </form>
      {error && (
        <p
          role="alert"
          className="mx-auto mt-3 max-w-xl text-center text-sm text-rose-200"
        >
          {error}
        </p>
      )}

      {state && (
        <div className="mt-14 space-y-14">
          <div className="space-y-4">
            <PersonalCyclesRow personal={state.personal} />
            {py && <PersonalYearCard py={py} />}
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-3">
              <ChapterHead as="h3" className="text-2xl" title="The Four Pinnacles" glyph="▵" />
              <PeriodList kind="Pinnacle" periods={state.pinnacles} age={state.age} />
            </div>
            <div className="space-y-3">
              <ChapterHead as="h3" className="text-2xl" title="The Four Challenges" glyph="†" />
              <PeriodList kind="Challenge" periods={state.challenges} age={state.age} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
