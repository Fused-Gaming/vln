import { ImageResponse } from "next/og";
import {
  OG_COLORS,
  OG_SIZE,
  loadInterFont,
  loadJetBrainsFont,
} from "@/lib/og/utils";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const alt = "VLN Blog - Security Research & Vulnerability Disclosures";
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
                border: `2px solid ${c.blue}80`,
                backgroundColor: `${c.blue}15`,
              }}
            >
              <span style={{ fontWeight: 700, fontSize: "24px", color: c.blue }}>V</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: "32px", color: c.white, letterSpacing: "-0.02em" }}>VLN</span>
          </div>

          <span style={{ fontWeight: 700, fontSize: "48px", color: c.white, letterSpacing: "-0.02em" }}>
            Security Research Blog
          </span>

          <span style={{ fontSize: "22px", color: c.gray, maxWidth: "700px" }}>
            Vulnerability Disclosures, Threat Intelligence & Smart Contract Security Insights
          </span>

          {/* Tags row */}
          <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
            {["Audits", "Forensics", "Research", "Advisories"].map((tag, i) => {
              const colors = [c.sage, c.amber, c.blue, c.purple];
              return (
                <div
                  key={tag}
                  style={{
                    display: "flex",
                    padding: "8px 20px",
                    borderRadius: "8px",
                    backgroundColor: `${colors[i]}15`,
                    border: `1px solid ${colors[i]}30`,
                  }}
                >
                  <span style={{ fontFamily: "JetBrains Mono", fontSize: "14px", color: colors[i] }}>{tag}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "16px",
            borderTop: `1px solid ${c.blue}15`,
          }}
        >
          <span style={{ fontFamily: "JetBrains Mono", fontSize: "14px", color: c.grayDark }}>
            vln.gg/blog
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
