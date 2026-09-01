import Link from "next/link";
import {
  Star,
  Moon,
  Heart,
  Compass,
  Wand2,
  Gem,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Sun,
  Sparkles,
} from "lucide-react";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { SectionHeading, Eyebrow, StatusBadge } from "@/components/ui/SectionHeading";
import { Terminal } from "@/components/ui/Terminal";
import { Reveal } from "@/components/ui/Reveal";
import { buildReading, type NumberInsight } from "@/lib/numerology";
import { CORE_NUMBER_KEYS, lifePathMeanings, pick } from "@/lib/content";

const CORE_NUMBERS = [
  { n: "Life Path", desc: "The master lesson and direction of your life, drawn from your birth date.", icon: Compass },
  { n: "Expression", desc: "Your natural talents and the destiny encoded in your full birth name.", icon: Star },
  { n: "Soul Urge", desc: "Your heart’s deepest desire, read from the vowels of your name.", icon: Heart },
  { n: "Personality", desc: "The self you show the world, read from the consonants.", icon: Moon },
];

const ESOTERIC = [
  { title: "Tarot birth card", desc: "The Major Arcana card that carries the theme of your whole life.", icon: Sparkles },
  { title: "Sun & Chinese zodiac", desc: "Your astrological signs, read in harmony with your numbers.", icon: Sun },
  { title: "Karmic debt & lessons", desc: "The 13/14/16/19 debts and the numbers missing from your name.", icon: Wand2 },
  { title: "Pinnacles & cycles", desc: "The four great cycles and three life periods that shape each era.", icon: Calendar },
  { title: "Planes of expression", desc: "How physical, mental, emotional and intuitive energy divide in you.", icon: Gem },
  { title: "Angel numbers", desc: "Decode 111, 222, 1234 and the synchronicities you keep noticing.", icon: Star },
];

const STEPS = [
  { title: "Enter your details", body: "Your full birth name and date of birth are all the chart needs. Everything is computed in your browser and nothing is uploaded." },
  { title: "The numbers reduce", body: "Letters map to digits, digits sum, and sums collapse to a single figure, preserving the master numbers 11, 22 and 33." },
  { title: "The chart unfolds", body: "Core numbers, karmic patterns, cycles and symbolic correspondences, each with its reduction shown in full." },
];

const SAMPLE = buildReading({
  fullName: "Ada Augusta Byron",
  birth: { year: 1815, month: 12, day: 10 },
  today: { year: 2026, month: 1, day: 1 },
});

function fmt(i: NumberInsight) {
  return i.steps.join(" → ");
}
function flags(i: NumberInsight) {
  const f: string[] = [];
  if (i.isMaster) f.push("master");
  if (i.karmicDebt) f.push(`karmic ${i.karmicDebt}`);
  return f.join(" · ");
}

