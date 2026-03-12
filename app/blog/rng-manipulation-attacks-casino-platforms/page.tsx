import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import Button from "@/components/ui/button";

export const metadata: Metadata = {
  title: "RNG Manipulation Attacks: How Casino Platforms Get Exploited | VLN",
  description:
    "A technical deep-dive into RNG manipulation attacks on casino and iGaming platforms — from block hash prediction on EVM chains to timing attacks on off-chain entropy sources. Real attack patterns and defenses.",
  keywords: [
    "RNG manipulation attacks casino",
    "blockchain RNG exploit",
    "casino platform RNG security",
    "on-chain randomness attack",
    "block hash prediction exploit",
    "Chainlink VRF security",
    "iGaming RNG manipulation",
    "provably fair attack vectors",
    "EVM gambling exploit",
    "PRNG attack casino",
  ],
  alternates: {
    canonical: "https://blog.vln.gg/rng-manipulation-attacks-casino-platforms",
  },
  openGraph: {
    title: "RNG Manipulation Attacks: How Casino Platforms Get Exploited | VLN",
    description:
      "Technical deep-dive into RNG manipulation attacks on casino platforms — block hash prediction, timing attacks, commit-reveal bypass, and defenses.",
    url: "https://blog.vln.gg/rng-manipulation-attacks-casino-platforms",
    type: "article",
  },
};

