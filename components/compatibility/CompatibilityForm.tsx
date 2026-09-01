"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import {
  lifePathNumber,
  computeCompatibility,
  type CompatibilityResult,
} from "@/lib/numerology";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";
import { SectionRow } from "@/components/ui/SectionHeading";
import { compatibilityProfiles, lifePathMeanings, pick } from "@/lib/content";

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
    if (!p.date) return null;
    const [y, m, d] = p.date.split("-").map(Number);
    if (!y || !m || !d) return null;
    return lifePathNumber({ year: y, month: m, day: d }).value;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const aLP = lifePathOf(a);
    const bLP = lifePathOf(b);
    if (aLP === null || bLP === null) {
      setError("Please enter both birth dates.");
      return;
    }
    setOutcome({
      result: computeCompatibility(aLP, bLP, compatibilityProfiles),
      aLabel: a.name.trim() || "Person A",
      bLabel: b.name.trim() || "Person B",
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="frame ticks mx-auto max-w-3xl">
        <div className="divided rounded-none border-0 border-b sm:grid-cols-2">
          {[
            { p: a, set: setA, title: "First person", id: "a" },
            { p: b, set: setB, title: "Second person", id: "b" },
          ].map(({ p, set, title, id }, i) => (
            <div key={id} className="space-y-5 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-gold-300">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg">{title}</h3>
              </div>
              <div>
                <label htmlFor={`${id}-name`} className="field-label">Name (optional)</label>
                <input
                  id={`${id}-name`}
                  type="text"
                  value={p.name}
                  onChange={(e) => set({ ...p, name: e.target.value })}
                  placeholder="Name"
                  className="field"
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor={`${id}-date`} className="field-label">Date of birth</label>
                <input
                  id={`${id}-date`}
                  type="date"
                  value={p.date}
                  min="1900-01-01"
                  max="2099-12-31"
                  onChange={(e) => set({ ...p, date: e.target.value })}
                  className="field field-mono"
                  autoComplete="bday"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="font-mono text-[11px] tracking-wider text-bone-500">
            LIFE PATHS COMPARED · 0–100 HARMONY
          </p>
          <button type="submit" className="btn btn-primary">
            Reveal compatibility
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        {error && (
          <p className="border-t border-rubric-400/40 bg-rubric-400/[0.08] px-6 py-3 font-mono text-xs tracking-wider text-rubric-300 sm:px-8">
            ! {error}
          </p>
        )}
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
    <div className="mt-16 space-y-10">
      <div className="frame-raised ticks p-6 sm:p-10">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <NumberOrb value={result.a} size="lg" isMaster={isMaster(result.a)} />
              <p className="mono-label mt-2 max-w-20 truncate">{aLabel}</p>
            </div>
            <span className="font-mono text-bone-500">×</span>
            <div className="text-center">
              <NumberOrb value={result.b} size="lg" isMaster={isMaster(result.b)} />
              <p className="mono-label mt-2 max-w-20 truncate">{bLabel}</p>
            </div>
          </div>

          <div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="mono-label-accent">Harmony</span>
                <h2 className="mt-1 text-3xl sm:text-4xl">{result.headline}</h2>
              </div>
              <span className="font-mono text-4xl text-gold-200 tabular sm:text-5xl">
                {result.score}
                <span className="text-xl text-bone-500">%</span>
              </span>
            </div>
            <div className="meter mt-5">
              <span style={{ width: `${result.score}%` }} />
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] tracking-wider text-bone-500">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-6">
        <SectionRow index="01" title="Each life path" />
        <div className="divided md:grid-cols-2">
          {[
            { lp: result.a, label: aLabel, profile: aProfile },
            { lp: result.b, label: bLabel, profile: bProfile },
          ].map(({ lp, label, profile }, i) => (
            <div key={`${label}-${i}`} className="p-6">
              <div className="flex items-center gap-4">
                <NumberOrb value={lp} size="sm" isMaster={isMaster(lp)} />
                <div className="min-w-0">
                  <span className="mono-label block truncate">{label} · Life Path {lp}</span>
                  <h3 className="text-lg">{pick(lifePathMeanings, lp)?.title}</h3>
                </div>
              </div>
              {profile?.summary && <p className="mt-4 text-sm text-bone-300">{profile.summary}</p>}
              {profile && (
                <div className="mt-5 space-y-2.5">
                  <MatchRow label="Best" tone="gold" items={profile.bestMatches} />
                  <MatchRow label="Good" tone="mystic" items={profile.goodMatches} />
                  <MatchRow label="Growth" tone="muted" items={profile.challengingMatches} />
                </div>
              )}
              {profile?.advice && (
                <p className="mt-5 border-t hairline pt-4 text-sm text-bone-100">
                  <span className="text-gold-200">Advice · </span>
                  {profile.advice}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
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
    <div className="flex items-center gap-3">
      <span className="mono-label w-14 shrink-0">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {items.map((n) => (
          <Chip key={n} tone={tone}>{n}</Chip>
        ))}
      </div>
    </div>
  );
}

function isMaster(n: number) {
  return n === 11 || n === 22 || n === 33;
}
