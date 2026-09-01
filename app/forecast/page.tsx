import type { Metadata } from "next";
import { ForecastForm } from "@/components/forecast/ForecastForm";
import { PageHeader, StatusBadge } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Personal Year Forecast",
  description:
    "Discover your Personal Year, Month and Day, plus the four Pinnacles and Challenges that shape the seasons of your life.",
};

export default function ForecastPage() {
  return (
    <div className="container-page py-14 sm:py-20">
      <PageHeader
        index="03"
        eyebrow="Timing & cycles"
        title={<>Where you are in <em>your</em> cycle</>}
        subtitle="Numerology moves in rhythms. See the energy of your current Personal Year, and map the Pinnacles and Challenges across your lifetime."
        meta={<StatusBadge>Runs locally</StatusBadge>}
        className="mb-10"
      />
      <ForecastForm />
    </div>
  );
}
