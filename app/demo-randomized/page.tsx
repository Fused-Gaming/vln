// import CircuitBoardBoldRandomized from "@/components/vln/circuit-board-bold-randomized";
import PCBTraceAnimated from "@/components/vln/pcb-trace-animated";
import CodeRain from "@/components/vln/code-rain";
import ScrollSectionRandomized from "@/components/animations/scroll-section-randomized";
import ScrollProgress from "@/components/animations/scroll-progress";
import AlternatingFade, { AlternatingFadeItem } from "@/components/animations/alternating-fade";
import Button from "@/components/ui/button";

export default function DemoRandomizedPage() {
  return (
    <div className="min-h-screen bg-vln-bg text-vln-white">
      {/* Progress bar */}
      <ScrollProgress />

      {/* Fixed animated backgrounds */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Choose one: PCB Trace (more detailed) or Circuit Board Bold */}
        <PCBTraceAnimated />
        {/* <CircuitBoardBoldRandomized /> */}
        <CodeRain intensity="medium" />
      </div>

      {/* Scrolling content */}
      <main className="relative z-10">
        {/* Section 0 - Hero (Even) */}
        <ScrollSectionRandomized index={0}>
          <div className="container mx-auto px-4">
            <AlternatingFade index={0}>
              <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-8">
                <h1 className="text-7xl font-bold text-gradient-rainbow">
                  Randomized Animation System
                </h1>
                <p className="text-2xl text-vln-gray max-w-3xl">
                  Every bus line, particle, and node has unique, randomized timing and movement.
                  No two animations repeat the same way.
                </p>
                <div className="flex gap-4">
                  <Button variant="primary" size="lg">
                    Explore Features
                  </Button>
                  <Button variant="secondary" size="lg">
                    View Source
                  </Button>
                </div>
              </div>
            </AlternatingFade>
          </div>
        </ScrollSectionRandomized>

        {/* Section 1 - Features (Odd) */}
        <ScrollSectionRandomized index={1}>
          <div className="container mx-auto px-4">
            <AlternatingFade index={1} stagger>
              <div className="min-h-screen flex flex-col justify-center space-y-12">
                <h2 className="text-5xl font-bold text-gradient-sage text-center">
                  Enhanced Circuit Board Buses
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                  <AlternatingFadeItem>
                    <div className="p-8 bg-vln-bg-light rounded-lg border border-vln-sage/20 glow-lift">
                      <div className="text-4xl mb-4">🎨</div>
                      <h3 className="text-2xl font-semibold text-vln-sage mb-3">
                        Multi-Color Buses
                      </h3>
                      <p className="text-vln-gray">
                        Horizontal and vertical bus lines alternate between sage, blue, and purple gradients
                      </p>
                    </div>
                  </AlternatingFadeItem>

                  <AlternatingFadeItem>
                    <div className="p-8 bg-vln-bg-light rounded-lg border border-vln-bluegray/20 glow-lift-blue">
                      <div className="text-4xl mb-4">⚡</div>
                      <h3 className="text-2xl font-semibold text-vln-bluegray mb-3">
                        Data Flow Particles
                      </h3>
                      <p className="text-vln-gray">
                        Watch data particles flow along bus lines with randomized speeds and colors
                      </p>
                    </div>
                  </AlternatingFadeItem>

                  <AlternatingFadeItem>
                    <div className="p-8 bg-vln-bg-light rounded-lg border border-vln-purple/20 glow-lift-purple">
                      <div className="text-4xl mb-4">🎯</div>
                      <h3 className="text-2xl font-semibold text-vln-purple mb-3">
                        Randomized Timing
                      </h3>
                      <p className="text-vln-gray">
                        Each animation has unique duration, delay, and easing for organic movement
                      </p>
                    </div>
                  </AlternatingFadeItem>
                </div>
              </div>
            </AlternatingFade>
          </div>
        </ScrollSectionRandomized>

        {/* Section 2 - Technical Details (Even) */}
        <ScrollSectionRandomized index={2}>
          <div className="container mx-auto px-4">
            <AlternatingFade index={2}>
              <div className="min-h-screen flex flex-col justify-center space-y-12">
                <h2 className="text-5xl font-bold text-gradient-blue text-center">
                  Technical Improvements
                </h2>

                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="p-6 bg-vln-bg-light border-l-4 border-vln-sage rounded-r-lg">
                    <h3 className="text-xl font-semibold text-vln-sage mb-2">
                      Randomized Animation Utilities
                    </h3>
                    <p className="text-vln-gray">
                      New <code className="text-vln-bluegray">lib/animation-utils.ts</code> provides functions for
                      generating random timings, easings, opacity ranges, and color selections
                    </p>
                  </div>

                  <div className="p-6 bg-vln-bg-light border-l-4 border-vln-bluegray rounded-r-lg">
                    <h3 className="text-xl font-semibold text-vln-bluegray mb-2">
                      Enhanced PCB Trace Component
                    </h3>
                    <p className="text-vln-gray">
                      <code className="text-vln-bluegray">components/vln/pcb-trace-animated.tsx</code> features
                      animated bus lines with pulsing effects and flowing data particles
                    </p>
                  </div>

                  <div className="p-6 bg-vln-bg-light border-l-4 border-vln-purple rounded-r-lg">
                    <h3 className="text-xl font-semibold text-vln-purple mb-2">
                      Organic Scroll Animations
                    </h3>
                    <p className="text-vln-gray">
                      <code className="text-vln-bluegray">components/animations/scroll-section-randomized.tsx</code> adds
                      randomized parallax, opacity, and rotation effects to each section
                    </p>
                  </div>

                  <div className="p-6 bg-vln-bg-light border-l-4 border-vln-amber rounded-r-lg">
                    <h3 className="text-xl font-semibold text-vln-amber mb-2">
                      Performance Optimized
                    </h3>
                    <p className="text-vln-gray">
                      All randomization happens once with <code className="text-vln-bluegray">useMemo</code>,
                      preventing recalculation on every render for smooth 60fps animations
                    </p>
                  </div>
                </div>
              </div>
            </AlternatingFade>
          </div>
        </ScrollSectionRandomized>

        {/* Section 3 - Usage Guide (Odd) */}
        <ScrollSectionRandomized index={3}>
          <div className="container mx-auto px-4">
            <AlternatingFade index={3}>
              <div className="min-h-screen flex flex-col justify-center space-y-12">
                <h2 className="text-5xl font-bold text-center text-gradient-rainbow">
                  How to Use
                </h2>

                <div className="max-w-3xl mx-auto space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-vln-sage">
                      1. Import the Components
                    </h3>
                    <pre className="bg-vln-bg-lighter p-4 rounded-lg overflow-x-auto text-sm border border-vln-sage/20">
                      <code className="text-vln-bluegray">{`import PCBTraceAnimated from "@/components/vln/pcb-trace-animated";
import CircuitBoardBoldRandomized from "@/components/vln/circuit-board-bold-randomized";
import ScrollSectionRandomized from "@/components/animations/scroll-section-randomized";`}</code>
                    </pre>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-vln-bluegray">
                      2. Add Background Animations
                    </h3>
                    <pre className="bg-vln-bg-lighter p-4 rounded-lg overflow-x-auto text-sm border border-vln-bluegray/20">
                      <code className="text-vln-sage">{`<div className="fixed inset-0 pointer-events-none">
  <PCBTraceAnimated />
  <CodeRain intensity="medium" />
</div>`}</code>
                    </pre>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-vln-purple">
                      3. Wrap Sections with Randomized Animations
                    </h3>
                    <pre className="bg-vln-bg-lighter p-4 rounded-lg overflow-x-auto text-sm border border-vln-purple/20">
                      <code className="text-vln-amber">{`<ScrollSectionRandomized index={0}>
  <AlternatingFade index={0}>
    {/* Your content */}
  </AlternatingFade>
</ScrollSectionRandomized>`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </AlternatingFade>
          </div>
        </ScrollSectionRandomized>

        {/* Section 4 - CTA (Even) */}
        <ScrollSectionRandomized index={4}>
          <div className="container mx-auto px-4">
            <AlternatingFade index={4}>
              <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-8">
                <h2 className="text-6xl font-bold text-gradient-sage">
                  Ready to Implement?
                </h2>
                <p className="text-xl text-vln-gray max-w-2xl">
                  These enhanced animations bring your VLN Academy designs to life with
                  organic, non-repetitive motion that feels natural and engaging.
                </p>
                <div className="flex gap-4">
                  <Button variant="primary" size="lg">
                    Get Started
                  </Button>
                  <Button variant="secondary" size="lg">
                    Documentation
                  </Button>
                </div>
              </div>
            </AlternatingFade>
          </div>
        </ScrollSectionRandomized>
      </main>
    </div>
  );
}
