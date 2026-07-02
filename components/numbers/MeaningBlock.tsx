import { Chip } from "@/components/ui/Chip";
import { TraitColumns } from "@/components/ui/TraitColumns";
import type { NumberMeaning } from "@/lib/content";

export function MeaningBlock({
  context,
  meaning,
}: {
  context: string;
  meaning?: NumberMeaning;
}) {
  if (!meaning) return null;
  return (
    <div className="glass p-6 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="eyebrow">In the office of {context}</p>
        <h2 className="font-display text-xl text-mystic-50">{meaning.title}</h2>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-mystic-100/85">
        {meaning.summary}
      </p>
      {meaning.detailed && (
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-mystic-200/70">
          {meaning.detailed}
        </p>
      )}
      <div className="mt-4">
        <TraitColumns
          virtues={{ label: "Virtues", items: meaning.strengths }}
          trials={{ label: "Trials", items: meaning.challenges }}
        />
      </div>
      <div className="term-row mt-4">
        {meaning.keywords.map((k) => (
          <Chip key={k} tone="muted">
            {k}
          </Chip>
        ))}
      </div>
    </div>
  );
}
