/**
 * VLN Digital Camo — Background Motion System Sample Preview
 *
 * Internal document — not indexed. Direct URL access only.
 * Spec version: 0x3-camo-bg | Last updated: 2026-02-24
 *
 * Route: /internal/qx7b2-camo-preview
 * Status: hidden sample — no sitemap, no robots indexing
 */

import type { Metadata } from "next";
import CamoPreviewClient from "./preview-client";

export const metadata: Metadata = {
  title: "Camo BG Sample — VLN Internal",
  description: "Internal sample preview for the VLN digital camouflage background motion system (spec 0x3-camo-bg).",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function CamoPreviewPage() {
  return <CamoPreviewClient />;
}
