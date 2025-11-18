"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollSectionProps {
  children: ReactNode;
  variant?: "default" | "alternate";
  index: number;
  className?: string;
}

export default function ScrollSection({
  children,
  variant = "default",
  index,
  className,
}: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth spring animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Determine if this is an even or odd section
  const isEven = index % 2 === 0;

  // Parallax effects based on section type
  const y = useTransform(smoothProgress, [0, 1], isEven ? [100, -100] : [-50, 50]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // Circuit board animation intensity based on scroll
  const circuitOpacity = useTransform(
    smoothProgress,
    [0, 0.3, 0.7, 1],
    isEven ? [0.2, 0.4, 0.4, 0.2] : [0.1, 0.15, 0.15, 0.1]
  );

  // Background overlay for contrast
  const overlayOpacity = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    isEven ? [0.05, 0, 0.05] : [0.15, 0.08, 0.15]
  );

  return (
    <motion.section
      ref={ref}
      className={cn("relative min-h-screen py-24", className)}
      style={{
        opacity: variant === "default" ? opacity : 1,
        scale: variant === "default" ? scale : 1,
      }}
    >
      {/* Animated background overlay for contrast */}
      <motion.div
        className="absolute inset-0 bg-vln-bg pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* Circuit intensity overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: circuitOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-vln-sage/5 to-transparent" />
      </motion.div>

      {/* Content with parallax */}
      <motion.div
        className="relative z-10"
        style={{
          y: variant === "default" ? y : 0,
        }}
      >
        {children}
      </motion.div>

      {/* Section divider with pulse effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${isEven ? '#a6c3a7' : '#aab7c8'}, transparent)`,
          opacity: smoothProgress,
        }}
      />
    </motion.section>
  );
}
