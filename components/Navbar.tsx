"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { SITE_NAV as NAV_LINKS } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Escape dismisses the open menu and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-gold-500/25 bg-void-950/95">
      <nav
        aria-label="Primary"
        className="container-page flex h-16 items-center justify-between"
      >
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
          ref={toggleRef}
          type="button"
          className="text-xl leading-none text-gold-300 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <span aria-hidden>{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {open && (
        <div id="mobile-nav" className="border-t border-gold-500/20 bg-void-900/95 md:hidden">
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
