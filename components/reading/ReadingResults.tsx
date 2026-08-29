"use client";

import {
  Compass,
  Star,
  Heart,
  Moon,
  Cake,
  Sparkles,
  Scale,
  Wand2,
  Gem,
  CalendarClock,
  Mountain,
  Swords,
  Anchor,
} from "lucide-react";
import type { Reading } from "@/lib/numerology";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";
import { NumberCard } from "@/components/reading/NumberCard";
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

function Panel({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-mystic-500/15 text-gold-300">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="font-display text-2xl text-mystic-50">{title}</h2>
      </div>
      {children}
    </section>
  );
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function ReadingResults({ reading }: { reading: Reading }) {
  const { core, advanced, forecast, chaldean, name, birth } = reading;
  const lifePathMeaning = pick(lifePathMeanings, core.lifePath.value);
  const corr = pick(correspondences, core.lifePath.value);
  const py = pick(personalYearMeanings, forecast.personal.year.value);

  return (
    <div className="mt-12 space-y-16">
      {/* Header */}
      <div className="glass-strong relative overflow-hidden p-8 text-center sm:p-12">
        <div className="bg-cosmic-radial pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative flex flex-col items-center gap-6">
          <div className="animate-flicker rounded-full">
            <NumberOrb
              value={core.lifePath.value}
              size="xl"
              isMaster={core.lifePath.isMaster}
              isKarmic={core.lifePath.karmicDebt !== null}
            />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-300/80">
              Life Path {core.lifePath.value}
              {core.lifePath.karmicDebt ? ` · Karmic ${core.lifePath.karmicDebt}` : ""}
            </span>
            <h1 className="mt-2 font-display text-3xl text-mystic-50 sm:text-4xl">
              {lifePathMeaning?.title ?? `Life Path ${core.lifePath.value}`}
            </h1>
            <p className="mt-1 text-sm text-mystic-200/85">
              {name.all.join(" ")} · {MONTHS[birth.month - 1]} {birth.day},{" "}
              {birth.year}
            </p>
          </div>
          {lifePathMeaning?.summary && (
            <p className="max-w-2xl text-mystic-100/85">
              {lifePathMeaning.summary}
            </p>
          )}
          {lifePathMeaning?.keywords && (
            <div className="flex flex-wrap justify-center gap-2">
              {lifePathMeaning.keywords.map((k) => (
                <Chip key={k} tone="gold">
                  {k}
                </Chip>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Core numbers */}
      <Panel icon={Compass} title="Your Core Numbers">
        <div className="grid gap-4 lg:grid-cols-2">
          <NumberCard label="Life Path" insight={core.lifePath} meaning={lifePathMeaning} defaultOpen />
          <NumberCard label="Expression / Destiny" insight={core.expression} meaning={pick(expressionMeanings, core.expression.value)} />
          <NumberCard label="Soul Urge" insight={core.soulUrge} meaning={pick(soulUrgeMeanings, core.soulUrge.value)} />
          <NumberCard label="Personality" insight={core.personality} meaning={pick(personalityMeanings, core.personality.value)} />
          <NumberCard
            label="Birthday Gift"
            insight={core.birthday}
            blurb={pick(birthdayMeanings, birth.day)?.title}
          />
          <NumberCard label="Maturity" insight={core.maturity} meaning={pick(lifePathMeanings, core.maturity.value)} blurb="Who you become" />
          <NumberCard label="Balance" insight={core.balance} blurb="How you steady yourself" />
        </div>
        {(() => {
          const bday = pick(birthdayMeanings, birth.day);
          if (!bday) return null;
          return (
            <div className="glass flex items-start gap-4 p-5">
              <Cake className="mt-0.5 h-6 w-6 shrink-0 text-gold-300" />
              <div>
                <h3 className="font-display text-lg text-mystic-50">
                  Born on the {birth.day}
                  {ordinal(birth.day)} — {bday.title}
                </h3>
                <p className="mt-1 text-sm text-mystic-200/85">{bday.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {bday.traits.map((t) => (
                    <Chip key={t} tone="muted">
                      {t}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </Panel>

      {/* Karmic & hidden */}
      <Panel icon={Wand2} title="Karmic Signature">
        {advanced.karmicDebts.length > 0 ? (
          <div className="grid gap-4">
            {advanced.karmicDebts.map((hit) => {
              const km = pick(karmicDebtMeanings, hit.debt);
              return (
                <div key={hit.source + hit.debt} className="glass p-5">
                  <div className="flex items-center gap-3">
                    <NumberOrb value={hit.debt} size="sm" isKarmic />
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-rose-300/85">
                        {hit.source} · Karmic Debt {hit.debt}
                      </span>
                      <h3 className="font-display text-lg text-mystic-50">
                        {km?.title ?? `Karmic Debt ${hit.debt}`}
                      </h3>
                    </div>
                  </div>
                  {km?.summary && (
                    <p className="mt-3 text-sm text-mystic-200/85">{km.summary}</p>
                  )}
                  {km?.lesson && (
                    <p className="mt-2 text-sm text-mystic-100/85">
                      <span className="text-gold-300">The lesson: </span>
                      {km.lesson}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="glass p-5 text-sm text-mystic-200/85">
            You carry no karmic debt numbers (13, 14, 16, 19) in your core chart —
            a lighter cosmic ledger to work with in this lifetime.
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="glass p-5">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-300/80">
              Karmic Lessons
            </h3>
            <p className="mt-2 text-sm text-mystic-200/85">
              Numbers absent from your name — energies to consciously develop.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {advanced.karmicLessons.length ? (
                advanced.karmicLessons.map((n) => (
                  <NumberOrb key={n} value={n} size="xs" />
                ))
              ) : (
                <span className="text-sm text-aura-400">None — all present ✦</span>
              )}
            </div>
          </div>
          <div className="glass p-5">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-300/80">
              Hidden Passion
            </h3>
            <p className="mt-2 text-sm text-mystic-200/85">
              The number appearing most in your name — your instinctive talent.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {advanced.hiddenPassion.map((n) => (
                <NumberOrb key={n} value={n} size="xs" />
              ))}
            </div>
          </div>
          <div className="glass p-5">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-300/80">
              Subconscious Self
            </h3>
            <p className="mt-2 text-sm text-mystic-200/85">
              Your capacity to respond well under pressure.
            </p>
            <div className="mt-3">
              <NumberOrb value={advanced.subconsciousSelf} size="xs" />
            </div>
          </div>
        </div>
      </Panel>

      {/* Letter influences */}
      <Panel icon={Anchor} title="The Letters of Your Name">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <LetterStat label="Cornerstone" trait={advanced.cornerstone} note="How you approach life" />
          <LetterStat label="Capstone" trait={advanced.capstone} note="How you finish things" />
          <LetterStat label="First Vowel" trait={advanced.firstVowel} note="Your inner self" />
          <div className="glass p-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-300/80">
              Rational Thought
            </span>
            <div className="mt-2 flex items-center gap-3">
              <NumberOrb value={advanced.rationalThought.value} size="sm" isMaster={advanced.rationalThought.isMaster} />
              <p className="text-sm text-mystic-200/85">How you naturally think & solve.</p>
            </div>
          </div>
        </div>
      </Panel>

      {/* Chaldean */}
      <Panel icon={Gem} title="Chaldean Name Vibration">
        <div className="glass flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:text-left">
          <NumberOrb value={chaldean.root} size="lg" />
          <div>
            <p className="text-sm text-mystic-200/85">
              In the ancient Chaldean system, the vibration of{" "}
              <span className="text-gold-200">{name.all.join(" ")}</span> sums to a
              compound{" "}
              <span className="font-display text-gold-200">{chaldean.compound}</span>,
              rooting into the number{" "}
              <span className="font-display text-gold-200">{chaldean.root}</span>.
            </p>
            <p className="mt-2 text-xs text-mystic-300/85">
              Chaldean numerology (values 1–8, the sacred 9 unassigned) reads the
              name as it is spoken and lived, complementing the Pythagorean chart
              above.
            </p>
          </div>
        </div>
      </Panel>

      {/* Correspondences */}
      {corr && (
        <Panel icon={Star} title="Esoteric Correspondences">
          <p className="text-sm text-mystic-200/85">
            The symbols that resonate with your Life Path {core.lifePath.value}.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Corr label="Tarot" value={corr.tarot} />
            <Corr label="Ruling Planet" value={corr.rulingPlanet} />
            <Corr label="Zodiac" value={corr.zodiac} />
            <Corr label="Element" value={corr.element} />
            <Corr label="Chakra" value={corr.chakra} />
            <Corr label="Day" value={corr.dayOfWeek} />
            <Corr label="Colors" value={corr.colors?.join(", ")} />
            <Corr label="Gemstones" value={corr.gemstones?.join(", ")} />
            <Corr label="Metal" value={corr.metal} />
          </div>
        </Panel>
      )}

      {/* Cosmic profile — tarot, astrology, planes, cycles, bridges, lucky */}
      <CosmicProfile reading={reading} />

      {/* Forecast */}
      <Panel icon={CalendarClock} title="Your Forecast">
        <div className="grid gap-4 sm:grid-cols-3">
          <ForecastStat label="Personal Year" value={forecast.personal.year.value} accent />
          <ForecastStat label="Personal Month" value={forecast.personal.month.value} />
          <ForecastStat label="Personal Day" value={forecast.personal.day.value} />
        </div>
        {py && (
          <div className="glass p-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-300/80">
                A {py.theme} Year
              </span>
            </div>
            <p className="mt-2 text-sm text-mystic-100/85">{py.summary}</p>
            <p className="mt-2 text-sm text-mystic-200/85">
              <span className="text-gold-300">Guidance: </span>
              {py.advice}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
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
            <div className="flex items-center gap-2 text-mystic-100">
              <Mountain className="h-5 w-5 text-gold-300" />
              <h3 className="font-display text-lg">Pinnacles</h3>
            </div>
            {forecast.pinnacles.map((p) => {
              const pm = pick(pinnacleMeanings, p.value);
              return (
                <div key={p.index} className="glass flex items-start gap-4 p-4">
                  <NumberOrb value={p.value} size="sm" isMaster={p.isMaster} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-mystic-50">
                        Pinnacle {p.index}
                      </span>
                      <Chip tone="muted">ages {p.label}</Chip>
                    </div>
                    {pm?.summary && (
                      <p className="mt-1 text-sm text-mystic-200/85">{pm.summary}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-mystic-100">
              <Swords className="h-5 w-5 text-gold-300" />
              <h3 className="font-display text-lg">Challenges</h3>
            </div>
            {forecast.challenges.map((c) => {
              const cm = pick(challengeMeanings, c.value);
              return (
                <div key={c.index} className="glass flex items-start gap-4 p-4">
                  <NumberOrb value={c.value} size="sm" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-mystic-50">
                        Challenge {c.index}
                      </span>
                      <Chip tone="muted">ages {c.label}</Chip>
                    </div>
                    {cm?.summary && (
                      <p className="mt-1 text-sm text-mystic-200/85">{cm.summary}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Panel>

      <p className="border-t border-white/5 pt-6 text-center text-xs text-mystic-300/85">
        Numerology is offered for reflection and inspiration. May these numbers
        illuminate, never confine. ✦
      </p>
    </div>
  );
}

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
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
      <span className="text-xs font-semibold uppercase tracking-widest text-gold-300/80">
        {label}
      </span>
      <div className="mt-2 flex items-center gap-3">
        <span className="font-display text-3xl gold-text">{trait?.letter ?? "—"}</span>
        <p className="text-sm text-mystic-200/85">{note}</p>
      </div>
    </div>
  );
}

function Corr({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="glass p-4">
      <span className="text-xs font-semibold uppercase tracking-widest text-gold-300/70">
        {label}
      </span>
      <p className="mt-1 text-mystic-50">{value}</p>
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
    <div className="glass flex items-center gap-4 p-5">
      <NumberOrb value={value} size="sm" isMaster={accent && (value === 11 || value === 22)} />
      <div>
        <span className="text-xs font-semibold uppercase tracking-widest text-gold-300/80">
          {label}
        </span>
        <p className="text-sm text-mystic-200/85">Cycle vibration</p>
      </div>
    </div>
  );
}
