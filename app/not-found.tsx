import Link from "next/link";
import { NumberOrb } from "@/components/ui/NumberOrb";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 text-center">
      <div className="animate-float">
        <NumberOrb value="?" size="xl" />
      </div>
      <h1 className="font-display text-3xl text-mystic-50">
        This path isn&apos;t written in the stars
      </h1>
      <p className="max-w-md text-mystic-200/70">
        The page you seek has drifted beyond the veil. Let the numbers guide you
        home.
      </p>
      <Link href="/" className="btn-primary">
        Return to Numen
      </Link>
    </div>
  );
}
