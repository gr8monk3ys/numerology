import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";
import { angelNumbers, lifePathMeanings, pick } from "@/lib/content";
import { analyzeAngelNumber } from "@/lib/numerology";
import { SITE_URL, SITE_NAME, safeJsonLd } from "@/lib/site";

const PATTERN_LABELS: Record<string, string> = {
  triple: "Triple sequence",
  quadruple: "Quadruple sequence",
  "repeating-pair": "Repeating pair",
  mirror: "Mirror sequence",
  ascending: "Ascending sequence",
  descending: "Descending sequence",
  sequence: "Patterned sequence",
};

// Only sequences in the library exist as pages; the index decoder handles
// arbitrary input client-side.
export const dynamicParams = false;

export function generateStaticParams() {
  return angelNumbers.map((entry) => ({ sequence: entry.number }));
}

function excerpt(text: string, max = 155): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sequence: string }>;
}): Promise<Metadata> {
  const { sequence } = await params;
  const entry = angelNumbers.find((e) => e.number === sequence);
  if (!entry) return {};
  return {
    title: `${entry.number} Angel Number Meaning · ${entry.title}`,
    description: excerpt(entry.meaning),
  };
}

export default async function AngelNumberPage({
  params,
}: {
  params: Promise<{ sequence: string }>;
}) {
  const { sequence } = await params;
  const entry = angelNumbers.find((e) => e.number === sequence);
  if (!entry) notFound();

  const analysis = analyzeAngelNumber(entry.number);
  const rootMeaning = pick(lifePathMeanings, analysis.root);
  const related = angelNumbers
    .filter(
      (e) =>
        e.number !== entry.number &&
        analyzeAngelNumber(e.number).root === analysis.root,
    )
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${entry.number} Angel Number Meaning · ${entry.title}`,
    description: excerpt(entry.meaning),
    url: `${SITE_URL}/angel-numbers/${entry.number}`,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Angel Numbers", item: `${SITE_URL}/angel-numbers` },
      { "@type": "ListItem", position: 2, name: entry.number, item: `${SITE_URL}/angel-numbers/${entry.number}` },
    ],
  };

  return (
    <div className="container-page max-w-4xl py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }}
      />

      <Link
        href="/angel-numbers"
        className="inline-flex items-center gap-2 text-sm text-mystic-200/70 hover:text-gold-200"
      >
        <ArrowLeft className="h-4 w-4" /> All angel numbers
      </Link>

      {/* Hero */}
      <div className="glass-strong relative mt-6 overflow-hidden p-8 text-center sm:p-12">
        <div className="bg-cosmic-radial pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative flex flex-col items-center gap-5">
          <NumberOrb value={entry.number} size="xl" />
          <div>
            <span className="eyebrow">Angel Number {entry.number}</span>
            <h1 className="mt-2 font-display text-4xl text-mystic-50">
              {entry.title}
            </h1>
          </div>
          {analysis.patterns.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {analysis.patterns.map((p) => (
                <Chip key={p} tone="gold">
                  {PATTERN_LABELS[p] ?? p}
                </Chip>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Meaning */}
      <div className="glass mt-8 p-6 sm:p-8">
        <h2 className="font-display text-2xl text-gold-200">The message</h2>
        <p className="dropcap mt-4 leading-relaxed text-mystic-100/90">
          {entry.meaning}
        </p>
      </div>

      {/* Love / Career / Spiritual */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <AspectCard label="In Love" value={entry.love} />
        <AspectCard label="In Career" value={entry.career} />
        <AspectCard label="Spiritual" value={entry.spiritual} />
      </div>

      {/* Root vibration */}
      <div className="glass mt-8 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:p-8">
        <NumberOrb value={analysis.root} size="md" />
        <div className="flex-1">
          <h2 className="font-display text-xl text-mystic-50">
            Root vibration · {analysis.root}
            {rootMeaning ? ` — ${rootMeaning.title}` : ""}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-mystic-200/70">
            Summed and reduced, {entry.number} rests on the energy of the number{" "}
            {analysis.root}. {rootMeaning?.summary}
          </p>
        </div>
        <Link
          href={`/numbers/${analysis.root}`}
          className="btn-ghost shrink-0 text-sm"
        >
          Explore the {analysis.root}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Related sequences */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 font-display text-2xl text-mystic-50">
            Kindred sequences
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.number}
                href={`/angel-numbers/${r.number}`}
                className="glass card-hover group flex items-center gap-4 p-4"
              >
                <NumberOrb value={r.number} size="sm" />
                <div>
                  <span className="font-display text-lg text-mystic-50 group-hover:text-gold-200">
                    {r.number} · {r.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 text-center">
        <Link href="/reading" className="btn-primary">
          Cast your full reading
        </Link>
      </div>
    </div>
  );
}

function AspectCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass p-5">
      <span className="text-xs font-semibold uppercase tracking-widest text-gold-300/70">
        {label}
      </span>
      <p className="mt-2 text-sm leading-relaxed text-mystic-200/80">{value}</p>
    </div>
  );
}
