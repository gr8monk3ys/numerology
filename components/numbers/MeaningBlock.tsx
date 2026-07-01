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
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-300/80">
          As your {context}
        </span>
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
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {meaning.keywords.map((k) => (
          <Chip key={k} tone="muted">
            {k}
          </Chip>
        ))}
      </div>
    </div>
  );
}
