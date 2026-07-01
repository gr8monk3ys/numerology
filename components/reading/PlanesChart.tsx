import type { PlanesResult, Plane } from "@/lib/numerology";
import type { PlanesContent } from "@/lib/content";

/**
 * Planes of Expression distribution — a single-series magnitude chart.
 * Per the dataviz method: fixed category order, one hue (identity carried by the
 * row label, not colour), direct value labels, recessive track, values also
 * present as text so it reads without colour.
 */

const ORDER: Plane[] = ["physical", "mental", "emotional", "intuitive"];

export function PlanesChart({
  result,
  content,
}: {
  result: PlanesResult;
  content: PlanesContent;
}) {
  const max = Math.max(1, ...ORDER.map((p) => result[p]));

  return (
    <div className="glass p-6">
      <p className="text-sm leading-relaxed text-mystic-200/75">{content._intro}</p>
      <div className="mt-6 space-y-4">
        {ORDER.map((plane) => {
          const count = result[plane];
          const pct = result.percentages[plane];
          const width = (count / max) * 100;
          const isDominant = plane === result.dominant && count > 0;
          return (
            <div key={plane}>
              <div className="mb-1.5 flex items-baseline justify-between text-sm">
                <span className="flex items-center gap-2 text-mystic-100">
                  {content[plane].title}
                  {isDominant && (
                    <span className="rounded-full bg-gold-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-gold-200">
                      Dominant
                    </span>
                  )}
                </span>
                <span className="tabular-nums text-mystic-200/70">
                  {count} <span className="text-mystic-300/50">· {pct}%</span>
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.max(width, count > 0 ? 4 : 0)}%`,
                    background: isDominant
                      ? "linear-gradient(90deg, #a67e33, #edd694)"
                      : "linear-gradient(90deg, #4a3517, #a67e33)",
                  }}
                  title={`${content[plane].title}: ${count} letters (${pct}%)`}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-5 text-sm text-mystic-200/70">
        <span className="text-gold-300">{content[result.dominant].title} plane · </span>
        {content[result.dominant].meaning}
      </p>
    </div>
  );
}
