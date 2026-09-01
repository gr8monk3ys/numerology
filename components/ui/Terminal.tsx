import clsx from "clsx";

/**
 * A terminal-style panel with a title bar. Children render inside a
 * monospace body; use the .prompt/.cmd/.key/.val/.hi/.dim/.rub spans.
 */
export function Terminal({
  title,
  tabs,
  children,
  className,
}: {
  title: string;
  tabs?: string[];
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("terminal", className)}>
      <div className="terminal-bar">
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-2.5 w-2.5 rounded-full border border-(--line-strong)" />
          <i className="h-2.5 w-2.5 rounded-full border border-(--line-strong)" />
          <i className="h-2.5 w-2.5 rounded-full border border-(--line-strong)" />
        </span>
        <span className="ml-2 font-mono text-[11px] tracking-wider text-bone-300">{title}</span>
        {tabs && (
          <span className="ml-auto hidden gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-500 sm:flex">
            {tabs.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </span>
        )}
      </div>
      <pre className="terminal-body thin-scrollbar">{children}</pre>
    </div>
  );
}
