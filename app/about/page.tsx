import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader, SectionRow } from "@/components/ui/SectionHeading";
import { Terminal } from "@/components/ui/Terminal";
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
    <div className="divided grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
      {Object.entries(byNumber)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([num, letters]) => (
          <div key={num} className="flex items-center gap-3 p-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px] border border-(--line-strong) font-mono text-sm text-gold-200">
              {num}
            </span>
            <span className="font-mono text-xs tracking-[0.3em] text-bone-200">
              {letters.join("")}
            </span>
          </div>
        ))}
    </div>
  );
}

const CORE = [
  { k: "Life Path", v: "From your birth date; the overarching journey and purpose of your life." },
  { k: "Expression / Destiny", v: "From every letter of your full birth name; your natural talents." },
  { k: "Soul Urge", v: "From the vowels; the secret longing of your heart." },
  { k: "Personality", v: "From the consonants; the face you show the world." },
  { k: "Birthday", v: "The particular gift conferred by the day you were born." },
];

export default function AboutPage() {
  return (
    <div className="container-page py-14 sm:py-20">
      <PageHeader
        index="06"
        eyebrow="Method"
        title={<>The mathematics of <em>meaning</em></>}
        subtitle="Numerology is the practice of finding significance in numbers. Names and dates are reduced to their essential vibrations, each carrying an archetypal meaning."
      />

      <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_20rem] lg:gap-16">
        <div className="space-y-16">
          <section className="space-y-5" id="reduction">
            <SectionRow index="01" title="Reduction" />
            <p className="text-[15px] leading-relaxed text-bone-200">
              Almost every number in numerology is <em>reduced</em>: its digits
              are added together repeatedly until a single digit (1–9) remains.
              The single exception is the{" "}
              <Link href="#master-numbers" className="link">master numbers</Link>.
            </p>
            <Terminal title="reduce.ts">
              <span className="key">total</span> <span className="val">58</span>
              {"\n"}
              <span className="key">step </span> <span className="val">5 + 8 = 13</span>
              {"   "}<span className="rub">← karmic 13 seen</span>
              {"\n"}
              <span className="key">step </span> <span className="val">1 + 3 = 4</span>
              {"\n"}
              <span className="key">value</span> <span className="hi">4</span>
              {"  "}<span className="dim">(13/4)</span>
            </Terminal>
          </section>

          <section className="space-y-5" id="master-numbers">
            <SectionRow index="02" title="Master numbers" meta="11 · 22 · 33" />
            <p className="text-[15px] leading-relaxed text-bone-200">
              When 11, 22 or 33 appear, they are left un-reduced. These are
              numbers of heightened potential and heightened challenge: the 11
              the intuitive Illuminator, the 22 the Master Builder, the 33 the
              Master Teacher. They carry the promise of their reduced roots
              (2, 4, 6) raised to a higher octave.
            </p>
          </section>

          <section className="space-y-5" id="karmic">
            <SectionRow index="03" title="Karmic debt" meta="13 · 14 · 16 · 19" />
            <p className="text-[15px] leading-relaxed text-bone-200">
              If a core number’s running total lands on 13, 14, 16 or 19 before
              its final reduction, it carries a <em>karmic debt</em>, an
              inherited lesson from past cycles. 13/4 asks for disciplined work,
              14/5 for moderation, 16/7 for humility in love, and 19/1 for
              balanced independence.
            </p>
          </section>

          <section className="space-y-6" id="systems">
            <SectionRow index="04" title="Two systems, two alphabets" />
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <span className="mono-label-accent">Pythagorean</span>
                  <p className="mt-2 text-sm leading-relaxed text-bone-300">
                    The modern Western system. Letters A–Z map to 1–9 in order,
                    cycling three times. It is the default for the core chart.
                  </p>
                </div>
                <LetterGrid table={PYTHAGOREAN} />
              </div>
              <div className="space-y-4">
                <div>
                  <span className="mono-label-accent">Chaldean</span>
                  <p className="mt-2 text-sm leading-relaxed text-bone-300">
                    The older Babylonian system. Letters map to 1–8 by sound;
                    the number 9 is held sacred and never assigned. Its
                    compound numbers carry their own layered meanings.
                  </p>
                </div>
                <LetterGrid table={CHALDEAN} />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <SectionRow index="05" title="The core numbers" />
            <dl className="divided">
              {CORE.map((c) => (
                <div key={c.k} className="grid gap-1 p-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                  <dt className="mono-label pt-0.5">{c.k}</dt>
                  <dd className="text-sm text-bone-200">{c.v}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        {/* Sticky aside */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="frame p-5">
            <span className="mono-label">On this page</span>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                ["#reduction", "Reduction"],
                ["#master-numbers", "Master numbers"],
                ["#karmic", "Karmic debt"],
                ["#systems", "Two systems"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-bone-300 transition-colors hover:text-gold-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="frame-raised ticks p-5">
            <span className="mono-label-accent">Ready to see yours?</span>
            <p className="mt-2 text-sm text-bone-300">
              A complete chart, every reduction shown, computed locally.
            </p>
            <Link href="/reading" className="btn btn-primary mt-4 w-full">
              Cast my reading
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <p className="px-1 font-mono text-[10px] leading-relaxed tracking-wider text-bone-500">
            OFFERED FOR REFLECTION, INSPIRATION AND ENTERTAINMENT.
          </p>
        </aside>
      </div>
    </div>
  );
}
