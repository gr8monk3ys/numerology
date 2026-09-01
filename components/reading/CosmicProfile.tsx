"use client";

import type { Reading } from "@/lib/numerology";
import { buildCosmicProfile } from "@/lib/content/cosmic";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";
import { SectionRow } from "@/components/ui/SectionHeading";
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
    <div className="flex w-40 flex-col gap-3">
      <div className="ticks relative aspect-[2/3] rounded-[3px] border border-gold-400/50 bg-ink-900 p-3">
        <div className="flex h-full flex-col justify-between">
          <span className="font-mono text-[11px] tracking-[0.2em] text-gold-300">{ROMAN[index]}</span>
          <span className="font-display text-3xl leading-none text-gold-200/40">✦</span>
          <span className="font-display text-xl leading-tight text-bone-50">{name}</span>
        </div>
      </div>
      <div>
        <span className="mono-label">{role}</span>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {keywords.slice(0, 3).map((k) => (
            <Chip key={k} tone="muted">{k}</Chip>
          ))}
        </div>
      </div>
    </div>
  );
}

const idx = (n: number) => String(n).padStart(2, "0");

export function CosmicProfile({
  reading,
  startIndex = 1,
}: {
  reading: Reading;
  startIndex?: number;
}) {
  const p = buildCosmicProfile(reading);
  let n = startIndex;

  return (
    <div className="space-y-20">
      {/* Tarot Birth Card */}
      <section className="space-y-6">
        <SectionRow index={idx(n++)} title="Tarot birth card" meta="Major arcana" />
        <div className="frame flex flex-col gap-8 p-6 md:flex-row md:items-start sm:p-8">
          <div className="flex gap-5">
            {p.tarot.personality && (
              <TarotCard
                index={p.tarot.card.personality}
                name={p.tarot.personality.name}
                keywords={p.tarot.personality.keywords}
                role={p.tarot.card.same ? "Birth card" : "Personality"}
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
            <p className="text-[15px] leading-relaxed text-bone-100">{p.tarot.personality?.birthCard}</p>
            {!p.tarot.card.same && p.tarot.soul && (
              <p className="text-sm text-bone-300">
                <span className="text-gold-200">{p.tarot.soul.name} (soul card) · </span>
                {p.tarot.soul.numerology}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Astrology */}
      <section className="space-y-6">
        <SectionRow index={idx(n++)} title="Written in the stars" />
        <div className="divided md:grid-cols-2">
          {p.sun && (
            <div className="p-6">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-[3px] border hairline text-2xl">{p.sun.symbol}</span>
                <div>
                  <span className="mono-label">Sun sign</span>
                  <h3 className="text-xl">{p.sun.sign}</h3>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <Chip tone="muted">{p.sun.element}</Chip>
                <Chip tone="muted">{p.sun.modality}</Chip>
                <Chip tone="muted">Ruled by {p.sun.rulingPlanet}</Chip>
              </div>
              <p className="mt-4 text-sm text-bone-300">{p.sun.numerologyNote}</p>
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-[3px] border hairline text-2xl">{p.chinese.emoji}</span>
              <div>
                <span className="mono-label">Chinese zodiac</span>
                <h3 className="text-xl">{p.chinese.animal}</h3>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.chinese.traits.slice(0, 4).map((t) => (
                <Chip key={t} tone="muted">{t}</Chip>
              ))}
            </div>
            <p className="mt-4 text-sm text-bone-300">{p.chinese.summary}</p>
          </div>
        </div>
      </section>

      {/* Planes of Expression */}
      <section className="space-y-6">
        <SectionRow index={idx(n++)} title="Planes of expression" meta={`${p.planes.result.dominant} dominant`} />
        <PlanesChart result={p.planes.result} content={p.planes.content} />
      </section>

      {/* Life Cycles */}
      <section className="space-y-6">
        <SectionRow index={idx(n++)} title="Three life cycles" />
        <div className="divided md:grid-cols-3">
          {p.cycles.map((c) => (
            <div key={c.index} className="p-6">
              <div className="flex items-center gap-4">
                <NumberOrb value={c.value} size="sm" isMaster={c.isMaster} />
                <div>
                  <span className="mono-label">Ages {c.label}</span>
                  <h3 className="text-lg">{c.title}</h3>
                </div>
              </div>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-bone-500">
                Ruled by your birth {c.ruler}
              </p>
              {c.meaning && <p className="mt-2 text-sm text-bone-300">{c.meaning}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Bridges */}
      <section className="space-y-6">
        <SectionRow index={idx(n++)} title="Bridge numbers" />
        <div className="divided md:grid-cols-2">
          {p.bridges.map((b) => (
            <div key={b.key} className="p-6">
              <div className="flex items-center gap-4">
                <NumberOrb value={b.value} size="sm" />
                <div>
                  <span className="mono-label">{b.label}</span>
                  <h3 className="text-lg">{b.meaning?.title ?? `Bridge ${b.value}`}</h3>
                </div>
              </div>
              <p className="mt-4 text-sm text-bone-300">
                Bridging {b.between}. {b.meaning?.summary}
              </p>
              {b.meaning?.advice && (
                <p className="mt-2 text-sm text-bone-100">
                  <span className="text-gold-200">Tip · </span>
                  {b.meaning.advice}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lucky */}
      <section className="space-y-6">
        <SectionRow index={idx(n++)} title="Fortunate signatures" />
        <div className="divided sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-5">
            <span className="mono-label">Lucky numbers</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.lucky.numbers.map((num) => (
                <NumberOrb key={num} value={num} size="xs" />
              ))}
            </div>
          </div>
          {p.lucky.day && (
            <div className="p-5">
              <span className="mono-label">Lucky day</span>
              <p className="mt-3 text-lg text-bone-50">{p.lucky.day}</p>
            </div>
          )}
          {p.lucky.colors && (
            <div className="p-5">
              <span className="mono-label">Lucky colors</span>
              <p className="mt-3 text-lg text-bone-50">{p.lucky.colors.join(", ")}</p>
            </div>
          )}
          {p.lucky.gem && (
            <div className="p-5">
              <span className="mono-label">Talisman stone</span>
              <p className="mt-3 text-lg text-bone-50">{p.lucky.gem}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
