import { motion } from "framer-motion";
import type { ReactNode } from "react";

type CalloutPosition = "top" | "middle" | "bottom";
type CalloutVariant = "ambient" | "action";

interface SceneCalloutProps {
  /** Vertical placement on the portrait viewport */
  position?: CalloutPosition;
  /** Animation delay in seconds */
  delay?: number;
  /** Visual treatment — ambient = passive awareness, action = guest can do something */
  variant?: CalloutVariant;
  /** Small label above main text (e.g. "Around you now", "Tap to explore") */
  eyebrow?: string;
  /** Main callout text */
  children: ReactNode;
  /** Optional caption rendered beneath the pill */
  caption?: string;
}

const positionClass: Record<CalloutPosition, string> = {
  top: "top-24",
  middle: "top-1/2 -translate-y-1/2",
  bottom: "bottom-28",
};

/**
 * Reusable callout pill for demo scenes.
 * Always opaque card on imagery → guarantees contrast.
 * Used to show ambient context or guest actions without intruding on the photo.
 */
export function SceneCallout({
  position = "middle",
  delay = 0.6,
  variant = "ambient",
  eyebrow,
  children,
  caption,
}: SceneCalloutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: "easeOut" }}
      className={`absolute left-1/2 -translate-x-1/2 ${positionClass[position]} z-20 w-[88%] max-w-sm flex flex-col items-center gap-3 px-2`}
    >
      <div
        className={`w-full rounded-2xl px-5 py-4 shadow-xl backdrop-blur-md ${
          variant === "ambient"
            ? "bg-warm-white/95 border border-deep-green/10"
            : "bg-deep-green/95 border border-champagne/30"
        }`}
      >
        {eyebrow && (
          <p
            className={`font-display italic text-[12px] tracking-wide mb-1.5 ${
              variant === "ambient" ? "text-deep-green/70" : "text-champagne"
            }`}
          >
            {eyebrow}
          </p>
        )}
        <p
          className={`font-body text-[16px] leading-snug ${
            variant === "ambient" ? "text-deep-green" : "text-warm-white"
          }`}
        >
          {children}
        </p>
      </div>
      {caption && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.6, duration: 0.5 }}
          className="font-display italic text-[13px] text-warm-white/85 text-center drop-shadow-md"
        >
          {caption}
        </motion.p>
      )}
    </motion.div>
  );
}
