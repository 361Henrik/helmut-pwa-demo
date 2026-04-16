import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DemoOverlay, type DemoStep } from "@/components/demo/DemoOverlay";
import { DemoControls } from "@/components/demo/DemoControls";
import { Beat1Scene } from "@/components/demo/Beat1Scene";
import { Beat2Scene } from "@/components/demo/Beat2Scene";
import { Beat3Scene } from "@/components/demo/Beat3Scene";
import { Beat4Scene } from "@/components/demo/Beat4Scene";
import { Beat4DepthScene } from "@/components/demo/Beat4DepthScene";
import { Beat5MapScene } from "@/components/demo/Beat5MapScene";
import { Beat7Scene } from "@/components/demo/Beat7Scene";

/**
 * 7-phase demo flow:
 * 1: Silence  →  2: Awareness  →  3: Live View (AR)
 * 4: Depth    →  5: Map        →  6: Operator  →  7: Close
 */
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

      <DemoOverlay step={step} onAdvance={advance} paused={paused} onRestart={restart} />

      {step < 7 && (
        <DemoControls onRestart={restart} paused={paused} onTogglePause={togglePause} />
      )}
    </div>
  );
}
