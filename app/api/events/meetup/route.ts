import { NextResponse } from "next/server";

/**
 * GET /api/events/meetup
 * Returns meetup event details
 */
export async function GET() {
  const meetupConfig = {
    id: "vln-founder-meetup-oakland",
    venue: "The Crybaby",
    address: "1928 Telegraph Ave",
    city: "Oakland",
    state: "CA",
    zip: "94612",
    country: "United States",
    coordinates: {
      latitude: 37.8045,
      longitude: -122.2721,
    },
    dayOfWeek: "Wednesday",
    timeStart: "17:00", // 5 PM
    timeEnd: "19:00", // 7 PM
    timezone: "America/Los_Angeles",
    description:
      "Connect with web3 founders, builders, and security leaders. VLN Weekly Founder Meetup at The Crybaby in Oakland.",
    targetAudience: [
      "Founders",
      "CTOs",
      "Security Leaders",
      "Blockchain Developers",
    ],
    externalLinks: {
      luma: "https://luma.com/calendar/manage/cal-YfSqBlVF8hIcxiv?new=true",
      linkedin: "https://linkedin.com/company/vlngg",
      website: "https://vln.gg",
    },
    socialMetadata: {
      title: "Join VLN Founders Network - Every Wednesday in Oakland",
      description:
        "Connect with founders and builders at The Crybaby. Weekly meetup for tech leadership and networking.",
      imageUrl: "https://vln.gg/og-images/founder-meetup.png",
      hashtags: ["#VLN", "#Founders", "#Web3", "#Oakland", "#Networking"],
    },
  };

  return NextResponse.json(meetupConfig, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
