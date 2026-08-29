import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";
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

  return (
    <div className="container-page py-16">
      <Link
        href="/numbers"
        className="inline-flex items-center gap-2 text-sm text-mystic-200/85 hover:text-gold-200"
      >
        <ArrowLeft className="h-4 w-4" /> All numbers
      </Link>

      {/* Hero */}
      <div className="glass-strong relative mt-6 overflow-hidden p-8 text-center sm:p-12">
        <div className="bg-cosmic-radial pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative flex flex-col items-center gap-5">
          <NumberOrb value={number} size="xl" isMaster={isMaster} />
          <div>
            {isMaster && <Chip tone="gold">Master Number</Chip>}
            <h1 className="mt-2 font-display text-4xl text-mystic-50">
              {primary?.title ?? `Number ${number}`}
            </h1>
          </div>
          {primary?.summary && (
            <p className="max-w-2xl text-mystic-100/85">{primary.summary}</p>
          )}
        </div>
      </div>

      {/* Master deep dive */}
      {master && (
        <div className="glass mt-8 p-6 sm:p-8">
          <h2 className="font-display text-2xl text-gold-200">{master.title}</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-mystic-100/85">
            {master.detailed}
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-aura-400">
                Gifts
              </h4>
              <ul className="space-y-1 text-sm text-mystic-200/85">
                {master.gifts.map((g) => (
                  <li key={g} className="flex gap-2">
                    <span className="text-aura-400">✦</span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-rose-300/85">
                Challenges
              </h4>
              <ul className="space-y-1 text-sm text-mystic-200/85">
                {master.challenges.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="text-rose-300/85">◇</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Meanings across contexts */}
      <div className="mt-8 space-y-5">
        <MeaningBlock context="Life Path" meaning={pick(lifePathMeanings, number)} />
        <MeaningBlock context="Expression" meaning={pick(expressionMeanings, number)} />
        <MeaningBlock context="Soul Urge" meaning={pick(soulUrgeMeanings, number)} />
        <MeaningBlock context="Personality" meaning={pick(personalityMeanings, number)} />
      </div>

      {/* Correspondences */}
      {corr && (
        <div className="mt-10">
          <h2 className="mb-4 font-display text-2xl text-mystic-50">
            Correspondences
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <CorrCell label="Tarot" value={corr.tarot} />
            <CorrCell label="Ruling Planet" value={corr.rulingPlanet} />
            <CorrCell label="Zodiac" value={corr.zodiac} />
            <CorrCell label="Element" value={corr.element} />
            <CorrCell label="Chakra" value={corr.chakra} />
            <CorrCell label="Day of Week" value={corr.dayOfWeek} />
            <CorrCell label="Colors" value={corr.colors?.join(", ")} />
            <CorrCell label="Gemstones" value={corr.gemstones?.join(", ")} />
            <CorrCell label="Metal" value={corr.metal} />
            <CorrCell label="Musical Note" value={corr.musicalNote} />
          </div>
        </div>
      )}

      <div className="mt-12 text-center">
        <Link href="/reading" className="btn-primary">
          Find your own numbers
        </Link>
      </div>
    </div>
  );
}

function CorrCell({ label, value }: { label: string; value?: string }) {
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
