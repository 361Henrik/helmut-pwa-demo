import { motion } from "framer-motion";
import type { CSSProperties } from "react";

interface CinematicImageProps {
  src: string;
  /** Direction of the slow Ken Burns drift */
  direction?: "in" | "left" | "right" | "up";
  /** Duration of the motion in seconds */
  duration?: number;
  /** Optional CSS filter for phase-specific color grading */
  filter?: string;
  /** Vignette intensity (0–1) */
  vignette?: number;
  className?: string;
  style?: CSSProperties;
}

const VARIANTS = {
  in: { initial: { scale: 1.08, x: 0, y: 0 }, animate: { scale: 1, x: 0, y: 0 } },
  left: { initial: { scale: 1.12, x: "2%", y: 0 }, animate: { scale: 1.06, x: "-2%", y: 0 } },
  right: { initial: { scale: 1.12, x: "-2%", y: 0 }, animate: { scale: 1.06, x: "2%", y: 0 } },
  up: { initial: { scale: 1.12, x: 0, y: "2%" }, animate: { scale: 1.06, x: 0, y: "-2%" } },
};

/**
 * Cinematic Ken Burns image — slow, imperceptible pan+zoom with optional
 * color grading. The image "breathes" so no phase feels like a static slide.
 */
export function CinematicImage({
  src,
  direction = "in",
  duration = 14,
  filter,
  vignette = 0.55,
  className,
  style,
}: CinematicImageProps) {
  const v = VARIANTS[direction];
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className ?? ""}`}
      style={style}
    >
      <motion.img
        src={src}
        alt=""
        aria-hidden
        initial={v.initial}
        animate={v.animate}
        transition={{ duration, ease: "linear" }}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ filter }}
        draggable={false}
      />
      {vignette > 0 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, rgba(0,0,0,0) 50%, rgba(0,0,0,${vignette}) 100%)`,
          }}
        />
      )}
    </div>
  );
}
