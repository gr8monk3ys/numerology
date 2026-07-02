/**
 * The almanac's shared renderings — personal-cycle cards, the personal-year
 * counsel, and the pinnacle/challenge period lists — used identically by the
 * Almanac page and the reading's almanac chapter so the two never drift.
 */

import type {
  CyclePeriod,
  PersonalCycles,
} from "@/lib/numerology";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";
import {
  pinnacleMeanings,
  challengeMeanings,
} from "@/lib/content/cyclesContent";
import { pick, type PersonalYearMeaning } from "@/lib/content/core";

export function PersonalCyclesRow({ personal }: { personal: PersonalCycles }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {[
        { label: "Personal Year", ins: personal.year },
        { label: "Personal Month", ins: personal.month },
        { label: "Personal Day", ins: personal.day },
      ].map(({ label, ins }) => (
        <div key={label} className="glass flex items-center gap-4 p-5">
          <NumberOrb value={ins.value} size="md" />
          <div>
            <p className="eyebrow">{label}</p>
            <p className="text-sm text-mystic-300/80">the present vibration</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PersonalYearCard({ py }: { py: PersonalYearMeaning }) {
  return (
    <div className="glass p-6">
      <p className="eyebrow">A {py.theme} year</p>
      <p className="mt-2 text-sm leading-relaxed text-mystic-100/85">
        {py.summary}
      </p>
      <p className="mt-2 text-note">
        <span className="text-gold-300">Counsel: </span>
        {py.advice}
      </p>
      <div className="term-row mt-3">
        {py.keywords.map((k) => (
          <Chip key={k}>{k}</Chip>
        ))}
      </div>
    </div>
  );
}

const activeAt = (age: number, p: CyclePeriod) =>
  age >= p.startAge && (p.endAge === null || age <= p.endAge);

export function PeriodList({
  kind,
  periods,
  age,
}: {
  kind: "Pinnacle" | "Challenge";
  periods: CyclePeriod[];
  /** When given, the period covering this age is marked "at present". */
  age?: number;
}) {
  return (
    <div className="space-y-3">
      {periods.map((p) => {
        const active = age !== undefined && activeAt(age, p);
        const m =
          kind === "Pinnacle"
            ? pick(pinnacleMeanings, p.value)
            : pick(challengeMeanings, p.value);
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
                {kind} {p.index}
                <span className="text-mystic-300/85">ages {p.label}</span>
                {active && <Chip tone="gold">at present</Chip>}
              </p>
              {m?.summary && (
                <p className="mt-1 text-sm leading-relaxed text-mystic-200/70">
                  {m.summary}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
