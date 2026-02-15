import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import ScrollToTop from "@/components/ui/scroll-to-top";
import CookieConsent from "@/components/ui/cookie-consent";
import ZammadWidgetWrapper from "@/components/ZammadWidgetWrapper";

export const metadata: Metadata = {
  metadataBase: new URL("https://vln.gg"),
  title: {
    default: "VLN - Smart Contract Vulnerability Research Lab",
    template: "%s | VLN Security",
  },
  description:
    "Professional smart contract security audits and vulnerability research for blockchain gaming, DeFi, and Web3 projects. Expert CVSS-based assessments, proof-of-concept exploits, and incident response by Fused Gaming.",
  keywords: [
    "smart contract audit",
    "blockchain security",
    "vulnerability research",
    "blockchain gaming security",
    "DeFi security audit",
    "NFT security",
    "web3 security",
    "smart contract penetration testing",
    "EVM security",
    "Solidity audit",
    "incident response",
    "CVSS scoring",
    "proof of concept exploits",
    "Foundry security testing",
  ],
  authors: [{ name: "Fused Gaming", url: "https://vln.gg" }],
  creator: "Fused Gaming",
  publisher: "VLN - Vulnerability Lab Network",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "VLN - Smart Contract Vulnerability Research Lab",
    description:
      "Professional smart contract security audits and vulnerability research for blockchain gaming, DeFi, and Web3 projects.",
    url: "https://vln.gg",
    siteName: "VLN Security",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VLN - Smart Contract Vulnerability Research Lab",
    description:
      "Professional smart contract security audits and vulnerability research for blockchain gaming, DeFi, and Web3 projects.",
    creator: "@vlngg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://vln.gg",
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://vln.gg/#organization",
      name: "VLN - Vulnerability Lab Network",
      alternateName: "VLN",
      url: "https://vln.gg",
      logo: "https://vln.gg/vln-logo-dark.svg",
      description:
        "Professional smart contract security audits and vulnerability research for blockchain gaming, DeFi, and Web3 projects.",
      foundingDate: "2024",
      parentOrganization: {
        "@type": "Organization",
        name: "Fused Gaming",
      },
      sameAs: [
        "https://github.com/Fused-Gaming",
        "https://linkedin.com/company/vlngg",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        url: "https://vln.gg/contact",
        availableLanguage: "English",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://vln.gg/#website",
      url: "https://vln.gg",
      name: "VLN Security",
      publisher: { "@id": "https://vln.gg/#organization" },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://vln.gg/#service",
      name: "VLN Smart Contract Auditing",
      provider: { "@id": "https://vln.gg/#organization" },
      serviceType: "Smart Contract Security Audit",
      areaServed: "Worldwide",
      description:
        "CVSS-based smart contract security audits, vulnerability research, forensic investigation, and incident response for blockchain gaming and DeFi.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Security Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Prevention Audit",
              description:
                "Comprehensive smart contract audit with CVSS scoring and Foundry PoC exploits",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Emergency Forensics",
              description:
                "24/7 incident response, fund tracing, and exploit analysis",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Security Training",
              description:
                "Team training workshops and secure development bootcamps",
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@100..800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-vln-bg text-vln-white font-sans">
        <Providers>
          {children}
          <ScrollToTop />
          <CookieConsent />
          <ZammadWidgetWrapper />
          {/* Cloudflare Web Analytics */}
          <Script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "565db9149b914dc2aec85b7ac21da3c0"}'
            strategy="afterInteractive"
          />
        </Providers>
      </body>
    </html>
  );
}
