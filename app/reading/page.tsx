import type { Metadata } from "next";
import { ReadingForm } from "@/components/reading/ReadingForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "The Reading",
  description:
    "The full chart cast from name and birth date: Life Path, Expression, Soul Urge, Personality, the karmic record, the Lo Shu grid, cycles, and the correspondences of tarot, planet and stone.",
};

export default function ReadingPage() {
  return (
    <div className="container-page py-16">
      <SectionHeading
        as="h1"
        eyebrow="Chapter the First"
        title="The Reading"
        subtitle="Give the name as it was written at birth, and the date. The reckoning is worked entirely within your own device; nothing you enter leaves it."
        align="center"
        className="mb-12"
      />
      <ReadingForm />
    </div>
  );
}
