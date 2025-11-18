"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AlternatingFadeProps {
  children: ReactNode;
  index: number;
  delay?: number;
  stagger?: boolean;
}

export default function AlternatingFade({
  children,
  index,
  delay = 0,
  stagger = false,
}: AlternatingFadeProps) {
  const isEven = index % 2 === 0;

  // Direction alternates based on section
  const direction = {
    x: isEven ? -60 : 60,
  };

  // Stagger children if requested
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger ? 0.1 : 0,
        delayChildren: stagger ? delay : 0,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: direction.x,
      rotateY: isEven ? -5 : 5,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        delay: stagger ? 0 : delay,
      },
    },
  };

  if (stagger && Array.isArray(children)) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
}

// Child component for staggered animations
export function AlternatingFadeItem({ children }: { children: ReactNode }) {
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return <motion.div variants={itemVariants}>{children}</motion.div>;
}
