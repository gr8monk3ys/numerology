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
    <div className="frame">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b hairline px-5 py-4 sm:px-6">
        <span className="mono-label">As your {context}</span>
        <h3 className="text-xl">{meaning.title}</h3>
      </div>
      <div className="px-5 py-5 sm:px-6">
        <p className="text-[15px] leading-relaxed text-bone-100">{meaning.summary}</p>
        {meaning.detailed && (
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-bone-300">
            {meaning.detailed}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {meaning.keywords.map((k) => (
            <Chip key={k} tone="muted">{k}</Chip>
          ))}
        </div>
      </div>
      <div className="divided rounded-none border-x-0 border-b-0 sm:grid-cols-2">
        <div className="p-5 sm:px-6">
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
        <div className="p-5 sm:px-6">
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
      </div>
    </div>
  );
}
