import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DemoOverlay, type DemoStep } from "@/components/demo/DemoOverlay";
import { DemoControls } from "@/components/demo/DemoControls";
import { AmbientToggle } from "@/components/demo/AmbientToggle";
import { FilmGrain } from "@/components/demo/FilmGrain";
import { AmbientAmplitudeContext } from "@/components/demo/AmbientAmplitudeContext";
import { useAmbientBed } from "@/components/demo/useAmbientBed";
import { BrandProvider } from "@/components/demo/BrandContext";
import { Beat1Scene } from "@/components/demo/Beat1Scene";
import { Beat2Scene } from "@/components/demo/Beat2Scene";
import { Beat3Scene } from "@/components/demo/Beat3Scene";
import { Beat4Scene } from "@/components/demo/Beat4Scene";
import { Beat4DepthScene } from "@/components/demo/Beat4DepthScene";
import { Beat5MapScene } from "@/components/demo/Beat5MapScene";
import { Beat6InsightsScene } from "@/components/demo/Beat6InsightsScene";
import { Beat7Scene } from "@/components/demo/Beat7Scene";

const TOTAL_STEPS = 8;

// Golden-hour color grade per phase — subtle warmth shift
const PHASE_GRADE: Record<number, string> = {
  1: "brightness(1) saturate(1) hue-rotate(-5deg)",
  2: "brightness(1.02) saturate(1.05)",
  3: "brightness(1.02) saturate(1.1) hue-rotate(2deg)",
  4: "brightness(1) saturate(1.05)",
  5: "brightness(0.98) saturate(0.95)",
  6: "brightness(1) saturate(1.05) hue-rotate(-3deg)",
  7: "brightness(0.95) saturate(0.95)",
  8: "brightness(0.95) saturate(0.9)",
};

function renderScene(step: DemoStep, restart: () => void) {
  switch (step) {
    case 1: return <Beat1Scene />;
    case 2: return <Beat4Scene />;
    case 3: return <Beat3Scene />;
    case 4: return <Beat4DepthScene />;
    case 5: return <Beat5MapScene />;
    case 6: return <Beat2Scene />;
    case 7: return <Beat6InsightsScene />;
    case 8: return <Beat7Scene onRestart={restart} />;
  }
}

export default function DemoPage() {
  const getInitialStep = (): DemoStep => {
    const saved = sessionStorage.getItem("demo-step");
    if (saved) {
      sessionStorage.removeItem("demo-step");
      const parsed = Number(saved) as DemoStep;
      if (parsed >= 1 && parsed <= TOTAL_STEPS) return parsed;
    }
    return 1;
  };

  const [step, setStep] = useState<DemoStep>(getInitialStep);
  const [paused, setPaused] = useState(false);

  const { amplitude, enable, enabled } = useAmbientBed(step >= 1 && step <= 7, paused);

  const advance = useCallback(() => {
    setStep((s) => (s < TOTAL_STEPS ? ((s + 1) as DemoStep) : s));
  }, []);

  const restart = useCallback(() => {
    setStep(1);
    setPaused(false);
  }, []);

  const togglePause = useCallback(() => setPaused((p) => !p), []);
  const enableAmbient = useCallback(() => enable(), [enable]);

  return (
    <BrandProvider>
      <AmbientAmplitudeContext.Provider value={amplitude}>
        <div
          className="fixed inset-0 w-full h-full overflow-hidden"
          style={{ backgroundColor: "#1B3D2F" }}
        >
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 z-50 h-[2px] bg-white/10">
            <div
              className="h-full transition-all duration-700 ease-out"
              style={{
                width: `${(step / TOTAL_STEPS) * 100}%`,
                backgroundColor: "#C49A5C",
              }}
            />
          </div>

          {/* Global color-grade layer + cross-fade between scenes */}
          <div
            className="absolute inset-0"
            style={{ filter: PHASE_GRADE[step], transition: "filter 800ms ease" }}
          >
            <AnimatePresence>
              <motion.div
                key={step}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {renderScene(step, restart)}
              </motion.div>
            </AnimatePresence>
          </div>

          <FilmGrain />

          <DemoOverlay step={step} onAdvance={advance} paused={paused} onRestart={restart} />

          {step < TOTAL_STEPS && (
            <div className="absolute right-4 top-4 z-40 flex gap-2">
              <AmbientToggle
                enabled={enabled}
                onEnable={enableAmbient}
                onDisable={enableAmbient}
              />
              <DemoControls
                onRestart={restart}
                paused={paused}
                onTogglePause={togglePause}
              />
            </div>
          )}
        </div>
      </AmbientAmplitudeContext.Provider>
    </BrandProvider>
  );
}
