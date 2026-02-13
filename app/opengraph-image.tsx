import { ImageResponse } from "next/og";
import {
  OG_COLORS,
  OG_SIZE,
  loadInterFont,
  loadJetBrainsFont,
} from "@/lib/og/utils";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const alt = "VLN - Smart Contract Vulnerability Research Lab";
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
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Circuit trace decoration - top left */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "350px",
            height: "200px",
            display: "flex",
            opacity: 0.06,
          }}
        >
          <svg width="350" height="200" viewBox="0 0 350 200">
            <line x1="0" y1="40" x2="240" y2="40" stroke={c.sage} strokeWidth="2" />
            <line x1="240" y1="40" x2="240" y2="140" stroke={c.sage} strokeWidth="2" />
            <line x1="0" y1="80" x2="160" y2="80" stroke={c.blue} strokeWidth="1.5" />
            <line x1="160" y1="80" x2="160" y2="180" stroke={c.blue} strokeWidth="1.5" />
            <line x1="0" y1="120" x2="80" y2="120" stroke={c.purple} strokeWidth="1" />
            <circle cx="240" cy="40" r="4" fill={c.sage} />
            <circle cx="160" cy="80" r="3" fill={c.blue} />
            <rect x="80" y="30" width="24" height="20" rx="3" fill="none" stroke={c.sage} strokeWidth="1.5" />
            <rect x="40" y="112" width="16" height="16" rx="2" fill="none" stroke={c.purple} strokeWidth="1" />
          </svg>
        </div>

        {/* Circuit trace decoration - bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "350px",
            height: "200px",
            display: "flex",
            opacity: 0.06,
            transform: "rotate(180deg)",
          }}
        >
          <svg width="350" height="200" viewBox="0 0 350 200">
            <line x1="0" y1="40" x2="240" y2="40" stroke={c.sage} strokeWidth="2" />
            <line x1="240" y1="40" x2="240" y2="140" stroke={c.sage} strokeWidth="2" />
            <line x1="0" y1="80" x2="160" y2="80" stroke={c.amber} strokeWidth="1.5" />
            <circle cx="240" cy="40" r="4" fill={c.sage} />
            <circle cx="160" cy="80" r="3" fill={c.amber} />
          </svg>
        </div>

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
          {/* Logo mark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                border: `2px solid ${c.sage}80`,
                backgroundColor: `${c.sage}15`,
              }}
            >
              <span
                style={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  fontSize: "28px",
                  color: c.sage,
                }}
              >
                V
              </span>
            </div>
            <span
              style={{
                fontFamily: "Inter",
                fontWeight: 700,
                fontSize: "36px",
                color: c.white,
                letterSpacing: "-0.02em",
              }}
            >
              VLN
            </span>
          </div>

          {/* Hero headline */}
          <div style={{ display: "flex", gap: "12px", alignItems: "baseline" }}>
            <span
              style={{
                fontFamily: "Inter",
                fontWeight: 700,
                fontSize: "52px",
                color: c.white,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Your Contract Has
            </span>
            <span
              style={{
                fontFamily: "Inter",
                fontWeight: 700,
                fontSize: "52px",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                background: `linear-gradient(90deg, ${c.sage}, ${c.blue}, ${c.purple})`,
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Bugs
            </span>
          </div>

          {/* Subheadline */}
          <span
            style={{
              fontFamily: "Inter",
              fontSize: "22px",
              color: c.gray,
              lineHeight: 1.4,
              maxWidth: "700px",
            }}
          >
            Smart Contract Security Audits & Vulnerability Research for
            Blockchain Gaming and DeFi
          </span>

          {/* Trust badges row */}
          <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
            {/* 47 Critical Vulns */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 20px",
                borderRadius: "12px",
                backgroundColor: c.bgLight,
                border: `1px solid ${c.sage}30`,
              }}
            >
              <span style={{ fontSize: "20px", color: c.sage, fontWeight: 700, fontFamily: "Inter" }}>47</span>
              <span style={{ fontSize: "13px", color: c.gray, fontFamily: "Inter" }}>Critical Vulns</span>
            </div>

            {/* $5.2M Recovered */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 20px",
                borderRadius: "12px",
                backgroundColor: c.bgLight,
                border: `1px solid ${c.blue}30`,
              }}
            >
              <span style={{ fontSize: "20px", color: c.blue, fontWeight: 700, fontFamily: "Inter" }}>$5.2M</span>
              <span style={{ fontSize: "13px", color: c.gray, fontFamily: "Inter" }}>Recovered</span>
            </div>

            {/* 0 Post-Audit Hacks */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 20px",
                borderRadius: "12px",
                backgroundColor: c.bgLight,
                border: `1px solid ${c.purple}30`,
              }}
            >
              <span style={{ fontSize: "20px", color: c.purple, fontWeight: 700, fontFamily: "Inter" }}>0</span>
              <span style={{ fontSize: "13px", color: c.gray, fontFamily: "Inter" }}>Post-Audit Hacks</span>
            </div>
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
          <span
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: "14px",
              color: c.grayDark,
            }}
          >
            vln.gg
          </span>
          <span
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: "14px",
              color: c.grayDark,
            }}
          >
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
