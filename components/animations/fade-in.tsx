"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  intensity?: "minimal" | "balanced" | "maximum";
}

export default function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  intensity = "balanced",
}: FadeInProps) {
  const distances = {
    minimal: 10,
    balanced: 30,
    maximum: 60,
  };

  const distance = distances[intensity];

  const directionOffsets = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  const initial = {
    opacity: 0,
    ...directionOffsets[direction],
  };

  const animate = {
    opacity: 1,
    x: 0,
    y: 0,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: intensity === "maximum" ? "easeOut" : "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
