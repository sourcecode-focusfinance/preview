import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/loadGoogleFont";
import { getLogoDataUri } from "@/lib/logoDataUri";

export const dynamic = "force-static";

const NAVY = "#0c2a4d";
const GREEN = "#1b8a3e";

export async function GET() {
  const spaceGrotesk = await loadGoogleFont("Space+Grotesk", 700);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#f5f8f6",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getLogoDataUri()}
          alt="FOCUS Finance"
          width={220}
          height={110}
          style={{ position: "absolute", top: 56, left: 56, objectFit: "contain" }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            paddingLeft: 56,
            paddingRight: 56,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: GREEN,
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 999, background: GREEN, display: "flex" }} />
            We&apos;re hiring
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1,
              color: NAVY,
              maxWidth: 900,
              display: "flex",
            }}
          >
            Open positions at FOCUS Finance
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Space Grotesk", data: spaceGrotesk, weight: 700, style: "normal" }],
    },
  );
}