const attackVectors = [
  {
    rank: "01",
    name: "Block Hash Prediction (On-Chain)",
    severity: "9.5 Critical",
    severityColor: "text-red-400",
    color: "border-red-500/20 bg-red-500/5",
    labelColor: "text-red-400",
    summary:
      "The most common on-chain RNG exploit. Smart contracts that derive game outcomes directly from `block.hash`, `block.timestamp`, or `block.prevrandao` are vulnerable to miner/validator manipulation and contract-to-contract prediction attacks.",
    mechanic:
      "A malicious smart contract can call the gambling contract and read the same block hash that the RNG function will use. If the computed outcome is unfavorable, the attacker can revert their transaction — effectively getting unlimited free rolls until they win. Validators can also withhold blocks or orphan blocks to influence outcomes in high-value games.",
    realWorld:
      "In 2019, the Fomo3D-style contract \"LastWinner\" was drained by an attacker who deployed a prediction contract that only executed bets when the computed block hash yielded a jackpot outcome. The attacker won the jackpot in under 50 attempts, bypassing the intended 1-in-1000 odds.",
    defenses: [
      "Never use block.hash, block.timestamp, or block.prevrandao alone as entropy",
      "Use Chainlink VRF v2+ for tamper-proof on-chain randomness with cryptographic proofs",
      "Implement a two-transaction commit-reveal with multi-party entropy contributions",
      "Add a minimum block delay between bet placement and outcome resolution",
    ],
  },
  {
    rank: "02",
    name: "Commit-Reveal Bypass via Front-Running",
    severity: "8.5 High",
    severityColor: "text-orange-400",
    color: "border-orange-500/20 bg-orange-500/5",
    labelColor: "text-orange-400",
    summary:
      "Commit-reveal schemes are a common defense against block hash prediction, but they introduce a new attack surface: front-running. If the reveal transaction is publicly visible in the mempool before it is mined, an attacker can compute the outcome and either front-run a winning bet or back-run to cancel a losing position.",
    mechanic:
      "When the house reveals the random seed in the reveal phase, the reveal transaction sits in the mempool for 1–12+ seconds on congested networks. A monitoring bot can compute the winning outcome from the revealed seed and submit a higher-gas bet in the same block, ahead of other players, to capture the prize.",
    realWorld:
      "A dice contract on BSC used a commit-reveal scheme but allowed bet modifications up until the reveal transaction was mined. A searcher bot monitoring the BSC mempool identified high-value reveal transactions, computed outcomes, and submitted maximum-size bets with 10x gas priority, consistently extracting expected value above statistical chance for 3 weeks before the team detected the pattern.",
    defenses: [
      "Lock all bet parameters at commit time — no modifications allowed after commit",
      "Use flashbots-style private mempools or PBS to hide reveal transactions",
      "Require the player's own signed entropy to be included in outcome computation",
      "Use a VRF oracle that delivers randomness asynchronously, not via user-initiated reveal",
    ],
  },
  {
    rank: "03",
    name: "PRNG Seed Reconstruction (Off-Chain)",
    severity: "8.8 High",
    severityColor: "text-orange-400",
    color: "border-orange-500/20 bg-orange-500/5",
    labelColor: "text-orange-400",
    summary:
      "Off-chain casino platforms using weak pseudo-random number generators (PRNGs) seeded from observable or predictable data — server time, session identifiers, or counter values — can be reverse-engineered once an attacker collects enough outputs to reconstruct the internal state.",
    mechanic:
      "Many off-chain PRNGs (Mersenne Twister, LCG, PCG) have internal states that can be fully reconstructed from a small number of observed outputs. Once the state is known, all future outputs are deterministic. An attacker plays minimum bets, collects outputs, runs a state-recovery attack, then switches to maximum bets when a jackpot outcome is predicted.",
    realWorld:
      "A licensed online poker platform was found to be seeding its PRNG with a millisecond-resolution Unix timestamp at session start. Two researchers demonstrated they could reconstruct the full deck order from the first three community cards dealt, allowing them to determine all hole cards and future streets. The bug was present for approximately 11 months before disclosure.",
    defenses: [
      "Use a CSPRNG (ChaCha20, Fortuna) seeded from OS-level entropy (/dev/urandom)",
      "Never expose raw PRNG outputs — apply one-way transformations before sending to client",
      "Re-seed the PRNG frequently from fresh entropy, never run a single seed for many outputs",
      "Use hardware security modules (HSMs) for entropy generation on high-value game servers",
    ],
  },
  {
    rank: "04",
    name: "Timing Attack on Server-Side RNG",
    severity: "7.5 High",
    severityColor: "text-orange-400",
    color: "border-orange-500/20 bg-orange-500/5",
    labelColor: "text-orange-400",
    summary:
      "Server-side RNG systems that generate randomness at a predictable time relative to the player request can be exploited by precisely timing API requests to align with favorable internal states — particularly when the RNG is called on a fixed schedule or when server clock leakage is possible.",
    mechanic:
      "If a game server generates outcomes on a fixed-interval timer (e.g., every 50ms) and the network latency from a co-located attacker is measurable, the attacker can synchronize their bets to always hit specific time windows. Combined with weak seeding, even a few milliseconds of timing information can narrow the entropy search space dramatically.",
    realWorld:
      "A mobile slots platform used a server-side PRNG that was re-seeded every 60 seconds based on the system clock. Players co-located in the same data center (via cloud VPS) could measure request latency to determine the approximate server clock offset, then calculate the current seed epoch and predict high-payout spin windows with 30–40% accuracy above chance.",
    defenses: [
      "Decouple RNG generation from client request timing using pre-generated outcome queues",
      "Add jitter to RNG calls so they don't occur on predictable intervals",
      "Monitor for statistical deviation from expected outcome distributions per player session",
      "Rate-limit API endpoints to prevent high-frequency sampling attacks",
    ],
  },
  {
    rank: "05",
    name: "Chainlink VRF Misconfiguration",
    severity: "7.0 High",
    severityColor: "text-yellow-400",
    color: "border-yellow-500/20 bg-yellow-500/5",
    labelColor: "text-yellow-400",
    summary:
      "Chainlink VRF is widely adopted as a secure on-chain randomness source, but incorrect integration patterns can reintroduce vulnerabilities — particularly around fulfillment callback security, subscription management, and the handling of VRF responses in multi-round game logic.",
    mechanic:
      "Common integration mistakes include: (1) accepting VRF callbacks from unverified callers; (2) using a single VRF request for multiple game outcomes without separation; (3) allowing bets to be placed after a VRF request is submitted but before it is fulfilled, enabling front-running of known-pending randomness; (4) using requestIds as game state keys without collision-resistance validation.",
    realWorld:
      "An NFT-based battle game used Chainlink VRF v1 but accepted the fulfillRandomWords callback from any address — not just the registered VRF coordinator. An attacker deployed a contract that called the fulfillRandomWords function directly with a crafted randomness value, setting the battle outcome for any pending game to their preferred result.",
    defenses: [
      "Always restrict VRF callback acceptance to the registered Chainlink VRF Coordinator address",
      "Use separate VRF requests per game round — never share randomness across multiple outcomes",
      "Lock bet acceptance windows before VRF request and after fulfillment only",
      "Upgrade to Chainlink VRF v2+ with subscription management and proof verification",
    ],
  },
];

