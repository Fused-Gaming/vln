import type { Metadata } from "next";
import ImageToolContent from "./ImageToolContent";

export const metadata: Metadata = {
  title: "Image Compressor | VLN Tools",
  description:
    "Fast, efficient image compression tool. Compress JPEG, PNG, and WebP images with adjustable quality settings.",
  keywords: ["image compressor", "image optimization", "compression tool"],
  alternates: {
    canonical: "https://vln.gg/images",
  },
  openGraph: {
    title: "Image Compressor | VLN Tools",
    description:
      "Fast, efficient image compression tool for developers and creators.",
    url: "https://vln.gg/images",
    type: "website",
  },
};

export default function ImagesPage() {
  return <ImageToolContent />;
}
