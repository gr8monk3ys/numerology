"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import {
  analyzeAngelNumber,
  findAngelEntry,
  type AngelAnalysis,
  type AngelEntry,
} from "@/lib/numerology";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";
import { angelNumbers } from "@/lib/content";

const PATTERN_LABELS: Record<string, string> = {
  triple: "Triple sequence — amplified, urgent message",
  quadruple: "Quadruple sequence — a powerful, unmistakable sign",
  "repeating-pair": "Repeating pair — a doubled, balanced message",
  mirror: "Mirror hour — a portal of alignment and reflection",
  ascending: "Ascending sequence — forward momentum and growth",
  descending: "Descending sequence — release and letting go",
  sequence: "A patterned sequence carrying guidance",
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
      <form onSubmit={handleSubmit} className="glass-strong flex gap-3 p-4">
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="See a repeating number? e.g. 1111, 444, 12:12"
          className="input-field"
        />
        <button type="submit" className="btn-primary shrink-0">
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Decode</span>
        </button>
      </form>

      {searched && !analysis && (
        <p className="mt-4 text-center text-sm text-rose-300">
          Enter a number sequence to decode.
        </p>
      )}

      {analysis && (
        <div className="glass mt-6 p-6 sm:p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <NumberOrb value={analysis.input} size="lg" />
            <div>
              <h3 className="font-display text-2xl text-mystic-50">
                {entry?.title ?? `The message of ${analysis.input}`}
              </h3>
              <p className="mt-1 text-sm text-mystic-200/60">
                Root vibration{" "}
                <Link
                  href={`/numbers/${analysis.root}`}
                  className="text-gold-200 link-underline"
                >
                  {analysis.root}
                </Link>
              </p>
            </div>
          </div>

          {analysis.patterns.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {analysis.patterns.map((p) => (
                <Chip key={p} tone="gold">
                  {PATTERN_LABELS[p] ?? p}
                </Chip>
              ))}
            </div>
          )}

          {entry ? (
            <div className="mt-6 space-y-4">
              <p className="text-sm leading-relaxed text-mystic-100/90">
                {entry.meaning}
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                <MiniCard label="In Love" value={entry.love} />
                <MiniCard label="In Career" value={entry.career} />
                <MiniCard label="Spiritual" value={entry.spiritual} />
              </div>
            </div>
          ) : (
            <p className="mt-6 text-center text-sm text-mystic-200/70">
              This exact sequence isn't in our library yet, but its energy flows
              from the root number{" "}
              <Link href={`/numbers/${analysis.root}`} className="text-gold-200">
                {analysis.root}
              </Link>
              . Explore that number's meaning for guidance.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function MiniCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-void-900/40 p-4">
      <span className="text-xs font-semibold uppercase tracking-widest text-gold-300/70">
        {label}
      </span>
      <p className="mt-1 text-sm text-mystic-200/80">{value}</p>
    </div>
  );
}
