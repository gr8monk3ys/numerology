"use client";

import { nameNumbers, reduceNumber, type NumberInsight } from "@/lib/numerology";
import { NumberOrb } from "@/components/ui/NumberOrb";
import {
  expressionMeanings,
  soulUrgeMeanings,
  personalityMeanings,
  bridgeMeanings,
  pick,
  type NumberMeaning,
} from "@/lib/content";

/**
 * An interlude comparing the birth name against the name now in daily use.
 * The birth name is held to fix the chart; the used name colours how that
 * chart is expressed in the world.
 */
export function NameNowBorne({
  birthName,
  currentName,
  yAsVowel,
}: {
  birthName: string;
  currentName: string;
  yAsVowel: boolean;
}) {
  const birth = nameNumbers(birthName, yAsVowel);
  const now = nameNumbers(currentName, yAsVowel);

  const rows: Array<{
    label: string;
    from: NumberInsight;
    to: NumberInsight;
    meanings: Record<string, NumberMeaning>;
  }> = [
    { label: "Expression", from: birth.expression, to: now.expression, meanings: expressionMeanings },
    { label: "Soul Urge", from: birth.soulUrge, to: now.soulUrge, meanings: soulUrgeMeanings },
    { label: "Personality", from: birth.personality, to: now.personality, meanings: personalityMeanings },
  ];

  const gap = Math.abs(
    reduceNumber(birth.expression.value, false) -
      reduceNumber(now.expression.value, false),
  );
  const bridge = pick(bridgeMeanings, gap);
  const anyChange = rows.some((r) => r.from.value !== r.to.value);

  return (
    <section className="space-y-6">
      <header className="text-center">
        <p className="eyebrow">An Interlude</p>
        <h2 className="mt-2 font-display text-3xl text-mystic-50">
          The Name Now Borne
        </h2>
        <div className="rule-ornament mt-3 text-sm">☙</div>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-mystic-200/75">
          The name given at birth fixes the chart; the name{" "}
          <span className="italic text-gold-200">{currentName}</span>, borne in
          daily use, colours how that chart is worn.{" "}
          {anyChange
            ? "Where the numbers differ, the used name bends the birth chart toward new registers."
            : "Its numbers agree entirely with the birth name: the chart is worn exactly as it was written."}
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {rows.map((r) => {
          const changed = r.from.value !== r.to.value;
          return (
            <div key={r.label} className="glass p-5 text-center">
              <p className="eyebrow">{r.label}</p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <NumberOrb value={r.from.value} size="sm" isMaster={r.from.isMaster} />
                <span className="text-gold-400/70" aria-hidden>
                  {changed ? "→" : "="}
                </span>
                <NumberOrb value={r.to.value} size="sm" isMaster={r.to.isMaster} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-mystic-200/75">
                {changed ? (
                  <>
                    from{" "}
                    <span className="text-mystic-50">
                      {pick(r.meanings, r.from.value)?.title ?? r.from.value}
                    </span>{" "}
                    toward{" "}
                    <span className="text-gold-200">
                      {pick(r.meanings, r.to.value)?.title ?? r.to.value}
                    </span>
                  </>
                ) : (
                  <>
                    unchanged —{" "}
                    <span className="text-mystic-50">
                      {pick(r.meanings, r.to.value)?.title ?? r.to.value}
                    </span>
                  </>
                )}
              </p>
            </div>
          );
        })}
      </div>

      {bridge && anyChange && (
        <div className="glass p-6">
          <p className="eyebrow">
            The bridge between the two expressions · {gap}
          </p>
          <h3 className="mt-1 font-display text-lg text-mystic-50">
            {bridge.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-mystic-200/75">
            {bridge.summary}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-mystic-100/85">
            <span className="text-gold-300">Counsel: </span>
            {bridge.advice}
          </p>
        </div>
      )}
    </section>
  );
}
