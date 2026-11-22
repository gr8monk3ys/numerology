"use client";

import type { Reading } from "@/lib/numerology";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Dial, coreRings } from "@/components/ui/Dial";
import { AdSlot } from "@/components/AdSense";
import { AD_SLOTS } from "@/lib/adsense";
import { Chip } from "@/components/ui/Chip";
import { SectionRow } from "@/components/ui/SectionHeading";
import { NumberCard } from "@/components/reading/NumberCard";
import { CosmicProfile } from "@/components/reading/CosmicProfile";
import { CycleList } from "@/components/reading/CycleList";
import { InclusionTable } from "@/components/reading/InclusionTable";
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

// Intl, not a hand-kept month table. UTC on both sides so the calendar date
// the visitor typed is the one printed, whatever their time zone.
const BIRTH_DATE = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function ReadingResults({ reading }: { reading: Reading }) {
  const { core, advanced, forecast, chaldean, name, birth } = reading;
  const lifePathMeaning = pick(lifePathMeanings, core.lifePath.value);
  const corr = pick(correspondences, core.lifePath.value);
  const py = pick(personalYearMeanings, forecast.personal.year.value);
  const bday = pick(birthdayMeanings, birth.day);

  return (
    <div className="mt-16 space-y-20">
      {/* Header */}
      <div className="frame-raised p-6 sm:p-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          <Dial numbers={coreRings(reading)} className="w-52 shrink-0 self-center md:w-60 md:self-start" />
          <div className="min-w-0 flex-1">
            {/* h2: the page's h1 is "Cast your numerology reading" above. */}
            <h2 className="text-4xl sm:text-5xl">
              {lifePathMeaning?.title ?? `Life Path ${core.lifePath.value}`}
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="label-accent">Life Path {core.lifePath.value}</span>
              {core.lifePath.isMaster && <Chip tone="rubric">Master</Chip>}
              {core.lifePath.karmicDebt && <Chip tone="rubric">Karmic {core.lifePath.karmicDebt}</Chip>}
            </div>
            <p className="mt-2 font-figures text-base text-bone-400">
              {name.all.join(" ").toUpperCase()} ·{" "}
              {BIRTH_DATE.format(Date.UTC(birth.year, birth.month - 1, birth.day)).toUpperCase()}
              {" · "}
              {core.lifePath.steps.join(" → ")}
            </p>
            {lifePathMeaning?.summary && (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-bone-100">
                {lifePathMeaning.summary}
              </p>
            )}
            {lifePathMeaning?.keywords && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {lifePathMeaning.keywords.map((k) => (
                  <Chip key={k} tone="gold">{k}</Chip>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Core numbers */}
      <section className="space-y-6">
        <SectionRow title="Core numbers" meta="Pythagorean" />
        <div className="grid gap-3 lg:grid-cols-2">
          <NumberCard label="Life Path" insight={core.lifePath} meaning={lifePathMeaning} defaultOpen />
          <NumberCard label="Expression / Destiny" insight={core.expression} meaning={pick(expressionMeanings, core.expression.value)} />
          <NumberCard label="Soul Urge" insight={core.soulUrge} meaning={pick(soulUrgeMeanings, core.soulUrge.value)} />
          <NumberCard label="Personality" insight={core.personality} meaning={pick(personalityMeanings, core.personality.value)} />
          <NumberCard label="Birthday" insight={core.birthday} blurb={bday?.title} />
          <NumberCard label="Maturity" insight={core.maturity} meaning={pick(lifePathMeanings, core.maturity.value)} blurb="Who you become" />
          <NumberCard label="Balance" insight={core.balance} blurb="How you steady yourself" />
        </div>
        {bday && (
          <div className="frame flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
            <NumberOrb value={birth.day} size="sm" />
            <div>
              <h3 className="text-xl">{bday.title}</h3>
              <span className="label">Born on the {birth.day}{ordinal(birth.day)}</span>
              <p className="mt-2 text-base text-bone-300">{bday.summary}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {bday.traits.map((t) => (
                  <Chip key={t} tone="muted">{t}</Chip>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <AdSlot slot={AD_SLOTS.reading} />

      {/* Karmic & hidden */}
      <section className="space-y-6">
        <SectionRow title="Karmic signature" meta={`${advanced.karmicDebts.length} debt${advanced.karmicDebts.length === 1 ? "" : "s"}`} />
        {advanced.karmicDebts.length > 0 ? (
          <div className="grid gap-3">
            {advanced.karmicDebts.map((hit) => {
              const km = pick(karmicDebtMeanings, hit.debt);
              return (
                <div key={hit.source + hit.debt} className="frame p-5">
                  <div className="flex items-center gap-4">
                    <NumberOrb value={hit.debt} size="sm" isKarmic />
                    <div>
                      <h3 className="text-xl">{km?.title ?? `Karmic Debt ${hit.debt}`}</h3>
                      <span className="label text-rubric-300">
                        {hit.source} · Karmic debt {hit.debt}
                      </span>
                    </div>
                  </div>
                  {km?.summary && <p className="mt-4 text-base text-bone-300">{km.summary}</p>}
                  {km?.lesson && (
                    <p className="mt-2 text-base text-bone-100">
                      <span className="text-gold-200">The lesson · </span>
                      {km.lesson}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="frame p-5 text-base text-bone-300">
            No karmic debt numbers (13, 14, 16, 19) appear in your core chart. A
            lighter ledger to work with in this lifetime.
          </p>
        )}

        <div className="divided sm:grid-cols-3">
          <div className="p-5">
            <h3 className="label">Karmic lessons</h3>
            <p className="mt-2 text-base text-bone-300">
              Numbers absent from your name. Energies to consciously develop.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {advanced.karmicLessons.length ? (
                advanced.karmicLessons.map((n) => <NumberOrb key={n} value={n} size="xs" />)
              ) : (
                <span className="font-figures text-base text-sage-400">NONE · ALL PRESENT</span>
              )}
            </div>
          </div>
          <div className="p-5">
            <h3 className="label">Hidden passion</h3>
            <p className="mt-2 text-base text-bone-300">
              The number appearing most in your name. Your instinctive talent.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {advanced.hiddenPassion.map((n) => <NumberOrb key={n} value={n} size="xs" />)}
            </div>
          </div>
          <div className="p-5">
            <h3 className="label">Subconscious self</h3>
            <p className="mt-2 text-base text-bone-300">Your capacity to respond well under pressure.</p>
            <div className="mt-4">
              <NumberOrb value={advanced.subconsciousSelf} size="xs" />
            </div>
          </div>
        </div>

        <InclusionTable counts={advanced.letterCounts} passion={advanced.hiddenPassion} />
      </section>

      {/* Letters */}
      <section className="space-y-6">
        <SectionRow title="The letters of your name" />
        <div className="divided sm:grid-cols-2 lg:grid-cols-4">
          <LetterStat label="Cornerstone" trait={advanced.cornerstone} note="How you approach life" />
          <LetterStat label="Capstone" trait={advanced.capstone} note="How you finish things" />
          <LetterStat label="First vowel" trait={advanced.firstVowel} note="Your inner self" />
          <div className="p-5">
            <span className="label">Rational thought</span>
            <div className="mt-3 flex items-center gap-3">
              <NumberOrb value={advanced.rationalThought.value} size="sm" isMaster={advanced.rationalThought.isMaster} />
              <p className="text-base text-bone-300">How you naturally think and solve.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chaldean */}
      <section className="space-y-6">
        <SectionRow title="Chaldean name vibration" meta="Chaldean" />
        <div className="frame flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-center gap-3">
            <NumberOrb value={chaldean.compound} size="md" />
            <span aria-hidden="true" className="font-figures text-bone-500">→</span>
            <NumberOrb value={chaldean.root} size="md" isMaster={chaldean.isMaster} />
          </div>
          <div>
            <p className="text-base leading-relaxed text-bone-200">
              In the Chaldean system, the vibration of{" "}
              <span className="text-gold-200">{name.all.join(" ")}</span> sums to
              compound <span className="font-figures text-bone-50">{chaldean.compound}</span>,
              rooting into <span className="font-figures text-bone-50">{chaldean.root}</span>.
            </p>
            <p className="mt-2 text-sm text-bone-400">
              Chaldean numerology (values 1–8, the sacred 9 unassigned) reads the
              name as it is spoken and lived, complementing the Pythagorean chart above.
            </p>
          </div>
        </div>
      </section>

      {/* Correspondences */}
      {corr && (
        <section className="space-y-6">
          <SectionRow title="Esoteric correspondences" meta={`Life Path ${core.lifePath.value}`} />
          <div className="divided grid-cols-2 lg:grid-cols-3">
            <Corr label="Tarot" value={corr.tarot} />
            <Corr label="Ruling planet" value={corr.rulingPlanet} />
            <Corr label="Zodiac" value={corr.zodiac} />
            <Corr label="Element" value={corr.element} />
            <Corr label="Chakra" value={corr.chakra} />
            <Corr label="Day" value={corr.dayOfWeek} />
            <Corr label="Colors" value={corr.colors?.join(", ")} />
            <Corr label="Gemstones" value={corr.gemstones?.join(", ")} />
            <Corr label="Metal" value={corr.metal} />
          </div>
        </section>
      )}

      {/* Cosmic profile — tarot, astrology, planes, cycles, bridges, lucky */}
      <CosmicProfile reading={reading} />

      {/* Forecast */}
      <section className="space-y-6">
        <SectionRow title="Your forecast" meta="Today" />
        <div className="divided sm:grid-cols-3">
          <ForecastStat label="Personal year" value={forecast.personal.year.value} accent />
          <ForecastStat label="Personal month" value={forecast.personal.month.value} />
          <ForecastStat label="Personal day" value={forecast.personal.day.value} />
        </div>
        {py && (
          <div className="frame p-5 sm:p-6">
            <span className="label-accent">A {py.theme} year</span>
            <p className="mt-3 text-base text-bone-100">{py.summary}</p>
            <p className="mt-2 text-base text-bone-300">
              <span className="text-gold-200">Guidance · </span>
              {py.advice}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {py.focus.map((f) => (
                <Chip key={f} tone="muted">{f}</Chip>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <CycleList
            title="Pinnacles"
            items={forecast.pinnacles.map((p) => ({
              key: p.index,
              value: p.value,
              isMaster: p.isMaster,
              name: `Pinnacle ${p.index}`,
              ages: p.label,
              summary: pick(pinnacleMeanings, p.value)?.summary,
            }))}
          />
          <CycleList
            title="Challenges"
            items={forecast.challenges.map((c) => ({
              key: c.index,
              value: c.value,
              isMaster: false,
              name: `Challenge ${c.index}`,
              ages: c.label,
              summary: pick(challengeMeanings, c.value)?.summary,
            }))}
          />
        </div>
      </section>

      <p className="mx-auto border-t hairline pt-6 text-center font-figures text-base text-bone-500">
        OFFERED FOR REFLECTION AND INSPIRATION · MAY THESE NUMBERS ILLUMINATE, NEVER CONFINE
      </p>
    </div>
  );
}

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || "th";
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
    <div className="p-5">
      <span className="label">{label}</span>
      <div className="mt-3 flex items-center gap-3">
        <NumberOrb value={trait?.letter ?? "—"} size="sm" />
        <p className="text-base text-bone-300">{note}</p>
      </div>
    </div>
  );
}

function Corr({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="p-4">
      <span className="label">{label}</span>
      <p className="mt-1 text-base text-bone-50">{value}</p>
    </div>
  );
}

function ForecastStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 p-5">
      <NumberOrb value={value} size="sm" isMaster={accent && (value === 11 || value === 22)} />
      <div>
        <span className="label">{label}</span>
        <p className="text-base text-bone-300">Cycle vibration</p>
      </div>
    </div>
  );
}
