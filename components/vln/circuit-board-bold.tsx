"use client";

import { motion } from "framer-motion";

export default function CircuitBoardBold() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lineGradientBold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a6c3a7" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#a6c3a7" stopOpacity="1" />
            <stop offset="100%" stopColor="#a6c3a7" stopOpacity="0.7" />
          </linearGradient>
          <filter id="glowBold">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="nodePulse">
            <stop offset="0%" stopColor="#a6c3a7" stopOpacity="1" />
            <stop offset="100%" stopColor="#a6c3a7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Dense network of circuit paths */}
        {/* Main horizontal buses */}
        {[100, 250, 400, 550, 700, 850].map((y, i) => (
          <motion.line
            key={`h-${i}`}
            x1="0"
            y1={y}
            x2="1000"
            y2={y}
            stroke="url(#lineGradientBold)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2 + i * 0.2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.1,
            }}
          />
        ))}

        {/* Vertical buses */}
        {[150, 350, 550, 750, 900].map((x, i) => (
          <motion.line
            key={`v-${i}`}
            x1={x}
            y1="0"
            x2={x}
            y2="1000"
            stroke="url(#lineGradientBold)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2.5 + i * 0.2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.15,
            }}
          />
        ))}

        {/* Complex interconnects */}
        <motion.path
          d="M 0 100 L 150 100 L 150 250 L 350 250 L 350 400 L 550 400"
          stroke="#a6c3a7"
          strokeWidth="2.5"
          fill="none"
          filter="url(#glowBold)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M 550 400 L 750 400 L 750 550 L 900 550 L 900 700 L 1000 700"
          stroke="#a6c3a7"
          strokeWidth="2.5"
          fill="none"
          filter="url(#glowBold)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 1 }}
        />

        {/* Dense node network */}
        {[100, 250, 400, 550, 700, 850].flatMap((y) =>
          [150, 350, 550, 750, 900].map((x) => ({ x, y }))
        ).map((node, i) => (
          <motion.g key={`node-${i}`}>
            {/* Outer glow ring */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="12"
              fill="url(#nodePulse)"
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0.8, 1.5, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.08,
              }}
            />
            {/* Main node */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="7"
              fill="#a6c3a7"
              filter="url(#glowBold)"
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [0.9, 1.2, 0.9],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
            {/* Center dot */}
            <circle cx={node.x} cy={node.y} r="3" fill="#0f0f0f" />
          </motion.g>
        ))}

        {/* Data flow particles on main paths */}
        {[0, 0.3, 0.6, 0.9].map((delay, i) => (
          <motion.circle
            key={`particle-${i}`}
            r="3"
            fill="#aab7c8"
            filter="url(#glowBold)"
            animate={{
              offsetDistance: ["0%", "100%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay,
            }}
          >
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path="M 0 100 L 150 100 L 150 250 L 350 250 L 350 400 L 550 400 L 750 400 L 750 550 L 900 550 L 900 700 L 1000 700"
            />
          </motion.circle>
        ))}

        {/* Secondary particle flows */}
        {[150, 350, 550, 750].map((x, i) => (
          <motion.circle
            key={`v-particle-${i}`}
            cx={x}
            r="2.5"
            fill="#aab7c8"
            filter="url(#glowBold)"
            animate={{
              cy: [0, 1000],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
