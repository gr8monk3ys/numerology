import Link from "next/link";
import { Wordmark } from "@/components/Navbar";

const COLUMNS = [
  {
    heading: "Calculators",
    links: [
      { href: "/reading", label: "Full reading" },
      { href: "/compatibility", label: "Compatibility" },
      { href: "/forecast", label: "Personal year forecast" },
      { href: "/angel-numbers", label: "Angel numbers" },
    ],
  },
  {
    heading: "Reference",
    links: [
      { href: "/numbers", label: "Number meanings" },
      { href: "/about", label: "How it works" },
      { href: "/about#master-numbers", label: "Master numbers" },
      { href: "/about#systems", label: "Pythagorean vs Chaldean" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-28 border-t-[3px] border-double hairline-strong">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <Wordmark />
          <p className="max-w-xs text-base text-bone-300">
            An esoteric numerology suite. Pythagorean and Chaldean charts,
            cycles and correspondences, computed entirely in your browser.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <h2 className="label mb-3 font-sans">{col.heading}</h2>
            <ul className="space-y-2 text-base">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-bone-200 transition-colors hover:text-gold-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="label mb-3 font-sans">The fine print</h2>
          <p className="text-base text-bone-300">
            Numerology is offered for reflection, inspiration and entertainment.
            Trust your own intuition above all.
          </p>
        </div>
      </div>

      <div className="border-t hairline">
        <div className="container-page flex flex-col gap-2 py-5 text-base text-bone-400 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Numen</span>
          <span>Every calculation runs on your device. Your name and birth date are never sent.</span>
        </div>
      </div>
    </footer>
  );
}
