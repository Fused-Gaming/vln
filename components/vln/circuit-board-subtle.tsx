"use client";

import { motion } from "framer-motion";

export default function CircuitBoardSubtle() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lineGradientSubtle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a6c3a7" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#a6c3a7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a6c3a7" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glowSubtle">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Horizontal lines */}
        <motion.line
          x1="0"
          y1="200"
          x2="1000"
          y2="200"
          stroke="url(#lineGradientSubtle)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.line
          x1="0"
          y1="500"
          x2="1000"
          y2="500"
          stroke="url(#lineGradientSubtle)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        />
        <motion.line
          x1="0"
          y1="800"
          x2="1000"
          y2="800"
          stroke="url(#lineGradientSubtle)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 1 }}
        />

        {/* Vertical lines */}
        <motion.line
          x1="300"
          y1="0"
          x2="300"
          y2="1000"
          stroke="url(#lineGradientSubtle)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 0.3 }}
        />
        <motion.line
          x1="700"
          y1="0"
          x2="700"
          y2="1000"
          stroke="url(#lineGradientSubtle)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 0.8 }}
        />

        {/* Gentle pulsing nodes */}
        <motion.circle
          cx="300"
          cy="200"
          r="3"
          fill="#a6c3a7"
          filter="url(#glowSubtle)"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.circle
          cx="700"
          cy="500"
          r="3"
          fill="#a6c3a7"
          filter="url(#glowSubtle)"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.circle
          cx="300"
          cy="800"
          r="3"
          fill="#a6c3a7"
          filter="url(#glowSubtle)"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </svg>
    </div>
  );
}
