import clsx from "clsx";

export function Chip({
  children,
  tone = "plain",
  className,
}: {
  children: React.ReactNode;
  tone?: "plain" | "gold" | "muted" | "rubric";
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
