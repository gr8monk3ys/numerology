/**
 * A chapter of the reading: rubric numeral, gothic title, a planetary or
 * ornamental glyph, and a hairline rule.
 */
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
        <div className="chapter-head mt-2">
          <h2 className="font-display text-3xl text-mystic-50">{title}</h2>
          <span className="h-px flex-1 bg-gradient-to-r from-gold-500/40 to-transparent" />
          <span className="chapter-glyph" aria-hidden>
            {glyph}
          </span>
        </div>
      </header>
      {children}
    </section>
  );
}
