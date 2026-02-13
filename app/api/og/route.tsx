import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";
import {
  OG_COLORS,
  OG_SIZE,
  loadInterFont,
  loadJetBrainsFont,
  type AccentColor,
  getAccentHex,
} from "@/lib/og/utils";

export const runtime = "edge";

/**
 * Dynamic OG Image API
 *
 * Generates brand-consistent OG images for any page or subdomain.
 *
 * Query Parameters:
 * - title (required): Main headline
 * - subtitle (optional): Secondary text
 * - accent (optional): "sage" | "blue" | "amber" | "purple" (default: "sage")
 * - subdomain (optional): Subdomain label shown in footer (e.g. "docs", "edu")
 * - badge (optional): Comma-separated badge labels
 *
 * Example:
 *   /api/og?title=API%20Reference&subtitle=Complete%20API%20docs&accent=blue&subdomain=docs
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const title = searchParams.get("title") || "VLN Security";
  const subtitle = searchParams.get("subtitle") || "";
  const accent = (searchParams.get("accent") || "sage") as AccentColor;
  const subdomain = searchParams.get("subdomain") || "";
  const badgeParam = searchParams.get("badge") || "";
  const badges = badgeParam ? badgeParam.split(",").map((b) => b.trim()) : [];

  const accentHex = getAccentHex(accent);

  const [interBold, interRegular, jetbrains] = await Promise.all([
    loadInterFont("700"),
    loadInterFont("400"),
    loadJetBrainsFont("400"),
  ]);

  const c = OG_COLORS;

  const domainLabel = subdomain ? `${subdomain}.vln.gg` : "vln.gg";

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
        {/* Accent glow - top right corner */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accentHex}08 0%, transparent 70%)`,
            display: "flex",
          }}
        />

        {/* Header with logo */}
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
                border: `2px solid ${accentHex}80`,
                backgroundColor: `${accentHex}15`,
              }}
            >
              <span style={{ fontWeight: 700, fontSize: "20px", color: accentHex }}>V</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: "24px", color: c.white, letterSpacing: "-0.02em" }}>VLN</span>
          </div>
          {subdomain && (
            <div
              style={{
                display: "flex",
                padding: "6px 14px",
                borderRadius: "8px",
                backgroundColor: `${accentHex}15`,
                border: `1px solid ${accentHex}30`,
              }}
            >
              <span style={{ fontFamily: "JetBrains Mono", fontSize: "14px", color: accentHex }}>
                {domainLabel}
              </span>
            </div>
          )}
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            gap: "20px",
          }}
        >
          <span
            style={{
              fontWeight: 700,
              fontSize: title.length > 30 ? "40px" : "48px",
              color: c.white,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              maxWidth: "900px",
            }}
          >
            {title}
          </span>

          {subtitle && (
            <span
              style={{
                fontSize: "22px",
                color: c.gray,
                lineHeight: 1.5,
                maxWidth: "800px",
              }}
            >
              {subtitle}
            </span>
          )}

          {/* Optional badges */}
          {badges.length > 0 && (
            <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
              {badges.map((badge) => (
                <div
                  key={badge}
                  style={{
                    display: "flex",
                    padding: "8px 18px",
                    borderRadius: "8px",
                    backgroundColor: `${accentHex}15`,
                    border: `1px solid ${accentHex}25`,
                  }}
                >
                  <span style={{ fontFamily: "JetBrains Mono", fontSize: "14px", color: accentHex }}>
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "16px",
            borderTop: `1px solid ${accentHex}15`,
          }}
        >
          <span style={{ fontFamily: "JetBrains Mono", fontSize: "14px", color: c.grayDark }}>
            {domainLabel}
          </span>
          <span style={{ fontFamily: "JetBrains Mono", fontSize: "14px", color: c.grayDark }}>
            Powered by Fused Gaming
          </span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: jetbrains, weight: 400, style: "normal" },
      ],
    }
  );
}
