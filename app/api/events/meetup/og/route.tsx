import { ImageResponse } from "next/og";

/**
 * Dynamic Open Graph Image for Founder Meetup
 * Generates a social media preview image with the next Wednesday date
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

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            backgroundColor: "#0f0f0f",
            backgroundImage:
              "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
            padding: "60px",
            fontFamily: "Inter, sans-serif",
            color: "#ffffff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background accent circle - Top right */}
          <div
            style={{
              position: "absolute",
              top: -100,
              right: -100,
              width: "400px",
              height: "400px",
              background: "radial-gradient(circle, #a6c3a7 0%, transparent 70%)",
              opacity: 0.08,
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
              background: "radial-gradient(circle, #aab7c8 0%, transparent 70%)",
              opacity: 0.06,
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
                    color: "#a6c3a7",
                    fontSize: "16px",
                    fontWeight: "600",
                    letterSpacing: "1.5px",
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
                }}
              >
                Connect with Builders
                <br />
                <span style={{ color: "#a6c3a7" }}>Wednesday, {formattedDate}</span>
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
                    color: "#aab7c8",
                    marginBottom: "12px",
                    fontWeight: "600",
                  }}
                >
                  📍 Location
                </div>
                <div style={{ fontSize: "28px", color: "#ffffff", fontWeight: "700" }}>
                  The Crybaby
                </div>
                <div style={{ fontSize: "16px", color: "#888888", marginTop: "8px" }}>
                  1928 Telegraph Ave
                </div>
                <div style={{ fontSize: "16px", color: "#888888" }}>
                  Oakland, CA 94612
                </div>
              </div>

              {/* Time */}
              <div>
                <div
                  style={{
                    fontSize: "16px",
                    color: "#aab7c8",
                    marginBottom: "12px",
                    fontWeight: "600",
                  }}
                >
                  🕐 Time
                </div>
                <div style={{ fontSize: "28px", color: "#ffffff", fontWeight: "700" }}>
                  5:00 PM – 7:00 PM
                </div>
                <div style={{ fontSize: "16px", color: "#888888", marginTop: "8px" }}>
                  Pacific Time (PT)
                </div>
              </div>
            </div>

            {/* CTA Text */}
            <div
              style={{
                fontSize: "24px",
                color: "#a6c3a7",
                fontWeight: "600",
                borderTop: "2px solid rgba(166, 195, 167, 0.2)",
                paddingTop: "32px",
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
              color: "#888888",
              fontFamily: "monospace",
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
