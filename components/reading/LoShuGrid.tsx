import type { LoShuResult } from "@/lib/numerology";
import { LO_SHU_SQUARE } from "@/lib/numerology";
import {
  loShuContent,
  type LoShuArrow,
} from "@/lib/content";

function arrowFor(line: [number, number, number]): LoShuArrow | undefined {
  const key = line.join("-");
  return loShuContent.arrows.find((a) => a.line.join("-") === key);
}

/**
 * The Lo Shu birth grid: the digits of the birth date placed in the ancient
 * magic square, with the Arrows of strength and weakness read from its lines.
 */
export function LoShuGrid({ result }: { result: LoShuResult }) {
  return (
    <div className="space-y-6">
      <p className="text-note">
        {loShuContent._intro} {loShuContent._method}
      </p>

      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
        {/* The square — decorative for AT; the sr-only summary below carries the data. */}
        <div className="shrink-0">
          <p className="sr-only">
            The Lo Shu grid of this birth date:{" "}
            {LO_SHU_SQUARE.flat()
              .map((digit) => {
                const count = result.counts[digit] ?? 0;
                return count > 0
                  ? `the digit ${digit} appears ${count} ${count === 1 ? "time" : "times"}`
                  : `the digit ${digit} is absent`;
              })
              .join("; ")}
            .
          </p>
          <div className="grid grid-cols-3" aria-hidden="true">
            {LO_SHU_SQUARE.flat().map((digit, i) => {
              const count = result.counts[digit] ?? 0;
              return (
                <div
                  key={i}
                  className="flex h-24 w-24 flex-col items-center justify-center border border-gold-500/30 sm:h-28 sm:w-28"
                  style={{ background: "rgba(14,10,6,0.7)" }}
                >
                  {count > 0 ? (
                    <span className="font-display text-2xl tracking-[0.2em] text-gold-200 sm:text-3xl">
                      {String(digit).repeat(Math.min(count, 4))}
                      {count > 4 ? "⁺" : ""}
                    </span>
                  ) : (
                    <span className="text-lg text-mystic-700">·</span>
                  )}
                  <span className="mt-1 text-xs uppercase tracking-[0.2em] text-mystic-300/85">
                    {digit}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* The arrows */}
        <div className="w-full space-y-5">
          {result.strengths.length > 0 && (
            <div>
              <p className="term term-gold">Arrows of Strength</p>
              <ul className="mt-2 space-y-3">
                {result.strengths.map((line) => {
                  const a = arrowFor(line);
                  if (!a) return null;
                  return (
                    <li key={line.join("-")} className="text-sm leading-relaxed">
                      <span className="font-display text-base text-mystic-50">
                        {a.presentName}
                      </span>{" "}
                      <span className="text-mystic-300/85">
                        ({line.join(" · ")})
                      </span>
                      <span className="block text-mystic-200/75">{a.present}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {result.weaknesses.length > 0 && (
            <div>
              <p className="term" style={{ color: "var(--color-blood-300)" }}>
                Arrows of Weakness
              </p>
              <ul className="mt-2 space-y-3">
                {result.weaknesses.map((line) => {
                  const a = arrowFor(line);
                  if (!a) return null;
                  return (
                    <li key={line.join("-")} className="text-sm leading-relaxed">
                      <span className="font-display text-base text-mystic-50">
                        {a.absentName}
                      </span>{" "}
                      <span className="text-mystic-300/85">
                        ({line.join(" · ")})
                      </span>
                      <span className="block text-mystic-200/75">{a.absent}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {result.strengths.length === 0 && result.weaknesses.length === 0 && (
            <p className="text-note">
              Your grid completes no full line and empties none: a chart of
              scattered talents rather than single arrows, free to lean where
              it will.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
