"use client";

import { motion } from "framer-motion";

export default function CircuitBoardModerate() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lineGradientMod" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a6c3a7" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#a6c3a7" stopOpacity="1" />
            <stop offset="100%" stopColor="#a6c3a7" stopOpacity="0.5" />
          </linearGradient>
          <filter id="glowMod">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Complex circuit paths */}
        <motion.path
          d="M 0 150 L 250 150 L 250 300 L 500 300"
          stroke="url(#lineGradientMod)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M 500 300 L 750 300 L 750 450 L 1000 450"
          stroke="url(#lineGradientMod)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 0.8 }}
        />
        <motion.path
          d="M 0 600 L 200 600 L 200 750 L 400 750"
          stroke="url(#lineGradientMod)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 0.3 }}
        />
        <motion.path
          d="M 600 750 L 800 750 L 800 900 L 1000 900"
          stroke="url(#lineGradientMod)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 1.2 }}
        />

        {/* Vertical connectors */}
        <motion.line
          x1="250"
          y1="150"
          x2="250"
          y2="600"
          stroke="#a6c3a7"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          strokeDasharray="5,5"
          animate={{ strokeDashoffset: [0, -10] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.line
          x1="750"
          y1="300"
          x2="750"
          y2="750"
          stroke="#a6c3a7"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          strokeDasharray="5,5"
          animate={{ strokeDashoffset: [0, -10] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Glowing nodes at intersections */}
        {[
          { cx: 250, cy: 150 },
          { cx: 250, cy: 300 },
          { cx: 500, cy: 300 },
          { cx: 750, cy: 300 },
          { cx: 750, cy: 450 },
          { cx: 200, cy: 600 },
          { cx: 200, cy: 750 },
          { cx: 400, cy: 750 },
          { cx: 800, cy: 750 },
          { cx: 800, cy: 900 },
        ].map((node, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="6"
              fill="#a6c3a7"
              filter="url(#glowMod)"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
            <circle cx={node.cx} cy={node.cy} r="3" fill="#0f0f0f" />
          </motion.g>
        ))}

        {/* Data flow particles */}
        <motion.circle
          r="2"
          fill="#aab7c8"
          filter="url(#glowMod)"
          animate={{
            offsetDistance: ["0%", "100%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <animateMotion dur="3s" repeatCount="indefinite" path="M 0 150 L 250 150 L 250 300 L 500 300" />
        </motion.circle>
      </svg>
    </div>
  );
}
