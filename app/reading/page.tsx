import type { Metadata } from "next";
import { ReadingForm } from "@/components/reading/ReadingForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Full Numerology Reading",
  description:
    "Enter your name and birth date for a complete numerology reading: Life Path, Expression, Soul Urge, Personality, karmic debts, pinnacles, forecasts and esoteric correspondences.",
};

export default function ReadingPage() {
  return (
    <div className="container-page py-16">
      <SectionHeading
        eyebrow="Your complete chart"
        title="Cast your numerology reading"
        subtitle="Everything is calculated privately in your browser — nothing you enter ever leaves your device."
        align="center"
        className="mb-12"
      />
      <ReadingForm />
    </div>
  );
}
