"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  analyzeAngelNumber,
  findAngelEntry,
  type AngelAnalysis,
  type AngelEntry,
} from "@/lib/numerology";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { angelNumbers } from "@/lib/content/angel";

const PATTERN_LABELS: Record<string, string> = {
  triple: "a triple — the message amplified and urgent",
  quadruple: "a quadruple — a sign not to be mistaken",
  "repeating-pair": "a doubled pair — a balanced, twofold message",
  mirror: "a mirror — a portal of alignment and reflection",
  ascending: "an ascending stair — momentum and growth",
  descending: "a descending stair — release and letting go",
  sequence: "a patterned sequence bearing guidance",
};

export function AngelLookup() {
  const [value, setValue] = useState("");
  const [analysis, setAnalysis] = useState<AngelAnalysis | null>(null);
  const [entry, setEntry] = useState<AngelEntry | null>(null);
  const [searched, setSearched] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const a = analyzeAngelNumber(value);
    if (!a.digits.length) {
      setAnalysis(null);
      setEntry(null);
      setSearched(true);
      return;
    }
    setAnalysis(a);
    setEntry(findAngelEntry(a.input, angelNumbers) ?? null);
    setSearched(true);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <form
        onSubmit={handleSubmit}
        className="glass-strong flex gap-3 p-4 sm:p-5"
      >
        <label htmlFor="angel-number" className="sr-only">
          The number that keeps appearing, for example 1111 or 12:12
        </label>
        <input
          id="angel-number"
          type="text"
          inputMode="numeric"
          maxLength={16}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="the number that keeps appearing — 1111, 444, 12:12"
          className="input-field"
          aria-invalid={searched && !analysis}
          aria-describedby={searched && !analysis ? "angel-error" : undefined}
        />
        <button type="submit" className="btn-primary shrink-0">
          Consult
        </button>
      </form>

      {searched && !analysis && (
        <p id="angel-error" role="alert" className="mt-4 text-center text-sm text-rose-200">
          Write a number sequence to consult the index.
        </p>
      )}

      {analysis && (
        <div className="glass mt-8 p-6 sm:p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <NumberOrb value={analysis.input} size="lg" />
            <div>
              <h3 className="font-display text-3xl text-mystic-50">
                {entry?.title ?? `The sign of ${analysis.input}`}
              </h3>
              <p className="mt-1 text-sm text-mystic-300/75">
                its root vibration is{" "}
                <Link
                  href={`/numbers/${analysis.root}`}
                  className="action-quiet no-underline"
                >
                  the number {analysis.root}
                </Link>
              </p>
            </div>
          </div>

          {analysis.patterns.length > 0 && (
            <p className="mt-4 text-center text-sm italic text-gold-200/85">
              {analysis.patterns
                .map((p) => PATTERN_LABELS[p] ?? p)
                .join("; ")}
            </p>
          )}

          {entry ? (
            <div className="mt-6 space-y-4">
              <p className="text-sm leading-relaxed text-mystic-100/90">
                {entry.meaning}
              </p>
              <div className="grid gap-3 border-t border-gold-500/20 pt-4 sm:grid-cols-3">
                <MiniCol label="In love" value={entry.love} />
                <MiniCol label="In work" value={entry.career} />
                <MiniCol label="In spirit" value={entry.spiritual} />
              </div>
            </div>
          ) : (
            <p className="mt-6 text-center text-note">
              This sequence is not yet written in our index, but its power
              flows from the root number{" "}
              <Link
                href={`/numbers/${analysis.root}`}
                className="action-quiet no-underline"
              >
                {analysis.root}
              </Link>
              — consult that entry for its counsel.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function MiniCol({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-mystic-200/80">{value}</p>
    </div>
  );
}
