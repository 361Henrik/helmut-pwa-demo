import { motion } from "framer-motion";
import { useMemo } from "react";

interface LightRaysProps {
  /** Number of drifting dust particles */
  particles?: number;
}

/**
 * Volumetric light rays + drifting dust particles. Layered above landscape,
 * below UI. Purely decorative — no interaction.
 */
export function LightRays({ particles = 22 }: LightRaysProps) {
  const dust = useMemo(
    () =>
      Array.from({ length: particles }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: 40 + Math.random() * 60,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 6,
        duration: 10 + Math.random() * 12,
        drift: -20 - Math.random() * 40,
      })),
    [particles]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-[15]">
      {/* Sun-shaft rays sweeping from top-right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.45, 0.3] }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0"
        style={{
          background:
            "conic-gradient(from 210deg at 85% -10%, rgba(255,220,160,0) 0deg, rgba(255,220,160,0.18) 10deg, rgba(255,220,160,0) 30deg, rgba(255,220,160,0.12) 45deg, rgba(255,220,160,0) 65deg)",
          mixBlendMode: "screen",
        }}
      />
      {/* Warm horizon glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,190,120,0.10) 0%, rgba(255,190,120,0) 40%)",
          mixBlendMode: "screen",
        }}
      />
      {/* Drifting dust motes */}
      {dust.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            backgroundColor: "rgba(255,235,200,0.85)",
            boxShadow: "0 0 6px rgba(255,235,200,0.6)",
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.9, 0.9, 0],
            y: [0, d.drift],
            x: [0, Math.sin(d.id) * 15],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
