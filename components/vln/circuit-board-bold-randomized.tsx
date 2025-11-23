"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import {
  randomCircuitTiming,
  randomParticleTiming,
  randomEasing,
  randomOpacityRange,
  randomScaleRange,
  randomStagger,
  vlnColors
} from "@/lib/animation-utils";

export default function CircuitBoardBoldRandomized() {
  // Generate randomized timing for horizontal buses (very slow, calming effect)
  const horizontalBuses = useMemo(() =>
    [100, 250, 400, 550, 700, 850].map((y) => ({
      y,
      ...randomCircuitTiming(10), // 10-14 seconds
      easing: randomEasing(),
    })), []
  );

  // Generate randomized timing for vertical buses (very slow)
  const verticalBuses = useMemo(() =>
    [150, 350, 550, 750, 900].map((x) => ({
      x,
      ...randomCircuitTiming(12), // 12-17 seconds
      easing: randomEasing(),
    })), []
  );

  // Generate node positions and randomized animations
  const nodes = useMemo(() =>
    [100, 250, 400, 550, 700, 850].flatMap((y) =>
      [150, 350, 550, 750, 900].map((x, xi) => {
        const index = horizontalBuses.findIndex(h => h.y === y) * 5 + xi;
        return {
          x,
          y,
          opacityRange: randomOpacityRange(0.6),
          scaleRange: randomScaleRange(1),
          duration: 8 + Math.random() * 4, // 8-12 seconds for node pulses
          delay: randomStagger(index, 0.08),
          color: index % 3 === 0 ? vlnColors.sage : index % 3 === 1 ? vlnColors.blue : vlnColors.purple,
        };
      })
    ), []
  );

  // Generate randomized particle flows
  const mainParticles = useMemo(() =>
    [0, 0.3, 0.6, 0.9, 1.2, 1.5].map((baseDelay, i) => ({
      id: i,
      ...randomParticleTiming(18), // 15-23 seconds for very slow particle flow
      delay: baseDelay + Math.random() * 0.5,
      color: i % 2 === 0 ? vlnColors.blue : vlnColors.purple,
    })), []
  );

  const verticalParticles = useMemo(() =>
    [150, 350, 550, 750, 900].map((x, i) => ({
      x,
      ...randomParticleTiming(20), // 17-26 seconds for very slow vertical flow
      delay: i * 0.8 + Math.random() * 0.6,
      color: i % 2 === 0 ? vlnColors.sage : vlnColors.amber,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradient definitions for different colors */}
          <linearGradient id="lineGradientSage" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={vlnColors.sage} stopOpacity="0.7" />
            <stop offset="50%" stopColor={vlnColors.sageLight} stopOpacity="1" />
            <stop offset="100%" stopColor={vlnColors.sage} stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="lineGradientBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={vlnColors.blue} stopOpacity="0.7" />
            <stop offset="50%" stopColor={vlnColors.blueLight} stopOpacity="1" />
            <stop offset="100%" stopColor={vlnColors.blue} stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="lineGradientPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={vlnColors.purple} stopOpacity="0.7" />
            <stop offset="50%" stopColor={vlnColors.purpleLight} stopOpacity="1" />
            <stop offset="100%" stopColor={vlnColors.purple} stopOpacity="0.7" />
          </linearGradient>

          <filter id="glowBold">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="nodePulseSage">
            <stop offset="0%" stopColor={vlnColors.sage} stopOpacity="1" />
            <stop offset="100%" stopColor={vlnColors.sage} stopOpacity="0" />
          </radialGradient>

          <radialGradient id="nodePulseBlue">
            <stop offset="0%" stopColor={vlnColors.blue} stopOpacity="1" />
            <stop offset="100%" stopColor={vlnColors.blue} stopOpacity="0" />
          </radialGradient>

          <radialGradient id="nodePulsePurple">
            <stop offset="0%" stopColor={vlnColors.purple} stopOpacity="1" />
            <stop offset="100%" stopColor={vlnColors.purple} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Randomized horizontal buses */}
        {horizontalBuses.map((bus, i) => {
          const gradient = i % 3 === 0 ? 'lineGradientSage' : i % 3 === 1 ? 'lineGradientBlue' : 'lineGradientPurple';

          return (
            <motion.line
              key={`h-${i}`}
              x1="0"
              y1={bus.y}
              x2="1000"
              y2={bus.y}
              stroke={`url(#${gradient})`}
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{
                duration: bus.duration,
                ease: bus.easing,
                repeat: Infinity,
                repeatType: "loop",
                delay: bus.delay,
              }}
            />
          );
        })}

        {/* Randomized vertical buses */}
        {verticalBuses.map((bus, i) => {
          const gradient = i % 3 === 0 ? 'lineGradientPurple' : i % 3 === 1 ? 'lineGradientSage' : 'lineGradientBlue';

          return (
            <motion.line
              key={`v-${i}`}
              x1={bus.x}
              y1="0"
              x2={bus.x}
              y2="1000"
              stroke={`url(#${gradient})`}
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{
                duration: bus.duration,
                ease: bus.easing,
                repeat: Infinity,
                repeatType: "loop",
                delay: bus.delay,
              }}
            />
          );
        })}

        {/* Complex interconnects with randomized animations */}
        <motion.path
          d="M 0 100 L 150 100 L 150 250 L 350 250 L 350 400 L 550 400"
          stroke={vlnColors.sage}
          strokeWidth="2.5"
          fill="none"
          filter="url(#glowBold)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{
            duration: 12 + Math.random() * 4, // 12-16 seconds
            ease: randomEasing(),
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
        <motion.path
          d="M 550 400 L 750 400 L 750 550 L 900 550 L 900 700 L 1000 700"
          stroke={vlnColors.blue}
          strokeWidth="2.5"
          fill="none"
          filter="url(#glowBold)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{
            duration: 14 + Math.random() * 4, // 14-18 seconds
            ease: randomEasing(),
            repeat: Infinity,
            repeatType: "loop",
            delay: 1 + Math.random() * 0.5
          }}
        />

        {/* Randomized node network */}
        {nodes.map((node, i) => {
          const pulseGradient = node.color === vlnColors.sage ? 'nodePulseSage' :
                               node.color === vlnColors.blue ? 'nodePulseBlue' : 'nodePulsePurple';

          return (
            <motion.g key={`node-${i}`}>
              {/* Outer glow ring with randomized animation */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="12"
                fill={`url(#${pulseGradient})`}
                animate={{
                  opacity: [0, ...node.opacityRange],
                  scale: [0.8, ...node.scaleRange.map(s => s + 0.3)],
                }}
                transition={{
                  duration: node.duration,
                  repeat: Infinity,
                  ease: randomEasing(),
                  delay: node.delay,
                }}
              />
              {/* Main node with randomized pulsing */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="7"
                fill={node.color}
                filter="url(#glowBold)"
                animate={{
                  opacity: node.opacityRange,
                  scale: node.scaleRange,
                }}
                transition={{
                  duration: node.duration * 0.8,
                  repeat: Infinity,
                  ease: randomEasing(),
                  delay: node.delay,
                }}
              />
              {/* Center dot */}
              <circle cx={node.x} cy={node.y} r="3" fill="#0f0f0f" />
            </motion.g>
          );
        })}

        {/* Randomized data flow particles on main paths */}
        {mainParticles.map((particle) => (
          <motion.circle
            key={`particle-${particle.id}`}
            r="3.5"
            fill={particle.color}
            filter="url(#glowBold)"
            animate={{
              offsetDistance: ["0%", "100%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
              delay: particle.delay,
            }}
          >
            <animateMotion
              dur={`${particle.duration}s`}
              repeatCount="indefinite"
              begin={`${particle.delay}s`}
              path="M 0 100 L 150 100 L 150 250 L 350 250 L 350 400 L 550 400 L 750 400 L 750 550 L 900 550 L 900 700 L 1000 700"
            />
          </motion.circle>
        ))}

        {/* Randomized vertical particle flows */}
        {verticalParticles.map((particle, i) => (
          <motion.circle
            key={`v-particle-${i}`}
            cx={particle.x}
            r="3"
            fill={particle.color}
            filter="url(#glowBold)"
            animate={{
              cy: [0, 1000],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
              delay: particle.delay,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
