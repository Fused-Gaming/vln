"use client";

import React, { useEffect, useRef } from 'react';

// Type definitions (moved outside component to avoid hoisting issues)
interface TracePath {
  points: { x: number; y: number }[];
  progress: number;
  speed: number;
  width: number;
  color: string;
  pulseIntensity: number;
}

interface ComponentNode {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'chip' | 'capacitor' | 'resistor';
  pulsePhase: number;
}

/**
 * Futuristic IC Board Background Animation
 * Performance-optimized canvas-based circuit board with data bus traces
 * Simulates electrical signals traveling through IC pathways
 */
const ICBoardBackground = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const tracePathsRef = useRef<TracePath[]>([]);
  const componentsRef = useRef<ComponentNode[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // VLN sage color with variations
    const sageRgb = [134, 217, 147]; // #86d993
    const blueRgb = [125, 211, 252]; // #7dd3fc
    const purpleRgb = [192, 132, 252]; // #c084fc

    // Initialize IC circuit layout
    const initializeCircuit = () => {
      const traces: TracePath[] = [];
      const components: ComponentNode[] = [];

      // Create grid for component placement
      const gridSize = 180;
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);

      // Place IC components (chips, capacitors, resistors)
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (Math.random() > 0.7) { // 30% chance of component
            const x = col * gridSize + gridSize / 2;
            const y = row * gridSize + gridSize / 2;

            const componentTypes: ('chip' | 'capacitor' | 'resistor')[] = ['chip', 'capacitor', 'resistor'];
            const type = componentTypes[Math.floor(Math.random() * componentTypes.length)];

            components.push({
              x,
              y,
              width: type === 'chip' ? 40 : 20,
              height: type === 'chip' ? 40 : 12,
              type,
              pulsePhase: Math.random() * Math.PI * 2,
            });
          }
        }
      }

      // Create horizontal data bus traces (IC pathways)
      const numHorizontalBuses = Math.floor(canvas.height / 120);
      for (let i = 0; i < numHorizontalBuses; i++) {
        const y = (i + 1) * 120 + (Math.random() * 40 - 20);
        const points = [
          { x: 0, y },
          { x: canvas.width, y },
        ];

        traces.push({
          points,
          progress: Math.random(),
          speed: 0.0005 + Math.random() * 0.001,
          width: 2,
          color: i % 3 === 0 ? 'sage' : i % 3 === 1 ? 'blue' : 'purple',
          pulseIntensity: 0.3 + Math.random() * 0.4,
        });
      }

      // Create vertical traces connecting components
      const numVerticalTraces = Math.floor(canvas.width / 150);
      for (let i = 0; i < numVerticalTraces; i++) {
        const x = (i + 1) * 150 + (Math.random() * 40 - 20);
        const points = [
          { x, y: 0 },
          { x, y: canvas.height },
        ];

        traces.push({
          points,
          progress: Math.random(),
          speed: 0.0003 + Math.random() * 0.0008,
          width: 1.5,
          color: i % 3 === 0 ? 'sage' : i % 3 === 1 ? 'blue' : 'purple',
          pulseIntensity: 0.2 + Math.random() * 0.3,
        });
      }

      // Add some diagonal interconnects
      const numDiagonals = 5;
      for (let i = 0; i < numDiagonals; i++) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        const endX = Math.random() * canvas.width;
        const endY = Math.random() * canvas.height;

        traces.push({
          points: [
            { x: startX, y: startY },
            { x: endX, y: endY },
          ],
          progress: Math.random(),
          speed: 0.0004 + Math.random() * 0.0006,
          width: 1,
          color: ['sage', 'blue', 'purple'][Math.floor(Math.random() * 3)] as 'sage' | 'blue' | 'purple',
          pulseIntensity: 0.2 + Math.random() * 0.2,
        });
      }

      tracePathsRef.current = traces;
      componentsRef.current = components;
    };

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeCircuit();
    };
    resize();
    window.addEventListener('resize', resize);

    // Animation loop
    const animate = () => {
      // Clear with slight fade for trail effect
      ctx.fillStyle = 'rgba(10, 14, 15, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw static grid pattern (very subtle)
      ctx.strokeStyle = `rgba(${sageRgb[0]}, ${sageRgb[1]}, ${sageRgb[2]}, 0.03)`;
      ctx.lineWidth = 0.5;
      const gridSpacing = 60;
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

      // Draw IC components
      componentsRef.current.forEach(component => {
        component.pulsePhase += 0.015;
        const pulse = Math.sin(component.pulsePhase) * 0.3 + 0.7;

        ctx.save();
        ctx.translate(component.x, component.y);

        // Component body
        ctx.fillStyle = `rgba(${sageRgb[0]}, ${sageRgb[1]}, ${sageRgb[2]}, ${0.08 * pulse})`;
        ctx.strokeStyle = `rgba(${sageRgb[0]}, ${sageRgb[1]}, ${sageRgb[2]}, ${0.3 * pulse})`;
        ctx.lineWidth = 1;

        if (component.type === 'chip') {
          // Draw IC chip with pins
          ctx.fillRect(-component.width / 2, -component.height / 2, component.width, component.height);
          ctx.strokeRect(-component.width / 2, -component.height / 2, component.width, component.height);

          // Pins
          const pinCount = 8;
          for (let i = 0; i < pinCount; i++) {
            const pinY = -component.height / 2 + (component.height / (pinCount - 1)) * i;
            // Left pins
            ctx.fillRect(-component.width / 2 - 3, pinY - 1, 3, 2);
            // Right pins
            ctx.fillRect(component.width / 2, pinY - 1, 3, 2);
          }
        } else if (component.type === 'capacitor') {
          // Draw capacitor
          ctx.fillRect(-component.width / 2, -component.height / 2, component.width, component.height);
          ctx.strokeRect(-component.width / 2, -component.height / 2, component.width, component.height);
        } else {
          // Draw resistor
          ctx.strokeStyle = `rgba(${sageRgb[0]}, ${sageRgb[1]}, ${sageRgb[2]}, ${0.4 * pulse})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-component.width / 2, 0);
          ctx.lineTo(component.width / 2, 0);
          ctx.stroke();
        }

        ctx.restore();
      });

      // Draw animated trace paths (data bus signals)
      tracePathsRef.current.forEach(trace => {
        trace.progress += trace.speed;
        if (trace.progress > 1) trace.progress = 0;

        const colorRgb =
          trace.color === 'sage' ? sageRgb :
          trace.color === 'blue' ? blueRgb : purpleRgb;

        // Draw static trace line (very subtle)
        ctx.strokeStyle = `rgba(${colorRgb[0]}, ${colorRgb[1]}, ${colorRgb[2]}, 0.1)`;
        ctx.lineWidth = trace.width;
        ctx.beginPath();
        ctx.moveTo(trace.points[0].x, trace.points[0].y);
        for (let i = 1; i < trace.points.length; i++) {
          ctx.lineTo(trace.points[i].x, trace.points[i].y);
        }
        ctx.stroke();

        // Calculate current position along path
        const start = trace.points[0];
        const end = trace.points[trace.points.length - 1];
        const currentX = start.x + (end.x - start.x) * trace.progress;
        const currentY = start.y + (end.y - start.y) * trace.progress;

        // Draw moving light pulse (electrical signal)
        const gradient = ctx.createRadialGradient(
          currentX, currentY, 0,
          currentX, currentY, 20
        );
        gradient.addColorStop(0, `rgba(${colorRgb[0]}, ${colorRgb[1]}, ${colorRgb[2]}, ${trace.pulseIntensity})`);
        gradient.addColorStop(0.5, `rgba(${colorRgb[0]}, ${colorRgb[1]}, ${colorRgb[2]}, ${trace.pulseIntensity * 0.4})`);
        gradient.addColorStop(1, `rgba(${colorRgb[0]}, ${colorRgb[1]}, ${colorRgb[2]}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 20, 0, Math.PI * 2);
        ctx.fill();

        // Add a bright core to the pulse
        ctx.fillStyle = `rgba(${colorRgb[0]}, ${colorRgb[1]}, ${colorRgb[2]}, ${trace.pulseIntensity * 1.5})`;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
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
    <div className="fixed inset-0 pointer-events-none opacity-20">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default ICBoardBackground;
