import clsx from "clsx";

/**
 * A quiet small-caps term. Deliberately not a pill/badge: keywords in the
 * grimoire read as set text, separated by middle dots when placed in a
 * `.term-row` container.
 */
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
        "term",
        tone === "gold" && "term-gold",
        tone === "mystic" && "term-ink",
        tone === "muted" && "term-muted",
      )}
    >
      {children}
    </span>
  );
}
