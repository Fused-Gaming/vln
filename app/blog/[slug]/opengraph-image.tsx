import { ImageResponse } from "next/og";
import {
  OG_COLORS,
  OG_SIZE,
  loadInterFont,
  loadJetBrainsFont,
  getAccentHex,
} from "@/lib/og/utils";
import { getBlogPostBySlug } from "@/lib/blog/metadata";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const alt = "VLN Blog Article";
export const size = OG_SIZE;
export const contentType = "image/png";

interface Props {
  params: {
    slug: string;
  };
}

export default async function BlogOGImage({ params }: Props) {
  const [interBold, interRegular, jetbrains] = await Promise.all([
    loadInterFont("700"),
    loadInterFont("400"),
    loadJetBrainsFont("400"),
  ]);

  const c = OG_COLORS;
  const blogPost = getBlogPostBySlug(params.slug);

  // Fallback if blog post not found
  if (!blogPost) {
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: 700, fontSize: "48px", color: c.white }}>
            VLN Blog
          </span>
        </div>
      ),
      { ...OG_SIZE }
    );
  }

  // Get accent color (defaults to sage if not specified)
  const accentColor = blogPost.accent ? getAccentHex(blogPost.accent) : c.sage;

  // Truncate title if too long (for visual balance)
  const titleLines = blogPost.title.split(" ");
  let displayTitle = blogPost.title;
  if (blogPost.title.length > 60) {
    displayTitle = titleLines.slice(0, 6).join(" ");
    if (titleLines.length > 6) {
      displayTitle += "...";
    }
  }

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
        {/* Accent-colored gradient glow - bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accentColor}08 0%, transparent 70%)`,
            display: "flex",
          }}
        />

        {/* Subtle accent line - left side */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "4px",
            height: "100%",
            background: `linear-gradient(180deg, ${accentColor}60 0%, ${accentColor}0 100%)`,
          }}
        />

        {/* Content area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            gap: "24px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Logo + Category tag */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                border: `2px solid ${accentColor}80`,
                backgroundColor: `${accentColor}15`,
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "20px",
                  color: accentColor,
                }}
              >
                V
              </span>
            </div>

            {/* Category badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px 14px",
                borderRadius: "6px",
                backgroundColor: `${accentColor}12`,
                border: `1px solid ${accentColor}25`,
              }}
            >
              <span
                style={{
                  fontFamily: "JetBrains Mono",
                  fontSize: "12px",
                  color: accentColor,
                  fontWeight: 600,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.05em",
                }}
              >
                {blogPost.category}
              </span>
            </div>
          </div>

          {/* Main title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <h1
              style={{
                fontWeight: 700,
                fontSize: "52px",
                color: c.white,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                maxWidth: "1000px",
              }}
            >
              {displayTitle}
            </h1>

            <span
              style={{
                fontSize: "18px",
                color: c.gray,
                lineHeight: 1.5,
                maxWidth: "900px",
              }}
            >
              {blogPost.description}
            </span>
          </div>
        </div>

        {/* Bottom bar with date and branding */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "16px",
            borderTop: `1px solid ${accentColor}20`,
            position: "relative",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span
              style={{
                fontFamily: "JetBrains Mono",
                fontSize: "13px",
                color: c.grayDark,
              }}
            >
              vln.gg/blog
            </span>
            <span
              style={{
                fontFamily: "JetBrains Mono",
                fontSize: "13px",
                color: c.grayDark,
              }}
            >
              •
            </span>
            <span
              style={{
                fontFamily: "JetBrains Mono",
                fontSize: "13px",
                color: accentColor,
              }}
            >
              {new Date(blogPost.publishedDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <span
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: "13px",
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
