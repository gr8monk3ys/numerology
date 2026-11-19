/**
 * The written-out working behind each core number: the addends the engine
 * summed, then the reduction chain. Display only; the numbers themselves come
 * from the insights already computed.
 */
import { classifyLetters } from "./letters";
import { toInsight, type NumberInsight } from "./reduce";
import type { Reading } from "./report";

const chain = (insight: NumberInsight) => insight.steps.join(" → ");

/** "1+4+1 + 2+7+9 = 24 → 6": one group of digits per name, then the chain. */
function lettersWorking(reading: Reading, insight: NumberInsight, keep: (isVowel: boolean) => boolean): string {
  const groups = reading.name.all
    .map((token) =>
      classifyLetters(token, "pythagorean", reading.yAsVowel)
        .filter((l) => keep(l.isVowel))
        .map((l) => l.value)
        .join("+"),
    )
    .filter(Boolean);
  return groups.length ? `${groups.join(" + ")} = ${chain(insight)}` : chain(insight);
}

export interface CoreWorkings {
  lifePath: string;
  expression: string;
  soulUrge: string;
  personality: string;
  birthday: string;
  maturity: string;
}

export function coreWorkings(reading: Reading): CoreWorkings {
  const { core, birth } = reading;
  // Life Path reduces month, day and year separately before adding them.
  const parts = [birth.month, birth.day, birth.year].map((n) => toInsight(n));
  const reduced = parts.filter((p) => p.steps.length > 1).map(chain);
  const lifePath = `${reduced.length ? `${reduced.join(", ")}; ` : ""}${parts.map((p) => p.value).join(" + ")} = ${chain(core.lifePath)}`;
  return {
    lifePath,
    expression: lettersWorking(reading, core.expression, () => true),
    soulUrge: lettersWorking(reading, core.soulUrge, (isVowel) => isVowel),
    personality: lettersWorking(reading, core.personality, (isVowel) => !isVowel),
    birthday: chain(core.birthday),
    maturity: `${core.lifePath.value} + ${core.expression.value} = ${chain(core.maturity)}`,
  };
}
