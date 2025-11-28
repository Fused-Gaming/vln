import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import ScrollToTop from "@/components/ui/scroll-to-top";
import CookieConsent from "@/components/ui/cookie-consent";

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
    images: [
      {
        url: "/VLN2.svg",
        width: 1200,
        height: 630,
        alt: "VLN - Smart Contract Vulnerability Research Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VLN - Smart Contract Vulnerability Research Lab",
    description:
      "Professional smart contract security audits and vulnerability research for blockchain gaming, DeFi, and Web3 projects.",
    creator: "@vlngg",
    images: ["/VLN2.svg"],
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
      </head>
      <body className="antialiased bg-vln-bg text-vln-white font-sans">
        <Providers>
          {children}
          <ScrollToTop />
          <CookieConsent />
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
