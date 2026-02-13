import { ImageResponse } from "next/og";
import {
  OG_COLORS,
  OG_SIZE,
  loadInterFont,
  loadJetBrainsFont,
} from "@/lib/og/utils";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const alt = "VLN Pricing - Transparent Smart Contract Audit Pricing";
export const size = OG_SIZE;
export const contentType = "image/png";

const tiers = [
  { name: "Small", lines: "< 500 lines", price: "$2K-4K" },
  { name: "Medium", lines: "500-2K lines", price: "$5K-8K" },
  { name: "Large", lines: "2K+ lines", price: "$10K+" },
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
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              border: `2px solid ${c.sage}80`,
              backgroundColor: `${c.sage}15`,
            }}
          >
            <span style={{ fontWeight: 700, fontSize: "20px", color: c.sage }}>V</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: "24px", color: c.white, letterSpacing: "-0.02em" }}>VLN</span>
        </div>

        {/* Title */}
        <div style={{ display: "flex", gap: "12px", marginTop: "32px", alignItems: "baseline" }}>
          <span style={{ fontWeight: 700, fontSize: "44px", color: c.white, letterSpacing: "-0.02em" }}>
            Transparent
          </span>
          <span style={{ fontWeight: 700, fontSize: "44px", color: c.sage, letterSpacing: "-0.02em" }}>
            Pricing
          </span>
        </div>

        {/* Tier cards */}
        <div style={{ display: "flex", gap: "20px", marginTop: "40px", flex: 1, alignItems: "center" }}>
          {tiers.map((tier) => (
            <div
              key={tier.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
                padding: "32px 24px",
                borderRadius: "12px",
                backgroundColor: c.bgLight,
                border: `1.5px solid ${c.sage}25`,
                gap: "12px",
              }}
            >
              <span style={{ fontWeight: 700, fontSize: "22px", color: c.sage }}>{tier.name}</span>
              <span style={{ fontFamily: "JetBrains Mono", fontSize: "14px", color: c.grayDark }}>
                {tier.lines}
              </span>
              <span style={{ fontWeight: 700, fontSize: "32px", color: c.white, marginTop: "8px" }}>
                {tier.price}
              </span>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <span style={{ fontSize: "16px", color: c.grayDark, textAlign: "center", marginTop: "8px" }}>
          All audits include free 30-day fix verification
        </span>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "16px",
            borderTop: `1px solid ${c.sage}15`,
            marginTop: "16px",
          }}
        >
          <span style={{ fontFamily: "JetBrains Mono", fontSize: "14px", color: c.grayDark }}>
            vln.gg/pricing
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
