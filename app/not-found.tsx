import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NumberOrb } from "@/components/ui/NumberOrb";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] items-center justify-center py-20">
      <div className="frame flex max-w-lg flex-col items-start gap-5 p-8 sm:p-10">
        <NumberOrb value="404" size="md" />
        <h1 className="text-3xl sm:text-4xl">
          This path isn’t <em>written</em> anywhere
        </h1>
        <p className="text-base text-bone-300">
          The page you seek has drifted beyond the chart. Let the numbers guide
          you home.
        </p>
        <Link href="/" className="btn btn-secondary">
          <ArrowLeft className="h-3.5 w-3.5" />
          Return to Numen
        </Link>
      </div>
    </div>
  );
}
