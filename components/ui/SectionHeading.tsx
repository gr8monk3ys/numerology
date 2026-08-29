import clsx from "clsx";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
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
      <h2 className="text-3xl font-semibold leading-tight text-mystic-50 sm:text-4xl">
        {title}
      </h2>
      {align === "center" && (
        <div className="rule-ornament pt-1 text-sm">❧</div>
      )}
      {subtitle && (
        <p className="text-base leading-relaxed text-mystic-200/85">{subtitle}</p>
      )}
    </div>
  );
}
