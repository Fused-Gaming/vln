"use client";

import React, { useEffect, useRef } from 'react';

// PCB Trace Animation Component
// High-performance canvas-based circuit board animation
// Uses native canvas API for better performance than Framer Motion

interface Trace {
  start: { x: number; y: number };
  end: { x: number; y: number };
  progress: number;
  speed: number;
  width: number;
}

interface Node {
  x: number;
  y: number;
  radius: number;
  pulsePhase: number;
  pulseSpeed: number;
}

const PCBTraceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const tracesRef = useRef<Trace[]>([]);
  const nodesRef = useRef<Node[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // VLN sage color
    const sageColor = '#86d993';
    const sageRgb = [134, 217, 147];

    // Create grid points
    const gridSpacing = 150;
    const gridPoints: { x: number; y: number }[] = [];

    for (let x = 0; x < canvas.width; x += gridSpacing) {
      for (let y = 0; y < canvas.height; y += gridSpacing) {
        gridPoints.push({ x, y });
      }
    }

    // Create traces (connections between points)
    const traces: Trace[] = [];
    const numTraces = Math.min(8, Math.floor(gridPoints.length / 4));

    for (let i = 0; i < numTraces; i++) {
      const startPoint = gridPoints[Math.floor(Math.random() * gridPoints.length)];
      const endPoint = gridPoints[Math.floor(Math.random() * gridPoints.length)];

      traces.push({
        start: startPoint,
        end: endPoint,
        progress: Math.random(),
        speed: 0.001 + Math.random() * 0.002,
        width: 1.5 + Math.random() * 0.5,
      });
    }

    // Create nodes (circuit junctions)
    const nodes: Node[] = [];
    const numNodes = Math.min(12, Math.floor(gridPoints.length / 6));

    for (let i = 0; i < numNodes; i++) {
      const point = gridPoints[Math.floor(Math.random() * gridPoints.length)];
      nodes.push({
        x: point.x,
        y: point.y,
        radius: 3,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    tracesRef.current = traces;
    nodesRef.current = nodes;

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 14, 15, 0.05)'; // Subtle fade for trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw static grid (very subtle)
      ctx.strokeStyle = `rgba(${sageRgb[0]}, ${sageRgb[1]}, ${sageRgb[2]}, 0.05)`;
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw animated traces
      tracesRef.current.forEach(trace => {
        trace.progress += trace.speed;
        if (trace.progress > 1) trace.progress = 0;

        const currentX = trace.start.x + (trace.end.x - trace.start.x) * trace.progress;
        const currentY = trace.start.y + (trace.end.y - trace.start.y) * trace.progress;

        // Draw trace line
        ctx.strokeStyle = `rgba(${sageRgb[0]}, ${sageRgb[1]}, ${sageRgb[2]}, 0.3)`;
        ctx.lineWidth = trace.width;
        ctx.beginPath();
        ctx.moveTo(trace.start.x, trace.start.y);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        // Draw moving light
        const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 15);
        gradient.addColorStop(0, `rgba(${sageRgb[0]}, ${sageRgb[1]}, ${sageRgb[2]}, 0.8)`);
        gradient.addColorStop(1, `rgba(${sageRgb[0]}, ${sageRgb[1]}, ${sageRgb[2]}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 15, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw pulsing nodes
      nodesRef.current.forEach(node => {
        node.pulsePhase += node.pulseSpeed;
        const pulse = Math.sin(node.pulsePhase) * 0.5 + 0.5;
        const opacity = 0.4 + pulse * 0.4;

        // Glow effect
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3);
        gradient.addColorStop(0, `rgba(${sageRgb[0]}, ${sageRgb[1]}, ${sageRgb[2]}, ${opacity})`);
        gradient.addColorStop(1, `rgba(${sageRgb[0]}, ${sageRgb[1]}, ${sageRgb[2]}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = sageColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none opacity-25">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default PCBTraceBackground;
