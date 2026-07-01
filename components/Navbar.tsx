"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import clsx from "clsx";

const NAV_LINKS = [
  { href: "/reading", label: "Full Reading" },
  { href: "/compatibility", label: "Compatibility" },
  { href: "/numbers", label: "Numbers" },
  { href: "/angel-numbers", label: "Angel Numbers" },
  { href: "/forecast", label: "Forecast" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gold-500/20 bg-void-950/95">
      <nav className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-blackletter text-2xl tracking-wide"
          onClick={() => setOpen(false)}
        >
          <Sparkles className="h-5 w-5 text-gold-300" />
          <span className="gold-text">Numen</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "link-underline text-sm tracking-wide transition-colors",
                pathname.startsWith(link.href)
                  ? "text-gold-200"
                  : "text-mystic-100/80 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="md:hidden text-mystic-100"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/5 bg-void-900/95 md:hidden">
          <div className="container-page flex flex-col py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "py-2.5 text-sm tracking-wide",
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
