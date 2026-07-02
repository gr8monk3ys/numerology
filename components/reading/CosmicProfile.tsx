"use client";

import type { Reading } from "@/lib/numerology";
import { buildCosmicProfile } from "@/lib/content/cosmic";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";
import { Chapter } from "@/components/reading/Chapter";
import { PlanesChart } from "@/components/reading/PlanesChart";

const ROMAN: Record<number, string> = {
  0: "0", 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V", 6: "VI", 7: "VII",
  8: "VIII", 9: "IX", 10: "X", 11: "XI", 12: "XII", 13: "XIII", 14: "XIV",
  15: "XV", 16: "XVI", 17: "XVII", 18: "XVIII", 19: "XIX", 20: "XX", 21: "XXI",
};

function TarotCard({
  index,
  name,
  keywords,
  role,
}: {
  index: number;
  name: string;
  keywords: string[];
  role: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative aspect-[2/3] w-40 rounded-sm border border-gold-400/40 p-4"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 0%, #1e170e, #0b0805 78%)",
          boxShadow:
            "inset 0 0 30px rgba(0,0,0,0.6), 0 14px 30px -18px rgba(0,0,0,0.9)",
        }}
      >
        <div className="absolute inset-1.5 rounded-[1px] border border-gold-400/25" />
        <div className="relative flex h-full flex-col items-center justify-between text-center">
          <span className="font-display text-sm tracking-[0.25em] text-gold-300/85">
            {ROMAN[index]}
          </span>
          <span className="text-3xl text-gold-300/80" aria-hidden>
            ✠
          </span>
          <span className="font-display text-base leading-tight text-mystic-50">
            {name}
          </span>
        </div>
      </div>
      <div className="text-center">
        <p className="eyebrow">{role}</p>
        <div className="term-row mt-1.5 max-w-[11rem] justify-center">
          {keywords.slice(0, 3).map((k) => (
            <Chip key={k} tone="muted">
              {k}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CosmicProfile({ reading }: { reading: Reading }) {
  const p = buildCosmicProfile(reading);

  return (
    <div className="space-y-20">
      {/* VII — The Tarot Birth Card */}
      <Chapter numeral="VII" glyph="✠" title="The Tarot Birth Card">
        <div className="glass flex flex-col items-center gap-8 p-8 md:flex-row md:items-start">
          <div className="flex gap-5">
            {p.tarot.personality && (
              <TarotCard
                index={p.tarot.card.personality}
                name={p.tarot.personality.name}
                keywords={p.tarot.personality.keywords}
                role={p.tarot.card.same ? "Birth Card" : "Personality"}
              />
            )}
            {!p.tarot.card.same && p.tarot.soul && (
              <TarotCard
                index={p.tarot.card.soul}
                name={p.tarot.soul.name}
                keywords={p.tarot.soul.keywords}
                role="Soul"
              />
            )}
          </div>
          <div className="flex-1 space-y-3">
            <p className="leading-relaxed text-mystic-100/90">
              {p.tarot.personality?.birthCard}
            </p>
            {!p.tarot.card.same && p.tarot.soul && (
              <p className="text-sm leading-relaxed text-mystic-200/75">
                <span className="text-gold-300">
                  {p.tarot.soul.name}, the soul card:{" "}
                </span>
                {p.tarot.soul.numerology}
              </p>
            )}
          </div>
        </div>
      </Chapter>

      {/* VIII — Written in the Stars */}
      <Chapter numeral="VIII" glyph="☽" title="Written in the Stars">
        <div className="grid gap-4 md:grid-cols-2">
          {p.sun && (
            <div className="glass p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-4xl text-gold-300" aria-hidden>
                  {p.sun.symbol}
                </span>
                <div>
                  <p className="eyebrow">Sun Sign</p>
                  <h3 className="font-display text-2xl text-mystic-50">
                    {p.sun.sign}
                  </h3>
                </div>
              </div>
              <p className="term-row mt-3">
                <Chip tone="muted">{p.sun.element}</Chip>
                <Chip tone="muted">{p.sun.modality}</Chip>
                <Chip tone="muted">ruled by {p.sun.rulingPlanet}</Chip>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-mystic-200/75">
                {p.sun.numerologyNote}
              </p>
            </div>
          )}
          <div className="glass p-6">
            <div className="flex items-baseline gap-3">
              <span
                className="font-blackletter text-4xl text-gold-300"
                aria-hidden
              >
                {p.chinese.animal.charAt(0)}
              </span>
              <div>
                <p className="eyebrow">Year Sign of the East</p>
                <h3 className="font-display text-2xl text-mystic-50">
                  The {p.chinese.animal}
                </h3>
              </div>
            </div>
            <p className="term-row mt-3">
              {p.chinese.traits.slice(0, 4).map((t) => (
                <Chip key={t} tone="muted">
                  {t}
                </Chip>
              ))}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-mystic-200/75">
              {p.chinese.summary}
            </p>
          </div>
        </div>
      </Chapter>

      {/* IX — The Planes of Expression */}
      <Chapter numeral="IX" glyph="⁂" title="The Planes of Expression">
        <PlanesChart result={p.planes.result} content={p.planes.content} />
      </Chapter>

      {/* X — The Three Cycles of a Life */}
      <Chapter numeral="X" glyph="◐" title="The Three Cycles of a Life">
        <div className="grid gap-4 md:grid-cols-3">
          {p.cycles.map((c) => (
            <div key={c.index} className="glass p-6">
              <div className="flex items-center gap-3">
                <NumberOrb value={c.value} size="sm" isMaster={c.isMaster} />
                <div>
                  <p className="eyebrow">Ages {c.label}</p>
                  <h3 className="font-display text-lg text-mystic-50">
                    {c.title}
                  </h3>
                </div>
              </div>
              <p className="term term-muted mt-3 block">
                ruled by the birth {c.ruler}
              </p>
              {c.meaning && (
                <p className="mt-2 text-sm leading-relaxed text-mystic-200/75">
                  {c.meaning}
                </p>
              )}
            </div>
          ))}
        </div>
      </Chapter>

      {/* XI — The Bridges */}
      <Chapter numeral="XI" glyph="‡" title="The Bridges">
        <div className="grid gap-4 md:grid-cols-2">
          {p.bridges.map((b) => (
            <div key={b.key} className="glass p-6">
              <div className="flex items-center gap-3">
                <NumberOrb value={b.value} size="sm" />
                <div>
                  <p className="eyebrow">{b.label}</p>
                  <h3 className="font-display text-lg text-mystic-50">
                    {b.meaning?.title ?? `Bridge ${b.value}`}
                  </h3>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-mystic-200/75">
                Between {b.between}. {b.meaning?.summary}
              </p>
              {b.meaning?.advice && (
                <p className="mt-2 text-sm leading-relaxed text-mystic-100/85">
                  <span className="text-gold-300">Counsel: </span>
                  {b.meaning.advice}
                </p>
              )}
            </div>
          ))}
        </div>
      </Chapter>

      {/* XII — The Fortunate Signatures */}
      <Chapter numeral="XII" glyph="❧" title="The Fortunate Signatures">
        <div className="glass grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="eyebrow">Fortunate Numbers</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {p.lucky.numbers.map((n) => (
                <NumberOrb key={n} value={n} size="xs" />
              ))}
            </div>
          </div>
          {p.lucky.day && (
            <div>
              <p className="eyebrow">Fortunate Day</p>
              <p className="mt-2 font-display text-xl text-mystic-50">
                {p.lucky.day}
              </p>
            </div>
          )}
          {p.lucky.colors && (
            <div>
              <p className="eyebrow">Fortunate Colours</p>
              <p className="mt-2 font-display text-xl text-mystic-50">
                {p.lucky.colors.join(", ")}
              </p>
            </div>
          )}
          {p.lucky.gem && (
            <div>
              <p className="eyebrow">Talisman Stone</p>
              <p className="mt-2 font-display text-xl text-mystic-50">
                {p.lucky.gem}
              </p>
            </div>
          )}
        </div>
      </Chapter>
    </div>
  );
}
