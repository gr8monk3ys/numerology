import type { Metadata } from "next";
import { ForecastForm } from "@/components/forecast/ForecastForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Personal Year Forecast",
  description:
    "Discover your Personal Year, Month and Day, plus the four Pinnacles and Challenges that shape the seasons of your life.",
};

export default function ForecastPage() {
  return (
    <div className="container-page py-16">
      <SectionHeading
        as="h1"
        eyebrow="Timing & cycles"
        title="Where you are in your cycle"
        subtitle="Numerology moves in rhythms. See the energy of your current Personal Year, and map the great Pinnacles and Challenges across your lifetime."
        align="center"
        className="mb-12"
      />
      <ForecastForm />
    </div>
  );
}
