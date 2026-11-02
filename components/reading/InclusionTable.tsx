import type { ValueCounts } from "@/lib/numerology";

const VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

/**
 * The Inclusion table: how many letters of the full name carry each value
 * 1-9. It is the tally Karmic Lessons (the zeros) and Hidden Passion (the
 * highest count) are read from, shown so the reduction stays visible.
 */
export function InclusionTable({
  counts,
  passion,
}: {
  counts: ValueCounts;
  passion: number[];
}) {
  return (
    <div>
      <h3 className="mono-label mb-3">Inclusion table</h3>
      <dl className="divided grid-cols-3 sm:grid-cols-9">
        {VALUES.map((v) => {
          const count = counts[v] ?? 0;
          const isLesson = count === 0;
          const isPassion = passion.includes(v);
          return (
            <div
              key={v}
              data-value={v}
              data-count={count}
              className={isPassion ? "bg-gold-300/[0.05] p-4 text-center" : "p-4 text-center"}
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-400">
                {v}s
              </dt>
              <dd
                className={
                  isLesson
                    ? "mt-1 font-mono text-2xl tabular text-bone-500"
                    : isPassion
                      ? "mt-1 font-mono text-2xl tabular text-gold-200"
                      : "mt-1 font-mono text-2xl tabular text-bone-50"
                }
              >
                {count}
              </dd>
              {isLesson && <dd className="mt-1 font-mono text-[10px] uppercase text-bone-500">lesson</dd>}
              {isPassion && <dd className="mt-1 font-mono text-[10px] uppercase text-gold-200">passion</dd>}
            </div>
          );
        })}
      </dl>
    </div>
  );
}
