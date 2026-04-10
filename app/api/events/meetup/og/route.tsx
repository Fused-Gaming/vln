import { ImageResponse } from "next/og";
import { OG_COLORS } from "@/lib/og/utils";

/**
 * Dynamic Open Graph Image for Founder Meetup
 * Generates a social media preview image with the next Wednesday date
 * Includes SVG circuit trace decorations for VLN brand consistency
 */
export async function GET(request: Request) {
  try {
    // Calculate next Wednesday
    const today = new Date();
    const dayOfWeek = today.getDay();

    // Wednesday is day 3 (0 = Sunday, 1 = Monday, ..., 3 = Wednesday)
    const daysUntilWednesday = dayOfWeek <= 3 ? 3 - dayOfWeek : 10 - dayOfWeek;
    const nextWednesday = new Date(today);
    nextWednesday.setDate(nextWednesday.getDate() + daysUntilWednesday);

    // Format date nicely
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const formattedDate = `${monthNames[nextWednesday.getMonth()]} ${nextWednesday.getDate()}`;

    const c = OG_COLORS;

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            backgroundColor: c.bg,
            backgroundImage:
              `linear-gradient(135deg, ${c.bg} 0%, ${c.bgLight} 100%)`,
            padding: "60px",
            fontFamily: "Inter, sans-serif",
            color: c.white,
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
              width: "320px",
              height: "180px",
              display: "flex",
              opacity: 0.07,
            }}
          >
            <svg width="320" height="180" viewBox="0 0 320 180">
              <line x1="0" y1="40" x2="220" y2="40" stroke={c.sage} strokeWidth="2" />
              <line x1="220" y1="40" x2="220" y2="120" stroke={c.sage} strokeWidth="2" />
              <line x1="0" y1="80" x2="140" y2="80" stroke={c.blue} strokeWidth="1.5" />
              <line x1="140" y1="80" x2="140" y2="160" stroke={c.blue} strokeWidth="1.5" />
              <line x1="0" y1="120" x2="70" y2="120" stroke={c.purple} strokeWidth="1" />
              <circle cx="220" cy="40" r="4" fill={c.sage} />
              <circle cx="140" cy="80" r="3" fill={c.blue} />
              <rect x="70" y="30" width="20" height="16" rx="3" fill="none" stroke={c.sage} strokeWidth="1.5" />
            </svg>
          </div>

          {/* Circuit trace decoration - bottom right */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "320px",
              height: "180px",
              display: "flex",
              opacity: 0.07,
              transform: "rotate(180deg)",
            }}
          >
            <svg width="320" height="180" viewBox="0 0 320 180">
              <line x1="0" y1="40" x2="220" y2="40" stroke={c.sage} strokeWidth="2" />
              <line x1="220" y1="40" x2="220" y2="120" stroke={c.sage} strokeWidth="2" />
              <line x1="0" y1="80" x2="140" y2="80" stroke={c.amber} strokeWidth="1.5" />
              <line x1="140" y1="80" x2="140" y2="160" stroke={c.amber} strokeWidth="1.5" />
              <circle cx="220" cy="40" r="4" fill={c.sage} />
              <circle cx="140" cy="80" r="3" fill={c.amber} />
            </svg>
          </div>

          {/* Background accent circle - Top right */}
          <div
            style={{
              position: "absolute",
              top: -100,
              right: -100,
              width: "400px",
              height: "400px",
              background: `radial-gradient(circle, ${c.sage} 0%, transparent 70%)`,
              opacity: 0.06,
              borderRadius: "50%",
            }}
          />

          {/* Background accent circle - Bottom left */}
          <div
            style={{
              position: "absolute",
              bottom: -80,
              left: -80,
              width: "350px",
              height: "350px",
              background: `radial-gradient(circle, ${c.blue} 0%, transparent 70%)`,
              opacity: 0.05,
              borderRadius: "50%",
            }}
          />

          {/* Main content */}
          <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {/* Top section */}
            <div>
              {/* Badge */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginBottom: "24px",
                  fontSize: "18px",
                }}
              >
                <span>🔗</span>
                <span
                  style={{
                    color: c.sage,
                    fontSize: "16px",
                    fontWeight: "600",
                    letterSpacing: "1.5px",
                    fontFamily: "Inter",
                  }}
                >
                  VLN FOUNDERS NETWORK
                </span>
              </div>

              {/* Main heading */}
              <h1
                style={{
                  fontSize: "64px",
                  fontWeight: "700",
                  margin: "0 0 32px 0",
                  lineHeight: "1.2",
                  letterSpacing: "-1px",
                  maxWidth: "900px",
                  color: c.white,
                  fontFamily: "Inter",
                }}
              >
                Connect with Builders
                <br />
                <span style={{ color: c.sage }}>Wednesday, {formattedDate}</span>
              </h1>
            </div>

            {/* Event details */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "48px",
                marginBottom: "40px",
              }}
            >
              {/* Location */}
              <div>
                <div
                  style={{
                    fontSize: "16px",
                    color: c.grayDark,
                    marginBottom: "12px",
                    fontWeight: "600",
                    fontFamily: "Inter",
                  }}
                >
                  📍 Location
                </div>
                <div style={{ fontSize: "28px", color: c.white, fontWeight: "700", fontFamily: "Inter" }}>
                  The Crybaby
                </div>
                <div style={{ fontSize: "16px", color: c.gray, marginTop: "8px", fontFamily: "Inter" }}>
                  1928 Telegraph Ave
                </div>
                <div style={{ fontSize: "16px", color: c.gray, fontFamily: "Inter" }}>
                  Oakland, CA 94612
                </div>
              </div>

              {/* Time */}
              <div>
                <div
                  style={{
                    fontSize: "16px",
                    color: c.grayDark,
                    marginBottom: "12px",
                    fontWeight: "600",
                    fontFamily: "Inter",
                  }}
                >
                  🕐 Time
                </div>
                <div style={{ fontSize: "28px", color: c.white, fontWeight: "700", fontFamily: "Inter" }}>
                  5:00 PM – 7:00 PM
                </div>
                <div style={{ fontSize: "16px", color: c.gray, marginTop: "8px", fontFamily: "Inter" }}>
                  Pacific Time (PT)
                </div>
              </div>
            </div>

            {/* CTA Text */}
            <div
              style={{
                fontSize: "24px",
                color: c.sage,
                fontWeight: "600",
                borderTop: `2px solid ${c.sage}20`,
                paddingTop: "32px",
                fontFamily: "Inter",
              }}
            >
              Drop by and connect →
            </div>
          </div>

          {/* VLN branding - Bottom right */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              right: "60px",
              fontSize: "14px",
              color: c.grayDark,
              fontFamily: "JetBrains Mono",
              fontWeight: "500",
            }}
          >
            vln.gg
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("OG Image generation error:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
