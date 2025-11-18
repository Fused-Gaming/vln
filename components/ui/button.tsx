"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "font-semibold rounded-vln transition-all inline-flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-vln-sage text-vln-bg hover:shadow-vln-glow disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "border-2 border-vln-sage text-vln-sage hover:bg-vln-sage hover:text-vln-bg disabled:opacity-50 disabled:cursor-not-allowed",
    ghost: "text-vln-sage hover:bg-vln-sage/10 disabled:opacity-50 disabled:cursor-not-allowed",
    danger: "bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <motion.div
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
      {icon && !loading && <span>{icon}</span>}
      {children}
    </motion.button>
  );
}
