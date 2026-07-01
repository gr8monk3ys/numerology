/**
 * Combines the esoteric engine functions with their content datasets to build a
 * display-ready "cosmic profile" for a reading.
 */

import {
  tarotBirthCard,
  sunSign,
  chineseZodiac,
  planesOfExpression,
  lifeCycles,
  bridgeNumbers,
  type Reading,
  type TarotBirthCard,
  type PlanesResult,
  type LifeCycle,
  type ZodiacSign,
  type ChineseZodiacSign,
} from "@/lib/numerology";
import {
  tarotMajor,
  zodiacSignsData,
  chineseZodiacData,
  planesContent,
  lifeCyclesContent,
  bridgeMeanings,
  correspondences,
  pick,
  type TarotCard,
  type BridgeMeaning,
  type PlanesContent,
} from ".";

export interface CosmicCycle extends LifeCycle {
  title: string;
  framing: string;
  meaning?: string;
}

export interface CosmicBridge {
  key: string;
  label: string;
  between: string;
  value: number;
  meaning?: BridgeMeaning;
}

export interface CosmicProfile {
  tarot: { card: TarotBirthCard; personality?: TarotCard; soul?: TarotCard };
  sun?: ZodiacSign;
  chinese: ChineseZodiacSign;
  planes: { result: PlanesResult; content: PlanesContent };
  cycles: CosmicCycle[];
  bridges: CosmicBridge[];
  lucky: { numbers: number[]; day?: string; colors?: string[]; gem?: string };
}

export function buildCosmicProfile(reading: Reading): CosmicProfile {
  const { birth, fullName, core, advanced } = reading;

  const tc = tarotBirthCard(birth);
  const positions = [
    lifeCyclesContent.positions.first,
    lifeCyclesContent.positions.second,
    lifeCyclesContent.positions.third,
  ];
  const cycles: CosmicCycle[] = lifeCycles(birth).map((c, i) => ({
    ...c,
    title: positions[i].title,
    framing: positions[i].framing,
    meaning: pick(lifeCyclesContent.numbers, c.value)?.summary,
  }));

  const br = bridgeNumbers({
    lifePath: core.lifePath.value,
    expression: core.expression.value,
    soulUrge: core.soulUrge.value,
    personality: core.personality.value,
  });
  const bridges: CosmicBridge[] = [
    {
      key: "lp-ex",
      label: "Life Path ✦ Expression",
      between: "your purpose and your talents",
      value: br.lifePathExpression,
      meaning: pick(bridgeMeanings, br.lifePathExpression),
    },
    {
      key: "su-pe",
      label: "Soul Urge ✦ Personality",
      between: "your inner heart and your outer mask",
      value: br.soulUrgePersonality,
      meaning: pick(bridgeMeanings, br.soulUrgePersonality),
    },
  ];

  const corr = pick(correspondences, core.lifePath.value);
  const luckySet = [
    core.lifePath.value,
    core.expression.value,
    core.birthday.value,
    advanced.hiddenPassion[0],
  ].filter((n): n is number => typeof n === "number");

  return {
    tarot: {
      card: tc,
      personality: pick(tarotMajor, tc.personality),
      soul: pick(tarotMajor, tc.soul),
    },
    sun: sunSign(birth.month, birth.day, zodiacSignsData),
    chinese: chineseZodiac(birth.year, chineseZodiacData),
    planes: { result: planesOfExpression(fullName), content: planesContent },
    cycles,
    bridges,
    lucky: {
      numbers: Array.from(new Set(luckySet)),
      day: corr?.dayOfWeek,
      colors: corr?.colors,
      gem: corr?.gemstones?.[0],
    },
  };
}
