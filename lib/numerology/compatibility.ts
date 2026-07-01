/**
 * Relationship compatibility between two Life Path numbers.
 *
 * The descriptive best/good/challenging match lists live in
 * content/data/compatibility.json; this module turns them into a symmetric
 * harmony score so the same data drives both the number and the prose.
 */

export interface CompatibilityProfile {
  summary: string;
  bestMatches: string[];
  goodMatches: string[];
  challengingMatches: string[];
  advice: string;
}

export type CompatibilityData = Record<string, CompatibilityProfile>;

export type CompatibilityTier =
  | "soulmates"
  | "harmonious"
  | "balanced"
  | "growth";

export interface CompatibilityResult {
  a: number;
  b: number;
  score: number; // 0-100
  tier: CompatibilityTier;
  headline: string;
}

function directionalScore(
  from: number,
  to: number,
  data: CompatibilityData,
): number {
  const profile = data[String(from)];
  if (!profile) return 60;
  const target = String(to);
  if (profile.bestMatches?.includes(target)) return 100;
  if (profile.goodMatches?.includes(target)) return 78;
  if (profile.challengingMatches?.includes(target)) return 42;
  return 62;
}

function tierFor(score: number): CompatibilityTier {
  if (score >= 88) return "soulmates";
  if (score >= 70) return "harmonious";
  if (score >= 55) return "balanced";
  return "growth";
}

const HEADLINES: Record<CompatibilityTier, string> = {
  soulmates: "A luminous, natural union",
  harmonious: "A warm and supportive match",
  balanced: "A steady partnership with room to grow",
  growth: "A karmic, lesson-rich pairing",
};

export function computeCompatibility(
  aLifePath: number,
  bLifePath: number,
  data: CompatibilityData,
): CompatibilityResult {
  const score = Math.round(
    (directionalScore(aLifePath, bLifePath, data) +
      directionalScore(bLifePath, aLifePath, data)) /
      2,
  );
  const tier = tierFor(score);
  return {
    a: aLifePath,
    b: bLifePath,
    score,
    tier,
    headline: HEADLINES[tier],
  };
}
