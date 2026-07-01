/**
 * Ambient backdrop for the grimoire: an aged-vellum vignette (from CSS) with a
 * pair of very faint alchemical rings, drawn once behind all content.
 */
export function Starfield() {
  return (
    <div className="starfield" aria-hidden="true">
      <div className="absolute left-1/2 top-1/3 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/[0.06] animate-spin-slower" />
      <div className="absolute left-1/2 top-1/3 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blood-500/[0.05] animate-spin-slow" />
    </div>
  );
}
