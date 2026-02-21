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
    default: "VLN - Smart Contract Audit & Web3 Security | San Francisco Bay Area",
    template: "%s | VLN Security",
  },
  description:
    "San Francisco's trusted smart contract audit and Web3 security firm. Expert EVM audits, DeFi vulnerability research, blockchain forensics, and security training for Bay Area startups and DeFi teams. Serving Silicon Valley and the SF Bay Area.",
  keywords: [
    // Primary service keywords
    "smart contract audit",
    "smart contract audit San Francisco",
    "EVM audit services San Francisco",
    "DeFi security audit San Francisco",
    "Bay Area smart contract audit",
    "Bay Area blockchain security",
    "Web3 security services Bay Area",
    "Silicon Valley smart contract audit",
    // Long-tail local keywords
    "DeFi contract vulnerability audit San Francisco",
    "blockchain security training Bay Area developers",
    "smart contract forensics San Francisco",
    "Web3 penetration testing Bay Area",
    "Solidity audit services Bay Area",
    "EVM vulnerability research San Francisco",
    "DeFi startup security audit Bay Area",
    // General service keywords
    "blockchain security",
    "vulnerability research",
    "blockchain gaming security",
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
    title: "VLN - Smart Contract Audit & Web3 Security | San Francisco Bay Area",
    description:
      "San Francisco's trusted smart contract audit and Web3 security firm. Expert EVM audits, DeFi vulnerability research, and blockchain forensics for Bay Area startups and DeFi teams.",
    url: "https://vln.gg",
    siteName: "VLN Security",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VLN - Smart Contract Audit & Web3 Security | San Francisco Bay Area",
    description:
      "San Francisco's trusted smart contract audit and Web3 security firm. Expert EVM audits, DeFi vulnerability research, and blockchain forensics for Bay Area startups.",
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
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://vln.gg/#organization",
      name: "VLN - Vulnerability Lab Network",
      alternateName: ["VLN", "VLN Security"],
      url: "https://vln.gg",
      logo: "https://vln.gg/vln-logo-dark.svg",
      image: "https://vln.gg/vln-logo-dark.svg",
      description:
        "San Francisco Bay Area smart contract audit and Web3 security firm. Expert EVM audits, DeFi vulnerability research, blockchain forensics, and security training for blockchain startups and DeFi protocols.",
      foundingDate: "2021",
      parentOrganization: {
        "@type": "Organization",
        name: "Fused Gaming",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Francisco",
        addressRegion: "CA",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "37.7749",
        longitude: "-122.4194",
      },
      areaServed: [
        {
          "@type": "City",
          name: "San Francisco",
        },
        {
          "@type": "State",
          name: "California",
        },
        {
          "@type": "AdministrativeArea",
          name: "San Francisco Bay Area",
        },
        {
          "@type": "AdministrativeArea",
          name: "Silicon Valley",
        },
        "Worldwide",
      ],
      priceRange: "$$-$$$",
      sameAs: [
        "https://github.com/Fused-Gaming",
        "https://linkedin.com/company/vlngg",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        url: "https://vln.gg/contact",
        email: "info@vln.gg",
        availableLanguage: "English",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://vln.gg/#website",
      url: "https://vln.gg",
      name: "VLN Security",
      publisher: { "@id": "https://vln.gg/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://vln.gg/blog?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://vln.gg/#service",
      name: "VLN Smart Contract Auditing",
      provider: { "@id": "https://vln.gg/#organization" },
      serviceType: "Smart Contract Security Audit",
      areaServed: [
        "San Francisco Bay Area",
        "Silicon Valley",
        "California",
        "Worldwide",
      ],
      description:
        "CVSS-based smart contract security audits, vulnerability research, forensic investigation, and incident response for blockchain gaming and DeFi. Serving San Francisco Bay Area startups and global DeFi protocols.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web3 Security Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Smart Contract Audit",
              description:
                "Comprehensive EVM smart contract audit with CVSS scoring and Foundry PoC exploits. Serving San Francisco and Bay Area DeFi startups.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Emergency Blockchain Forensics",
              description:
                "24/7 incident response, on-chain fund tracing, and exploit analysis for DeFi protocols.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Web3 Security Training",
              description:
                "Team training workshops and secure Solidity development bootcamps for Bay Area blockchain developers.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "DeFi Penetration Testing",
              description:
                "Black-box and white-box penetration testing for DeFi platforms and blockchain protocols.",
            },
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://vln.gg/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do you offer smart contract audits for San Francisco Bay Area startups?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, VLN provides professional smart contract audits for Web3 startups and DeFi teams in San Francisco, Silicon Valley, and the greater Bay Area. We offer both remote and on-site engagements.",
          },
        },
        {
          "@type": "Question",
          name: "What types of blockchain security services does VLN offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "VLN offers smart contract audits, EVM penetration testing, blockchain forensics and incident response, secure Solidity development consulting, and security training workshops for development teams.",
          },
        },
        {
          "@type": "Question",
          name: "How much does a smart contract audit cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Smart contract audit pricing starts at $2,000 for small contracts (under 500 lines), $5,000-$8,000 for medium projects, and $10,000+ for large or complex protocols. We offer a free 30-minute initial security scan.",
          },
        },
      ],
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
        {/* Geographic meta tags for local SEO */}
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="San Francisco, California" />
        <meta name="geo.position" content="37.7749;-122.4194" />
        <meta name="ICBM" content="37.7749, -122.4194" />
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
