import clsx from "clsx";

/** Small monospace eyebrow. Pass `index` for a "01 / LABEL" prefix. */
export function Eyebrow({
  children,
  index,
  accent = false,
  className,
}: {
  children: React.ReactNode;
  index?: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span className={clsx(accent ? "mono-label-accent" : "mono-label", "inline-flex items-center gap-2", className)}>
      {index && (
        <>
          <span className="text-gold-300">{index}</span>
          <span className="text-bone-600">/</span>
        </>
      )}
      {children}
    </span>
  );
}

/**
 * Standard page header: eyebrow, display title, subtitle. Left aligned with an
 * optional right-hand meta slot, ruled underneath.
 */
export function PageHeader({
  eyebrow,
  index,
  title,
  subtitle,
  meta,
  className,
}: {
  eyebrow?: string;
  index?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  meta?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={clsx("border-b hairline pb-8 sm:pb-10", className)}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          {eyebrow && <Eyebrow index={index}>{eyebrow}</Eyebrow>}
          <h1 className="mt-3 text-4xl leading-[1.05] sm:text-5xl">{title}</h1>
          {subtitle && (
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-bone-300">
              {subtitle}
            </p>
          )}
        </div>
        {meta && <div className="shrink-0">{meta}</div>}
      </div>
    </header>
  );
}

/** Section heading used inside pages: index + title + optional right meta, ruled. */
export function SectionRow({
  index,
  title,
  meta,
  className,
}: {
  index?: string;
  title: React.ReactNode;
  meta?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("section-row", className)}>
      <div className="flex items-baseline gap-3">
        {index && <span className="font-mono text-xs text-gold-300">{index}</span>}
        <h2 className="text-2xl sm:text-[1.75rem]">{title}</h2>
      </div>
      {meta && <div className="mono-label shrink-0">{meta}</div>}
    </div>
  );
}

/** Marketing section heading (home page): eyebrow, big title, subtitle. */
export function SectionHeading({
  eyebrow,
  index,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  index?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        align === "center" && "mx-auto max-w-2xl text-center",
        align === "left" && "max-w-2xl",
        className,
      )}
    >
      {eyebrow && <Eyebrow index={index}>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 text-3xl leading-[1.1] sm:text-4xl lg:text-[2.75rem]">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-[15px] leading-relaxed text-bone-300">{subtitle}</p>
      )}
    </div>
  );
}

/** Small mono "runs locally" style badge. */
export function StatusBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-7 items-center gap-2 rounded-[3px] border hairline bg-surface px-2.5 font-mono text-[11px] tracking-wider text-bone-300">
      <span className="dot" />
      {children}
    </span>
  );
}
