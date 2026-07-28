/**
 * Shared layout for Open Graph card images (1200×630), rendered by satori via
 * next/og ImageResponse. Satori constraints shape this code: explicit flex on
 * every multi-child box, static font instances only, inline styles only.
 */

export const OG_SIZE = { width: 1200, height: 630 };

export async function loadOgFonts() {
  const [gothic, garamond] = await Promise.all([
    fetch(new URL("../assets/fonts/GrenzeGotisch-600.ttf", import.meta.url)).then(
      (res) => res.arrayBuffer(),
    ),
    fetch(new URL("../assets/fonts/EBGaramond-500.ttf", import.meta.url)).then(
      (res) => res.arrayBuffer(),
    ),
  ]);
  return [
    { name: "Grenze Gotisch", data: gothic, weight: 600 as const, style: "normal" as const },
    { name: "EB Garamond", data: garamond, weight: 500 as const, style: "normal" as const },
  ];
}

const GOLD = "#d6b566";
const GOLD_SOFT = "rgba(198, 158, 74, 0.45)";
const GOLD_FAINT = "rgba(198, 158, 74, 0.18)";
const PARCHMENT = "#f5ecd4";
const PARCHMENT_SOFT = "rgba(220, 199, 154, 0.78)";
const OXBLOOD = "#a8443b";

export function OgCard({
  eyebrow,
  orb,
  heading,
  sub,
}: {
  eyebrow: string;
  orb: string;
  heading: string;
  sub: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0705",
        backgroundImage:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 84, 30, 0.22), transparent), radial-gradient(ellipse 80% 60% at 50% 110%, rgba(90, 22, 20, 0.18), transparent)",
        fontFamily: "EB Garamond",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 28,
          right: 28,
          bottom: 28,
          border: `2px solid ${GOLD_SOFT}`,
          borderRadius: 4,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 42,
          left: 42,
          right: 42,
          bottom: 42,
          border: `1px solid ${GOLD_FAINT}`,
          borderRadius: 2,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 26,
          padding: "0 100px",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: OXBLOOD,
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 148,
            height: 148,
            borderRadius: 999,
            border: `3px solid ${GOLD_SOFT}`,
            backgroundImage:
              "radial-gradient(circle at 50% 30%, rgba(198, 158, 74, 0.25), rgba(18, 13, 8, 0.9))",
            fontFamily: "Grenze Gotisch",
            fontSize: 76,
            color: "#f3e4b2",
          }}
        >
          {orb}
        </div>

        <div
          style={{
            fontFamily: "Grenze Gotisch",
            fontSize: 78,
            color: PARCHMENT,
            textAlign: "center",
            lineHeight: 1.05,
          }}
        >
          {heading}
        </div>

        <div
          style={{
            fontSize: 32,
            color: PARCHMENT_SOFT,
            textAlign: "center",
          }}
        >
          {sub}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginTop: 8,
            fontFamily: "Grenze Gotisch",
            fontSize: 26,
            letterSpacing: 8,
            color: GOLD,
          }}
        >
          ✦ NUMEN ✦
        </div>
      </div>
    </div>
  );
}
