import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const PRIMARY = "#2563EB";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title") ?? "Loop Engine";
  const description =
    searchParams.get("description") ??
    "Open runtime for constrained, observable, and improvable enterprise loops.";
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
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="10" cy="10" r="4" fill={PRIMARY} />
            <circle cx="30" cy="10" r="4" fill={PRIMARY} />
            <circle cx="30" cy="30" r="4" fill={PRIMARY} />
            <circle cx="10" cy="30" r="4" fill={PRIMARY} />
            <line x1="14" y1="10" x2="26" y2="10" stroke={PRIMARY} strokeWidth="1.5" />
            <line x1="30" y1="14" x2="30" y2="26" stroke={PRIMARY} strokeWidth="1.5" />
            <line x1="26" y1="30" x2="14" y2="30" stroke={PRIMARY} strokeWidth="1.5" />
            <line x1="10" y1="26" x2="10" y2="14" stroke={PRIMARY} strokeWidth="1.5" />
          </svg>
          <span
            style={{
              color: "#F8FAFC",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "-0.02em"
            }}
          >
            Loop Engine
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
            loopengine.io
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
