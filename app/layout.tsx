import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'VLN.gg - iGaming Security & Smart Contract Intelligence',
    template: '%s | VLN.gg',
  },
  description:
    'Enterprise-grade security consulting, RNG analysis, wallet-flow risk modeling, and EVM smart contract auditing for high-risk, high-throughput gaming systems.',
  keywords: [
    'security',
    'igaming',
    'smart contracts',
    'vulnerability',
    'audit',
    'blockchain',
    'EVM',
    'RNG',
    'penetration testing',
  ],
  authors: [{ name: 'Fused Gaming' }],
  creator: 'Fused Gaming',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vln.gg',
    siteName: 'VLN.gg',
    title: 'VLN.gg - iGaming Security & Smart Contract Intelligence',
    description:
      'Enterprise-grade security consulting for gaming and blockchain systems.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VLN.gg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VLN.gg - iGaming Security & Smart Contract Intelligence',
    description:
      'Enterprise-grade security consulting for gaming and blockchain systems.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
