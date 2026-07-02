"use client";

import { useState } from "react";
import { loShuGrid, type Reading } from "@/lib/numerology";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";
import { NumberCard } from "@/components/reading/NumberCard";
import { Chapter } from "@/components/reading/Chapter";
import { LoShuGrid } from "@/components/reading/LoShuGrid";
import { CosmicProfile } from "@/components/reading/CosmicProfile";
import {
  lifePathMeanings,
  expressionMeanings,
  soulUrgeMeanings,
  personalityMeanings,
  birthdayMeanings,
  personalYearMeanings,
  correspondences,
  karmicDebtMeanings,
  pinnacleMeanings,
  challengeMeanings,
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
function FolioActions({ reading }: { reading: Reading }) {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    const { birth } = reading;
    const dob = `${birth.year}-${String(birth.month).padStart(2, "0")}-${String(birth.day).padStart(2, "0")}`;
    const params = new URLSearchParams({ name: reading.fullName, dob });
    if (reading.yAsVowel) params.set("y", "1");
    const url = `${window.location.origin}/reading?${params.toString()}`;
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
      <button type="button" onClick={copyLink} className="action-quiet">
        {copied ? "the link is copied" : "copy a link to this reading"}
      </button>
      <button type="button" onClick={() => window.print()} className="action-quiet">
        print this folio
      </button>
    </p>
  );
}

