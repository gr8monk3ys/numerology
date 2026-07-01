/**
 * A deterministic star + orbit background rendered behind all content.
 * Deterministic (seeded) so server and client markup match — no hydration drift.
 */

function seededRandom(seed: number) {
  // Mulberry32 — tiny deterministic PRNG.
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const STAR_COUNT = 90;

export function Starfield() {
  const stars = Array.from({ length: STAR_COUNT }, (_, i) => {
    const top = seededRandom(i * 3 + 1) * 100;
    const left = seededRandom(i * 3 + 2) * 100;
    const size = 0.5 + seededRandom(i * 3 + 3) * 2;
    const delay = seededRandom(i * 7 + 5) * 4;
    const duration = 3 + seededRandom(i * 11 + 9) * 4;
    return { top, left, size, delay, duration, id: i };
  });

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            opacity: 0.6,
          }}
        />
      ))}
      {/* Faint orbital rings */}
      <div className="absolute left-1/2 top-1/3 -z-10 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-mystic-500/5 animate-spin-slower" />
      <div className="absolute left-1/2 top-1/3 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-300/5 animate-spin-slow" />
    </div>
  );
}
