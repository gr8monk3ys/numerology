import clsx from "clsx";

/** Standard page header: display title, subtitle, optional right-hand meta, ruled underneath. */
export function PageHeader({
  title,
  subtitle,
  meta,
  className,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  meta?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={clsx("border-b-[3px] border-double hairline-strong pb-8 sm:pb-10", className)}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-5xl sm:text-6xl">{title}</h1>
          {subtitle && <p className="mt-5 max-w-xl text-lg text-bone-200">{subtitle}</p>}
        </div>
        {meta && <div className="shrink-0">{meta}</div>}
      </div>
    </header>
  );
}

/** Section heading used inside pages: title + optional right meta, ruled. */
export function SectionRow({
  title,
  meta,
  className,
}: {
  title: React.ReactNode;
  meta?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("section-row", className)}>
      <h2 className="text-3xl sm:text-4xl">{title}</h2>
      {meta && <div className="label shrink-0">{meta}</div>}
    </div>
  );
}

/** The standing privacy note shown beside a calculator's title. */
export function StatusBadge({ children }: { children: React.ReactNode }) {
  return <span className="tag tag-accent">{children}</span>;
}
