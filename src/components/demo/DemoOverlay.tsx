import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type DemoStep = 1 | 2 | 3 | 4 | 5 | 6;

interface DemoOverlayProps {
  step: DemoStep;
  onAdvance: () => void;
}

const STEP_CONTENT: Record<
  DemoStep,
  { title: string; subtitle?: string; position: "center" | "bottom" | "top" }
> = {
  1: {
    title: "You're passing one of the most iconic stretches of the Rhine",
    subtitle: "Tap to continue",
    position: "center",
  },
  2: {
    title: "Tap the glowing marker to discover what you're seeing",
    position: "bottom",
  },
  3: {
    title: "Swipe up or tap 'for more' to learn the story",
    position: "bottom",
  },
  4: {
    title: "Tap "full story" for the complete experience",
    position: "bottom",
  },
  5: {
    title: "Explore two more discoveries nearby",
    subtitle: "Tap any marker to explore freely",
    position: "center",
  },
  6: {
    title: "That's the experience",
    subtitle: "Ready to learn more?",
    position: "center",
  },
};

export function DemoOverlay({ step, onAdvance }: DemoOverlayProps) {
  const [pulse, setPulse] = useState(false);

  // Auto-advance step 1 after 4s, and pulse hint after 8s on interactive steps
  useEffect(() => {
    setPulse(false);

    if (step === 1) {
      const timer = setTimeout(onAdvance, 4000);
      return () => clearTimeout(timer);
    }

    if (step === 2 || step === 3 || step === 4) {
      const pulseTimer = setTimeout(() => setPulse(true), 8000);
      return () => clearTimeout(pulseTimer);
    }

    if (step === 5) {
      const timer = setTimeout(onAdvance, 15000);
      return () => clearTimeout(timer);
    }
  }, [step, onAdvance]);

  const content = STEP_CONTENT[step];

  // Steps 3 and 4 show a small hint label only
  if (step === 3 || step === 4) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: pulse ? [0.7, 1, 0.7] : 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={
            pulse
              ? { opacity: { repeat: Infinity, duration: 1.5 }, y: { duration: 0.3 } }
              : { duration: 0.3 }
          }
          className="pointer-events-none absolute bottom-48 left-0 right-0 z-30 flex justify-center px-6"
        >
          <div className="rounded-full bg-deep-green/90 px-5 py-2.5 shadow-lg backdrop-blur-sm">
            <p className="text-body-small font-medium text-deep-green-foreground text-center">
              {content.title}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Full overlay for steps 1, 2, 5, 6
  const isClickable = step === 1;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={`absolute inset-0 z-30 flex items-end justify-center pb-32 px-6 ${
          isClickable ? "cursor-pointer" : "pointer-events-none"
        }`}
        style={
          step === 1
            ? { background: "linear-gradient(to top, hsla(120,9%,11%,0.7) 0%, transparent 60%)" }
            : undefined
        }
        onClick={isClickable ? onAdvance : undefined}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className={`max-w-sm text-center ${
            content.position === "bottom" ? "mb-0" : content.position === "top" ? "mb-auto mt-24" : ""
          }`}
        >
          <h2 className="font-display text-2xl font-medium leading-tight text-background">
            {content.title}
          </h2>
          {content.subtitle && (
            <p className="mt-2 text-body-small text-background/70">
              {content.subtitle}
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
