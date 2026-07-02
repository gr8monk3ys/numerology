import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { MeaningBlock } from "@/components/numbers/MeaningBlock";
import { ChapterHead } from "@/components/reading/Chapter";
import { CorrGrid } from "@/components/ui/CorrGrid";
import { TraitColumns } from "@/components/ui/TraitColumns";
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
          <div className="mt-5">
            <TraitColumns
              virtues={{ label: "Gifts", items: master.gifts }}
              trials={{ label: "Trials", items: master.challenges }}
            />
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
          <ChapterHead title="The Correspondences" glyph="♃" />
          <div className="mt-5">
            <CorrGrid corr={corr} />
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
