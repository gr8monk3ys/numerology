import type { Metadata } from "next";
import { CompatibilityForm } from "@/components/compatibility/CompatibilityForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Numerology Compatibility",
  description:
    "Compare two Life Path numbers to reveal your numerological compatibility — harmony score, strengths, and relationship guidance.",
};

export default function CompatibilityPage() {
  return (
    <div className="container-page py-16">
      <SectionHeading
        as="h1"
        eyebrow="Two souls, two numbers"
        title="Numerology compatibility"
        subtitle="Enter two birth dates to compare Life Paths and reveal the harmony — and the growth — written between you."
        align="center"
        className="mb-12"
      />
      <CompatibilityForm />
    </div>
  );
}
