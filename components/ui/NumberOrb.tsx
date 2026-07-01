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

/** A glowing celestial orb displaying a numerology number. */
export function NumberOrb({
  value,
  size = "md",
  isMaster = false,
  isKarmic = false,
  className,
}: NumberOrbProps) {
  return (
    <div
      className={clsx(
        "relative flex shrink-0 select-none items-center justify-center rounded-full font-display font-semibold",
        SIZES[size],
        isMaster
          ? "bg-gradient-to-br from-gold-200/20 to-gold-500/10 text-gold-200 shadow-glow-gold ring-1 ring-gold-300/50"
          : "bg-gradient-to-br from-mystic-500/25 to-void-800/40 text-mystic-50 shadow-glow ring-1 ring-mystic-400/40",
        className,
      )}
    >
      <span className="drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]">
        {value}
      </span>
      {isKarmic && (
        <span
          className="absolute -inset-0.5 rounded-full ring-1 ring-rose-400/50"
          aria-hidden
        />
      )}
    </div>
  );
}
