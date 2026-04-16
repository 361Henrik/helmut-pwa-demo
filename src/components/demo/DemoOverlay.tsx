import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type DemoStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface DemoOverlayProps {
  step: DemoStep;
  onAdvance: () => void;
  paused: boolean;
  onRestart?: () => void;
}

// Step durations match revised beat sequence
const STEP_1_DURATION = 10000; // Beat 1: Emotional hook
const STEP_2_DURATION = 10000; // Beat 2: Live View
const STEP_3_DURATION = 14000; // Beat 3: Editorial WOW
const STEP_4_DURATION = 12000; // Beat 4: Map
const STEP_5_DURATION = 12000; // Beat 5: Operator brand
const STEP_6_DURATION = 16000; // Beat 6: Insights361
// Step 7: no auto-advance

export function DemoOverlay({ step, onAdvance, paused }: DemoOverlayProps) {
  const remainingRef = useRef<number>(0);
  const startedAtRef = useRef<number>(0);
  const timerTypeRef = useRef<"advance" | null>(null);
  const timerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
  };

  // Reset on step change
  useEffect(() => {
    clearTimer();

    if (step === 1) {
      remainingRef.current = STEP_1_DURATION;
      timerTypeRef.current = "advance";
    } else if (step === 2) {
      remainingRef.current = STEP_2_DURATION;
      timerTypeRef.current = "advance";
    } else if (step === 3) {
      remainingRef.current = STEP_3_DURATION;
      timerTypeRef.current = "advance";
    } else if (step === 4) {
      remainingRef.current = STEP_4_DURATION;
      timerTypeRef.current = "advance";
    } else if (step === 5) {
      remainingRef.current = STEP_5_DURATION;
      timerTypeRef.current = "advance";
    } else if (step === 6) {
      remainingRef.current = STEP_6_DURATION;
      timerTypeRef.current = "advance";
    } else {
      timerTypeRef.current = null;
      remainingRef.current = 0;
    }

    if (!paused && remainingRef.current > 0) {
      startedAtRef.current = Date.now();
      timerIdRef.current = setTimeout(() => {
        onAdvance();
      }, remainingRef.current);
    }

    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // Handle pause/resume
  useEffect(() => {
    if (timerTypeRef.current === null) return;

    if (paused) {
      if (timerIdRef.current) {
        const elapsed = Date.now() - startedAtRef.current;
        remainingRef.current = Math.max(0, remainingRef.current - elapsed);
        clearTimer();
      }
    } else {
      if (remainingRef.current > 0) {
        startedAtRef.current = Date.now();
        timerIdRef.current = setTimeout(() => {
          onAdvance();
        }, remainingRef.current);
      }
    }

    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  // Only step 4 (map beat) renders a small floating hint
  if (step === 4) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="step4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute bottom-20 left-0 right-0 z-30 flex flex-col items-center gap-3 px-6"
        >
          <div className="rounded-full bg-warm-white/95 px-5 py-2.5 shadow-xl backdrop-blur-md border border-deep-green/10">
            <p className="font-body text-[14px] font-medium text-deep-green text-center">
              Context for every kilometre — not just the famous ones
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return null;
}
