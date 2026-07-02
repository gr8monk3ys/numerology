import Link from "next/link";

const LINKS = [
  { href: "/reading", label: "The Reading" },
  { href: "/compatibility", label: "Concordance" },
  { href: "/forecast", label: "Almanac" },
  { href: "/angel-numbers", label: "Portents" },
  { href: "/numbers", label: "Lexicon" },
  { href: "/about", label: "The Method" },
];

/** Colophon — set as the closing page of the book. */
export function Footer() {
  return (
    <footer className="mt-28 border-t border-gold-500/20 bg-void-950/80">
      <div className="container-page flex flex-col items-center gap-6 py-14 text-center">
        <span className="text-lg text-gold-400/70" aria-hidden>
          ❧
        </span>

        <div>
          <Link href="/" className="font-blackletter text-3xl tracking-wide">
            <span className="gold-text">Numen</span>
          </Link>
          <p className="mt-1 term term-muted">Liber Numerorum</p>
        </div>

        <nav aria-label="Footer" className="term-row justify-center text-mystic-200/75">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="term link-underline">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="max-w-xl space-y-2 text-sm leading-relaxed text-mystic-300/80">
          <p>
            Compiled from the Pythagorean and Chaldean systems, with the
            correspondences of tarot, planet and stone. All reckonings are made
            within your own device; nothing you enter is sent abroad.
          </p>
          <p className="italic">
            Offered for reflection and delight. Trust your own intuition above
            all.
          </p>
        </div>

        <p className="text-xs tracking-wide text-mystic-300/85">
          Set in Grenze Gotisch, EB Garamond &amp; Unifraktur ·{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
