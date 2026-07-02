import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt =
  "Numen — Liber Numerorum. The numbers written into your name and birth.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(80% 60% at 50% 0%, #241a0e 0%, #0a0705 70%)",
          color: "#e8d9ba",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* outer frame */}
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: "1px solid rgba(193,154,70,0.5)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 36,
            right: 36,
            bottom: 36,
            border: "1px solid rgba(193,154,70,0.22)",
            display: "flex",
          }}
        />

        <div
          style={{
            fontSize: 26,
            letterSpacing: 12,
            color: "#bc5a50",
            textTransform: "uppercase",
          }}
        >
          Liber Numerorum
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 148,
            fontWeight: 700,
            color: "#e6cf8e",
            textShadow: "0 2px 24px rgba(193,154,70,0.35)",
          }}
        >
          {SITE_NAME}
        </div>

        <div
          style={{
            marginTop: 18,
            fontSize: 34,
            fontStyle: "italic",
            color: "#d6c299",
          }}
        >
          or, The Numbers Written into Your Name &amp; Birth
        </div>

        <div
          style={{
            marginTop: 46,
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div style={{ width: 90, height: 1, background: "rgba(193,154,70,0.6)", display: "flex" }} />
          <div
            style={{
              width: 12,
              height: 12,
              background: "rgba(193,154,70,0.9)",
              transform: "rotate(45deg)",
              display: "flex",
            }}
          />
          <div style={{ width: 90, height: 1, background: "rgba(193,154,70,0.6)", display: "flex" }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
