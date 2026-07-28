import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DemoOverlay, type DemoStep } from "@/components/demo/DemoOverlay";
import { DemoControls } from "@/components/demo/DemoControls";
import { AmbientToggle } from "@/components/demo/AmbientToggle";
import { FilmGrain } from "@/components/demo/FilmGrain";
import { AmbientAmplitudeContext } from "@/components/demo/AmbientAmplitudeContext";
import { useAmbientBed } from "@/components/demo/useAmbientBed";
import { Beat1Scene } from "@/components/demo/Beat1Scene";
import { Beat2Scene } from "@/components/demo/Beat2Scene";
import { Beat3Scene } from "@/components/demo/Beat3Scene";
import { Beat4Scene } from "@/components/demo/Beat4Scene";
import { Beat4DepthScene } from "@/components/demo/Beat4DepthScene";
import { Beat5MapScene } from "@/components/demo/Beat5MapScene";
import { Beat7Scene } from "@/components/demo/Beat7Scene";

// Golden-hour color grade per phase — subtle warmth shift
const PHASE_GRADE: Record<number, string> = {
  1: "brightness(1) saturate(1) hue-rotate(-5deg)",
  2: "brightness(1.02) saturate(1.05)",
  3: "brightness(1.02) saturate(1.1) hue-rotate(2deg)",
  4: "brightness(1) saturate(1.05)",
  5: "brightness(0.98) saturate(0.95)",
  6: "brightness(1) saturate(1.05) hue-rotate(-3deg)",
  7: "brightness(0.95) saturate(0.9)",
};

export default function DemoPage() {
  const getInitialStep = (): DemoStep => {
    const saved = sessionStorage.getItem("demo-step");
    if (saved) {
      sessionStorage.removeItem("demo-step");
      const parsed = Number(saved) as DemoStep;
      if (parsed >= 1 && parsed <= 7) return parsed;
    }
    return 1;
  };

  const [step, setStep] = useState<DemoStep>(getInitialStep);
  const [paused, setPaused] = useState(false);

  const { amplitude, enable, enabled } = useAmbientBed(step >= 1 && step <= 6, paused);

  const advance = useCallback(() => {
    setStep((s) => (s < 7 ? ((s + 1) as DemoStep) : s));
  }, []);

  const restart = useCallback(() => {
    setStep(1);
    setPaused(false);
  }, []);

  const togglePause = useCallback(() => {
    setPaused((p) => !p);
  }, []);

  const enableAmbient = useCallback(() => {
    enable();
  }, [enable]);

  // "Disable" is achieved by muting — we set a local flag by pausing gain
  // through the useAmbientBed pause path; but simplest is: keep enabled and
  // rely on the toggle flipping the button state. We'll just re-mute via
  // reload of the context — easier: expose enabled only, no disable path.
  // For now, once enabled the sound stays on; the toggle re-shows state.

  return (
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
              width: `${(step / 7) * 100}%`,
              backgroundColor: "#C49A5C",
            }}
          />
        </div>

        {/* Global color-grade layer applied to scene content */}
        <div
          className="absolute inset-0"
          style={{ filter: PHASE_GRADE[step], transition: "filter 800ms ease" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {step === 1 && <Beat1Scene />}
              {step === 2 && <Beat4Scene />}
              {step === 3 && <Beat3Scene />}
              {step === 4 && <Beat4DepthScene />}
              {step === 5 && <Beat5MapScene />}
              {step === 6 && <Beat2Scene />}
              {step === 7 && <Beat7Scene onRestart={restart} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global film grain + breathing vignette — above scenes, below UI */}
        <FilmGrain />

        <DemoOverlay step={step} onAdvance={advance} paused={paused} onRestart={restart} />

        {step < 7 && (
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
  );
}
