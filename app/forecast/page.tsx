import type { Metadata } from "next";
import { ForecastForm } from "@/components/forecast/ForecastForm";
import { UniversalToday } from "@/components/forecast/UniversalToday";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "The Almanac of Cycles",
  description:
    "The Personal Year, Month and Day now in force, and the four Pinnacles and Challenges that shape the seasons of a life.",
};

export default function ForecastPage() {
  return (
    <div className="container-page py-16">
      <SectionHeading
        as="h1"
        eyebrow="Chapter the Third"
        title="The Almanac of Cycles"
        subtitle="Numerology moves in nines. Find the vibration now in force, and the great Pinnacles and Challenges laid across your years."
        align="center"
        className="mb-12"
      />
      <UniversalToday />
      <ForecastForm />
    </div>
  );
}
