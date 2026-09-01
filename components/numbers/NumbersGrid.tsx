"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";
import {
  lifePathMeanings,
  correspondences,
  CORE_NUMBER_KEYS,
  pick,
} from "@/lib/content";

type Filter = "all" | "single" | "master";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "single", label: "1 – 9" },
  { key: "master", label: "Master" },
];

const isMasterKey = (k: string) => k === "11" || k === "22" || k === "33";

export function NumbersGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const keys = CORE_NUMBER_KEYS.filter((k) =>
    filter === "all" ? true : filter === "master" ? isMasterKey(k) : !isMasterKey(k),
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="segmented" role="group" aria-label="Filter numbers">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <span className="mono-label">{keys.length} entries</span>
      </div>

      <div className="divided sm:grid-cols-2 lg:grid-cols-3">
        {keys.map((key) => {
          const meaning = pick(lifePathMeanings, key);
          const corr = pick(correspondences, key);
          const isMaster = isMasterKey(key);
          return (
            <Link
              key={key}
              href={`/numbers/${key}`}
              className="cell-hover group relative flex flex-col gap-5 p-6"
            >
              <ArrowUpRight className="absolute right-5 top-5 h-4 w-4 text-bone-500 transition-colors group-hover:text-gold-300" />
              <div className="flex items-center gap-4">
                <NumberOrb value={key} size="md" isMaster={isMaster} />
                <div>
                  <span className="mono-label">{isMaster ? "Master number" : "Root number"}</span>
                  <h3 className="text-xl">{meaning?.title ?? `Number ${key}`}</h3>
                </div>
              </div>
              {meaning?.summary && (
                <p className="line-clamp-3 text-sm leading-relaxed text-bone-300">
                  {meaning.summary}
                </p>
              )}
              <div className="mt-auto flex flex-wrap items-center gap-1.5">
                {corr?.tarot && <Chip tone="muted">{corr.tarot}</Chip>}
                {corr?.element && <Chip tone="muted">{corr.element}</Chip>}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
