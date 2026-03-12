import { ImageResponse } from "next/og";

/**
 * Dynamic Open Graph Image for Founder Meetup
 * Generates a social media preview image for the founder meetup event
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

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
          {/* Background pattern - subtle */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "40%",
              height: "40%",
              background: "radial-gradient(circle, #a6c3a7 0%, transparent 70%)",
              opacity: 0.05,
              borderRadius: "50%",
            }}
          />

          {/* Top accent */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "20px",
              fontSize: "20px",
            }}
          >
            <span>🔗</span>
            <span
              style={{
                color: "#a6c3a7",
                fontSize: "18px",
                fontWeight: "600",
                letterSpacing: "2px",
              }}
            >
              VLN FOUNDERS NETWORK
            </span>
          </div>

          {/* Main heading */}
          <h1
            style={{
              fontSize: "68px",
              fontWeight: "700",
              margin: "0 0 30px 0",
              lineHeight: "1.2",
              letterSpacing: "-1px",
            }}
          >
            Connect with Builders
            <br />
            <span style={{ color: "#a6c3a7" }}>Every Wednesday</span>
          </h1>

          {/* Event details */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "40px",
              marginBottom: "40px",
              flex: 1,
            }}
          >
            {/* Location */}
            <div>
              <div
                style={{
                  fontSize: "18px",
                  color: "#aab7c8",
                  marginBottom: "12px",
                  fontWeight: "600",
                }}
              >
                📍 Location
              </div>
              <div style={{ fontSize: "28px", color: "#ffffff" }}>
                The Crybaby
              </div>
              <div style={{ fontSize: "18px", color: "#888888" }}>
                1928 Telegraph Ave
              </div>
              <div style={{ fontSize: "18px", color: "#888888" }}>
                Oakland, CA 94612
              </div>
            </div>

            {/* Time */}
            <div>
              <div
                style={{
                  fontSize: "18px",
                  color: "#aab7c8",
                  marginBottom: "12px",
                  fontWeight: "600",
                }}
              >
                🕐 When
              </div>
              <div style={{ fontSize: "28px", color: "#ffffff" }}>
                Wednesday
              </div>
              <div style={{ fontSize: "18px", color: "#888888" }}>
                5:00 PM – 7:00 PM PT
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
              paddingTop: "30px",
            }}
          >
            Join VLN Network →
          </div>

          {/* VLN branding */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              right: "60px",
              fontSize: "16px",
              color: "#888888",
              fontFamily: "monospace",
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
