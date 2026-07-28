import type { Metadata } from "next";
import { ReadingForm } from "@/components/reading/ReadingForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { parseReadingParams, parseIsoDate, buildReadingQuery } from "@/lib/share";
import { lifePathNumber, parseName } from "@/lib/numerology";
import { lifePathMeanings, pick } from "@/lib/content";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const staticMetadata: Metadata = {
  title: "Full Numerology Reading",
  description:
    "Enter your name and birth date for a complete numerology reading: Life Path, Expression, Soul Urge, Personality, karmic debts, pinnacles, forecasts and esoteric correspondences.",
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const state = parseReadingParams(await searchParams);
  if (!state) return staticMetadata;

  const date = parseIsoDate(state.dob);
  if (!date) return staticMetadata;

  const lifePath = lifePathNumber(date);
  const meaning = pick(lifePathMeanings, lifePath.value);
  const firstName = parseName(state.name).first;
  const title = `${firstName}'s Numerology Reading · Life Path ${lifePath.value}`;
  const description =
    meaning?.summary ??
    `A complete numerology reading for Life Path ${lifePath.value}.`;

  return {
    title,
    description,
    // Shared readings are personal permutations, not indexable content.
    robots: { index: false },
    openGraph: {
      title,
      description,
      images: [`/api/og/reading?${buildReadingQuery(state)}`],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ReadingPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const initial = parseReadingParams(await searchParams);

  return (
    <div className="container-page py-16">
      <SectionHeading
        as="h1"
        eyebrow="Your complete chart"
        title="Cast your numerology reading"
        subtitle="Your reading is calculated privately in your browser. Sharing a link places the name and birth date in the URL so the reading can be recreated."
        align="center"
        className="mb-12"
      />
      <ReadingForm initial={initial} />
    </div>
  );
}
