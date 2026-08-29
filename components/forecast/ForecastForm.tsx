"use client";

import { useState, type FormEvent } from "react";
import clsx from "clsx";
import { CalendarClock, Mountain, Swords } from "lucide-react";
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
      setError("Please enter your date of birth.");
      return;
    }
    const [y, m, d] = birthDate.split("-").map(Number);
    if (!y || !m || !d) {
      setError("That date doesn't look right.");
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

  const py = state ? pick(personalYearMeanings, state.personal.year.value) : undefined;

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="glass-strong mx-auto flex max-w-xl flex-col gap-4 p-6 sm:flex-row sm:items-end sm:p-8"
      >
        <div className="flex-1">
          <label htmlFor="fc-date" className="label-text">
            Your date of birth
          </label>
          <input
            id="fc-date"
            type="date"
            value={birthDate}
            min="1900-01-01"
            max="2099-12-31"
            onChange={(e) => setBirthDate(e.target.value)}
            className={clsx("input-field date-field", !birthDate && "is-empty")}
            autoComplete="bday"
          />
        </div>
        <button type="submit" className="btn-primary shrink-0">
          <CalendarClock className="h-4 w-4" />
          Reveal cycles
        </button>
      </form>
      {error && (
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-rose-300">
          {error}
        </p>
      )}

      {state && (
        <div className="mt-12 space-y-12">
          {/* Personal cycles */}
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
                    <span className="text-xs font-semibold uppercase tracking-widest text-gold-300/80">
                      {label}
                    </span>
                    <p className="text-sm text-mystic-200/85">
                      Current vibration
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {py && (
              <div className="glass mt-4 p-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-300/80">
                  A {py.theme} Year
                </span>
                <p className="mt-2 text-sm text-mystic-100/85">{py.summary}</p>
                <p className="mt-2 text-sm text-mystic-200/85">
                  <span className="text-gold-300">Guidance: </span>
                  {py.advice}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
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
              <div className="flex items-center gap-2 text-mystic-100">
                <Mountain className="h-5 w-5 text-gold-300" />
                <h3 className="font-display text-xl">Pinnacles</h3>
              </div>
              {state.pinnacles.map((p) => {
                const active = inRange(state.age, p);
                const pm = pick(pinnacleMeanings, p.value);
                return (
                  <div
                    key={p.index}
                    className={`glass flex items-start gap-4 p-4 ${
                      active ? "ring-1 ring-gold-300/50" : ""
                    }`}
                  >
                    <NumberOrb value={p.value} size="sm" isMaster={p.isMaster} />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-mystic-50">
                          Pinnacle {p.index}
                        </span>
                        <Chip tone="muted">ages {p.label}</Chip>
                        {active && <Chip tone="gold">Now</Chip>}
                      </div>
                      {pm?.summary && (
                        <p className="mt-1 text-sm text-mystic-200/85">
                          {pm.summary}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-mystic-100">
                <Swords className="h-5 w-5 text-gold-300" />
                <h3 className="font-display text-xl">Challenges</h3>
              </div>
              {state.challenges.map((c) => {
                const active = inRange(state.age, c);
                const cm = pick(challengeMeanings, c.value);
                return (
                  <div
                    key={c.index}
                    className={`glass flex items-start gap-4 p-4 ${
                      active ? "ring-1 ring-gold-300/50" : ""
                    }`}
                  >
                    <NumberOrb value={c.value} size="sm" />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-mystic-50">
                          Challenge {c.index}
                        </span>
                        <Chip tone="muted">ages {c.label}</Chip>
                        {active && <Chip tone="gold">Now</Chip>}
                      </div>
                      {cm?.summary && (
                        <p className="mt-1 text-sm text-mystic-200/85">
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
