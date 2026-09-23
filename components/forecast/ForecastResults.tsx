"use client";

import type { BirthDate, PersonalCycles, CyclePeriod } from "@/lib/numerology";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";
import { SectionRow } from "@/components/ui/SectionHeading";
import { CycleList } from "@/components/reading/CycleList";
import {
  personalYearMeanings,
  pinnacleMeanings,
  challengeMeanings,
  pick,
} from "@/lib/content";

export interface ForecastState {
  birth: BirthDate;
  personal: PersonalCycles;
  pinnacles: CyclePeriod[];
  challenges: CyclePeriod[];
  age: number;
}

const inRange = (age: number, p: CyclePeriod) =>
  age >= p.startAge && (p.endAge === null || age <= p.endAge);

/**
 * The forecast once computed. Split from the form and loaded on demand, since
 * it is the only part that needs the meaning datasets (bundle-dynamic-imports).
 */
export function ForecastResults({ state }: { state: ForecastState }) {
  const py = pick(personalYearMeanings, state.personal.year.value);

  return (
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
  );
}
