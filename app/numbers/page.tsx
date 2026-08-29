import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  lifePathMeanings,
  correspondences,
  CORE_NUMBER_KEYS,
  pick,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Number Meanings",
  description:
    "An encyclopedia of numerology number meanings — 1 through 9 plus the master numbers 11, 22 and 33, with tarot and astrological correspondences.",
};

export default function NumbersIndexPage() {
  return (
    <div className="container-page py-16">
      <SectionHeading
        eyebrow="The encyclopedia"
        title="Meanings of the numbers"
        subtitle="Every number is an archetype with its own personality, gifts and shadows. Explore the single digits and the sacred master numbers."
        align="center"
        className="mb-14"
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CORE_NUMBER_KEYS.map((key) => {
          const meaning = pick(lifePathMeanings, key);
          const corr = pick(correspondences, key);
          const isMaster = key === "11" || key === "22" || key === "33";
          return (
            <Link
              key={key}
              href={`/numbers/${key}`}
              className="glass group relative flex flex-col gap-4 p-6 transition-colors hover:border-mystic-400/30"
            >
              <ArrowUpRight className="absolute right-5 top-5 h-4 w-4 text-mystic-300/70 transition-colors group-hover:text-gold-300" />
              <div className="flex items-center gap-4">
                <NumberOrb value={key} size="md" isMaster={isMaster} />
                <div>
                  <h3 className="font-display text-xl text-mystic-50">
                    {meaning?.title ?? `Number ${key}`}
                  </h3>
                  {isMaster && <Chip tone="gold">Master Number</Chip>}
                </div>
              </div>
              {meaning?.summary && (
                <p className="line-clamp-3 text-sm leading-relaxed text-mystic-200/85">
                  {meaning.summary}
                </p>
              )}
              {corr?.tarot && (
                <span className="mt-auto text-xs text-mystic-300/85">
                  Tarot · {corr.tarot}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
