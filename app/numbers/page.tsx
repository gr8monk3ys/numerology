import type { Metadata } from "next";
import { NumbersGrid, type NumberCardData } from "@/components/numbers/NumbersGrid";
import { lifePathMeanings, correspondences, CORE_NUMBER_KEYS, pick } from "@/lib/content";
import { PageHeader } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Number Meanings",
  description:
    "An encyclopedia of numerology number meanings — 1 through 9 plus the master numbers 11, 22 and 33, with tarot and astrological correspondences.",
};

// Built once at module scope: static content, the same for every request.
const NUMBERS: NumberCardData[] = CORE_NUMBER_KEYS.map((key) => {
  const meaning = pick(lifePathMeanings, key);
  const corr = pick(correspondences, key);
  return {
    key,
    isMaster: key === "11" || key === "22" || key === "33",
    title: meaning?.title ?? `Number ${key}`,
    summary: meaning?.summary,
    tarot: corr?.tarot,
    element: corr?.element,
  };
});

export default function NumbersIndexPage() {
  return (
    <div className="container-page py-14 sm:py-20">
      <PageHeader
        index="05"
        eyebrow="The encyclopedia"
        title={<>Meanings of the <em>numbers</em></>}
        subtitle="Every number is an archetype with its own personality, gifts and shadows. Explore the single digits and the master numbers."
        className="mb-8"
      />
      <NumbersGrid numbers={NUMBERS} />
    </div>
  );
}
