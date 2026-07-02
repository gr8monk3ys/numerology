"use client";

import { useEffect, useState, type FormEvent } from "react";
import dynamic from "next/dynamic";
import { buildReading, type Reading } from "@/lib/numerology";
import {
  NAME_MAX,
  NAME_CHARSET,
  isUsableName,
  parseBirthDate,
  decodeCastingParams,
  type Casting,
} from "@/lib/casting";

// The results carry nearly every meaning dataset; load them only when a
// reading is actually cast so the empty form is interactive immediately.
const ReadingResults = dynamic(
  () =>
    import("@/components/reading/ReadingResults").then(
      (m) => m.ReadingResults,
    ),
  {
    loading: () => (
      <p className="mt-14 text-center italic text-mystic-300/80">
        The folio is being prepared…
      </p>
    ),
  },
);

const LEDGER_KEY = "numen.castings";
const LEDGER_MAX = 5;

function castReading(
  fullName: string,
  birthDate: string,
  yAsVowel: boolean,
): Reading | null {
  const cleanName = fullName.trim().slice(0, NAME_MAX);
  if (!isUsableName(cleanName)) return null;
  const birth = parseBirthDate(birthDate);
  if (!birth) return null;
  const now = new Date();
  return buildReading({
    fullName: cleanName,
    birth,
    yAsVowel,
    today: {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
    },
  });
}

/** A current name only matters if it is usable and differs from the birth name. */
function usableCurrentName(current: string, birthName: string): string | undefined {
  const clean = current.trim().slice(0, NAME_MAX);
  if (!isUsableName(clean)) return undefined;
  if (clean.toLowerCase() === birthName.trim().toLowerCase()) return undefined;
  return clean;
}

function readLedger(): Casting[] {
  try {
    const raw = window.localStorage.getItem(LEDGER_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (c): c is Casting =>
          !!c && typeof c.name === "string" && typeof c.dob === "string",
      )
      .slice(0, LEDGER_MAX);
  } catch {
    return [];
  }
}

function writeLedger(entries: Casting[]) {
  try {
    window.localStorage.setItem(LEDGER_KEY, JSON.stringify(entries));
  } catch {
    /* private mode or full storage — the ledger is a convenience, not a need */
  }
}

export function ReadingForm() {
  const [fullName, setFullName] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [yAsVowel, setYAsVowel] = useState(false);
  const [reading, setReading] = useState<Reading | null>(null);
  const [shownCurrentName, setShownCurrentName] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [ledger, setLedger] = useState<Casting[]>([]);

  // A shared link carries the reading in its query string; cast it on arrival.
  useEffect(() => {
    setLedger(readLedger());

    const shared = decodeCastingParams(window.location.search);
    if (!shared) return;
    const result = castReading(shared.name, shared.dob, !!shared.y);
    if (result) {
      setFullName(shared.name);
      setBirthDate(shared.dob);
      setYAsVowel(!!shared.y);
      setCurrentName(shared.now ?? "");
      setShownCurrentName(usableCurrentName(shared.now ?? "", shared.name));
      setReading(result);
    }
  }, []);

  function recordCasting(entry: Casting) {
    setLedger((prev) => {
      const next = [
        entry,
        ...prev.filter((c) => !(c.name === entry.name && c.dob === entry.dob)),
      ].slice(0, LEDGER_MAX);
      writeLedger(next);
      return next;
    });
  }

  function cast(name: string, dob: string, y: boolean, now?: string) {
    const result = castReading(name, dob, y);
    if (!result) {
      setError("The casting could not be made from what was given.");
      return;
    }
    const usableNow = now ? usableCurrentName(now, name) : undefined;
    setReading(result);
    setShownCurrentName(usableNow);
    recordCasting({ name: result.fullName, dob, y: y || undefined, now: usableNow });

    requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      document.getElementById("reading-results")?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (fullName.trim().replace(/[^a-zA-Z]/g, "").length < 2) {
      setError("Enter the full name as it was given at birth.");
      return;
    }
    if (!NAME_CHARSET.test(fullName.trim())) {
      setError(
        "The name may hold only letters, spaces, apostrophes, periods and hyphens.",
      );
      return;
    }
    if (!birthDate) {
      setError("Enter the date of birth.");
      return;
    }
    cast(fullName, birthDate, yAsVowel, currentName);
  }

  function recall(c: Casting) {
    setError(null);
    setFullName(c.name);
    setBirthDate(c.dob);
    setYAsVowel(!!c.y);
    setCurrentName(c.now ?? "");
    cast(c.name, c.dob, !!c.y, c.now);
  }

  function strikeLedger() {
    writeLedger([]);
    setLedger([]);
  }

  function reset() {
    setReading(null);
    setShownCurrentName(undefined);
    setError(null);
    if (window.location.search) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="glass-strong no-print mx-auto max-w-2xl space-y-5 px-6 py-8 sm:px-10"
      >
        <div>
          <label htmlFor="fullName" className="label-text">
            The name given at birth
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            maxLength={NAME_MAX}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="as it was first written, e.g. Ada Augusta Byron"
            className="input-field"
            autoComplete="off"
            aria-invalid={!!error}
            aria-describedby={error ? "reading-error" : undefined}
          />
        </div>

        <div>
          <label htmlFor="birthDate" className="label-text">
            The date of birth
          </label>
          <input
            id="birthDate"
            type="date"
            value={birthDate}
            min="1900-01-01"
            max="2099-12-31"
            onChange={(e) => setBirthDate(e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="currentName" className="label-text">
            The name you now bear, if it differs
          </label>
          <input
            id="currentName"
            type="text"
            value={currentName}
            maxLength={NAME_MAX}
            onChange={(e) => setCurrentName(e.target.value)}
            placeholder="a married, chosen or pen name — leave empty otherwise"
            className="input-field"
            autoComplete="off"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-3 text-sm text-mystic-200/80">
          <input
            type="checkbox"
            checked={yAsVowel}
            onChange={(e) => setYAsVowel(e.target.checked)}
            className="h-4 w-4 accent-gold-500"
          />
          Count &ldquo;Y&rdquo; among the vowels (alters the Soul Urge and
          Personality)
        </label>

        {error && (
          <p
            id="reading-error"
            role="alert"
            className="border-l-2 border-blood-500 bg-blood-600/10 px-4 py-2.5 text-sm text-rose-200"
          >
            {error}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-5">
          <button type="submit" className="btn-primary">
            {reading ? "Cast it anew" : "Cast the Reading"}
          </button>
          {reading && (
            <button type="button" onClick={reset} className="action-quiet">
              clear the page
            </button>
          )}
        </div>

        {ledger.length > 0 && (
          <div className="border-t border-gold-500/15 pt-4">
            <p className="term term-muted">The ledger of castings</p>
            <ul className="mt-2 space-y-1.5">
              {ledger.map((c) => (
                <li key={`${c.name}|${c.dob}`}>
                  <button
                    type="button"
                    onClick={() => recall(c)}
                    className="action-quiet"
                  >
                    {c.name} · {c.dob}
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={strikeLedger}
              className="mt-3 text-xs italic text-mystic-300/85 hover:text-mystic-300"
            >
              strike the ledger clean
            </button>
            <p className="mt-1 text-xs italic text-mystic-300/80">
              kept only in this browser; never sent anywhere
            </p>
          </div>
        )}
      </form>

      <div id="reading-results">
        {reading && (
          <ReadingResults reading={reading} currentName={shownCurrentName} />
        )}
      </div>
    </div>
  );
}
