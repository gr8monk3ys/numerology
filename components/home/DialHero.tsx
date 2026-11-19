"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Reading } from "@/lib/numerology";
import {
  castReading,
  carryReadingInput,
  MAX_BIRTH_YEAR,
  MIN_BIRTH_YEAR,
  type ReadingField,
} from "@/lib/reading-input";
import { Dial, coreRings } from "@/components/ui/Dial";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";

/**
 * The home page's first viewport: the dial, the form that sets it, and the
 * plate of six numbers whose rows swing the hand.
 */
export function DialHero({ sample, sampleCaption }: { sample: Reading; sampleCaption: string }) {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  // The visitor's own reading, with the inputs it was cast from.
  const [own, setOwn] = useState<{ reading: Reading; fullName: string; birthDate: string } | null>(null);
  const [active, setActive] = useState(0);
  const [error, setError] = useState<{ field: ReadingField; message: string } | null>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);

  const numbers = coreRings(own?.reading ?? sample);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = castReading(fullName, birthDate);
    if (!result.ok) {
      setError({ field: result.field, message: result.message });
      (result.field === "fullName" ? fullNameRef : birthDateRef).current?.focus();
      return;
    }
    setError(null);
    setOwn({ reading: result.reading, fullName, birthDate });
    setActive(0);
  }

  const errorFor = (field: ReadingField) => (error?.field === field ? error.message : null);

  return (
    <section className="overflow-x-clip">
      <div className="grid lg:grid-cols-[46vw_minmax(0,1fr)]">
        <div className="px-5 pt-10 sm:px-8 lg:col-start-2 lg:pt-10 lg:pr-[max(2rem,calc((100vw-72rem)/2+2rem))] lg:pl-12">
          <h1 className="text-[clamp(2.75rem,5.4vw,5rem)]">The hours written in your name</h1>
          <p className="mt-5 max-w-md text-lg text-bone-200">
            Give a name and a day of birth. The dial turns to your numbers and
            shows every sum it took to reach them.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-6 max-w-md space-y-4">
            <div>
              <label htmlFor="dial-name" className="field-label">Full name at birth</label>
              <input
                ref={fullNameRef}
                id="dial-name"
                name="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ada Augusta Byron…"
                className="field"
                autoComplete="off"
                aria-invalid={errorFor("fullName") ? true : undefined}
                aria-describedby={errorFor("fullName") ? "dial-name-error" : undefined}
              />
              {errorFor("fullName") && <p id="dial-name-error" className="field-error">{errorFor("fullName")}</p>}
            </div>
            <div>
              <label htmlFor="dial-birth" className="field-label">Date of birth</label>
              <input
                ref={birthDateRef}
                id="dial-birth"
                name="birthDate"
                type="date"
                value={birthDate}
                min={`${MIN_BIRTH_YEAR}-01-01`}
                max={`${MAX_BIRTH_YEAR}-12-31`}
                onChange={(e) => setBirthDate(e.target.value)}
                className="field tabular"
                autoComplete="bday"
                aria-invalid={errorFor("birthDate") ? true : undefined}
                aria-describedby={errorFor("birthDate") ? "dial-birth-error" : undefined}
              />
              {errorFor("birthDate") && <p id="dial-birth-error" className="field-error">{errorFor("birthDate")}</p>}
            </div>
            <button type="submit" className="btn btn-primary w-full">
              {own ? "Set the dial again" : "Set the dial"}
            </button>
            <p className="field-hint">
              Worked out on your device. Your name and birth date are never sent.
            </p>
            <p role="alert" className="sr-only">{error?.message ?? ""}</p>
          </form>
        </div>

        {/* The dial stays in view while the plate scrolls under it, at every width. */}
        <div className="dial-pin top-16 z-10 flex justify-center self-start border-b hairline bg-ink-950 px-5 py-3 sm:px-8 lg:top-[4.5rem] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:justify-end lg:border-0 lg:bg-transparent lg:py-0 lg:pt-6 lg:pr-0 lg:pl-4">
          <Dial
            numbers={numbers}
            active={active}
            className="w-[min(100%,40svh)] lg:w-[min(100%,calc(100svh-6rem))]"
          />
        </div>

        {/* The plate: one row per ring. Pressing a row swings the hand to it. */}
        <div className="px-5 pt-6 pb-4 sm:px-8 lg:col-start-2 lg:pr-[max(2rem,calc((100vw-72rem)/2+2rem))] lg:pl-12">
          <h2 className="text-3xl sm:text-4xl">{own ? "Your six numbers" : "Six numbers, six rings"}</h2>
          <p className="mt-2 text-bone-300" aria-live="polite">
            {own ? `The dial is set to ${own.reading.name.all.join(" ")}.` : sampleCaption}
          </p>
          <div className="mt-5 border-t hairline-strong">
            {numbers.map((n, i) => (
              <button
                key={n.label}
                type="button"
                className="plate-row"
                aria-pressed={i === active}
                onClick={() => setActive(i)}
              >
                <NumberOrb
                  value={n.insight.value}
                  size="sm"
                  isMaster={n.insight.isMaster}
                  isKarmic={n.insight.karmicDebt !== null}
                />
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-lg font-semibold text-bone-50">{n.label}</span>
                    {n.insight.isMaster && <Chip tone="rubric">Master</Chip>}
                    {n.insight.karmicDebt && <Chip tone="rubric">Karmic {n.insight.karmicDebt}</Chip>}
                  </span>
                  {/* The pressed row writes its working out, one sum to a line. */}
                  {i === active &&
                    n.working.split("; ").map((line) => (
                      <span key={line} className="plate-working">{line}</span>
                    ))}
                  <span className="block text-base text-bone-300">{n.source}</span>
                </span>
                {i !== active && (
                  <span className="plate-chain font-figures text-lg text-gold-200">{n.insight.steps.join(" → ")}</span>
                )}
              </button>
            ))}
          </div>
          <Link
            href="/reading"
            className="btn btn-secondary mt-6"
            onClick={() => own && carryReadingInput({ fullName: own.fullName, birthDate: own.birthDate })}
          >
            {own ? "Open your full reading" : "Cast a full reading"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
