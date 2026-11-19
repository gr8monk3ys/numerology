import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";
import { SectionRow } from "@/components/ui/SectionHeading";
import { AdSlot } from "@/components/AdSense";
import { AD_SLOTS } from "@/lib/adsense";
import { MeaningBlock } from "@/components/numbers/MeaningBlock";
import {
  lifePathMeanings,
  expressionMeanings,
  soulUrgeMeanings,
  personalityMeanings,
  correspondences,
  masterMeanings,
  CORE_NUMBER_KEYS,
  pick,
} from "@/lib/content";

export function generateStaticParams() {
  return CORE_NUMBER_KEYS.map((number) => ({ number }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ number: string }>;
}): Promise<Metadata> {
  const { number } = await params;
  const m = pick(lifePathMeanings, number);
  return {
    title: m ? `${number} · ${m.title}` : `Number ${number}`,
    description: m?.summary,
  };
}

export default async function NumberDetailPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  if (!(CORE_NUMBER_KEYS as readonly string[]).includes(number)) {
    notFound();
  }

  const isMaster = number === "11" || number === "22" || number === "33";
  const primary = pick(lifePathMeanings, number);
  const corr = pick(correspondences, number);
  const master = isMaster ? pick(masterMeanings, number) : undefined;

  const i = CORE_NUMBER_KEYS.indexOf(number as (typeof CORE_NUMBER_KEYS)[number]);
  const prev = i > 0 ? CORE_NUMBER_KEYS[i - 1] : null;
  const next = i < CORE_NUMBER_KEYS.length - 1 ? CORE_NUMBER_KEYS[i + 1] : null;

  return (
    <div className="container-page py-14 sm:py-20">
      <div className="flex items-center justify-between">
        <Link
          href="/numbers"
          className="inline-flex items-center gap-2 font-figures text-base uppercase text-bone-400 hover:text-gold-200"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All numbers
        </Link>
        <div className="flex items-center gap-1">
          {prev && (
            <Link href={`/numbers/${prev}`} className="btn btn-ghost btn-sm" aria-label={`Number ${prev}`}>
              <ArrowLeft className="h-3.5 w-3.5" /> {prev}
            </Link>
          )}
          {next && (
            <Link href={`/numbers/${next}`} className="btn btn-ghost btn-sm" aria-label={`Number ${next}`}>
              {next} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Hero */}
      <div className="frame-raised mt-6 p-6 sm:p-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          <NumberOrb value={number} size="xl" isMaster={isMaster} />
          <div className="min-w-0 flex-1">
            <h1 className="text-4xl sm:text-5xl">{primary?.title ?? `Number ${number}`}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="label-accent">Number {number}</span>
              {isMaster && <Chip tone="rubric">Master number</Chip>}
            </div>
            {primary?.summary && (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-bone-100">{primary.summary}</p>
            )}
            {primary?.keywords && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {primary.keywords.map((k) => (
                  <Chip key={k} tone="gold">{k}</Chip>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Master deep dive */}
      {master && (
        <div className="frame mt-8">
          <div className="p-6 sm:p-8">
            <h2 className="text-3xl">As a master number</h2>
            <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-bone-200">{master.detailed}</p>
          </div>
          <div className="divided rounded-none border-x-0 border-b-0 sm:grid-cols-2">
            <div className="p-5 sm:p-6">
              <h3 className="label mb-3 text-sage-400">Gifts</h3>
              <ul className="space-y-1.5 text-base text-bone-200">
                {master.gifts.map((g) => (
                  <li key={g} className="flex gap-2.5">
                    <span aria-hidden="true" className="font-figures text-sage-400">+</span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 sm:p-6">
              <h3 className="label mb-3 text-bone-200">Challenges</h3>
              <ul className="space-y-1.5 text-base text-bone-200">
                {master.challenges.map((c) => (
                  <li key={c} className="flex gap-2.5">
                    <span aria-hidden="true" className="font-figures text-bone-400">−</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Meanings across contexts */}
      <section className="mt-16 space-y-6">
        <SectionRow title="In each position" meta="4 contexts" />
        <div className="space-y-3">
          <MeaningBlock context="Life Path" meaning={pick(lifePathMeanings, number)} />
          <MeaningBlock context="Expression" meaning={pick(expressionMeanings, number)} />
          <MeaningBlock context="Soul Urge" meaning={pick(soulUrgeMeanings, number)} />
          <MeaningBlock context="Personality" meaning={pick(personalityMeanings, number)} />
        </div>
      </section>

      {/* Correspondences */}
      {corr && (
        <section className="mt-16 space-y-6">
          <SectionRow title="Correspondences" />
          <div className="divided grid-cols-2 lg:grid-cols-3">
            <CorrCell label="Tarot" value={corr.tarot} />
            <CorrCell label="Ruling planet" value={corr.rulingPlanet} />
            <CorrCell label="Zodiac" value={corr.zodiac} />
            <CorrCell label="Element" value={corr.element} />
            <CorrCell label="Chakra" value={corr.chakra} />
            <CorrCell label="Day of week" value={corr.dayOfWeek} />
            <CorrCell label="Colors" value={corr.colors?.join(", ")} />
            <CorrCell label="Gemstones" value={corr.gemstones?.join(", ")} />
            <CorrCell label="Metal" value={corr.metal} />
            <CorrCell label="Musical note" value={corr.musicalNote} />
          </div>
        </section>
      )}

      <AdSlot slot={AD_SLOTS.content} className="mt-16" />

      <div className="frame-raised mt-16 flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl">Find your own numbers</h2>
        </div>
        <Link href="/reading" className="btn btn-primary">
          Cast my reading
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

function CorrCell({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="p-4">
      <span className="label">{label}</span>
      <p className="mt-1 text-base text-bone-50">{value}</p>
    </div>
  );
}