export default function RNGManipulationAttacksPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "RNG Manipulation Attacks: How Casino Platforms Get Exploited",
    description:
      "A technical deep-dive into RNG manipulation attacks on casino and iGaming platforms — from block hash prediction to off-chain PRNG reconstruction.",
    author: {
      "@type": "Organization",
      name: "VLN Security",
      url: "https://vln.gg",
    },
    publisher: {
      "@type": "Organization",
      name: "VLN – Vulnerability Lab Network",
      logo: "https://vln.gg/vln-logo-dark.svg",
    },
    datePublished: "2025-04-22",
    dateModified: "2026-01-01",
    url: "https://blog.vln.gg/rng-manipulation-attacks-casino-platforms",
    keywords:
      "RNG manipulation, casino security, block hash exploit, PRNG attack, Chainlink VRF, iGaming security",
  };

  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <ICBoardBackground />
      <Header />

      <main className="relative z-10">
        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto">
            <CSSFade direction="up">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Link
                  href="/blog"
                  className="text-vln-sage hover:text-vln-bluegray transition-colors text-sm"
                >
                  ← Blog
                </Link>
                <span className="text-vln-gray-dark">•</span>
                <span className="text-vln-gray-dark text-sm">RNG Analysis</span>
                <span className="text-vln-gray-dark">•</span>
                <span className="text-vln-gray-dark text-sm">February 28, 2026</span>
                <span className="text-vln-gray-dark">•</span>
                <span className="text-vln-gray-dark text-sm">16 min read</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                RNG Manipulation Attacks:{" "}
                <span className="text-gradient-rainbow">How Casino Platforms Get Exploited</span>
              </h1>

              <p className="text-lg sm:text-xl text-vln-gray leading-relaxed mb-6">
                Random Number Generation is the single most security-critical component in any
                gambling system. A flawed RNG doesn&apos;t just create unfairness — it creates an
                exploitable advantage that sophisticated attackers can turn into reliable profit at
                scale. This article documents five RNG attack classes VLN has encountered across
                on-chain and off-chain platforms.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["RNG Security", "iGaming", "EVM", "Block Hash", "PRNG", "Chainlink VRF"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium border border-vln-sage/30 text-vln-sage"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CSSFade>
          </div>
        </section>

        {/* Attack Vectors */}
        <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-24">
          <div className="max-w-4xl mx-auto space-y-10">
            {attackVectors.map((vector) => (
              <CSSFade key={vector.rank}>
                <article
                  className={`p-6 sm:p-8 rounded-vln border ${vector.color} transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-bold text-vln-bg-light/50 font-mono">
                        {vector.rank}
                      </span>
                      <div>
                        <h2 className={`text-2xl font-bold ${vector.labelColor}`}>{vector.name}</h2>
                        <span className={`text-sm font-mono font-medium ${vector.severityColor}`}>
                          CVSS {vector.severity}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-vln-gray leading-relaxed mb-5">{vector.summary}</p>

                  {/* Attack Mechanic */}
                  <div className="mb-5 p-4 rounded-vln bg-vln-bg border border-vln-bg-light">
                    <h3 className="text-xs font-semibold text-vln-gray-dark mb-2 uppercase tracking-wider">
                      Attack Mechanic
                    </h3>
                    <p className="text-vln-gray text-sm leading-relaxed">{vector.mechanic}</p>
                  </div>

                  {/* Real-World Example */}
                  <div className="mb-6 p-4 rounded-vln bg-vln-bg border border-vln-sage/10">
                    <h3 className="text-sm font-semibold text-vln-sage mb-2 uppercase tracking-wider">
                      Real-World Example
                    </h3>
                    <p className="text-vln-gray text-sm leading-relaxed">{vector.realWorld}</p>
                  </div>

                  {/* Defenses */}
                  <div>
                    <h3 className="text-sm font-semibold text-vln-white mb-3 uppercase tracking-wider">
                      Defenses
                    </h3>
                    <ul className="space-y-2">
                      {vector.defenses.map((defense, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-vln-gray">
                          <span className={`font-mono font-bold ${vector.labelColor} flex-shrink-0`}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {defense}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </CSSFade>
            ))}
          </div>
        </section>

        {/* Conclusion & CTA */}
        <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-24">
          <CSSFade>
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="p-6 sm:p-8 rounded-vln border border-vln-bluegray/20 bg-vln-bg-light">
                <h2 className="text-2xl font-bold text-vln-white mb-4">
                  The RNG Security Bottom Line
                </h2>
                <p className="text-vln-gray leading-relaxed mb-4">
                  Every attack class documented above has been observed in production systems — not
                  theoretical exercises. The common thread is that RNG security is treated as an
                  afterthought: developers choose the first available randomness source, don&apos;t
                  model adversarial interaction with the commit-reveal flow, and don&apos;t instrument
                  their systems to detect statistical deviation from expected outcomes.
                </p>
                <p className="text-vln-gray leading-relaxed">
                  VLN&apos;s RNG analysis service covers cryptographic quality assessment, entropy
                  source evaluation, output distribution testing, and adversarial modeling of all
                  bet-placement and outcome-resolution flows — both on-chain and off-chain.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light glow-lift text-center">
                <h2 className="text-2xl font-bold text-vln-white mb-3">
                  Is Your RNG Vulnerable?
                </h2>
                <p className="text-vln-gray mb-6">
                  VLN conducts dedicated RNG analysis and provable-fairness audits for on-chain and
                  off-chain iGaming platforms. Get a scoped assessment before adversaries do it for
                  you.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="primary" size="lg" href="/contact?service=rng-analysis" className="group">
                    Get RNG Audit
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </Button>
                  <Button variant="secondary" size="lg" href="/services">
                    View All Services
                  </Button>
                </div>
              </div>
            </div>
          </CSSFade>
        </section>
      </main>

      <Footer />
    </div>
  );
}
