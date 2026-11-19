"use client";

import type { CompatibilityResult } from "@/lib/numerology";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";
import { SectionRow } from "@/components/ui/SectionHeading";
import { compatibilityProfiles, lifePathMeanings, pick } from "@/lib/content";

export interface Outcome {
  result: CompatibilityResult;
  aLabel: string;
  bLabel: string;
}

/**
 * The comparison once computed. Split from the form and loaded on demand: it
 * is the only part that reads the profile and meaning datasets
 * (bundle-dynamic-imports).
 */
export function CompatibilityReport({ outcome }: { outcome: Outcome }) {
  const { result, aLabel, bLabel } = outcome;
  const aProfile = pick(compatibilityProfiles, result.a);
  const bProfile = pick(compatibilityProfiles, result.b);

  return (
    <div className="mt-16 space-y-10">
      <div className="frame-raised p-6 sm:p-10">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <NumberOrb value={result.a} size="lg" isMaster={isMaster(result.a)} />
              <p className="label mt-2 max-w-20 truncate">{aLabel}</p>
            </div>
            <span aria-hidden="true" className="font-figures text-bone-500">×</span>
            <div className="text-center">
              <NumberOrb value={result.b} size="lg" isMaster={isMaster(result.b)} />
              <p className="label mt-2 max-w-20 truncate">{bLabel}</p>
            </div>
          </div>

          <div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl">{result.headline}</h2>
                <span className="label-accent">Harmony</span>
              </div>
              <span className="font-figures text-4xl text-gold-200 tabular sm:text-5xl">
                {result.score}
                <span className="text-xl text-bone-500">%</span>
              </span>
            </div>
            <div className="meter mt-5">
              <span style={{ transform: `scaleX(${result.score / 100})` }} />
            </div>
            <div className="mt-2 flex justify-between font-figures text-base text-bone-500">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-6">
        <SectionRow title="Each life path" />
        <div className="divided md:grid-cols-2">
          {[
            { lp: result.a, label: aLabel, profile: aProfile },
            { lp: result.b, label: bLabel, profile: bProfile },
          ].map(({ lp, label, profile }, i) => (
            <div key={`${label}-${i}`} className="p-6">
              <div className="flex items-center gap-4">
                <NumberOrb value={lp} size="sm" isMaster={isMaster(lp)} />
                <div className="min-w-0">
                  <span className="label block truncate">{label} · Life Path {lp}</span>
                  <h3 className="text-lg">{pick(lifePathMeanings, lp)?.title}</h3>
                </div>
              </div>
              {profile?.summary && <p className="mt-4 text-base text-bone-300">{profile.summary}</p>}
              {profile && (
                <div className="mt-5 space-y-2.5">
                  <MatchRow label="Best" tone="gold" items={profile.bestMatches} />
                  <MatchRow label="Good" tone="plain" items={profile.goodMatches} />
                  <MatchRow label="Growth" tone="muted" items={profile.challengingMatches} />
                </div>
              )}
              {profile?.advice && (
                <p className="mt-5 border-t hairline pt-4 text-base text-bone-100">
                  <span className="text-gold-200">Advice · </span>
                  {profile.advice}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function MatchRow({
  label,
  items,
  tone,
}: {
  label: string;
  items?: string[];
  tone: "gold" | "plain" | "muted";
}) {
  if (!items?.length) return null;
  return (
    <div className="flex items-center gap-3">
      <span className="label w-14 shrink-0">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {items.map((n) => (
          <Chip key={n} tone={tone}>{n}</Chip>
        ))}
      </div>
    </div>
  );
}

function isMaster(n: number) {
  return n === 11 || n === 22 || n === 33;
}
