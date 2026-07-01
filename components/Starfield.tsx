/**
 * Ambient cosmic background: aurora blobs, a deterministic starfield, and faint
 * orbital rings. Rendered once behind all content. Deterministic (seeded) so the
 * server and client markup match — no hydration drift.
 */

function seededRandom(seed: number) {
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const STAR_COUNT = 110;

export function Starfield() {
  const stars = Array.from({ length: STAR_COUNT }, (_, i) => ({
    id: i,
    top: seededRandom(i * 3 + 1) * 100,
    left: seededRandom(i * 3 + 2) * 100,
    size: 0.5 + seededRandom(i * 3 + 3) * 2,
    delay: seededRandom(i * 7 + 5) * 4,
    duration: 3 + seededRandom(i * 11 + 9) * 4,
  }));

  return (
    <div className="starfield" aria-hidden="true">
      {/* Aurora blobs */}
      <div
        className="aurora animate-aurora"
        style={{
          top: "-10%",
          left: "8%",
          width: "42vw",
          height: "42vw",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.5), transparent 65%)",
        }}
      />
      <div
        className="aurora animate-aurora"
        style={{
          bottom: "-15%",
          right: "5%",
          width: "38vw",
          height: "38vw",
          animationDelay: "6s",
          background:
            "radial-gradient(circle, rgba(31,182,160,0.35), transparent 65%)",
        }}
      />
      <div
        className="aurora animate-aurora"
        style={{
          top: "30%",
          right: "22%",
          width: "26vw",
          height: "26vw",
          animationDelay: "11s",
          background:
            "radial-gradient(circle, rgba(230,184,69,0.18), transparent 65%)",
        }}
      />

      {/* Stars */}
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
      <div className="absolute left-1/2 top-1/3 -z-10 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-mystic-500/[0.06] animate-spin-slower" />
      <div className="absolute left-1/2 top-1/3 -z-10 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-300/[0.06] animate-spin-slow" />
    </div>
  );
}
