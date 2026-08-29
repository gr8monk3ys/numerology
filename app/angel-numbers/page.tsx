import type { Metadata } from "next";
import { AngelLookup } from "@/components/angel/AngelLookup";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { angelNumbers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Angel Numbers",
  description:
    "Decode angel numbers like 111, 222, 444 and 1234 — repeating sequences read as messages of guidance from the universe.",
};

export default function AngelNumbersPage() {
  return (
    <div className="container-page py-16">
      <SectionHeading
        eyebrow="Synchronicity"
        title="Angel numbers"
        subtitle="Keep seeing the same number everywhere? Repeating sequences are read as nudges from the universe. Decode yours below, or browse the library."
        align="center"
        className="mb-12"
      />

      <AngelLookup />

      <div className="mt-20">
        <h2 className="mb-8 text-center font-display text-2xl text-mystic-50">
          The angel number library
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {angelNumbers.map((a) => (
            <div key={a.number} className="glass flex flex-col gap-3 p-6">
              <div className="flex items-center gap-3">
                <NumberOrb value={a.number} size="sm" />
                <h3 className="font-display text-lg text-mystic-50">
                  {a.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-mystic-200/85">
                {a.meaning}
              </p>
              <div className="mt-auto space-y-1.5 border-t border-white/5 pt-3 text-xs text-mystic-200/85">
                <p>
                  <span className="text-gold-300/80">Love · </span>
                  {a.love}
                </p>
                <p>
                  <span className="text-gold-300/80">Career · </span>
                  {a.career}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
