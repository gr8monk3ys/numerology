"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
    <div className="glass overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-white/[0.02]"
      >
        <NumberOrb
          value={insight.value}
          size="sm"
          isMaster={insight.isMaster}
          isKarmic={insight.karmicDebt !== null}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-300/80">
              {label}
            </span>
            {insight.isMaster && <Chip tone="gold">Master</Chip>}
            {insight.karmicDebt && <Chip tone="muted">Karmic {insight.karmicDebt}</Chip>}
          </div>
          <h3 className="mt-0.5 truncate font-display text-lg text-mystic-50">
            {meaning?.title ?? blurb ?? `Number ${insight.value}`}
          </h3>
        </div>
        <ChevronDown
          className={clsx(
            "h-5 w-5 shrink-0 text-mystic-300/60 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="space-y-4 border-t border-white/5 px-5 pb-6 pt-4">
          {meaning?.keywords && (
            <div className="flex flex-wrap gap-2">
              {meaning.keywords.map((k) => (
                <Chip key={k}>{k}</Chip>
              ))}
            </div>
          )}
          {meaning?.summary && (
            <p className="text-sm leading-relaxed text-mystic-100/90">
              {meaning.summary}
            </p>
          )}
          {meaning?.detailed && (
            <p className="whitespace-pre-line text-sm leading-relaxed text-mystic-200/70">
              {meaning.detailed}
            </p>
          )}
          {(meaning?.strengths || meaning?.challenges) && (
            <div className="grid gap-4 sm:grid-cols-2">
              {meaning?.strengths && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-aura-400">
                    Strengths
                  </h4>
                  <ul className="space-y-1 text-sm text-mystic-200/80">
                    {meaning.strengths.map((s) => (
                      <li key={s} className="flex gap-2">
                        <span className="text-aura-400">✦</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {meaning?.challenges && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-rose-300/80">
                    Challenges
                  </h4>
                  <ul className="space-y-1 text-sm text-mystic-200/80">
                    {meaning.challenges.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span className="text-rose-300/70">◇</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          <p className="pt-1 text-xs text-mystic-300/40">
            Reduction: {insight.steps.join(" → ")}
            {insight.karmicDebt ? `  ·  carries karmic debt ${insight.karmicDebt}` : ""}
          </p>
        </div>
      )}
    </div>
  );
}
