import clsx from "clsx";

type OrbSize = "xs" | "sm" | "md" | "lg" | "xl";

const SIZES: Record<OrbSize, string> = {
  xs: "h-10 w-10 text-lg",
  sm: "h-14 w-14 text-2xl",
  md: "h-20 w-20 text-3xl",
  lg: "h-28 w-28 text-5xl",
  xl: "h-40 w-40 text-7xl",
};

export interface NumberOrbProps {
  value: number | string;
  size?: OrbSize;
  isMaster?: boolean;
  isKarmic?: boolean;
  className?: string;
}

/**
 * An engraved seal bearing a number: double gilt ring, four cardinal ticks,
 * ink ground. Master numbers take a brighter ring; karmic numbers an oxblood
 * one. Rendered as a <span> so it is valid phrasing content inside buttons
 * and headings.
 */
export function NumberOrb({
  value,
  size = "md",
  isMaster = false,
  isKarmic = false,
  className,
}: NumberOrbProps) {
  return (
    <span
      className={clsx(
        "relative flex shrink-0 select-none items-center justify-center rounded-full font-display font-semibold",
        SIZES[size],
        "bg-[radial-gradient(circle_at_50%_38%,#221809,#0b0805_72%)]",
        "shadow-[inset_0_0_14px_rgba(0,0,0,0.75),0_6px_16px_-8px_rgba(0,0,0,0.8)]",
        // In print the seal becomes a ruled medallion: parchment ground, ink glyph.
        "print:bg-none print:shadow-none print:ring-0 print:border print:border-[#8a744a] print:text-[#241c10]",
        isMaster
          ? "text-gold-100 ring-2 ring-gold-400/75"
          : isKarmic
            ? "text-rose-200 ring-2 ring-blood-500/70"
            : "text-gold-200 ring-1 ring-gold-500/50",
        className,
      )}
    >
      {/* inner hairline ring */}
      <span
        className={clsx(
          "pointer-events-none absolute rounded-full",
          isMaster
            ? "inset-1.5 ring-1 ring-gold-300/45"
            : isKarmic
              ? "inset-1 ring-1 ring-blood-500/35"
              : "inset-1 ring-1 ring-gold-500/25",
        )}
        aria-hidden
      />
      {/* four cardinal ticks, engraved into the rim */}
      <span className="pointer-events-none absolute inset-0" aria-hidden>
        {[0, 90, 180, 270].map((deg) => (
          <span
            key={deg}
            className="absolute inset-0"
            style={{ transform: `rotate(${deg}deg)` }}
          >
            <span
              className={clsx(
                "absolute left-1/2 top-[3%] h-[6%] w-px -translate-x-1/2",
                isKarmic ? "bg-blood-500/50" : "bg-gold-500/40",
              )}
            />
          </span>
        ))}
      </span>
      <span className="relative">{value}</span>
    </span>
  );
}
