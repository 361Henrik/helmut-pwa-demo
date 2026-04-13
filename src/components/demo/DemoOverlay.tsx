import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export type DemoStep = 1 | 2 | 3 | 4 | 5 | 6;

/** Configurable CTA URL for the final step */
const DEMO_CTA_URL = "#contact";

interface DemoOverlayProps {
  step: DemoStep;
  onAdvance: () => void;
  paused: boolean;
  onRestart?: () => void;
  onAutoTap?: () => void;
  onAutoExpand?: () => void;
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
    title: "Tap 'full story' for the complete experience",
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

const STEP_1_DURATION = 4000;
const STEP_2_AUTO_TAP = 5000;
const STEP_3_AUTO_EXPAND = 4000;
const STEP_5_DURATION = 8000;
const PULSE_DELAY = 8000;

export function DemoOverlay({ step, onAdvance, paused, onRestart, onAutoTap, onAutoExpand }: DemoOverlayProps) {
  const [pulse, setPulse] = useState(false);
  const remainingRef = useRef<number>(0);
  const startedAtRef = useRef<number>(0);
  const timerTypeRef = useRef<"advance" | "pulse" | null>(null);
  const timerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
  };

  // Reset on step change
  useEffect(() => {
    setPulse(false);
    clearTimer();

    if (step === 1) {
      remainingRef.current = STEP_1_DURATION;
      timerTypeRef.current = "advance";
    } else if (step === 2) {
      remainingRef.current = STEP_2_AUTO_TAP;
      timerTypeRef.current = "advance";
    } else if (step === 3) {
      remainingRef.current = STEP_3_AUTO_EXPAND;
      timerTypeRef.current = "advance";
    } else if (step === 5) {
      remainingRef.current = STEP_5_DURATION;
      timerTypeRef.current = "advance";
    } else if (step === 4) {
      remainingRef.current = PULSE_DELAY;
      timerTypeRef.current = "pulse";
    } else {
      timerTypeRef.current = null;
      remainingRef.current = 0;
    }

    // Start immediately if not paused
    if (!paused && remainingRef.current > 0) {
      startedAtRef.current = Date.now();
      timerIdRef.current = setTimeout(() => {
        if (timerTypeRef.current === "pulse") {
          setPulse(true);
        } else if (step === 2) {
          onAutoTap?.();
        } else if (step === 3) {
          onAutoExpand?.();
        } else {
          onAdvance();
        }
      }, remainingRef.current);
    }

    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // Handle pause/resume
  useEffect(() => {
    if (timerTypeRef.current === null) return;

    if (paused) {
      // Freeze: calculate remaining time
      if (timerIdRef.current) {
        const elapsed = Date.now() - startedAtRef.current;
        remainingRef.current = Math.max(0, remainingRef.current - elapsed);
        clearTimer();
      }
    } else {
      // Resume with remaining time
      if (remainingRef.current > 0 && !pulse) {
        startedAtRef.current = Date.now();
        timerIdRef.current = setTimeout(() => {
          if (timerTypeRef.current === "advance") onAdvance();
          else setPulse(true);
        }, remainingRef.current);
      }
    }

    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  const content = STEP_CONTENT[step];

  // Steps 3 and 4 show a small hint label only
  if (step === 3 || step === 4) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: pulse && !paused ? [0.7, 1, 0.7] : 1,
            y: 0,
          }}
          exit={{ opacity: 0, y: -8 }}
          transition={
            pulse && !paused
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
  const hasGradient = step === 1 || step === 6;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={`absolute inset-0 z-30 flex items-end justify-center pb-32 px-6 ${
          isClickable ? "cursor-pointer" : step === 6 ? "" : "pointer-events-none"
        }`}
        style={
          hasGradient
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

          {step === 6 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-8 space-y-3"
            >
              <Button
                size="lg"
                className="w-full text-lg"
                onClick={() => {
                  if (window.parent !== window) {
                    window.parent.location.href = DEMO_CTA_URL;
                  } else {
                    window.location.href = DEMO_CTA_URL;
                  }
                }}
              >
                Get in Touch
              </Button>
              <Button
                variant="ghost"
                className="w-full text-background/70 hover:text-background hover:bg-background/10"
                onClick={onRestart}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Replay
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
