import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const postEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `https://blog.vln.gg/${post.slug}`,
    lastModified: new Date(post.publishedDate),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://blog.vln.gg",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...postEntries,
  ];
}
