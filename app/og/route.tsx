import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { SITE } from "@/lib/site-config";

export const runtime = "edge";

// Brand governance teal (brighter variant for legibility on the dark canvas).
const PRIMARY = "#14B8A6";
// Governance perimeter on the dark canvas reads as light "authority" ink.
const PERIMETER = "#F8FAFC";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title") ?? SITE.brandName;
  const description =
    searchParams.get("description") ?? SITE.tagline;
  const section = searchParams.get("section") ?? null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0A0F1E",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          fontFamily: "Georgia, serif",
          position: "relative"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "16px", zIndex: 1 }}>
          {/* Boss Loops mark: governed operational cycle (perimeter) opened on
              the right by the teal governance gate. */}
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M 35 15 L 35 11.25 A 6.25 6.25 0 0 0 28.75 5 L 11.25 5 A 6.25 6.25 0 0 0 5 11.25 L 5 28.75 A 6.25 6.25 0 0 0 11.25 35 L 28.75 35 A 6.25 6.25 0 0 0 35 28.75 L 35 25"
              fill="none"
              stroke={PERIMETER}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="33.4" y="15.6" width="3.2" height="8.8" rx="1.4" fill={PRIMARY} />
          </svg>
          <span
            style={{
              color: "#F8FAFC",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase"
            }}
          >
            {SITE.brandName}
          </span>
          {section ? (
            <span
              style={{
                color: PRIMARY,
                fontSize: "13px",
                fontFamily: "monospace",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginLeft: "8px",
                padding: "4px 10px",
                border: `1px solid ${PRIMARY}`,
                borderRadius: "4px"
              }}
            >
              {section}
            </span>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", zIndex: 1 }}>
          <div
            style={{
              color: "#F8FAFC",
              fontSize: title.length > 40 ? "44px" : "56px",
              fontWeight: 700,
              lineHeight: "1.05",
              letterSpacing: "-0.03em",
              maxWidth: "900px"
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: "#94A3B8",
              fontSize: "22px",
              lineHeight: "1.5",
              maxWidth: "780px",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 400
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1
          }}
        >
          <span
            style={{
              color: "#475569",
              fontSize: "16px",
              fontFamily: "monospace",
              letterSpacing: "0.04em"
            }}
          >
            {SITE.legacy.domainHost}
          </span>
          <span
            style={{
              color: "#475569",
              fontSize: "13px",
              fontFamily: "monospace",
              letterSpacing: "0.06em",
              textTransform: "uppercase"
            }}
          >
            Apache-2.0 · Open Source
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
