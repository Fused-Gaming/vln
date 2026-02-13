import { ImageResponse } from "next/og";
import {
  OG_COLORS,
  OG_SIZE,
  loadInterFont,
  loadJetBrainsFont,
} from "@/lib/og/utils";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const alt = "VLN FAQ - Frequently Asked Questions About Smart Contract Security";
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
                border: `2px solid ${c.sage}80`,
                backgroundColor: `${c.sage}15`,
              }}
            >
              <span style={{ fontWeight: 700, fontSize: "24px", color: c.sage }}>V</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: "32px", color: c.white, letterSpacing: "-0.02em" }}>VLN</span>
          </div>

          <span style={{ fontWeight: 700, fontSize: "48px", color: c.white, letterSpacing: "-0.02em" }}>
            Frequently Asked Questions
          </span>

          <span style={{ fontSize: "22px", color: c.gray, maxWidth: "700px" }}>
            Everything you need to know about smart contract security audits, forensics, and our process
          </span>

          {/* FAQ preview items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px", maxWidth: "700px", width: "100%" }}>
            {[
              "Why pay for an audit when free tools exist?",
              "How long does an audit take?",
              "What's included in the free scan?",
            ].map((q) => (
              <div
                key={q}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  backgroundColor: c.bgLight,
                  border: `1px solid ${c.sage}15`,
                }}
              >
                <span style={{ fontWeight: 700, fontSize: "16px", color: c.sage }}>Q</span>
                <span style={{ fontSize: "15px", color: c.gray }}>{q}</span>
              </div>
            ))}
          </div>
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
            vln.gg/faq
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
