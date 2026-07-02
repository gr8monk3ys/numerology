"use client";

import { useEffect, useState } from "react";
import { universalYear, universalMonth, universalDay } from "@/lib/numerology";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { personalYearMeanings } from "@/lib/content/cyclesContent";
import { pick } from "@/lib/content/core";

interface Today {
  year: number;
  month: number;
  day: number;
}

/**
 * The universal vibrations of the calendar itself — the same for all the
 * world, no birth date required. Computed client-side so the static page
 * always shows the visitor's own today.
 */
export function UniversalToday() {
  const [today, setToday] = useState<Today | null>(null);

  useEffect(() => {
    const now = new Date();
    setToday({
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
    });
  }, []);

  if (!today) {
    // Server render & first paint: hold the space without inventing a date.
    return <div className="mx-auto mb-12 h-28 max-w-3xl" aria-hidden />;
  }

  const uy = universalYear(today.year);
  const um = universalMonth(today.year, today.month);
  const ud = universalDay(today.year, today.month, today.day);
  const theme = pick(personalYearMeanings, ud)?.theme;

  return (
    <section className="mx-auto mb-12 max-w-3xl" aria-label="The universal day">
      <div className="glass flex flex-col items-center gap-5 p-6 sm:flex-row sm:justify-between sm:px-8">
        <div>
          <p className="eyebrow">The Day at Hand</p>
          <p className="mt-1 text-sm leading-relaxed text-mystic-200/75">
            The calendar carries its own vibration, common to all the world
            {theme ? (
              <>
                {" "}
                — today is a{" "}
                <span className="italic text-gold-200">
                  {theme.toLowerCase()}
                </span>{" "}
                day.
              </>
            ) : (
              "."
            )}
          </p>
        </div>
        <div className="flex items-center gap-5">
          {[
            { label: "year", value: uy },
            { label: "month", value: um },
            { label: "day", value: ud },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <NumberOrb value={value} size="xs" />
              <span className="term term-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
