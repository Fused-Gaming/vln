import { ImageResponse } from "next/og";
import {
  OG_COLORS,
  OG_SIZE,
  loadInterFont,
  loadJetBrainsFont,
} from "@/lib/og/utils";

export const runtime = "edge";

/**
 * Wildcard OG Image Fallback
 *
 * Serves a plain, minimal VLN image for any route not explicitly defined.
 * This is a catch-all that uses design tokens to maintain brand consistency.
 *
 * Route: /api/og/* (e.g., /api/og/about, /api/og/services/audit, etc.)
 *
 * The slug is captured but not displayed — this ensures a clean, universal fallback
 * that works across any new page without needing explicit OG handlers.
 */
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
        {/* Subtle gradient glow - sage accent, centered */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${c.sage}06 0%, transparent 70%)`,
            display: "flex",
          }}
        />

        {/* Top bar with logo */}
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
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              border: `2px solid ${c.sage}80`,
              backgroundColor: `${c.sage}15`,
            }}
          >
            <span
              style={{
                fontWeight: 700,
                fontSize: "20px",
                color: c.sage,
              }}
            >
              V
            </span>
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: "24px",
              color: c.white,
              letterSpacing: "-0.02em",
            }}
          >
            VLN
          </span>
        </div>

        {/* Center content - main messaging */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            flex: 1,
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontWeight: 700,
                fontSize: "56px",
                color: c.white,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                maxWidth: "900px",
              }}
            >
              VLN Security
            </span>
            <span
              style={{
                fontSize: "24px",
                color: c.gray,
                lineHeight: 1.4,
                maxWidth: "800px",
              }}
            >
              Vulnerability Lab Network
            </span>
          </div>

          {/* Tagline badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: `${c.sage}12`,
              border: `1px solid ${c.sage}25`,
              width: "fit-content",
            }}
          >
            <span
              style={{
                fontFamily: "JetBrains Mono",
                fontSize: "16px",
                color: c.sage,
              }}
            >
              iGaming Security & Smart Contract Intelligence
            </span>
          </div>
        </div>

        {/* Bottom bar with branding */}
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
      ...OG_SIZE,
      fonts: [
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: jetbrains, weight: 400, style: "normal" },
      ],
    }
  );
}
