import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { MeaningBlock } from "@/components/numbers/MeaningBlock";
import { isMaster as isMasterNumber } from "@/lib/numerology";
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

  const isMaster = isMasterNumber(Number(number));
  const primary = pick(lifePathMeanings, number);
  const corr = pick(correspondences, number);
  const master = isMaster ? pick(masterMeanings, number) : undefined;

  return (
    <div className="container-page py-16">
      <Link href="/numbers" className="action-quiet no-underline">
        ← return to the Lexicon
      </Link>

      {/* Entry heading */}
      <div className="glass-strong relative mt-8 overflow-hidden px-6 py-12 text-center sm:px-12">
        <div className="bg-cosmic-radial pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative flex flex-col items-center gap-5">
          <NumberOrb value={number} size="xl" isMaster={isMaster} />
          <div>
            {isMaster && <p className="eyebrow">Master Number</p>}
            <h1 className="mt-2 font-display text-5xl text-mystic-50">
              {primary?.title ?? `Number ${number}`}
            </h1>
          </div>
          <div className="rule-ornament text-sm">❧</div>
          {primary?.summary && (
            <p className="max-w-2xl leading-relaxed text-mystic-100/85">
              {primary.summary}
            </p>
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
              <p className="term mb-2 block text-aura-400">Gifts</p>
              <ul className="space-y-1 text-sm text-mystic-200/80">
                {master.gifts.map((g) => (
                  <li key={g} className="flex gap-2">
                    <span className="text-aura-400/80" aria-hidden>✦</span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="term mb-2 block text-blood-300">Trials</p>
              <ul className="space-y-1 text-sm text-mystic-200/80">
                {master.challenges.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="text-blood-300/80" aria-hidden>◇</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* The number in each office */}
      <div className="mt-10 space-y-5">
        <MeaningBlock context="Life Path" meaning={pick(lifePathMeanings, number)} />
        <MeaningBlock context="Expression" meaning={pick(expressionMeanings, number)} />
        <MeaningBlock context="Soul Urge" meaning={pick(soulUrgeMeanings, number)} />
        <MeaningBlock context="Personality" meaning={pick(personalityMeanings, number)} />
      </div>

      {/* Correspondences */}
      {corr && (
        <div className="mt-12">
          <div className="chapter-head">
            <h2 className="font-display text-3xl text-mystic-50">
              The Correspondences
            </h2>
            <span className="h-px flex-1 bg-gradient-to-r from-gold-500/40 to-transparent" />
            <span className="chapter-glyph" aria-hidden>♃</span>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <CorrCell label="Tarot" value={corr.tarot} />
            <CorrCell label="Ruling Planet" value={corr.rulingPlanet} />
            <CorrCell label="Zodiac" value={corr.zodiac} />
            <CorrCell label="Element" value={corr.element} />
            <CorrCell label="Chakra" value={corr.chakra} />
            <CorrCell label="Day of the Week" value={corr.dayOfWeek} />
            <CorrCell label="Colours" value={corr.colors?.join(", ")} />
            <CorrCell label="Stones" value={corr.gemstones?.join(", ")} />
            <CorrCell label="Metal" value={corr.metal} />
            <CorrCell label="Musical Note" value={corr.musicalNote} />
          </div>
        </div>
      )}

      <div className="mt-14 text-center">
        <Link href="/reading" className="btn-primary">
          Find your own numbers
        </Link>
      </div>

      {/* Turn the page */}
      <PageTurn current={number} />
    </div>
  );
}

function PageTurn({ current }: { current: string }) {
  const idx = (CORE_NUMBER_KEYS as readonly string[]).indexOf(current);
  const prev = idx > 0 ? CORE_NUMBER_KEYS[idx - 1] : null;
  const next = idx < CORE_NUMBER_KEYS.length - 1 ? CORE_NUMBER_KEYS[idx + 1] : null;

  return (
    <nav
      aria-label="Turn the page"
      className="mt-14 flex items-baseline justify-between border-t border-gold-500/20 pt-6"
    >
      {prev ? (
        <Link href={`/numbers/${prev}`} className="action-quiet no-underline">
          ← {prev} · {pick(lifePathMeanings, prev)?.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`/numbers/${next}`} className="action-quiet no-underline">
          {next} · {pick(lifePathMeanings, next)?.title} →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

function CorrCell({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="glass p-4">
      <p className="eyebrow">{label}</p>
      <p className="mt-1 font-display text-lg text-mystic-50">{value}</p>
    </div>
  );
}
