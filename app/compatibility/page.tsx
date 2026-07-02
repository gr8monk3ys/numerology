import type { Metadata } from "next";
import { CompatibilityForm } from "@/components/compatibility/CompatibilityForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "The Concordance of Two Souls",
  description:
    "Two Life Path numbers weighed against one another: the concord between them, and counsel for the pairing.",
};

export default function CompatibilityPage() {
  return (
    <div className="container-page py-16">
      <SectionHeading
        eyebrow="Chapter the Second"
        title="The Concordance of Two Souls"
        subtitle="Set down two dates of birth, and the Life Paths will be weighed one against the other — the harmony found, and the schooling."
        align="center"
        className="mb-12"
      />
      <CompatibilityForm />
    </div>
  );
}
