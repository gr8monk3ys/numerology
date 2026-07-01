import clsx from "clsx";

/**
 * A slowly-rotating astrolabe-style engraving: concentric rings, tick marks and
 * the digits 1–9 arranged around the circle, rendered as gilt on vellum.
 */
export function NumerologyWheel({ className }: { className?: string }) {
  const size = 400;
  const c = size / 2;
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const ringR = 150;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={clsx("select-none", className)}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="wheelCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c39c47" stopOpacity="0.42" />
          <stop offset="55%" stopColor="#8a6122" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#8a6122" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Candle-gilt core */}
      <circle cx={c} cy={c} r={92} fill="url(#wheelCore)" />

      {/* Outer engraved ring + ticks */}
      <g className="animate-spin-slower" style={{ transformOrigin: "center" }}>
        <circle cx={c} cy={c} r={192} fill="none" stroke="rgba(198,158,74,0.28)" strokeWidth="1" />
        <circle cx={c} cy={c} r={178} fill="none" stroke="rgba(198,158,74,0.18)" strokeWidth="1" strokeDasharray="1.5 7" />
        {Array.from({ length: 36 }, (_, i) => {
          const a = (i / 36) * Math.PI * 2;
          const r1 = 184;
          const r2 = i % 3 === 0 ? 168 : 177;
          return (
            <line
              key={i}
              x1={c + Math.cos(a) * r1}
              y1={c + Math.sin(a) * r1}
              x2={c + Math.cos(a) * r2}
              y2={c + Math.sin(a) * r2}
              stroke="rgba(198,158,74,0.34)"
              strokeWidth="1"
            />
          );
        })}
      </g>

      {/* Inner ring of numerals, counter-rotating */}
      <g className="animate-spin-slow" style={{ transformOrigin: "center" }}>
        <circle cx={c} cy={c} r={ringR} fill="none" stroke="rgba(198,158,74,0.14)" strokeWidth="1" />
        {digits.map((d, i) => {
          const a = (i / digits.length) * Math.PI * 2 - Math.PI / 2;
          const x = c + Math.cos(a) * ringR;
          const y = c + Math.sin(a) * ringR;
          return (
            <g key={d}>
              <circle cx={x} cy={y} r={16} fill="rgba(12,9,5,0.85)" stroke="rgba(198,158,74,0.4)" strokeWidth="1" />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="var(--font-gothic), serif"
                fontSize="19"
                fill="#d6b566"
              >
                {d}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
