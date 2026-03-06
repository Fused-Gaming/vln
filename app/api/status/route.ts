import { NextResponse } from "next/server";

/**
 * VLN Project Status API
 * GET /api/status
 *
 * Returns a JSON manifest of:
 *   - Design token values (sourced from tailwind.config.ts)
 *   - Route inventory with status
 *   - Navigation structure
 *   - Component registry
 *
 * This endpoint is the machine-readable foundation for the
 * /status dashboard and future sitewide token-update tooling.
 */

const TOKENS = {
  colors: {
    background: {
      "vln-bg": "#0a0e0f",
      "vln-bg-light": "#151a1c",
      "vln-bg-lighter": "#1f2527",
    },
    sage: {
      "vln-sage": "#86d993",
      "vln-sage-light": "#a8e9b4",
      "vln-sage-dark": "#5fb76f",
    },
    bluegray: {
      "vln-bluegray": "#7dd3fc",
      "vln-bluegray-light": "#bae6fd",
      "vln-bluegray-dark": "#0ea5e9",
    },
    amber: {
      "vln-amber": "#fbbf24",
      "vln-amber-light": "#fcd34d",
      "vln-amber-dark": "#f59e0b",
    },
    purple: {
      "vln-purple": "#c084fc",
      "vln-purple-light": "#d8b4fe",
      "vln-purple-dark": "#a855f7",
    },
    semantic: {
      "vln-success": "#86d993",
      "vln-warning": "#fbbf24",
      "vln-error": "#ef4444",
      "vln-info": "#7dd3fc",
    },
    text: {
      "vln-white": "#f8f9fa",
      "vln-gray": "#cbd5e1",
      "vln-gray-dark": "#94a3b8",
    },
  },
  spacing: {
    "vln-radius": "12px",
    "vln-card-lift": "4px",
    "container-max": "1280px",
  },
  shadows: {
    "vln-glow": "0 0 12px #86d993",
    "vln-glow-blue": "0 0 12px #7dd3fc",
    "vln-glow-amber": "0 0 12px #fbbf24",
    "vln-glow-purple": "0 0 12px #c084fc",
    "vln-lift": "0 4px 6px rgba(0,0,0,0.3)",
  },
  typography: {
    "font-sans": ["Inter", "system-ui", "sans-serif"],
    "font-mono": ["JetBrains Mono", "Consolas", "monospace"],
  },
};

const ROUTES = [
  // Public
  { path: "/", title: "Homepage", status: "live", indexed: true },
  { path: "/services", title: "Services", status: "live", indexed: true },
  { path: "/services/igaming", title: "iGaming Security", status: "live", indexed: true },
  { path: "/services/san-francisco", title: "SF Services", status: "live", indexed: true },
  { path: "/pricing", title: "Pricing", status: "live", indexed: true },
  { path: "/contact", title: "Contact", status: "live", indexed: true },
  { path: "/about", title: "About", status: "live", indexed: true },
  { path: "/faq", title: "FAQ", status: "live", indexed: true },
  { path: "/referrals", title: "Referrals", status: "live", indexed: true },
  { path: "/privacy", title: "Privacy Policy", status: "live", indexed: true },
  { path: "/terms", title: "Terms of Service", status: "live", indexed: true },
  { path: "/refunds", title: "Refund Policy", status: "live", indexed: true },
  { path: "/get-help", title: "Get Help", status: "live", indexed: true },
  { path: "/status", title: "Project Dashboard", status: "live", indexed: false },
  // Internal (hidden)
  { path: "/internal/bj9k4-blackjack-premium", title: "Blackjack Premium", status: "live", indexed: false, note: "iGaming capability sample" },
  { path: "/internal/qx7b2-camo-preview", title: "Camo BG Preview", status: "live", indexed: false, note: "Background pattern sample" },
  // Planned
  { path: "/testimonials", title: "Testimonials", status: "planned", indexed: true },
  { path: "/case-studies", title: "Case Studies", status: "planned", indexed: true },
  { path: "/blog", title: "Blog", status: "planned", indexed: true },
  { path: "/vise", title: "VISE Platform", status: "planned", indexed: true },
];

const API_ROUTES = [
  { path: "/api/status", methods: ["GET"], description: "Design token + route manifest" },
  { path: "/api/bookings", methods: ["GET", "POST"], description: "Appointment booking" },
  { path: "/api/og", methods: ["GET"], description: "Dynamic OG image generation" },
  { path: "/api/og/design", methods: ["GET"], description: "design.vln.gg OG" },
  { path: "/api/og/docs", methods: ["GET"], description: "docs.vln.gg OG" },
];

const NAV = [
  { label: "Services", href: "/services", icon: "Shield" },
  { label: "iGaming", href: "/services/igaming", icon: "Gamepad2" },
  { label: "Pricing", href: "/pricing", icon: "Tag" },
  { label: "Referrals", href: "/referrals", icon: "Users" },
  { label: "Contact", href: "/contact", icon: "Mail" },
];

const COMPONENTS = {
  layout: ["Header", "Footer", "PageSkeleton"],
  vln: [
    "ICBoardBackground", "CamoBg", "PCBTraceBackground", "PCBTraceSvg",
    "CircuitBoardBold", "CircuitBoardModerate", "CircuitBoardOptimized", "CircuitBoardSubtle",
    "StatCard", "StatsGrid", "ServicePillars", "Testimonial", "TestimonialsSection",
    "FAQSection", "ComparisonTable", "GuaranteeSection", "UrgencyBanner",
    "EmployeeCard", "ClientCarousel",
  ],
  ui: ["Button", "Card"],
  animations: ["CSSFade", "StaggerFade", "Counter", "CodeRain"],
};

export async function GET() {
  return NextResponse.json(
    {
      meta: {
        project: "VLN.gg",
        version: "2.3",
        updatedAt: "2026-03-06",
        description: "VLN project status — design tokens, routes, nav, components",
        tokenSource: "tailwind.config.ts",
        docs: "/docs/design/README.md",
      },
      tokens: TOKENS,
      routes: ROUTES,
      apiRoutes: API_ROUTES,
      nav: NAV,
      components: COMPONENTS,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    }
  );
}
