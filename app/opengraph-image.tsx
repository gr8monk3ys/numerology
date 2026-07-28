import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE, loadOgFonts } from "@/lib/og-card";

export const alt = "Numen · Esoteric Numerology Calculator";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const fonts = await loadOgFonts();
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Esoteric Numerology"
        orb="✦"
        heading="Numen"
        sub="The numbers written into your name & birth"
      />
    ),
    { ...size, fonts },
  );
}
