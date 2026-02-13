import { ImageResponse } from "next/og";
import {
  OG_COLORS,
  OG_SIZE,
  loadInterFont,
  loadJetBrainsFont,
} from "@/lib/og/utils";

export const runtime = "edge";

export async function GET() {
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
        {/* Subtle circuit trace decoration - top left */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "300px",
            height: "200px",
            display: "flex",
            opacity: 0.08,
          }}
        >
          <svg width="300" height="200" viewBox="0 0 300 200">
            <line
              x1="0"
              y1="40"
              x2="200"
              y2="40"
              stroke={c.sage}
              strokeWidth="2"
            />
            <line
              x1="200"
              y1="40"
              x2="200"
              y2="120"
              stroke={c.sage}
              strokeWidth="2"
            />
            <line
              x1="0"
              y1="80"
              x2="120"
              y2="80"
              stroke={c.blue}
              strokeWidth="1.5"
            />
            <line
              x1="120"
              y1="80"
              x2="120"
              y2="160"
              stroke={c.blue}
              strokeWidth="1.5"
            />
            <circle cx="200" cy="40" r="4" fill={c.sage} />
            <circle cx="120" cy="80" r="3" fill={c.blue} />
            <rect
              x="60"
              y="30"
              width="20"
              height="20"
              rx="2"
              fill="none"
              stroke={c.sage}
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Subtle circuit trace decoration - bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "300px",
            height: "200px",
            display: "flex",
            opacity: 0.08,
            transform: "rotate(180deg)",
          }}
        >
          <svg width="300" height="200" viewBox="0 0 300 200">
            <line
              x1="0"
              y1="40"
              x2="200"
              y2="40"
              stroke={c.purple}
              strokeWidth="2"
            />
            <line
              x1="200"
              y1="40"
              x2="200"
              y2="120"
              stroke={c.purple}
              strokeWidth="2"
            />
            <line
              x1="0"
              y1="80"
              x2="120"
              y2="80"
              stroke={c.amber}
              strokeWidth="1.5"
            />
            <circle cx="200" cy="40" r="4" fill={c.purple} />
            <circle cx="120" cy="80" r="3" fill={c.amber} />
          </svg>
        </div>

        {/* Main content area - split layout */}
        <div
          style={{
            display: "flex",
            flex: 1,
            gap: "48px",
          }}
        >
          {/* Left Panel - Text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: "0 0 58%",
              gap: "20px",
            }}
          >
            {/* Logo placeholder text */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  border: `2px solid ${c.sage}80`,
                  backgroundColor: `${c.sage}15`,
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: "22px",
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
                  fontSize: "28px",
                  color: c.white,
                  letterSpacing: "-0.02em",
                }}
              >
                VLN
              </span>
            </div>

            {/* Title */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  fontSize: "42px",
                  color: c.white,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Design System
              </span>
            </div>

            {/* Description */}
            <span
              style={{
                fontFamily: "Inter",
                fontSize: "20px",
                color: c.gray,
                lineHeight: 1.5,
              }}
            >
              Brand Guidelines, Component Library & Design Tokens
            </span>

            {/* URL badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  backgroundColor: `${c.sage}15`,
                  border: `1px solid ${c.sage}30`,
                }}
              >
                <span
                  style={{
                    fontFamily: "JetBrains Mono",
                    fontSize: "16px",
                    color: c.sage,
                  }}
                >
                  design.vln.gg
                </span>
              </div>
            </div>
          </div>

          {/* Right Panel - Visual Tokens */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: "0 0 38%",
              gap: "20px",
            }}
          >
            {/* Color Swatches - 2x2 grid */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontFamily: "JetBrains Mono",
                  fontSize: "11px",
                  color: c.grayDark,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.1em",
                }}
              >
                Color Palette
              </span>
              <div style={{ display: "flex", gap: "8px" }}>
                {/* Sage */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "12px",
                      backgroundColor: c.sage,
                      display: "flex",
                      boxShadow: `0 0 16px ${c.sage}40`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "JetBrains Mono",
                      fontSize: "10px",
                      color: c.grayDark,
                    }}
                  >
                    Sage
                  </span>
                </div>
                {/* Blue */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "12px",
                      backgroundColor: c.blue,
                      display: "flex",
                      boxShadow: `0 0 16px ${c.blue}40`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "JetBrains Mono",
                      fontSize: "10px",
                      color: c.grayDark,
                    }}
                  >
                    Blue
                  </span>
                </div>
                {/* Amber */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "12px",
                      backgroundColor: c.amber,
                      display: "flex",
                      boxShadow: `0 0 16px ${c.amber}40`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "JetBrains Mono",
                      fontSize: "10px",
                      color: c.grayDark,
                    }}
                  >
                    Amber
                  </span>
                </div>
                {/* Purple */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "12px",
                      backgroundColor: c.purple,
                      display: "flex",
                      boxShadow: `0 0 16px ${c.purple}40`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "JetBrains Mono",
                      fontSize: "10px",
                      color: c.grayDark,
                    }}
                  >
                    Purple
                  </span>
                </div>
              </div>
            </div>

            {/* Typography Preview */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontFamily: "JetBrains Mono",
                  fontSize: "11px",
                  color: c.grayDark,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.1em",
                }}
              >
                Typography
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  backgroundColor: c.bgLight,
                  border: `1px solid ${c.sage}20`,
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: "18px",
                    color: c.white,
                  }}
                >
                  Aa Inter
                </span>
                <span
                  style={{
                    fontFamily: "JetBrains Mono",
                    fontSize: "15px",
                    color: c.sage,
                  }}
                >
                  01 JetBrains Mono
                </span>
              </div>
            </div>

            {/* Specs Row */}
            <div style={{ display: "flex", gap: "12px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "10px 16px",
                  borderRadius: "12px",
                  backgroundColor: c.bgLight,
                  border: `1px solid ${c.sage}20`,
                  gap: "2px",
                }}
              >
                <span
                  style={{
                    fontFamily: "JetBrains Mono",
                    fontSize: "16px",
                    color: c.sage,
                    fontWeight: 700,
                  }}
                >
                  12px
                </span>
                <span
                  style={{
                    fontFamily: "JetBrains Mono",
                    fontSize: "10px",
                    color: c.grayDark,
                  }}
                >
                  Radius
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "10px 16px",
                  borderRadius: "12px",
                  backgroundColor: c.bgLight,
                  border: `1px solid ${c.blue}20`,
                  gap: "2px",
                }}
              >
                <span
                  style={{
                    fontFamily: "JetBrains Mono",
                    fontSize: "16px",
                    color: c.blue,
                    fontWeight: 700,
                  }}
                >
                  AAA
                </span>
                <span
                  style={{
                    fontFamily: "JetBrains Mono",
                    fontSize: "10px",
                    color: c.grayDark,
                  }}
                >
                  WCAG
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "10px 16px",
                  borderRadius: "12px",
                  backgroundColor: c.bgLight,
                  border: `1px solid ${c.purple}20`,
                  gap: "2px",
                }}
              >
                <span
                  style={{
                    fontFamily: "JetBrains Mono",
                    fontSize: "16px",
                    color: c.purple,
                    fontWeight: 700,
                  }}
                >
                  4px
                </span>
                <span
                  style={{
                    fontFamily: "JetBrains Mono",
                    fontSize: "10px",
                    color: c.grayDark,
                  }}
                >
                  Lift
                </span>
              </div>
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
            WCAG AAA Compliant
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
