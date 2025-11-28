"use client";

import { useEffect, useRef } from "react";

interface CodeRainProps {
  intensity?: "low" | "medium" | "high";
  speed?: number;
}

export default function CodeRain({ intensity = "medium", speed = 1 }: CodeRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Characters to use - hex, binary, and security-themed
    const chars = "0123456789ABCDEFabcdef01ⓧⓥⓛⓝ🔒🔐⚡";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Drops array - one per column
    const drops: number[] = Array(columns).fill(0);

    // Column speeds - varied for more organic feel
    const speeds: number[] = Array(columns)
      .fill(0)
      .map(() => Math.random() * speed + 0.5);

    // Intensity settings
    const intensitySettings = {
      low: { opacity: 0.15, frequency: 0.95 },
      medium: { opacity: 0.25, frequency: 0.92 },
      high: { opacity: 0.35, frequency: 0.88 },
    };

    const settings = intensitySettings[intensity];

    const draw = () => {
      // Fade effect
      ctx.fillStyle = `rgba(15, 15, 15, ${settings.opacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw characters
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];

        // Color - sage green with some variation
        const brightness = Math.random() * 0.5 + 0.5;
        ctx.fillStyle = `rgba(166, 195, 167, ${brightness})`;

        // Draw the character
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        // Reset drop to top randomly
        if (y > canvas.height && Math.random() > settings.frequency) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i] += speeds[i] * speed;
      }
    };

    // Animation loop
    const interval = setInterval(draw, 33); // ~30fps

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [intensity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.3 }}
    />
  );
}
