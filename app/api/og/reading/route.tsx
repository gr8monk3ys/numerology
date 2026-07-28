import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { parseReadingParams, parseIsoDate } from "@/lib/share";
import { lifePathNumber, parseName } from "@/lib/numerology";
import { lifePathMeanings, pick } from "@/lib/content";
import { OgCard, OG_SIZE, loadOgFonts } from "@/lib/og-card";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Fonts load once per server instance, not per request.
const fontsPromise = loadOgFonts();

export async function GET(request: NextRequest) {
  const fonts = await fontsPromise;
  const params = Object.fromEntries(request.nextUrl.searchParams);
  const state = parseReadingParams(params);
  const date = state ? parseIsoDate(state.dob) : null;

  // Any malformed link gets the generic brand card, never an error image.
  if (!state || !date) {
    return new ImageResponse(
      (
        <OgCard
          eyebrow="Esoteric Numerology"
          orb="✦"
          heading="Numen"
          sub="The numbers written into your name & birth"
        />
      ),
      { ...OG_SIZE, fonts },
    );
  }

  const lifePath = lifePathNumber(date);
  const meaning = pick(lifePathMeanings, lifePath.value);
  const firstName = parseName(state.name).first;
  const born = `${MONTHS[date.month - 1]} ${date.day}, ${date.year}`;

  return new ImageResponse(
    (
      <OgCard
        eyebrow={`Life Path ${lifePath.value}`}
        orb={String(lifePath.value)}
        heading={meaning?.title ?? `Life Path ${lifePath.value}`}
        sub={`${firstName} · born ${born}`}
      />
    ),
    { ...OG_SIZE, fonts },
  );
}
