import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "What If War Money Was Spent On Life?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top red accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#DC2626",
          }}
        />

        {/* Subtle background dots */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, #E2E8F0 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.4,
          }}
        />

        {/* Small red line above label */}
        <div
          style={{
            width: "48px",
            height: "4px",
            background: "#DC2626",
            borderRadius: "2px",
            marginBottom: "20px",
            display: "flex",
          }}
        />

        {/* Label */}
        <div
          style={{
            fontSize: "14px",
            letterSpacing: "6px",
            textTransform: "uppercase",
            color: "#94A3B8",
            fontWeight: 700,
            marginBottom: "24px",
            fontFamily: "sans-serif",
            display: "flex",
          }}
        >
          INTERACTIVE DATA REPORT
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: "68px",
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#0F172A",
            textAlign: "center",
            maxWidth: "880px",
            letterSpacing: "-1px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>What If War Money</span>
          <span style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            Was Spent On{" "}
            <span style={{ color: "#DC2626", fontStyle: "italic" }}>Life</span>?
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "20px",
            color: "#94A3B8",
            marginTop: "28px",
            fontFamily: "sans-serif",
            display: "flex",
          }}
        >
          Based on SIPRI 2024 data · Stockholm International Peace Research Institute
        </div>

        {/* Budget highlight */}
        <div
          style={{
            marginTop: "36px",
            padding: "18px 48px",
            borderRadius: "16px",
            background: "#FAFBFC",
            border: "1px solid #F1F5F9",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#94A3B8",
              fontFamily: "sans-serif",
              marginBottom: "4px",
              display: "flex",
            }}
          >
            COMBINED MILITARY SPENDING
          </div>
          <div
            style={{
              fontSize: "52px",
              fontWeight: 800,
              color: "#DC2626",
              letterSpacing: "-2px",
              display: "flex",
            }}
          >
            $1,561.8B / year
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "#CBD5E1",
              fontFamily: "sans-serif",
              display: "flex",
            }}
          >
            8 nations tracked
          </div>
        </div>

        {/* Bottom credit */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            fontSize: "14px",
            color: "#CBD5E1",
            fontFamily: "sans-serif",
            display: "flex",
          }}
        >
          by @itsabader
        </div>
      </div>
    ),
    { ...size }
  );
}
