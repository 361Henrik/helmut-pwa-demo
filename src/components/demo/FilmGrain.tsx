import { motion } from "framer-motion";

/**
 * Global film grain + subtle vignette breath. Sits above every scene at
 * low opacity so the whole demo looks shot on film, not rendered.
 */
export function FilmGrain() {
  // Inline SVG turbulence — no asset needed
  const grain = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.98  0 0 0 0 0.96  0 0 0 0 0.92  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

  return (
    <>
      {/* Animated grain — flickers frame-to-frame like film */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[55] mix-blend-overlay"
        style={{
          backgroundImage: grain,
          backgroundSize: "240px 240px",
          opacity: 0.14,
        }}
        animate={{
          backgroundPosition: [
            "0px 0px",
            "-40px 20px",
            "30px -10px",
            "-15px -25px",
            "10px 35px",
          ],
        }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
      />
      {/* Breathing vignette */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[56]"
        animate={{ opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </>
  );
}
