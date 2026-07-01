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
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize",
        tone === "mystic" && "bg-mystic-500/15 text-mystic-100",
        tone === "gold" && "bg-gold-500/15 text-gold-200",
        tone === "muted" && "bg-white/5 text-mystic-200/70",
      )}
    >
      {children}
    </span>
  );
}
