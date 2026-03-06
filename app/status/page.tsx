import type { Metadata } from "next";
import StatusDashboard from "./StatusDashboard";

export const metadata: Metadata = {
  title: "Project Status — VLN Design System",
  description: "VLN project dashboard: design token inventory, route registry, nav structure, and component list. Foundation for sitewide token updates.",
  robots: { index: false, follow: false },
};

export default function StatusPage() {
  return <StatusDashboard />;
}
