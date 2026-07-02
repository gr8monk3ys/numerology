"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";
import { TraitColumns } from "@/components/ui/TraitColumns";
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
  const panelId = useId();

  return (
    <div className="glass overflow-hidden">
      {/* APG accordion: the heading wraps the trigger; only phrasing content inside. */}
      <h3 className="font-display">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-gold-500/[0.04]"
        >
          <NumberOrb
            value={insight.value}
            size="sm"
            isMaster={insight.isMaster}
            isKarmic={insight.karmicDebt !== null}
          />
          <span className="block min-w-0 flex-1">
            <span className="term-row">
              <span className="eyebrow">{label}</span>
              {insight.isMaster && <Chip tone="gold">master number</Chip>}
              {insight.karmicDebt && (
                <Chip tone="muted">karmic {insight.karmicDebt}</Chip>
              )}
            </span>
            <span className="mt-0.5 block truncate font-display text-xl text-mystic-50">
              {meaning?.title ?? blurb ?? `Number ${insight.value}`}
            </span>
          </span>
          <span
            className={clsx(
              "shrink-0 text-gold-400/70 transition-transform duration-300",
              open && "rotate-180",
            )}
            aria-hidden
          >
            ▾
          </span>
        </button>
      </h3>

      {/* Kept in the DOM when closed so the printed folio carries every card. */}
      <div
        id={panelId}
        className={clsx(
          !open && "hidden",
          "print:block",
          "space-y-4 border-t border-gold-500/20 px-5 pb-6 pt-4",
        )}
      >
          {meaning?.keywords && (
            <div className="term-row">
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
          <TraitColumns
            virtues={
              meaning?.strengths
                ? { label: "Virtues", items: meaning.strengths }
                : undefined
            }
            trials={
              meaning?.challenges
                ? { label: "Trials", items: meaning.challenges }
                : undefined
            }
          />
          <p className="pt-1 text-xs italic text-mystic-300/85">
            The reckoning: {insight.steps.join(" → ")}
            {insight.karmicDebt
              ? `; carrying the karmic debt ${insight.karmicDebt}`
              : ""}
          </p>
        </div>
    </div>
  );
}
