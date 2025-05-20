/**
 * Type definitions for cosmic effects
 */

// Declare CSS properties for cosmic elements
interface CosmicElementStyle extends React.CSSProperties {
  animationDelay?: string;
}

// Declare cosmic particle properties
interface CosmicParticle {
  className: string;
  style: CosmicElementStyle;
}

// Declare cosmic effect manager
interface CosmicEffectManager {
  createDustParticles: (count: number) => HTMLDivElement;
  createDistantGalaxies: () => HTMLDivElement;
  cleanupEffects: () => void;
}

// Add module declaration so TypeScript doesn't complain about our CSS classes
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
} 