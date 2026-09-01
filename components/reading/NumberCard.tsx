"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import clsx from "clsx";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";
import type { NumberInsight } from "@/lib/numerology";
import type { NumberMeaning } from "@/lib/content";

export interface NumberCardProps {
  label: string;
  insight: NumberInsight;
  meaning?: NumberMeaning;
  blurb?: string;
  defaultOpen?: boolean;
}

export function NumberCard({
  label,
  insight,
  meaning,
  blurb,
  defaultOpen = false,
}: NumberCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={clsx("frame transition-colors", open && "hairline-strong")}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-surface-raised sm:p-5"
      >
        <NumberOrb
          value={insight.value}
          size="sm"
          isMaster={insight.isMaster}
          isKarmic={insight.karmicDebt !== null}
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mono-label">{label}</span>
            {insight.isMaster && <Chip tone="gold">Master</Chip>}
            {insight.karmicDebt && <Chip tone="rubric">Karmic {insight.karmicDebt}</Chip>}
          </div>
          <h3 className="mt-0.5 truncate text-lg">
            {meaning?.title ?? blurb ?? `Number ${insight.value}`}
          </h3>
        </div>
        <span className="hidden font-mono text-[11px] text-bone-500 sm:inline">
          {insight.steps.join(" → ")}
        </span>
        <Plus
          className={clsx(
            "h-4 w-4 shrink-0 text-bone-400 transition-transform duration-200",
            open && "rotate-45 text-gold-300",
          )}
        />
      </button>

      {open && (
        <div className="space-y-5 border-t hairline px-4 pb-5 pt-4 sm:px-5">
          {meaning?.keywords && (
            <div className="flex flex-wrap gap-1.5">
              {meaning.keywords.map((k) => (
                <Chip key={k} tone="muted">{k}</Chip>
              ))}
            </div>
          )}
          {meaning?.summary && (
            <p className="text-[15px] leading-relaxed text-bone-50">{meaning.summary}</p>
          )}
          {meaning?.detailed && (
            <p className="whitespace-pre-line text-sm leading-relaxed text-bone-300">
              {meaning.detailed}
            </p>
          )}
          {(meaning?.strengths || meaning?.challenges) && (
            <div className="divided sm:grid-cols-2">
              {meaning?.strengths && (
                <div className="p-4">
                  <h4 className="mono-label mb-3 text-sage-400">Strengths</h4>
                  <ul className="space-y-1.5 text-sm text-bone-200">
                    {meaning.strengths.map((s) => (
                      <li key={s} className="flex gap-2.5">
                        <span className="font-mono text-sage-400">+</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {meaning?.challenges && (
                <div className="p-4">
                  <h4 className="mono-label mb-3 text-rubric-300">Challenges</h4>
                  <ul className="space-y-1.5 text-sm text-bone-200">
                    {meaning.challenges.map((c) => (
                      <li key={c} className="flex gap-2.5">
                        <span className="font-mono text-rubric-300">−</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          <p className="font-mono text-[11px] tracking-wider text-bone-500">
            REDUCTION {insight.steps.join(" → ")}
            {insight.karmicDebt ? ` · CARRIES KARMIC DEBT ${insight.karmicDebt}` : ""}
          </p>
        </div>
      )}
    </div>
  );
}
