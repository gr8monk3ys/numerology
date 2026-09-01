import type { Metadata } from "next";
import { CompatibilityForm } from "@/components/compatibility/CompatibilityForm";
import { PageHeader, StatusBadge } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Numerology Compatibility",
  description:
    "Compare two Life Path numbers to reveal your numerological compatibility — harmony score, strengths, and relationship guidance.",
};

export default function CompatibilityPage() {
  return (
    <div className="container-page py-14 sm:py-20">
      <PageHeader
        index="02"
        eyebrow="Compatibility"
        title={<>Two souls, <em>two</em> numbers</>}
        subtitle="Enter two birth dates to compare Life Paths and reveal the harmony, and the growth, written between you."
        meta={<StatusBadge>Runs locally</StatusBadge>}
        className="mb-10"
      />
      <CompatibilityForm />
    </div>
  );
}
