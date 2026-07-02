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
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";
import {
  personalYearMeanings,
  pinnacleMeanings,
  challengeMeanings,
  pick,
} from "@/lib/content";

interface ForecastState {
  birth: BirthDate;
  personal: PersonalCycles;
  pinnacles: CyclePeriod[];
  challenges: CyclePeriod[];
  age: number;
}

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

const inRange = (age: number, p: CyclePeriod) =>
  age >= p.startAge && (p.endAge === null || age <= p.endAge);

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
    const [y, m, d] = birthDate.split("-").map(Number);
    if (!y || !m || !d) {
      setError("That date could not be read.");
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
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-rose-200">
          {error}
        </p>
      )}

      {state && (
        <div className="mt-14 space-y-14">
          {/* The present vibrations */}
          <div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Personal Year", ins: state.personal.year },
                { label: "Personal Month", ins: state.personal.month },
                { label: "Personal Day", ins: state.personal.day },
              ].map(({ label, ins }) => (
                <div key={label} className="glass flex items-center gap-4 p-5">
                  <NumberOrb value={ins.value} size="md" />
                  <div>
                    <p className="eyebrow">{label}</p>
                    <p className="text-sm text-mystic-300/70">
                      the present vibration
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {py && (
              <div className="glass mt-4 p-6">
                <p className="eyebrow">A {py.theme} year</p>
                <p className="mt-2 text-sm leading-relaxed text-mystic-100/85">
                  {py.summary}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-mystic-200/75">
                  <span className="text-gold-300">Counsel: </span>
                  {py.advice}
                </p>
                <div className="term-row mt-3">
                  {py.keywords.map((k) => (
                    <Chip key={k}>{k}</Chip>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pinnacles & Challenges */}
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-3">
              <div className="chapter-head">
                <h3 className="font-display text-2xl text-mystic-50">
                  The Four Pinnacles
                </h3>
                <span className="h-px flex-1 bg-gradient-to-r from-gold-500/40 to-transparent" />
                <span className="chapter-glyph" aria-hidden>▵</span>
              </div>
              {state.pinnacles.map((p) => {
                const active = inRange(state.age, p);
                const pm = pick(pinnacleMeanings, p.value);
                return (
                  <div
                    key={p.index}
                    className={`glass flex items-start gap-4 p-4 ${
                      active ? "border-gold-400/60" : ""
                    }`}
                  >
                    <NumberOrb value={p.value} size="sm" isMaster={p.isMaster} />
                    <div>
                      <p className="flex flex-wrap items-baseline gap-x-3 text-sm text-mystic-50">
                        Pinnacle {p.index}
                        <span className="text-mystic-400/70">
                          ages {p.label}
                        </span>
                        {active && (
                          <span className="term term-gold">at present</span>
                        )}
                      </p>
                      {pm?.summary && (
                        <p className="mt-1 text-sm leading-relaxed text-mystic-200/70">
                          {pm.summary}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="space-y-3">
              <div className="chapter-head">
                <h3 className="font-display text-2xl text-mystic-50">
                  The Four Challenges
                </h3>
                <span className="h-px flex-1 bg-gradient-to-r from-gold-500/40 to-transparent" />
                <span className="chapter-glyph" aria-hidden>†</span>
              </div>
              {state.challenges.map((c) => {
                const active = inRange(state.age, c);
                const cm = pick(challengeMeanings, c.value);
                return (
                  <div
                    key={c.index}
                    className={`glass flex items-start gap-4 p-4 ${
                      active ? "border-gold-400/60" : ""
                    }`}
                  >
                    <NumberOrb value={c.value} size="sm" />
                    <div>
                      <p className="flex flex-wrap items-baseline gap-x-3 text-sm text-mystic-50">
                        Challenge {c.index}
                        <span className="text-mystic-400/70">
                          ages {c.label}
                        </span>
                        {active && (
                          <span className="term term-gold">at present</span>
                        )}
                      </p>
                      {cm?.summary && (
                        <p className="mt-1 text-sm leading-relaxed text-mystic-200/70">
                          {cm.summary}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
