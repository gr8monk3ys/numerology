"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

const NAV_LINKS = [
  { href: "/reading", label: "The Reading" },
  { href: "/compatibility", label: "Concordance" },
  { href: "/forecast", label: "Almanac" },
  { href: "/angel-numbers", label: "Portents" },
  { href: "/numbers", label: "Lexicon" },
  { href: "/about", label: "The Method" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gold-500/25 bg-void-950/95">
      <nav className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-blackletter text-[1.7rem] leading-none tracking-wide"
          onClick={() => setOpen(false)}
        >
          <span className="gold-text">Numen</span>
        </Link>

        <div className="hidden items-baseline gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "link-underline term transition-colors",
                pathname.startsWith(link.href)
                  ? "text-gold-200"
                  : "text-mystic-100/80 hover:text-mystic-50",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="text-xl leading-none text-gold-300 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle contents"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="border-t border-gold-500/20 bg-void-900/95 md:hidden">
          <div className="container-page flex flex-col py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "term py-2.5",
                  pathname.startsWith(link.href)
                    ? "text-gold-200"
                    : "text-mystic-100/80",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
