import Link from "next/link";
import { NumberOrb } from "@/components/ui/NumberOrb";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 text-center">
      <div className="animate-float">
        <NumberOrb value="?" size="xl" />
      </div>
      <h1 className="font-display text-4xl text-mystic-50">
        This folio is wanting
      </h1>
      <p className="max-w-md leading-relaxed text-mystic-200/75">
        The page you seek was never bound into this volume, or has been cut
        from it. Return to the frontispiece and take another way.
      </p>
      <Link href="/" className="btn-primary">
        Return to the book
      </Link>
    </div>
  );
}
