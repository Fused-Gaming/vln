import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Fix for monorepo with multiple lockfiles
  outputFileTracingRoot: path.join(__dirname, "../.."),
};

export default nextConfig;
