import clsx from "clsx";

type TileSize = "xs" | "sm" | "md" | "lg" | "xl";

const SIZES: Record<TileSize, string> = {
  xs: "h-8 min-w-8 px-1.5 text-sm",
  sm: "h-11 min-w-11 px-2 text-lg",
  md: "h-14 min-w-14 px-2.5 text-2xl",
  lg: "h-20 min-w-20 px-3 text-4xl",
  xl: "h-28 min-w-28 px-4 text-6xl",
};

/* Figures for three or more digits step down one size so the tile stays square-ish. */
const COMPACT: Record<TileSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-lg",
  lg: "text-2xl",
  xl: "text-4xl",
};

export interface NumberOrbProps {
  value: number | string;
  size?: TileSize;
  isMaster?: boolean;
  isKarmic?: boolean;
  className?: string;
}

/**
 * A numeral tile: square, hairline-bordered, monospace figure. Master numbers
 * get gilt corner ticks; karmic numbers get a rubric border.
 */
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
        "relative flex shrink-0 select-none items-center justify-center rounded-[3px] border font-mono font-medium tabular",
        SIZES[size],
        String(value).length >= 3 && COMPACT[size],
        isMaster
          ? "ticks border-gold-400/60 bg-gold-300/[0.07] text-gold-200"
          : isKarmic
            ? "border-rubric-400/60 bg-rubric-400/[0.06] text-rubric-300"
            : "border-(--line-strong) bg-surface text-bone-50",
        className,
      )}
      style={
        size === "xs" || size === "sm"
          ? ({ "--tick-size": "5px" } as React.CSSProperties)
          : undefined
      }
    >
      {value}
    </div>
  );
}
