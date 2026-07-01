import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-void-950/60">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-lg tracking-widest"
          >
            <Sparkles className="h-5 w-5 text-gold-300" />
            <span className="gold-text">NUMEN</span>
          </Link>
          <p className="max-w-xs text-sm text-mystic-200/60">
            An esoteric numerology suite. Reveal the hidden architecture of your
            name and birth date.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-200/80">
            Calculators
          </h4>
          <ul className="space-y-2 text-sm text-mystic-200/70">
            <li>
              <Link href="/reading" className="link-underline">
                Full Reading
              </Link>
            </li>
            <li>
              <Link href="/compatibility" className="link-underline">
                Compatibility
              </Link>
            </li>
            <li>
              <Link href="/forecast" className="link-underline">
                Personal Year Forecast
              </Link>
            </li>
            <li>
              <Link href="/angel-numbers" className="link-underline">
                Angel Numbers
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-200/80">
            Explore
          </h4>
          <ul className="space-y-2 text-sm text-mystic-200/70">
            <li>
              <Link href="/numbers" className="link-underline">
                Number Meanings
              </Link>
            </li>
            <li>
              <Link href="/about" className="link-underline">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="/about#systems" className="link-underline">
                Pythagorean vs Chaldean
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-200/80">
            The Fine Print
          </h4>
          <p className="text-sm text-mystic-200/60">
            Numerology is offered for reflection, inspiration, and
            entertainment. Trust your own intuition above all.
          </p>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-mystic-200/50">
        © {new Date().getFullYear()} Numen. Crafted under a waxing moon. ✦
      </div>
    </footer>
  );
}
