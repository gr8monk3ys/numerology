import type { Metadata } from "next";
import { ReadingForm } from "@/components/reading/ReadingForm";
import { PageHeader, StatusBadge } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Full Numerology Reading",
  description:
    "Enter your name and birth date for a complete numerology reading: Life Path, Expression, Soul Urge, Personality, karmic debts, pinnacles, forecasts and esoteric correspondences.",
};

export default function ReadingPage() {
  return (
    <div className="container-page py-14 sm:py-20">
      <PageHeader
        index="01"
        eyebrow="Full reading"
        title={<>Cast your <em>numerology</em> reading</>}
        subtitle="Core numbers, karmic signature, letters, Chaldean vibration, tarot, cycles and correspondences. Every reduction is shown in full."
        meta={<StatusBadge>Runs locally</StatusBadge>}
        className="mb-10"
      />
      <ReadingForm />
    </div>
  );
}
