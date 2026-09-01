import type { Metadata } from "next";
import { NumbersGrid } from "@/components/numbers/NumbersGrid";
import { PageHeader } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Number Meanings",
  description:
    "An encyclopedia of numerology number meanings — 1 through 9 plus the master numbers 11, 22 and 33, with tarot and astrological correspondences.",
};

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
      <NumbersGrid />
    </div>
  );
}