const SAMPLE_ROWS: { key: string; insight: NumberInsight }[] = [
  { key: "life path", insight: SAMPLE.core.lifePath },
  { key: "expression", insight: SAMPLE.core.expression },
  { key: "soul urge", insight: SAMPLE.core.soulUrge },
  { key: "personality", insight: SAMPLE.core.personality },
  { key: "birthday", insight: SAMPLE.core.birthday },
  { key: "maturity", insight: SAMPLE.core.maturity },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="container-page relative pt-20 pb-16 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-up flex justify-center">
            <StatusBadge>Pythagorean · Chaldean · Esoteric</StatusBadge>
          </div>
          <h1 className="mt-7 animate-fade-up text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[4.5rem]">
            The numbers written into <em>your name</em> and birth date
          </h1>
          <p className="mx-auto mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-bone-300 sm:text-[17px]">
            Numen is a complete esoteric numerology suite. Enter a name and a
            birth date to reveal the Life Path, Soul Urge, karmic debts, tarot
            birth card, life-cycle forecasts and the correspondences woven
            through every number.
          </p>
          <div className="mt-9 flex animate-fade-up flex-wrap items-center justify-center gap-3">
            <Link href="/reading" className="btn btn-primary">
              Cast my reading
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link href="/numbers" className="btn btn-secondary">
              Explore the numbers
            </Link>
          </div>
        </div>

        {/* Sample computation */}
        <div className="mx-auto mt-16 max-w-3xl animate-fade-up">
          <Terminal title="reading.log" tabs={["pythagorean", "chaldean", "cycles"]}>
            <span className="prompt">$</span>{" "}
            <span className="cmd">numen read &quot;Ada Augusta Byron&quot; --born 1815-12-10</span>
            {"\n\n"}
            {SAMPLE_ROWS.map(({ key, insight }) => (
              <span key={key}>
                {"  "}
                <span className="key">{key.padEnd(14)}</span>
                <span className="val">{fmt(insight)}</span>
                {flags(insight) && (
                  <>
                    {"   "}
                    <span className={insight.karmicDebt ? "rub" : "hi"}>{flags(insight)}</span>
                  </>
                )}
                {"\n"}
              </span>
            ))}
            {"\n  "}
            <span className="key">{"chaldean".padEnd(14)}</span>
            <span className="val">
              {SAMPLE.chaldean.compound} → {SAMPLE.chaldean.root}
            </span>
            {"\n  "}
            <span className="key">{"tarot".padEnd(14)}</span>
            <span className="val">
              {pick(lifePathMeanings, SAMPLE.core.lifePath.value)?.title ?? ""}
            </span>
            {"\n\n"}
            <span className="dim">✓ computed locally in 0.4 ms · nothing sent</span>
            <span className="prompt animate-caret"> ▍</span>
          </Terminal>
        </div>
      </section>

      {/* Stats strip */}
      <section className="container-page">
        <div className="divided grid-cols-2 lg:grid-cols-4">
          {[
            { v: "7", l: "core numbers" },
            { v: "2", l: "letter systems" },
            { v: "22", l: "major arcana" },
            { v: "0", l: "bytes uploaded" },
          ].map((s) => (
            <div key={s.l} className="flex items-baseline gap-3 px-5 py-5">
              <span className="font-mono text-2xl text-gold-200 tabular">{s.v}</span>
              <span className="mono-label">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Core numbers */}
      <Reveal as="section" className="container-page pt-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="01"
            eyebrow="Your core chart"
            title={<>Five numbers, <em>one</em> soul</>}
            subtitle="Numerology distills a person into a handful of vibrations. These are the pillars of a chart. The rest of the reading builds on them."
          />
          <Link href="/about" className="link text-sm">
            Read the method →
          </Link>
        </div>
        <div className="divided mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_NUMBERS.map(({ n, desc, icon: Icon }, i) => (
            <div key={n} className="cell-hover group flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-[3px] border hairline text-gold-300">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="font-mono text-[11px] text-bone-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-8 text-xl">{n}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bone-300">{desc}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Esoteric layer */}
      <Reveal as="section" className="container-page pt-24">
        <div className="frame ticks p-6 sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              index="02"
              eyebrow="Beyond the basics"
              title={<>The full <em>esoteric</em> toolkit</>}
              subtitle="Numen reads the hidden architecture: the debts you carry, the cycles you move through, and the symbols that resonate with each vibration."
            />
            <Link href="/reading" className="btn btn-secondary btn-sm self-start lg:self-auto">
              See it in a reading
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="divided mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {ESOTERIC.map(({ title, desc, icon: Icon }) => (
              <div key={title} className="cell-hover flex gap-4 p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[3px] border hairline text-gold-300">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-lg">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-bone-300">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* How it works */}
      <Reveal as="section" className="container-page pt-24">
        <SectionHeading
          index="03"
          eyebrow="How it works"
          title={<>Ancient arithmetic, <em>instant</em> insight</>}
        />
        <div className="divided mt-10 sm:grid-cols-3">
          {STEPS.map(({ title, body }, i) => (
            <div key={title} className="p-6">
              <span className="font-mono text-4xl text-gold-300/80 tabular">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-xl">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bone-300">{body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Encyclopedia teaser */}
      <Reveal as="section" className="container-page pt-24">
        <div className="section-row">
          <div>
            <Eyebrow index="04">The encyclopedia</Eyebrow>
            <h2 className="mt-2 text-2xl sm:text-3xl">Twelve archetypes</h2>
          </div>
          <Link href="/numbers" className="link text-sm">
            All meanings →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CORE_NUMBER_KEYS.map((key) => {
            const isMaster = key === "11" || key === "22" || key === "33";
            return (
              <Link
                key={key}
                href={`/numbers/${key}`}
                className="frame group flex items-center gap-3 p-3 transition-colors hover:border-gold-400/50"
              >
                <NumberOrb value={key} size="sm" isMaster={isMaster} />
                <span className="min-w-0">
                  <span className="mono-label block">{isMaster ? "Master" : "Root"}</span>
                  <span className="block truncate text-sm text-bone-100 group-hover:text-gold-200">
                    {pick(lifePathMeanings, key)?.title?.replace(/^The /, "") ?? key}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="container-page pt-24">
        <div className="frame-raised ticks flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
          <div className="max-w-xl">
            <Eyebrow accent>Ready when you are</Eyebrow>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Your chart is <em>waiting</em> to be read
            </h2>
            <p className="mt-3 text-[15px] text-bone-300">
              It takes less than a minute. Discover the numbers that have been
              with you since the moment you were named.
            </p>
          </div>
          <Link href="/reading" className="btn btn-primary shrink-0">
            Begin your reading
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Reveal>
    </>
  );
}
