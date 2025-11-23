/**
 * Animation utility functions for randomized, organic circuit board animations
 */

/**
 * Generate a random float between min and max
 */
export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Generate a random integer between min and max (inclusive)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Create randomized animation timing for circuit elements
 * Returns duration and delay with variation
 * Significantly slowed down for subtle, calming effect
 */
export function randomCircuitTiming(baseDuration: number = 12) {
  return {
    duration: randomBetween(baseDuration * 0.8, baseDuration * 1.4),
    delay: randomBetween(0, baseDuration * 0.3),
  };
}

/**
 * Create randomized particle flow timing
 * Very slow for subtle data flow visualization
 */
export function randomParticleTiming(baseSpeed: number = 15) {
  return {
    duration: randomBetween(baseSpeed * 0.85, baseSpeed * 1.3),
    delay: randomBetween(0, baseSpeed * 0.25),
  };
}

/**
 * Generate random easing curves for variety
 */
export const easingVariations = [
  "easeInOut",
  "easeIn",
  "easeOut",
  [0.43, 0.13, 0.23, 0.96], // Custom bezier
  [0.6, 0.04, 0.98, 0.34],   // Custom bezier
] as const;

export function randomEasing() {
  return easingVariations[randomInt(0, easingVariations.length - 1)];
}

/**
 * Generate random opacity values for pulsing effects
 */
export function randomOpacityRange(base: number = 0.6) {
  const variance = 0.2;
  return [
    Math.max(0, base - variance),
    Math.min(1, base + variance),
    Math.max(0, base - variance),
  ];
}

/**
 * Generate random scale values for pulsing effects
 */
export function randomScaleRange(base: number = 1) {
  const variance = 0.3;
  return [
    base - variance,
    base + variance,
    base - variance,
  ];
}

/**
 * Stagger delays for multiple elements
 * Creates more organic timing between elements
 */
export function randomStagger(index: number, baseStagger: number = 0.1) {
  return index * baseStagger + randomBetween(0, baseStagger * 0.5);
}

/**
 * Choose a random color from the VLN palette
 */
export const vlnColors = {
  sage: "#86d993",
  sageLight: "#a8e9b4",
  sageDark: "#5fb76f",
  blue: "#7dd3fc",
  blueLight: "#bae6fd",
  blueDark: "#0ea5e9",
  amber: "#fbbf24",
  amberLight: "#fcd34d",
  amberDark: "#f59e0b",
  purple: "#c084fc",
  purpleLight: "#d8b4fe",
  purpleDark: "#a855f7",
} as const;

export function randomAccentColor() {
  const colors = [vlnColors.sage, vlnColors.blue, vlnColors.amber, vlnColors.purple];
  return colors[randomInt(0, colors.length - 1)];
}

/**
 * Generate random path animation direction
 */
export function randomPathDirection(): "normal" | "reverse" | "alternate" | "alternate-reverse" {
  const directions = ["normal", "reverse", "alternate", "alternate-reverse"] as const;
  return directions[randomInt(0, directions.length - 1)];
}
