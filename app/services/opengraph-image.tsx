import { ImageResponse } from "next/og";
import {
  OG_COLORS,
  OG_SIZE,
  loadInterFont,
  loadJetBrainsFont,
} from "@/lib/og/utils";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const alt = "VLN Security Services - Smart Contract Audits, Forensics, Training";
export const size = OG_SIZE;
export const contentType = "image/png";

const services = [
  { name: "Prevention", detail: "Smart Contract Audits", price: "$2K-10K", time: "3-7 days", color: OG_COLORS.sage },
  { name: "Forensics", detail: "Post-Exploit Investigation", price: "$15K-50K", time: "<24hr", color: OG_COLORS.amber },
  { name: "Training", detail: "Corporate Workshops", price: "$3.5K/day", time: "1-2 weeks", color: OG_COLORS.blue },
  { name: "VISE", detail: "Courses & Certs", price: "Free+", time: "Self-paced", color: OG_COLORS.purple },
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
        </div>

        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "32px" }}>
          <span style={{ fontWeight: 700, fontSize: "44px", color: c.white, letterSpacing: "-0.02em" }}>
            Our Services
          </span>
          <span style={{ fontSize: "20px", color: c.gray }}>
            iGaming Security & Smart Contract Intelligence
          </span>
        </div>

        {/* Service cards row */}
        <div style={{ display: "flex", gap: "16px", marginTop: "36px", flex: 1, alignItems: "center" }}>
          {services.map((svc) => (
            <div
              key={svc.name}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: "24px 20px",
                borderRadius: "12px",
                backgroundColor: c.bgLight,
                border: `1.5px solid ${svc.color}30`,
                gap: "10px",
              }}
            >
              <span style={{ fontWeight: 700, fontSize: "20px", color: svc.color }}>{svc.name}</span>
              <span style={{ fontSize: "13px", color: c.gray, lineHeight: 1.3 }}>{svc.detail}</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginTop: "auto" }}>
                <span style={{ fontFamily: "JetBrains Mono", fontSize: "18px", color: c.white, fontWeight: 700 }}>
                  {svc.price}
                </span>
                <span style={{ fontFamily: "JetBrains Mono", fontSize: "12px", color: c.grayDark }}>
                  {svc.time}
                </span>
              </div>
            </div>
          ))}
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
            vln.gg/services
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
