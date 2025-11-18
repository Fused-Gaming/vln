"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-vln-sage origin-left z-50"
      style={{ scaleX }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 blur-sm bg-vln-sage opacity-50" />
    </motion.div>
  );
}
