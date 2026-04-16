import { useEffect, useRef } from "react";

export type DemoStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface DemoOverlayProps {
  step: DemoStep;
  onAdvance: () => void;
  paused: boolean;
  onRestart?: () => void;
}

// Phase durations — tighter, app-like pacing (~54s total)
const STEP_1_DURATION = 8000;  // Phase 1: Silence
const STEP_2_DURATION = 8000;  // Phase 2: Awareness
const STEP_3_DURATION = 10000; // Phase 3: Live View
const STEP_4_DURATION = 10000; // Phase 4: Depth
const STEP_5_DURATION = 10000; // Phase 5: Map Context
const STEP_6_DURATION = 8000;  // Phase 6: Operator Layer
// Phase 7: no auto-advance

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

  useEffect(() => {
    clearTimer();

    const map: Record<number, number> = {
      1: STEP_1_DURATION,
      2: STEP_2_DURATION,
      3: STEP_3_DURATION,
      4: STEP_4_DURATION,
      5: STEP_5_DURATION,
      6: STEP_6_DURATION,
    };

    if (step >= 1 && step <= 6) {
      remainingRef.current = map[step];
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

  // No floating overlays — each scene owns its own UI now.
  return null;
}
