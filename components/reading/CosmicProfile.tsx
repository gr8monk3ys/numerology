"use client";

import { Sparkles, Sun, Layers, Hourglass, Link2, Clover } from "lucide-react";
import type { Reading } from "@/lib/numerology";
import { buildCosmicProfile } from "@/lib/content/cosmic";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";
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
      <div className="relative aspect-[2/3] w-40 overflow-hidden rounded-xl border border-gold-300/30 bg-gradient-to-b from-void-800 to-void-950 p-4 shadow-glow-gold">
        <div className="absolute inset-1.5 rounded-lg border border-gold-300/20" />
        <div className="relative flex h-full flex-col items-center justify-between text-center">
          <span className="font-display text-sm tracking-widest text-gold-200/80">
            {ROMAN[index]}
          </span>
          <Sparkles className="h-9 w-9 text-gold-300/90" />
          <span className="font-display text-base leading-tight text-mystic-50">
            {name}
          </span>
        </div>
      </div>
      <div className="text-center">
        <span className="eyebrow">{role}</span>
        <div className="mt-1.5 flex max-w-[10rem] flex-wrap justify-center gap-1">
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

function Section({
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

export function CosmicProfile({ reading }: { reading: Reading }) {
  const p = buildCosmicProfile(reading);

  return (
    <div className="space-y-16">
      {/* Tarot Birth Card */}
      <Section icon={Sparkles} title="Your Tarot Birth Card">
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
            <p className="text-mystic-100/90">{p.tarot.personality?.birthCard}</p>
            {!p.tarot.card.same && p.tarot.soul && (
              <p className="text-sm text-mystic-200/70">
                <span className="text-gold-300">{p.tarot.soul.name} (soul card): </span>
                {p.tarot.soul.numerology}
              </p>
            )}
          </div>
        </div>
      </Section>

      {/* Astrology row */}
      <Section icon={Sun} title="Written in the Stars">
        <div className="grid gap-4 md:grid-cols-2">
          {p.sun && (
            <div className="glass p-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{p.sun.symbol}</span>
                <div>
                  <span className="eyebrow">Sun Sign</span>
                  <h3 className="font-display text-xl text-mystic-50">{p.sun.sign}</h3>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Chip tone="muted">{p.sun.element}</Chip>
                <Chip tone="muted">{p.sun.modality}</Chip>
                <Chip tone="muted">Ruled by {p.sun.rulingPlanet}</Chip>
              </div>
              <p className="mt-3 text-sm text-mystic-200/70">{p.sun.numerologyNote}</p>
            </div>
          )}
          <div className="glass p-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{p.chinese.emoji}</span>
              <div>
                <span className="eyebrow">Chinese Zodiac</span>
                <h3 className="font-display text-xl text-mystic-50">
                  {p.chinese.animal}
                </h3>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.chinese.traits.slice(0, 4).map((t) => (
                <Chip key={t} tone="muted">
                  {t}
                </Chip>
              ))}
            </div>
            <p className="mt-3 text-sm text-mystic-200/70">{p.chinese.summary}</p>
          </div>
        </div>
      </Section>

      {/* Planes of Expression */}
      <Section icon={Layers} title="Planes of Expression">
        <PlanesChart result={p.planes.result} content={p.planes.content} />
      </Section>

      {/* Life Cycles */}
      <Section icon={Hourglass} title="Your Three Life Cycles">
        <div className="grid gap-4 md:grid-cols-3">
          {p.cycles.map((c) => (
            <div key={c.index} className="glass p-6">
              <div className="flex items-center gap-3">
                <NumberOrb value={c.value} size="sm" isMaster={c.isMaster} />
                <div>
                  <span className="eyebrow">Ages {c.label}</span>
                  <h3 className="font-display text-lg text-mystic-50">{c.title}</h3>
                </div>
              </div>
              <p className="mt-3 text-xs uppercase tracking-widest text-mystic-300/50">
                Ruled by your birth {c.ruler}
              </p>
              {c.meaning && (
                <p className="mt-2 text-sm text-mystic-200/70">{c.meaning}</p>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Bridge numbers */}
      <Section icon={Link2} title="Bridge Numbers">
        <div className="grid gap-4 md:grid-cols-2">
          {p.bridges.map((b) => (
            <div key={b.key} className="glass p-6">
              <div className="flex items-center gap-3">
                <NumberOrb value={b.value} size="sm" />
                <div>
                  <span className="eyebrow">{b.label}</span>
                  <h3 className="font-display text-base text-mystic-50">
                    {b.meaning?.title ?? `Bridge ${b.value}`}
                  </h3>
                </div>
              </div>
              <p className="mt-3 text-sm text-mystic-200/70">
                Bridging {b.between}. {b.meaning?.summary}
              </p>
              {b.meaning?.advice && (
                <p className="mt-2 text-sm text-mystic-100/80">
                  <span className="text-gold-300">Tip: </span>
                  {b.meaning.advice}
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Lucky */}
      <Section icon={Clover} title="Your Fortunate Signatures">
        <div className="glass grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="eyebrow">Lucky Numbers</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {p.lucky.numbers.map((n) => (
                <NumberOrb key={n} value={n} size="xs" />
              ))}
            </div>
          </div>
          {p.lucky.day && (
            <div>
              <span className="eyebrow">Lucky Day</span>
              <p className="mt-2 font-display text-lg text-mystic-50">{p.lucky.day}</p>
            </div>
          )}
          {p.lucky.colors && (
            <div>
              <span className="eyebrow">Lucky Colors</span>
              <div className="mt-2 flex items-center gap-2">
                {p.lucky.colors.map((c) => (
                  <span key={c} className="text-sm text-mystic-100">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
          {p.lucky.gem && (
            <div>
              <span className="eyebrow">Talisman Stone</span>
              <p className="mt-2 font-display text-lg text-mystic-50">{p.lucky.gem}</p>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
