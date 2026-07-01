"use client";

import { useState, type FormEvent } from "react";
import { HeartHandshake } from "lucide-react";
import {
  lifePathNumber,
  computeCompatibility,
  type CompatibilityResult,
} from "@/lib/numerology";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";
import {
  compatibilityProfiles,
  lifePathMeanings,
  pick,
} from "@/lib/content";

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
      <form
        onSubmit={handleSubmit}
        className="glass-strong mx-auto max-w-3xl space-y-6 p-6 sm:p-8"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { p: a, set: setA, title: "First person" },
            { p: b, set: setB, title: "Second person" },
          ].map(({ p, set, title }, i) => (
            <div key={i} className="space-y-3">
              <h3 className="font-display text-lg text-gold-200">{title}</h3>
              <div>
                <label className="label-text">Name (optional)</label>
                <input
                  type="text"
                  value={p.name}
                  onChange={(e) => set({ ...p, name: e.target.value })}
                  placeholder="Name"
                  className="input-field"
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="label-text">Date of birth</label>
                <input
                  type="date"
                  value={p.date}
                  min="1900-01-01"
                  max="2099-12-31"
                  onChange={(e) => set({ ...p, date: e.target.value })}
                  className="input-field [color-scheme:dark]"
                />
              </div>
            </div>
          ))}
        </div>

        {error && (
          <p className="text-center text-sm text-rose-300">{error}</p>
        )}

        <div className="text-center">
          <button type="submit" className="btn-primary">
            <HeartHandshake className="h-4 w-4" />
            Reveal compatibility
          </button>
        </div>
      </form>

      {outcome && (
        <CompatibilityReport outcome={outcome} />
      )}
    </div>
  );
}

function CompatibilityReport({ outcome }: { outcome: Outcome }) {
  const { result, aLabel, bLabel } = outcome;
  const aProfile = pick(compatibilityProfiles, result.a);
  const bProfile = pick(compatibilityProfiles, result.b);

  return (
    <div className="mt-12 space-y-8">
      <div className="glass-strong relative overflow-hidden p-8 text-center sm:p-10">
        <div className="bg-cosmic-radial pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative">
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <NumberOrb value={result.a} size="lg" isMaster={isMaster(result.a)} />
              <p className="mt-2 text-sm text-mystic-200/70">{aLabel}</p>
            </div>
            <span className="font-display text-2xl text-gold-300">✦</span>
            <div className="text-center">
              <NumberOrb value={result.b} size="lg" isMaster={isMaster(result.b)} />
              <p className="mt-2 text-sm text-mystic-200/70">{bLabel}</p>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-md">
            <div className="flex items-center justify-between text-sm">
              <span className="text-mystic-200/70">Harmony</span>
              <span className="font-display text-gold-200">{result.score}%</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-void-900">
              <div
                className="h-full rounded-full bg-gold-sheen transition-all"
                style={{ width: `${result.score}%` }}
              />
            </div>
            <p className="mt-4 font-display text-xl text-mystic-50">
              {result.headline}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {[
          { lp: result.a, label: aLabel, profile: aProfile },
          { lp: result.b, label: bLabel, profile: bProfile },
        ].map(({ lp, label, profile }) => (
          <div key={label} className="glass p-6">
            <div className="flex items-center gap-3">
              <NumberOrb value={lp} size="sm" isMaster={isMaster(lp)} />
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-300/80">
                  {label} · Life Path {lp}
                </span>
                <h3 className="font-display text-lg text-mystic-50">
                  {pick(lifePathMeanings, lp)?.title}
                </h3>
              </div>
            </div>
            {profile?.summary && (
              <p className="mt-3 text-sm text-mystic-200/75">{profile.summary}</p>
            )}
            {profile && (
              <div className="mt-4 space-y-2 text-sm">
                <MatchRow label="Best" tone="gold" items={profile.bestMatches} />
                <MatchRow label="Good" tone="mystic" items={profile.goodMatches} />
                <MatchRow label="Growth" tone="muted" items={profile.challengingMatches} />
              </div>
            )}
            {profile?.advice && (
              <p className="mt-4 text-sm text-mystic-100/80">
                <span className="text-gold-300">Advice: </span>
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
    <div className="flex items-center gap-2">
      <span className="w-16 shrink-0 text-xs uppercase tracking-widest text-mystic-300/60">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {items.map((n) => (
          <Chip key={n} tone={tone}>
            {n}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function isMaster(n: number) {
  return n === 11 || n === 22 || n === 33;
}
