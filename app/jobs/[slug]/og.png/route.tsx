import { ImageResponse } from "next/og";
import {
  formatEmploymentType,
  getJobPostingBySlug,
  getOpenJobPostings,
} from "@/lib/jobPostings";
import { loadGoogleFont } from "@/lib/loadGoogleFont";
import { getLogoDataUri } from "@/lib/logoDataUri";

export async function generateStaticParams() {
  const jobs = await getOpenJobPostings();
  return jobs.map((job) => ({ slug: job.slug }));
}

const NAVY = "#0c2a4d";
const GREEN = "#1b8a3e";
const GRAY = "#7c8c92";

const icons = {
  employmentType: (color: string) => (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  languages: (color: string) => (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15 15 0 0 1 0 20" />
      <path d="M12 2a15 15 0 0 0 0 20" />
    </svg>
  ),
  location: (color: string) => (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const job = await getJobPostingBySlug(slug);
  const spaceGrotesk = await loadGoogleFont("Space+Grotesk", 700);

  const chips = job
    ? [
        {
          key: "employmentType" as const,
          label: "Employment Type",
          value: formatEmploymentType(job.employmentType),
        },
        {
          key: "languages" as const,
          label: "Languages",
          value: "English & French",
        },
        {
          key: "location" as const,
          label: "Location",
          value: job.location ?? "Bujumbura, Burundi",
        },
      ]
    : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
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
            position: "absolute",
            top: 190,
            left: 56,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: GREEN,
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: GREEN,
              display: "flex",
            }}
          >
            We&apos;re hiring
          </div>
        </div>

        <div style={{ position: "absolute", top: 56, right: 64, display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: GREEN,
              color: "#fff",
              fontWeight: 800,
              fontSize: 26,
              padding: "24px 44px",
              borderRadius: 999,
            }}
          >
            Apply now →
          </div>
        </div>

        <div
          style={{
            display: "flex",
            paddingTop: 250,
            paddingLeft: 56,
            paddingRight: 56,
          }}
        >
          <div
            style={{
              fontFamily: "Space Grotesk",
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1,
              color: NAVY,
              maxWidth: 1088,
              display: "flex",
              whiteSpace: "normal",
              wordBreak: "break-word",
              overflow: "hidden",
            }}
          >
            {job?.title.trim() ?? "Open position"}
          </div>
        </div>

        <div style={{ flex: 1, display: "flex" }} />

        {chips.length > 0 && (
          <div style={{ display: "flex", gap: 24, padding: "0 64px 64px" }}>
            {chips.map((chip) => (
              <div
                key={chip.label}
                style={{
                  flex: 1,
                  minWidth: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  background: "#fff",
                  border: "1px solid rgba(12,42,77,.08)",
                  borderRadius: 20,
                  padding: "32px 30px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    background:
                      chip.key === "location"
                        ? "rgba(27,138,62,.12)"
                        : "rgba(12,42,77,.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {icons[chip.key](chip.key === "location" ? GREEN : NAVY)}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: GRAY,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      display: "flex",
                    }}
                  >
                    {chip.label}
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 22,
                      fontWeight: 700,
                      color: NAVY,
                      display: "flex",
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      overflow: "hidden",
                    }}
                  >
                    {chip.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Space Grotesk", data: spaceGrotesk, weight: 700, style: "normal" }],
    },
  );
}
