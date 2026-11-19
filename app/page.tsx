import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DialHero } from "@/components/home/DialHero";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { AdSlot } from "@/components/AdSense";
import { AD_SLOTS } from "@/lib/adsense";
import { buildReading, classifyLetters } from "@/lib/numerology";
import { CORE_NUMBER_KEYS, lifePathMeanings, pick } from "@/lib/content";

const BEYOND = [
  { title: "Tarot birth card", desc: "The Major Arcana card that carries the theme of your whole life." },
  { title: "Sun & Chinese zodiac", desc: "Your astrological signs, read in harmony with your numbers." },
  { title: "Karmic debt & lessons", desc: "The 13/14/16/19 debts and the numbers missing from your name." },
  { title: "Pinnacles & cycles", desc: "The four great cycles and three life periods that shape each era." },
  { title: "Planes of expression", desc: "How physical, mental, emotional and intuitive energy divide in you." },
  { title: "Angel numbers", desc: "Decode 111, 222, 1234 and the synchronicities you keep noticing." },
];

const SAMPLE = buildReading({
  fullName: "Ada Augusta Byron",
  birth: { year: 1815, month: 12, day: 10 },
  today: { year: 2026, month: 1, day: 1 },
});

const SAMPLE_WORDS = SAMPLE.name.all.map((word) => classifyLetters(word));
const EXPRESSION = SAMPLE.core.expression;

export default function HomePage() {
  return (
    <>
      <DialHero
        sample={SAMPLE}
        sampleCaption="A sample setting: Ada Augusta Byron, born 10 December 1815. Press a row to swing the hand to it."
      />

      {/* Beyond the six rings: the one sky field on the page. */}
      <section className="frame-raised mt-24">
        <div className="container-page py-16 sm:py-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-4xl sm:text-5xl">Beyond the six rings</h2>
              <p className="mt-4 text-lg text-bone-100">
                Numen reads the hidden architecture: the debts you carry, the
                cycles you move through, and the symbols that resonate with
                each vibration.
              </p>
            </div>
            <Link href="/reading" className="btn btn-primary self-start lg:self-auto">
              See it in a reading
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <dl className="mt-12 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {BEYOND.map(({ title, desc }) => (
              <div key={title} className="border-t border-gold-300/40 py-5">
                <dt className="text-xl font-semibold text-bone-50">{title}</dt>
                <dd className="mt-1 text-bone-300">{desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* One sum, worked in full */}
      <section className="container-page pt-24">
        <h2 className="max-w-2xl text-4xl sm:text-5xl">Ancient arithmetic, shown in full</h2>
        <p className="mt-4 text-lg text-bone-200">
          Every letter has a digit. Here is the Expression number of Ada
          Augusta Byron, exactly as Numen works it: letters to digits, digits
          to a total, the total reduced to a single figure.
        </p>
        <div className="frame mt-10 py-8">
          <div className="flex flex-wrap gap-x-10 gap-y-6">
            {SAMPLE_WORDS.map((letters, w) => (
              <div key={w} className="flex">
                {letters.map((l, i) => (
                  <div key={i} className="w-9 text-center">
                    <div className="text-2xl font-semibold text-bone-50">{l.letter}</div>
                    <div className="mt-1 border-t hairline pt-1 font-figures text-xl text-gold-200">{l.value}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p className="mt-8 font-figures text-xl text-bone-100">
            {SAMPLE_WORDS.map((letters) => letters.map((l) => l.value).join(" + ")).join(" + ")} = {EXPRESSION.total}
          </p>
          {EXPRESSION.steps.slice(1).map((next, i) => (
            <p key={next} className="mt-2 font-figures text-xl text-bone-100">
              {String(EXPRESSION.steps[i]).split("").join(" + ")} ={" "}
              <span className={next === EXPRESSION.value ? "text-gold-200" : undefined}>{next}</span>
            </p>
          ))}
          <p className="mt-6 text-bone-300">
            Master numbers 11, 22 and 33 are kept and not reduced further.{" "}
            <Link href="/about" className="link">Read the whole method</Link>
          </p>
        </div>
      </section>

      <div className="container-page">
        <AdSlot slot={AD_SLOTS.content} className="mt-20" />
      </div>

      {/* The twelve numbers */}
      <section className="container-page pt-20">
        <div className="section-row">
          <h2 className="text-4xl sm:text-5xl">Twelve archetypes</h2>
          <Link href="/numbers" className="link shrink-0">All meanings</Link>
        </div>
        <ul className="mt-10 grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-6">
          {CORE_NUMBER_KEYS.map((key) => (
            <li key={key}>
              <Link href={`/numbers/${key}`} className="group flex flex-col items-center gap-3 text-center">
                <NumberOrb
                  value={key}
                  size="lg"
                  isMaster={key === "11" || key === "22" || key === "33"}
                  className="transition-colors group-hover:border-gold-200"
                />
                <span className="text-bone-100 group-hover:text-gold-200">
                  {pick(lifePathMeanings, key)?.title?.replace(/^The /, "") ?? key}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Close */}
      <section className="container-page pt-24">
        <div className="frame flex flex-col items-start gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-4xl sm:text-5xl">Your chart is waiting to be read</h2>
            <p className="mt-3 text-lg text-bone-300">
              It takes less than a minute. Discover the numbers that have been
              with you since the moment you were named.
            </p>
          </div>
          <Link href="/reading" className="btn btn-primary shrink-0">
            Begin your reading
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
