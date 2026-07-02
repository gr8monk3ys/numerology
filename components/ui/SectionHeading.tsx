import clsx from "clsx";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  /** Heading level — pass "h1" when this is the page title. */
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "space-y-3",
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag className="text-3xl font-semibold leading-tight text-mystic-50 sm:text-4xl">
        {title}
      </Tag>
      {align === "center" && (
        <div className="rule-ornament pt-1 text-sm">❧</div>
      )}
      {subtitle && (
        <p className="text-base leading-relaxed text-mystic-200/70">{subtitle}</p>
      )}
    </div>
  );
}
