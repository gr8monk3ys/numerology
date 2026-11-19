import { useId } from "react";
import { coreWorkings, type NumberInsight, type Reading } from "@/lib/numerology";

export interface DialNumber {
  label: string;
  insight: NumberInsight;
}

/** The six rings of a reading, outermost first: what each is summed from, and the working. */
export function coreRings(reading: Reading): (DialNumber & { source: string; working: string })[] {
  const c = reading.core;
  const w = coreWorkings(reading);
  return [
    { label: "Life Path", insight: c.lifePath, working: w.lifePath, source: "The direction of your life, summed from your birth date." },
    { label: "Expression", insight: c.expression, working: w.expression, source: "Your natural talents, summed from every letter of your name." },
    { label: "Soul Urge", insight: c.soulUrge, working: w.soulUrge, source: "Your heart’s desire, summed from the vowels." },
    { label: "Personality", insight: c.personality, working: w.personality, source: "The self you show the world, summed from the consonants." },
    { label: "Birthday", insight: c.birthday, working: w.birthday, source: "The gift of the day you were born." },
    { label: "Maturity", insight: c.maturity, working: w.maturity, source: "Who you become: Life Path and Expression together." },
  ];
}

const NUMERALS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
/** One ring per number, outermost first. The order never changes across the site. */
const RING_RADII = [372, 330, 288, 246, 204, 162];

/** Where a value sits on the rim: masters rest on their root (11 → 2, 22 → 4, 33 → 6). */
function rootDigit(value: number): number {
  return value > 9 ? Math.floor(value / 10) + (value % 10) : value;
}
const turn = (value: number) => (rootDigit(value) - 1) * 40;

/**
 * The astronomical dial. Nine numerals stand on the rim; each number of a
 * reading is a body on its own ring, turned to the numeral it reduces to. The
 * hand and the centre show whichever number is `active`.
 */
export function Dial({
  numbers,
  active = 0,
  className,
}: {
  numbers: DialNumber[];
  active?: number;
  className?: string;
}) {
  const skyClip = useId();
  const current = numbers[active];
  const lit = new Set(numbers.map((n) => rootDigit(n.insight.value)));
  const summary = numbers.map((n) => `${n.label} ${n.insight.value}`).join(", ");

  return (
    <svg
      viewBox="-500 -500 1000 1000"
      role="img"
      aria-label={`Dial set to ${summary}. The hand points at ${current.label}.`}
      className={className ? `dial ${className}` : "dial"}
    >
      <defs>
        <clipPath id={skyClip}>
          <circle r="400" />
        </clipPath>
      </defs>

      {/* Rim */}
      <circle r="488" fill="var(--color-ink-950)" stroke="var(--color-gold-300)" strokeWidth="3" />
      <circle r="412" fill="none" stroke="var(--color-gold-300)" strokeWidth="1.5" />
      {NUMERALS.map((n) => {
        const a = ((n - 1) * 40 - 90) * (Math.PI / 180);
        const b = ((n - 1) * 40 - 70) * (Math.PI / 180);
        return (
          <g key={n}>
            <text
              x={(Math.cos(a) * 450).toFixed(1)}
              y={(Math.sin(a) * 450).toFixed(1)}
              fontSize="62"
              className="dial-numeral"
              data-lit={lit.has(n)}
            >
              {n}
            </text>
            <line
              x1={(Math.cos(b) * 418).toFixed(1)}
              y1={(Math.sin(b) * 418).toFixed(1)}
              x2={(Math.cos(b) * 482).toFixed(1)}
              y2={(Math.sin(b) * 482).toFixed(1)}
              stroke="var(--color-gold-600)"
              strokeWidth="1.5"
            />
          </g>
        );
      })}

      {/* Sky plate: day above the horizon, a band of twilight, night below. */}
      <g clipPath={`url(#${skyClip})`}>
        <circle r="400" fill="var(--color-sky-600)" />
        <circle cy="462" r="540" fill="var(--color-rubric-500)" />
        <circle cy="506" r="540" fill="var(--color-ink-900)" />
      </g>
      <circle r="400" fill="none" stroke="var(--color-gold-300)" strokeWidth="3" />

      {/* Rings and their bodies */}
      {numbers.map((n, i) => {
        const r = RING_RADII[i];
        const isActive = i === active;
        const flagged = n.insight.isMaster || n.insight.karmicDebt !== null;
        return (
          <g key={n.label}>
            <circle
              r={r}
              fill="none"
              stroke="var(--color-gold-300)"
              strokeOpacity={isActive ? 1 : 0.38}
              strokeWidth={isActive ? 3 : 1.5}
            />
            <g
              className="dial-turn dial-settle"
              style={{ "--turn": `${turn(n.insight.value)}deg`, "--settle-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <circle
                cy={-r}
                r={isActive ? 19 : 13}
                fill={flagged ? "var(--color-rubric-400)" : "var(--color-gold-300)"}
                stroke={isActive ? "var(--color-bone-50)" : "var(--color-ink-950)"}
                strokeWidth={isActive ? 4 : 2}
              />
            </g>
          </g>
        );
      })}

      {/* Hand */}
      <g
        className="dial-turn dial-settle"
        style={{ "--turn": `${turn(current.insight.value)}deg` } as React.CSSProperties}
      >
        <line y1="-112" y2="-402" stroke="var(--color-gold-200)" strokeWidth="5" />
        <polygon points="0,-440 -14,-400 14,-400" fill="var(--color-gold-200)" />
      </g>

      {/* Centre */}
      <circle r="118" fill="var(--color-ink-950)" stroke="var(--color-gold-300)" strokeWidth="3" />
      <circle r="103" fill="none" stroke="var(--color-gold-600)" strokeWidth="1.5" />
      <text y="4" fontSize={current.insight.value > 9 ? 112 : 150} fill="var(--color-bone-50)">
        {current.insight.value}
      </text>
    </svg>
  );
}
