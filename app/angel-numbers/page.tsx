import type { Metadata } from "next";
import { AngelLookup } from "@/components/angel/AngelLookup";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { PageHeader, SectionRow } from "@/components/ui/SectionHeading";
import { angelNumbers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Angel Numbers",
  description:
    "Decode angel numbers like 111, 222, 444 and 1234 — repeating sequences read as messages of guidance from the universe.",
};

export default function AngelNumbersPage() {
  return (
    <div className="container-page py-14 sm:py-20">
      <PageHeader
        index="04"
        eyebrow="Synchronicity"
        title={<>Angel <em>numbers</em></>}
        subtitle="Keep seeing the same number everywhere? Repeating sequences are read as nudges from the universe. Decode yours, or browse the library."
        className="mb-10"
      />

      <AngelLookup />

      <section className="mt-24 space-y-6">
        <SectionRow index="02" title="The library" meta={`${angelNumbers.length} sequences`} />
        <div className="divided sm:grid-cols-2 lg:grid-cols-3">
          {angelNumbers.map((a) => (
            <div key={a.number} className="cell-hover flex flex-col gap-3 p-5">
              <div className="flex items-center gap-3">
                <NumberOrb value={a.number} size="sm" />
                <h3 className="text-lg">{a.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-bone-300">{a.meaning}</p>
              <dl className="mt-auto space-y-1.5 border-t hairline pt-3 text-xs text-bone-300">
                <div className="flex gap-2">
                  <dt className="mono-label w-14 shrink-0">Love</dt>
                  <dd>{a.love}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="mono-label w-14 shrink-0">Career</dt>
                  <dd>{a.career}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
