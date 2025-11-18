"use client";

import { memo } from "react";

// Enhanced PCB Trace SVG Component
// High-fidelity motherboard/PCB design with comprehensive trace routing
// Uses modern gradient system and illuminated component states
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
          <linearGradient id="trace-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "var(--trace-color-1, #14b8a6)", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "var(--trace-color-2, #06b6d4)", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "var(--trace-color-3, #e879f9)", stopOpacity: 1 }} />
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: "var(--glow-color, #06b6d4)", stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: "var(--glow-color, #06b6d4)", stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        <style>{`
          :root {
            --bg-color: #020617;
            --trace-color-1: #14b8a6;
            --trace-color-2: #06b6d4;
            --trace-color-3: #e879f9;
            --component-bg: #0f172a;
            --component-stroke: #1e293b;
            --component-lit-bg: #06b6d4;
            --component-lit-stroke: #22d3ee;
            --glow-color: #06b6d4;
          }
          .trace {
            fill: none;
            stroke: url(#trace-gradient);
            stroke-linecap: round;
            stroke-linejoin: round;
            opacity: 0.6;
          }
          .trace.thick { stroke-width: 4; }
          .trace.med { stroke-width: 2.5; }
          .trace.fine { stroke-width: 1.5; }
          .illuminate-target {
            fill: var(--component-bg);
            stroke: var(--component-stroke);
            stroke-width: 2;
          }
          .illuminate-target.lit {
            fill: var(--component-lit-bg);
            stroke: var(--component-lit-stroke);
            filter: url(#glow);
          }
        `}</style>

        <rect width="2800" height="1800" fill="var(--bg-color)" />

        {/* Horizontal Bus Lines */}
        <g id="bus-horizontal">
          <path className="trace thick" d="M -100,200 L 2900,200" pathLength="1000" />
          <path className="trace thick" d="M -100,235 L 2900,235" pathLength="1000" />
          <path className="trace thick" d="M -100,270 L 2900,270" pathLength="1000" />
          <path className="trace thick" d="M -100,305 L 2900,305" pathLength="1000" />
          <path className="trace thick" d="M -100,340 L 2900,340" pathLength="1000" />
          <path className="trace thick" d="M -100,375 L 2900,375" pathLength="1000" />
          <path className="trace thick" d="M -100,410 L 2900,410" pathLength="1000" />
          <path className="trace thick" d="M -100,445 L 2900,445" pathLength="1000" />
          <path className="trace thick" d="M -100,480 L 2900,480" pathLength="1000" />
          <path className="trace thick" d="M -100,515 L 2900,515" pathLength="1000" />

          <path className="trace thick" d="M -100,750 L 2900,750" pathLength="1000" />
          <path className="trace thick" d="M -100,785 L 2900,785" pathLength="1000" />
          <path className="trace thick" d="M -100,820 L 2900,820" pathLength="1000" />
          <path className="trace thick" d="M -100,855 L 2900,855" pathLength="1000" />
          <path className="trace thick" d="M -100,890 L 2900,890" pathLength="1000" />
          <path className="trace thick" d="M -100,925 L 2900,925" pathLength="1000" />
          <path className="trace thick" d="M -100,960 L 2900,960" pathLength="1000" />
          <path className="trace thick" d="M -100,995 L 2900,995" pathLength="1000" />
          <path className="trace thick" d="M -100,1030 L 2900,1030" pathLength="1000" />
          <path className="trace thick" d="M -100,1065 L 2900,1065" pathLength="1000" />

          <path className="trace thick" d="M -100,1285 L 2900,1285" pathLength="1000" />
          <path className="trace thick" d="M -100,1320 L 2900,1320" pathLength="1000" />
          <path className="trace thick" d="M -100,1355 L 2900,1355" pathLength="1000" />
          <path className="trace thick" d="M -100,1390 L 2900,1390" pathLength="1000" />
          <path className="trace thick" d="M -100,1425 L 2900,1425" pathLength="1000" />
          <path className="trace thick" d="M -100,1460 L 2900,1460" pathLength="1000" />
          <path className="trace thick" d="M -100,1495 L 2900,1495" pathLength="1000" />
          <path className="trace thick" d="M -100,1530 L 2900,1530" pathLength="1000" />
          <path className="trace thick" d="M -100,1565 L 2900,1565" pathLength="1000" />
          <path className="trace thick" d="M -100,1600 L 2900,1600" pathLength="1000" />
        </g>

        {/* Vertical Bus Lines */}
        <g id="bus-vertical">
          <path className="trace thick" d="M 300,-100 L 300,1900" pathLength="1000" />
          <path className="trace thick" d="M 345,-100 L 345,1900" pathLength="1000" />
          <path className="trace thick" d="M 390,-100 L 390,1900" pathLength="1000" />
          <path className="trace thick" d="M 435,-100 L 435,1900" pathLength="1000" />
          <path className="trace thick" d="M 480,-100 L 480,1900" pathLength="1000" />
          <path className="trace thick" d="M 525,-100 L 525,1900" pathLength="1000" />
          <path className="trace thick" d="M 570,-100 L 570,1900" pathLength="1000" />
          <path className="trace thick" d="M 615,-100 L 615,1900" pathLength="1000" />

          <path className="trace thick" d="M 2185,-100 L 2185,1900" pathLength="1000" />
          <path className="trace thick" d="M 2230,-100 L 2230,1900" pathLength="1000" />
          <path className="trace thick" d="M 2275,-100 L 2275,1900" pathLength="1000" />
          <path className="trace thick" d="M 2320,-100 L 2320,1900" pathLength="1000" />
          <path className="trace thick" d="M 2365,-100 L 2365,1900" pathLength="1000" />
          <path className="trace thick" d="M 2410,-100 L 2410,1900" pathLength="1000" />
          <path className="trace thick" d="M 2455,-100 L 2455,1900" pathLength="1000" />
          <path className="trace thick" d="M 2500,-100 L 2500,1900" pathLength="1000" />

          <path className="trace thick" d="M 1310,-100 L 1310,1900" pathLength="1000" />
          <path className="trace thick" d="M 1355,-100 L 1355,1900" pathLength="1000" />
          <path className="trace thick" d="M 1400,-100 L 1400,1900" pathLength="1000" />
          <path className="trace thick" d="M 1445,-100 L 1445,1900" pathLength="1000" />
          <path className="trace thick" d="M 1490,-100 L 1490,1900" pathLength="1000" />
        </g>

        {/* Diagonal Bus Lines */}
        <g id="bus-diagonal">
          <path className="trace med" d="M 700,100 L 1200,600" pathLength="1000" />
          <path className="trace med" d="M 750,100 L 1250,600" pathLength="1000" />
          <path className="trace med" d="M 800,100 L 1300,600" pathLength="1000" />
          <path className="trace med" d="M 850,100 L 1350,600" pathLength="1000" />
          <path className="trace med" d="M 900,100 L 1400,600" pathLength="1000" />
          <path className="trace med" d="M 950,100 L 1450,600" pathLength="1000" />

          <path className="trace med" d="M 2100,100 L 1600,600" pathLength="1000" />
          <path className="trace med" d="M 2050,100 L 1550,600" pathLength="1000" />
          <path className="trace med" d="M 2000,100 L 1500,600" pathLength="1000" />
          <path className="trace med" d="M 1950,100 L 1450,600" pathLength="1000" />
          <path className="trace med" d="M 1900,100 L 1400,600" pathLength="1000" />
          <path className="trace med" d="M 1850,100 L 1350,600" pathLength="1000" />

          <path className="trace med" d="M 700,1700 L 1200,1200" pathLength="1000" />
          <path className="trace med" d="M 750,1700 L 1250,1200" pathLength="1000" />
          <path className="trace med" d="M 800,1700 L 1300,1200" pathLength="1000" />
          <path className="trace med" d="M 850,1700 L 1350,1200" pathLength="1000" />
          <path className="trace med" d="M 900,1700 L 1400,1200" pathLength="1000" />
          <path className="trace med" d="M 950,1700 L 1450,1200" pathLength="1000" />

          <path className="trace med" d="M 2100,1700 L 1600,1200" pathLength="1000" />
          <path className="trace med" d="M 2050,1700 L 1550,1200" pathLength="1000" />
          <path className="trace med" d="M 2000,1700 L 1500,1200" pathLength="1000" />
          <path className="trace med" d="M 1950,1700 L 1450,1200" pathLength="1000" />
          <path className="trace med" d="M 1900,1700 L 1400,1200" pathLength="1000" />
          <path className="trace med" d="M 1850,1700 L 1350,1200" pathLength="1000" />
        </g>

        {/* Branch Connections */}
        <g id="branches">
          <path className="trace med" d="M 300,200 L 300,550 L 1000,550" pathLength="1000" />
          <path className="trace med" d="M 345,235 L 345,580 L 1000,580" pathLength="1000" />
          <path className="trace med" d="M 390,270 L 390,610 L 1000,610" pathLength="1000" />
          <path className="trace med" d="M 435,305 L 435,640 L 1000,640" pathLength="1000" />
          <path className="trace med" d="M 480,340 L 480,670 L 1000,670" pathLength="1000" />
          <path className="trace med" d="M 525,375 L 525,700 L 1000,700" pathLength="1000" />

          <path className="trace med" d="M 2500,200 L 2500,550 L 1800,550" pathLength="1000" />
          <path className="trace med" d="M 2455,235 L 2455,580 L 1800,580" pathLength="1000" />
          <path className="trace med" d="M 2410,270 L 2410,610 L 1800,610" pathLength="1000" />
          <path className="trace med" d="M 2365,305 L 2365,640 L 1800,640" pathLength="1000" />
          <path className="trace med" d="M 2320,340 L 2320,670 L 1800,670" pathLength="1000" />
          <path className="trace med" d="M 2275,375 L 2275,700 L 1800,700" pathLength="1000" />

          <path className="trace med" d="M 300,750 L 500,750 L 500,1100 L 1000,1100" pathLength="1000" />
          <path className="trace med" d="M 345,785 L 530,785 L 530,1130 L 1000,1130" pathLength="1000" />
          <path className="trace med" d="M 390,820 L 560,820 L 560,1160 L 1000,1160" pathLength="1000" />
          <path className="trace med" d="M 435,855 L 590,855 L 590,1190 L 1000,1190" pathLength="1000" />
          <path className="trace med" d="M 480,890 L 620,890 L 620,1220 L 1000,1220" pathLength="1000" />

          <path className="trace med" d="M 2500,750 L 2300,750 L 2300,1100 L 1800,1100" pathLength="1000" />
          <path className="trace med" d="M 2455,785 L 2270,785 L 2270,1130 L 1800,1130" pathLength="1000" />
          <path className="trace med" d="M 2410,820 L 2240,820 L 2240,1160 L 1800,1160" pathLength="1000" />
          <path className="trace med" d="M 2365,855 L 2210,855 L 2210,1190 L 1800,1190" pathLength="1000" />
          <path className="trace med" d="M 2320,890 L 2180,890 L 2180,1220 L 1800,1220" pathLength="1000" />

          <path className="trace med" d="M 300,1285 L 300,1150 L 1000,1150" pathLength="1000" />
          <path className="trace med" d="M 345,1320 L 345,1180 L 1000,1180" pathLength="1000" />
          <path className="trace med" d="M 390,1355 L 390,1210 L 1000,1210" pathLength="1000" />
          <path className="trace med" d="M 435,1390 L 435,1240 L 1000,1240" pathLength="1000" />
          <path className="trace med" d="M 480,1425 L 480,1270 L 1000,1270" pathLength="1000" />

          <path className="trace med" d="M 2500,1285 L 2500,1150 L 1800,1150" pathLength="1000" />
          <path className="trace med" d="M 2455,1320 L 2455,1180 L 1800,1180" pathLength="1000" />
          <path className="trace med" d="M 2410,1355 L 2410,1210 L 1800,1210" pathLength="1000" />
          <path className="trace med" d="M 2365,1390 L 2365,1240 L 1800,1240" pathLength="1000" />
          <path className="trace med" d="M 2320,1425 L 2320,1270 L 1800,1270" pathLength="1000" />

          <path className="trace fine" d="M 1310,550 L 1310,720" pathLength="1000" />
          <path className="trace fine" d="M 1355,550 L 1355,720" pathLength="1000" />
          <path className="trace fine" d="M 1400,550 L 1400,720" pathLength="1000" />
          <path className="trace fine" d="M 1445,550 L 1445,720" pathLength="1000" />
          <path className="trace fine" d="M 1490,550 L 1490,720" pathLength="1000" />

          <path className="trace fine" d="M 1310,1080 L 1310,1250" pathLength="1000" />
          <path className="trace fine" d="M 1355,1080 L 1355,1250" pathLength="1000" />
          <path className="trace fine" d="M 1400,1080 L 1400,1250" pathLength="1000" />
          <path className="trace fine" d="M 1445,1080 L 1445,1250" pathLength="1000" />
          <path className="trace fine" d="M 1490,1080 L 1490,1250" pathLength="1000" />
        </g>

        {/* Micro Traces */}
        <g id="micro-traces">
          <path className="trace fine" d="M 1000,550 L 1150,550 L 1150,720" pathLength="1000" />
          <path className="trace fine" d="M 1000,580 L 1170,580 L 1170,720" pathLength="1000" />
          <path className="trace fine" d="M 1000,610 L 1190,610 L 1190,720" pathLength="1000" />
          <path className="trace fine" d="M 1000,640 L 1210,640 L 1210,720" pathLength="1000" />
          <path className="trace fine" d="M 1000,670 L 1230,670 L 1230,720" pathLength="1000" />
          <path className="trace fine" d="M 1000,700 L 1250,700 L 1250,720" pathLength="1000" />

          <path className="trace fine" d="M 1800,550 L 1650,550 L 1650,720" pathLength="1000" />
          <path className="trace fine" d="M 1800,580 L 1630,580 L 1630,720" pathLength="1000" />
          <path className="trace fine" d="M 1800,610 L 1610,610 L 1610,720" pathLength="1000" />
          <path className="trace fine" d="M 1800,640 L 1590,640 L 1590,720" pathLength="1000" />
          <path className="trace fine" d="M 1800,670 L 1570,670 L 1570,720" pathLength="1000" />
          <path className="trace fine" d="M 1800,700 L 1550,700 L 1550,720" pathLength="1000" />

          <path className="trace fine" d="M 1000,1100 L 1150,1100 L 1150,1080" pathLength="1000" />
          <path className="trace fine" d="M 1000,1130 L 1170,1130 L 1170,1080" pathLength="1000" />
          <path className="trace fine" d="M 1000,1160 L 1190,1160 L 1190,1080" pathLength="1000" />
          <path className="trace fine" d="M 1000,1190 L 1210,1190 L 1210,1080" pathLength="1000" />
          <path className="trace fine" d="M 1000,1220 L 1230,1220 L 1230,1080" pathLength="1000" />

          <path className="trace fine" d="M 1800,1100 L 1650,1100 L 1650,1080" pathLength="1000" />
          <path className="trace fine" d="M 1800,1130 L 1630,1130 L 1630,1080" pathLength="1000" />
          <path className="trace fine" d="M 1800,1160 L 1610,1160 L 1610,1080" pathLength="1000" />
          <path className="trace fine" d="M 1800,1190 L 1590,1190 L 1590,1080" pathLength="1000" />
          <path className="trace fine" d="M 1800,1220 L 1570,1220 L 1570,1080" pathLength="1000" />
        </g>

        {/* Main CPU Chip */}
        <rect id="cpu" className="illuminate-target" x="1250" y="720" width="300" height="300" rx="8" />

        {/* Chipset */}
        <rect id="chipset" className="illuminate-target" x="1800" y="1350" width="180" height="180" rx="6" />

        {/* VRM Components - Left */}
        <g id="vrm-left">
          <rect className="illuminate-target" x="180" y="550" width="80" height="60" rx="4" />
          <rect className="illuminate-target" x="180" y="640" width="80" height="60" rx="4" />
          <rect className="illuminate-target" x="180" y="730" width="80" height="60" rx="4" />
          <rect className="illuminate-target" x="180" y="820" width="80" height="60" rx="4" />
        </g>

        {/* VRM Components - Right */}
        <g id="vrm-right">
          <rect className="illuminate-target" x="2540" y="550" width="80" height="60" rx="4" />
          <rect className="illuminate-target" x="2540" y="640" width="80" height="60" rx="4" />
          <rect className="illuminate-target" x="2540" y="730" width="80" height="60" rx="4" />
          <rect className="illuminate-target" x="2540" y="820" width="80" height="60" rx="4" />
        </g>

        {/* DIMM Memory Slots */}
        <g id="dimm-slots">
          <rect className="illuminate-target" x="750" y="1380" width="50" height="200" rx="3" />
          <rect className="illuminate-target" x="830" y="1380" width="50" height="200" rx="3" />
          <rect className="illuminate-target" x="910" y="1380" width="50" height="200" rx="3" />
          <rect className="illuminate-target" x="990" y="1380" width="50" height="200" rx="3" />
          <rect className="illuminate-target" x="1070" y="1380" width="50" height="200" rx="3" />
          <rect className="illuminate-target" x="1150" y="1380" width="50" height="200" rx="3" />
        </g>

        {/* Main Trace Path */}
        <path
          id="trace-main"
          className="trace thick"
          d="M -100,200 L 300,200 L 300,550 L 700,550 L 1000,550 L 1150,550 L 1150,720 L 1250,720 L 1250,890 L 1310,890 L 1310,1080 L 1400,1080 L 1400,1250 L 1800,1250 L 1800,1350 L 2000,1350 L 2000,1530 L 2900,1530 L 2900,750 L 2500,750 L 2500,550 L 2100,550 L 1800,550 L 1650,550 L 1650,720 L 1550,720 L 1550,890 L 1490,890 L 1490,1080 L 1400,1080 L 1150,1080 L 1000,1080 L 750,1080 L 500,1080 L 300,1080 L 300,1285 L -100,1285"
          pathLength="1000"
        />

        {/* Tracer Paths (for future animation) */}
        <g id="tracer-paths" opacity="0">
          <path
            d="M -100,200 L 300,200 L 300,550 L 700,550 L 1000,550 L 1150,550 L 1150,720 L 1250,720 L 1250,890 L 1310,890 L 1310,1080 L 1400,1080 L 1400,1250 L 1800,1250 L 1800,1350 L 2000,1350 L 2000,1530 L 2900,1530 L 2900,750 L 2500,750 L 2500,550 L 2100,550 L 1800,550 L 1650,550 L 1650,720 L 1550,720 L 1550,890 L 1490,890 L 1490,1080 L 1400,1080 L 1150,1080 L 1000,1080 L 750,1080 L 500,1080 L 300,1080 L 300,1285 L -100,1285"
            stroke="transparent"
            fill="none"
            strokeWidth="4"
            pathLength="1000"
          />

          <path id="trace-bus-h-1" d="M -100,235 L 2900,235" stroke="transparent" fill="none" strokeWidth="4" pathLength="1000" />
          <path id="trace-bus-h-2" d="M -100,270 L 2900,270" stroke="transparent" fill="none" strokeWidth="4" pathLength="1000" />
          <path id="trace-bus-h-3" d="M -100,305 L 2900,305" stroke="transparent" fill="none" strokeWidth="4" pathLength="1000" />
          <path id="trace-bus-h-4" d="M -100,340 L 2900,340" stroke="transparent" fill="none" strokeWidth="4" pathLength="1000" />
          <path id="trace-bus-h-5" d="M -100,785 L 2900,785" stroke="transparent" fill="none" strokeWidth="4" pathLength="1000" />
          <path id="trace-bus-h-6" d="M -100,820 L 2900,820" stroke="transparent" fill="none" strokeWidth="4" pathLength="1000" />
          <path id="trace-bus-h-7" d="M -100,890 L 2900,890" stroke="transparent" fill="none" strokeWidth="4" pathLength="1000" />
          <path id="trace-bus-h-8" d="M -100,925 L 2900,925" stroke="transparent" fill="none" strokeWidth="4" pathLength="1000" />

          <path id="trace-bus-v-1" d="M 345,-100 L 345,1900" stroke="transparent" fill="none" strokeWidth="4" pathLength="1000" />
          <path id="trace-bus-v-2" d="M 390,-100 L 390,1900" stroke="transparent" fill="none" strokeWidth="4" pathLength="1000" />
          <path id="trace-bus-v-3" d="M 435,-100 L 435,1900" stroke="transparent" fill="none" strokeWidth="4" pathLength="1000" />
          <path id="trace-bus-v-4" d="M 480,-100 L 480,1900" stroke="transparent" fill="none" strokeWidth="4" pathLength="1000" />
          <path id="trace-bus-v-5" d="M 2230,-100 L 2230,1900" stroke="transparent" fill="none" strokeWidth="4" pathLength="1000" />
          <path id="trace-bus-v-6" d="M 2275,-100 L 2275,1900" stroke="transparent" fill="none" strokeWidth="4" pathLength="1000" />
          <path id="trace-bus-v-7" d="M 2320,-100 L 2320,1900" stroke="transparent" fill="none" strokeWidth="4" pathLength="1000" />
          <path id="trace-bus-v-8" d="M 2365,-100 L 2365,1900" stroke="transparent" fill="none" strokeWidth="4" pathLength="1000" />

          <path id="trace-branch-1" d="M 300,200 L 300,550 L 1000,550" stroke="transparent" fill="none" strokeWidth="2.5" pathLength="1000" />
          <path id="trace-branch-2" d="M 2500,200 L 2500,550 L 1800,550" stroke="transparent" fill="none" strokeWidth="2.5" pathLength="1000" />
          <path id="trace-branch-3" d="M 300,750 L 500,750 L 500,1100 L 1000,1100" stroke="transparent" fill="none" strokeWidth="2.5" pathLength="1000" />
          <path id="trace-branch-4" d="M 2500,750 L 2300,750 L 2300,1100 L 1800,1100" stroke="transparent" fill="none" strokeWidth="2.5" pathLength="1000" />
          <path id="trace-branch-5" d="M 345,235 L 345,580 L 1000,580" stroke="transparent" fill="none" strokeWidth="2.5" pathLength="1000" />
          <path id="trace-branch-6" d="M 2455,235 L 2455,580 L 1800,580" stroke="transparent" fill="none" strokeWidth="2.5" pathLength="1000" />
        </g>
      </svg>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(PCBTraceSVG);
