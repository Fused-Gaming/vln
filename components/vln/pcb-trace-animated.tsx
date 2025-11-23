"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import {
  randomCircuitTiming,
  randomParticleTiming,
  randomEasing,
  randomStagger,
  vlnColors
} from "@/lib/animation-utils";

// Enhanced PCB Trace with Animated Data Flow on Bus Lines
// Features randomized animations for organic, non-repetitive visual effects
function PCBTraceAnimated() {
  // Generate randomized timing for each bus line (very slow, calming effect)
  const horizontalBuses = useMemo(() =>
    [200, 235, 270, 305, 340, 375, 410, 445, 480, 515,
     750, 785, 820, 855, 890, 925, 960, 995, 1030, 1065,
     1285, 1320, 1355, 1390, 1425, 1460, 1495, 1530, 1565, 1600].map((y, i) => ({
      y,
      ...randomCircuitTiming(12), // 10-17 seconds
      stagger: randomStagger(i, 0.15),
    })), []
  );

  const verticalBuses = useMemo(() =>
    [300, 345, 390, 435, 480, 525, 570, 615,
     2185, 2230, 2275, 2320, 2365, 2410, 2455, 2500,
     1310, 1355, 1400, 1445, 1490].map((x, i) => ({
      x,
      ...randomCircuitTiming(14), // 11-20 seconds
      stagger: randomStagger(i, 0.18),
    })), []
  );

  // Generate randomized particles for data flow (very slow, subtle movement)
  const dataParticles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      path: i < 8 ? 'horizontal' : i < 16 ? 'vertical' : 'diagonal',
      ...randomParticleTiming(18), // 15-23 seconds for very slow particle flow
      color: i % 3 === 0 ? vlnColors.sage : i % 3 === 1 ? vlnColors.blue : vlnColors.purple,
      size: Math.random() * 2 + 2, // 2-4px
    })), []
  );

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-25">
      <svg
        viewBox="0 0 2800 1800"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Multi-color gradients for bus lines */}
          <linearGradient id="bus-gradient-sage" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: vlnColors.sage, stopOpacity: 0.3 }} />
            <stop offset="50%" style={{ stopColor: vlnColors.sageLight, stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: vlnColors.sage, stopOpacity: 0.3 }} />
          </linearGradient>

          <linearGradient id="bus-gradient-blue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: vlnColors.blue, stopOpacity: 0.3 }} />
            <stop offset="50%" style={{ stopColor: vlnColors.blueLight, stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: vlnColors.blue, stopOpacity: 0.3 }} />
          </linearGradient>

          <linearGradient id="bus-gradient-purple" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: vlnColors.purple, stopOpacity: 0.3 }} />
            <stop offset="50%" style={{ stopColor: vlnColors.purpleLight, stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: vlnColors.purple, stopOpacity: 0.3 }} />
          </linearGradient>

          {/* Glow filters for each color */}
          <filter id="glow-sage">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glow-blue">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glow-purple">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="2800" height="1800" fill="#0a0e0f" />

        {/* Animated Horizontal Bus Lines with pulsing effect */}
        <g id="bus-horizontal-animated">
          {horizontalBuses.map((bus, i) => {
            const gradient = i % 3 === 0 ? 'bus-gradient-sage' : i % 3 === 1 ? 'bus-gradient-blue' : 'bus-gradient-purple';
            const filter = i % 3 === 0 ? 'glow-sage' : i % 3 === 1 ? 'glow-blue' : 'glow-purple';

            return (
              <motion.line
                key={`h-bus-${i}`}
                x1="-100"
                y1={bus.y}
                x2="2900"
                y2={bus.y}
                stroke={`url(#${gradient})`}
                strokeWidth="5"
                strokeLinecap="round"
                filter={`url(#${filter})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: bus.duration,
                  delay: bus.delay + bus.stagger,
                  ease: randomEasing(),
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            );
          })}
        </g>

        {/* Animated Vertical Bus Lines with pulsing effect */}
        <g id="bus-vertical-animated">
          {verticalBuses.map((bus, i) => {
            const gradient = i % 3 === 0 ? 'bus-gradient-purple' : i % 3 === 1 ? 'bus-gradient-sage' : 'bus-gradient-blue';
            const filter = i % 3 === 0 ? 'glow-purple' : i % 3 === 1 ? 'glow-sage' : 'glow-blue';

            return (
              <motion.line
                key={`v-bus-${i}`}
                x1={bus.x}
                y1="-100"
                x2={bus.x}
                y2="1900"
                stroke={`url(#${gradient})`}
                strokeWidth="5"
                strokeLinecap="round"
                filter={`url(#${filter})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: bus.duration,
                  delay: bus.delay + bus.stagger,
                  ease: randomEasing(),
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            );
          })}
        </g>

        {/* Data flow particles on horizontal buses */}
        {dataParticles.filter(p => p.path === 'horizontal').map((particle) => {
          const busIndex = Math.floor(Math.random() * horizontalBuses.length);
          const y = horizontalBuses[busIndex].y;

          return (
            <motion.circle
              key={`h-particle-${particle.id}`}
              r={particle.size}
              fill={particle.color}
              filter="url(#glow-sage)"
              animate={{
                cx: [-100, 2900],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: "linear",
                repeat: Infinity,
              }}
              cy={y}
            />
          );
        })}

        {/* Data flow particles on vertical buses */}
        {dataParticles.filter(p => p.path === 'vertical').map((particle) => {
          const busIndex = Math.floor(Math.random() * verticalBuses.length);
          const x = verticalBuses[busIndex].x;

          return (
            <motion.circle
              key={`v-particle-${particle.id}`}
              r={particle.size}
              fill={particle.color}
              filter="url(#glow-blue)"
              animate={{
                cy: [-100, 1900],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: "linear",
                repeat: Infinity,
              }}
              cx={x}
            />
          );
        })}

        {/* Diagonal data flow particles */}
        {dataParticles.filter(p => p.path === 'diagonal').map((particle) => (
          <motion.circle
            key={`d-particle-${particle.id}`}
            r={particle.size}
            fill={particle.color}
            filter="url(#glow-purple)"
            animate={{
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <animateMotion
              dur={`${particle.duration}s`}
              repeatCount="indefinite"
              path="M 300,200 L 1400,900 L 2500,1600"
              begin={`${particle.delay}s`}
            />
          </motion.circle>
        ))}

        {/* Main component areas (static for contrast) */}
        <g id="components" opacity="0.4">
          {/* CPU */}
          <rect x="1250" y="720" width="300" height="300" rx="8" fill="#151a1c" stroke="#1f2527" strokeWidth="2" />

          {/* Chipset */}
          <rect x="1800" y="1350" width="180" height="180" rx="6" fill="#151a1c" stroke="#1f2527" strokeWidth="2" />

          {/* VRM Components - Left */}
          <rect x="180" y="550" width="80" height="60" rx="4" fill="#151a1c" stroke="#1f2527" strokeWidth="1.5" />
          <rect x="180" y="640" width="80" height="60" rx="4" fill="#151a1c" stroke="#1f2527" strokeWidth="1.5" />
          <rect x="180" y="730" width="80" height="60" rx="4" fill="#151a1c" stroke="#1f2527" strokeWidth="1.5" />
          <rect x="180" y="820" width="80" height="60" rx="4" fill="#151a1c" stroke="#1f2527" strokeWidth="1.5" />

          {/* VRM Components - Right */}
          <rect x="2540" y="550" width="80" height="60" rx="4" fill="#151a1c" stroke="#1f2527" strokeWidth="1.5" />
          <rect x="2540" y="640" width="80" height="60" rx="4" fill="#151a1c" stroke="#1f2527" strokeWidth="1.5" />
          <rect x="2540" y="730" width="80" height="60" rx="4" fill="#151a1c" stroke="#1f2527" strokeWidth="1.5" />
          <rect x="2540" y="820" width="80" height="60" rx="4" fill="#151a1c" stroke="#1f2527" strokeWidth="1.5" />

          {/* DIMM Memory Slots */}
          <rect x="750" y="1380" width="50" height="200" rx="3" fill="#151a1c" stroke="#1f2527" strokeWidth="1.5" />
          <rect x="830" y="1380" width="50" height="200" rx="3" fill="#151a1c" stroke="#1f2527" strokeWidth="1.5" />
          <rect x="910" y="1380" width="50" height="200" rx="3" fill="#151a1c" stroke="#1f2527" strokeWidth="1.5" />
          <rect x="990" y="1380" width="50" height="200" rx="3" fill="#151a1c" stroke="#1f2527" strokeWidth="1.5" />
          <rect x="1070" y="1380" width="50" height="200" rx="3" fill="#151a1c" stroke="#1f2527" strokeWidth="1.5" />
          <rect x="1150" y="1380" width="50" height="200" rx="3" fill="#151a1c" stroke="#1f2527" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(PCBTraceAnimated);
