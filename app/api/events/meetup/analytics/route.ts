import { NextRequest, NextResponse } from "next/server";

interface AnalyticsEvent {
  event: "impression" | "dismiss" | "join_click" | "share_click" | "view_details";
  platform?: "linkedin" | "luma" | "copy_link";
  source?: string;
  timestamp: string;
  userAgent?: string;
  referer?: string;
}

// In-memory event log (in production, use database)
const analyticsLog: AnalyticsEvent[] = [];

// Simple rate limiting (IP-based)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100; // 100 requests per minute

/**
 * GET /api/events/meetup/analytics
 * Returns analytics summary (admin-only in production)
 */
export async function GET(request: NextRequest) {
  // In production, verify admin token
  const token = request.headers.get("x-admin-token");
  const expectedToken = process.env.ADMIN_ANALYTICS_TOKEN;

  if (!expectedToken || token !== expectedToken) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Aggregate analytics
  const summary = {
    totalEvents: analyticsLog.length,
    impressions: analyticsLog.filter((e) => e.event === "impression").length,
    dismissals: analyticsLog.filter((e) => e.event === "dismiss").length,
    joinClicks: analyticsLog.filter((e) => e.event === "join_click").length,
    shareClicks: analyticsLog.filter((e) => e.event === "share_click").length,
    shareByPlatform: {
      linkedin: analyticsLog.filter(
        (e) => e.event === "share_click" && e.platform === "linkedin"
      ).length,
      luma: analyticsLog.filter(
        (e) => e.event === "share_click" && e.platform === "luma"
      ).length,
      copyLink: analyticsLog.filter(
        (e) => e.event === "share_click" && e.platform === "copy_link"
      ).length,
    },
    conversionRate:
      analyticsLog.length > 0
        ? (
            (analyticsLog.filter((e) => e.event === "join_click").length /
              analyticsLog.filter((e) => e.event === "impression").length) *
            100
          ).toFixed(2)
        : 0,
    dismissalRate:
      analyticsLog.length > 0
        ? (
            (analyticsLog.filter((e) => e.event === "dismiss").length /
              analyticsLog.filter((e) => e.event === "impression").length) *
            100
          ).toFixed(2)
        : 0,
  };

  return NextResponse.json(summary);
}

/**
 * POST /api/events/meetup/analytics
 * Logs user interactions with the popup
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW;

    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, []);
    }

    const timestamps = rateLimitMap.get(ip)!;
    const recentRequests = timestamps.filter((t) => t > windowStart);

    if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    recentRequests.push(now);
    rateLimitMap.set(ip, recentRequests);

    // Parse event data
    const body: AnalyticsEvent = await request.json();

    // Validate event type
    const validEvents = [
      "impression",
      "dismiss",
      "join_click",
      "share_click",
      "view_details",
    ];
    if (!validEvents.includes(body.event)) {
      return NextResponse.json(
        { error: "Invalid event type" },
        { status: 400 }
      );
    }

    // Log event with metadata
    const event: AnalyticsEvent = {
      ...body,
      userAgent: request.headers.get("user-agent") || undefined,
      referer: request.headers.get("referer") || undefined,
    };

    analyticsLog.push(event);

    return NextResponse.json(
      { success: true, eventId: analyticsLog.length },
      { status: 201 }
    );
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/events/meetup/analytics (admin only)
 * Clears analytics log
 */
export async function DELETE(request: NextRequest) {
  // In production, verify admin token
  const token = request.headers.get("x-admin-token");
  const expectedToken = process.env.ADMIN_ANALYTICS_TOKEN;

  if (!expectedToken || token !== expectedToken) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  analyticsLog.length = 0;
  rateLimitMap.clear();

  return NextResponse.json({ success: true });
}
