"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
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
import { SectionRow } from "@/components/ui/SectionHeading";
import { CycleList } from "@/components/reading/ReadingResults";
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
      setError("That date doesn’t look right.");
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
      <form onSubmit={handleSubmit} className="frame ticks mx-auto max-w-3xl">
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:p-8">
          <div className="flex-1">
            <label htmlFor="fc-date" className="field-label">Your date of birth</label>
            <input
              id="fc-date"
              type="date"
              value={birthDate}
              min="1900-01-01"
              max="2099-12-31"
              onChange={(e) => setBirthDate(e.target.value)}
              className="field field-mono"
            />
          </div>
          <button type="submit" className="btn btn-primary shrink-0">
            Reveal cycles
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        {error && (
          <p className="border-t border-rubric-400/40 bg-rubric-400/[0.08] px-6 py-3 font-mono text-xs tracking-wider text-rubric-300 sm:px-8">
            ! {error}
          </p>
        )}
      </form>

      {state && (
        <div className="mt-16 space-y-16">
          <section className="space-y-6">
            <SectionRow index="01" title="Personal cycles" meta={`Age ${state.age}`} />
            <div className="divided sm:grid-cols-3">
              {[
                { label: "Personal year", ins: state.personal.year },
                { label: "Personal month", ins: state.personal.month },
                { label: "Personal day", ins: state.personal.day },
              ].map(({ label, ins }) => (
                <div key={label} className="flex items-center gap-4 p-5">
                  <NumberOrb value={ins.value} size="md" isMaster={ins.isMaster} />
                  <div>
                    <span className="mono-label">{label}</span>
                    <p className="text-sm text-bone-300">Current vibration</p>
                  </div>
                </div>
              ))}
            </div>
            {py && (
              <div className="frame p-5 sm:p-6">
                <span className="mono-label-accent">A {py.theme} year</span>
                <p className="mt-3 text-[15px] text-bone-100">{py.summary}</p>
                <p className="mt-2 text-sm text-bone-300">
                  <span className="text-gold-200">Guidance · </span>
                  {py.advice}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {py.keywords.map((k) => (
                    <Chip key={k} tone="muted">{k}</Chip>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="space-y-6">
            <SectionRow index="02" title="Pinnacles & challenges" meta="Lifetime" />
            <div className="grid gap-6 lg:grid-cols-2">
              <CycleList
                title="Pinnacles"
                items={state.pinnacles.map((p) => ({
                  key: p.index,
                  value: p.value,
                  isMaster: p.isMaster,
                  name: `Pinnacle ${p.index}`,
                  ages: p.label,
                  summary: pick(pinnacleMeanings, p.value)?.summary,
                  active: inRange(state.age, p),
                }))}
              />
              <CycleList
                title="Challenges"
                items={state.challenges.map((c) => ({
                  key: c.index,
                  value: c.value,
                  isMaster: false,
                  name: `Challenge ${c.index}`,
                  ages: c.label,
                  summary: pick(challengeMeanings, c.value)?.summary,
                  active: inRange(state.age, c),
                }))}
              />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
