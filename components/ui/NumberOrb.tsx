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

/** A gilded manuscript medallion displaying a numerology number. */
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
        "bg-[radial-gradient(circle_at_50%_35%,#241a0e,#0c0805)]",
        isMaster
          ? "text-gold-200 ring-2 ring-gold-400/70"
          : isKarmic
            ? "text-rose-200 ring-2 ring-blood-500/70"
            : "text-gold-100 ring-1 ring-gold-500/50",
        className,
      )}
      style={{
        boxShadow:
          "inset 0 0 12px rgba(0,0,0,0.7), 0 6px 16px -8px rgba(0,0,0,0.8)",
      }}
    >
      {/* inner gilt hairline */}
      <span
        className={clsx(
          "pointer-events-none absolute rounded-full",
          isMaster ? "inset-1.5 ring-1 ring-gold-300/40" : "inset-1 ring-1 ring-gold-500/25",
        )}
        aria-hidden
      />
      <span>{value}</span>
    </div>
  );
}
