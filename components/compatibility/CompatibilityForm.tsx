"use client";

import { useRef, useState, type FormEvent } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { lifePathNumber, computeCompatibility } from "@/lib/numerology";
import { compatibilityProfiles } from "@/lib/content/compatibility-profiles";
import type { Outcome } from "@/components/compatibility/CompatibilityReport";

// The report (and the meaning datasets it reads) loads on demand, starting as
// soon as the visitor reaches for the form (bundle-dynamic-imports,
// bundle-preload).
const loadReport = () => import("@/components/compatibility/CompatibilityReport");
const CompatibilityReport = dynamic(() => loadReport().then((m) => m.CompatibilityReport));

interface Person {
  name: string;
  date: string;
}

const emptyPerson: Person = { name: "", date: "" };

export function CompatibilityForm() {
  const [a, setA] = useState<Person>(emptyPerson);
  const [b, setB] = useState<Person>(emptyPerson);
  const [error, setError] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const dateRefs = { a: useRef<HTMLInputElement>(null), b: useRef<HTMLInputElement>(null) };

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
      // Focus the first date that is missing, so the error lands on its field.
      (aLP === null ? dateRefs.a : dateRefs.b).current?.focus();
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
        onFocus={() => void loadReport()}
        onPointerEnter={() => void loadReport()}
        className="frame ticks mx-auto max-w-3xl"
      >
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
                  name={`${id}-name`}
                  type="text"
                  value={p.name}
                  onChange={(e) => {
                    const { value } = e.target;
                    set((prev) => ({ ...prev, name: value }));
                  }}
                  placeholder="Name…"
                  className="field"
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor={`${id}-date`} className="field-label">Date of birth</label>
                <input
                  ref={dateRefs[id as "a" | "b"]}
                  id={`${id}-date`}
                  name={`${id}-date`}
                  type="date"
                  value={p.date}
                  aria-invalid={error && !p.date ? true : undefined}
                  aria-describedby={error && !p.date ? "compat-error" : undefined}
                  min="1900-01-01"
                  max="2099-12-31"
                  onChange={(e) => {
                    const { value } = e.target;
                    set((prev) => ({ ...prev, date: value }));
                  }}
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
        {/* Mounted empty so the message is announced when it appears. */}
        <div role="alert">
          {error && (
            <p
              id="compat-error"
              className="border-t border-rubric-400/40 bg-rubric-400/[0.08] px-6 py-3 font-mono text-xs tracking-wider text-rubric-300 sm:px-8"
            >
              ! {error}
            </p>
          )}
        </div>
      </form>

      {outcome && <CompatibilityReport outcome={outcome} />}
    </div>
  );
}
