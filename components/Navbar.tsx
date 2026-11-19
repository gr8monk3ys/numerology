"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const NAV_LINKS = [
  { href: "/reading", label: "Reading" },
  { href: "/compatibility", label: "Compatibility" },
  { href: "/forecast", label: "Forecast" },
  { href: "/angel-numbers", label: "Angel numbers" },
  { href: "/numbers", label: "Numbers" },
  { href: "/about", label: "Method" },
];

export function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="font-display text-[2rem] font-bold leading-none text-bone-50" onClick={onClick}>
      Numen
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  // The sheet remembers the route it was opened on, so it is open only while
  // that route is still current. Any navigation (link tap, back/forward) closes
  // it without needing an effect that writes state on route change.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const setOpen = (next: boolean) => setOpenedAt(next ? pathname : null);

  return (
    <header className="sticky top-0 z-50 border-b hairline bg-ink-950">
      <nav className="container-page flex h-16 items-center justify-between gap-6">
        <Wordmark />

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "border-b py-1 transition-colors",
                  active
                    ? "border-gold-300 text-gold-200"
                    : "border-transparent text-bone-200 hover:text-gold-200",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border hairline-strong text-bone-100 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t hairline bg-ink-950 md:hidden">
          <div className="container-page divide-y divide-(--iron) py-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={pathname.startsWith(link.href) ? "page" : undefined}
                className={clsx(
                  "block py-3.5 text-lg",
                  pathname.startsWith(link.href) ? "text-gold-200" : "text-bone-100",
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
