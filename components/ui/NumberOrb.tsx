import clsx from "clsx";

type MedallionSize = "xs" | "sm" | "md" | "lg" | "xl";

const SIZES: Record<MedallionSize, string> = {
  xs: "w-8 text-base",
  sm: "w-11 text-2xl",
  md: "w-14 text-3xl",
  lg: "w-20 text-5xl",
  xl: "w-28 text-7xl",
};

/* Figures of three or more digits step down so they stay inside the ring. */
const COMPACT: Record<MedallionSize, string> = {
  xs: "text-sm",
  sm: "text-base",
  md: "text-lg",
  lg: "text-2xl",
  xl: "text-4xl",
};

export interface NumberOrbProps {
  value: number | string;
  size?: MedallionSize;
  isMaster?: boolean;
  isKarmic?: boolean;
  className?: string;
}

/**
 * A number medallion: a small dial face with a blackletter numeral. Master
 * numbers sit on the sky field; karmic numbers take the twilight ring.
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
        "medallion",
        SIZES[size],
        String(value).length >= 3 && COMPACT[size],
        isMaster ? "medallion-master" : isKarmic && "medallion-karmic",
        className,
      )}
    >
      {value}
    </div>
  );
}
