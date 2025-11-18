"use client";

import { memo } from "react";

// SVG Logo Components
const SolanaLogo = () => (
  <svg viewBox="0 0 397.7 311.7" className="w-full h-full">
    <defs>
      <linearGradient id="solana-gradient" x1="360.8791" y1="351.4553" x2="141.213" y2="-69.2936" gradientTransform="matrix(1 0 0 -1 0 314)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#00ffa3"/>
        <stop offset="1" stopColor="#dc1fff"/>
      </linearGradient>
    </defs>
    <path fill="url(#solana-gradient)" d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"/>
    <path fill="url(#solana-gradient)" d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"/>
    <path fill="url(#solana-gradient)" d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"/>
  </svg>
);

const EthereumLogo = () => (
  <svg viewBox="0 0 784 1277" className="w-full h-full">
    <path fill="currentColor" d="M392.07 0l-8.57 29.11v844.63l8.57 8.55 392.06-231.75z" fillOpacity=".6"/>
    <path fill="currentColor" d="M392.07 0L0 650.54l392.07 231.75V472.33z"/>
    <path fill="currentColor" d="M392.07 956.52l-4.83 5.89v300.87l4.83 14.1 392.3-552.49z" fillOpacity=".6"/>
    <path fill="currentColor" d="M392.07 1277.38V956.52L0 724.89z"/>
    <path fill="currentColor" d="M392.07 882.29l392.06-231.75-392.06-178.21z" fillOpacity=".2"/>
    <path fill="currentColor" d="M0 650.54l392.07 231.75V472.33z" fillOpacity=".6"/>
  </svg>
);

const GitHubLogo = () => (
  <svg viewBox="0 0 98 96" className="w-full h-full">
    <path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
  </svg>
);

const TelegramLogo = () => (
  <svg viewBox="0 0 240 240" className="w-full h-full">
    <defs>
      <linearGradient id="telegram-gradient" x1="120" y1="0" x2="120" y2="240" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#2AABEE"/>
        <stop offset="1" stopColor="#229ED9"/>
      </linearGradient>
    </defs>
    <circle cx="120" cy="120" r="120" fill="url(#telegram-gradient)"/>
    <path fill="#fff" d="M81.229 128.772l14.237 39.406s1.78 3.687 3.686 3.687 30.255-29.492 30.255-29.492l31.525-60.89L81.737 118.6l-.508 10.172z"/>
    <path fill="#D2E5F1" d="M100.106 138.878l-2.733 29.046s-1.144 8.9 7.754 0 17.415-15.763 17.415-15.763"/>
    <path fill="#B5CFE4" d="M81.486 130.178l-17.8-5.467s-2.135-.932-1.417-3.035c.145-.432.393-.775.98-1.187 5.423-3.836 102.42-38.38 102.42-38.38s1.765-.628 3.184-.117c.574.222 1.055.616 1.265 1.326.093.315.118.6.126.896.01.307-.013.622-.024.95a9.34 9.34 0 0 1-.09 1.296l-17.3 87.93s-.912 3.74-3.626 3.74c-1.106 0-2.28-.447-3.707-1.545-7.43-5.73-33.048-23.637-38.566-27.633-.154-.118-.285-.267-.346-.452-.074-.223.01-.554.09-.758.24-.56 16.83-15.13 33.934-31.66 1.142-1.107.968-1.477.584-1.477-.485 0-1.08.505-1.56.878-8.16 6.344-44.55 29.785-47.975 32.086-.445.296-1.023.496-1.707.486-.625-.01-1.25-.16-1.843-.36-.912-.31-16.332-5.462-18.423-6.17z"/>
  </svg>
);

