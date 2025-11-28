"use client";

import { memo } from "react";

// Optimized circuit board with minimal animations
// Uses CSS animations instead of Framer Motion for better performance
function CircuitBoardOptimized() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#86d993" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#86d993" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#86d993" stopOpacity="0.4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Static grid pattern */}
        <g opacity="0.3">
          {[100, 250, 400, 550, 700, 850].map((y) => (
            <line
              key={`h-${y}`}
              x1="0"
              y1={y}
              x2="1000"
              y2={y}
              stroke="#86d993"
              strokeWidth="1"
              opacity="0.3"
            />
          ))}
          {[150, 350, 550, 750, 900].map((x) => (
            <line
              key={`v-${x}`}
              x1={x}
              y1="0"
              x2={x}
              y2="1000"
              stroke="#86d993"
              strokeWidth="1"
              opacity="0.3"
            />
          ))}
        </g>

        {/* Animated paths - only a few */}
        <path
          d="M 0 200 L 300 200 L 300 400 L 600 400"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="10 5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="15"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>

        <path
          d="M 400 600 L 700 600 L 700 800 L 1000 800"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="10 5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="15"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>

        {/* Key intersection nodes only */}
        {[
          { cx: 300, cy: 200 },
          { cx: 300, cy: 400 },
          { cx: 600, cy: 400 },
          { cx: 700, cy: 600 },
          { cx: 700, cy: 800 },
        ].map((node, i) => (
          <circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r="4"
            fill="#86d993"
            filter="url(#glow)"
            opacity="0.6"
          >
            <animate
              attributeName="opacity"
              values="0.4;0.8;0.4"
              dur={`${2 + i * 0.3}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          svg * {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(CircuitBoardOptimized);
