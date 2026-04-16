import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MOCK_POIS } from "@/data/mock-route";
import { CuratedMap } from "@/components/map/CuratedMap";
import { DemoOverlay, type DemoStep } from "@/components/demo/DemoOverlay";
import { DemoControls } from "@/components/demo/DemoControls";
import { Beat1Scene } from "@/components/demo/Beat1Scene";
import { Beat2Scene } from "@/components/demo/Beat2Scene";
import { Beat3Scene } from "@/components/demo/Beat3Scene";
import { Beat4Scene } from "@/components/demo/Beat4Scene";
import { Beat6Scene } from "@/components/demo/Beat6Scene";
import { Beat7Scene } from "@/components/demo/Beat7Scene";

/** Hand-picked POIs visible on the map beat */
const DEMO_POI_IDS = ["poi-1", "poi-20", "poi-4"];
const DEMO_POIS = MOCK_POIS.filter((p) => DEMO_POI_IDS.includes(p.id));

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

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-background">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-50 h-1 bg-border/40">
        <div
          className="h-full transition-all duration-700 ease-out"
          style={{
            width: `${(step / 7) * 100}%`,
            backgroundColor: "hsl(40 46% 53%)",
          }}
        />
      </div>

      {/* Scene rendering with crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          {step === 1 && <Beat1Scene />}
          {step === 2 && <Beat4Scene />}
          {step === 3 && <Beat3Scene />}
          {step === 4 && (
            <CuratedMap
              pois={DEMO_POIS}
              hideControls
              demoMode
            />
          )}
          {step === 5 && <Beat2Scene />}
          {step === 6 && <Beat6Scene />}
          {step === 7 && <Beat7Scene onRestart={restart} />}
        </motion.div>
      </AnimatePresence>

      {/* Timer + step 4 hint */}
      <DemoOverlay step={step} onAdvance={advance} paused={paused} onRestart={restart} />

      {/* Controls hidden on final step */}
      {step < 7 && (
        <DemoControls onRestart={restart} paused={paused} onTogglePause={togglePause} />
      )}
    </div>
  );
}
