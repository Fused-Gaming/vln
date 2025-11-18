"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import CircuitBoardSubtle from "@/components/vln/circuit-board-subtle";
import CircuitBoardModerate from "@/components/vln/circuit-board-moderate";
import CircuitBoardBold from "@/components/vln/circuit-board-bold";
import CodeRain from "@/components/vln/code-rain";
import FadeIn from "@/components/animations/fade-in";

type CircuitStyle = "subtle" | "moderate" | "bold";
type AnimationIntensity = "minimal" | "balanced" | "maximum";
type CodeRainOption = "none" | "hero" | "section";

export default function DemoPage() {
  const [circuitStyle, setCircuitStyle] = useState<CircuitStyle>("moderate");
  const [animationIntensity, setAnimationIntensity] = useState<AnimationIntensity>("balanced");
  const [codeRain, setCodeRain] = useState<CodeRainOption>("none");

  const CircuitComponent = {
    subtle: CircuitBoardSubtle,
    moderate: CircuitBoardModerate,
    bold: CircuitBoardBold,
  }[circuitStyle];

  const getCurrentDemo = () => {
    const circuitNum = { subtle: 1, moderate: 2, bold: 3 }[circuitStyle];
    const animNum = { minimal: 1, balanced: 2, maximum: 3 }[animationIntensity];
    return `${circuitNum}.${animNum}`;
  };

  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-vln-sage/20 backdrop-blur-md bg-vln-bg/80">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-vln-sage">VLN</span>
            <span className="text-sm text-vln-bluegray">Demo Showcase</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="px-4 py-2 border border-vln-sage/30 rounded-vln hover:border-vln-sage transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </nav>
      </header>

      {/* Control Panel */}
      <div className="fixed top-20 right-6 z-40 bg-vln-bg/90 backdrop-blur-md border border-vln-sage/20 rounded-vln p-6 max-w-sm">
        <h3 className="text-lg font-bold text-vln-sage mb-4">
          Demo Controls
          <span className="text-sm text-vln-bluegray ml-2 font-normal">
            {getCurrentDemo()}
          </span>
        </h3>

        {/* Circuit Style Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-vln-white">
            Circuit Board Style
          </label>
          <div className="space-y-2">
            {(["subtle", "moderate", "bold"] as CircuitStyle[]).map((style) => (
              <button
                key={style}
                onClick={() => setCircuitStyle(style)}
                className={`w-full px-4 py-2 rounded-vln text-left transition-all ${
                  circuitStyle === style
                    ? "bg-vln-sage text-vln-bg font-semibold"
                    : "bg-vln-bg border border-vln-sage/30 hover:border-vln-sage"
                }`}
              >
                {style === "subtle" && "1. Subtle - Light traces"}
                {style === "moderate" && "2. Moderate - Visible circuits"}
                {style === "bold" && "3. Bold - Dense network"}
              </button>
            ))}
          </div>
        </div>

        {/* Animation Intensity */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-vln-white">
            Animation Intensity
          </label>
          <div className="space-y-2">
            {(["minimal", "balanced", "maximum"] as AnimationIntensity[]).map((intensity) => (
              <button
                key={intensity}
                onClick={() => setAnimationIntensity(intensity)}
                className={`w-full px-4 py-2 rounded-vln text-left transition-all ${
                  animationIntensity === intensity
                    ? "bg-vln-sage text-vln-bg font-semibold"
                    : "bg-vln-bg border border-vln-sage/30 hover:border-vln-sage"
                }`}
              >
                {intensity === "minimal" && ".1 Minimal - Subtle fades"}
                {intensity === "balanced" && ".2 Balanced - Mixed effects"}
                {intensity === "maximum" && ".3 Maximum - All features"}
              </button>
            ))}
          </div>
        </div>

        {/* Code Rain Effect */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-vln-white">
            Code Rain Effect
          </label>
          <div className="space-y-2">
            {(["none", "hero", "section"] as CodeRainOption[]).map((option) => (
              <button
                key={option}
                onClick={() => setCodeRain(option)}
                className={`w-full px-4 py-2 rounded-vln text-left transition-all text-sm ${
                  codeRain === option
                    ? "bg-vln-sage text-vln-bg font-semibold"
                    : "bg-vln-bg border border-vln-sage/30 hover:border-vln-sage"
                }`}
              >
                {option === "none" && "None"}
                {option === "hero" && "Hero Background"}
                {option === "section" && "Section Accent"}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-vln-bluegray pt-4 border-t border-vln-sage/20">
          <p>Current: Demo {getCurrentDemo()}</p>
          <p className="mt-1">
            {circuitStyle.charAt(0).toUpperCase() + circuitStyle.slice(1)} ×{" "}
            {animationIntensity.charAt(0).toUpperCase() + animationIntensity.slice(1)}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-24">
        {/* Hero Section with Circuit Board */}
        <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${circuitStyle}-${codeRain}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <CircuitComponent />
              {codeRain === "hero" && <CodeRain intensity="medium" />}
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 container mx-auto px-6 text-center">
            <FadeIn intensity={animationIntensity} direction="up" delay={0.2}>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                VLN Demo
                <br />
                <span className="text-vln-sage">Showcase</span>
              </h1>
            </FadeIn>
            <FadeIn intensity={animationIntensity} direction="up" delay={0.4}>
              <p className="text-xl md:text-2xl text-vln-bluegray max-w-2xl mx-auto mb-8">
                Experience all circuit board styles and animation combinations
              </p>
            </FadeIn>
            <FadeIn intensity={animationIntensity} direction="up" delay={0.6}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: animationIntensity === "maximum" ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-vln-sage text-vln-bg rounded-vln font-semibold glow-lift"
                >
                  Test Interactive
                </motion.button>
                <motion.button
                  whileHover={{ scale: animationIntensity === "maximum" ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 border-2 border-vln-sage text-vln-sage rounded-vln font-semibold glow-lift"
                >
                  View Styles
                </motion.button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative container mx-auto px-6 py-24 border-t border-vln-sage/20">
          {codeRain === "section" && (
            <div className="absolute inset-0 overflow-hidden">
              <CodeRain intensity="low" />
            </div>
          )}

          <div className="relative z-10">
            <FadeIn intensity={animationIntensity} direction="up">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                Interactive <span className="text-vln-sage">Components</span>
              </h2>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Circuit Boards",
                  desc: "Three intensity levels from subtle to bold network visualization",
                },
                {
                  title: "Animations",
                  desc: "Minimal, balanced, or maximum animation effects for all interactions",
                },
                {
                  title: "Code Rain",
                  desc: "Optional Matrix-style effect for hero sections or accents",
                },
              ].map((feature, i) => (
                <FadeIn
                  key={i}
                  intensity={animationIntensity}
                  direction="up"
                  delay={0.2 * (i + 1)}
                >
                  <motion.div
                    whileHover={{
                      scale: animationIntensity === "minimal" ? 1.02 : 1.05,
                      y: animationIntensity === "maximum" ? -10 : -5,
                    }}
                    className="p-6 border border-vln-sage/20 rounded-vln glow-lift card-lift"
                  >
                    <h3 className="text-xl font-bold mb-4 text-vln-sage">{feature.title}</h3>
                    <p className="text-vln-bluegray">{feature.desc}</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="container mx-auto px-6 py-24 border-t border-vln-sage/20">
          <FadeIn intensity={animationIntensity} direction="up">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Demo <span className="text-vln-sage">Combinations</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { label: "Circuit Styles", value: "3" },
              { label: "Animation Levels", value: "3" },
              { label: "Total Combos", value: "9" },
            ].map((stat, i) => (
              <FadeIn
                key={i}
                intensity={animationIntensity}
                direction="up"
                delay={0.2 * (i + 1)}
              >
                <motion.div
                  whileHover={{ scale: animationIntensity === "maximum" ? 1.1 : 1.05 }}
                  className="text-center p-8 border border-vln-sage/20 rounded-vln glow-lift"
                >
                  <div className="text-5xl font-bold text-vln-sage mb-2">{stat.value}</div>
                  <div className="text-vln-bluegray">{stat.label}</div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Current Demo Info */}
        <section className="container mx-auto px-6 py-24 border-t border-vln-sage/20">
          <FadeIn intensity={animationIntensity} direction="up">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Current Demo: <span className="text-vln-sage">{getCurrentDemo()}</span>
              </h2>
              <div className="p-8 border border-vln-sage/20 rounded-vln bg-vln-sage/5">
                <p className="text-lg text-vln-bluegray mb-4">
                  <strong className="text-vln-white">Circuit Style:</strong>{" "}
                  {circuitStyle.charAt(0).toUpperCase() + circuitStyle.slice(1)}
                </p>
                <p className="text-lg text-vln-bluegray mb-4">
                  <strong className="text-vln-white">Animation Intensity:</strong>{" "}
                  {animationIntensity.charAt(0).toUpperCase() + animationIntensity.slice(1)}
                </p>
                <p className="text-lg text-vln-bluegray">
                  <strong className="text-vln-white">Code Rain:</strong>{" "}
                  {codeRain === "none" ? "Disabled" : codeRain === "hero" ? "Hero Background" : "Section Accent"}
                </p>
              </div>
              <p className="text-vln-bluegray">
                Use the control panel on the right to switch between different combinations
              </p>
            </div>
          </FadeIn>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-vln-sage/20 mt-24">
        <div className="container mx-auto px-6 py-12 text-center">
          <p className="text-vln-bluegray mb-4">
            VLN Demo Showcase - Testing all visual combinations
          </p>
          <Link href="/" className="text-vln-sage hover:text-vln-bluegray transition-colors">
            Return to Main Site →
          </Link>
        </div>
      </footer>
    </div>
  );
}
