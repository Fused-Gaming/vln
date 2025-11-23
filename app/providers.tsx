"use client";

import { AnimationProvider } from "@/lib/animation-context";
import { Analytics } from "@vercel/analytics/react";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AnimationProvider>
      {children}
      <Analytics />
    </AnimationProvider>
  );
}
