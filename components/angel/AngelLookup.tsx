"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
  triple: "Triple · amplified, urgent message",
  quadruple: "Quadruple · a powerful, unmistakable sign",
  "repeating-pair": "Repeating pair · a doubled, balanced message",
  mirror: "Mirror hour · alignment and reflection",
  ascending: "Ascending · forward momentum and growth",
  descending: "Descending · release and letting go",
  sequence: "Patterned sequence carrying guidance",
};

const QUICK = ["111", "222", "333", "444", "1111", "1234"];

export function AngelLookup() {
  const [value, setValue] = useState("");
  const [analysis, setAnalysis] = useState<AngelAnalysis | null>(null);
  const [entry, setEntry] = useState<AngelEntry | null>(null);
  const [searched, setSearched] = useState(false);

  function decode(input: string) {
    const a = analyzeAngelNumber(input);
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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    decode(value);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <form onSubmit={handleSubmit} className="frame ticks">
        <div className="flex items-center gap-3 p-3 sm:p-4">
          <span className="hidden pl-2 font-mono text-gold-300 sm:inline" aria-hidden>
            $
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="1111, 444, 12:12 …"
            className="field field-mono border-0 bg-transparent px-1 focus:shadow-none"
            aria-label="Number sequence"
          />
          <button type="submit" className="btn btn-primary shrink-0">
            Decode
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t hairline px-4 py-3">
          <span className="mono-label mr-1">Try</span>
          {QUICK.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => {
                setValue(q);
                decode(q);
              }}
              className="tag transition-colors hover:border-gold-400/50 hover:text-gold-200"
            >
              {q}
            </button>
          ))}
        </div>
      </form>

      {searched && !analysis && (
        <p className="mt-4 font-mono text-xs tracking-wider text-rubric-300">
          ! Enter a number sequence to decode.
        </p>
      )}

      {analysis && (
        <div className="frame mt-6">
          <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
            <NumberOrb value={analysis.input} size="lg" />
            <div className="min-w-0 flex-1">
              <span className="mono-label-accent">Sequence {analysis.input}</span>
              <h3 className="mt-1 text-2xl sm:text-3xl">
                {entry?.title ?? `The message of ${analysis.input}`}
              </h3>
              <p className="mt-1 text-sm text-bone-300">
                Root vibration{" "}
                <Link href={`/numbers/${analysis.root}`} className="link">
                  {analysis.root}
                </Link>
              </p>
            </div>
          </div>

          {analysis.patterns.length > 0 && (
            <div className="flex flex-wrap gap-1.5 border-t hairline px-6 py-4 sm:px-8">
              {analysis.patterns.map((p) => (
                <Chip key={p} tone="gold">{PATTERN_LABELS[p] ?? p}</Chip>
              ))}
            </div>
          )}

          {entry ? (
            <>
              <p className="border-t hairline px-6 py-5 text-[15px] leading-relaxed text-bone-100 sm:px-8">
                {entry.meaning}
              </p>
              <div className="divided rounded-none border-x-0 border-b-0 sm:grid-cols-3">
                <MiniCard label="In love" value={entry.love} />
                <MiniCard label="In career" value={entry.career} />
                <MiniCard label="Spiritual" value={entry.spiritual} />
              </div>
            </>
          ) : (
            <p className="border-t hairline px-6 py-5 text-sm text-bone-300 sm:px-8">
              This exact sequence isn’t in the library yet, but its energy flows
              from the root number{" "}
              <Link href={`/numbers/${analysis.root}`} className="link">
                {analysis.root}
              </Link>
              . Explore that number’s meaning for guidance.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function MiniCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-5">
      <span className="mono-label">{label}</span>
      <p className="mt-2 text-sm text-bone-200">{value}</p>
    </div>
  );
}
