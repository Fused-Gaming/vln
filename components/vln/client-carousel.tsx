"use client";

import { memo } from "react";
import Image from "next/image";

// Client logos with their CDN URLs
const clients = [
  // Gaming/Crypto Platforms
  { name: "Stake.com", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Stake_logo.svg", type: "gaming" },
  { name: "Shuffle.com", logo: "https://shuffle.com/icons/logo.svg", type: "gaming" },
  { name: "Thrill.com", logo: "https://thrill.com/favicon.ico", type: "gaming" },
  { name: "Fullhouse.gg", logo: "https://fullhouse.gg/logo/logo.webp", type: "gaming" },
  { name: "Razed.com", logo: "https://razed.com/favicon.ico", type: "gaming" },
  { name: "Gamba.com", logo: "https://gamba.com/favicon.ico", type: "gaming" },

  // Blockchain Platforms
  { name: "Solana", logo: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png", type: "blockchain" },
  { name: "Ethereum", logo: "https://ethereum.org/images/eth-org-logo.png", type: "blockchain" },

  // Tech/Infrastructure
  { name: "Telegram", logo: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg", type: "tech" },
  { name: "Discord", logo: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.svg", type: "tech" },
  { name: "Google", logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png", type: "tech" },
  { name: "Cloudflare", logo: "https://cf-assets.www.cloudflare.com/dzlvafdwdttg/735eoClKJf9XfkqCJs1mfZ/b6767158f39af8d538517df918b8fc2e/logo-white-desktop.svg", type: "tech" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", type: "tech" },
  { name: "GitHub", logo: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png", type: "tech" },

  // Development Tools
  { name: "Foundry", logo: "https://getfoundry.sh/og-image.png", type: "dev" },
  { name: "Solidity", logo: "https://upload.wikimedia.org/wikipedia/commons/9/98/Solidity_logo.svg", type: "dev" },
];

// Government/Regulatory (using placeholder for sensitive logos)
const governmentClients = [
  "FBI",
  "Secret Service",
  "Public Defenders",
  "Federal Prosecutors",
  "State Prosecutors",
  "FinCEN",
  "Department of Justice",
  "IRS",
  "Gaming Regulators",
];

function ClientCarousel() {
  return (
    <div className="relative w-full overflow-hidden py-12 bg-gradient-to-b from-vln-bg via-vln-bg-light to-vln-bg">
      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-vln-bg to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-vln-bg to-transparent z-10" />

      {/* Title */}
      <div className="text-center mb-8 px-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-vln-white mb-2">
          Trusted by Industry Leaders
        </h3>
        <p className="text-sm sm:text-base text-vln-gray">
          From blockchain gaming to federal agencies
        </p>
      </div>

      {/* Infinite scrolling carousel - Row 1 */}
      <div className="relative">
        <div className="flex animate-scroll-left">
          {/* First set */}
          {clients.map((client, index) => (
            <div
              key={`${client.name}-1-${index}`}
              className="flex-shrink-0 mx-6 sm:mx-8 flex items-center justify-center"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center p-4 rounded-lg bg-vln-bg-lighter/50 border border-vln-sage/10 hover:border-vln-sage/30 transition-all duration-300 hover:scale-110">
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  width={64}
                  height={64}
                  className="object-contain filter brightness-0 invert opacity-60 hover:opacity-100 transition-opacity"
                  unoptimized
                />
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {clients.map((client, index) => (
            <div
              key={`${client.name}-2-${index}`}
              className="flex-shrink-0 mx-6 sm:mx-8 flex items-center justify-center"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center p-4 rounded-lg bg-vln-bg-lighter/50 border border-vln-sage/10 hover:border-vln-sage/30 transition-all duration-300 hover:scale-110">
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  width={64}
                  height={64}
                  className="object-contain filter brightness-0 invert opacity-60 hover:opacity-100 transition-opacity"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Government/Regulatory clients - Row 2 (scrolling opposite direction) */}
      <div className="relative mt-8">
        <div className="flex animate-scroll-right">
          {/* First set */}
          {governmentClients.map((client, index) => (
            <div
              key={`${client}-1-${index}`}
              className="flex-shrink-0 mx-6 sm:mx-8 flex items-center justify-center"
            >
              <div className="relative px-6 py-4 rounded-lg bg-vln-bg-lighter/50 border border-vln-bluegray/10 hover:border-vln-bluegray/30 transition-all duration-300 hover:scale-105">
                <span className="text-xs sm:text-sm font-semibold text-vln-gray hover:text-vln-bluegray transition-colors whitespace-nowrap">
                  {client}
                </span>
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {governmentClients.map((client, index) => (
            <div
              key={`${client}-2-${index}`}
              className="flex-shrink-0 mx-6 sm:mx-8 flex items-center justify-center"
            >
              <div className="relative px-6 py-4 rounded-lg bg-vln-bg-lighter/50 border border-vln-bluegray/10 hover:border-vln-bluegray/30 transition-all duration-300 hover:scale-105">
                <span className="text-xs sm:text-sm font-semibold text-vln-gray hover:text-vln-bluegray transition-colors whitespace-nowrap">
                  {client}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 60s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 60s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-left,
          .animate-scroll-right {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export default memo(ClientCarousel);
