"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
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
    <Link href="/" className="flex items-center gap-2.5" onClick={onClick}>
      <span className="ticks flex h-7 w-7 items-center justify-center rounded-[3px] border border-gold-400/60 font-mono text-[13px] font-medium text-gold-200 [--tick-size:5px]">
        N
      </span>
      <span className="font-display text-[1.35rem] leading-none tracking-tight text-bone-50">
        Numen
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the sheet on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b hairline bg-ink-950/80 backdrop-blur-md">
      <nav className="container-page flex h-14 items-center justify-between">
        <Wordmark />

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "relative rounded-[3px] px-3 py-1.5 text-[13px] transition-colors",
                  active
                    ? "text-bone-50"
                    : "text-bone-300 hover:bg-gold-300/[0.06] hover:text-bone-50",
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-[15px] h-px bg-gold-300" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/reading" className="btn btn-primary btn-sm hidden sm:inline-flex">
            Start reading
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-[3px] border hairline text-bone-100 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t hairline bg-ink-950/95 md:hidden">
          <div className="container-page divide-y divide-(--line) py-1">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "flex items-center justify-between py-3.5 text-[15px]",
                  pathname.startsWith(link.href) ? "text-gold-200" : "text-bone-100",
                )}
              >
                <span className="flex items-center gap-4">
                  <span className="font-mono text-[11px] text-bone-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </span>
                <ArrowUpRight className="h-4 w-4 text-bone-500" />
              </Link>
            ))}
            <Link
              href="/reading"
              onClick={() => setOpen(false)}
              className="btn btn-primary my-3 w-full"
            >
              Start reading
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
