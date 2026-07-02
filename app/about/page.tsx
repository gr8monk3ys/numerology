import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PYTHAGOREAN, CHALDEAN } from "@/lib/numerology";

export const metadata: Metadata = {
  title: "How Numerology Works",
  description:
    "Understand the methods behind Numen — the Pythagorean and Chaldean systems, reduction, master numbers 11/22/33, and karmic debt numbers.",
};

function LetterGrid({ table }: { table: Record<string, number> }) {
  const byNumber: Record<number, string[]> = {};
  for (const [letter, value] of Object.entries(table)) {
    (byNumber[value] ??= []).push(letter);
  }
  return (
    <div className="border-y border-gold-500/25">
      {Object.entries(byNumber)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([num, letters]) => (
          <div
            key={num}
            className="flex items-baseline gap-4 border-b border-gold-500/10 px-2 py-2 last:border-b-0"
          >
            <span className="w-6 shrink-0 text-right font-display text-lg text-gold-300">
              {num}
            </span>
            <span className="font-serif text-sm tracking-[0.3em] text-mystic-100/85">
              {letters.join(" ")}
            </span>
          </div>
        ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="container-page max-w-4xl py-16">
      <SectionHeading
        eyebrow="Chapter the Sixth"
        title="On the Method"
        subtitle="Numerology is the old practice of finding character in number. Names and dates are reduced to their essential figures, and each figure is read as an archetype."
        align="center"
      />

      <div className="mt-12 space-y-14">
        <section className="space-y-4">
          <h2 className="font-display text-2xl text-mystic-50">Reduction</h2>
          <p className="text-mystic-200/80">
            Almost every number in numerology is <em>reduced</em> — its digits
            are added together repeatedly until a single digit (1–9) remains. For
            example, a total of 58 becomes 5 + 8 = 13, then 1 + 3 = 4. The single
            exception is the <strong className="text-gold-200">master numbers</strong>.
          </p>
        </section>

        <section className="space-y-4" id="master-numbers">
          <h2 className="font-display text-2xl text-mystic-50">
            Master Numbers · 11, 22, 33
          </h2>
          <p className="text-mystic-200/80">
            When 11, 22 or 33 appear, they are left un-reduced. These are numbers
            of heightened potential and heightened challenge: the 11 the intuitive
            Illuminator, the 22 the Master Builder, the 33 the Master Teacher. They
            carry the promise of their reduced roots (2, 4, 6) raised to a higher
            octave.
          </p>
        </section>

        <section className="space-y-4" id="karmic">
          <h2 className="font-display text-2xl text-mystic-50">
            Karmic Debt · 13, 14, 16, 19
          </h2>
          <p className="text-mystic-200/80">
            If a core number&rsquo;s running total lands on 13, 14, 16 or 19 before its
            final reduction, it carries a <em>karmic debt</em> — an inherited
            lesson from past cycles. 13/4 asks for disciplined work, 14/5 for
            moderation, 16/7 for humility in love, and 19/1 for balanced
            independence.
          </p>
        </section>

        <section className="space-y-6" id="systems">
          <h2 className="font-display text-2xl text-mystic-50">
            Two Systems, Two Alphabets
          </h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-display text-lg text-gold-200">
                Pythagorean
              </h3>
              <p className="text-sm text-mystic-200/75">
                The modern Western system. Letters A–Z map to 1–9 in order,
                cycling three times. It is the default for the core chart.
              </p>
              <LetterGrid table={PYTHAGOREAN} />
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-lg text-gold-200">Chaldean</h3>
              <p className="text-sm text-mystic-200/75">
                The older Babylonian system. Letters map to 1–8 by sound; the
                number 9 is held sacred and never assigned. Its compound numbers
                carry their own layered meanings.
              </p>
              <LetterGrid table={CHALDEAN} />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-mystic-50">The Core Numbers</h2>
          <ul className="space-y-3 text-mystic-200/80">
            <li>
              <strong className="text-mystic-50">Life Path</strong> — from your
              birth date; the overarching journey and purpose of your life.
            </li>
            <li>
              <strong className="text-mystic-50">Expression / Destiny</strong> —
              from every letter of your full birth name; your natural talents.
            </li>
            <li>
              <strong className="text-mystic-50">Soul Urge</strong> — from the
              vowels; the secret longing of your heart.
            </li>
            <li>
              <strong className="text-mystic-50">Personality</strong> — from the
              consonants; the face you show the world.
            </li>
            <li>
              <strong className="text-mystic-50">Birthday</strong> — the special
              gift conferred by the day you were born.
            </li>
          </ul>
        </section>

        <div className="pt-6 text-center">
          <div className="rule-ornament text-sm">❧</div>
          <p className="mx-auto mt-5 max-w-md text-sm italic leading-relaxed text-mystic-300/75">
            So much for the method. The proof of it is in the casting.
          </p>
          <Link href="/reading" className="btn-primary mt-6">
            Cast the Reading
          </Link>
        </div>
      </div>
    </div>
  );
}
