import type { Metadata } from "next";
import { AngelLookup } from "@/components/angel/AngelLookup";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { angelNumbers } from "@/lib/content/angel";

export const metadata: Metadata = {
  title: "An Index of Portents",
  description:
    "Repeating numbers — 111, 222, 444, 11:11 — read as omens: their meanings in love, work and spirit.",
};

export default function AngelNumbersPage() {
  return (
    <div className="container-page py-16">
      <SectionHeading
        as="h1"
        eyebrow="Chapter the Fourth"
        title="An Index of Portents"
        subtitle="When the same number appears again and again — on clocks, doors, receipts — tradition reads it as a sign. Consult the index below."
        align="center"
        className="mb-12"
      />

      <AngelLookup />

      <div className="mx-auto mt-24 max-w-4xl">
        <h2 className="text-center font-display text-3xl text-mystic-50">
          The Portents, Alphabetically of Number
        </h2>
        <div className="rule-ornament mt-4 text-sm">☙</div>

        <dl className="mt-10 columns-1 gap-10 md:columns-2">
          {angelNumbers.map((a) => (
            <div
              key={a.number}
              className="mb-8 break-inside-avoid border-b border-gold-500/15 pb-6"
            >
              <dt className="flex items-baseline gap-3">
                <span className="font-blackletter text-3xl text-gold-300">
                  {a.number}
                </span>
                <span className="font-display text-lg text-mystic-50">
                  {a.title}
                </span>
              </dt>
              <dd className="mt-2 text-note">
                {a.meaning}
              </dd>
              <dd className="mt-2 text-sm italic leading-relaxed text-mystic-300/80">
                In love, {lowerFirst(a.love)} In work, {lowerFirst(a.career)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function lowerFirst(s: string): string {
  if (!s) return s;
  return s.charAt(0).toLowerCase() + s.slice(1);
}
