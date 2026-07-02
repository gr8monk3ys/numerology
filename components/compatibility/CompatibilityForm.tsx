"use client";

import { useState, type FormEvent } from "react";
import {
  lifePathNumber,
  computeCompatibility,
  isMaster,
  type CompatibilityResult,
} from "@/lib/numerology";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";
import { parseBirthDate } from "@/lib/casting";
import { compatibilityProfiles } from "@/lib/content/compat";
import { lifePathTitles } from "@/lib/content/lifepathTitles";
import { pick } from "@/lib/content/core";

interface Person {
  name: string;
  date: string;
}

interface Outcome {
  result: CompatibilityResult;
  aLabel: string;
  bLabel: string;
}

const emptyPerson: Person = { name: "", date: "" };

export function CompatibilityForm() {
  const [a, setA] = useState<Person>(emptyPerson);
  const [b, setB] = useState<Person>(emptyPerson);
  const [error, setError] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  function lifePathOf(p: Person): number | null {
    const birth = parseBirthDate(p.date);
    return birth ? lifePathNumber(birth).value : null;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const aLP = lifePathOf(a);
    const bLP = lifePathOf(b);
    if (aLP === null || bLP === null) {
      setError("Both dates of birth are required for the weighing.");
      return;
    }
    setOutcome({
      result: computeCompatibility(aLP, bLP, compatibilityProfiles),
      aLabel: a.name.trim() || "The first",
      bLabel: b.name.trim() || "The second",
    });
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="glass-strong mx-auto max-w-3xl space-y-6 px-6 py-8 sm:px-10"
      >
        <div className="grid gap-8 sm:grid-cols-2">
          {[
            { p: a, set: setA, title: "The first soul" },
            { p: b, set: setB, title: "The second soul" },
          ].map(({ p, set, title }, i) => (
            <div key={i} className="space-y-3">
              <h3 className="font-display text-xl text-gold-200">{title}</h3>
              <div>
                <label htmlFor={`person-${i}-name`} className="label-text">
                  Name, if you wish
                </label>
                <input
                  id={`person-${i}-name`}
                  type="text"
                  maxLength={80}
                  value={p.name}
                  onChange={(e) => set({ ...p, name: e.target.value })}
                  placeholder="a name to write beside the number"
                  className="input-field"
                  autoComplete="off"
                  aria-label={`${title} — name, if you wish`}
                />
              </div>
              <div>
                <label htmlFor={`person-${i}-date`} className="label-text">
                  Date of birth
                </label>
                <input
                  id={`person-${i}-date`}
                  type="date"
                  value={p.date}
                  min="1900-01-01"
                  max="2099-12-31"
                  onChange={(e) => set({ ...p, date: e.target.value })}
                  className="input-field"
                  aria-label={`${title} — date of birth`}
                />
              </div>
            </div>
          ))}
        </div>

        {error && (
          <p
            role="alert"
            className="border-l-2 border-blood-500 bg-blood-600/10 px-4 py-2.5 text-center text-sm text-rose-200"
          >
            {error}
          </p>
        )}

        <div className="text-center">
          <button type="submit" className="btn-primary">
            Weigh the Concordance
          </button>
        </div>
      </form>

      {outcome && <CompatibilityReport outcome={outcome} />}
    </div>
  );
}

function CompatibilityReport({ outcome }: { outcome: Outcome }) {
  const { result, aLabel, bLabel } = outcome;
  const aProfile = pick(compatibilityProfiles, result.a);
  const bProfile = pick(compatibilityProfiles, result.b);

  return (
    <div className="mt-14 space-y-8">
      <div className="glass-strong relative overflow-hidden px-6 py-10 text-center sm:px-10 sm:py-12">
        <div className="bg-cosmic-radial pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative">
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <NumberOrb value={result.a} size="lg" isMaster={isMaster(result.a)} />
              <p className="term term-ink mt-2 block">{aLabel}</p>
            </div>
            <span className="font-serif text-2xl text-gold-400/70" aria-hidden>
              ❦
            </span>
            <div className="text-center">
              <NumberOrb value={result.b} size="lg" isMaster={isMaster(result.b)} />
              <p className="term term-ink mt-2 block">{bLabel}</p>
            </div>
          </div>

          <div className="rule-ornament mt-8 text-sm">☙</div>

          <h2 className="mt-5 font-display text-3xl text-mystic-50">
            {result.headline}
          </h2>
          <p className="term term-gold mt-2 block">
            a concord of {result.score} parts in the hundred
          </p>

          <div className="mx-auto mt-5 h-1.5 max-w-sm border border-gold-500/30 p-px">
            <div
              className="h-full bg-gold-sheen"
              style={{ width: `${result.score}%` }}
              role="meter"
              aria-valuenow={result.score}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Concord"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {[
          { lp: result.a, label: aLabel, profile: aProfile },
          { lp: result.b, label: bLabel, profile: bProfile },
        ].map(({ lp, label, profile }) => (
          <div key={label} className="glass p-6">
            <div className="flex items-center gap-4">
              <NumberOrb value={lp} size="sm" isMaster={isMaster(lp)} />
              <div>
                <p className="eyebrow">
                  {label} · Life Path {lp}
                </p>
                <h3 className="font-display text-xl text-mystic-50">
                  {lifePathTitles[String(lp)]}
                </h3>
              </div>
            </div>
            {profile?.summary && (
              <p className="mt-3 text-note">
                {profile.summary}
              </p>
            )}
            {profile && (
              <div className="mt-4 space-y-1.5 text-sm">
                <MatchRow label="Happiest with" tone="gold" items={profile.bestMatches} />
                <MatchRow label="At ease with" tone="mystic" items={profile.goodMatches} />
                <MatchRow label="Schooled by" tone="muted" items={profile.challengingMatches} />
              </div>
            )}
            {profile?.advice && (
              <p className="mt-4 text-sm leading-relaxed text-mystic-100/85">
                <span className="text-gold-300">Counsel: </span>
                {profile.advice}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MatchRow({
  label,
  items,
  tone,
}: {
  label: string;
  items?: string[];
  tone: "gold" | "mystic" | "muted";
}) {
  if (!items?.length) return null;
  return (
    <p className="flex items-baseline gap-3">
      <span className="term term-muted w-28 shrink-0">{label}</span>
      <span className="term-row">
        {items.map((n) => (
          <Chip key={n} tone={tone}>
            {n}
          </Chip>
        ))}
      </span>
    </p>
  );
}

