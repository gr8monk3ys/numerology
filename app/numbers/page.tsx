import type { Metadata } from "next";
import Link from "next/link";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  lifePathMeanings,
  correspondences,
  CORE_NUMBER_KEYS,
  pick,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "A Lexicon of the Numbers",
  description:
    "The meanings of the numbers one through nine and the master numbers 11, 22 and 33, with their tarot, planetary and elemental correspondences.",
};

export default function NumbersIndexPage() {
  return (
    <div className="container-page py-16">
      <SectionHeading
        as="h1"
        eyebrow="Chapter the Fifth"
        title="A Lexicon of the Numbers"
        subtitle="Nine digits and three master numbers, each an archetype with its own character, virtues and trials. Turn to any entry."
        align="center"
        className="mb-14"
      />

      <div className="mx-auto max-w-3xl">
        <ol className="divide-y divide-gold-500/15 border-y border-gold-500/25">
          {CORE_NUMBER_KEYS.map((key) => {
            const meaning = pick(lifePathMeanings, key);
            const corr = pick(correspondences, key);
            const isMaster = key === "11" || key === "22" || key === "33";
            return (
              <li key={key}>
                <Link
                  href={`/numbers/${key}`}
                  className="group flex items-center gap-5 px-2 py-5 transition-colors hover:bg-gold-500/[0.04] sm:gap-7 sm:px-4"
                >
                  <NumberOrb value={key} size="sm" isMaster={isMaster} />
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-baseline gap-x-3">
                      <span className="font-display text-2xl text-mystic-50 transition-colors group-hover:text-gold-200">
                        {meaning?.title ?? `Number ${key}`}
                      </span>
                      {isMaster && (
                        <span className="eyebrow">master number</span>
                      )}
                    </p>
                    {meaning?.summary && (
                      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-mystic-300/75">
                        {meaning.summary}
                      </p>
                    )}
                    {corr?.tarot && (
                      <p className="term term-muted mt-1.5 block">
                        tarot · {corr.tarot}
                      </p>
                    )}
                  </div>
                  <span
                    className="text-gold-400/60 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  >
                    ❧
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