export function ReadingResults({ reading }: { reading: Reading }) {
  const { core, advanced, forecast, chaldean, name, birth } = reading;
  const lifePathMeaning = pick(lifePathMeanings, core.lifePath.value);
  const corr = pick(correspondences, core.lifePath.value);
  const py = pick(personalYearMeanings, forecast.personal.year.value);
  const bday = pick(birthdayMeanings, birth.day);
  const loShu = loShuGrid(birth);

  return (
    <div className="mt-14 space-y-20">
      {/* Incipit */}
      <div className="glass-strong relative overflow-hidden px-6 py-10 text-center sm:px-12 sm:py-14">
        <div className="bg-cosmic-radial pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative flex flex-col items-center gap-6">
          <p className="eyebrow">Here beginneth the reading of</p>
          <h1 className="font-display text-4xl text-mystic-50 sm:text-5xl">
            {name.all.join(" ")}
          </h1>
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
            <h2 className="mt-1 font-display text-3xl text-mystic-50">
              {lifePathMeaning?.title ?? `Life Path ${core.lifePath.value}`}
            </h2>
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

          <FolioActions reading={reading} />
        </div>
      </div>

      {/* I — The Core Numbers */}
      <Chapter numeral="I" glyph="☉" title="The Core Numbers">
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
            <p className="mt-2 text-sm leading-relaxed text-mystic-200/75">
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
      <Chapter numeral="II" glyph="♄" title="The Karmic Record">
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
                    <p className="mt-3 text-sm leading-relaxed text-mystic-200/75">
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
          <p className="glass p-6 text-sm leading-relaxed text-mystic-200/75">
            No karmic debt — neither 13, 14, 16 nor 19 — appears in your core
            chart. The ledger you carry into this life is a light one.
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="glass p-5">
            <p className="eyebrow">Karmic Lessons</p>
            <p className="mt-2 text-sm leading-relaxed text-mystic-200/75">
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
            <p className="mt-2 text-sm leading-relaxed text-mystic-200/75">
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
            <p className="mt-2 text-sm leading-relaxed text-mystic-200/75">
              The composure with which you meet sudden circumstance.
            </p>
            <div className="mt-3">
              <NumberOrb value={advanced.subconsciousSelf} size="xs" />
            </div>
          </div>
        </div>
      </Chapter>

      {/* III — The Letters of the Name */}
      <Chapter numeral="III" glyph="☿" title="The Letters of the Name">
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
              <p className="text-sm leading-relaxed text-mystic-200/75">
                The cast of your reasoning.
              </p>
            </div>
          </div>
        </div>
      </Chapter>

      {/* IV — The Chaldean Reckoning */}
      <Chapter numeral="IV" glyph="✶" title="The Chaldean Reckoning">
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
            <p className="mt-2 text-sm leading-relaxed text-mystic-300/70">
              The Chaldean alphabet assigns only the values one through eight;
              nine, held sacred, is never given to a letter. The compound number
              is read first, the root after.
            </p>
          </div>
        </div>
      </Chapter>

      {/* V — The Lo Shu Grid */}
      <Chapter numeral="V" glyph="※" title="The Lo Shu Grid">
        <LoShuGrid result={loShu} />
      </Chapter>

      {/* VI — The Correspondences */}
      {corr && (
        <Chapter numeral="VI" glyph="♃" title="The Correspondences">
          <p className="text-sm leading-relaxed text-mystic-200/75">
            The symbols held to answer to your Life Path {core.lifePath.value}.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Corr label="Tarot" value={corr.tarot} />
            <Corr label="Ruling Planet" value={corr.rulingPlanet} />
            <Corr label="Zodiac" value={corr.zodiac} />
            <Corr label="Element" value={corr.element} />
            <Corr label="Chakra" value={corr.chakra} />
            <Corr label="Day of the Week" value={corr.dayOfWeek} />
            <Corr label="Colours" value={corr.colors?.join(", ")} />
            <Corr label="Stones" value={corr.gemstones?.join(", ")} />
            <Corr label="Metal" value={corr.metal} />
          </div>
        </Chapter>
      )}

      {/* VII–XII — tarot, stars, planes, cycles, bridges, fortunate signatures */}
      <CosmicProfile reading={reading} />

      {/* XIII — The Almanac */}
      <Chapter numeral="XIII" glyph="✷" title="The Almanac of the Present">
        <div className="grid gap-4 sm:grid-cols-3">
          <ForecastStat label="Personal Year" value={forecast.personal.year.value} />
          <ForecastStat label="Personal Month" value={forecast.personal.month.value} />
          <ForecastStat label="Personal Day" value={forecast.personal.day.value} />
        </div>
        {py && (
          <div className="glass p-6">
            <p className="eyebrow">A {py.theme} year</p>
            <p className="mt-2 text-sm leading-relaxed text-mystic-100/85">
              {py.summary}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-mystic-200/75">
              <span className="text-gold-300">Counsel: </span>
              {py.advice}
            </p>
            <div className="term-row mt-3">
              {py.focus.map((f) => (
                <Chip key={f} tone="muted">
                  {f}
                </Chip>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <p className="term term-gold">The Four Pinnacles</p>
            {forecast.pinnacles.map((p) => {
              const pm = pick(pinnacleMeanings, p.value);
              return (
                <div key={p.index} className="glass flex items-start gap-4 p-4">
                  <NumberOrb value={p.value} size="sm" isMaster={p.isMaster} />
                  <div>
                    <p className="text-sm text-mystic-50">
                      Pinnacle {p.index}{" "}
                      <span className="text-mystic-400/70">· ages {p.label}</span>
                    </p>
                    {pm?.summary && (
                      <p className="mt-1 text-sm leading-relaxed text-mystic-200/70">
                        {pm.summary}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="space-y-3">
            <p className="term term-gold">The Four Challenges</p>
            {forecast.challenges.map((c) => {
              const cm = pick(challengeMeanings, c.value);
              return (
                <div key={c.index} className="glass flex items-start gap-4 p-4">
                  <NumberOrb value={c.value} size="sm" />
                  <div>
                    <p className="text-sm text-mystic-50">
                      Challenge {c.index}{" "}
                      <span className="text-mystic-400/70">· ages {c.label}</span>
                    </p>
                    {cm?.summary && (
                      <p className="mt-1 text-sm leading-relaxed text-mystic-200/70">
                        {cm.summary}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Chapter>

      {/* Explicit */}
      <div className="pt-4 text-center">
        <div className="rule-ornament text-sm">❧</div>
        <p className="mx-auto mt-4 max-w-md text-sm italic leading-relaxed text-mystic-300/70">
          Here endeth the reading. May these numbers illuminate, never confine.
        </p>
      </div>
    </div>
  );
}

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
        <p className="text-sm leading-relaxed text-mystic-200/75">{note}</p>
      </div>
    </div>
  );
}

function Corr({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="glass p-4">
      <p className="eyebrow">{label}</p>
      <p className="mt-1 font-display text-lg text-mystic-50">{value}</p>
    </div>
  );
}

function ForecastStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="glass flex items-center gap-4 p-5">
      <NumberOrb value={value} size="sm" />
      <div>
        <p className="eyebrow">{label}</p>
        <p className="text-sm text-mystic-300/70">the present vibration</p>
      </div>
    </div>
  );
}
