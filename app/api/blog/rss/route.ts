import { NextResponse } from "next/server";
import { BLOG_POSTS } from "@/lib/blog/metadata";

const SITE_URL = "https://vln.gg";
const BLOG_URL = "https://blog.vln.gg";

export async function GET() {
  const items = BLOG_POSTS.map((post) => {
    const postUrl = `${BLOG_URL}/${post.slug}`;
    const pubDate = new Date(post.publishedDate).toUTCString();
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.description}]]></description>
      <category><![CDATA[${post.category}]]></category>
      <pubDate>${pubDate}</pubDate>
      <author>research@vln.gg (VLN Security)</author>
    </item>`.trim();
  }).join("\n    ");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>VLN Security Blog</title>
    <link>${BLOG_URL}</link>
    <description>Smart contract vulnerability research, DeFi exploit analysis, and blockchain security insights from VLN's research team.</description>
    <language>en-us</language>
    <managingEditor>research@vln.gg (VLN Security)</managingEditor>
    <webMaster>research@vln.gg (VLN Security)</webMaster>
    <copyright>Copyright ${new Date().getFullYear()} VLN – Vulnerability Lab Network</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
    <image>
      <url>${SITE_URL}/vln-logo-dark.svg</url>
      <title>VLN Security Blog</title>
      <link>${BLOG_URL}</link>
    </image>
    <atom:link href="${BLOG_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
