import { ImageResponse } from "next/og";
import {
  OG_COLORS,
  OG_SIZE,
  loadInterFont,
  loadJetBrainsFont,
} from "@/lib/og/utils";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const alt = "VLN Terms of Service - Legal Agreement";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OGImage() {
  const [interBold, interRegular, jetbrains] = await Promise.all([
    loadInterFont("700"),
    loadInterFont("400"),
    loadJetBrainsFont("400"),
  ]);

  const c = OG_COLORS;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: c.bg,
          padding: "48px",
          fontFamily: "Inter",
        }}
      >
        {/* Main content - centered */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            gap: "28px",
            textAlign: "center",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                border: `2px solid ${c.sage}80`,
                backgroundColor: `${c.sage}15`,
              }}
            >
              <span style={{ fontWeight: 700, fontSize: "24px", color: c.sage }}>V</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: "32px", color: c.white, letterSpacing: "-0.02em" }}>VLN</span>
          </div>

          {/* Headline */}
          <span
            style={{
              fontWeight: 700,
              fontSize: "48px",
              color: c.white,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Terms of Service
          </span>

          {/* Subheadline */}
          <span
            style={{
              fontSize: "22px",
              color: c.gray,
              lineHeight: 1.4,
              maxWidth: "600px",
            }}
          >
            Legal framework for using VLN&apos;s security services
          </span>

          {/* Document badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "16px 40px",
              borderRadius: "12px",
              backgroundColor: `${c.purple}20`,
              border: `2px solid ${c.purple}40`,
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "24px" }}>📄</span>
            <span style={{ fontWeight: 700, fontSize: "18px", color: c.purple }}>
              Legal Document
            </span>
          </div>

          {/* Info */}
          <span
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: "15px",
              color: c.grayDark,
              marginTop: "12px",
            }}
          >
            Last Updated: January 2025
          </span>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "16px",
            borderTop: `1px solid ${c.sage}15`,
          }}
        >
          <span style={{ fontFamily: "JetBrains Mono", fontSize: "14px", color: c.grayDark }}>
            vln.gg/terms
          </span>
          <span style={{ fontFamily: "JetBrains Mono", fontSize: "14px", color: c.grayDark }}>
            Powered by Fused Gaming
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: jetbrains, weight: 400, style: "normal" },
      ],
    }
  );
}
