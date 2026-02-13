import { ImageResponse } from "next/og";
import {
  OG_COLORS,
  OG_SIZE,
  loadInterFont,
  loadJetBrainsFont,
} from "@/lib/og/utils";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const alt = "About VLN - Vulnerability Lab Network by Fused Gaming";
export const size = OG_SIZE;
export const contentType = "image/png";

const stats = [
  { value: "12", label: "Years", color: OG_COLORS.sage },
  { value: "47", label: "Vulns Found", color: OG_COLORS.blue },
  { value: "$5.2M", label: "Recovered", color: OG_COLORS.amber },
  { value: "24/7", label: "Response", color: OG_COLORS.purple },
];

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
            gap: "24px",
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

          {/* Title */}
          <span style={{ fontWeight: 700, fontSize: "46px", color: c.white, letterSpacing: "-0.02em" }}>
            Vulnerability Lab Network
          </span>

          {/* Tagline */}
          <span style={{ fontSize: "22px", color: c.sage, fontWeight: 600 }}>
            iGaming Security & Smart Contract Intelligence
          </span>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "16px 28px",
                  borderRadius: "12px",
                  backgroundColor: c.bgLight,
                  border: `1px solid ${stat.color}25`,
                  gap: "4px",
                }}
              >
                <span style={{ fontWeight: 700, fontSize: "28px", color: stat.color }}>
                  {stat.value}
                </span>
                <span style={{ fontSize: "13px", color: c.gray }}>{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Attribution */}
          <span style={{ fontFamily: "JetBrains Mono", fontSize: "16px", color: c.grayDark, marginTop: "8px" }}>
            Powered by Fused Gaming
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
            vln.gg/about
          </span>
          <span style={{ fontFamily: "JetBrains Mono", fontSize: "14px", color: c.grayDark }}>
            12 Years Experience
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
