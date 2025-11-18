import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import PCBTraceBackground from "@/components/vln/pcb-trace-background";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

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
        url: "/og-image.png",
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
    images: ["/twitter-image.png"],
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-vln-bg text-vln-white">
        <PCBTraceBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
