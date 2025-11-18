"use client";

import { memo } from "react";

// Enhanced PCB Trace SVG Component
// Uses VLN color palette with CSS variables for easy customization
// Based on motherboard/PCB design aesthetic
function PCBTraceSVG() {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-20">
      <svg
        viewBox="0 0 2800 1800"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* VLN Color Gradient */}
          <linearGradient id="vln-trace-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "var(--vln-sage)", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "var(--vln-bluegray)", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "var(--vln-purple)", stopOpacity: 1 }} />
          </linearGradient>

          {/* Glow Effect */}
          <radialGradient id="vln-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: "var(--vln-bluegray)", stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: "var(--vln-bluegray)", stopOpacity: 0 }} />
          </radialGradient>

          {/* Animated Glow Filter */}
          <filter id="vln-glow-filter">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <style>{`
          .vln-trace {
            fill: none;
            stroke: url(#vln-trace-gradient);
            stroke-linecap: round;
            stroke-linejoin: round;
            opacity: 0.6;
          }
          .vln-trace.thick { stroke-width: 4; }
          .vln-trace.med { stroke-width: 2.5; }
          .vln-trace.fine { stroke-width: 1.5; }

          .vln-chip {
            fill: var(--vln-bg-light);
            stroke: var(--vln-sage);
            stroke-width: 2;
            transition: all 0.3s ease;
          }
          .vln-chip:hover {
            fill: var(--vln-sage);
            stroke: var(--vln-sage-light);
            filter: url(#vln-glow-filter);
          }

          @media (prefers-reduced-motion: reduce) {
            .vln-trace, .vln-chip {
              transition: none !important;
            }
          }
        `}</style>

        {/* Background */}
        <rect width="2800" height="1800" fill="var(--vln-bg)" />

        {/* Horizontal Bus Lines */}
        <g id="bus-horizontal">
          {[300, 340, 380, 420, 460, 900, 940, 980, 1020, 1060, 1380, 1420, 1460, 1500].map((y, i) => (
            <path
              key={`h-bus-${i}`}
              className="vln-trace thick"
              d={`M 200,${y} L 2600,${y}`}
              pathLength="1000"
            />
          ))}
        </g>

        {/* Vertical Bus Lines */}
        <g id="bus-vertical">
          {[400, 460, 520, 580, 1340, 1400, 1460, 2220, 2280, 2340, 2400].map((x, i) => (
            <path
              key={`v-bus-${i}`}
              className="vln-trace thick"
              d={`M ${x},150 L ${x},1650`}
              pathLength="1000"
            />
          ))}
        </g>

        {/* Diagonal Traces */}
        <g id="bus-diagonal">
          <path className="vln-trace med" d="M 700,200 L 1100,600" />
          <path className="vln-trace med" d="M 760,200 L 1160,600" />
          <path className="vln-trace med" d="M 820,200 L 1220,600" />
          <path className="vln-trace med" d="M 2100,200 L 1700,600" />
          <path className="vln-trace med" d="M 2040,200 L 1640,600" />
          <path className="vln-trace med" d="M 1980,200 L 1580,600" />
          <path className="vln-trace med" d="M 700,1600 L 1100,1200" />
          <path className="vln-trace med" d="M 760,1600 L 1160,1200" />
          <path className="vln-trace med" d="M 820,1600 L 1220,1200" />
          <path className="vln-trace med" d="M 2100,1600 L 1700,1200" />
          <path className="vln-trace med" d="M 2040,1600 L 1640,1200" />
          <path className="vln-trace med" d="M 1980,1600 L 1580,1200" />
        </g>

        {/* Branch Connections */}
        <g id="branches">
          <path className="vln-trace med" d="M 400,300 L 400,600 L 1000,600" />
          <path className="vln-trace med" d="M 460,340 L 460,640 L 1000,640" />
          <path className="vln-trace med" d="M 520,380 L 520,680 L 1000,680" />
          <path className="vln-trace med" d="M 2400,300 L 2400,600 L 1800,600" />
          <path className="vln-trace med" d="M 2340,340 L 2340,640 L 1800,640" />
          <path className="vln-trace med" d="M 2280,380 L 2280,680 L 1800,680" />
          <path className="vln-trace med" d="M 400,900 L 600,900 L 600,1100 L 1000,1100" />
          <path className="vln-trace med" d="M 460,940 L 640,940 L 640,1140 L 1000,1140" />
          <path className="vln-trace med" d="M 520,980 L 680,980 L 680,1180 L 1000,1180" />
          <path className="vln-trace med" d="M 2400,900 L 2200,900 L 2200,1100 L 1800,1100" />
          <path className="vln-trace med" d="M 2340,940 L 2160,940 L 2160,1140 L 1800,1140" />
          <path className="vln-trace med" d="M 2280,980 L 2120,980 L 2120,1180 L 1800,1180" />
          <path className="vln-trace med" d="M 400,1380 L 400,1200 L 1000,1200" />
          <path className="vln-trace med" d="M 460,1420 L 460,1240 L 1000,1240" />
          <path className="vln-trace med" d="M 520,1460 L 520,1280 L 1000,1280" />
          <path className="vln-trace med" d="M 2400,1380 L 2400,1200 L 1800,1200" />
          <path className="vln-trace med" d="M 2340,1420 L 2340,1240 L 1800,1240" />
          <path className="vln-trace med" d="M 2280,1460 L 2280,1280 L 1800,1280" />
        </g>

        {/* Fine Micro Traces */}
        <g id="micro-traces">
          <path className="vln-trace fine" d="M 1340,600 L 1340,750" />
          <path className="vln-trace fine" d="M 1400,600 L 1400,750" />
          <path className="vln-trace fine" d="M 1460,600 L 1460,750" />
          <path className="vln-trace fine" d="M 1340,1050 L 1340,1200" />
          <path className="vln-trace fine" d="M 1400,1050 L 1400,1200" />
          <path className="vln-trace fine" d="M 1460,1050 L 1460,1200" />
          <path className="vln-trace fine" d="M 1000,600 L 1200,600 L 1200,750" />
          <path className="vln-trace fine" d="M 1000,640 L 1220,640 L 1220,750" />
          <path className="vln-trace fine" d="M 1000,680 L 1240,680 L 1240,750" />
          <path className="vln-trace fine" d="M 1800,600 L 1600,600 L 1600,750" />
          <path className="vln-trace fine" d="M 1800,640 L 1580,640 L 1580,750" />
          <path className="vln-trace fine" d="M 1800,680 L 1560,680 L 1560,750" />
          <path className="vln-trace fine" d="M 1000,1100 L 1200,1100 L 1200,1050" />
          <path className="vln-trace fine" d="M 1000,1140 L 1220,1140 L 1220,1050" />
          <path className="vln-trace fine" d="M 1000,1180 L 1240,1180 L 1240,1050" />
          <path className="vln-trace fine" d="M 1800,1100 L 1600,1100 L 1600,1050" />
          <path className="vln-trace fine" d="M 1800,1140 L 1580,1140 L 1580,1050" />
          <path className="vln-trace fine" d="M 1800,1180 L 1560,1180 L 1560,1050" />
        </g>

        {/* Main CPU Chip */}
        <rect className="vln-chip" x="1250" y="750" width="300" height="300" rx="8" />

        {/* Chipset */}
        <rect className="vln-chip" x="1800" y="1350" width="180" height="180" rx="6" />

        {/* VRM Components - Left */}
        <g id="vrm-left">
          {[550, 660, 770].map((y, i) => (
            <rect key={`vrm-l-${i}`} className="vln-chip" x="250" y={y} width="100" height="80" rx="4" />
          ))}
        </g>

        {/* VRM Components - Right */}
        <g id="vrm-right">
          {[550, 660, 770].map((y, i) => (
            <rect key={`vrm-r-${i}`} className="vln-chip" x="2450" y={y} width="100" height="80" rx="4" />
          ))}
        </g>

        {/* DIMM Memory Slots */}
        <g id="dimm-slots">
          {[800, 890, 980, 1070].map((x, i) => (
            <rect key={`dimm-${i}`} className="vln-chip" x={x} y="1350" width="60" height="200" rx="3" />
          ))}
        </g>

        {/* Main Trace Path */}
        <path
          className="vln-trace thick"
          d="M 200,300 L 400,300 L 400,600 L 700,600 L 1000,600 L 1200,600 L 1200,750 L 1250,750 L 1250,900 L 1340,900 L 1340,1050 L 1400,1050 L 1400,1200 L 1800,1200 L 1800,1350 L 2000,1350 L 2000,1500 L 2600,1500 L 2600,900 L 2400,900 L 2400,600 L 2100,600 L 1800,600 L 1600,600 L 1600,750 L 1550,750 L 1550,900 L 1460,900 L 1460,1050 L 1340,1050 L 1200,1050 L 1000,1050 L 800,1050 L 600,1050 L 400,1050 L 400,1380 L 200,1380"
          pathLength="1000"
        />
      </svg>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(PCBTraceSVG);
