/**
 * A chapter of the reading: rubric numeral, gothic title, a planetary or
 * ornamental glyph, and a hairline rule.
 */

/** The title row alone — reused wherever a section needs the ruled heading. */
export function ChapterHead({
  title,
  glyph,
  as: Tag = "h2",
  className = "text-3xl",
}: {
  title: string;
  glyph: string;
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <div className="chapter-head">
      <Tag className={`font-display text-mystic-50 ${className}`}>{title}</Tag>
      <span className="h-px flex-1 bg-gradient-to-r from-gold-500/40 to-transparent" />
      <span className="chapter-glyph" aria-hidden>
        {glyph}
      </span>
    </div>
  );
}

export function Chapter({
  numeral,
  glyph,
  title,
  children,
}: {
  numeral: string;
  glyph: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <header>
        <p className="eyebrow">Chapter {numeral}</p>
        <div className="mt-2">
          <ChapterHead title={title} glyph={glyph} />
        </div>
      </header>
      {children}
    </section>
  );
}
