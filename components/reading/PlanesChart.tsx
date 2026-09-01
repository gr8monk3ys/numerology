import type { PlanesResult, Plane } from "@/lib/numerology";
import type { PlanesContent } from "@/lib/content";

/**
 * Planes of Expression distribution — a single-series magnitude chart.
 * Fixed category order, one hue (identity carried by the row label, not
 * colour), direct value labels, recessive track.
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
    <div className="frame">
      <p className="border-b hairline p-5 text-sm leading-relaxed text-bone-300 sm:p-6">
        {content._intro}
      </p>
      <div className="space-y-5 p-5 sm:p-6">
        {ORDER.map((plane) => {
          const count = result[plane];
          const pct = result.percentages[plane];
          const width = (count / max) * 100;
          const isDominant = plane === result.dominant && count > 0;
          return (
            <div key={plane}>
              <div className="mb-2 flex items-baseline justify-between">
                <span className="flex items-center gap-2 text-sm text-bone-50">
                  {content[plane].title}
                  {isDominant && <span className="tag tag-accent">Dominant</span>}
                </span>
                <span className="font-mono text-xs text-bone-300 tabular">
                  {count} <span className="text-bone-500">· {pct}%</span>
                </span>
              </div>
              <div className="meter">
                <span
                  style={{
                    width: `${Math.max(width, count > 0 ? 3 : 0)}%`,
                    backgroundColor: isDominant ? "var(--color-gold-300)" : "var(--color-gold-600)",
                  }}
                  title={`${content[plane].title}: ${count} letters (${pct}%)`}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="border-t hairline p-5 text-sm text-bone-300 sm:p-6">
        <span className="text-gold-200">{content[result.dominant].title} plane · </span>
        {content[result.dominant].meaning}
      </p>
    </div>
  );
}
