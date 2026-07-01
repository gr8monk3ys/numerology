import clsx from "clsx";

export function Chip({
  children,
  tone = "mystic",
}: {
  children: React.ReactNode;
  tone?: "mystic" | "gold" | "muted";
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs capitalize tracking-wide",
        tone === "mystic" && "border-mystic-500/30 bg-mystic-500/10 text-mystic-100",
        tone === "gold" && "border-gold-500/40 bg-gold-500/10 text-gold-200",
        tone === "muted" && "border-white/10 bg-white/[0.03] text-mystic-200/70",
      )}
    >
      {children}
    </span>
  );
}
