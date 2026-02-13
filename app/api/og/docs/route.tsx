import { ImageResponse } from "next/og";
import {
  OG_COLORS,
  OG_SIZE,
  loadInterFont,
  loadJetBrainsFont,
} from "@/lib/og/utils";

export const runtime = "edge";

/**
 * Dedicated OG image for docs.vln.gg
 *
 * Layout: Technical documentation aesthetic
 * - Left: VLN logo + "Documentation" title + description + URL badge
 * - Right: Doc category pills + version badge + structure preview
 * Accent: Blue (documentation/technical)
 */
export async function GET() {
  const [interBold, interRegular, jetbrains] = await Promise.all([
    loadInterFont("700"),
    loadInterFont("400"),
    loadJetBrainsFont("400"),
  ]);

  const c = OG_COLORS;

  const docCategories = [
    { label: "API Reference", color: c.blue },
    { label: "Guides", color: c.sage },
    { label: "Security", color: c.amber },
    { label: "Integrations", color: c.purple },
  ];

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
        {/* Circuit trace — top left */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "280px",
            height: "180px",
            display: "flex",
            opacity: 0.07,
          }}
        >
          <svg width="280" height="180" viewBox="0 0 280 180">
            <line x1="0" y1="36" x2="180" y2="36" stroke={c.blue} strokeWidth="2" />
            <line x1="180" y1="36" x2="180" y2="110" stroke={c.blue} strokeWidth="2" />
            <line x1="0" y1="72" x2="100" y2="72" stroke={c.sage} strokeWidth="1.5" />
            <line x1="100" y1="72" x2="100" y2="140" stroke={c.sage} strokeWidth="1.5" />
            <circle cx="180" cy="36" r="4" fill={c.blue} />
            <circle cx="100" cy="72" r="3" fill={c.sage} />
            <rect x="50" y="28" width="18" height="18" rx="2" fill="none" stroke={c.blue} strokeWidth="1.5" />
          </svg>
        </div>

        {/* Blue glow — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "-80px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${c.blue}06 0%, transparent 70%)`,
            display: "flex",
          }}
        />

        {/* Main content — split layout */}
        <div
          style={{
            display: "flex",
            flex: 1,
            gap: "48px",
          }}
        >
          {/* Left Panel */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: "0 0 56%",
              gap: "20px",
            }}
          >
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  border: `2px solid ${c.blue}80`,
                  backgroundColor: `${c.blue}15`,
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: "22px",
                    color: c.blue,
                  }}
                >
                  V
                </span>
              </div>
              <span
                style={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  fontSize: "28px",
                  color: c.white,
                  letterSpacing: "-0.02em",
                }}
              >
                VLN
              </span>
              <div
                style={{
                  display: "flex",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  backgroundColor: `${c.blue}15`,
                  border: `1px solid ${c.blue}30`,
                  marginLeft: "4px",
                }}
              >
                <span
                  style={{
                    fontFamily: "JetBrains Mono",
                    fontSize: "11px",
                    color: c.blue,
                  }}
                >
                  DOCS
                </span>
              </div>
            </div>

            {/* Title */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span
                style={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  fontSize: "44px",
                  color: c.white,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Documentation
              </span>
              <span
                style={{
                  fontFamily: "Inter",
                  fontSize: "20px",
                  color: c.gray,
                  lineHeight: 1.4,
                }}
              >
                API Reference, Guides & Integration Docs
              </span>
            </div>

            {/* Description line */}
            <span
              style={{
                fontFamily: "Inter",
                fontSize: "17px",
                color: c.grayDark,
                lineHeight: 1.5,
                maxWidth: "580px",
              }}
            >
              Everything you need to integrate VLN security into your workflow — from audit APIs to webhook setup.
            </span>

            {/* URL badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                borderRadius: "8px",
                backgroundColor: `${c.blue}12`,
                border: `1px solid ${c.blue}25`,
                width: "fit-content",
              }}
            >
              <span
                style={{
                  fontFamily: "JetBrains Mono",
                  fontSize: "16px",
                  color: c.blue,
                }}
              >
                docs.vln.gg
              </span>
            </div>
          </div>

          {/* Right Panel — Doc structure */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: "0 0 38%",
              gap: "16px",
            }}
          >
            {/* Category pills */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span
                style={{
                  fontFamily: "JetBrains Mono",
                  fontSize: "11px",
                  color: c.grayDark,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.1em",
                }}
              >
                Categories
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {docCategories.map((cat) => (
                  <div
                    key={cat.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      backgroundColor: c.bgLight,
                      border: `1px solid ${cat.color}20`,
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: cat.color,
                        display: "flex",
                        boxShadow: `0 0 6px ${cat.color}80`,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "Inter",
                        fontSize: "15px",
                        color: c.white,
                        fontWeight: 600,
                      }}
                    >
                      {cat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Version badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 14px",
                borderRadius: "10px",
                backgroundColor: c.bgLighter,
                border: `1px solid ${c.sage}20`,
              }}
            >
              <span
                style={{
                  fontFamily: "JetBrains Mono",
                  fontSize: "12px",
                  color: c.grayDark,
                }}
              >
                Latest
              </span>
              <span
                style={{
                  fontFamily: "JetBrains Mono",
                  fontSize: "14px",
                  color: c.sage,
                  fontWeight: 700,
                }}
              >
                v0.11.0
              </span>
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
            borderTop: `1px solid ${c.blue}15`,
          }}
        >
          <span
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: "13px",
              color: c.grayDark,
            }}
          >
            Powered by Fused Gaming
          </span>
          <span
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: "13px",
              color: c.grayDark,
            }}
          >
            docs.vln.gg
          </span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        {
          name: "JetBrains Mono",
          data: jetbrains,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );
}
