import { Chip } from "@/components/ui/Chip";
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
        <h3 className="font-display text-xl text-mystic-50">{meaning.title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-mystic-100/85">
        {meaning.summary}
      </p>
      {meaning.detailed && (
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-mystic-200/70">
          {meaning.detailed}
        </p>
      )}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="term mb-2 block text-aura-400">Virtues</p>
          <ul className="space-y-1 text-sm text-mystic-200/80">
            {meaning.strengths.map((s) => (
              <li key={s} className="flex gap-2">
                <span className="text-aura-400/80" aria-hidden>✦</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="term mb-2 block text-blood-300">Trials</p>
          <ul className="space-y-1 text-sm text-mystic-200/80">
            {meaning.challenges.map((c) => (
              <li key={c} className="flex gap-2">
                <span className="text-blood-300/80" aria-hidden>◇</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
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
