"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ReactNode, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { randomBetween } from "@/lib/animation-utils";

interface ScrollSectionRandomizedProps {
  children: ReactNode;
  variant?: "default" | "alternate";
  index: number;
  className?: string;
}

export default function ScrollSectionRandomized({
  children,
  variant = "default",
  index,
  className,
}: ScrollSectionRandomizedProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Randomized spring physics for more organic movement
  const springConfig = useMemo(() => ({
    stiffness: randomBetween(80, 120),
    damping: randomBetween(25, 35),
    restDelta: 0.001,
  }), []);

  // Smooth spring animation with randomized physics
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // Determine if this is an even or odd section
  const isEven = index % 2 === 0;

  // Randomized parallax intensity for each section
  const parallaxIntensity = useMemo(() => ({
    yStart: isEven ? randomBetween(80, 120) : randomBetween(-60, -40),
    yEnd: isEven ? randomBetween(-120, -80) : randomBetween(40, 60),
  }), [isEven]);

  // Parallax effects with randomized ranges
  const y = useTransform(
    smoothProgress,
    [0, 1],
    [parallaxIntensity.yStart, parallaxIntensity.yEnd]
  );

  // Randomized opacity transitions
  const opacityPoints = useMemo(() => [
    0,
    randomBetween(0.15, 0.25),
    randomBetween(0.75, 0.85),
    1
  ], []);

  const opacity = useTransform(
    smoothProgress,
    opacityPoints,
    [0, 1, 1, 0]
  );

  // Randomized scale animation
  const scaleRange = useMemo(() => [
    randomBetween(0.92, 0.97),
    1,
    randomBetween(0.92, 0.97)
  ], []);

  const scale = useTransform(smoothProgress, [0, 0.5, 1], scaleRange);

  // Circuit board animation intensity with randomized values
  const circuitIntensities = useMemo(() => ({
    even: [
      randomBetween(0.15, 0.25),
      randomBetween(0.35, 0.45),
      randomBetween(0.35, 0.45),
      randomBetween(0.15, 0.25)
    ],
    odd: [
      randomBetween(0.08, 0.12),
      randomBetween(0.12, 0.18),
      randomBetween(0.12, 0.18),
      randomBetween(0.08, 0.12)
    ]
  }), []);

  const circuitOpacity = useTransform(
    smoothProgress,
    [0, 0.3, 0.7, 1],
    isEven ? circuitIntensities.even : circuitIntensities.odd
  );

  // Background overlay for contrast with randomization
  const overlayIntensities = useMemo(() => ({
    even: [
      randomBetween(0.03, 0.07),
      0,
      randomBetween(0.03, 0.07)
    ],
    odd: [
      randomBetween(0.12, 0.18),
      randomBetween(0.06, 0.10),
      randomBetween(0.12, 0.18)
    ]
  }), []);

  const overlayOpacity = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    isEven ? overlayIntensities.even : overlayIntensities.odd
  );

  // Randomized rotation for subtle depth effect
  const rotation = useMemo(() => isEven ? randomBetween(-0.5, -0.2) : randomBetween(0.2, 0.5), [isEven]);
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [rotation, 0, rotation]);

  return (
    <motion.section
      ref={ref}
      className={cn("relative min-h-screen py-24", className)}
      style={{
        opacity: variant === "default" ? opacity : 1,
        scale: variant === "default" ? scale : 1,
        rotateX: variant === "default" ? rotateX : 0,
        transformPerspective: 1200,
      }}
    >
      {/* Animated background overlay for contrast */}
      <motion.div
        className="absolute inset-0 bg-vln-bg pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* Circuit intensity overlay with gradient variation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: circuitOpacity }}
      >
        <div className={cn(
          "absolute inset-0 bg-gradient-to-b from-transparent via-vln-sage/5 to-transparent",
          isEven ? "" : "bg-gradient-to-t"
        )} />
      </motion.div>

      {/* Content with parallax and randomized effects */}
      <motion.div
        className="relative z-10"
        style={{
          y: variant === "default" ? y : 0,
        }}
      >
        {children}
      </motion.div>

      {/* Section divider with pulse effect and randomized color */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${isEven ? '#86d993' : '#7dd3fc'}, transparent)`,
          opacity: smoothProgress,
        }}
      />
    </motion.section>
  );
}
