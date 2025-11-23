"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import CircuitBoardSubtle from "@/components/vln/circuit-board-subtle";
import CircuitBoardModerate from "@/components/vln/circuit-board-moderate";
import CircuitBoardBold from "@/components/vln/circuit-board-bold";
import CircuitBoardBoldRandomized from "@/components/vln/circuit-board-bold-randomized";
import PCBTraceAnimated from "@/components/vln/pcb-trace-animated";
import CodeRain from "@/components/vln/code-rain";
import { useAnimations } from "@/lib/animation-context";

interface PageSkeletonProps {
  children: ReactNode;
  circuitStyle?: "none" | "subtle" | "moderate" | "bold" | "bold-random" | "pcb-animated";
  codeRain?: boolean;
  codeRainIntensity?: "low" | "medium" | "high";
}

export default function PageSkeleton({
  children,
  circuitStyle = "moderate",
  codeRain = false,
  codeRainIntensity = "low",
}: PageSkeletonProps) {
  const { animationsEnabled } = useAnimations();

  const CircuitComponent = {
    none: null,
    subtle: CircuitBoardSubtle,
    moderate: CircuitBoardModerate,
    bold: CircuitBoardBold,
    "bold-random": CircuitBoardBoldRandomized,
    "pcb-animated": PCBTraceAnimated,
  }[circuitStyle];

  return (
    <div className="relative min-h-screen">
      {/* Circuit Board Background */}
      {CircuitComponent && animationsEnabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 pointer-events-none"
        >
          <CircuitComponent />
        </motion.div>
      )}

      {/* Code Rain Effect */}
      {codeRain && animationsEnabled && (
        <div className="fixed inset-0 pointer-events-none">
          <CodeRain intensity={codeRainIntensity} />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
