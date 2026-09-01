import clsx from "clsx";

export function Chip({
  children,
  tone = "mystic",
  className,
}: {
  children: React.ReactNode;
  tone?: "mystic" | "gold" | "muted" | "rubric";
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "tag",
        tone === "gold" && "tag-accent",
        tone === "muted" && "tag-muted",
        tone === "rubric" && "tag-rubric",
        className,
      )}
    >
      {children}
    </span>
  );
}
