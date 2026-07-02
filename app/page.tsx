import Link from "next/link";
import { NumerologyWheel } from "@/components/ui/NumerologyWheel";
import { Reveal } from "@/components/ui/Reveal";

const CONTENTS = [
  {
    numeral: "I",
    href: "/reading",
    title: "The Reading",
    gloss:
      "The full chart cast from name and birth date: the core numbers, the karmic record, the letters, the correspondences.",
  },
  {
    numeral: "II",
    href: "/compatibility",
    title: "The Concordance of Two Souls",
    gloss: "Two Life Paths weighed against one another, with counsel for the pairing.",
  },
  {
    numeral: "III",
    href: "/forecast",
    title: "The Almanac of Cycles",
    gloss: "The Personal Year, Month and Day; the Pinnacles and Challenges of a lifetime.",
  },
  {
    numeral: "IV",
    href: "/angel-numbers",
    title: "An Index of Portents",
    gloss: "Repeating numbers — 111, 222, 11:11 — read as omens and their meanings.",
  },
  {
    numeral: "V",
    href: "/numbers",
    title: "A Lexicon of the Numbers",
    gloss: "The nine digits and the three master numbers, each with its arcana, planet and stone.",
  },
  {
    numeral: "VI",
    href: "/about",
    title: "On the Method",
    gloss: "How the reckoning is done: reduction, the master numbers, the two alphabets.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Frontispiece */}
      <section className="container-page relative overflow-hidden pb-20 pt-20 sm:pt-28">
        <div className="pointer-events-none absolute left-1/2 top-[44%] -z-10 aspect-square w-[min(640px,120vw)] -translate-x-1/2 -translate-y-1/2 opacity-35">
          <NumerologyWheel className="h-full w-full" />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow animate-fade-up">Liber Numerorum</p>

          <h1 className="mt-6 animate-fade-up font-blackletter text-7xl leading-none sm:text-8xl">
            <span className="gold-text">Numen</span>
          </h1>

          <p className="mt-4 animate-fade-up font-display text-xl italic text-mystic-200/85 sm:text-2xl">
            or, The Numbers Written into Your Name &amp; Birth
          </p>

          <div className="rule-ornament mt-8 animate-fade-up text-base">❧</div>

          <p className="mx-auto mt-8 max-w-xl animate-fade-up text-left leading-relaxed text-mystic-100/85 dropcap">
            Wherein the seeker may reckon the Life Path, the Expression and the
            Urge of the Soul; take account of the Debts of Karma and the
            Pinnacles of a lifetime; and consult the correspondences of tarot,
            planet, element and stone. Every reckoning is worked within your
            own device, and nothing you enter leaves it.
          </p>

          <div className="mt-10 flex animate-fade-up flex-col items-center gap-4">
            <Link href="/reading" className="btn-primary">
              Begin the Reading
            </Link>
            <Link href="/numbers" className="action-quiet no-underline">
              or consult the Lexicon of Numbers
            </Link>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <Reveal as="section" className="container-page pb-24 pt-6">
        <div className="glass-strong mx-auto max-w-3xl px-6 py-10 sm:px-12 sm:py-14">
          <h2 className="text-center font-display text-3xl">
            Table of Contents
          </h2>
          <div className="rule-ornament mt-4 text-sm">☙</div>

          <ol className="mt-10 space-y-7">
            {CONTENTS.map((entry) => (
              <li key={entry.numeral}>
                <Link href={entry.href} className="group block">
                  <span className="toc-entry">
                    <span className="font-display text-lg text-blood-300">
                      {entry.numeral}.
                    </span>
                    <span className="font-display text-xl text-mystic-50 transition-colors group-hover:text-gold-200">
                      {entry.title}
                    </span>
                    <span className="toc-leader" aria-hidden />
                    <span className="term term-gold whitespace-nowrap">
                      turn to
                    </span>
                  </span>
                  <span className="mt-1 block pl-8 text-sm leading-relaxed text-mystic-300/75">
                    {entry.gloss}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      {/* Of the method, briefly */}
      <Reveal as="section" className="container-page pb-28">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow text-center">Of the Method, Briefly</p>
          <p className="dropcap mt-6 leading-relaxed text-mystic-100/85">
            Numerology holds that every letter and date carries a number, and
            every number a character. To read a name, its letters are summed
            and reduced — digit added to digit — until a single figure remains;
            only the master numbers 11, 22 and 33 are left unreduced, for they
            are held to carry a higher octave. The birth date is worked the
            same way. From these few figures the whole chart unfolds.
          </p>
          <p className="mt-4 text-center">
            <Link href="/about" className="action-quiet no-underline">
              Read the method in full
            </Link>
          </p>
        </div>
      </Reveal>
    </>
  );
}