const CloudflareLogo = () => (
  <svg viewBox="0 0 256 100" className="w-full h-full">
    <path fill="#F38020" d="M195.68 61.48c-.43-.33-.62-.88-.51-1.44l1.4-7.16c.21-.92.1-1.88-.31-2.72-.41-.84-1.06-1.51-1.87-1.93l-.16-.08c-.8-.39-1.69-.57-2.58-.52-1.64.09-3.16.96-4.07 2.32l-1.69 2.51c-.24.36-.72.53-1.15.41l-7.21-2c-.84-.23-1.75-.12-2.51.31-.76.43-1.3 1.13-1.51 1.97l-.06.23c-.21.84-.11 1.73.28 2.5.39.77 1.03 1.35 1.81 1.63l7.13 2.58c.39.14.64.51.61.93l-.45 7.44c-.06.93.23 1.85.81 2.59.58.74 1.41 1.23 2.32 1.38l.24.04c.91.13 1.84-.03 2.63-.45.79-.42 1.4-1.08 1.73-1.87l2.4-7.05c.15-.42.57-.66 1.01-.58l7.52.93c.93.11 1.88-.14 2.64-.72.76-.58 1.26-1.43 1.38-2.37l.02-.24c.12-.94-.12-1.88-.68-2.65-.56-.77-1.38-1.28-2.3-1.44l-7.46-1.51c-.46-.09-.77-.51-.7-.97.01-.06.02-.12.04-.18l1.04-5.29c.15-.76-.01-1.55-.45-2.18z"/>
    <path fill="#FAAE40" d="M245.15 61.52h-41.46c-1.36 0-2.53-.98-2.75-2.31l-.57-3.38c-.48-2.82-2.89-4.9-5.76-4.97h-.27c-3.11 0-5.67 2.41-5.92 5.58l-.33 4.18c-.11 1.39-1.29 2.45-2.68 2.42h-41.02c-1.39 0-2.56-1.04-2.68-2.42l-.33-4.18c-.25-3.17-2.81-5.58-5.92-5.58h-.27c-2.87.07-5.28 2.15-5.76 4.97l-.57 3.38c-.22 1.33-1.39 2.31-2.75 2.31H85.52c-1.36 0-2.53.98-2.75 2.31l-.57 3.38c-.48 2.82-2.89 4.9-5.76 4.97h-.27c-3.11 0-5.67-2.41-5.92-5.58l-.33-4.18c-.11-1.39-1.29-2.45-2.68-2.42H26.59c-1.39 0-2.56-1.04-2.68-2.42l-.33-4.18c-.25-3.17-2.81-5.58-5.92-5.58h-.27c-2.87.07-5.28 2.15-5.76 4.97l-.57 3.38c-.22 1.33-1.39 2.31-2.75 2.31H1.95c-.51 0-.93.41-.93.91v5.47c0 .51.42.93.93.93h243.2c.51 0 .93-.42.93-.93v-5.47c0-.5-.42-.91-.93-.91z"/>
  </svg>
);

// Client logos data with SVG components
const clients = [
  { name: "Solana", component: SolanaLogo, type: "blockchain" },
  { name: "Ethereum", component: EthereumLogo, type: "blockchain" },
  { name: "GitHub", component: GitHubLogo, type: "tech" },
  { name: "Telegram", component: TelegramLogo, type: "tech" },
  { name: "Cloudflare", component: CloudflareLogo, type: "tech" },
];

// Gaming platforms (using text for now as they're proprietary)
const gamingPartners = [
  "Stake.com",
  "Shuffle.com",
  "Thrill.com",
  "Fullhouse.gg",
  "Razed.com",
  "Gamba.com",
];

// Government/Regulatory (using text for sensitive logos)
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

      {/* Row 1: SVG Logos - Blockchain & Tech */}
      <div className="relative mb-8">
        <div className="flex animate-scroll-left">
          {/* First set */}
          {clients.map((client, index) => {
            const LogoComponent = client.component;
            return (
              <div
                key={`${client.name}-1-${index}`}
                className="flex-shrink-0 mx-6 sm:mx-8 flex items-center justify-center"
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center p-4 rounded-lg bg-vln-bg-lighter/50 border border-vln-sage/10 hover:border-vln-sage/30 transition-all duration-300 hover:scale-110 text-vln-gray hover:text-vln-sage">
                  <LogoComponent />
                </div>
              </div>
            );
          })}
          {/* Duplicate set for seamless loop */}
          {clients.map((client, index) => {
            const LogoComponent = client.component;
            return (
              <div
                key={`${client.name}-2-${index}`}
                className="flex-shrink-0 mx-6 sm:mx-8 flex items-center justify-center"
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center p-4 rounded-lg bg-vln-bg-lighter/50 border border-vln-sage/10 hover:border-vln-sage/30 transition-all duration-300 hover:scale-110 text-vln-gray hover:text-vln-sage">
                  <LogoComponent />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Gaming partners */}
      <div className="relative mb-8">
        <div className="flex animate-scroll-right">
          {/* First set */}
          {gamingPartners.map((partner, index) => (
            <div
              key={`${partner}-1-${index}`}
              className="flex-shrink-0 mx-6 sm:mx-8 flex items-center justify-center"
            >
              <div className="relative px-6 py-4 rounded-lg bg-vln-bg-lighter/50 border border-vln-purple/10 hover:border-vln-purple/30 transition-all duration-300 hover:scale-105">
                <span className="text-sm sm:text-base font-semibold text-vln-gray hover:text-vln-purple transition-colors whitespace-nowrap">
                  {partner}
                </span>
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {gamingPartners.map((partner, index) => (
            <div
              key={`${partner}-2-${index}`}
              className="flex-shrink-0 mx-6 sm:mx-8 flex items-center justify-center"
            >
              <div className="relative px-6 py-4 rounded-lg bg-vln-bg-lighter/50 border border-vln-purple/10 hover:border-vln-purple/30 transition-all duration-300 hover:scale-105">
                <span className="text-sm sm:text-base font-semibold text-vln-gray hover:text-vln-purple transition-colors whitespace-nowrap">
                  {partner}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: Government/Regulatory clients */}
      <div className="relative">
        <div className="flex animate-scroll-left">
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
