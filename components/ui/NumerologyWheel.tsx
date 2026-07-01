import clsx from "clsx";

/**
 * A decorative, slowly-rotating numerology wheel: concentric rings, tick marks,
 * and the digits 1–9 arranged around the circle. Pure SVG, no client JS.
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
          <stop offset="0%" stopColor="#a175ff" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Core glow */}
      <circle cx={c} cy={c} r={90} fill="url(#wheelCore)" />

      {/* Rotating rings + ticks */}
      <g className="animate-spin-slower" style={{ transformOrigin: "center" }}>
        <circle cx={c} cy={c} r={190} fill="none" stroke="rgba(238,203,107,0.15)" strokeWidth="1" />
        <circle cx={c} cy={c} r={175} fill="none" stroke="rgba(161,117,255,0.18)" strokeWidth="1" strokeDasharray="2 8" />
        {Array.from({ length: 36 }, (_, i) => {
          const a = (i / 36) * Math.PI * 2;
          const r1 = 182;
          const r2 = i % 3 === 0 ? 168 : 176;
          return (
            <line
              key={i}
              x1={c + Math.cos(a) * r1}
              y1={c + Math.sin(a) * r1}
              x2={c + Math.cos(a) * r2}
              y2={c + Math.sin(a) * r2}
              stroke="rgba(238,203,107,0.28)"
              strokeWidth="1"
            />
          );
        })}
      </g>

      {/* Counter-rotating inner ring with digits */}
      <g className="animate-spin-slow" style={{ transformOrigin: "center" }}>
        <circle cx={c} cy={c} r={ringR} fill="none" stroke="rgba(161,117,255,0.12)" strokeWidth="1" />
        {digits.map((d, i) => {
          const a = (i / digits.length) * Math.PI * 2 - Math.PI / 2;
          const x = c + Math.cos(a) * ringR;
          const y = c + Math.sin(a) * ringR;
          return (
            <g key={d}>
              <circle cx={x} cy={y} r={16} fill="rgba(18,14,51,0.7)" stroke="rgba(238,203,107,0.35)" strokeWidth="1" />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="var(--font-cinzel), serif"
                fontSize="18"
                fill="#f4e0a0"
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
