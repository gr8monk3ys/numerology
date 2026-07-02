"use client";

import { memo, useState } from "react";
import { loShuGrid, type Reading } from "@/lib/numerology";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";
import { NumberCard } from "@/components/reading/NumberCard";
import { Chapter } from "@/components/reading/Chapter";
import { chapterNumeral } from "@/components/reading/chapters";
import { LoShuGrid } from "@/components/reading/LoShuGrid";
import { NameNowBorne } from "@/components/reading/NameNowBorne";
import { CosmicProfile } from "@/components/reading/CosmicProfile";
import { CorrGrid } from "@/components/ui/CorrGrid";
import {
  PersonalCyclesRow,
  PersonalYearCard,
  PeriodList,
} from "@/components/cycles/AlmanacPanels";
import { encodeCastingParams, ageOn } from "@/lib/casting";
import {
  lifePathMeanings,
  expressionMeanings,
  soulUrgeMeanings,
  personalityMeanings,
  birthdayMeanings,
  personalYearMeanings,
  correspondences,
  karmicDebtMeanings,
  pick,
} from "@/lib/content";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

/** Quiet actions: copy a shareable link, print the folio. */
function FolioActions({
  reading,
  currentName,
}: {
  reading: Reading;
  currentName?: string;
}) {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    const { birth } = reading;
    const dob = `${birth.year}-${String(birth.month).padStart(2, "0")}-${String(birth.day).padStart(2, "0")}`;
    const query = encodeCastingParams({
      name: reading.fullName,
      dob,
      y: reading.yAsVowel || undefined,
      now: currentName,
    });
    const url = `${window.location.origin}/reading?${query}`;
    navigator.clipboard?.writeText(url).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2500);
      },
      () => setCopied(false),
    );
  }

  return (
    <p className="no-print term-row justify-center text-sm">
      <button
        type="button"
        onClick={copyLink}
        className="action-quiet"
        aria-live="polite"
      >
        {copied ? "the link is copied" : "copy a link to this reading"}
      </button>
      <button type="button" onClick={() => window.print()} className="action-quiet">
        print this folio
      </button>
    </p>
  );
}

