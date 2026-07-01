import Link from "next/link";
import {
  Sparkles,
  Star,
  Moon,
  Heart,
  Compass,
  BookOpen,
  Wand2,
  Gem,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { SectionHeading, Eyebrow } from "@/components/ui/SectionHeading";

const CORE_NUMBERS = [
  {
    n: "Life Path",
    desc: "The master lesson and direction of your entire life, drawn from your birth date.",
    icon: Compass,
  },
  {
    n: "Expression",
    desc: "Your natural talents and the destiny encoded in your full birth name.",
    icon: Star,
  },
  {
    n: "Soul Urge",
    desc: "Your heart's deepest desire — what your soul secretly longs for.",
    icon: Heart,
  },
  {
    n: "Personality",
    desc: "The self you show the world; the first impression others receive.",
    icon: Moon,
  },
];

const ESOTERIC = [
  {
    title: "Karmic Debt & Lessons",
    desc: "Uncover the 13/14/16/19 debts and the numbers missing from your name.",
    icon: Wand2,
  },
  {
    title: "Pinnacles & Challenges",
    desc: "Map the four great cycles and hurdles that shape each era of your life.",
    icon: Calendar,
  },
  {
    title: "Tarot & Astrology",
    desc: "Every number carries a tarot card, ruling planet, element, gem and chakra.",
    icon: Gem,
  },
  {
    title: "Angel Numbers",
    desc: "Decode 111, 222, 1234 and the synchronicities the universe sends you.",
    icon: Sparkles,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="container-page relative overflow-hidden pt-16 pb-24 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-up">
            <Eyebrow>Pythagorean · Chaldean · Esoteric</Eyebrow>
          </div>
          <h1 className="mt-5 animate-fade-up font-display text-5xl font-bold leading-[1.05] tracking-wide text-mystic-50 sm:text-6xl">
            The numbers written into
            <span className="block gold-text">your name & birth</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-mystic-200/75">
            Numen is a complete esoteric numerology suite. Enter your name and
            birth date to reveal your Life Path, Soul Urge, karmic debts,
            life-cycle forecasts, and the tarot and astrological energies woven
            through every number.
          </p>
          <div className="mt-9 flex animate-fade-up flex-wrap items-center justify-center gap-4">
            <Link href="/reading" className="btn-primary">
              Cast my reading
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/numbers" className="btn-ghost">
              Explore the numbers
            </Link>
          </div>
        </div>

        {/* Floating orbs */}
        <div className="pointer-events-none mt-16 flex items-center justify-center gap-4 sm:gap-8">
          {[3, 7, 1, 11, 5].map((n, i) => (
            <div
              key={n}
              className="animate-float"
              style={{ animationDelay: `${i * 0.7}s` }}
            >
              <NumberOrb
                value={n}
                size={i === 2 ? "lg" : "md"}
                isMaster={n === 11}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Core numbers */}
      <section className="container-page py-12">
        <SectionHeading
          eyebrow="Your core chart"
          title="Five numbers, one soul"
          subtitle="Numerology distills a person into a handful of vibrations. These are the pillars of your chart — the rest of the reading builds on them."
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_NUMBERS.map(({ n, desc, icon: Icon }) => (
            <div key={n} className="glass group p-6 transition-colors hover:border-mystic-400/30">
              <Icon className="h-7 w-7 text-gold-300" />
              <h3 className="mt-4 font-display text-xl text-mystic-50">{n}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mystic-200/70">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Esoteric layer */}
      <section className="container-page py-16">
        <div className="glass-strong relative overflow-hidden p-8 sm:p-12">
          <div className="bg-cosmic-radial pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative">
            <SectionHeading
              eyebrow="Beyond the basics"
              title="The full esoteric toolkit"
              subtitle="Numen doesn't stop at the core numbers. It reads the hidden architecture — the debts you carry, the cycles you move through, and the symbols that resonate with each vibration."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {ESOTERIC.map(({ title, desc, icon: Icon }) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-xl border border-white/5 bg-void-900/40 p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-mystic-500/15 text-gold-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-mystic-50">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-mystic-200/70">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page py-12">
        <SectionHeading
          eyebrow="How it works"
          title="Ancient math, instant insight"
          align="center"
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "Enter your details",
              body: "Your full birth name and date of birth are all the cosmos needs. Everything is computed privately in your browser.",
            },
            {
              step: "02",
              title: "The numbers reduce",
              body: "Letters and dates collapse into single digits — preserving the sacred master numbers 11, 22 and 33.",
            },
            {
              step: "03",
              title: "Your chart unfolds",
              body: "Read a complete portrait: core numbers, karmic patterns, forecasts and symbolic correspondences.",
            },
          ].map(({ step, title, body }) => (
            <div key={step} className="relative">
              <span className="gold-text font-display text-4xl font-bold">
                {step}
              </span>
              <h3 className="mt-3 font-display text-xl text-mystic-50">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mystic-200/70">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-16">
        <div className="glass-strong flex flex-col items-center gap-6 overflow-hidden p-10 text-center sm:p-14">
          <BookOpen className="h-8 w-8 text-gold-300" />
          <h2 className="max-w-xl font-display text-3xl font-semibold text-mystic-50 sm:text-4xl">
            Your chart is waiting to be read
          </h2>
          <p className="max-w-md text-mystic-200/70">
            It takes less than a minute. Discover the numbers that have been with
            you since the moment you were named.
          </p>
          <Link href="/reading" className="btn-primary">
            Begin your reading
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
