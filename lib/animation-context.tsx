"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AnimationContextType {
  animationsEnabled: boolean;
  toggleAnimations: () => void;
}

const AnimationContext = createContext<AnimationContextType>({
  animationsEnabled: true,
  toggleAnimations: () => {},
});

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("vln-animations-enabled");
    if (saved !== null) {
      setAnimationsEnabled(saved === "true");
    }
  }, []);

  const toggleAnimations = () => {
    setAnimationsEnabled((prev) => {
      const newValue = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("vln-animations-enabled", String(newValue));
      }
      return newValue;
    });
  };

  return (
    <AnimationContext.Provider value={{ animationsEnabled, toggleAnimations }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimations() {
  return useContext(AnimationContext);
}