// Memoized: the folio lives beside a controlled form, and its props are
// referentially stable between keystrokes — no reason to re-render it.
export const ReadingResults = memo(function ReadingResults({
  reading,
  currentName,
}: {
  reading: Reading;
  /** The name in daily use, when it differs from the birth name. */
  currentName?: string;
}) {
  const { core, advanced, forecast, chaldean, name, birth } = reading;
  const lifePathMeaning = pick(lifePathMeanings, core.lifePath.value);
  const corr = pick(correspondences, core.lifePath.value);
  const py = pick(personalYearMeanings, forecast.personal.year.value);
  const bday = pick(birthdayMeanings, birth.day);
  const loShu = loShuGrid(birth);
  const now = new Date();
  const age = ageOn(birth, {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  });

  return (
    <div className="mt-14 space-y-20">
      {/* Incipit */}
      <div className="glass-strong relative overflow-hidden px-6 py-10 text-center sm:px-12 sm:py-14">
        <div className="bg-cosmic-radial pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative flex flex-col items-center gap-6">
          <p className="eyebrow">Here beginneth the reading of</p>
          <h2 className="font-display text-4xl text-mystic-50 sm:text-5xl">
            {name.all.join(" ")}
          </h2>
          <p className="font-serif italic text-mystic-200/80">
            born the {birth.day}
            {ordinal(birth.day)} day of {MONTHS[birth.month - 1]},{" "}
            {birth.year}
          </p>

          <div className="animate-flicker">
            <NumberOrb
              value={core.lifePath.value}
              size="xl"
              isMaster={core.lifePath.isMaster}
              isKarmic={core.lifePath.karmicDebt !== null}
            />
          </div>

          <div>
            <p className="term term-gold">
              Life Path {core.lifePath.value}
              {core.lifePath.karmicDebt
                ? ` · bearing the karmic debt ${core.lifePath.karmicDebt}`
                : ""}
            </p>
            <h3 className="mt-1 font-display text-3xl text-mystic-50">
              {lifePathMeaning?.title ?? `Life Path ${core.lifePath.value}`}
            </h3>
          </div>

          {lifePathMeaning?.summary && (
            <p className="max-w-2xl leading-relaxed text-mystic-100/85">
              {lifePathMeaning.summary}
            </p>
          )}
          {lifePathMeaning?.keywords && (
            <div className="term-row justify-center">
              {lifePathMeaning.keywords.map((k) => (
                <Chip key={k} tone="gold">
                  {k}
                </Chip>
              ))}
            </div>
          )}

          <FolioActions reading={reading} currentName={currentName} />
        </div>
      </div>

      {/* I — The Core Numbers */}
      <Chapter numeral={chapterNumeral("core")} glyph="☉" title="The Core Numbers">
        <div className="grid gap-4 lg:grid-cols-2">
          <NumberCard label="Life Path" insight={core.lifePath} meaning={lifePathMeaning} defaultOpen />
          <NumberCard label="Expression, or Destiny" insight={core.expression} meaning={pick(expressionMeanings, core.expression.value)} />
          <NumberCard label="Soul Urge" insight={core.soulUrge} meaning={pick(soulUrgeMeanings, core.soulUrge.value)} />
          <NumberCard label="Personality" insight={core.personality} meaning={pick(personalityMeanings, core.personality.value)} />
          <NumberCard label="Birthday" insight={core.birthday} blurb={bday?.title} />
          <NumberCard label="Maturity" insight={core.maturity} meaning={pick(lifePathMeanings, core.maturity.value)} blurb="Who you become" />
          <NumberCard label="Balance" insight={core.balance} blurb="How you steady yourself" />
        </div>
        {bday && (
          <div className="glass p-6">
            <p className="eyebrow">
              Born on the {birth.day}
              {ordinal(birth.day)}
            </p>
            <h3 className="mt-1 font-display text-xl text-mystic-50">
              {bday.title}
            </h3>
            <p className="mt-2 text-note">
              {bday.summary}
            </p>
            <div className="term-row mt-3">
              {bday.traits.map((t) => (
                <Chip key={t} tone="muted">
                  {t}
                </Chip>
              ))}
            </div>
          </div>
        )}
      </Chapter>

      {/* II — The Karmic Record */}
      <Chapter numeral={chapterNumeral("karmic")} glyph="♄" title="The Karmic Record">
        {advanced.karmicDebts.length > 0 ? (
          <div className="grid gap-4">
            {advanced.karmicDebts.map((hit) => {
              const km = pick(karmicDebtMeanings, hit.debt);
              return (
                <div key={hit.source + hit.debt} className="glass p-6">
                  <div className="flex items-center gap-4">
                    <NumberOrb value={hit.debt} size="sm" isKarmic />
                    <div>
                      <p className="eyebrow">
                        {hit.source} · Debt of {hit.debt}
                      </p>
                      <h3 className="font-display text-xl text-mystic-50">
                        {km?.title ?? `Karmic Debt ${hit.debt}`}
                      </h3>
                    </div>
                  </div>
                  {km?.summary && (
                    <p className="mt-3 text-note">
                      {km.summary}
                    </p>
                  )}
                  {km?.lesson && (
                    <p className="mt-2 text-sm leading-relaxed text-mystic-100/85">
                      <span className="text-gold-300">The lesson: </span>
                      {km.lesson}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="glass p-6 text-note">
            No karmic debt — neither 13, 14, 16 nor 19 — appears in your core
            chart. The ledger you carry into this life is a light one.
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="glass p-5">
            <p className="eyebrow">Karmic Lessons</p>
            <p className="mt-2 text-note">
              Numbers absent from your name; energies to be learned deliberately.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {advanced.karmicLessons.length ? (
                advanced.karmicLessons.map((n) => (
                  <NumberOrb key={n} value={n} size="xs" />
                ))
              ) : (
                <span className="term term-gold">none — every number is present</span>
              )}
            </div>
          </div>
          <div className="glass p-5">
            <p className="eyebrow">Hidden Passion</p>
            <p className="mt-2 text-note">
              The number most often written in your name; an instinctive talent.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {advanced.hiddenPassion.map((n) => (
                <NumberOrb key={n} value={n} size="xs" />
              ))}
            </div>
          </div>
          <div className="glass p-5">
            <p className="eyebrow">Subconscious Self</p>
            <p className="mt-2 text-note">
              The composure with which you meet sudden circumstance.
            </p>
            <div className="mt-3">
              <NumberOrb value={advanced.subconsciousSelf} size="xs" />
            </div>
          </div>
        </div>
      </Chapter>

      {/* III — The Letters of the Name */}
      <Chapter numeral={chapterNumeral("letters")} glyph="☿" title="The Letters of the Name">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <LetterStat label="Cornerstone" trait={advanced.cornerstone} note="How you set to work" />
          <LetterStat label="Capstone" trait={advanced.capstone} note="How you bring things to an end" />
          <LetterStat label="First Vowel" trait={advanced.firstVowel} note="The first stirring of the inner self" />
          <div className="glass p-5">
            <p className="eyebrow">Rational Thought</p>
            <div className="mt-3 flex items-center gap-3">
              <NumberOrb
                value={advanced.rationalThought.value}
                size="sm"
                isMaster={advanced.rationalThought.isMaster}
              />
              <p className="text-note">
                The cast of your reasoning.
              </p>
            </div>
          </div>
        </div>
      </Chapter>

      {/* IV — The Chaldean Reckoning */}
      <Chapter numeral={chapterNumeral("chaldean")} glyph="✶" title="The Chaldean Reckoning">
        <div className="glass flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:text-left">
          <NumberOrb value={chaldean.root} size="lg" />
          <div>
            <p className="leading-relaxed text-mystic-100/85">
              By the elder reckoning of Chaldea, the name{" "}
              <span className="italic text-gold-200">{name.all.join(" ")}</span>{" "}
              sums to the compound number{" "}
              <span className="font-display text-gold-200">
                {chaldean.compound}
              </span>
              , which roots into{" "}
              <span className="font-display text-gold-200">{chaldean.root}</span>.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-mystic-300/80">
              The Chaldean alphabet assigns only the values one through eight;
              nine, held sacred, is never given to a letter. The compound number
              is read first, the root after.
            </p>
          </div>
        </div>
      </Chapter>

      {/* Interlude — the name in daily use, when it differs */}
      {currentName && (
        <NameNowBorne
          birth={{
            expression: core.expression,
            soulUrge: core.soulUrge,
            personality: core.personality,
          }}
          currentName={currentName}
          yAsVowel={reading.yAsVowel}
        />
      )}

      {/* V — The Lo Shu Grid */}
      <Chapter numeral={chapterNumeral("loShu")} glyph="※" title="The Lo Shu Grid">
        <LoShuGrid result={loShu} />
      </Chapter>

      {/* VI — The Correspondences */}
      {corr && (
        <Chapter numeral={chapterNumeral("correspondences")} glyph="♃" title="The Correspondences">
          <p className="text-note">
            The symbols held to answer to your Life Path {core.lifePath.value}.
          </p>
          <CorrGrid corr={corr} />
        </Chapter>
      )}

      {/* VII–XII — tarot, stars, planes, cycles, bridges, fortunate signatures */}
      <CosmicProfile reading={reading} />

      {/* XIII — The Almanac */}
      <Chapter numeral={chapterNumeral("almanac")} glyph="✷" title="The Almanac of the Present">
        <PersonalCyclesRow personal={forecast.personal} />
        {py && <PersonalYearCard py={py} />}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <p className="term term-gold">The Four Pinnacles</p>
            <PeriodList kind="Pinnacle" periods={forecast.pinnacles} age={age} />
          </div>
          <div className="space-y-3">
            <p className="term term-gold">The Four Challenges</p>
            <PeriodList kind="Challenge" periods={forecast.challenges} age={age} />
          </div>
        </div>
      </Chapter>

      {/* Explicit */}
      <div className="pt-4 text-center">
        <div className="rule-ornament text-sm">❧</div>
        <p className="mx-auto mt-4 max-w-md text-sm italic leading-relaxed text-mystic-300/80">
          Here endeth the reading. May these numbers illuminate, never confine.
        </p>
      </div>
    </div>
  );
});

function LetterStat({
  label,
  trait,
  note,
}: {
  label: string;
  trait: { letter: string; value: number } | null;
  note: string;
}) {
  return (
    <div className="glass p-5">
      <p className="eyebrow">{label}</p>
      <div className="mt-2 flex items-baseline gap-3">
        <span className="font-blackletter text-4xl text-gold-200">
          {trait?.letter ?? "—"}
        </span>
        <p className="text-note">{note}</p>
      </div>
    </div>
  );
}

